/*
 *
 */

package ca.sunlife.web.cms.core.services.impl;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.LockSupport;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.RepositoryException;
import javax.jcr.Value;

import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.lang.StringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.jackrabbit.oak.commons.IOUtils;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.akamai.edgegrid.signer.ClientCredential;
import com.akamai.edgegrid.signer.apachehttpclient.ApacheHttpClientEdgeGridInterceptor;
import com.akamai.edgegrid.signer.apachehttpclient.ApacheHttpClientEdgeGridRoutePlanner;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.ReplicationOptions;
import com.day.cq.replication.Replicator;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageFilter;
import com.day.cq.wcm.commons.ReferenceSearch;

import ca.sunlife.web.cms.core.constants.BasePageModelConstants;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.ErrorCodes;
import ca.sunlife.web.cms.core.filters.DispatcherReplicationAgentFilter;
import ca.sunlife.web.cms.core.osgi.config.AkamaiConfig;
import ca.sunlife.web.cms.core.services.AkamaiCacheClear;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * The Class AkamaiCacheClearImpl.
 *
 * @author TCS
 * @version 1.0
 */
@ Component (service = AkamaiCacheClear.class, immediate = true)
@ Designate (ocd = AkamaiConfig.class)
public class AkamaiCacheClearImpl implements AkamaiCacheClear {

  /** The Constant OBJECTS_STR. */
  private static final String OBJECTS_STR = "objects";

  /** The Constant FRAGMENT_PATH. */
  private static final String FRAGMENT_PATH = "fragmentPath";

  /** The Constant DOMAIN. */
  private static final String DOMAIN = "domain";

  /** The config. */
  private AkamaiConfig config;

  /** The config service. */
  @ Reference
  private SiteConfigService configService;
  
  /** The replicator. */
  @Reference
  private Replicator replicator;

  /** The core resource resolver. */
  @ Reference
  private CoreResourceResolver coreResourceResolver;

  /** The Constant INVALIDATE_API. */
  private static final String INVALIDATE_API = "/ccu/v3/invalidate/url/";

  /** The Constant PROTOCOL. */
  private static final String PROTOCOL = "https://";

  /** The Constant LOGGER. */
  private static final Logger LOGGER = LoggerFactory.getLogger(AkamaiCacheClearImpl.class);
  
  /** The replication option. */
  private ReplicationOptions replicationOption = new ReplicationOptions();
  
  /** The Constant PURGE_SIZE. */
  private static final int PURGE_SIZE = 50;
  
  /** The Constant THREAD_SLEEP_TIME. */
  private static final int THREAD_SLEEP_TIME = 1000;
  
  /**
   * Activate.
   *
   * @param initConfig
   *          the config
   */
  @ Activate
  public void activate(final AkamaiConfig initConfig) {
    LOGGER.debug("Entry :: activate method of AkamaiCacheClearImpl");
    this.config = initConfig;
    replicationOption.setFilter(new DispatcherReplicationAgentFilter());
    LOGGER.info("Got akamai host {}", config.getHost());
    LOGGER.debug("Exit :: activate method of AkamaiCacheClearImpl");
  }

  /*
   * (non-Javadoc)
   * @see ca.sunlife.web.cms.core.services.AkamaiCacheClear#invalidatePages(java.lang.String[])
   */
  @ Override
  public String invalidatePages(final String [ ] paths) throws ApplicationException {
    LOGGER.debug("Entry :: invalidatePages method of AkamaiCacheClearImpl");
    final Set<String> obj = new HashSet<>();
    try {
      final ResourceResolver resourceResolver = coreResourceResolver.getResourceResolver();
      for (final String path : paths) {
        LOGGER.debug("Processing path {}", path);
        if (path.startsWith("/content/experience-fragments")) {
          processExperienceFragments(path, obj, resourceResolver);
        } else {
          processPage(path, obj, resourceResolver);
        }
      }
      if (obj.isEmpty()) {
        return "No valid paths to purge";
      }
      JSONObject request = new JSONObject();
      JSONArray objects = new JSONArray();
      String response = "";
      int index = 1;
      Iterator<String> itr = obj.iterator();
      while (itr.hasNext()) {
        objects.put(itr.next());
        if ((index++ % PURGE_SIZE) == 0) {
            request.put(OBJECTS_STR, objects);
            try {
              LockSupport.parkNanos(TimeUnit.MILLISECONDS.toNanos(THREAD_SLEEP_TIME));
              response = response.concat(processAkamaiPurge(request.toString()));
            } catch (ApplicationException e) {
              LOGGER.error("Got application exception {}", e);
            } 
            request = new JSONObject();
            objects = new JSONArray();
        }
      }
      request.put(OBJECTS_STR, objects);
      response = response.concat(processAkamaiPurge(request.toString()));
      resourceResolver.close();
      return response;
    } catch (JSONException | LoginException e) {
      throw new ApplicationException(ErrorCodes.APP_ERROR_200, e);
    }
  }

