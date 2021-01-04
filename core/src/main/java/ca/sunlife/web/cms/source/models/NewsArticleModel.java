/*
 *
 */
package ca.sunlife.web.cms.source.models;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

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
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import ca.sunlife.web.cms.source.constants.NewsConstants;

/**
 * The Class NewsArticleModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, adapters = NewsArticleModel.class, resourceType = "sunlife/source/components/content/news-announcement")
public class NewsArticleModel {

	/** The Constant JCR_CONTENT_DATA_MASTER. */
	private static final String JCR_CONTENT_DATA_MASTER = "/jcr:content/data/master";

	/** The Constant JCR_CONTENT_METADATA. */
	private static final String JCR_CONTENT_METADATA = "/jcr:content/metadata";

	/** The Constant logger. */
	private static final Logger LOGGER = LoggerFactory.getLogger(NewsArticleModel.class);

	/** The fragment path. */
	@ Inject
	@ Via("resource")
	private String fragmentPath;

	/** The resolver. */
	@ ScriptVariable
	private ResourceResolver resolver;

	/** The checkbox hide date. */
	@ Inject
	@ Via("resource")
	private String checkboxHideDate;

	/** The checkbox hide tags. */
	@ Inject
	@ Via("resource")
	private String checkboxDisplayTags;

	/** The checkbox display rating. */
	@ Inject
	@ Via("resource")
	private String checkboxDisplayRating;

	/** The checkbox display comments. */
	@ Inject
	@ Via("resource")
	private String checkboxDisplayComments;

	/** The config service. */
	@ Inject
	private SiteConfigService configService;

	/** The core resource resolver. */
	@ Inject
	private CoreResourceResolver coreResourceResolver;

	/** The current page. */
	@ ScriptVariable
	private Page currentPage;

	/** The article data. */
	private final Map<String, String> articleData = new HashMap<>();

	/** The tag list. */
	private List<String> tagList = new ArrayList<>();

	/** The resource type. */
	@ Inject
	@ Via("resource")
	@ Named(JcrResourceConstants.SLING_RESOURCE_TYPE_PROPERTY)
	private String resourceType;

	/** The layout resource type. */
	private String layoutResourceType;

	/** The page locale default. */
	private String pageLocaleDefault;

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
	 * @param fragmentPath
	 *          the new fragment path
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
	 * @param checkboxHideDate
	 *          the new checkbox hide date
	 */
	public void setCheckboxHideDate(final String checkboxHideDate) {
		this.checkboxHideDate = checkboxHideDate;
	}

	/**
	 * Gets the checkbox display tags.
	 *
	 * @return the checkbox display tags
	 */
	public String getCheckboxDisplayTags() {
		return checkboxDisplayTags;
	}

	/**
	 * Sets the checkbox display tags.
	 *
	 * @param checkboxDisplayTags
	 *          the new checkbox display tags
	 */
	public void setCheckboxDisplayTags(String checkboxDisplayTags) {
		this.checkboxDisplayTags = checkboxDisplayTags;
	}

	/**
	 * Gets the checkbox display rating.
	 *
	 * @return the checkbox display rating
	 */
	public String getCheckboxDisplayRating() {
		return checkboxDisplayRating;
	}

	/**
	 * Sets the checkbox display rating.
	 *
	 * @param checkboxDisplayRating
	 *          the new checkbox display rating
	 */
	public void setCheckboxDisplayRating(String checkboxDisplayRating) {
		this.checkboxDisplayRating = checkboxDisplayRating;
	}

	/**
	 * Gets the checkbox display comments.
	 *
	 * @return the checkbox display comments
	 */
	public String getCheckboxDisplayComments() {
		return checkboxDisplayComments;
	}

	/**
	 * Sets the checkbox display comments.
	 *
	 * @param checkboxDisplayComments
	 *          the new checkbox display comments
	 */
	public void setCheckboxDisplayComments(String checkboxDisplayComments) {
		this.checkboxDisplayComments = checkboxDisplayComments;
	}

	/**
	 * Gets the tag list.
	 *
	 * @return the tag list
	 */
	public List<String> getTagList() {
		return Collections.unmodifiableList(tagList);
	}

	/**
	 * Sets the tag list.
	 *
	 * @param tagList
	 *          the new tag list
	 */
	public void setTagList(List<String> tagList) {
		this.tagList = Collections.unmodifiableList(tagList);
	}

	/**
	 * Gets the resourceType.
	 *
	 * @return the resourceType
	 */
	public String getResourceType() {
		return resourceType;
	}

	/**
	 * Sets the resourceType.
	 *
	 * @param resourceType
	 *          resourceType
	 */
	public void setResourceType(String resourceType) {
		this.resourceType = resourceType;
	}

	/**
	 * Gets the layoutResourceType.
	 *
	 * @return the layoutResourceType
	 */
	public String getLayoutResourceType() {
		return layoutResourceType;
	}

	/**
	 * Sets the layoutResourceType.
	 *
	 * @param layoutResourceType
	 *          layoutResourceType
	 */
	public void setLayoutResourceType(String layoutResourceType) {
		this.layoutResourceType = layoutResourceType;
	}

	/**
	 * Gets the pageLocaleDefault.
	 * 
	 * @return the pageLocaleDefault
	 */
	public String getPageLocaleDefault() {
		return pageLocaleDefault;
	}

	/**
	 * @param pageLocaleDefault
	 *          the pageLocaleDefault to set.
	 */
	public void setPageLocaleDefault(String pageLocaleDefault) {
		this.pageLocaleDefault = pageLocaleDefault;
	}

	/**
	 * Inits the.
	 */
	@ PostConstruct
	public void init() {
		if (StringUtils.isEmpty(getFragmentPath())) {
			return;
		}
		try {
			final ResourceResolver resourceResolver = coreResourceResolver.getResourceResolver();
			LOGGER.debug("Reading content fragment {}", getFragmentPath() + JCR_CONTENT_DATA_MASTER);
			final Resource articleResource = resourceResolver.getResource(getFragmentPath().concat(JCR_CONTENT_DATA_MASTER));
			if (null != articleResource) {
				LOGGER.debug("Parsing Article Data");
				final ValueMap articleContent = articleResource.getValueMap();
				articleData.put(NewsConstants.HEADING_CONSTANT,
						articleContent.containsKey(NewsConstants.HEADING_CONSTANT)
								? articleContent.get(NewsConstants.HEADING_CONSTANT, String.class)
								: StringUtils.EMPTY);
				articleData.put(NewsConstants.ARTICLE_SUMMARY_CONSTANT,
						articleContent.containsKey(NewsConstants.ARTICLE_SUMMARY_CONSTANT)
								? articleContent.get(NewsConstants.ARTICLE_SUMMARY_CONSTANT, String.class)
								: StringUtils.EMPTY);
				articleData.put(NewsConstants.PAGE_CONSTANT,
						articleContent.containsKey(NewsConstants.PAGE_CONSTANT)
								? articleContent.get(NewsConstants.PAGE_CONSTANT, String.class)
								: StringUtils.EMPTY);
				articleData.put(NewsConstants.THUMBNAIL_IMAGE_CONSTANT,
						articleContent.containsKey(NewsConstants.THUMBNAIL_IMAGE_CONSTANT)
								? articleContent.get(NewsConstants.THUMBNAIL_IMAGE_CONSTANT, String.class)
								: StringUtils.EMPTY);
				articleData.put(NewsConstants.THUMBNAIL_IMAGE_FEATURED_CONSTANT,
						articleContent.containsKey(NewsConstants.THUMBNAIL_IMAGE_FEATURED_CONSTANT)
								? articleContent.get(NewsConstants.THUMBNAIL_IMAGE_FEATURED_CONSTANT, String.class)
								: StringUtils.EMPTY);
				articleData.put(NewsConstants.PIN_ARTICLE_CONSTANT,
						articleContent.containsKey(NewsConstants.PIN_ARTICLE_CONSTANT)
								? articleContent.get(NewsConstants.PIN_ARTICLE_CONSTANT, String.class)
								: StringUtils.EMPTY);
				setArticlePublishDate(articleContent);
			}
			final Resource metaDataResource = resourceResolver.getResource(getFragmentPath().concat(JCR_CONTENT_METADATA));
			if (null != metaDataResource) {
				final TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
				final Tag[] tags = null != tagManager ? tagManager.getTags(metaDataResource) : null;
				final Locale locale = new Locale(pageLocaleDefault);
				if (null != tags) {
					for (Tag tag : tags) {
						String tagId = tag.getTagID();
						if(tagId.startsWith("sunlife:source/building-location")) {
							LOGGER.debug("before tagId: {}", tagId);
							if(! (tagId.indexOf("/all") > 1)) {
								String regex = ".*building-location/.*?/";
								String newTagId = tagId.replaceAll(tagId.replaceAll(regex, ""),"all");
								tag = tagManager.resolve(newTagId);
							}
							LOGGER.debug("after tagId: {}", tagId);
							String locTitle = tag.getLocalizedTitle(locale);
							LOGGER.debug("locale : {} , locTitle : {}", locale, locTitle);
							tagList.add(locTitle != null ? locTitle : tag.getTitle());
						}
						if(tagId.startsWith("sunlife:source/topic")) {
							String locTitle = tag.getLocalizedTitle(locale);
							LOGGER.debug("locale : {} , locTitle : {}", locale, locTitle);
							tagList.add(locTitle != null ? locTitle : tag.getTitle());
						}
					}
					tagList = tagList.stream().distinct().collect(Collectors.toList());
					Collections.sort(tagList);
				}
			}
			LOGGER.debug("Article Data {}", articleData);
			layoutResourceType = resourceType.substring(0, resourceType.lastIndexOf('/')).concat("/layout-container");
			resourceResolver.close();
		} catch (LoginException | RepositoryException e) {
			LOGGER.error("Login Error while getting resource resolver : {}", e);
		}
	}

	/**
	 * Sets the article publish date.
	 *
	 * @param articleContent
	 *          the new article publish date
	 * @throws LoginException
	 *           the login exception
	 * @throws RepositoryException
	 *           the repository exception
	 */
	private void setArticlePublishDate(final ValueMap articleContent) throws LoginException, RepositoryException {
		String articlePublishedDate = StringUtils.EMPTY;
		final String locale = configService.getConfigValues("pageLocale", currentPage.getPath());
		if (null != locale && locale.length() > 0) {
			pageLocaleDefault = locale.contains("-") ? locale.split("-")[0] : locale.split("_")[0];
		}
		LOGGER.debug("Locale is {}", pageLocaleDefault);
		if (articleContent.containsKey(NewsConstants.PUBLISHED_DATE_CONSTANT)) {
			LOGGER.debug("formatting date to {}", configService.getConfigValues("articleDateFormat", currentPage.getPath()));
			final SimpleDateFormat formatter = new SimpleDateFormat(
					configService.getConfigValues("articleDateFormat", currentPage.getPath()), new Locale(pageLocaleDefault));

			articlePublishedDate = formatter.format(((GregorianCalendar) articleContent
					.getOrDefault(NewsConstants.PUBLISHED_DATE_CONSTANT, new GregorianCalendar())).getTime());
			LOGGER.debug("after adding locale {}", articlePublishedDate);
		}
		articleData.put(NewsConstants.PUBLISHED_DATE_CONSTANT, articlePublishedDate);
	}
	
}
