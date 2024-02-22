/*
 *
 */

package ca.sunlife.web.cms.core.models.v1.impl;

import java.text.SimpleDateFormat;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;
import javax.jcr.RepositoryException;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.jcr.resource.api.JcrResourceConstants;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.constants.ArticleConstants;
import ca.sunlife.web.cms.core.models.v1.Article;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import ca.sunlife.web.cms.core.utils.SLAbstractComponentImpl;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

/**
 * The Class ArticleImpl.
 *
 * @author Uma Maheshwaran
 * @version 1.0
 */
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class }, adapters = { Article.class,
		ComponentExporter.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = ArticleConstants.ARTICLE_RESOURCETYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, selector = ExporterConstants.SLING_MODEL_SELECTOR, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ArticleImpl extends SLAbstractComponentImpl implements Article {

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(ArticleImpl.class);

	/** The fragment path. */
	@Inject
	@Via("resource")
	private String fragmentPath;

	/** The resolver. */
	@ScriptVariable
	private ResourceResolver resolver;

	/** The checkbox hide date. */
	@Inject
	@Via("resource")
	private String checkboxHideDate;

	/** The resource type. */
	@Inject
	@Via("resource")
	@Named(JcrResourceConstants.SLING_RESOURCE_TYPE_PROPERTY)
	private String resourceType;

	/** The layout resource type. */
	private String layoutResourceType;

	/** The page url. */
	private String pageUrl;

	/** The og image. */
	private String ogImage;

	/** The og description. */
	private String ogDescription;

	/** The page modified date. */
	private String pageModifiedDate;

	/** The publisher name. */
	private String publisherName;

	/** The publisher logo. */
	private String publisherLogo;

	/** The article image. */
	private String articleImage;

	/** The checkbox to include social share. */
	@Inject
	@Via("resource")
	private String socialShare;

	/**
	 * Gets the article image.
	 *
	 * @return the article image
	 */
	public final String getArticleImage() {
		return articleImage;
	}

	/**
	 * Gets the layout resource type.
	 *
	 * @return the layout resource type
	 */
	public final String getLayoutResourceType() {
		return layoutResourceType;
	}

	/**
	 * Sets the article image.
	 *
	 * @param articleImage the new article image
	 */
	public final void setArticleImage(final String articleImage) {
		this.articleImage = articleImage;
	}

	/**
	 * Gets the og image.
	 *
	 * @return the og image
	 */
	public final String getOgImage() {
		return ogImage;
	}

	/**
	 * Sets the og image.
	 *
	 * @param ogImage the new og image
	 */
	public final void setOgImage(final String ogImage) {
		this.ogImage = ogImage;
	}

	/**
	 * Gets the og description.
	 *
	 * @return the og description
	 */
	public final String getOgDescription() {
		return ogDescription;
	}

	/**
	 * Sets the og description.
	 *
	 * @param ogDescription the new og description
	 */
	public final void setOgDescription(final String ogDescription) {
		this.ogDescription = ogDescription;
	}

	/**
	 * Gets the page modified date.
	 *
	 * @return the page modified date
	 */
	public final String getPageModifiedDate() {
		return pageModifiedDate;
	}

	/**
	 * Sets the page modified date.
	 *
	 * @param pageModifiedDate the new page modified date
	 */
	public final void setPageModifiedDate(final String pageModifiedDate) {
		this.pageModifiedDate = pageModifiedDate;
	}

	/**
	 * Gets the publisher name.
	 *
	 * @return the publisher name
	 */
	public final String getPublisherName() {
		return publisherName;
	}

	/**
	 * Sets the publisher name.
	 *
	 * @param publisherName the new publisher name
	 */
	public final void setPublisherName(final String publisherName) {
		this.publisherName = publisherName;
	}

	/**
	 * Gets the publisher logo.
	 *
	 * @return the publisher logo
	 */
	public final String getPublisherLogo() {
		return publisherLogo;
	}

	/**
	 * Sets the publisher logo.
	 *
	 * @param publisherLogo the new publisher logo
	 */
	public final void setPublisherLogo(final String publisherLogo) {
		this.publisherLogo = publisherLogo;
	}

	/**
	 * Gets the page url.
	 *
	 * @return the page url
	 */
	public final String getPageUrl() {
		return pageUrl;
	}

	/**
	 * Sets the page url.
	 *
	 * @param pageUrl the new page url
	 */
	public final void setPageUrl(final String pageUrl) {
		this.pageUrl = pageUrl;
	}

	/** The config service. */
	@Inject
	private SiteConfigService configService;

	/** The core resource resolver. */
	@Inject
	private CoreResourceResolver coreResourceResolver;

	/** The current page. */
	@ScriptVariable
	private Page currentPage;

	/** The article data. */
	private final Map<String, String> articleData = new HashMap<>();

	/**
	 * Gets the article data.
	 *
	 * @return the article data
	 */
	public Map<String, String> getArticleData() {
		return articleData;
	}

	/**
	 * Gets the fragment path.
	 *
	 * @return the fragment path
	 */
	public String getFragmentPath() {
		return fragmentPath;
	}

	/**
	 * Gets the Check box Social Share.
	 *
	 * @return the Check box Social Share
	 */
	public String getSocialShare() {
		return socialShare;
	}

	/**
	 * Sets the fragment path.
	 *
	 * @param fragmentPath the new fragment path
	 */
	public void setFragmentPath(final String fragmentPath) {
		this.fragmentPath = fragmentPath;
	}

	/**
	 * Gets the checkbox hide date.
	 *
	 * @return the checkbox hide date
	 */
	public String getCheckboxHideDate() {
		return checkboxHideDate;
	}

	/**
	 * Sets the checkbox hide date.
	 *
	 * @param checkboxHideDate the new checkbox hide date
	 */
	public void setCheckboxHideDate(final String checkboxHideDate) {
		this.checkboxHideDate = checkboxHideDate;
	}

	/**
	 * Gets the resource type.
	 *
	 * @return the resource type
	 */
	public String getResourceType() {
		return resourceType;
	}

	/**
	 * Sets the resource type.
	 *
	 * @param resourceType the new resource type
	 */
	public void setResourceType(final String resourceType) {
		this.resourceType = resourceType;
	}

	/**
	 * Inits the.
	 */
	@PostConstruct
	public void init() {
		if (StringUtils.isEmpty(getFragmentPath())) {
			return;
		}
		try {
			final ResourceResolver resourceResolver = coreResourceResolver.getResourceResolver();
			LOGGER.debug("Reading content fragment {}", getFragmentPath() + ArticleConstants.JCR_CONTENT_DATA_MASTER);
			final Resource articleResource = resourceResolver
					.getResource(getFragmentPath().concat(ArticleConstants.JCR_CONTENT_DATA_MASTER));
			final String pagePath = currentPage.getPath();
			if (null != articleResource) {
				LOGGER.debug("Parsing Article Data");
				final ValueMap articleContent = articleResource.getValueMap();

				articleData.put(ArticleConstants.ARTICLE_HEADLINE,
						getValueMapValue(articleContent, ArticleConstants.ARTICLE_HEADLINE));
				articleData.put(ArticleConstants.ARTICLE_IMAGE,
						getValueMapValue(articleContent, ArticleConstants.ARTICLE_IMAGE));
				articleData.put(ArticleConstants.ARTICLE_MAIN_DESCRIPTION,
						getValueMapValue(articleContent, ArticleConstants.ARTICLE_MAIN_DESCRIPTION));
				articleData.put(ArticleConstants.ARTICLE_READ_TIME,
						getValueMapValue(articleContent, ArticleConstants.ARTICLE_READ_TIME));
				articleData.put(ArticleConstants.ARTICLE_PAGE_LINK,
						getValueMapValue(articleContent, ArticleConstants.ARTICLE_PAGE_LINK));
				articleData.put(ArticleConstants.ARTICLE_MINI_DESCRIPTION,
						getValueMapValue(articleContent, ArticleConstants.ARTICLE_MINI_DESCRIPTION));

				setArticlePublishDate(articleContent);
				setArticleAuthorData(resourceResolver, articleContent);
				setArticleImage(configService.getConfigValues(ArticleConstants.DOMAIN, pagePath)
						.concat(articleData.get(ArticleConstants.ARTICLE_IMAGE)));
			}
			LOGGER.debug("Article Data {}", articleData);
			final ValueMap pageProperties = currentPage.getProperties();
			layoutResourceType = resourceType.substring(0, resourceType.lastIndexOf('/')).concat("/layout-container");
			setPageUrl(configService.getPageUrl(pagePath));
			setOgImage(configService.getConfigValues(ArticleConstants.DOMAIN, pagePath)
					.concat(pageProperties.containsKey(ArticleConstants.SOCIAL_MEDIA_IMAGE)
							? (String) pageProperties.getOrDefault(ArticleConstants.SOCIAL_MEDIA_IMAGE,
									StringUtils.EMPTY)
							: configService.getConfigValues(ArticleConstants.SOCIAL_MEDIA_IMAGE, pagePath)));
			setOgDescription(pageProperties.containsKey("socialMediaDescripton")
					? pageProperties.get("socialMediaDescripton", String.class)
					: configService.getConfigValues("pageDescription", pagePath));
			final SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
			setPageModifiedDate(formatter.format(currentPage.getLastModified().getTime()));
			setPublisherName(configService.getConfigValues("articlePublisherName", pagePath));
			setPublisherLogo(configService.getConfigValues(ArticleConstants.DOMAIN, pagePath)
					.concat(configService.getConfigValues("articlePublisherLogo", pagePath)));
			resourceResolver.close();
		} catch (LoginException | RepositoryException e) {
			LOGGER.error("Login Error while getting resource resolver : {}", e);
		}
	}

	/**
	 * Sets the article author data.
	 *
	 * @param resourceResolver the resource resolver
	 * @param articleContent   the article content
	 */
	private void setArticleAuthorData(final ResourceResolver resourceResolver, final ValueMap articleContent) {
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
	private void setArticlePublishDate(final ValueMap articleContent) throws LoginException, RepositoryException {
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
		} catch (RepositoryException | org.apache.sling.api.resource.LoginException e) {
			LOGGER.error("Error ::ArticleModel :: Article published date :: Exception :: {}", e);
		}
	}

	public static String getValueMapValue(ValueMap articleContent, String Key) {
		return (articleContent.containsKey(Key) ? articleContent.get(Key, String.class) : StringUtils.EMPTY);

	}

}
