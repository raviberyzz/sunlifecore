/**
 *
 */
package ca.sunlife.web.cms.core.models;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
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
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Source;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.settings.SlingSettingsService;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.wcm.launches.utils.LaunchUtils;
import com.day.cq.wcm.api.LanguageManager;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.WCMException;
import com.day.cq.wcm.msm.api.LiveCopy;
import com.day.cq.wcm.msm.api.LiveRelationship;
import com.day.cq.wcm.msm.api.LiveRelationshipManager;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import ca.sunlife.web.cms.core.beans.NewsDetails;
import ca.sunlife.web.cms.core.constants.AdvisorDetailConstants;
import ca.sunlife.web.cms.core.constants.ArticleConstants;
import ca.sunlife.web.cms.core.constants.BasePageModelConstants;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.services.AdvisorDetailService;
import ca.sunlife.web.cms.core.services.CNWNewsService;
import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * Sling model for Base Page details.
 *
 * @author MO92
 */
@ Model (adaptables = {
    SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "sunlife/core/components/structure/base-page")
public class BasePageModel {

  /** The Constant OG_URL. */
  static final String OG_URL = "og:url";

  /** The Constant OG_TITLE. */
  static final String OG_TITLE = "og:title";

  /** The Constant OG_LOCALE. */
  static final String OG_LOCALE = "og:locale";

  /** The Constant OG_DESCRIPTION. */
  static final String OG_DESCRIPTION = "og:description";

  /** The Constant OG_IMAGE. */
  static final String OG_IMAGE = "og:image";

  /** The Constant TWITTER_URL. */
  static final String TWITTER_URL = "twitter:url";

  /** The Constant TWITTER_TITLE. */
  static final String TWITTER_TITLE = "twitter:title";

  /** The Constant TWITTER_DESCRIPTION. */
  static final String TWITTER_DESCRIPTION = "twitter:description";

  /** The Constant TWITTER_IMAGE. */
  static final String TWITTER_IMAGE = "twitter:image";

  /** The Constant TWITTER_CARD. */
  static final String TWITTER_CARD = "twitter:card";

  /** The Constant OG_TYPE. */
  static final String OG_TYPE = "og:type";

  /** The Constant OG_TYPE. */
  static final String OG_PUBLISHED_DATE = "og:published_date";

  /** The Constant OG_TYPE. */
  static final String OG_MODIFIED_DATE = "og:modified_time";

  /** The Constant OG_TYPE. */
  static final String OG_PUBLISHER = "og:publisher";

  /** The Constant OG_TYPE. */
  static final String OG_SITENAME = "og:sitename";

  /** The Constant OG_TYPE. */
  static final String TWITTER_SITE = "twitter:site";

  /** The Constant OG_TYPE. */
  static final String TWITTER_CREATOR = "twitter:creator";

  /** The Constant LOGGER. */
  private static final Logger logger = LoggerFactory.getLogger(BasePageModel.class);

  /** The current page. */
  @ ScriptVariable
  private Page currentPage;

  /** The request. */
  @ Self
  private SlingHttpServletRequest request;

  /** The resolver. */
  @ Inject
  @ Source ("sling-object")
  private ResourceResolver resolver;

  /** The settings service. */
  @ OSGiService
  private SlingSettingsService settingsService;

  @OSGiService
  private LanguageManager languageManager;

  @OSGiService
  private LiveRelationshipManager relationshipManager;
  
  /** The canonical url. */
  @ Inject
  @ Via ("resource")
  private String canonicalUrl;

  /** The page description. */
  @ Inject
  @ Via ("resource")
  private String pageDescription;

  /** The page title - refers to more title in page properties. */
  @ Inject
  @ Via ("resource")
  private String pageTitle;

  /** The description. */
  @ Inject
  @ Named (com.day.cq.commons.jcr.JcrConstants.JCR_DESCRIPTION)
  @ Via ("resource")
  private String description;

  /** The language. */
  @ Inject
  @ Named (com.day.cq.commons.jcr.JcrConstants.JCR_LANGUAGE)
  @ Via ("resource")
  private String language;

  /** The title. */
  @ Inject
  @ Named (com.day.cq.commons.jcr.JcrConstants.JCR_TITLE)
  @ Via ("resource")
  private String title;

  /** The social media description. */
  @ Inject
  @ Via ("resource")
  private String socialMediaDescripton;
  
  /** The Page indexing value. */
  @ Inject
  @ Via ("resource")
  private String pageIndexing;

  /** The page title - browser title. */
  private String socialMediaTitle;

  /** The seo page title. */
  private String seoPageTitle;
  
  /** The seo canonical url. */
  private String seoCanonicalUrl;

  /** The seo description. */
  private String seoDescription;

  /** The social media image. */
  @ Inject
  @ Via ("resource")
  private String socialMediaImage;

  /** Advanced page type . */
  @ Inject
  @ Via ("resource")
  private String advancedPageType;

  /** Head include . */
  @ Inject
  @ Via ("resource")
  private String headInclude;

  /** body include . */
  @ Inject
  @ Via ("resource")
  private String bodyInclude;

  /** Advisor type . */
  @ Inject
  @ Via ("resource")
  private String advisorType;
  
  /** The config service. */
  @ Inject
  private SiteConfigService configService;

  /** The cnw news service. */
  @ Inject
  private CNWNewsService cnwNewsService;

  /** The advisor detail service. */
  @ Inject
  private AdvisorDetailService advisorDetailService;

  /** The meta data. */
  private Map <String, String> customMetadata;

  /** The alt language links. */
  private Map <String, String> altLanguageLinks;

  /** The analytics scriptlet. */
  private String analyticsScriptlet;

  /** The analytics script. */
  private String analyticsScriptPath;

  /** Bread crumb - UDO. */
  private String breadCrumb;

  /** The page category. - UDO */
  private String pageCategory;

  /** The page sub category. - UDO */
  private String pageSubCategory;

  /** Tags - UDO. */
  @ Inject
  @ Named (com.day.cq.tagging.TagConstants.PN_TAGS)
  @ Via ("resource")
  private String [ ] tags;

  /** Tags - Other UDO tags. */
  private JsonObject otherUDOTagsMap;

  /** UDO Tags - string. */
  private String udoTags;

  /** Default reporting language. */
  private String defaultReportingLanguage;
  
  /** Master page. */
  private String masterPagePath;

  /** The Constant JCR_CONTENT_DATA_MASTER. */
  private static final String JCR_CONTENT_DATA_MASTER = "/jcr:content/data/master";

  /** The Constant ARTICLE_PUBLISHED_DATE. */
  private static final String ARTICLE_PUBLISHED_DATE = "articlePublishedDate";

  /** The Constant ARTICLE_MODIFIED_DATE. */
  private static final String ARTICLE_MODIFIED_DATE = "articlePublishedDate@LastModified";
  
  /** The page locale. */
  private String pageLocaleDefault = null;
  
  /** The search auto complete url. */
  private String autoCompleteUrl;
  
  /** The search API url. */
  private String searchApi;
  
  /**
	 * @return the pageTitleTag
	 */
	public String getPageTitleTag() {
		return socialMediaTitle;
	}

	/**
	 * @param pageTitleTag the pageTitleTag to set
	 */
	public void setPageTitleTag(String pageTitleTag) {
		this.socialMediaTitle = pageTitleTag;
	}

	/**
   * Gets the seo page title.
   *
   * @return the seoPageTitle
   */
  public String getSeoPageTitle() {
    return seoPageTitle;
  }

  /**
   * Sets the seo page title.
   *
   * @param seoPageTitle
   *          the seoPageTitle to set
   */
  public void setSeoPageTitle(final String seoPageTitle) {
    this.seoPageTitle = seoPageTitle;
  }

  /**
   * @return the autoCompleteUrl
   */
  public final String getAutoCompleteUrl() {
    return autoCompleteUrl;
  }

  /**
   * @param autoCompleteUrl the autoCompleteUrl to set
   */
  public final void setAutoCompleteUrl(String autoCompleteUrl) {
    this.autoCompleteUrl = autoCompleteUrl;
  }

  /**
   * @return the searchApi
   */
  public final String getSearchApi() {
    return searchApi;
  }

  /**
   * @param searchApi the searchApi to set
   */
  public final void setSearchApi(String searchApi) {
    this.searchApi = searchApi;
  }

  /**
   * Gets the page category.
   *
   * @return the pageCategory
   */
  public final String getPageCategory() {
    return pageCategory;
  }

  /**
   * Sets the page category.
   *
   * @param pageCategory
   *          the pageCategory to set
   */
  public final void setPageCategory(final String pageCategory) {
    this.pageCategory = pageCategory;
  }

  /**
   * Gets the page sub category.
   *
   * @return the pageSubCategory
   */
  public final String getPageSubCategory() {
    return pageSubCategory;
  }

  /**
   * Sets the page sub category.
   *
   * @param pageSubCategory
   *          the pageSubCategory to set
   */
  public final void setPageSubCategory(final String pageSubCategory) {
    this.pageSubCategory = pageSubCategory;
  }

  /**
   * Gets the analytics script path.
   *
   * @return the analyticsScript
   */
  public final String getAnalyticsScriptPath() {
    return analyticsScriptPath;
  }

  /**
   * Sets the analytics script path.
   *
   * @param analyticsScriptPath
   *          the new analytics script path
   */
  public final void setAnalyticsScriptPath(final String analyticsScriptPath) {
    this.analyticsScriptPath = analyticsScriptPath;
  }

  /**
   * Gets the analytics scriptlet.
   *
   * @return the analyticsScriptlet
   */
  public final String getAnalyticsScriptlet() {
    return analyticsScriptlet;
  }

  /**
   * Sets the analytics scriptlet.
   *
   * @param analyticsScriptlet
   *          the analyticsScriptlet to set
   */
  public final void setAnalyticsScriptlet(final String analyticsScriptlet) {
    this.analyticsScriptlet = analyticsScriptlet;
  }

  /**
   * Gets the custom metadata.
   *
   * @return the customMetadata
   */
  public Map <String, String> getCustomMetadata() {
    return customMetadata;
  }

  /**
   * Sets the custom metadata.
   *
   * @param customMetadata
   *          the customMetadata to set
   */
  public void setCustomMetadata(final Map <String, String> customMetadata) {
    this.customMetadata = customMetadata;
  }

  /**
   * Gets the alt language links.
   *
   * @return the alt language links
   */
  public Map <String, String> getAltLanguageLinks() {
    return altLanguageLinks;
  }

  /**
   * Sets the alt language links.
   *
   * @param altLanguageLinks
   *          the alt language links
   */
  public void setAltLanguageLinks(final Map <String, String> altLanguageLinks) {
    this.altLanguageLinks = altLanguageLinks;
  }

  /**
   * Gets the seo canonical url.
   *
   * @return the seoCanonicalUrl
   */
  public String getSeoCanonicalUrl() {
    return seoCanonicalUrl;
  }

  /**
   * Sets the seo canonical url.
   *
   * @param seoCanonicalUrl
   *          the seoCanonicalUrl to set
   */
  public void setSeoCanonicalUrl(final String seoCanonicalUrl) {
    this.seoCanonicalUrl = seoCanonicalUrl;
  }

  /**
   * Gets the seo description.
   *
   * @return the seoDescription
   */
  public String getSeoDescription() {
    return seoDescription;
  }

  /**
   * Sets the seo description.
   *
   * @param seoDescription
   *          the seoDescription to set
   */
  public void setSeoDescription(final String seoDescription) {
    this.seoDescription = seoDescription;
  }

  /**
   * Gets the bread crumb.
   *
   * @return the breadCrumb
   */
  public String getBreadCrumb() {
    return breadCrumb;
  }

  /**
   * Sets the bread crumb.
   *
   * @param breadCrumb
   *          the breadCrumb to set
   */
  public void setBreadCrumb(final String breadCrumb) {
    this.breadCrumb = breadCrumb;
  }

  /**
   * Gets the other UDO tags map.
   *
   * @return the otherUDOTagsMap
   */
  public JsonObject getOtherUDOTagsMap() {
    return otherUDOTagsMap;
  }

  /**
   * Sets the other UDO tags map.
   *
   * @param otherUDOTagsMap
   *          the otherUDOTagsMap to set
   */
  public void setOtherUDOTagsMap(final JsonObject otherUDOTagsMap) {
    this.otherUDOTagsMap = otherUDOTagsMap;
  }

  /**
   * Gets the udo tags.
   *
   * @return the udoTags
   */
  public String getUdoTags() {
    return udoTags;
  }

  /**
   * Sets the udo tags.
   *
   * @param udoTags
   *          the udoTags to set
   */
  public void setUdoTags(final String udoTags) {
    this.udoTags = udoTags;
  }

  /**
   * Gets the advanced page type.
   *
   * @return the advancedPageType
   */
  public String getAdvancedPageType() {
    return advancedPageType;
  }

  /**
   * Sets the advanced page type.
   *
   * @param advancedPageType
   *          the advancedPageType to set
   */
  public void setAdvancedPageType(final String advancedPageType) {
    this.advancedPageType = advancedPageType;
  }

  /**
   * Gets the social media descripton.
   *
   * @return the socialMediaDescripton
   */
  public String getSocialMediaDescripton() {
    return socialMediaDescripton;
  }

  /**
   * Sets the social media descripton.
   *
   * @param socialMediaDescripton
   *          the socialMediaDescripton to set
   */
  public void setSocialMediaDescripton(final String socialMediaDescripton) {
    this.socialMediaDescripton = socialMediaDescripton;
  }
  
  /**
   * Gets the page indexing value.
   *
   * @return the page indexing value
   */
  public String getPageIndexing() {
    return pageIndexing;
  }

  /**
   * Sets the Page indexing value.
   *
   * @param pageIndexing
   *          the pageIndexing to set
   */
  public void setPageIndexing(final String pageIndexing) {
    this.pageIndexing = pageIndexing;
  }

  /**
   * Gets the social media image.
   *
   * @return the socialMediaImage
   */
  public String getSocialMediaImage() {
    return socialMediaImage;
  }

  /**
   * Sets the social media image.
   *
   * @param socialMediaImage
   *          the socialMediaImage to set
   */
  public void setSocialMediaImage(final String socialMediaImage) {
    this.socialMediaImage = socialMediaImage;
  }

  /**
   * Gets the head include.
   *
   * @return the headInclude
   */
  public final String getHeadInclude() {
    return headInclude;
  }

  /**
   * Sets the head include.
   *
   * @param headInclude
   *          the headInclude to set
   */
  public final void setHeadInclude(final String headInclude) {
    this.headInclude = headInclude;
  }

  /**
   * Gets the body include.
   *
   * @return the bodyInclude
   */
  public final String getBodyInclude() {
    return bodyInclude;
  }

  /**
   * Sets the body include.
   *
   * @param bodyInclude
   *          the bodyInclude to set
   */
  public final void setBodyInclude(final String bodyInclude) {
    this.bodyInclude = bodyInclude;
  }

  /**
   * @return the tags
  */
  public String[] getTags() {
	return null != tags ? Arrays.copyOf(tags, tags.length) : new String[0];
  }

  /**
   * @param tags the tags to set
  */
  public void setTags(String[] tags) {
	this.tags = null != tags ? tags.clone() : null;
  }
  
  /**
   * @return the pageLocaleDefault
   */
  public String getPageLocaleDefault() {
	return pageLocaleDefault;
  }

  /**
   * @param pageLocaleDefault the pageLocaleDefault to set
  */
  public void setPageLocaleDefault(String pageLocaleDefault) {
	this.pageLocaleDefault = pageLocaleDefault;
  }

  /**
   * Inits the model.
   *
   * @throws LoginException
   *           the login exception
   * @throws RepositoryException
   *           the repository exception
   */
  @ PostConstruct
  public void init() throws LoginException, RepositoryException {
    final String pagePath = currentPage.getPath();
    final String domain = configService.getConfigValues("domain", pagePath);
    final String locale = configService.getConfigValues("pageLocale", pagePath);
    final String udoTagsPath = configService.getConfigValues("udoTagsPath", pagePath);
    final String siteUrl = configService.getConfigValues(BasePageModelConstants.SITE_URL_CONSTANT,
        pagePath);

    if (null != locale && locale.length() > 0) {
      pageLocaleDefault = locale.split("_") [ 0 ];
    }
    logger.debug("Base page model :: locale found is {}, language is {}", locale, pageLocaleDefault);

    // Condition for CNW News details page starts
    logger.debug("advancedPageType: {}", advancedPageType);
    if (null != advancedPageType
        && BasePageModelConstants.PAGE_TYPE_CNW_CONSTANT.equals(advancedPageType)) {
      logger.debug("Inside isCNWNewsDetailPage block");
      processDataForCNWNews(locale, pagePath);
    }
    // Condition for CNW News details page ends

    // Condition for advisor pages start
    if (null != advancedPageType
        && BasePageModelConstants.PAGE_TYPE_ADVISOR_CONSTANT.equals(advancedPageType)) {
      logger.debug("Inside advisor page block");
      try {
        processDataForAdvisorPages();
      } catch (ApplicationException | SystemException | JSONException e) {
        logger.error("Error while processing advisor data {}", e);
      }
    }
    // Condition for advisor pages end

    // SEO title - <title> tag
    seoPageTitle = null == pageTitle ? getPageTitle(title) : pageTitle;
    
    // socialMediaTitle
    String navTitle = currentPage.getNavigationTitle();
    socialMediaTitle = null == navTitle ? title : navTitle;
    
    // SEO description - <meta name="description"> tag
    seoDescription = description;

    // Social media description
    socialMediaDescripton = null == socialMediaDescripton
        ? configService.getConfigValues("pageDescription", pagePath)
        : socialMediaDescripton;

    // Social media image
    socialMediaImage = null == socialMediaImage
        ? configService.getConfigValues("socialMediaImage", pagePath)
        : socialMediaImage;

    // SEO canonical URL - <link rel="canonical"> tag
    if (null != domain && domain.length() > 0) {
      seoCanonicalUrl = null == canonicalUrl ? domain.concat(shortenURL(pagePath, siteUrl))
          .concat(BasePageModelConstants.SLASH_CONSTANT) : canonicalUrl;
    }

    setAnalyticsScriptPath(configService.getConfigValues("analyticsScriptPath", pagePath));
    setAnalyticsScriptlet(configService.getConfigValues("analyticsTealiumScript", pagePath));

    // Fetching social sharing component meta-data
    customMetadata = new HashMap <>();

    // Configuring custom social sharing - meta-tags
    customMetadata.put(OG_TITLE, socialMediaTitle);
    customMetadata.put(TWITTER_TITLE, socialMediaTitle);
    customMetadata.put(OG_URL, seoCanonicalUrl);
    customMetadata.put(TWITTER_URL, seoCanonicalUrl);
    customMetadata.put(OG_DESCRIPTION, socialMediaDescripton);
    customMetadata.put(TWITTER_DESCRIPTION, socialMediaDescripton);
    customMetadata.put(OG_LOCALE, locale);
    if (socialMediaImage != null) {
      customMetadata.put(OG_IMAGE, domain + socialMediaImage);
      customMetadata.put(TWITTER_IMAGE, domain + socialMediaImage);
    }
    customMetadata.put(TWITTER_CARD, "summary_large_image");
    // Condition for article pages start
    if (null != advancedPageType
        && BasePageModelConstants.PAGE_TYPE_ARTICLE_PAGES_CONSTANT.equals(advancedPageType)) {
      logger.debug("Inside article page block");
      setArticlePageSocialMetaTags();
    }
    // Condition for article pages end
    logger.debug("metadata :: {}", customMetadata);

    // Sets alternate URLs
    if( null != resolver && null != currentPage.getPath() && null != resolver.getResource(currentPage.getPath()))
    	generateAlternateUrls(resolver.getResource(currentPage.getPath()));
    
    // Sets UDO parameters
    otherUDOTagsMap = new JsonObject();
    otherUDOTagsMap.addProperty("page_canonical_url", seoCanonicalUrl); // canonical url

		if (null != masterPagePath && masterPagePath.length() > 0 && null != seoCanonicalUrl) {
			otherUDOTagsMap.addProperty("page_canonical_url_default", domain.concat(
			                                                            shortenURL(masterPagePath, configService.getConfigValues("siteUrl", masterPagePath)))
			                                                            .concat(BasePageModelConstants.SLASH_CONSTANT)); // canonical
			                                                                                                             // url
			                                                                                                             // -
			                                                                                                             // default
		} else {
			otherUDOTagsMap.addProperty("page_canonical_url_default", seoCanonicalUrl); // canonical url
			                                                                            // -
			                                                                            // default
		}
		otherUDOTagsMap.addProperty("page_language", pageLocaleDefault); // Page language

    // Sets UDO parameters
    setUDOParameters();

    // Sets UDO other parameters
    if (null != udoTagsPath && udoTagsPath.length() > 0) {
      setOtherUDOTags(udoTagsPath);
    }

    // Sets UDO tags specific to advisor pages
    if (null != advancedPageType
        && BasePageModelConstants.PAGE_TYPE_ADVISOR_CONSTANT.equals(advancedPageType)) {
      setUDOTagsForAdvisorPages();
    }

    final Gson gson = new GsonBuilder().setPrettyPrinting().disableHtmlEscaping().create();
    udoTags = gson.toJson(otherUDOTagsMap);
    setAutoCompleteUrl(StringUtils.defaultIfEmpty(configService.getConfigValues("autoCompleteUrl", pagePath), StringUtils.EMPTY));
    setSearchApi(StringUtils.defaultIfEmpty(configService.getConfigValues("searchApi", pagePath), StringUtils.EMPTY));
    
    logger.debug("Map Display {}", udoTags);
  }

  /**
   * Formats page title.
   *
   * @param title
   *          the title
   * @return the page title
   * @throws LoginException
   *           the login exception
   * @throws RepositoryException
   *           the repository exception
   */
  public String getPageTitle(final String title) throws LoginException, RepositoryException {
    final String pagePath = currentPage.getPath();
    final String siteSuffix = configService.getConfigValues("siteSuffix", pagePath);
    if (null == siteSuffix || siteSuffix.length() <= 1) {
      return title;
    } else {
      return siteSuffix.replace(BasePageModelConstants.PAGE_TITLE_FORMAT_CONSTANT, title);
    }
  }

  /**
   * Generates shorten url.
   *
   * @param pagePath
   *          the page path
   * @param siteUrl
   *          the site url
   * @return shortened url
   */
  public String shortenURL(final String pagePath, final String siteUrl) {
    if (null == siteUrl || siteUrl.length() <= 0) {
      return null;
    }
    return pagePath.replace(
        siteUrl.substring(0, siteUrl.lastIndexOf(BasePageModelConstants.SLASH_CONSTANT)), "");
  }

  /**
   * Sets alternate URLs.
   *
   * @param pagePath
   *          the page path
   * @param pageLocale
   *          the page locale
   * @throws LoginException
   *           the login exception
   * @throws RepositoryException
   *           the repository exception
   */
  public void setAlternateURLs(final String pagePath, final String pageLocale)
      throws LoginException, RepositoryException {
    logger.debug("Entry :: setAlternateURLs :: pagePath: {}, pageLocale: {}", pagePath, pageLocale);
    String altLanguagesCount = null;
    String siteUrl = null;
    String siteDomain = null;
    altLanguagesCount = configService.getConfigValues("altLangCount", pagePath);
    siteUrl = configService.getConfigValues(BasePageModelConstants.SITE_URL_CONSTANT, pagePath);
    siteDomain = configService.getConfigValues("domain", pagePath);
    if (null != altLanguagesCount && altLanguagesCount.length() > 0) {
      final int altLangCount = Integer.parseInt(altLanguagesCount);
      altLanguageLinks = new HashMap <>();
      for (int i = 0 ; i < altLangCount ; i++ ) {
        final String domain = configService.getConfigValues(
            BasePageModelConstants.ALTERNATE_URL_ITEMS_CONSTANT + i + "_domain", pagePath);
        final String languageCode = configService.getConfigValues(
            BasePageModelConstants.ALTERNATE_URL_ITEMS_CONSTANT + i + "_languageCode", pagePath);
        final String siteLocation = configService.getConfigValues(
            BasePageModelConstants.ALTERNATE_URL_ITEMS_CONSTANT + i + "_siteLocation", pagePath);
        final String defaultLanguage = configService.getConfigValues(
            BasePageModelConstants.ALTERNATE_URL_ITEMS_CONSTANT + i + "_defaultLanguage", pagePath);
        if (null != defaultLanguage && defaultLanguage.length() > 0) {
          defaultReportingLanguage = languageCode.split("_") [ 0 ];
        }
        final String newUrl = pagePath.replace(siteUrl, siteLocation);
        logger.debug("setAlternateURLs :: New Url :: {}, defaultReportingLanguage :: {}", newUrl,
            defaultReportingLanguage);
        if (null != resolver.getResource(newUrl)) {
          altLanguageLinks.put(languageCode.replace("_", "-").toLowerCase(Locale.ROOT),
              domain + shortenURL(newUrl, siteLocation) + BasePageModelConstants.SLASH_CONSTANT);
        }
      }
      if (! altLanguageLinks.isEmpty()) {
        altLanguageLinks.put(pageLocale.replace("_", "-").toLowerCase(Locale.ROOT),
            siteDomain + shortenURL(pagePath, siteUrl) + BasePageModelConstants.SLASH_CONSTANT);
      }
      logger.debug("Map {}", altLanguageLinks);
    }
  }

  /**
   * Sets UDO tags.
   *
   * @throws LoginException
   *           the login exception
   * @throws RepositoryException
   *           the repository exception
   */
  public void setUDOParameters() throws LoginException, RepositoryException {
    logger.debug("Entry :: setUDOParameters :: ");
    Page pageResource = null;
    String pagePath = currentPage.getPath();
    final String siteUrl = configService.getConfigValues(BasePageModelConstants.SITE_URL_CONSTANT,
        pagePath);
    logger.debug("setUDOParameters :: siteUrl: {}, defaultReportingLanguage: {}", siteUrl,
        defaultReportingLanguage);
    if (null == siteUrl || siteUrl.length() <= 0) {
      return;
    }
    pagePath = null == masterPagePath ? pagePath : masterPagePath;
    logger.debug("pagePath is: {}", pagePath);
    final Resource resource = resolver.getResource(pagePath);
    if (null != resource) {
      pageResource = resource.adaptTo(Page.class);
    } else {
      pageResource = currentPage;
    }

    int startLevel = siteUrl.replaceFirst(BasePageModelConstants.SLASH_CONSTANT, "")
        .split(BasePageModelConstants.SLASH_CONSTANT).length - 1;
    final int currentLevel = null != pageResource ? pageResource.getDepth() : 0;
    final List <String> navList = new ArrayList <>();
    while (startLevel < currentLevel) {
      final Page page = null != pageResource ? pageResource.getAbsoluteParent(startLevel) : null;
      if (page != null) {
        final boolean isActivePage = page.equals(pageResource);
        navList.add(getBreadcrumbTitle(page));
        if (isActivePage) {
          break;
        }
      }
      startLevel++ ;
    }

    if (! navList.isEmpty()) {
      if (navList.size() > 1) {
        pageCategory = navList.get(1);
      }
      if (navList.size() > 2) {
        pageSubCategory = navList.get(2);
      }
      breadCrumb = BasePageModelConstants.SLASH_CONSTANT
          + navList.stream().collect(Collectors.joining(BasePageModelConstants.SLASH_CONSTANT));
    }
    logger.debug("breadCrumb: {}, pageCategory: {}, pageSubCategory: {}", breadCrumb, pageCategory,
        pageSubCategory);
    otherUDOTagsMap.addProperty("page_breadcrumb", breadCrumb); // Bread crumb
    otherUDOTagsMap.addProperty("page_category", pageCategory == null ? breadCrumb : pageCategory); // Page
                                                                                            // category
    otherUDOTagsMap.addProperty("page_subcategory", pageSubCategory == null ? "" : pageSubCategory); // Page
                                                                                                     // sub
                                                                                                     // category

    // For advisor pages

    logger.debug("Exit :: setUDOParameters :: otherUDOTagsMap: {}", otherUDOTagsMap);
  }

  /**
   * Forms title to be displayed in bread crumb.
   *
   * @param page
   *          the page
   * @return the breadcrumb title
   */
  public String getBreadcrumbTitle(final Page page) {
    String titleStr = page.getTitle();
    if (titleStr == null) {
      titleStr = page.getNavigationTitle();
    }
    if (titleStr == null) {
      titleStr = page.getPageTitle();
    }
    if (titleStr == null) {
      titleStr = page.getName();
    }
    return titleStr;
  }

  /**
   * Sets UDO tags.
   *
   * @param udoTagStart
   *          the new other UDO tags
   * @throws Exception
   *           the exception
   */
  public void setOtherUDOTags(final String udoTagStart) {
    logger.debug("Entry :: setOtherUDOTags method of :: udoTagStart :: {}", udoTagStart);
    final String tagAbsolutePath = udoTagStart.replace("/content/cq:tags/", "");
    final String tagRootPath = tagAbsolutePath
        .substring(tagAbsolutePath.indexOf(BasePageModelConstants.SLASH_CONSTANT));
    if (null != tags && tags.length > 0) {
      logger.debug("tags :: {}", Arrays.asList(tags));
      for (final String tag : tags) {
        final String [ ] array = tag.split(":");
        if (array [ 1 ]
            .startsWith(tagRootPath.replaceFirst(BasePageModelConstants.SLASH_CONSTANT, ""))) {
          final String path = array [ 1 ]
              .replace(tagRootPath.substring(1) + BasePageModelConstants.SLASH_CONSTANT, "");
          processUDOPath(path);
        }
      }
    }
    logger.debug("Exit :: setOtherUDOTags method of :: otherUDOTagsMap :: {}", otherUDOTagsMap);
  }

  /**
   * Process UDO path.
   *
   * @param path
   *          the path
   */
  public void processUDOPath(final String path) {
    logger.debug("Entry :: processUDOPath :: path :: {}", path);
    if (null == path || ! path.contains(BasePageModelConstants.SLASH_CONSTANT)) {
      logger.debug("No child tag exists for path: {}", path);
      return;
    }
    final String key = path.split(BasePageModelConstants.SLASH_CONSTANT) [ 0 ];
    final String value = path.split(BasePageModelConstants.SLASH_CONSTANT) [ 1 ];
    if (otherUDOTagsMap.has(key)) {
      if (otherUDOTagsMap.get(key).isJsonArray()) {
        final JsonArray jsonArray = otherUDOTagsMap.getAsJsonArray(key);
        jsonArray.add(value);
        otherUDOTagsMap.add(key, jsonArray);
      } else {
        final String oldValue = otherUDOTagsMap.get(key).getAsString();
        final JsonArray jsonArray = new JsonArray();
        jsonArray.add(oldValue);
        jsonArray.add(value);
        otherUDOTagsMap.add(key, jsonArray);
      }
    } else {
      otherUDOTagsMap.addProperty(key, value);
    }
    logger.debug("Exit :: processUDOPath :: otherUDOTagsMap :: {}", otherUDOTagsMap);
  }

  /**
   * Sets cnw news pages data.
   *
   * @param pageLocale
   *          the page locale
   * @param pagePath
   *          the page path
   */
  public void processDataForCNWNews(final String pageLocale, final String pagePath) {
    logger.debug("Entry :: processDataForCNWNews :: ");
    String releaseId = null;
    try {
      final String siteUrl = configService.getConfigValues(BasePageModelConstants.SITE_URL_CONSTANT,
          pagePath);
      final String domain = configService.getConfigValues("domain", pagePath);
      if (request.getRequestPathInfo().getSelectors().length > 0) {
        releaseId = request.getRequestPathInfo().getSelectors() [ 0 ];
        logger.debug("Selector fetched :: releaseId :: {}", releaseId);
        final NewsDetails newsDetails = cnwNewsService.getCNWNewsDetails(releaseId,
            pageLocale.split("_") [ 0 ]);
        title = newsDetails.getRelease().getHeadline();
        description = "";
        socialMediaDescripton = newsDetails.getRelease().getSummary().substring(0,
            Math.min(newsDetails.getRelease().getSummary().length(), 200));
        canonicalUrl = domain + shortenURL(pagePath, siteUrl)
            + BasePageModelConstants.SLASH_CONSTANT
            + newsDetails.getRelease().getHeadline().replaceAll(" ", "-").replaceAll("%", "")
                .replaceAll("[~@#$^&*()={}|,.?:<>'/;`%!\"]", "").toLowerCase(Locale.ROOT)
            + BasePageModelConstants.SLASH_CONSTANT + releaseId
            + BasePageModelConstants.SLASH_CONSTANT;
        logger.debug(
            "processDataForCNWNews :: Fetched items :: title: {}, description: {}, socialMediaDescripton: {}, canonicalUrl: {}",
            title, description, socialMediaDescripton, canonicalUrl);
      }
    } catch (IOException | ParseException | ApplicationException | SystemException | LoginException
        | RepositoryException e) {
      logger.error("Error :: processDataForCNWNews :: {}", e);
    }
    logger.debug("Exit :: processDataForCNWNews :: ");
  }

  /**
   * Sets advisor pages data.
   *
   * @throws LoginException
   *           the login exception
   * @throws RepositoryException
   *           the repository exception
   * @throws ApplicationException
   *           the application exception
   * @throws SystemException
   *           the system exception
   * @throws JSONException
   *           the JSON exception
   */
  public void processDataForAdvisorPages() throws LoginException, RepositoryException,
      ApplicationException, SystemException, JSONException {
    logger.debug("Entry :: BasePageModel :: processDataForAdvisorPages :: ");
    String advisorId = null;
    if (request.getRequestPathInfo().getSelectors().length > 0) {
      advisorId = request.getRequestPathInfo().getSelectors() [ 0 ];
      if (null != advisorId && null != canonicalUrl) {
        canonicalUrl = canonicalUrl
            .replace(BasePageModelConstants.ADVISOR_ID_CANONICAL_URL_FORMAT_CONSTANT, advisorId)
            .replace(BasePageModelConstants.ADVISOR_TYPE_CANONICAL_URL_FORMAT_CONSTANT,
                advisorType);
      }
      logger.debug("canonicalUrl :: {}", canonicalUrl);

      final String advisorData = advisorDetailService.getAdvisorDetails(pageLocaleDefault,
          advisorType, advisorId);
      if (null != advisorData) {
        final JSONObject inputJson = new JSONObject(advisorData);
        pageTitle = getPageTitle(getAdvisorTitle(inputJson));
      }
    }
    logger.debug("Exit :: BasePageModel :: processDataForAdvisorPages :: canonicalUrl :: {}",
        canonicalUrl);
  }

  /**
   * Gets title of advisor page.
   *
   * @param inputJson
   *          the input json
   * @return the advisor title
   * @throws JSONException
   *           the JSON exception
   */
  public String getAdvisorTitle(final JSONObject inputJson) throws JSONException {
    logger.debug("Entry :: BasePageModel :: getAdvisorTitle :: ");
    String advisorTitle = null;
    if (AdvisorDetailConstants.CORP_CONSTANT.equals(advisorType)) {
      final JSONObject advisorCorpJson = inputJson
          .getJSONObject(AdvisorDetailConstants.ADVISOR_CORP_CONSTANT);
      advisorTitle = advisorCorpJson.getString(AdvisorDetailConstants.CORP_NAME_CONSTANT);
    } else {
      final JSONObject advisorStdJson = inputJson
          .getJSONObject(AdvisorDetailConstants.ADVISOR_STD_CONSTANT);
      advisorTitle = advisorStdJson.getString(AdvisorDetailConstants.FORMATTED_NAME_CONSTANT);
    }
    logger.debug("Entry :: BasePageModel :: getAdvisorTitle :: advisorTitle :: {}", advisorTitle);
    return advisorTitle;
  }

  /**
   * Sets UDO tags for advisor.
   */
  public void setUDOTagsForAdvisorPages() {
    logger.debug("Entry :: BasePageModel :: setUDOTagsForAdvisorPages :: ");
    String advisorId = null;
    if (request.getRequestPathInfo().getSelectors().length > 0) {
      advisorId = request.getRequestPathInfo().getSelectors() [ 0 ];
      otherUDOTagsMap.addProperty(AdvisorDetailConstants.PAGE_ADVISOR_ID_CONSTANT, advisorId);
      otherUDOTagsMap.addProperty(AdvisorDetailConstants.PAGE_ADVISOR_TYPE_CONSTANT, advisorType);
    }
    logger.debug("setUDOTagsForAdvisorPages :: advisorId :: {}, advisorType :: {}", advisorId,
        advisorType);
    logger.debug("Exit :: BasePageModel :: setUDOTagsForAdvisorPages :: ");
  }

  /**
   * Sets social meta tags for article pages.
  */
  public void setArticlePageSocialMetaTags() throws LoginException, RepositoryException {
    logger.debug("Entry :: BasePageModel :: setArticlePageSocialMetaTags :: ");
    final String pagePath = currentPage.getPath();
    final String articleType = configService.getConfigValues(ArticleConstants.ARTICLE_TYPE_CONSTANT,
        pagePath);
    final String articlePublisherForMetaTag = configService
        .getConfigValues(ArticleConstants.ARTICLE_PUBLISHER_CONSTANT, pagePath);
    final String siteName = configService.getConfigValues("siteName", pagePath);
    final String articleSite = configService.getConfigValues(ArticleConstants.ARTICLE_SITE_CONSTANT,
        pagePath);
    final String articleCreator = configService
        .getConfigValues(ArticleConstants.ARTICLE_CREATOR_CONSTANT, pagePath);

    customMetadata.put(OG_TYPE, articleType);
    customMetadata.put(OG_PUBLISHER, articlePublisherForMetaTag);
    customMetadata.put(OG_SITENAME, siteName);
    customMetadata.put(TWITTER_SITE, articleSite);
    customMetadata.put(TWITTER_CREATOR, articleCreator);

    final String articlePath = pagePath
        + "/jcr:content/root/layout_container/container1/layout_container/container1/article";
    final Resource articleResource = null != resolver ? resolver.getResource(articlePath) : null;
    if (null == articleResource) {
      logger.debug("articleResource is null");
      return;
    }
    final ValueMap articleResContent = articleResource.getValueMap();

    final String fragmentPath = articleResContent.containsKey("fragmentPath")
        ? articleResContent.get("fragmentPath", String.class)
        : null;
    String articlePublishedDate = StringUtils.EMPTY;
    String articlePublishedModifiedDate = StringUtils.EMPTY;

    if (null == fragmentPath) {
      logger.debug("fragmentPath is null");
      return;
    }

    final Resource articleFragmentResource = resolver
        .getResource(fragmentPath.concat(JCR_CONTENT_DATA_MASTER));
    if (null == articleFragmentResource) {
      logger.debug("articleFragmentResource is null");
      return;
    }
    final ValueMap articleContent = articleFragmentResource.getValueMap();

    final SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
    if (articleContent.containsKey(ARTICLE_PUBLISHED_DATE)) {
      articlePublishedDate = formatter.format( ((GregorianCalendar) articleContent
          .getOrDefault(ARTICLE_PUBLISHED_DATE, new GregorianCalendar())).getTime());
    }

    if (articleContent.containsKey(ARTICLE_MODIFIED_DATE)) {
      articlePublishedModifiedDate = formatter.format( ((GregorianCalendar) articleContent
          .getOrDefault(ARTICLE_MODIFIED_DATE, new GregorianCalendar())).getTime());
    }

    customMetadata.put(OG_PUBLISHED_DATE, articlePublishedDate);
    customMetadata.put(OG_MODIFIED_DATE, articlePublishedModifiedDate);
    logger.debug("Exit :: BasePageModel :: setArticlePageSocialMetaTags :: ");
  }
  
	/**
	 * Generates alternate urls
	 * 
	 * @param resource
	 */
	private void generateAlternateUrls(Resource resource) {
		logger.debug("Entry :: BasePageModel :: generateAlternateUrls :: resource :: {}", resource);
		try {
			if (null == resolver || null == resource || null == resource.getPath()) {
				return;
			}
			Resource altLanResource = resolver.getResource(resource.getPath()
			                                                            + "/jcr:content/alternateUrls");
			logger.debug("Alt urls --> {}", altLanResource);
			if (null != altLanResource) {
				generatePageSpecificAlternateUrls();
				return;
			}
			final String pagePath = currentPage.getPath();
			final String pageLocale = configService.getConfigValues("pageLocale", pagePath);
			final String siteDomain = configService.getConfigValues("domain", pagePath);
			final String siteUrl = configService.getConfigValues("siteUrl", pagePath);

			// check if it is a source
			logger.debug("is source {}", relationshipManager.isSource(resource));
			if (relationshipManager.isSource(resource)) {
				logger.debug("Page is a source page");
				Resource target = resolver.getResource(resource.getPath());
				@ SuppressWarnings("deprecation")
				Collection<LiveRelationship> relationships = relationshipManager.getLiveRelationships(
				                                                            target, null, null, false);
				altLanguageLinks = new HashMap<>();
				for (LiveRelationship relationship : relationships) {
					String liveCopyPath = relationship.getTargetPath();
					// filter non-existing
					// LiveCopy Resources and
					// LiveCopy Launches
					if (relationship.getStatus().isTargetExisting() && !LaunchUtils.isLaunchResourcePath(
					                                                            liveCopyPath)) {
						logger.debug("path :: {}", liveCopyPath);
						String sourcePageLocale = configService.getConfigValues("pageLocale", liveCopyPath);
						String sourceSiteUrl = configService.getConfigValues("siteUrl", liveCopyPath);
						String sourceSiteDomain = configService.getConfigValues("domain", liveCopyPath);
						logger.debug("generateAlternateUrls method :: sourcePath: {}, sourcePageLocale: {}, sourceSiteDomain: {}",
						                                                            liveCopyPath,
						                                                            sourcePageLocale,
						                                                            sourceSiteUrl);
						altLanguageLinks.put(sourcePageLocale.replace("_", "-").toLowerCase(Locale.ROOT),
						                                                            sourceSiteDomain + shortenURL(liveCopyPath, sourceSiteUrl) + BasePageModelConstants.SLASH_CONSTANT);
					}
				}
			}
			// check if it is a live copy
			logger.debug("has live relationship {}", relationshipManager.hasLiveRelationship(resource));
			if (relationshipManager.hasLiveRelationship(resource)) {
				altLanguageLinks = new HashMap<>();

				// the resource is a live copy
				LiveRelationship liveRelationship = relationshipManager.getLiveRelationship(resource,
				                                                            false);
				if (liveRelationship != null) {
					LiveCopy liveCopy = liveRelationship.getLiveCopy();
					if (liveCopy != null) {
						String sourcePath = liveCopy.getBlueprintPath(); // returns the source path
						masterPagePath = sourcePath;
						String sourcePageLocale = configService.getConfigValues("pageLocale", sourcePath);
						String sourceSiteUrl = configService.getConfigValues("siteUrl", sourcePath);
						String sourceSiteDomain = configService.getConfigValues("domain", sourcePath);
						logger.debug("generateAlternateUrls method :: sourcePath: {}, sourcePageLocale: {}, sourceSiteDomain: {}",
						                                                            sourcePath,
						                                                            sourcePageLocale,
						                                                            sourceSiteUrl);
						altLanguageLinks.put(sourcePageLocale.replace("_", "-").toLowerCase(Locale.ROOT),
						                                                            sourceSiteDomain + shortenURL(sourcePath, sourceSiteUrl) + BasePageModelConstants.SLASH_CONSTANT);
					}
				}
			}
			if (null != altLanguageLinks && !altLanguageLinks.isEmpty()) {
				altLanguageLinks.put(pageLocale.replace("_", "-").toLowerCase(Locale.ROOT), siteDomain
				                                                            + shortenURL(pagePath, siteUrl)
				                                                            + BasePageModelConstants.SLASH_CONSTANT);
			}
			logger.debug("New altLanguageLinks :: {}", altLanguageLinks);
		} catch (WCMException | LoginException | RepositoryException e) {
			logger.error("Unable to get the live copy: {}", e.getMessage());
		}
		logger.debug("Exit :: BasePageModel :: generateAlternateUrls :: resource :: {}", resource);
	}

	/**
	 * Generates page specific alt
	 * urls.
	 * 
	 * @param pagePath
	 * @param pageLocale
	 */
	public void generatePageSpecificAlternateUrls() {
		logger.debug("Entry :: setAlternateURLs");
		Resource alternateUrls = resolver.getResource(currentPage.getPath()
		                                                            + "/jcr:content/alternateUrls");
		if (null == alternateUrls)
			return;
		altLanguageLinks = new HashMap<>();
		try {
			for (final Resource currentResource : alternateUrls.getChildren()) {
				final ValueMap currentResourceProperties = ResourceUtil.getValueMap(currentResource);
				String altLang = (String) currentResourceProperties.getOrDefault("alternateLanguage",
				                                                            StringUtils.EMPTY);
				String altUrl = (String) currentResourceProperties.getOrDefault("alternateUrl",
				                                                            StringUtils.EMPTY);
				String defaultLanguage = (String) currentResourceProperties.getOrDefault("defaultLanguage",
				                                                            StringUtils.EMPTY);

				String altSiteUrl = configService.getConfigValues("siteUrl", altUrl);
				String altSiteDomain = configService.getConfigValues("domain", altUrl);

				masterPagePath = defaultLanguage.length() > 0 ? altUrl : null;
				altLanguageLinks.put(altLang.replace("_", "-").toLowerCase(Locale.ROOT), altSiteDomain
				                                                            + shortenURL(altUrl, altSiteUrl)
				                                                            + BasePageModelConstants.SLASH_CONSTANT);
			}
			final String pagePath = currentPage.getPath();
			final String pageLocale = configService.getConfigValues("pageLocale", pagePath);
			final String siteDomain = configService.getConfigValues("domain", pagePath);
			final String siteUrl = configService.getConfigValues("siteUrl", pagePath);
			if (null != altLanguageLinks && !altLanguageLinks.isEmpty()) {
				altLanguageLinks.put(pageLocale.replace("_", "-").toLowerCase(Locale.ROOT), siteDomain
				                                                            + shortenURL(pagePath, siteUrl)
				                                                            + BasePageModelConstants.SLASH_CONSTANT);
			}
			logger.debug("Page specific new altLanguageLinks :: {}", altLanguageLinks);
		} catch (LoginException | RepositoryException e) {
			logger.error("Error while generating alternate urls :: {}", e.getMessage());
		}
		logger.debug("Map {}", altLanguageLinks);
	}
}
