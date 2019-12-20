/**
 * 
 */
package com.sunlife.core.models;

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
import com.sunlife.core.services.SiteConfigService;

/**
 * Sling model for SEO details
 * 
 * @author MO92
 */
@Model(adaptables = {
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "sunlife/core/components/structure/base-page")
public class SEOModel {

	static final String OG_URL = "og:url";
	static final String OG_TITLE = "og:title";
	static final String OG_LOCALE = "og:locale";
	static final String OG_DESCRIPTION = "og:description";
	//static final String KEYWORDS = "keywords";
	//static final String LOCALE_APPEND = "keywords";

	private static final Logger LOGGER = LoggerFactory.getLogger(SEOModel.class);

	@ScriptVariable
	private Page currentPage;

	@Self
	private SlingHttpServletRequest request;

	@Inject
	@Source("sling-object")
	private ResourceResolver resolver;

	@Inject
	@Via("resource")
	private String canonicalUrl;

	@Inject
	@Via("resource")
	private String pageDescription;

	@Inject
	@Via("resource")
	private String seoPageTitle;

	@Inject
	@Via("resource")
	private String seoAltUrls;
	
	@Inject
	@Named("jcr:description")
	@Via("resource")
	private String description;

	@Inject
	@Named("jcr:language")
	@Via("resource")
	private String language;

	@Inject
	@Named("jcr:title")
	@Via("resource")
	private String title;

	@Inject
	private SiteConfigService configService;

	private Map<String, String> metaData;

	private Map<String, String> altLanguageLinks;

	public Map<String, String> getMetaData() {
		return metaData;
	}

	public void setMetaData(Map<String, String> metadata) {
		this.metaData = metadata;
	}

	public Map<String, String> getAltLanguageLinks() {
		return altLanguageLinks;
	}

	public void setAltLanguageLinks(Map<String, String> altLanguageLinks) {
		this.altLanguageLinks = altLanguageLinks;
	}

	@PostConstruct
	private void initModel() throws LoginException, RepositoryException {
		try {
			String pagePath = currentPage.getPath();
			String domain = configService.getConfigValues("domain", pagePath);
			String ogUrl = null == canonicalUrl ? getURL(domain) : canonicalUrl;
			String ogDescription = null == description ? configService.getConfigValues("pageDescription", pagePath)
					: description;
			String locale = configService.getConfigValues("pageLocale", pagePath);
			String siteSuffix = configService.getConfigValues("siteSuffix", pagePath);
			String pageLocale = configService.getConfigValues("pageLocale", pagePath);
			String altLanguages = configService.getConfigValues("alternateLanguages", pagePath);
			String ogTitle = null == seoPageTitle ? title + " | " + siteSuffix : seoPageTitle;
			
			metaData = new HashMap<>();
			metaData.put(OG_URL, ogUrl);
			metaData.put(OG_DESCRIPTION, ogDescription);
			metaData.put(OG_LOCALE, locale);
			metaData.put(OG_TITLE, ogTitle);
			LOGGER.debug("metadata {}", metaData);

			if( null == seoAltUrls )
				setAtlLanguages(altLanguages, pageLocale, pagePath, domain);
			else {
				String[] altLangArray = seoAltUrls.split(",");
				for(String strLang : altLangArray) {
					String[] strLangArray = strLang.split("~");
					altLanguageLinks.put(strLangArray[0], strLangArray[1]);
				}
			}
			LOGGER.debug("Map Display {}", altLanguageLinks);
		} catch (Exception e) {
			LOGGER.error("Error :: initModel method of SEOModel {}", e);
		}
	}

	private String getURL(String domain) {
		LOGGER.info("request --> {} , {}", request.getRequestURI(), request.getRequestURL());
		return domain + request.getRequestURI();
	}

	private void setAtlLanguages(String altLanguages, String pageLocale, String pagePath, String domain) {
		LOGGER.debug("{}", altLanguages);
		if (null == altLanguages)
			return;
		altLanguageLinks = new HashMap<>();

		String[] altLanguagesArray = altLanguages.split(",");
		for (String lan : altLanguagesArray) {
			LOGGER.debug("{} {} ", lan, pagePath);
			String[] langArray = lan.split("~");
			String newUrl = pagePath.replace("/" + pageLocale.split("_")[0] + "/", "/" + langArray[0] + "/");
			LOGGER.debug("New -- > {} {} ", langArray[0], newUrl);
			if (null != resolver.getResource(newUrl)) {
				String value = getURL(domain).replace("/" + pageLocale.split("_")[0] + "/", "/" + langArray[0] + "/");
				LOGGER.debug("value {}", value);
				altLanguageLinks.put(langArray[0], value);
			}
		}
		LOGGER.debug("Map {}", altLanguageLinks);
	}
}
