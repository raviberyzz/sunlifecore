/**
 *
 */
package ca.sunlife.web.cms.core.models;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;
import javax.jcr.RangeIterator;
import javax.jcr.RepositoryException;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.WordUtils;
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
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.wcm.launches.utils.LaunchUtils;
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
 * The Class BasePageModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = {
    SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "sunlife/core/components/structure/base-page")
public class BasePageModel {
  
  /** The Constant DOMAIN_STR. */
  private static final String DOMAIN_STR = "domain";
  
  /** The Constant Extra Clientlibs. */
  private static final String EXTRA_CLIENTLIBS = "extraClientlibs";
  
  /** The Constant siteHeadInclude. */
  private static final String SITE_HEAD_INCLUDE = "siteHeadInclude";
  
  /** The Constant siteBodyInclude. */
  private static final String SITE_BODY_INCLUDE = "siteBodyInclude";
  
  /** The Constant addOpeningDiv. */
  private static final String ADD_OPENING_DIV = "addOpeningDiv";
  
  /** The Constant wrapperDivClass. */
  private static final String WRAPPER_DIV_CLASS = "wrapperDivClass";

  /** The Constant MFA_DOMAIN_PATH. */
  private static final String MFA_DOMAIN_PATH = "mfaDomainPath";
  
  /** The Constant MFA_Encryption. */
  private static final String MFA_ENCRYPTION = "mfaEncryption";

  /** The Constant UDO_TAGS_PATH. */
  private static final String UDO_TAGS_PATH = "udoTagsPath";

  /** The Constant PAGE_LOCALE. */
  private static final String PAGE_LOCALE = "pageLocale";
  
  /** The Constant HREF_LANG. */
  private static final String HREF_LANG = "hrefLang";

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

  /** The Constant OG_PUBLISHED_DATE. */
  static final String OG_PUBLISHED_DATE = "og:published_date";

  /** The Constant OG_MODIFIED_DATE. */
  static final String OG_MODIFIED_DATE = "og:modified_time";

  /** The Constant OG_PUBLISHER. */
  static final String OG_PUBLISHER = "og:publisher";

  /** The Constant OG_SITENAME. */
  static final String OG_SITENAME = "og:sitename";

  /** The Constant TWITTER_SITE. */
  static final String TWITTER_SITE = "twitter:site";

  /** The Constant TWITTER_CREATOR. */
  static final String TWITTER_CREATOR = "twitter:creator";

  /** The Constant LOG. */
  private static final Logger LOG = LoggerFactory.getLogger(BasePageModel.class);

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

  /** The relationship manager. */
  @ OSGiService
  private LiveRelationshipManager relationshipManager;

  /** The canonical url. */
  @ Inject
  @ Via ("resource")
  private String canonicalUrl;

  /** The page description. */
  @ Inject
  @ Via ("resource")
  private String pageDescription;

  /** The page title. */
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

  /** The social media descripton. */
  @ Inject
  @ Via ("resource")
  private String socialMediaDescripton;

  /** The page indexing. */
  @ Inject
  @ Via ("resource")
  private String pageIndexing;

  /** The social media title. */
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

  /** The advanced page type. */
  @ Inject
  @ Via ("resource")
  private String advancedPageType;

  /** The head include. */
  @ Inject
  @ Via ("resource")
  private String headInclude;

  /** The body include. */
  @ Inject
  @ Via ("resource")
  private String bodyInclude;

  /** The advisor type. */
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

  /** The custom metadata. */
  private Map <String, String> customMetadata;

  /** The alt language links. */
  private Map <String, String> altLanguageLinks;

  /** The analytics scriptlet. */
  private String analyticsScriptlet;

  /** The analytics script path. */
  private String analyticsScriptPath;

  /** The bread crumb. */
  private String breadCrumb;

  /** The page category. */
  private String pageCategory;

  /** The page sub category. */
  private String pageSubCategory;

  /** The tags. */
  @ Inject
  @ Named (com.day.cq.tagging.TagConstants.PN_TAGS)
  @ Via ("resource")
  private String [ ] tags;

  /** The other UDO tags map. */
  private JsonObject otherUDOTagsMap;

  /** The udo tags. */
  private String udoTags;

  /** The default reporting language. */
  private String defaultReportingLanguage;

  /** The master page path. */
  private String masterPagePath;
  
  /** The master seo canonical url. */
  private String masterSeoCanonicalUrl;

  /** The Constant JCR_CONTENT_DATA_MASTER. */
  private static final String JCR_CONTENT_DATA_MASTER = "/jcr:content/data/master";

  /** The Constant ARTICLE_PUBLISHED_DATE. */
  private static final String ARTICLE_PUBLISHED_DATE = "articlePublishedDate";

  /** The Constant ARTICLE_MODIFIED_DATE. */
  private static final String ARTICLE_MODIFIED_DATE = "articlePublishedDate@LastModified";
  
  /** The Constant SITE_SELECTOR. */
  private static final String SITE_SELECTOR = "siteSelector";
  
  /** The Constant PUBLIC. */
  private static final String PUBLIC = "public";
  
  /** The Constant SECURE. */
  private static final String SECURE = "secure";
  
  /** The Constant SLGI. */
  private static final String SLGI = "slgi";
  
  /** The page locale default. */
  private String pageLocaleDefault = "en";

  /** The auto complete url. */
  private String autoCompleteUrl;

  /** The search api. */
  private String searchApi;
  
  /** The enable context hinub. */
  private String enableContextHub;
  
  /** The User info path. */
  private String userInfoPath;
  

  /** The extra Clientlibs. */
  private String extraClientlibs;
  
  /** The site Head Include. */
  private String siteHeadInclude;
  
  /** The site Body Include. */
  private String siteBodyInclude;
  
  /** The site Body Include. */
  private String addOpeningDiv;
  
  /** The site wrapper div class. */
  private String wrapperDivClass;

  /** The mfa Domain Path. */
  private String mfaDomainPath;
  
  /** The mfa Encryption. */
  private String mfaEncryption;
  
  /** The favicon. */
  private String favIcon;

  /** The disableSocialSharingTags. */
  private String disableSocialSharingTags;
  
  /** The disableContextHubTags. */
  private String disableContextHubTags;
  
  /** The coveoSearchEnabled. */
  private String coveoSearchEnabled;

  /** The searchToken. */
  private String searchToken;

  /** The searchUrl. */
  private String searchUrl;

  /** The orgId. */
  private String orgId;

  /** The restUri. */
  private String restUri;

  /** The searchHub. */
  private String searchHub;

  /** The site locale. */
  private String siteLocale;

  /** The search language. */
  private String searchLanguage;
  
  public String getCoveoSearchEnabled() {
	return coveoSearchEnabled;
}

public void setCoveoSearchEnabled(String coveoSearchEnabled) {
	this.coveoSearchEnabled = coveoSearchEnabled;
}

  public String getSearchToken() {
	return searchToken;
}

public void setSearchToken(String searchToken) {
	this.searchToken = searchToken;
}

  public String getSearchUrl() {
	return searchUrl;
}

public void setSearchUrl(String searchUrl) {
	this.searchUrl = searchUrl;
}

  public String getOrgId() {
	return orgId;
}

public void setOrgId(String orgId) {
	this.orgId = orgId;
}

  public String getRestUri() {
	return restUri;
}

public void setRestUri(String restUri) {
	this.restUri = restUri;
}

  public String getSearchHub() {
	return searchHub;
}

public void setSearchHub(String searchHub) {
	this.searchHub = searchHub;
}

