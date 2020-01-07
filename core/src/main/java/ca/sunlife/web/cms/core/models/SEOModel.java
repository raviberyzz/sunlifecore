/**
 *
 */
package ca.sunlife.web.cms.core.models;

import java.util.HashMap;
import java.util.Map;

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
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * Sling model for SEO details.
 *
 * @author MO92
 */
@Model(adaptables = {
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "sunlife/core/components/structure/base-page")
public class SEOModel {

	/** The Constant OG_URL. */
	static final String OG_URL = "og:url";
	
	/** The Constant OG_TITLE. */
	static final String OG_TITLE = "og:title";
	
	/** The Constant OG_LOCALE. */
	static final String OG_LOCALE = "og:locale";
	
	/** The Constant OG_DESCRIPTION. */
	static final String OG_DESCRIPTION = "og:description";

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(SEOModel.class);

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

	/** The seo page title. */
	@Inject
	@Via("resource")
	private String seoPageTitle;

	/** The seo alt urls. */
	@Inject
	@Via("resource")
	private String seoAltUrls;

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

	/** The config service. */
	@Inject
	private SiteConfigService configService;

	/** The meta data. */
	private Map<String, String> metaData;

	/** The alt language links. */
	private Map<String, String> altLanguageLinks;

	/**
	 * Gets the meta data.
	 *
	 * @return the meta data
	 */
	public Map<String, String> getMetaData() {
		return metaData;
	}

	/**
	 * Sets the meta data.
	 *
	 * @param metadata the metadata
	 */
	public void setMetaData(final Map<String, String> metadata) {
		this.metaData = metadata;
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
	 * @param altLanguageLinks the alt language links
	 */
	public void setAltLanguageLinks(final Map<String, String> altLanguageLinks) {
		this.altLanguageLinks = altLanguageLinks;
	}

	/**
	 * Inits the model.
	 *
	 * @throws LoginException the login exception
	 * @throws RepositoryException the repository exception
	 */
	@PostConstruct
	private void initModel() throws LoginException, RepositoryException {
		final String pagePath = currentPage.getPath();
		final String domain = configService.getConfigValues("domain", pagePath);
		final String ogUrl = null == canonicalUrl ? getURL(domain) : canonicalUrl;
		final String ogDescription = null == description ? configService.getConfigValues("pageDescription", pagePath)
				: description;
		final String locale = configService.getConfigValues("pageLocale", pagePath);
		final String siteSuffix = configService.getConfigValues("siteSuffix", pagePath);
		final String pageLocale = configService.getConfigValues("pageLocale", pagePath);
		final String altLanguages = configService.getConfigValues("alternateLanguages", pagePath);
		final String ogTitle = null == seoPageTitle ? title + " | " + siteSuffix : seoPageTitle;

		metaData = new HashMap<>();
		metaData.put(OG_URL, ogUrl);
		metaData.put(OG_DESCRIPTION, ogDescription);
		metaData.put(OG_LOCALE, locale);
		metaData.put(OG_TITLE, ogTitle);
		LOGGER.debug("metadata {}", metaData);

		if (null == seoAltUrls) {
			setAtlLanguages(altLanguages, pageLocale, pagePath, domain);
		} else {
			final String[] altLangArray = seoAltUrls.split(",");
			for (final String strLang : altLangArray) {
				final String[] strLangArray = strLang.split("~");
				altLanguageLinks.put(strLangArray[0], strLangArray[1]);
			}
		}
		LOGGER.debug("Map Display {}", altLanguageLinks);
	}

	/**
	 * Gets the url.
	 *
	 * @param domain the domain
	 * @return the url
	 */
	private String getURL(final String domain) {
		LOGGER.info("request --> {} , {}", request.getRequestURI(), request.getRequestURL());
		return domain + request.getRequestURI();
	}

	/**
	 * Sets the atl languages.
	 *
	 * @param altLanguages the alt languages
	 * @param pageLocale the page locale
	 * @param pagePath the page path
	 * @param domain the domain
	 */
	private void setAtlLanguages(final String altLanguages, final String pageLocale, final String pagePath,
			final String domain) {
		LOGGER.debug("{}", altLanguages);
		if (null == altLanguages) {
			return;
		}
		altLanguageLinks = new HashMap<>();

		final String[] altLanguagesArray = altLanguages.split(",");
		for (final String lan : altLanguagesArray) {
			LOGGER.debug("{} {} ", lan, pagePath);
			final String[] langArray = lan.split("~");
			final String newUrl = pagePath.replace("/" + pageLocale.split("_")[0] + "/", "/" + langArray[0] + "/");
			LOGGER.debug("New -- > {} {} ", langArray[0], newUrl);
			if (null != resolver.getResource(newUrl)) {
				final String value = getURL(domain).replace("/" + pageLocale.split("_")[0] + "/",
						"/" + langArray[0] + "/");
				LOGGER.debug("value {}", value);
				altLanguageLinks.put(langArray[0], value);
			}
		}
		LOGGER.debug("Map {}", altLanguageLinks);
	}
}
