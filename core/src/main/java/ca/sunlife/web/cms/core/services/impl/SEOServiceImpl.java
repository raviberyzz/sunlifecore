
package ca.sunlife.web.cms.core.services.impl;

import ca.sunlife.web.cms.core.constants.AdvisorDetailConstants;
import ca.sunlife.web.cms.core.constants.ArticleConstants;
import ca.sunlife.web.cms.core.constants.v1.BasePageModelConstants;
import ca.sunlife.web.cms.core.services.SEOService;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.GregorianCalendar;
import java.util.Map;


@Component(service = {SEOService.class}, immediate = true)
public class SEOServiceImpl implements SEOService {

    private static final Logger LOG = LoggerFactory.getLogger(SEOService.class);

    @Override
    public Map<String, String> setArticlePageSocialMetaTags(ResourceResolver resolver, String pagePath, SiteConfigService configService, Map<String, String> customMetadata) throws LoginException, RepositoryException {
        LOG.debug("Entry :: BasePageModel :: setArticlePageSocialMetaTags :: ");
        final String articleType = configService.getConfigValues(ArticleConstants.ARTICLE_TYPE_CONSTANT,
                pagePath);
        final String articlePublisherForMetaTag = configService
                .getConfigValues(ArticleConstants.ARTICLE_PUBLISHER_CONSTANT, pagePath);
        final String siteName = configService.getConfigValues("siteName", pagePath);
        final String articleSite = configService.getConfigValues(ArticleConstants.ARTICLE_SITE_CONSTANT,
                pagePath);
        final String articleCreator = configService
                .getConfigValues(ArticleConstants.ARTICLE_CREATOR_CONSTANT, pagePath);

        customMetadata.put(BasePageModelConstants.OG_TYPE, articleType);
        customMetadata.put(BasePageModelConstants.OG_PUBLISHER, articlePublisherForMetaTag);
        customMetadata.put(BasePageModelConstants.OG_SITENAME, siteName);
        customMetadata.put(BasePageModelConstants.TWITTER_SITE, articleSite);
        customMetadata.put(BasePageModelConstants.TWITTER_CREATOR, articleCreator);

        final String articlePath = pagePath
                + "/jcr:content/root/layout_container/container1/layout_container/container1/article";
        final Resource articleResource = null != resolver ? resolver.getResource(articlePath) : null;
        if (null == articleResource) {
            LOG.debug("articleResource is null");
            return customMetadata;
        }
        final ValueMap articleResContent = articleResource.getValueMap();

        final String fragmentPath = articleResContent.containsKey("fragmentPath")
                ? articleResContent.get("fragmentPath", String.class)
                : null;
        String articlePublishedDate = StringUtils.EMPTY;
        String articlePublishedModifiedDate = StringUtils.EMPTY;

        if (null == fragmentPath) {
            LOG.debug("fragmentPath is null");
            return customMetadata;
        }

        final Resource articleFragmentResource = resolver
                .getResource(fragmentPath.concat(BasePageModelConstants.JCR_CONTENT_DATA_MASTER));
        if (null == articleFragmentResource) {
            LOG.debug("articleFragmentResource is null");
            return customMetadata;
        }
        final ValueMap articleContent = articleFragmentResource.getValueMap();

        final SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
        if (articleContent.containsKey(BasePageModelConstants.ARTICLE_PUBLISHED_DATE)) {
            articlePublishedDate = formatter.format(((GregorianCalendar) articleContent
                    .getOrDefault(BasePageModelConstants.ARTICLE_PUBLISHED_DATE, new GregorianCalendar())).getTime());
        }

        if (articleContent.containsKey(BasePageModelConstants.ARTICLE_MODIFIED_DATE)) {
            articlePublishedModifiedDate = formatter.format(((GregorianCalendar) articleContent
                    .getOrDefault(BasePageModelConstants.ARTICLE_MODIFIED_DATE, new GregorianCalendar())).getTime());
        }

        customMetadata.put(BasePageModelConstants.OG_PUBLISHED_DATE, articlePublishedDate);
        customMetadata.put(BasePageModelConstants.OG_MODIFIED_DATE, articlePublishedModifiedDate);
        LOG.debug("Exit :: BasePageModel :: setArticlePageSocialMetaTags :: ");
        return customMetadata;
    }


}