  /**
   * Process page.
   *
   * @param path
   *          the path
   * @param objects
   *          the objects
   * @param resourceResolver
   *          the resource resolver
   */
  private void processPage(String path, Set<String> objects, ResourceResolver resourceResolver) {
    try {
      if (StringUtils.isNotBlank(configService.getConfigValues(DOMAIN, path))) {
        Resource pageResource = resourceResolver.getResource(path);
        if (null != pageResource) {
          Node pageNode = pageResource.adaptTo(Node.class);
          if (null != pageNode) {
            Node jcrContent = pageNode.getNode(JcrConstants.JCR_CONTENT);
            if (null != jcrContent && jcrContent.hasProperty("advancedPageType") 
                && jcrContent.getProperty("advancedPageType").getString().equalsIgnoreCase("article")) {
              processArticleContent(jcrContent, objects, resourceResolver);
            }
          }          
        }
        objects.add(configService.getPageUrl(path));
      } else {
        LOGGER.warn("Not able to get domain for {}", path);
      }
    } catch (LoginException | RepositoryException e) {
      LOGGER.error("Got exception {}", e);
    }
  }

  /**
   * Process article content.
   *
   * @param content
   *          the content
   * @param objects
   *          the objects
   * @param resourceResolver
   *          the resource resolver
   * @throws RepositoryException
   *           the repository exception
   * @throws LoginException
   *           the login exception
   */
  private void processArticleContent(Node content, Set<String> objects,
      ResourceResolver resourceResolver) throws RepositoryException, LoginException {
    if (content.hasProperty(com.adobe.cq.social.srp.internal.AbstractSchemaMapper.CQ_RESOURCE_TYPE) && content.getProperty(com.adobe.cq.social.srp.internal.AbstractSchemaMapper.CQ_RESOURCE_TYPE).getString().endsWith("article")
        && content.hasProperty(FRAGMENT_PATH) && StringUtils.isNotEmpty(content.getProperty(FRAGMENT_PATH).getString())) {
      String fragmentMetaDataPath = content.getProperty(FRAGMENT_PATH).getString().concat(BasePageModelConstants.SLASH_CONSTANT)
          .concat(JcrConstants.JCR_CONTENT).concat(BasePageModelConstants.SLASH_CONSTANT).concat("metadata");
      LOGGER.debug("Article Content Fragment metadata path : {}", fragmentMetaDataPath);
      Set<String> tags = new HashSet<>();
      Resource metadataResource = resourceResolver.getResource(fragmentMetaDataPath);
      if (null != metadataResource) {
        Node metadata = metadataResource.adaptTo(Node.class);
        if (null != metadata && metadata.hasProperty(com.day.cq.tagging.TagConstants.PN_TAGS)) {
          Value[] values = metadata.getProperty(com.day.cq.tagging.TagConstants.PN_TAGS).getValues();
          for (Value value:values) {
            tags.add(value.getString());
          }
        }
      }
      LOGGER.debug("Found tags : {}", tags);
      final QueryBuilder queryBuilder = resourceResolver.adaptTo(QueryBuilder.class);
      if (queryBuilder == null) {
        LOGGER.warn("Query builder was null therefore no query was executed");
      } else {
        final Map <String, String> queryParameterMap = new HashMap <>();
        queryParameterMap.put("1_group.1_path", configService.getConfigValues("siteUrl", content.getPath()));
        queryParameterMap.put("1_group.2_path", configService.getConfigValues("experienceFragmentPath", content.getPath()));
        queryParameterMap.put("p.limit", Integer.toString(-1));
        queryParameterMap.put("1_group.p.or", "true");
        if (!tags.isEmpty()) {
          queryParameterMap.put("tagid.property", "tagNames");
          AtomicInteger index = new AtomicInteger(0);
          tags.forEach(tag -> 
            queryParameterMap.put(String.format("tagid.%d_value", index.incrementAndGet()), tag.trim())
          );
        }
        final PredicateGroup predicateGroup = PredicateGroup.create(queryParameterMap);
        LOGGER.debug("Query Params : {} : predicateGroup {}", queryParameterMap, predicateGroup);
        final Query query = queryBuilder.createQuery(predicateGroup, content.getSession());
        LOGGER.debug("Query before search {}", query);
        final SearchResult searchResult = query.getResult();
        ResourceResolver leakingResourceResolver = null;
        try {
          // Iterate over the hits if you need special information
          final Iterator <Resource> resourceIterator = searchResult.getResources();
          while (resourceIterator.hasNext()) {
            final Resource resource = resourceIterator.next();
            if (leakingResourceResolver == null) {
              // Get a reference to QB's leaking resource resolver
              leakingResourceResolver = resource.getResourceResolver();
            }
            String resourcePath = resource.getPath().substring(0, 
                (resource.getPath().contains(JcrConstants.JCR_CONTENT) ? (resource.getPath().indexOf(JcrConstants.JCR_CONTENT) - 1) : 0));
            LOGGER.debug("Got resource path {}", resourcePath);
            replicator.replicate(content.getSession(), ReplicationActionType.ACTIVATE, resourcePath, replicationOption);
            if (!resourcePath.startsWith("/content/experience-fragments")) {
              Resource pageRes = resourceResolver.getResource(resourcePath);
              Page page = pageRes != null ? pageRes.adaptTo(Page.class) : null;
              if (null != page && !objects.contains(configService.getPageUrl(resourcePath))) {
                objects.add(configService.getPageUrl(resourcePath));
                page.listChildren().forEachRemaining(p -> objects.add(configService.getPageUrl(p.getPath())));
              }
            }
          }
        } catch (ReplicationException e) {
          LOGGER.error("Got replication exception : {}", e);
        } finally {
          if (null != leakingResourceResolver) {
            // Always close the leaking query builder resource resolver
            leakingResourceResolver.close();
          }
        }
      }
      return;
    }
    if (content.hasProperty(com.adobe.cq.social.srp.internal.AbstractSchemaMapper.CQ_RESOURCE_TYPE) && content.getProperty(com.adobe.cq.social.srp.internal.AbstractSchemaMapper.CQ_RESOURCE_TYPE).getString().endsWith("experiencefragment")
        && content.hasProperty(FRAGMENT_PATH) && StringUtils.isNotEmpty(content.getProperty(FRAGMENT_PATH).getString())) {
      String fragmentPath = content.getProperty(FRAGMENT_PATH).getString();
      if (!StringUtils.lowerCase(fragmentPath).contains("header") && !StringUtils.lowerCase(fragmentPath).contains("footer")) {
        try {
          replicator.replicate(content.getSession(), ReplicationActionType.ACTIVATE, fragmentPath, replicationOption);
        } catch (ReplicationException e) {
          LOGGER.error("Got replication exception {}", e);
        }
      }
    }
    if (content.hasNodes()) {
      NodeIterator children = content.getNodes();
      while (children.hasNext()) {
        processArticleContent(children.nextNode(), objects, resourceResolver);
      }
    }
  }

