package ca.sunlife.web.cms.core.models;

import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import javax.annotation.PostConstruct;
import javax.inject.Inject;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import com.day.cq.wcm.api.Page;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.jcr.Node;
import javax.jcr.Value;
import javax.jcr.Property;
import java.util.Iterator;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import javax.jcr.Session;
import java.io.IOException;
import javax.jcr.PathNotFoundException;
import javax.jcr.ValueFormatException;
import javax.jcr.RepositoryException;
import org.apache.sling.api.resource.LoginException;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;

import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.SearchResult;
import com.adobe.cq.dam.cfm.converter.ContentTypeConverter;
import com.adobe.cq.wcm.core.components.internal.models.v1.contentfragment.DAMContentFragmentImpl;
import com.adobe.cq.wcm.core.components.models.contentfragment.DAMContentFragment;
import com.day.cq.commons.jcr.JcrConstants;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ProductCardModel {

	@Inject
	@Via("resource")
	private String topc;

	@Inject
	@Via("resource")
	private String fragmentPath;

	@Inject
	@Via("resource")
	private String folderPath;
	
	@Inject
	@Via("resource")
	private String title;
	
	@Inject
	@Via("resource")
	private String icon;
	
	@Inject
	@Via("resource")
	private String text;
	
	@Inject
	@Via("resource")
	private String cardIsFeatured;

	@Inject
	private SiteConfigService configService;

	@ScriptVariable
	private Page currentPage;

	@Inject
	private CoreResourceResolver coreResourceResolver;

	@Inject
	private ContentTypeConverter contentTypeConverter;

	// Static final variables
	private static final String JCR_CONTENT_DATA = "/jcr:content/data";
	private static final String JCR_CONTENT_METADATA = "/jcr:content/metadata";
	private static final String PC_PATH = "pcPath";
	private static final String PC_FEATURED_CARD = "pcFeaturedCard";
	private static final String PC_FEATURED_CARD_IMAGE = "pcFeaturedCardImage";
	private static final String PC_IMAGE = "pcImage";
	private static final String PC_HEADING = "pcHeading";
	private static final String PC_CONTENT = "pcContent";
	// private static final ResourceResolver resourceResolver=null;
	private static final String[] ELEMENT_NAMES = { "productCardHeading", "productCardImage", "productCardContent",
			"productCardPagePath", "featuredCard" };
	private String featuredImagePath;
	private final Map<String, String> pcData = new HashMap<>();
	private final List<Map<String, String>> listOfProductCards = new ArrayList<>();
	// private final List<DAMContentFragment> items = new ArrayList<>();
	private final List<DAMContentFragment> itemList = new ArrayList<>();

	private ResourceResolver resourceResolver;

	private String articleCFPath;
	private static final Logger LOG = LoggerFactory.getLogger(ProductCardModel.class);

	public String getTopc() {
		return topc;
	}

	public void setTopc(String topc) {
		this.topc = topc;
	}

	public String getFragmentPath() {
		return fragmentPath;
	}

	public void setFragmentPath(String fragmentPath) {
		this.fragmentPath = fragmentPath;
	}

	public String getFolderPath() {
		return folderPath;
	}

	public void setFolderPath(String folderPath) {
		this.folderPath = folderPath;
	}

	public final Map<String, String> getPcData() {
		return pcData;
	}

	public final List<Map<String, String>> getListOfProductCards() {
		return listOfProductCards;
	}

	public String getFeaturedImagePath() {
		return featuredImagePath;
	}

	public void setFeaturedImagePath(String featuredImagePath) {
		this.featuredImagePath = featuredImagePath;
	}

	public List<DAMContentFragment> getItemList() {
		return itemList;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getCardIsFeatured() {
		return cardIsFeatured;
	}

	public void setCardIsFeatured(String cardIsFeatured) {
		this.cardIsFeatured = cardIsFeatured;
	}

	private String nullCheck(String value) {
		return value.equalsIgnoreCase(null) ? StringUtils.EMPTY : value;
	}

	@PostConstruct
	private void init() {
		
		/*if (StringUtils.isEmpty(getFragmentPath()) && StringUtils.isEmpty(getFolderPath()) && !("rightNav".equalsIgnoreCase(getTopc()))) {
			return;
		}*/

		try {
			featuredImagePath = configService.getConfigValues("featuredImagePath", currentPage.getPath());
			if (topc.equalsIgnoreCase("static")) {
				getProductCardData(getFragmentPath());
				LOG.debug("Sent Product Card data for static cards");
			} else if (topc.equalsIgnoreCase("dynamic")) {
				LOG.debug("Dynamic option selected");
				getProductCardDataDynamic(getFolderPath());

			} else if (topc.equalsIgnoreCase("rightnav")) {
				LOG.debug("Rignt Nav option selected");
			}
		} catch (Exception ex) {
			LOG.error("Exception occured in main :: " + ex);
		}

	}

	public void getProductCardData(String path) {
		try {
			ResourceResolver pcResourceResolver = coreResourceResolver.getResourceResolver();
			LOG.debug("Reading content fragment {}", path.concat(JCR_CONTENT_DATA));
			final Resource pcResource = pcResourceResolver.getResource(path.concat(JCR_CONTENT_DATA));
			if (null != pcResource) {
				LOG.debug("Parsing Content Fragment Data");
				Node node = pcResource.adaptTo(Node.class);
				LOG.debug("node adapted");
				if (null != node && node.hasNodes()) {
					Iterator<Node> ite = node.getNodes();
					while (ite.hasNext()) {
						Node childNode = ite.next();
						pcData.put(PC_HEADING, nullCheck(childNode.getProperty("productCardHeading").getString()));
						pcData.put(PC_IMAGE, nullCheck(childNode.getProperty("productCardImage").getString()));
						pcData.put(PC_CONTENT, nullCheck(childNode.getProperty("productCardContent").getString()));
						pcData.put(PC_PATH, nullCheck(childNode.getProperty("productCardPagePath").getString()));
						pcData.put(PC_FEATURED_CARD,
								childNode.getProperty("featuredCard").getBoolean() ? "true" : null);
						if (childNode.getProperty("featuredCard").getBoolean()) {
							pcData.put(PC_FEATURED_CARD_IMAGE,
									configService.getConfigValues("featuredImagePath", currentPage.getPath()));
						}
						LOG.debug("Added data to hash map :: " + pcData.get("pcHeading"));
						if (listOfProductCards.size() <= 3) {
							listOfProductCards.add(pcData);
							LOG.debug("Added map to array");
						}
					}

				}

			} else {
				LOG.debug("productCard resouce is null ");
			}
		} catch (PathNotFoundException pathEx) {
			LOG.error("Exception occured :: Path not found {}", pathEx);
		} catch (ValueFormatException valEx) {
			LOG.error("Exception occured :: Incorrect value format {}", valEx);
		} catch (RepositoryException repEx) {
			LOG.error("Exception occured :: Repository not found {}", repEx);
		} catch (LoginException logEx) {
			LOG.error("Exception occured :: Login failed {}", logEx);
		}

	}

	public void getProductCardDataDynamic(String folderPath) throws IOException, ApplicationException, SystemException {
		ResourceResolver resourceResolver = null;
		try {
			resourceResolver = coreResourceResolver.getResourceResolver();
			final Session session = resourceResolver.adaptTo(Session.class);
			if (session == null) {
				LOG.warn("Session was null therefore no query was executed");
				return;
			}
			final QueryBuilder queryBuilder = resourceResolver.adaptTo(QueryBuilder.class);
			if (queryBuilder == null) {
				LOG.warn("Query builder was null therefore no query was executed");
				return;
			}
			List<String> articleTags = getTags(getArticleCFPath(currentPage.getPath()));

			switch (articleTags.size()) {
			case 0: {
				LOG.info("Article does not contain any tags.");
				break;
			}

			case 1: {
				LOG.info("Article does not contains 1 tag.");
				itemList.addAll(getContentFragmentList(folderPath, queryBuilder, session, articleTags.get(0), 3));
				LOG.info("Number of results {}", itemList.size());
				break;
			}

			case 2: {
				LOG.info("Article does not contains 2 tags.");
				itemList.addAll(getContentFragmentList(folderPath, queryBuilder, session, articleTags.get(0), 2));

				if (itemList.size() == 2) {
					itemList.addAll(1,
							getContentFragmentList(folderPath, queryBuilder, session, articleTags.get(1), 1));

				} else {
					itemList.addAll(getContentFragmentList(folderPath, queryBuilder, session, articleTags.get(1), 2));
				}

				break;
			}

			case 3: {
				LOG.info("Article does not contains 3 tags.");
				getContentFragmentList(folderPath, queryBuilder, session, articleTags.get(0), 1);
				itemList.addAll(getContentFragmentList(folderPath, queryBuilder, session, articleTags.get(0), 1));
				itemList.addAll(getContentFragmentList(folderPath, queryBuilder, session, articleTags.get(1), 1));
				itemList.addAll(getContentFragmentList(folderPath, queryBuilder, session, articleTags.get(2), 1));
				break;
			}
			}

		} catch (LoginException e) {
			LOG.error("Login exception while trying to get resource resolver {}", e);
		} finally {
			if (null != resourceResolver) {
				resourceResolver.close();
			}
		}
	}

	private List<DAMContentFragment> getContentFragmentList(String folderPath, QueryBuilder queryBuilder,
			Session session, String tag, int limit) {
		int offset = 0;
		List<DAMContentFragment> items = new ArrayList<>();
		final Map<String, String> queryParameterMap = new HashMap<>();
		queryParameterMap.put("path", folderPath);
		queryParameterMap.put("type", com.day.cq.dam.api.DamConstants.NT_DAM_ASSET);
		queryParameterMap.put("p.limit", Integer.toString(limit));
		queryParameterMap.put("p.offset", Integer.toString(offset));
		queryParameterMap.put("1_property", JcrConstants.JCR_CONTENT + "/data/cq:model");
		queryParameterMap.put("1_property.value", "/conf/sunlife-apac/settings/dam/cfm/models/product-card-model");
		queryParameterMap.put("tagid.property", JcrConstants.JCR_CONTENT + "/metadata/cq:tags");
		queryParameterMap.put("tagid", tag);
		queryParameterMap.put("orderby", "@" + JcrConstants.JCR_CONTENT + "/data/master/productCardName");

		final PredicateGroup predicateGroup = PredicateGroup.create(queryParameterMap);
		LOG.debug("Query Params : {} : predicateGroup {}", queryParameterMap, predicateGroup);
		final Query query = queryBuilder.createQuery(predicateGroup, session);

		final SearchResult searchResult = query.getResult();

		LOG.debug("Query statement: '{}' : total matches: {}", searchResult.getQueryStatement(),
				searchResult.getTotalMatches());
		// Query builder has a leaking resource resolver, so the following work around
		// is required.
		ResourceResolver leakingResourceResolver = null;
		try {
			// Iterate over the hits if you need special information
			final Iterator<Resource> resourceIterator = searchResult.getResources();
			while (resourceIterator.hasNext()) {
				final Resource resource = resourceIterator.next();
				if (leakingResourceResolver == null) {
					// Get a reference to QB's leaking resource resolver
					leakingResourceResolver = resource.getResourceResolver();
				}

				final DAMContentFragment contentFragmentModel = new DAMContentFragmentImpl(resource,
						contentTypeConverter, null, ELEMENT_NAMES);

				items.add(contentFragmentModel);
			}
		} finally {
			if (null != leakingResourceResolver) {
				// Always close the leaking query builder resource resolver
				leakingResourceResolver.close();
			}
		}

		return items;
	}

	public ArrayList<String> getTags(String path) {
		ArrayList<String> tagList = new ArrayList<String>();
		try {
			resourceResolver = coreResourceResolver.getResourceResolver();
			final Resource productCardMetadata = resourceResolver.getResource(path + JCR_CONTENT_METADATA);
			if (null != productCardMetadata) {
				LOG.info("Fetching metadata");
				Node metaNode = productCardMetadata.adaptTo(Node.class);
				LOG.info("Metanode is :: " + metaNode);
				if (null != metaNode) {
					Property tagArray = metaNode.getProperty("cq:tags");
					Value[] tags = tagArray.getValues();
					for (int i = 0; i < tags.length; i++) {
						tagList.add(tags[i].toString());
					}
				}
			}
			resourceResolver.close();

		} catch (Exception ex) {
			LOG.info("Exception occured :: in tags" + ex);
		}

		return tagList;

	}

	public String getArticleCFPath(String path) {
		if (!path.equals("")) {
			try {
				ResourceResolver acfpResourceResolver = coreResourceResolver.getResourceResolver();
				final Resource pageResource = acfpResourceResolver.getResource(path);
				Node startNode = pageResource.adaptTo(Node.class);
				Iterator<Node> iterator = startNode.getNodes();
				while (iterator.hasNext()) {
					Node childNode = iterator.next();
					if (childNode.hasProperty("articleID")) {
						articleCFPath = childNode.getProperty("fragmentPath").getString();
						LOG.info("Article path is :: " + articleCFPath);
						break;
					} else {
						getArticleCFPath(childNode.getPath());
					}
				}
				acfpResourceResolver.close();
			} catch (Exception e) {
				LOG.info("Exception occured while fetching article path :: " + e);
			}
		}
		return articleCFPath;
	}
}
