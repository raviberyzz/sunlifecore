package ca.sunlife.web.cms.core.models.v1;

import java.text.SimpleDateFormat;
import java.util.GregorianCalendar;
import java.util.Locale;
import java.util.Map;

import javax.jcr.RepositoryException;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.models.v1.constants.ArticleConstants;
import ca.sunlife.web.cms.core.models.v1.impl.ArticleImpl;
import ca.sunlife.web.cms.core.services.SiteConfigService;

public class ArticleDataExtractor {

	private static final Logger LOGGER = LoggerFactory.getLogger(ArticleDataExtractor.class);

	public void extractData(ArticleImpl article, SiteConfigService configService) {
		try (ResourceResolver resourceResolver = article.getCoreResourceResolver().getResourceResolver()) {

			LOGGER.debug("Reading content fragment {}",
					article.getFragmentPath() + ArticleConstants.JCR_CONTENT_DATA_MASTER);
			final Resource articleResource = resourceResolver
					.getResource(article.getFragmentPath().concat(ArticleConstants.JCR_CONTENT_DATA_MASTER));
			final String pagePath = article.getCurrentPage().getPath();
			if (null != articleResource) {
				LOGGER.debug("Parsing Article Data");
				final ValueMap articleContent = articleResource.getValueMap();

				article.getArticleData().put(ArticleConstants.ARTICLE_HEADLINE,
						getValueMapValue(articleContent, ArticleConstants.ARTICLE_HEADLINE));
				article.getArticleData().put(ArticleConstants.ARTICLE_IMAGE,
						getValueMapValue(articleContent, ArticleConstants.ARTICLE_IMAGE));
				article.getArticleData().put(ArticleConstants.ARTICLE_MAIN_DESCRIPTION,
						getValueMapValue(articleContent, ArticleConstants.ARTICLE_MAIN_DESCRIPTION));
				article.getArticleData().put(ArticleConstants.ARTICLE_READ_TIME,
						getValueMapValue(articleContent, ArticleConstants.ARTICLE_READ_TIME));
				article.getArticleData().put(ArticleConstants.ARTICLE_PAGE_LINK,
						getValueMapValue(articleContent, ArticleConstants.ARTICLE_PAGE_LINK));
				article.getArticleData().put(ArticleConstants.ARTICLE_MINI_DESCRIPTION,
						getValueMapValue(articleContent, ArticleConstants.ARTICLE_MINI_DESCRIPTION));

				setArticlePublishDate(articleContent, article.getCurrentPage(), article.getArticleData(),
						configService);
				setArticleAuthorData(resourceResolver, articleContent, article.getArticleData());
				article.setArticleImage(configService.getConfigValues(ArticleConstants.DOMAIN, pagePath)
						.concat(article.getArticleData().get(ArticleConstants.ARTICLE_IMAGE)));
			}
			LOGGER.debug("Article Data {}", article.getArticleData());
			final ValueMap pageProperties = article.getCurrentPage().getProperties();
			article.setLayoutResourceType(article.getResourceType()
					.substring(0, article.getResourceType().lastIndexOf('/')).concat("/layout-container"));
			article.setPageUrl(configService.getPageUrl(pagePath));
			article.setOgImage(configService.getConfigValues(ArticleConstants.DOMAIN, pagePath)
					.concat(pageProperties.containsKey(ArticleConstants.SOCIAL_MEDIA_IMAGE)
							? (String) pageProperties.getOrDefault(ArticleConstants.SOCIAL_MEDIA_IMAGE,
									StringUtils.EMPTY)
							: configService.getConfigValues(ArticleConstants.SOCIAL_MEDIA_IMAGE, pagePath)));
			article.setOgDescription(pageProperties.containsKey("socialMediaDescripton")
					? pageProperties.get("socialMediaDescripton", String.class)
					: configService.getConfigValues("pageDescription", pagePath));
			final SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
			article.setPageModifiedDate(formatter.format(article.getCurrentPage().getLastModified().getTime()));
			article.setPublisherName(configService.getConfigValues("articlePublisherName", pagePath));
			article.setPublisherLogo(configService.getConfigValues(ArticleConstants.DOMAIN, pagePath)
					.concat(configService.getConfigValues("articlePublisherLogo", pagePath)));
			resourceResolver.close();

		}

		catch (Exception exception) {
			LOGGER.error("Error while extracting data: {}", exception.getMessage(), exception);
		}
	}