  public String getSiteLocale() {
	return siteLocale;
}

public void setSiteLocale(String siteLocale) {
	this.siteLocale = siteLocale;
}

  public String getSearchLanguage() {
	return searchLanguage;
}

public void setSearchLanguage(String searchLanguage) {
	this.searchLanguage = searchLanguage;
}

  public String getDisableContextHubTags() {
	return disableContextHubTags;
}

public void setDisableContextHubTags(String disableContextHubTags) {
	this.disableContextHubTags = disableContextHubTags;
}
/** The nonResponsive. */
  private String nonResponsive;
  
  /**
   * @return the favIcon
   */
  public final String getFavIcon() {
    return favIcon;
  }

  /**
   * @param favIcon the favIcon to set
   */
  public final void setFavIcon(String favIcon) {
    this.favIcon = favIcon;
  }

  /**
   * Gets the page title tag.
   *
   * @return the page title tag
   */
  public String getPageTitleTag() {
    return socialMediaTitle;
  }

  /**
   * Sets the page title tag.
   *
   * @param pageTitleTag
   *          the new page title tag
   */
  public void setPageTitleTag(final String pageTitleTag) {
    socialMediaTitle = pageTitleTag;
  }

  /**
   * Gets the seo page title.
   *
   * @return the seo page title
   */
  public String getSeoPageTitle() {
    return seoPageTitle;
  }

  /**
   * Sets the seo page title.
   *
   * @param seoPageTitle
   *          the new seo page title
   */
  public void setSeoPageTitle(final String seoPageTitle) {
    this.seoPageTitle = seoPageTitle;
  }

  /**
   * Gets the auto complete url.
   *
   * @return the auto complete url
   */
  public final String getAutoCompleteUrl() {
    return autoCompleteUrl;
  }

  /**
   * Sets the auto complete url.
   *
   * @param autoCompleteUrl
   *          the new auto complete url
   */
  public final void setAutoCompleteUrl(final String autoCompleteUrl) {
    this.autoCompleteUrl = autoCompleteUrl;
  }

  /**
   * Gets the search api.
   *
   * @return the search api
   */
  public final String getSearchApi() {
    return searchApi;
  }

  /**
   * Sets the search api.
   *
   * @param searchApi
   *          the new search api
   */
  public final void setSearchApi(final String searchApi) {
    this.searchApi = searchApi;
  }

  /**
   * Gets the page category.
   *
   * @return the page category
   */
  public final String getPageCategory() {
    return pageCategory;
  }

  /**
   * Sets the page category.
   *
   * @param pageCategory
   *          the new page category
   */
  public final void setPageCategory(final String pageCategory) {
    this.pageCategory = pageCategory;
  }

  /**
   * Gets the page sub category.
   *
   * @return the page sub category
   */
  public final String getPageSubCategory() {
    return pageSubCategory;
  }

  /**
   * Sets the page sub category.
   *
   * @param pageSubCategory
   *          the new page sub category
   */
  public final void setPageSubCategory(final String pageSubCategory) {
    this.pageSubCategory = pageSubCategory;
  }

  /**
   * Gets the analytics script path.
   *
   * @return the analytics script path
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
   * @return the analytics scriptlet
   */
  public final String getAnalyticsScriptlet() {
    return analyticsScriptlet;
  }

  /**
   * Sets the analytics scriptlet.
   *
   * @param analyticsScriptlet
   *          the new analytics scriptlet
   */
  public final void setAnalyticsScriptlet(final String analyticsScriptlet) {
    this.analyticsScriptlet = analyticsScriptlet;
  }

  /**
   * Gets the custom metadata.
   *
   * @return the custom metadata
   */
  public Map <String, String> getCustomMetadata() {
    return customMetadata;
  }

  /**
   * Sets the custom metadata.
   *
   * @param customMetadata
   *          the custom metadata
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
   * @return the seo canonical url
   */
  public String getSeoCanonicalUrl() {
    return seoCanonicalUrl;
  }

  /**
   * Sets the seo canonical url.
   *
   * @param seoCanonicalUrl
   *          the new seo canonical url
   */
  public void setSeoCanonicalUrl(final String seoCanonicalUrl) {
    this.seoCanonicalUrl = seoCanonicalUrl;
  }

  /**
   * Gets the seo description.
   *
   * @return the seo description
   */
  public String getSeoDescription() {
    return seoDescription;
  }

  /**
   * Sets the seo description.
   *
   * @param seoDescription
   *          the new seo description
   */
  public void setSeoDescription(final String seoDescription) {
    this.seoDescription = seoDescription;
  }

  /**
   * Gets the bread crumb.
   *
   * @return the bread crumb
   */
  public String getBreadCrumb() {
    return breadCrumb;
  }

  /**
   * Sets the bread crumb.
   *
   * @param breadCrumb
   *          the new bread crumb
   */
  public void setBreadCrumb(final String breadCrumb) {
    this.breadCrumb = breadCrumb;
  }

  /**
   * Gets the other UDO tags map.
   *
   * @return the other UDO tags map
   */
  public JsonObject getOtherUDOTagsMap() {
    return otherUDOTagsMap;
  }

  /**
   * Sets the other UDO tags map.
   *
   * @param otherUDOTagsMap
   *          the new other UDO tags map
   */
  public void setOtherUDOTagsMap(final JsonObject otherUDOTagsMap) {
    this.otherUDOTagsMap = otherUDOTagsMap;
  }

  /**
   * Gets the udo tags.
   *
   * @return the udo tags
   */
  public String getUdoTags() {
    return udoTags;
  }

  /**
   * Sets the udo tags.
   *
   * @param udoTags
   *          the new udo tags
   */
  public void setUdoTags(final String udoTags) {
    this.udoTags = udoTags;
  }

  /**
   * Gets the advanced page type.
   *
   * @return the advanced page type
   */
  public String getAdvancedPageType() {
    return advancedPageType;
  }

  /**
   * Sets the advanced page type.
   *
   * @param advancedPageType
   *          the new advanced page type
   */
  public void setAdvancedPageType(final String advancedPageType) {
    this.advancedPageType = advancedPageType;
  }

  /**
   * Gets the social media descripton.
   *
   * @return the social media descripton
   */
  public String getSocialMediaDescripton() {
    return socialMediaDescripton;
  }

  /**
   * Sets the social media descripton.
   *
   * @param socialMediaDescripton
   *          the new social media descripton
   */
  public void setSocialMediaDescripton(final String socialMediaDescripton) {
    this.socialMediaDescripton = socialMediaDescripton;
  }

  /**
   * Gets the page indexing.
   *
   * @return the page indexing
   */
  public String getPageIndexing() {
    return pageIndexing;
  }

  /**
   * Sets the page indexing.
   *
   * @param pageIndexing
   *          the new page indexing
   */
  public void setPageIndexing(final String pageIndexing) {
    this.pageIndexing = pageIndexing;
  }

  /**
   * Gets the social media image.
   *
   * @return the social media image
   */
  public String getSocialMediaImage() {
    return socialMediaImage;
  }

  /**
   * Sets the social media image.
   *
   * @param socialMediaImage
   *          the new social media image
   */
  public void setSocialMediaImage(final String socialMediaImage) {
    this.socialMediaImage = socialMediaImage;
  }

  /**
   * Gets the head include.
   *
   * @return the head include
   */
  public final String getHeadInclude() {
    return headInclude;
  }

  /**
   * Sets the head include.
   *
   * @param headInclude
   *          the new head include
   */
  public final void setHeadInclude(final String headInclude) {
    this.headInclude = headInclude;
  }

