/**
 *
 */
package ca.sunlife.web.cms.core.models;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;
import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Source;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.settings.SlingSettingsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import ca.sunlife.web.cms.core.beans.NewsDetails;
import ca.sunlife.web.cms.core.services.CNWNewsService;
import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * Sling model for Base Page details.
 *
 * @author MO92
 */
@Model(adaptables = { SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "sunlife/core/components/structure/base-page")
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

	/** The Constant LOGGER. */
	private static final Logger logger = LoggerFactory.getLogger(BasePageModel.class);

	/** The current page. */
	@ScriptVariable
	private Page currentPage;

	/** The request. */
	@Self
	private SlingHttpServletRequest request;

	/** The resolver. */
	@Inject
	@Source("sling-object")
	private ResourceResolver resolver;

	@OSGiService
	private SlingSettingsService settingsService;

	/** The canonical url. */
	@Inject
	@Via("resource")
	private String canonicalUrl;

	/** The page description. */
	@Inject
	@Via("resource")
	private String pageDescription;

	/** The page title - refers to more title in page properties */
	@Inject
	@Via("resource")
	private String pageTitle;

	/** The description. */
	@Inject
	@Named("jcr:description")
	@Via("resource")
	private String description;

	/** The language. */
	@Inject
	@Named("jcr:language")
	@Via("resource")
	private String language;

	/** The title. */
	@Inject
	@Named("jcr:title")
	@Via("resource")
	private String title;

	/** The social media description. */
	@Inject
	@Via("resource")
	private String socialMediaDescripton;

	/** The seo page title. */
	private String seoPageTitle;

	/** The seo canonical url. */
	private String seoCanonicalUrl;

	/** The seo description. */
	private String seoDescription;

	/** The social media image. */
	@Inject
	@Via("resource")
	private String socialMediaImage;
	
	/** Is cnw news details page . */
	@Inject
	@Via("resource")
	private String isCNWNewsDetailPage;

	/** The config service. */
	@Inject
	private SiteConfigService configService;

	@Inject
	private CNWNewsService cnwNewsService;
	
	/** The meta data. */
	private Map<String, String> customMetadata;

	/** The alt language links. */
	private Map<String, String> altLanguageLinks;

	/** The analytics scriptlet. */
	private String analyticsScriptlet;

	/** The analytics script. */
	private String analyticsScriptPath;

	/** Bread crumb - UDO */
	private String breadCrumb;

	/** The page category. - UDO */
	private String pageCategory;

	/** The page sub category. - UDO */
	private String pageSubCategory;

	/** Tags - UDO */
	@Inject
	@Named("cq:tags")
	@Via("resource")
	private String[] tags;

	/** Tags - Other UDO tags */
	private JsonObject otherUDOTagsMap;

	/** UDO Tags - string */
	private String udoTags;

	/**
	 * @return the seoPageTitle
	 */
	public String getSeoPageTitle() {
		return seoPageTitle;
	}

	/**
	 * @param seoPageTitle
	 *            the seoPageTitle to set
	 */
	public void setSeoPageTitle(String seoPageTitle) {
		this.seoPageTitle = seoPageTitle;
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
	 *            the pageCategory to set
	 */
	public final void setPageCategory(String pageCategory) {
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
	 *            the pageSubCategory to set
	 */
	public final void setPageSubCategory(String pageSubCategory) {
		this.pageSubCategory = pageSubCategory;
	}

	/**
	 * @return the analyticsScript
	 */
	public final String getAnalyticsScriptPath() {
		return analyticsScriptPath;
	}

	/**
	 * @param analyticsScript
	 *            the analyticsScript to set
	 */
	public final void setAnalyticsScriptPath(String analyticsScriptPath) {
		this.analyticsScriptPath = analyticsScriptPath;
	}

	/**
	 * @return the analyticsScriptlet
	 */
	public final String getAnalyticsScriptlet() {
		return analyticsScriptlet;
	}

	/**
	 * @param analyticsScriptlet
	 *            the analyticsScriptlet to set
	 */
	public final void setAnalyticsScriptlet(String analyticsScriptlet) {
		this.analyticsScriptlet = analyticsScriptlet;
	}

	/**
	 * @return the customMetadata
	 */
	public Map<String, String> getCustomMetadata() {
		return customMetadata;
	}

	/**
	 * @param customMetadata
	 *            the customMetadata to set
	 */
	public void setCustomMetadata(Map<String, String> customMetadata) {
		this.customMetadata = customMetadata;
	}

	/**
	 * Gets the alt language links.
	 *
	 * @return the alt language links
	 */
	public Map<String, String> getAltLanguageLinks() {
		return altLanguageLinks;
	}

	/**
	 * Sets the alt language links.
	 *
	 * @param altLanguageLinks
	 *            the alt language links
	 */
	public void setAltLanguageLinks(final Map<String, String> altLanguageLinks) {
		this.altLanguageLinks = altLanguageLinks;
	}

	/**
	 * @return the seoCanonicalUrl
	 */
	public String getSeoCanonicalUrl() {
		return seoCanonicalUrl;
	}

	/**
	 * @param seoCanonicalUrl
	 *            the seoCanonicalUrl to set
	 */
	public void setSeoCanonicalUrl(String seoCanonicalUrl) {
		this.seoCanonicalUrl = seoCanonicalUrl;
	}

	/**
	 * @return the seoDescription
	 */
	public String getSeoDescription() {
		return seoDescription;
	}

	/**
	 * @param seoDescription
	 *            the seoDescription to set
	 */
	public void setSeoDescription(String seoDescription) {
		this.seoDescription = seoDescription;
	}

	/**
	 * @return the breadCrumb
	 */
	public String getBreadCrumb() {
		return breadCrumb;
	}

	/**
	 * @param breadCrumb
	 *            the breadCrumb to set
	 */
	public void setBreadCrumb(String breadCrumb) {
		this.breadCrumb = breadCrumb;
	}

	/**
	 * @return the otherUDOTagsMap
	 */
	public JsonObject getOtherUDOTagsMap() {
		return otherUDOTagsMap;
	}

	/**
	 * @param otherUDOTagsMap
	 *            the otherUDOTagsMap to set
	 */
	public void setOtherUDOTagsMap(JsonObject otherUDOTagsMap) {
		this.otherUDOTagsMap = otherUDOTagsMap;
	}

	/**
	 * @return the udoTags
	 */
	public String getUdoTags() {
		return udoTags;
	}

	/**
	 * @param udoTags
	 *            the udoTags to set
	 */
	public void setUdoTags(String udoTags) {
		this.udoTags = udoTags;
	}

	/**
	 * Inits the model.
	 *
	 * @throws LoginException
	 *             the login exception
	 * @throws RepositoryException
	 *             the repository exception
	 */
	@PostConstruct
	private void init() throws LoginException, RepositoryException {
		try {
			final String pagePath = currentPage.getPath();
			final String domain = configService.getConfigValues("domain", pagePath);
			final String locale = configService.getConfigValues("pageLocale", pagePath);
			final String siteSuffix = configService.getConfigValues("siteSuffix", pagePath);
			final String pageLocale = configService.getConfigValues("pageLocale", pagePath);
			final String altLanguages = configService.getConfigValues("alternateLanguages", pagePath);
			final String udoTagsPath = configService.getConfigValues("udoTagsPath", pagePath);
			String pageLocaleDefault = currentPage.getLanguage().getLanguage();
			
			//Condition for CNW News details page starts
			logger.debug("isCNWNewsDetailPage: {}", isCNWNewsDetailPage);
			if( null != isCNWNewsDetailPage && "true".equals(isCNWNewsDetailPage) ) {
				logger.debug("Inside isCNWNewsDetailPage block");
				processDataForCNWNews(pageLocale);
			}
			//Condition for CNW News details page ends
			
			// SEO title - <title> tag
			seoPageTitle = null == pageTitle ? title + " | " + siteSuffix : pageTitle;
	
			// SEO description - <meta name="description"> tag
			seoDescription = description;
			// Social media description
			socialMediaDescripton = null == socialMediaDescripton ? configService.getConfigValues("pageDescription", pagePath) : socialMediaDescripton;
	
			// Social media image
			socialMediaImage = null == socialMediaImage ? configService.getConfigValues("socialMediaImage", pagePath) : socialMediaImage;
	
			// SEO canonical URL - <link rel="canonical"> tag
			seoCanonicalUrl = null == canonicalUrl ? pagePath : canonicalUrl;
	
			setAnalyticsScriptPath(configService.getConfigValues("analyticsScriptPath", pagePath));
			setAnalyticsScriptlet(configService.getConfigValues("analyticsTealiumScript", pagePath));
	
			// Fetching social sharing component meta-data
			customMetadata = new HashMap<>();
	
			// Configuring custom social sharing - meta-tags
			customMetadata.put(OG_TITLE, title);
			customMetadata.put(TWITTER_TITLE, title);
			customMetadata.put(OG_URL, pagePath);
			customMetadata.put(TWITTER_URL, pagePath);
			customMetadata.put(OG_DESCRIPTION, socialMediaDescripton);
			customMetadata.put(TWITTER_DESCRIPTION, socialMediaDescripton);
			customMetadata.put(OG_LOCALE, locale);
			if (socialMediaImage != null) {
				customMetadata.put(OG_IMAGE, domain + socialMediaImage);
				customMetadata.put(TWITTER_IMAGE, domain + socialMediaImage);
			}
			logger.debug("metadata :: {}", customMetadata);
			// Sets alternate URLs
			setAtlLanguages(altLanguages, pageLocale, pagePath);
			// Sets UDO parameters
			otherUDOTagsMap = new JsonObject();
			otherUDOTagsMap.addProperty("page_canonical_url", seoCanonicalUrl); // canonical url
			final String defaultReportingLanguage = configService.getConfigValues("defaultReportingLanguage", pagePath);
			if( null != defaultReportingLanguage && defaultReportingLanguage.length() > 0 && null != seoCanonicalUrl ) {
				otherUDOTagsMap.addProperty("page_canonical_url_default", seoCanonicalUrl.replace("/"+pageLocaleDefault+"/", "/"+defaultReportingLanguage+"/")); // canonical url - default
			} else {
				otherUDOTagsMap.addProperty("page_canonical_url_default", seoCanonicalUrl); // canonical url - default
			}
			otherUDOTagsMap.addProperty("page_language", pageLocaleDefault); // Page language
			setUDOParameters();
			// Sets UDO other parameters
			if (null != udoTagsPath && udoTagsPath.length() > 0) {
				setOtherUDOTags(udoTagsPath);
			}
			Gson gson = new GsonBuilder().setPrettyPrinting().disableHtmlEscaping().create();
			udoTags = gson.toJson(otherUDOTagsMap);
			logger.debug("Map Display {}", udoTags);
		} catch (Exception e) {
			logger.error("Error :: init method of BasePageModel :: {}", e);
		}
	}

	/**
	 * Sets the alternate languages.
	 *
	 * @param altLanguages
	 *            the alternate languages
	 * @param pageLocale
	 *            the page locale
	 * @param pagePath
	 *            the page path
	 * @param domain
	 *            the domain
	 */
	private void setAtlLanguages(final String altLanguages, final String pageLocale, final String pagePath) {
		logger.debug("{}", altLanguages);
		if (null == altLanguages) {
			return;
		}
		altLanguageLinks = new HashMap<>();
		final String[] altLanguagesArray = altLanguages.split(",");
		for (final String lan : altLanguagesArray) {
			logger.debug("{} {} ", lan, pagePath);
			final String[] langArray = lan.split("_");
			final String newUrl = pagePath.replace("/" + pageLocale.split("_")[0] + "/", "/" + langArray[0] + "/");
			logger.debug("New -- > {} {} ", langArray[0], newUrl);
			if (null != resolver.getResource(newUrl)) {
				logger.debug("value {}", newUrl);
				altLanguageLinks.put(lan, newUrl);
			}
		}
		if (!altLanguageLinks.isEmpty()) {
			altLanguageLinks.put(pageLocale, pagePath);
		}

		logger.debug("Map {}", altLanguageLinks);
	}

	/**
	 * Sets UDO tags
	 * 
	 * @throws LoginException
	 * @throws RepositoryException
	 */
	public void setUDOParameters() throws LoginException, RepositoryException {
		logger.debug("Entry :: setUDOParameters :: ");
		Page pageResource = null;
		String pagePath = currentPage.getPath();
		final String siteUrl = configService.getConfigValues("siteUrl", pagePath);
		final String defaultReportingLanguage = configService.getConfigValues("defaultReportingLanguage", pagePath);
		logger.debug("setUDOParameters :: siteUrl: {}, defaultReportingLanguage: {}", siteUrl, defaultReportingLanguage);
		if (null == siteUrl || siteUrl.length() <= 0) {
			return;
		}
		if (null != defaultReportingLanguage && defaultReportingLanguage.length() > 0) {
			String pageLocaleDefault = currentPage.getLanguage().getLanguage();
			pagePath = pagePath.replace("/"+pageLocaleDefault+"/", "/"+defaultReportingLanguage+"/");
		}
		
		logger.debug("pagePath is: {}", pagePath);
		Resource resource = resolver.getResource(pagePath);    
        if( null != resource ) {
        	pageResource = resource.adaptTo(Page.class);
        } else {
        	pageResource = currentPage;
        }
		
		int startLevel = siteUrl.replaceFirst("/", "").split("/").length - 1;
		int currentLevel = null != pageResource ? pageResource.getDepth() : 0;
		List<String> navList = new ArrayList<>();
		while (startLevel < currentLevel) {
			Page page = null != pageResource ? pageResource.getAbsoluteParent(startLevel) : null;
			if (page != null) {
				boolean isActivePage = page.equals(pageResource);
				navList.add(getBreadcrumbTitle(page));
				if (isActivePage)
					break;
			}
			startLevel++;
		}

		if (!navList.isEmpty()) {
			if (navList.size() > 1) {
				pageCategory = navList.get(1);
			}
			if (navList.size() > 2) {
				pageSubCategory = navList.get(2);
			}
			breadCrumb = "/" + navList.stream().collect(Collectors.joining("/"));
		}
		logger.debug("breadCrumb: {}, pageCategory: {}, pageSubCategory: {}", breadCrumb, pageCategory, pageSubCategory);
		otherUDOTagsMap.addProperty("page_breadcrumb", breadCrumb); // Bread crumb
		otherUDOTagsMap.addProperty("page_category", pageCategory == null ? "" : pageCategory); // Page category
		otherUDOTagsMap.addProperty("page_subcategory", pageSubCategory == null ? "" : pageSubCategory); // Page sub category
		logger.debug("Exit :: setUDOParameters :: otherUDOTagsMap: {}", otherUDOTagsMap);
	}

	/**
	 * Forms title to be displayed in bread crumb
	 * 
	 * @param page
	 * @return
	 */
	public String getBreadcrumbTitle(Page page) {
		String titleStr = page.getNavigationTitle();
		if (titleStr == null) {
			titleStr = page.getPageTitle();
		}
		if (titleStr == null) {
			titleStr = page.getTitle();
		}
		if (titleStr == null) {
			titleStr = page.getName();
		}
		return titleStr;
	}

	/**
	 * Sets UDO tags
	 * @throws Exception 
	 */
	public void setOtherUDOTags(String udoTagStart) throws Exception {
		logger.debug("Entry :: setOtherUDOTags method of :: udoTagStart :: {}", udoTagStart);
		String tagAbsolutePath = udoTagStart.replace("/content/cq:tags/", "");
		String tagRootPath = tagAbsolutePath.substring(tagAbsolutePath.indexOf("/"));
		if (null != tags && tags.length > 0) {
			logger.debug("tags :: {}", Arrays.asList(tags));
			for (int i = 0; i < tags.length; i++) {
				String[] array = tags[i].split(":");
				if (array[1].startsWith(tagRootPath.replaceFirst("/", ""))) {
					String path = array[1].replace(tagRootPath.substring(1) + "/", "");
					processUDOPath(path);
				}
			}
		}
		logger.debug("Exit :: setOtherUDOTags method of :: otherUDOTagsMap :: {}", otherUDOTagsMap);
	}

	public void processUDOPath(String path) throws Exception {
		logger.debug("Entry :: processUDOPath :: path :: {}", path);
		try {
			if( null == path || !path.contains("/")) {
				logger.debug("No child tag exists for path: {}", path);
				return;
			}
			String key = path.split("/")[0];
			String value = path.split("/")[1];
			if (otherUDOTagsMap.has(key)) {
				if (otherUDOTagsMap.get(key).isJsonArray()) {
					JsonArray jsonArray = otherUDOTagsMap.getAsJsonArray(key);
					jsonArray.add(value);
					otherUDOTagsMap.add(key, jsonArray);
				} else {
					String oldValue = otherUDOTagsMap.get(key).getAsString();
					JsonArray jsonArray = new JsonArray();
					jsonArray.add(oldValue);
					jsonArray.add(value);
					otherUDOTagsMap.add(key, jsonArray);
				}
			} else {
				otherUDOTagsMap.addProperty(key, value);
			}
		} catch (Exception e) {
			logger.error("Error :: processUDOPath :: ");
			throw e;
		}
		logger.debug("Exit :: processUDOPath :: otherUDOTagsMap :: {}", otherUDOTagsMap);
	}
	
	public void processDataForCNWNews(String pageLocale) {
		logger.debug("Entry :: processDataForCNWNews :: ");
		String releaseId = null;
		try {
			if( request.getRequestPathInfo().getSelectors().length > 0 ) {
				releaseId = request.getRequestPathInfo().getSelectors()[0];
				logger.debug("Selector fetched :: releaseId :: {}", releaseId);
				NewsDetails newsDetails = cnwNewsService.getCNWNewsDetails(releaseId, pageLocale.split("_")[0]);
				title =  newsDetails.getRelease().getHeadline();
				description = "";
				socialMediaDescripton = newsDetails.getRelease().getSummary().substring(0, Math.min(newsDetails.getRelease().getSummary().length(), 200));
				logger.debug("processDataForCNWNews :: Fetched items :: title: {}, description: {}, socialMediaDescripton: {}", title, description, socialMediaDescripton);
			}
		} catch (IOException | ParseException e) {
			logger.error("Error :: processDataForCNWNews :: {}", e);
		}
		logger.debug("Exit :: processDataForCNWNews :: ");
	}
}
