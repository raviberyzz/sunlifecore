/*
 *
 */

package ca.sunlife.web.cms.core.models.v1.impl;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.jcr.resource.api.JcrResourceConstants;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.util.AbstractComponentImpl;
import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.models.v1.Article;
import ca.sunlife.web.cms.core.models.v1.ArticleDataExtractor;
import ca.sunlife.web.cms.core.models.v1.constants.ArticleConstants;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.SiteConfigService;


/**
 * The Class ArticleImpl.
 *
 * @author Uma Maheshwaran
 * @version 1.0
 */
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class }, adapters = { Article.class,
		ComponentExporter.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = ArticleConstants.ARTICLE_RESOURCETYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, selector = ExporterConstants.SLING_MODEL_SELECTOR, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ArticleImpl extends AbstractComponentImpl implements Article {

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(ArticleImpl.class);

	/** The fragment path. */
	@ValueMapValue
	private String fragmentPath;

	/** The resolver. */
	@ScriptVariable
	private ResourceResolver resolver;

	/** The checkbox hide date. */
	@ValueMapValue
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

	/** The checkbox to include social share. */
	@ValueMapValue
	private String socialShare;

	/** The checkbox to include social share. */
	@ValueMapValue
	private String spacing;

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
	 * Gets the Social Share value.
	 *
	 * @return the social share value
	 */
	public String getSocialShare() {
		return socialShare;
	}

	/**
	 * Gets the Spacing value.
	 *
	 * @return the spacing value
	 */
	public String getSpacing() {
		return spacing;
	}

	/**
	 * Gets the Current Page.
	 *
	 * @return the Current Page
	 */
	@Override
	public Page getCurrentPage() {
		return currentPage;
	}

	/**
	 * Inits the.
	 */
	@PostConstruct
	public void init() {
		if (StringUtils.isEmpty(getFragmentPath())) {
			return;
		}
		ArticleDataExtractor dataExtractor = new ArticleDataExtractor();
		dataExtractor.extractData(this, configService);
	}

	public CoreResourceResolver getCoreResourceResolver() {
		return coreResourceResolver;
	}

	public void setLayoutResourceType(String layoutResourceType) {
		this.layoutResourceType = layoutResourceType;
	}

}