  /**
   * Gets the body include.
   *
   * @return the body include
   */
  public final String getBodyInclude() {
    return bodyInclude;
  }

  /**
   * Sets the body include.
   *
   * @param bodyInclude
   *          the new body include
   */
  public final void setBodyInclude(final String bodyInclude) {
    this.bodyInclude = bodyInclude;
  }

  /**
   * Gets the tags.
   *
   * @return the tags
   */
  public String [ ] getTags() {
    return null != tags ? Arrays.copyOf(tags, tags.length) : new String [ 0 ];
  }

  /**
   * Sets the tags.
   *
   * @param tags
   *          the new tags
   */
  public void setTags(final String [ ] tags) {
    this.tags = null != tags ? tags.clone() : null;
  }

  /**
   * Gets the page locale default.
   *
   * @return the page locale default
   */
  public String getPageLocaleDefault() {
    return pageLocaleDefault;
  }

  /**
   * Sets the page locale default.
   *
   * @param pageLocaleDefault
   *          the new page locale default
   */
  public void setPageLocaleDefault(final String pageLocaleDefault) {
    this.pageLocaleDefault = pageLocaleDefault;
  }
  
	/**
	 * Gets the enableContextHub
	 * 
	 * @return the enableContextHub
	 */
	public String getEnableContextHub() {
		return enableContextHub;
	}

	/**
	 * @param enableContextHub
	 *          the enableContextHub to set
	 */
	public void setEnableContextHub(String enableContextHub) {
		this.enableContextHub = enableContextHub;
	}
	
	/**
	 * Gets the UserInfoPath
	 * 
	 * @return the UserInfoPath
	 */
	public String getUserInfoPath() {
		return userInfoPath;
	}
    
	/**
	 * @param userInfoPath
	 *          the userInfoPath to set
	 */
	public void setUserInfoPath(String userInfoPath) {
		this.userInfoPath = userInfoPath;
	}

	/**
	 * Gets the extraClientlibs
	 * 
	 * @return the extraClientlibs
	 */
	public String getExtraClientlibs() {
		return extraClientlibs;
	}

	/**
	 * @param extraClientlibs
	 *          the extraClientlibs to set
	 */
	public void setExtraClientlibs(String extraClientlibs) {
		this.extraClientlibs = extraClientlibs;
	}
	
	/**
	 * Gets the site Head Include
	 * 
	 * @return the siteHeadInclude
	 */
	public String getSiteHeadInclude() {
		return siteHeadInclude;
	}

	/**
	 * @param siteHeadInclude
	 *          the siteHeadInclude to set
	 */
	public void setSiteHeadInclude(String siteHeadInclude) {
		this.siteHeadInclude = siteHeadInclude;
	}
	
	/**
	 * Gets the site Body Include
	 * 
	 * @return the siteBodyInclude
	 */
	public String getSiteBodyInclude() {
		return siteBodyInclude;
	}

	/**
	 * @param siteBodyInclude
	 *          the siteBodyInclude to set
	 */
	public void setSiteBodyInclude(String siteBodyInclude) {
		this.siteBodyInclude = siteBodyInclude;
	}
	
	/**
	 * Gets the addOpeningDiv
	 * 
	 * @return the addOpeningDiv
	 */
	public String getAddOpeningDiv() {
		return addOpeningDiv;
	}

	/**
	 * @param addOpeningDiv
	 *          the addOpeningDiv to set
	 */
	public void setAddOpeningDiv(String addOpeningDiv) {
		this.addOpeningDiv = addOpeningDiv;
	}
	
	/**
	 * Gets the wrapperDivClass
	 * 
	 * @return the wrapperDivClass
	 */
	public String getWrapperDivClass() {
		return wrapperDivClass;
	}

	/**
	 * @param wrapperDivClass
	 *          the wrapperDivClass to set
	 */
	public void setWrapperDivClass(String wrapperDivClass) {
		this.wrapperDivClass = wrapperDivClass;
	}
	
	/**
	 * Gets the mfaDomainPath
	 * 
	 * @return the mfaDomainPath
	 */
	public String getMfaDomainPath() {
		return mfaDomainPath;
	}

	/**
	 * @param mfaDomainPath
	 *          the mfaDomainPath to set
	 */
	public void setMfaDomainPath(final String mfaDomainPath) {
		this.mfaDomainPath = mfaDomainPath;
	}
	
	/**
	 * Gets the mfaDomainPath
	 * 
	 * @return the mfaDomainPath
	 */
	public String getMfaEncryption() {
		return mfaEncryption;
	}

	/**
	 * @param mfaDomainPath
	 *          the mfaDomainPath to set
	 */
	public void setMfaEncryption(final String mfaEncryption) {
		this.mfaEncryption = mfaEncryption;
	}

	/**
	 * Gets the disableSocialSharingTags.
	 *
	 * @return the disableSocialSharingTags
	 */
	public String getDisableSocialSharingTags() {
		return disableSocialSharingTags;
	}

	/**
	 * Sets the disableSocialSharingTags.
	 *
	 * @param disableSocialSharingTags
	 */
	public void setDisableSocialSharingTags(String disableSocialSharingTags) {
		this.disableSocialSharingTags = disableSocialSharingTags;
	}

	/**
	 * Gets the nonResponsive.
	 *
	 * @return the nonResponsive
	 */
	public String getNonResponsive() {
		return nonResponsive;
	}

	/**
	 * Sets the nonResponsive.
	 *
	 * @param nonResponsive
	 * 			the nonResponsive to set
	 */
	public void setNonResponsive(String nonResponsive) {
		this.nonResponsive = nonResponsive;
	}