  /**
   * Process experience fragments.
   *
   * @param path
   *          the path
   * @param objects
   *          the objects
   * @param resourceResolver
   *          the resource resolver
   */
  private void processExperienceFragments(String path, Set<String> objects,
      ResourceResolver resourceResolver) {
    if (! StringUtils.lowerCase(path).contains("header") && ! StringUtils.lowerCase(path).contains("footer")) {
      final Collection <ReferenceSearch.Info> searchResult = new ReferenceSearch()
          .search(resourceResolver, path).values();
      for (final ReferenceSearch.Info info : searchResult) {
        final String refPath = info.getPage().getPath();
        try {
          if (StringUtils.isNotBlank(configService.getConfigValues(DOMAIN, refPath))) {
            objects.add(configService.getPageUrl(refPath));
          }
        } catch (LoginException | RepositoryException e) {
          LOGGER.error("Got the repository exception : {}", e);
        }
      }
    } else {
      LOGGER.debug("Publishing header or footer {}", path);
      String sitePath = path.replace("/experience-fragments", "");
      try {
        if (StringUtils.isNotBlank(configService.getConfigValues(DOMAIN, sitePath))) {
          String siteUrl = configService.getConfigValues("siteUrl", sitePath);
          Resource site = resourceResolver.getResource(siteUrl);
          Page sitePage = site != null ? site.adaptTo(Page.class) : null;
          if (null != sitePage) {
            sitePage.listChildren(new PageFilter(), true).forEachRemaining(page -> {
              objects.add(configService.getPageUrl(page.getPath()));
            });
          }
          objects.add(configService.getPageUrl(siteUrl));
        }
      } catch (LoginException | RepositoryException e) {
        LOGGER.error("Got repository exception {}", e);
      }
    }
  }

