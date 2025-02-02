
package ca.sunlife.web.cms.core.services.impl;

import ca.sunlife.web.cms.core.constants.ArticleConstants;
import ca.sunlife.web.cms.core.constants.v1.BasePageModelConstants;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.SEOService;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.SimpleDateFormat;
import java.util.GregorianCalendar;
import java.util.Map;


@Component(service = {SEOService.class}, immediate = true)
public class SEOServiceImpl implements SEOService {

    private static final Logger LOGGER = LoggerFactory.getLogger(SEOService.class);
    private static final String SITE_NAME = "siteName";
    private static final String ARTICLE_PATH = "/jcr:content/root/layout_container/container1/layout_container/container1/article";
    private static final String FRAGMENT_PATH = "fragmentPath";
    private static final String DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSSZ";

    @Reference
    SiteConfigService configService;

    @Reference
    CoreResourceResolver coreResourceResolver;

    @Override
    public Map<String, String> setArticlePageSocialMetaTags(String pagePath, Map<String, String> customMetadata) {
        LOGGER.debug("Entry :: setArticlePageSocialMetaTags :: ");
        try (ResourceResolver resolver = coreResourceResolver.getResourceResolver()) {
            final String articleType = configService.getConfigValues(ArticleConstants.ARTICLE_TYPE_CONSTANT,
                    pagePath);
            final String articlePublisherForMetaTag = configService
                    .getConfigValues(ArticleConstants.ARTICLE_PUBLISHER_CONSTANT, pagePath);
            final String siteName = configService.getConfigValues(SITE_NAME, pagePath);
            final String articleSite = configService.getConfigValues(ArticleConstants.ARTICLE_SITE_CONSTANT,
                    pagePath);
            final String articleCreator = configService
                    .getConfigValues(ArticleConstants.ARTICLE_CREATOR_CONSTANT, pagePath);

            customMetadata.put(BasePageModelConstants.OG_TYPE, articleType);
            customMetadata.put(BasePageModelConstants.OG_PUBLISHER, articlePublisherForMetaTag);
            customMetadata.put(BasePageModelConstants.OG_SITENAME, siteName);
            customMetadata.put(BasePageModelConstants.TWITTER_SITE, articleSite);
            customMetadata.put(BasePageModelConstants.TWITTER_CREATOR, articleCreator);

            final String articlePath = pagePath + ARTICLE_PATH;

            final Resource articleResource = null != resolver ? resolver.getResource(articlePath) : null;
            if (null == articleResource) {
                LOGGER.debug("articleResource is null");
                return customMetadata;
            }
            final ValueMap articleResContent = articleResource.getValueMap();

            final String fragmentPath = articleResContent.containsKey(FRAGMENT_PATH)
                    ? articleResContent.get(FRAGMENT_PATH, String.class)
                    : null;
            String articlePublishedDate = StringUtils.EMPTY;
            String articlePublishedModifiedDate = StringUtils.EMPTY;

            if (null == fragmentPath) {
                LOGGER.debug("fragmentPath is null");
                return customMetadata;
            }

            final Resource articleFragmentResource = resolver
                    .getResource(fragmentPath.concat(BasePageModelConstants.JCR_CONTENT_DATA_MASTER));
            if (null == articleFragmentResource) {
                LOGGER.debug("articleFragmentResource is null");
                return customMetadata;
            }

            final ValueMap articleContent = articleFragmentResource.getValueMap();

            final SimpleDateFormat formatter = new SimpleDateFormat(DATE_FORMAT);
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
        } catch (Exception e) {
            LOGGER.error("Error while setting article page social meta tags", e);
        }
        LOGGER.debug("Exit :: setArticlePageSocialMetaTags :: ");
        return customMetadata;
    }

    @Activate
    public void activate() {
        LOGGER.debug("Entry :: activate method of SEOServiceImpl");
    }


}