	/**
   * Inits the.
   *
   * @throws LoginException
   *           the login exception
   * @throws RepositoryException
   *           the repository exception
   */
  @ PostConstruct
  public void init() throws LoginException, RepositoryException, WCMException {
    final String pagePath = currentPage.getPath();
    final String domain = configService.getConfigValues(DOMAIN_STR, pagePath);
    final String staticPath = configService.getConfigValues(BasePageModelConstants.STATIC_PATH_CONSTANT, pagePath);
    final String locale = configService.getConfigValues(PAGE_LOCALE, pagePath);
    final String udoTagsPath = configService.getConfigValues(UDO_TAGS_PATH, pagePath);
    //final String siteUrl = configService.getConfigValues(BasePageModelConstants.SITE_URL_CONSTANT,
      //  pagePath);
    setFavIcon(configService.getConfigValues("favIcon",
        pagePath));
    enableContextHub = configService.getConfigValues(BasePageModelConstants.ENABLE_CONTEXT_HUB_CONSTANT, pagePath);
    userInfoPath = configService.getConfigValues("userInfoPath", pagePath);
    extraClientlibs = configService.getConfigValues(EXTRA_CLIENTLIBS, pagePath);
    disableSocialSharingTags = configService.getConfigValues("disableSocialSharingTags", pagePath);
    disableContextHubTags = configService.getConfigValues("disableContextHubTags", pagePath);
    nonResponsive = configService.getConfigValues("nonResponsive", pagePath);
    coveoSearchEnabled = configService.getConfigValues("coveoSearchEnabled", pagePath);
    searchToken = configService.getConfigValues("searchToken", pagePath);
    searchUrl = configService.getConfigValues("searchUrl", pagePath);
    orgId = configService.getConfigValues("orgId", pagePath);
    restUri = configService.getConfigValues("restUri", pagePath);
    searchHub = configService.getConfigValues("searchHub", pagePath);
    siteLocale = configService.getConfigValues("siteLocale", pagePath);
    searchLanguage = configService.getConfigValues("searchLanguage", pagePath);
    
    if (currentPage.getPath().contains(BasePageModelConstants.SLFAS_PATH)) {
    	 siteHeadInclude = null== configService.getConfigValues(SITE_HEAD_INCLUDE, pagePath) ? "" : processSiteIncludes(configService.getConfigValues(SITE_HEAD_INCLUDE, pagePath));
   	     siteBodyInclude = null == configService.getConfigValues(SITE_BODY_INCLUDE, pagePath) ? "" : processSiteIncludes(configService.getConfigValues(SITE_BODY_INCLUDE, pagePath));
   	     headInclude= null==this.headInclude ? "" : processPageIncludes(this.headInclude); 
   	     bodyInclude= null ==this.bodyInclude ? "" : processPageIncludes(this.bodyInclude);
      LOG.debug("Head include {}",headInclude);
      LOG.debug("Body include {}",bodyInclude);
    }
    else {
    	siteHeadInclude = configService.getConfigValues(SITE_HEAD_INCLUDE, pagePath);
  	    siteBodyInclude =configService.getConfigValues(SITE_BODY_INCLUDE, pagePath);
    }
    addOpeningDiv = configService.getConfigValues(ADD_OPENING_DIV, pagePath);
	wrapperDivClass = configService.getConfigValues(WRAPPER_DIV_CLASS, pagePath);
    mfaDomainPath = configService.getConfigValues(MFA_DOMAIN_PATH, pagePath);
    mfaEncryption = configService.getConfigValues(MFA_ENCRYPTION, pagePath);
    if (null != locale && locale.length() > 0) {
      pageLocaleDefault = locale.split("_") [ 0 ];
    }
    LOG.debug("Base page model :: locale found is {}, language is {}", locale,
        pageLocaleDefault);

    // Condition for CNW News details page starts
    LOG.debug("advancedPageType: {}", advancedPageType);
    if (null != advancedPageType
        && BasePageModelConstants.PAGE_TYPE_CNW_CONSTANT.equals(advancedPageType)) {
      LOG.debug("Inside isCNWNewsDetailPage block");
      processDataForCNWNews(locale, pagePath);
    }
    // Condition for CNW News details page ends

    // Condition for advisor pages start
    if (null != advancedPageType
        && BasePageModelConstants.PAGE_TYPE_ADVISOR_CONSTANT.equals(advancedPageType)) {
      LOG.debug("Inside advisor page block");
      try {
        processDataForAdvisorPages();
      } catch (ApplicationException | SystemException e) {
        LOG.error("Error while processing advisor data {}", e);
      }
    }
    // Condition for advisor pages end

    // SEO title - <title> tag
    seoPageTitle = null == pageTitle ? getPageTitle(title) : pageTitle;

    if (null != advancedPageType && advancedPageType.equals("article")) {
    	
    	final String articleTitleFormat = configService.getConfigValues("articleTitleFormat", pagePath);
    	
    	if(null != articleTitleFormat && articleTitleFormat.length() > 0 && null == pageTitle) {
    		 seoPageTitle = WordUtils.capitalize(seoPageTitle);
    	}
     
    }

    // socialMediaTitle
    final String navTitle = currentPage.getNavigationTitle();
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
      seoCanonicalUrl = null == canonicalUrl ? configService.getPageUrl(pagePath) : canonicalUrl;
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
    customMetadata.put(OG_LOCALE, null != locale ? locale.replace("-", "_") : null);
    if (socialMediaImage != null) {
      customMetadata.put(OG_IMAGE, staticPath + socialMediaImage);
      customMetadata.put(TWITTER_IMAGE, staticPath + socialMediaImage);
    }
    customMetadata.put(TWITTER_CARD, "summary_large_image");
    // Condition for article pages start
    if (null != advancedPageType
        && BasePageModelConstants.PAGE_TYPE_ARTICLE_PAGES_CONSTANT.equals(advancedPageType)) {
      LOG.debug("Inside article page block");
      setArticlePageSocialMetaTags();
    }
    // Condition for article pages end
    LOG.debug("metadata :: {}", customMetadata);

    // Sets content structure specific alternate URLs
    if (null != currentPage.getPath()
        && null != resolver.getResource(currentPage.getPath())) {
      final Resource currentResource = resolver.getResource(currentPage.getPath());
      if (!currentPage.getPath().contains("slcm")) {
        generateAlternateUrls(currentResource);
      } else {
        generateLMAlternateUrls(currentResource);
      }
    }

    // Sets UDO parameters
    otherUDOTagsMap = new JsonObject();
    otherUDOTagsMap.addProperty("page_canonical_url", seoCanonicalUrl); // canonical url
    
    if (null != masterPagePath && masterPagePath.length() > 0 && null != seoCanonicalUrl) {
    	if(null!=canonicalUrl && null!=masterSeoCanonicalUrl && masterSeoCanonicalUrl.length()>0) {
            otherUDOTagsMap.addProperty("page_canonical_url_default", masterSeoCanonicalUrl);
        }else {
        	String masterDomain = this.configService.getConfigValues(DOMAIN_STR, masterPagePath);
            otherUDOTagsMap.addProperty("page_canonical_url_default", masterDomain
                .concat(configService.getPageRelativeUrl(masterPagePath))); // canonical
                                                                 // url
                                                                 // -
                                                                 // default
        }
      
    } else {
      otherUDOTagsMap.addProperty("page_canonical_url_default", seoCanonicalUrl); // canonical url
                                                                                  // -
                                                                                  // default
    }
    if (null != pageLocaleDefault && pageLocaleDefault.length() > 0) {
      otherUDOTagsMap.addProperty("page_language", pageLocaleDefault.toLowerCase(Locale.ROOT)); // Page
      // language
    }

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
    setAutoCompleteUrl(StringUtils.defaultIfEmpty(
        configService.getConfigValues("autoCompleteUrl", pagePath), StringUtils.EMPTY));
    setSearchApi(StringUtils.defaultIfEmpty(configService.getConfigValues("searchApi", pagePath),
        StringUtils.EMPTY));

    LOG.debug("Map Display {}", udoTags);
  }

/**
   * Gets the page title.
   *
   * @param titleStr
   *          the title
   * @return the page title
   * @throws LoginException
   *           the login exception
   * @throws RepositoryException
   *           the repository exception
   */
  public String getPageTitle(String titleStr) throws LoginException, RepositoryException {
    final String pagePath = currentPage.getPath();
    final String siteSuffix = configService.getConfigValues("siteSuffix", pagePath);
    if (null == siteSuffix || siteSuffix.length() <= 1) {
      return titleStr;
    } else {
      return siteSuffix.replace(BasePageModelConstants.PAGE_TITLE_FORMAT_CONSTANT, titleStr);
    }
  }