  /**
   * Process akamai purge.
   *
   * @param jsonRequest
   *          the json request
   * @return the string
   * @throws ApplicationException
   *           the application exception
   */
  private String processAkamaiPurge(final String jsonRequest) throws ApplicationException {
    LOGGER.debug("Entry :: processAkamaiPurge method of AkamaiCacheClearImpl {}", jsonRequest);
    try {
      final ClientCredential clientCredential = ClientCredential.builder()
          .accessToken(config.getAccessKey()).clientToken(config.getClientToken())
          .clientSecret(config.getClientSecret()).host(config.getHost()).build();
      final HttpClient client = HttpClientBuilder.create()
          .addInterceptorFirst(new ApacheHttpClientEdgeGridInterceptor(clientCredential))
          .setRoutePlanner(new ApacheHttpClientEdgeGridRoutePlanner(clientCredential)).build();
      final HttpPost httpPost = new HttpPost(
          PROTOCOL.concat(config.getHost()).concat(INVALIDATE_API).concat(config.getEnvironment()));
      final StringEntity entity = new StringEntity(jsonRequest);
      httpPost.setHeader("Accept", "application/json");
      httpPost.setHeader("Content-type", "application/json");
      httpPost.setEntity(entity);
      final HttpResponse response = client.execute(httpPost);
      LOGGER.debug("Got AKAMAI response code {}", response.getStatusLine().getStatusCode());
      final String content = IOUtils.readString(response.getEntity().getContent());
      LOGGER.debug(" AKAMAI Respose {}", content);      
      if (response.getStatusLine().getStatusCode() != HttpStatus.SC_CREATED) {
        throw new ApplicationException(ErrorCodes.APP_ERROR_200);
      } else {
        return content;
      }
    } catch (final IOException e) {
      throw new ApplicationException(ErrorCodes.APP_ERROR_200, e);
    }
  }

  /*
   * (non-Javadoc)
   * @see ca.sunlife.web.cms.core.services.AkamaiCacheClear#invalidateAssets(java.lang.String[])
   */
  @ Override
  public String invalidateAssets(final String [ ] paths) throws ApplicationException {
    LOGGER.debug("Entry :: invalidateAssets method of AkamaiCacheClearImpl");
    try {
      final ResourceResolver resourceResolver = coreResourceResolver.getResourceResolver();
      final JSONObject request = new JSONObject();
      final JSONArray objects = new JSONArray();
      for (final String path : paths) {
        final Resource resource = resourceResolver.getResource(path);
        if (resource != null && ((String) resource.getValueMap()
            .getOrDefault(com.day.cq.commons.jcr.JcrConstants.JCR_PRIMARYTYPE, ""))
                .equalsIgnoreCase(com.day.cq.dam.api.DamConstants.NT_DAM_ASSET)) {
          configService.getAllSites(DOMAIN).forEach(domain -> objects.put(domain.concat(path)));
        }
      }
      resourceResolver.close();
      if (objects.length() < 1) {
        return "No valid paths to purge";
      }
      request.put(OBJECTS_STR, objects);
      return processAkamaiPurge(request.toString());
    } catch (LoginException | JSONException e) {
      throw new ApplicationException(ErrorCodes.APP_ERROR_200, e);
    }
  }

}
