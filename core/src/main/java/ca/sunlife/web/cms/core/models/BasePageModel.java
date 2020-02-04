/**
 *
 */
package ca.sunlife.web.cms.core.models;

import java.util.ArrayList;
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
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Source;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.wcm.core.components.internal.models.v1.SocialMediaHelperImpl;
import com.day.cq.commons.Externalizer;
import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * Sling model for Base Page details.
 *
 * @author MO92
 */
@Model(adaptables = { SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "sunlife/core/components/structure/base-page")
public class BasePageModel extends SocialMediaHelperImpl {

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
	private static final Logger LOGGER = LoggerFactory.getLogger(BasePageModel.class);

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
	private String socialMediaDescription;

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
	
	/** The config service. */
	@Inject
	private SiteConfigService configService;

	/** The meta data. */
	private Map<String, String> customMetadata;

	/** The alt language links. */
	private Map<String, String> altLanguageLinks;

	@OSGiService
	private Externalizer externalizer;
	
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
	 * @param breadCrumb the breadCrumb to set
	 */
	public void setBreadCrumb(String breadCrumb) {
		this.breadCrumb = breadCrumb;
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
		final String pagePath = currentPage.getPath();
		final String domain = configService.getConfigValues("domain", pagePath);
		final String locale = configService.getConfigValues("pageLocale", pagePath);
		final String siteSuffix = configService.getConfigValues("siteSuffix", pagePath);
		final String pageLocale = configService.getConfigValues("pageLocale", pagePath);
		final String altLanguages = configService.getConfigValues("alternateLanguages", pagePath);

		// SEO title - <title> tag
		seoPageTitle = null == pageTitle ? title + " | " + siteSuffix : pageTitle;

		// SEO description - <meta name="description"> tag
		seoDescription = description;

		//Social media description
		socialMediaDescription = null == socialMediaDescription ? configService.getConfigValues("pageDescription", pagePath) : socialMediaDescription;
		
		//Social media image
		socialMediaImage = null == socialMediaImage ? configService.getConfigValues("socialMediaImage", pagePath) : socialMediaImage;
		
		// SEO canonical URL - <link rel="canonical"> tag
		seoCanonicalUrl = null == canonicalUrl ? getURL() : canonicalUrl;

		setAnalyticsScriptPath(configService.getConfigValues("analyticsScriptPath", pagePath));
		setAnalyticsScriptlet(configService.getConfigValues("analyticsTealiumScript", pagePath));

		// Fetching social sharing component meta-data
		customMetadata = super.getMetadata();

		// Configuring custom social sharing - meta-tags
		if (super.isSocialMediaEnabled()) {
			customMetadata.put(TWITTER_TITLE, customMetadata.get(OG_TITLE));
			customMetadata.put(TWITTER_URL, customMetadata.get(OG_URL));
			customMetadata.put(OG_DESCRIPTION, socialMediaDescription);
			customMetadata.put(TWITTER_DESCRIPTION, socialMediaDescription);
			customMetadata.put(OG_LOCALE, locale);
			customMetadata.put(OG_IMAGE, externalizer.publishLink(resolver, socialMediaImage));
			customMetadata.put(TWITTER_IMAGE, externalizer.publishLink(resolver, socialMediaImage));
		}
		LOGGER.debug("metadata {}", customMetadata);

		// Sets alternate URLs
		setAtlLanguages(altLanguages, pageLocale, pagePath, domain);
		setUDOParameters();
		LOGGER.debug("Map Display {}", altLanguageLinks);
	}

	/**
	 * Gets the url.
	 *
	 * @param domain
	 *            the domain
	 * @return the url
	 */
	private String getURL() {
		LOGGER.info("request --> {} , {}", request.getRequestURI(), request.getRequestURL());
		return externalizer.publishLink(resolver, request.getRequestURI());
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
	private void setAtlLanguages(final String altLanguages, final String pageLocale, final String pagePath, final String domain) {
		LOGGER.debug("{}", altLanguages);
		if (null == altLanguages) {
			return;
		}
		altLanguageLinks = new HashMap<>();

		final String[] altLanguagesArray = altLanguages.split(",");
		for (final String lan : altLanguagesArray) {
			LOGGER.debug("{} {} ", lan, pagePath);
			final String[] langArray = lan.split("_");
			final String newUrl = pagePath.replace("/" + pageLocale.split("_")[0] + "/", "/" + langArray[0] + "/");
			LOGGER.debug("New -- > {} {} ", langArray[0], newUrl);
			if (null != resolver.getResource(newUrl)) {
				final String value = getURL().replace("/" + pageLocale.split("_")[0] + "/", "/" + langArray[0] + "/");
				LOGGER.debug("value {}", value);
				altLanguageLinks.put(lan, value);
			}
		}
		if (!altLanguageLinks.isEmpty()) {
			altLanguageLinks.put(pageLocale, getURL());
		}

		LOGGER.debug("Map {}", altLanguageLinks);
	}
	
	/**
	 * Sets UDO tags
	 * @throws LoginException
	 * @throws RepositoryException
	 */
	public void setUDOParameters() throws LoginException, RepositoryException {
		String pagePath = currentPage.getPath();
		final String siteUrl = configService.getConfigValues("siteUrl", pagePath);
		if( null == siteUrl ) {
			return;
		}
		int startLevel = siteUrl.replaceFirst("/", "").split("/").length - 1;
		int currentLevel = currentPage.getDepth();
		List<String> navList = new ArrayList<>();
		while (startLevel < currentLevel) {
			Page page = currentPage.getAbsoluteParent(startLevel);
			if (page != null) {
				boolean isActivePage = page.equals(currentPage);
				navList.add(getBreadcrumbTitle(page));
				if (isActivePage)
					break;
				startLevel++;
			}
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
	}
	
	
	/**
	 * Forms title to be displayed in bread crumb
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
}