  /**
   * Sets the UDO parameters.
   *
   * @throws LoginException
   *           the login exception
   * @throws RepositoryException
   *           the repository exception
   */
  public void setUDOParameters() throws LoginException, RepositoryException {
    LOG.debug("Entry :: setUDOParameters :: ");
    Page pageResource = null;
    String pagePath = currentPage.getPath();
    final String siteUrl = configService.getConfigValues(BasePageModelConstants.SITE_URL_CONSTANT,pagePath);
    LOG.debug("setUDOParameters :: siteUrl: {}, defaultReportingLanguage: {}", siteUrl,
        defaultReportingLanguage);
    if (null == siteUrl || siteUrl.length() <= 0) {
      return;
    }
    pagePath = null == masterPagePath ? pagePath : masterPagePath;
    LOG.debug("pagePath is: {}", pagePath);
    final Resource resource = resolver.getResource(pagePath);
    if (null != resource) {
      pageResource = resource.adaptTo(Page.class);
    } else {
      pageResource = currentPage;
    }
    int startLevel = siteUrl.replaceFirst(BasePageModelConstants.SLASH_CONSTANT, "")
        .split(BasePageModelConstants.SLASH_CONSTANT).length;
    int rootPageLevel = startLevel - 1;
    int currentLevel = null != pageResource ? pageResource.getDepth() : 0;
    final List <String> navList = new ArrayList <>();
    // Root page title fetch
    final Page rootPage = null != pageResource ? pageResource.getAbsoluteParent(rootPageLevel)
        : null;
    if (rootPage != null) {
      navList.add(getBreadcrumbTitle(rootPage).toLowerCase(Locale.getDefault()));
    }
    if (null != advancedPageType
        && BasePageModelConstants.PAGE_TYPE_ARTICLE_PAGES_CONSTANT.equals(advancedPageType)) {
      currentLevel = currentLevel - 1;
    }
    while (startLevel < currentLevel) {
      final Page page = null != pageResource ? pageResource.getAbsoluteParent(startLevel) : null;
      if (page != null) {
        final boolean isActivePage = page.equals(pageResource);
        navList.add(page.getName().replaceAll("-", " "));
        if (isActivePage) {
          break;
        }
      }
      startLevel++;
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
    LOG.debug("breadCrumb: {}, pageCategory: {}, pageSubCategory: {}", breadCrumb, pageCategory,
        pageSubCategory);
    otherUDOTagsMap.addProperty("page_breadcrumb", breadCrumb); // Bread crumb
    otherUDOTagsMap.addProperty("page_category", pageCategory == null ? breadCrumb : pageCategory); // Page
    // category
    otherUDOTagsMap.addProperty("page_subcategory", pageSubCategory == null ? "" : pageSubCategory); // Page
                                                                                                     // sub
                                                                                                     // category

    // For advisor pages

    LOG.debug("Exit :: setUDOParameters :: otherUDOTagsMap: {}", otherUDOTagsMap);
  }

  /**
   * Gets the breadcrumb title.
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
   * Sets the other UDO tags.
   *
   * @param udoTagStart
   *          the new other UDO tags
   */
  public void setOtherUDOTags(final String udoTagStart) {
    LOG.debug("Entry :: setOtherUDOTags method of :: udoTagStart :: {}", udoTagStart);
    final String tagAbsolutePath = udoTagStart.replace("/content/cq:tags/", "");
    final String tagRootPath = tagAbsolutePath
        .substring(tagAbsolutePath.indexOf(BasePageModelConstants.SLASH_CONSTANT));
    if (null != tags && tags.length > 0) {
      LOG.debug("tags :: {}", Arrays.asList(tags));
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
    LOG.debug("Exit :: setOtherUDOTags method of :: otherUDOTagsMap :: {}", otherUDOTagsMap);
  }

  /**
   * Process UDO path.
   *
   * @param path
   *          the path
   */
  public void processUDOPath(final String path) {
    LOG.debug("Entry :: processUDOPath :: path :: {}", path);
    if (null == path || ! path.contains(BasePageModelConstants.SLASH_CONSTANT)) {
      LOG.debug("No child tag exists for path: {}", path);
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
    LOG.debug("Exit :: processUDOPath :: otherUDOTagsMap :: {}", otherUDOTagsMap);
  }

  /**
   * Process data for CNW news.
   *
   * @param pageLocale
   *          the page locale
   * @param pagePath
   *          the page path
   */
  public void processDataForCNWNews(final String pageLocale, final String pagePath) {
    LOG.debug("Entry :: processDataForCNWNews :: ");
    String releaseId = null;
    try {
      if (request.getRequestPathInfo().getSelectors().length > 0) {
        releaseId = request.getRequestPathInfo().getSelectors() [ 0 ];
        LOG.debug("Selector fetched :: releaseId :: {}", releaseId);
        final NewsDetails newsDetails = cnwNewsService.getCNWNewsDetails(releaseId,
            pageLocale.split("_") [ 0 ]);
        title = newsDetails.getRelease().getHeadline();
        description = "";
        String summary = newsDetails.getRelease().getSummary();
        summary = StringEscapeUtils.unescapeHtml(summary);
        summary = summary.replaceAll("<.*?>", "");
        summary = StringEscapeUtils.escapeJava(summary);
        socialMediaDescripton = summary.substring(0,
            Math.min(summary.length(), BasePageModelConstants.TITLE_MAX_LENGTH_CONSTANT));
        canonicalUrl = configService.getPageUrl(pagePath)
            + newsDetails.getRelease().getHeadline().replaceAll(" ", "-").replaceAll("%", "")
                .replaceAll("[~@#$^&*()={}|,.?:<>'/;`%!\"]", "").toLowerCase(Locale.ROOT)
            + BasePageModelConstants.SLASH_CONSTANT + releaseId
            + BasePageModelConstants.SLASH_CONSTANT;
        LOG.debug(
            "processDataForCNWNews :: Fetched items :: title: {}, description: {}, socialMediaDescripton: {}, canonicalUrl: {}",
            title, description, socialMediaDescripton, canonicalUrl);
      }
    } catch (IOException | ParseException | ApplicationException | SystemException e) {
      LOG.error("Error :: processDataForCNWNews :: {}", e);
    }
    LOG.debug("Exit :: processDataForCNWNews :: ");
  }

  /**
   * Process data for advisor pages.
   *
   * @throws LoginException
   *           the login exception
   * @throws RepositoryException
   *           the repository exception
   * @throws ApplicationException
   *           the application exception
   * @throws SystemException
   *           the system exception
   */
  public void processDataForAdvisorPages() throws LoginException, RepositoryException,
      ApplicationException, SystemException {
    LOG.debug("Entry :: BasePageModel :: processDataForAdvisorPages :: ");
    String advisorId = null;
    if (request.getRequestPathInfo().getSelectors().length > 0) {
      advisorId = request.getRequestPathInfo().getSelectors() [ 0 ];
      if (null != advisorId && null != canonicalUrl) {
        canonicalUrl = canonicalUrl
            .replace(BasePageModelConstants.ADVISOR_ID_CANONICAL_URL_FORMAT_CONSTANT, advisorId)
            .replace(BasePageModelConstants.ADVISOR_TYPE_CANONICAL_URL_FORMAT_CONSTANT,
                advisorType);
      }
      LOG.debug("canonicalUrl :: {}", canonicalUrl);

      final String advisorData = advisorDetailService.getAdvisorDetails(pageLocaleDefault,
          advisorType, advisorId);
      if (null != advisorData) {
        final JsonObject inputJson = new Gson().fromJson(advisorData, JsonObject.class);
        pageTitle = getPageTitle(getAdvisorTitle(inputJson));
      }
    }
    LOG.debug("Exit :: BasePageModel :: processDataForAdvisorPages :: canonicalUrl :: {}",
        canonicalUrl);
  }

  /**
   * Gets the advisor title.
   *
   * @param advisorData
   *          the input json
   * @return the advisor title
   */
  public String getAdvisorTitle(final JsonObject advisorData) {
    LOG.debug("Entry :: BasePageModel :: getAdvisorTitle :: ");
    String advisorTitle = null;
    if (advisorData.has(AdvisorDetailConstants.ERROR_CODE_CONSTANT)
        && ! advisorData.get(AdvisorDetailConstants.ERROR_CODE_CONSTANT).toString()
            .equals(AdvisorDetailConstants.ERROR_CODE_SUCCESS_CONSTANT)) {
      LOG.debug("BasePageModel :: getAdvisorTitle :: advisor details are not available");
      return advisorTitle;
    }
    if (AdvisorDetailConstants.CORP_CONSTANT.equals(advisorType)) {
      final JsonObject advisorCorpJson = advisorData
          .getAsJsonObject(AdvisorDetailConstants.ADVISOR_CORP_CONSTANT);
      advisorTitle = advisorCorpJson.get(AdvisorDetailConstants.CORP_NAME_CONSTANT).toString();
    } else {
      final JsonObject advisorStdJson = advisorData
          .getAsJsonObject(AdvisorDetailConstants.ADVISOR_STD_CONSTANT);
      advisorTitle = advisorStdJson.get(AdvisorDetailConstants.FORMATTED_NAME_CONSTANT).toString();
    }
    LOG.debug("Entry :: BasePageModel :: getAdvisorTitle :: advisorTitle :: {}", advisorTitle);
    return advisorTitle;
  }

  /**
   * Sets the UDO tags for advisor pages.
   */
  public void setUDOTagsForAdvisorPages() {
    LOG.debug("Entry :: BasePageModel :: setUDOTagsForAdvisorPages :: ");
    String advisorId = null;
    if (request.getRequestPathInfo().getSelectors().length > 0) {
      advisorId = request.getRequestPathInfo().getSelectors() [ 0 ];
      otherUDOTagsMap.addProperty(AdvisorDetailConstants.PAGE_ADVISOR_ID_CONSTANT, advisorId);
      otherUDOTagsMap.addProperty(AdvisorDetailConstants.PAGE_ADVISOR_TYPE_CONSTANT, advisorType);
    }
    LOG.debug("setUDOTagsForAdvisorPages :: advisorId :: {}, advisorType :: {}", advisorId,
        advisorType);
    LOG.debug("Exit :: BasePageModel :: setUDOTagsForAdvisorPages :: ");
  }

  /**
   * Sets the article page social meta tags.
   *
   * @throws LoginException
   *           the login exception
   * @throws RepositoryException
   *           the repository exception
   */
  public void setArticlePageSocialMetaTags() throws LoginException, RepositoryException {
    LOG.debug("Entry :: BasePageModel :: setArticlePageSocialMetaTags :: ");
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
      LOG.debug("articleResource is null");
      return;
    }
    final ValueMap articleResContent = articleResource.getValueMap();

    final String fragmentPath = articleResContent.containsKey("fragmentPath")
        ? articleResContent.get("fragmentPath", String.class)
        : null;
    String articlePublishedDate = StringUtils.EMPTY;
    String articlePublishedModifiedDate = StringUtils.EMPTY;

    if (null == fragmentPath) {
      LOG.debug("fragmentPath is null");
      return;
    }

    final Resource articleFragmentResource = resolver
        .getResource(fragmentPath.concat(JCR_CONTENT_DATA_MASTER));
    if (null == articleFragmentResource) {
      LOG.debug("articleFragmentResource is null");
      return;
    }
    final ValueMap articleContent = articleFragmentResource.getValueMap();

    final SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
    if (articleContent.containsKey(ARTICLE_PUBLISHED_DATE)) {
      articlePublishedDate = formatter.format(((GregorianCalendar) articleContent
          .getOrDefault(ARTICLE_PUBLISHED_DATE, new GregorianCalendar())).getTime());
    }

    if (articleContent.containsKey(ARTICLE_MODIFIED_DATE)) {
      articlePublishedModifiedDate = formatter.format(((GregorianCalendar) articleContent
          .getOrDefault(ARTICLE_MODIFIED_DATE, new GregorianCalendar())).getTime());
    }

    customMetadata.put(OG_PUBLISHED_DATE, articlePublishedDate);
    customMetadata.put(OG_MODIFIED_DATE, articlePublishedModifiedDate);
    LOG.debug("Exit :: BasePageModel :: setArticlePageSocialMetaTags :: ");
  }

  /**
   * Generate alternate urls.
   *
   * @param resource
   *          the resource
   */
  private void generateAlternateUrls(final Resource resource) {
    LOG.debug("Entry :: BasePageModel :: generateAlternateUrls :: resource :: {}", resource);
    try {
      if (null == resolver || null == resource ) {
        return;
      }
      Map <String, String> pageAltLanguageLinks = new HashMap <>();
      final Resource altLanResource = resolver
          .getResource(resource.getPath() + "/jcr:content/alternateUrls");
      LOG.debug("Alt urls --> {}", altLanResource);
      if (null != altLanResource) {
        generatePageSpecificAlternateUrls();
        if(altLanguageLinks.size()==1) pageAltLanguageLinks = altLanguageLinks;
        else return;
       
      }
      final String pagePath = currentPage.getPath();
      final String modHrefLang = configService.getConfigValues(HREF_LANG, pagePath);
      final String pageLocale = configService.getConfigValues(PAGE_LOCALE, pagePath);
      if (null == pageLocale || pageLocale.length() == 0) {
        return;
      }
      final String siteDomain = configService.getConfigValues(DOMAIN_STR, pagePath);
//      final String siteUrl = configService.getConfigValues(SITE_URL, pagePath);

      // check if it is a source
      LOG.debug("is source {}", relationshipManager.isSource(resource));
      // check if it is a live copy
      LOG.debug("has live relationship {}", relationshipManager.hasLiveRelationship(resource));
      Resource sourceResource = resource;
      if (relationshipManager.hasLiveRelationship(resource)) {
        final LiveRelationship liveRelationship = relationshipManager.getLiveRelationship(resource,
            false);
        if (liveRelationship != null) {
          final LiveCopy liveCopy = liveRelationship.getLiveCopy();
          if (liveCopy != null) {
            final String sourcePath = liveCopy.getBlueprintPath();
            masterPagePath = sourcePath;
            sourceResource = resolver.getResource(sourcePath);
            	if(sourceResource!=null) {
                	 Page page = sourceResource.adaptTo(Page.class);
                     if (page != null) { 
                    	 masterSeoCanonicalUrl = (null==masterSeoCanonicalUrl) ? page.getProperties().get("canonicalUrl", String.class) : masterSeoCanonicalUrl;
                     }
            	}	
          }
        }
      }
      if (relationshipManager.isSource(sourceResource)) {
        LOG.debug("source page {}", sourceResource.getPath());
        final Resource target = resolver.getResource(sourceResource.getPath());
        final RangeIterator relationships = relationshipManager.getLiveRelationships(target, null,
            null);
        if (relationships != null) {
          altLanguageLinks = new HashMap <>();
          while (relationships.hasNext()) {
            LiveRelationship relationship = (LiveRelationship) relationships.next();

            final String liveCopyPath = relationship.getTargetPath();
            // filter non-existing
            // LiveCopy Resources and
            // LiveCopy Launches
            if (relationship.getStatus().isTargetExisting()
                && ! LaunchUtils.isLaunchResourcePath(liveCopyPath)) {
              addAlternateUrl(liveCopyPath);
            }
          }
        }
        if(relationshipManager.hasLiveRelationship(resource)) {
        addAlternateUrl(sourceResource.getPath());
        }
      }
      if (null != altLanguageLinks && ! altLanguageLinks.isEmpty()) {
    	  String hrefLang = null;
    	  if(modHrefLang!= null && modHrefLang.equals("true")) {
    		  hrefLang = pageLocale.substring(0, pageLocale.length()-3);
    	  }else {
    		  hrefLang = pageLocale.split("_") [ 0 ] + "-"
    	                + pageLocale.split("_") [ 1 ].replace("_", "-").toLowerCase(Locale.ROOT);
    	  }
        /*altLanguageLinks.put(
            pageLocale.split("_") [ 0 ] + "-"
                + pageLocale.split("_") [ 1 ].replace("_", "-").toLowerCase(Locale.ROOT),
            siteDomain + configService.getPageRelativeUrl(pagePath));*/
    	  altLanguageLinks.put(
    			  hrefLang,
  	            siteDomain + configService.getPageRelativeUrl(pagePath));
        
	        if(pageAltLanguageLinks.size()==1) {
	      	  Map.Entry<String,String> entry = pageAltLanguageLinks.entrySet().iterator().next();
	      	  altLanguageLinks.put(entry.getKey(), entry.getValue());
	        }
      }
      LOG.debug("New altLanguageLinks :: {}", altLanguageLinks);
      
    } catch (WCMException | LoginException | RepositoryException e) {
      LOG.error("Unable to get the live copy: {}", e.getMessage());
    }
    LOG.debug("Exit :: BasePageModel :: generateAlternateUrls :: resource :: {}", resource);
  }

  /**
   * Generate Language masters structured sites alternate urls.
   *
   * @param resource
   *          the resource
   */
  private void generateLMAlternateUrls(final Resource resource) {
    LOG.debug("Entry :: setAlternateURLs");

    altLanguageLinks = new HashMap <>();
    try {
      String syncPath = "";
      String altCount = configService.getConfigValues("altLangCount" , resource.getPath());
      int altLangCount = 0;
      if (relationshipManager.hasLiveRelationship(resource))
        syncPath = relationshipManager.getLiveRelationship(resource, false).getSyncPath();
      if (!altCount.isEmpty())
        altLangCount = Integer.parseInt(altCount);
      boolean isAltLangSameAsCurPgLocale = false;
      for (int altLangIterator = 0; altLangIterator < altLangCount; altLangIterator++) {
        final String altLang = configService.getConfigValues(
                BasePageModelConstants.ALTERNATE_URL_ITEMS_CONSTANT + altLangIterator + "_languageCode" , resource.getPath());
        final String altUrl = configService.getConfigValues(
                BasePageModelConstants.ALTERNATE_URL_ITEMS_CONSTANT + altLangIterator + "_siteLocation" , resource.getPath());
        final String defaultLanguage = configService.getConfigValues(
                BasePageModelConstants.ALTERNATE_URL_ITEMS_CONSTANT + altLangIterator + "_defaultLanguage" , resource.getPath());

        final String altSiteUrl = configService.getPageRelativeUrl(altUrl);
        final String altSiteDomain = configService.getConfigValues(DOMAIN_STR, altUrl);
        String updatedSyncPath="";

        if (defaultLanguage.length() > 0)
          masterPagePath = altUrl.contains(syncPath) ? altUrl : altUrl + syncPath;

        if(null!=masterPagePath)
          masterSeoCanonicalUrl = configService.getPageUrl(masterPagePath);

        canonicalUrl = configService.getPageUrl(currentPage.getPath());
        if (!syncPath.isEmpty()) {
          updatedSyncPath = syncPath.substring(1,syncPath.length());
        }

        altLanguageLinks.put(
                altLang.split("_") [ 0 ] + "-"
                        + altLang.split("_") [ 1 ].replace("_", "-").toLowerCase(Locale.ROOT),
                altSiteDomain + altSiteUrl + updatedSyncPath);

        if(altSiteUrl.length()==0 && altSiteDomain.length()==0) {
          altLanguageLinks.put(
                  altLang.split("_") [ 0 ] + "-"
                          + altLang.split("_") [ 1 ].replace("_", "-").toLowerCase(Locale.ROOT),
                  altUrl);
          if(configService.getConfigValues(PAGE_LOCALE, currentPage.getPath()).equalsIgnoreCase(altLang)) {
            isAltLangSameAsCurPgLocale=true;
          }
        }
      }

      final String pagePath = currentPage.getPath();
      final String pageLocale = configService.getConfigValues(PAGE_LOCALE, pagePath);
      final String siteDomain = configService.getConfigValues(DOMAIN_STR, pagePath);
      if (! altLanguageLinks.isEmpty()) {
        if(isAltLangSameAsCurPgLocale) return;

        altLanguageLinks.put(
                pageLocale.split("_") [ 0 ] + "-"
                        + pageLocale.split("_") [ 1 ].replace("_", "-").toLowerCase(Locale.ROOT),
                siteDomain + configService.getPageRelativeUrl(pagePath));
      }
      LOG.debug("Page specific new altLanguageLinks :: {}", altLanguageLinks);
    } catch (LoginException | RepositoryException | WCMException e) {
      LOG.error("Error while generating alternate urls :: {}", e.getMessage());
    }
    LOG.debug("Map {}", altLanguageLinks);
  }

  /**
   * @param liveCopyPath
   * @throws LoginException
   * @throws RepositoryException
   */
  private void addAlternateUrl(final String liveCopyPath)
      throws LoginException, RepositoryException {
    LOG.debug("path :: {}", liveCopyPath);
    final String sourcePageLocale = configService.getConfigValues(PAGE_LOCALE,
        liveCopyPath);
    final String sourceSiteUrl = configService.getPageRelativeUrl(liveCopyPath);
    final String sourceSiteDomain = configService.getConfigValues(DOMAIN_STR,
        liveCopyPath);
    LOG.debug(
        "generateAlternateUrls method :: sourcePath: {}, sourcePageLocale: {}, sourceSiteDomain: {}",
        liveCopyPath, sourcePageLocale, sourceSiteUrl);
    final String modHrefLang = configService.getConfigValues(HREF_LANG, liveCopyPath);
    String hrefLang = null;
    if(modHrefLang!= null && modHrefLang.equals("true")) {
		  hrefLang = sourcePageLocale.substring(0, sourcePageLocale.length()-3);
	  }else {
		  hrefLang = sourcePageLocale.split("_") [ 0 ] + "-"
	                + sourcePageLocale.split("_") [ 1 ].replace("_", "-").toLowerCase(Locale.ROOT);
	  }
    if (StringUtils.isEmpty(sourcePageLocale) || StringUtils.isEmpty(sourceSiteUrl)) {
    	return;
    }
   /* altLanguageLinks.put(
        sourcePageLocale.split("_") [ 0 ] + "-"
            + sourcePageLocale.split("_") [ 1 ].replace("_", "-")
                .toLowerCase(Locale.ROOT),
        sourceSiteDomain + sourceSiteUrl);*/
    altLanguageLinks.put(
    		hrefLang,
            sourceSiteDomain + sourceSiteUrl);
  }

  /**
   * Generate page specific alternate urls.
   */
  public void generatePageSpecificAlternateUrls() {
    LOG.debug("Entry :: setAlternateURLs");
    final Resource alternateUrls = resolver
        .getResource(currentPage.getPath() + "/jcr:content/alternateUrls");
    if (null == alternateUrls) {
      return;
    }
    altLanguageLinks = new HashMap <>();
    try {
    	boolean isAltLangSameAsCurPgLocale = false;
      for (final Resource currentResource : alternateUrls.getChildren()) {
        final ValueMap currentResourceProperties = ResourceUtil.getValueMap(currentResource);
        final String altLang = (String) currentResourceProperties.getOrDefault("alternateLanguage",
            StringUtils.EMPTY);
        final String altUrl = (String) currentResourceProperties.getOrDefault("alternateUrl",
            StringUtils.EMPTY);
        final String defaultLanguage = (String) currentResourceProperties
            .getOrDefault("defaultLanguage", StringUtils.EMPTY);

        final String altSiteUrl = configService.getPageRelativeUrl(altUrl);
        final String altSiteDomain = configService.getConfigValues(DOMAIN_STR, altUrl);
        final String modHrefLang = configService.getConfigValues(HREF_LANG, altUrl);
        String hrefLang = null;
        if(modHrefLang!= null && modHrefLang.equals("true")) {
    		  hrefLang = altLang.substring(0, altLang.length()-3);
    	  }else {
    		  hrefLang = altLang.split("_") [ 0 ] + "-"
    	                + altLang.split("_") [ 1 ].replace("_", "-").toLowerCase(Locale.ROOT);
    	  }

        masterPagePath = defaultLanguage.length() > 0 ? altUrl : null;
        
        if(null!=masterPagePath)  masterSeoCanonicalUrl = masterPagePath;
        
        /*altLanguageLinks.put(
            altLang.split("_") [ 0 ] + "-"
                + altLang.split("_") [ 1 ].replace("_", "-").toLowerCase(Locale.ROOT),
            altSiteDomain + altSiteUrl);*/
        altLanguageLinks.put(
        		hrefLang,
                altSiteDomain + altSiteUrl);
        
    	if(altSiteUrl.length()==0 && altSiteDomain.length()==0) {
        	/*altLanguageLinks.put(
                    altLang.split("_") [ 0 ] + "-"
                        + altLang.split("_") [ 1 ].replace("_", "-").toLowerCase(Locale.ROOT),
                        altUrl);*/
        	altLanguageLinks.put(
        			hrefLang,
                        altUrl);
        	if(configService.getConfigValues(PAGE_LOCALE, currentPage.getPath()).equalsIgnoreCase(altLang)) {
        			isAltLangSameAsCurPgLocale=true;
        	}
        }
        
      }
      masterPagePath = masterSeoCanonicalUrl;
 	  
		if (null == masterPagePath) {
			Resource resource = resolver.getResource(currentPage.getPath());
			if (relationshipManager.hasLiveRelationship(resource)) {
				final LiveRelationship liveRelationship = relationshipManager.getLiveRelationship(resource, false);
				if (liveRelationship != null) {
					final LiveCopy liveCopy = liveRelationship.getLiveCopy();
					if (liveCopy != null) {
						final String sourcePath = liveCopy.getBlueprintPath();
						masterPagePath = sourcePath;
						Resource sourceResource = resolver.getResource(sourcePath);
							if (sourceResource != null) {
								Page page = sourceResource.adaptTo(Page.class);
								if (page != null) {
									masterSeoCanonicalUrl = page.getProperties().get("canonicalUrl", String.class);
								}
							}
					}
				}
			}
	
		}
 	  
 	  
      final String pagePath = currentPage.getPath();
      final String pageLocale = configService.getConfigValues(PAGE_LOCALE, pagePath);
      final String siteDomain = configService.getConfigValues(DOMAIN_STR, pagePath);
      final String modifiedHrefLang = configService.getConfigValues(HREF_LANG, pagePath);
      String pageHrefLang = null;
      if(modifiedHrefLang!= null && modifiedHrefLang.equals("true")) {
    	  pageHrefLang = pageLocale.substring(0, pageLocale.length()-3);
	  }else {
		  pageHrefLang = pageLocale.split("_") [ 0 ] + "-"
	                + pageLocale.split("_") [ 1 ].replace("_", "-").toLowerCase(Locale.ROOT);
	  }
      if (! altLanguageLinks.isEmpty()) {
        if(isAltLangSameAsCurPgLocale) return;
    	
        /*altLanguageLinks.put(
            pageLocale.split("_") [ 0 ] + "-"
                + pageLocale.split("_") [ 1 ].replace("_", "-").toLowerCase(Locale.ROOT),
            siteDomain + configService.getPageRelativeUrl(pagePath));*/
        altLanguageLinks.put(
        		pageHrefLang,
                siteDomain + configService.getPageRelativeUrl(pagePath));
      }
      LOG.debug("Page specific new altLanguageLinks :: {}", altLanguageLinks);
    } catch (LoginException | RepositoryException | WCMException e) {
      LOG.error("Error while generating alternate urls :: {}", e.getMessage());
    }
    LOG.debug("Map {}", altLanguageLinks);
  }
  
  public String processSiteIncludes(String siteInclude) {
	  String processedSiteInclude="";
		  Document parsedSiteInclude= Jsoup.parse(siteInclude);
		  LOG.debug("Parsed site include:: {}",parsedSiteInclude);
		  String urlSelector="";
		  String siteSelector="";
		  try {
			urlSelector=request.getRequestPathInfo().getSelectors().length>0 ? request.getRequestPathInfo().getSelectors()[0]:"";
			siteSelector= configService.getConfigValues(SITE_SELECTOR, currentPage.getPath());
			if(urlSelector.equals(siteSelector) && request.getRequestPathInfo().getSelectors().length>1) {
				urlSelector=request.getRequestPathInfo().getSelectors()[1];
			}
			LOG.debug("Final URL Selector::{}",urlSelector);
			boolean hasHtmlTags= true;
			if(parsedSiteInclude.getElementsByTag(PUBLIC).html().isEmpty() && parsedSiteInclude.getElementsByTag(SECURE).html().isEmpty() && parsedSiteInclude.getElementsByTag(SLGI).html().isEmpty()) {
				hasHtmlTags=false;
				LOG.debug("Site include does not have html");
			}
			if(hasHtmlTags  && (urlSelector.equals(PUBLIC)|| urlSelector.equals(SECURE) || urlSelector.equals(SLGI))  ) {
					processedSiteInclude = parsedSiteInclude.getElementsByTag(urlSelector).html();	
					LOG.debug("Processed site include if site has html and has selector ::{}",processedSiteInclude);
			}
			else if(hasHtmlTags && urlSelector.isEmpty()) {
				processedSiteInclude = parsedSiteInclude.body().child(0).html();
				LOG.debug("Processed site include if site has html and no selector ::{}",processedSiteInclude);
			}
			else {
					processedSiteInclude = siteInclude;		
					LOG.debug("Processed site include if site has no html and no selector ::{}",processedSiteInclude);
			}
			LOG.debug("ProcessedSiteInclude text :: {}",processedSiteInclude);
		} catch (RepositoryException | org.apache.sling.api.resource.LoginException e) {
			LOG.error("Error :: processSiteInclude method of Base Page model :: {}", e);
		} 	    
	  return processedSiteInclude;			  
  }
  public String processPageIncludes(String pageInclude) {
	 /* if(pageInclude.isEmpty()) {
		  return pageInclude;
	  }*/
		String processedPageInclude="";
		Document parsedPageInclude=Jsoup.parse(pageInclude);
		boolean hasHtmlTags= true;
		if(parsedPageInclude.getElementsByTag(PUBLIC).html().isEmpty() && parsedPageInclude.getElementsByTag(SECURE).html().isEmpty() && parsedPageInclude.getElementsByTag(SLGI).html().isEmpty()) {
			hasHtmlTags=false;
			LOG.debug("Page include does not have html");
		}
		if(hasHtmlTags) {
			processedPageInclude=parsedPageInclude.body().child(0).html();
		}
		else {
			processedPageInclude = pageInclude;
		}
		LOG.debug("Page include processed: {}", processedPageInclude);
		return processedPageInclude;
	}

}