	/**
	 * Sets the article author data.
	 *
	 * @param resourceResolver the resource resolver
	 * @param articleContent   the article content
	 */
	public void setArticleAuthorData(final ResourceResolver resourceResolver, final ValueMap articleContent,
			Map<String, String> articleData) {
		if (articleContent.containsKey(ArticleConstants.ARTICLE_AUTHOR)) {
			final String articleAuthorPath = (String) articleContent.getOrDefault(ArticleConstants.ARTICLE_AUTHOR,
					StringUtils.EMPTY);
			final Resource authorResource = resourceResolver
					.getResource(articleAuthorPath.concat(ArticleConstants.JCR_CONTENT_DATA_MASTER));
			if (null != authorResource) {
				final ValueMap authorContent = authorResource.getValueMap();
				articleData.put(ArticleConstants.AUTHOR_NAME,
						authorContent.containsKey(ArticleConstants.AUTHOR_NAME)
								? authorContent.get(ArticleConstants.AUTHOR_NAME, String.class)
								: StringUtils.EMPTY);
				articleData.put(ArticleConstants.AUTHOR_BODY,
						authorContent.containsKey(ArticleConstants.AUTHOR_BODY)
								? authorContent.get(ArticleConstants.AUTHOR_BODY, String.class)
								: StringUtils.EMPTY);
			} else {
				articleData.put(ArticleConstants.AUTHOR_NAME, StringUtils.EMPTY);
				articleData.put(ArticleConstants.AUTHOR_BODY, StringUtils.EMPTY);
			}
		} else {
			articleData.put(ArticleConstants.AUTHOR_NAME, StringUtils.EMPTY);
			articleData.put(ArticleConstants.AUTHOR_BODY, StringUtils.EMPTY);
		}
	}

	/**
	 * Sets the article publish date.
	 *
	 * @param articleContent the new article publish date
	 * @throws LoginException      the login exception
	 * @throws RepositoryException the repository exception
	 */
	public void setArticlePublishDate(final ValueMap articleContent, Page currentPage, Map<String, String> articleData,
			SiteConfigService configService) throws LoginException, RepositoryException {
		String articlePublishedDate = StringUtils.EMPTY;
		String pageLocaleDefault = StringUtils.EMPTY;

		try {
			final String locale = configService.getConfigValues("pageLocale", currentPage.getPath());
			if (null != locale && locale.length() > 0) {
				pageLocaleDefault = locale.contains("-") ? locale.split("-")[0] : locale.split("_")[0];
			}

			LOGGER.debug("Locale is {}", pageLocaleDefault);
			if (articleContent.containsKey(ArticleConstants.ARTICLE_PUBLISHED_DATE)) {
				LOGGER.debug("formatting date to {}",
						configService.getConfigValues("articleDateFormat", currentPage.getPath()));
				LOGGER.debug("Before adding locale");
				final SimpleDateFormat formatter = new SimpleDateFormat(
						configService.getConfigValues("articleDateFormat", currentPage.getPath()),
						new Locale(pageLocaleDefault));
				LOGGER.debug("after adding locale");
				articlePublishedDate = formatter.format(((GregorianCalendar) articleContent
						.getOrDefault(ArticleConstants.ARTICLE_PUBLISHED_DATE, new GregorianCalendar())).getTime());
				LOGGER.debug("After date formatting");
			}
			articleData.put(ArticleConstants.ARTICLE_PUBLISHED_DATE, articlePublishedDate);
		} catch (RepositoryException | LoginException exception) {
			LOGGER.error("Error ::ArticleImpl :: Article published date :: Exception :: {}", exception.getMessage());
		}
	}

	public String getValueMapValue(ValueMap articleContent, String Key) {
		return (articleContent.containsKey(Key) ? articleContent.get(Key, String.class) : StringUtils.EMPTY);

	}

}
