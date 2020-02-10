/**
 * 
 */
package ca.sunlife.web.cms.core.models;

import java.io.IOException;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.beans.ReleaseMain;
import ca.sunlife.web.cms.core.services.CNWNewsService;

/**
 * @author mo92 The Class CNWNewsOverviewModel.
 * 
 */
@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CNWNewsOverviewModel {

	/** logger */
	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Inject
	private Page currentPage;

	@Inject
	private CNWNewsService newsService;

	/** locale */
	private String locale;

	/** Release News Object */
	private ReleaseMain releaseMain;

	@Inject
	@Via("resource")
	private String newsArticleUrl;
	/**
	 * @return the locale
	 */
	public String getLocale() {
		return locale;
	}

	/**
	 * @param locale
	 *            the locale to set
	 */
	public void setLocale(String locale) {
		this.locale = locale;
	}

	/**
	 * @return the releaseMain
	 */
	public ReleaseMain getReleaseMain() {
		return releaseMain;
	}

	/**
	 * @param releaseMain
	 *            the releaseMain to set
	 */
	public void setReleaseMain(ReleaseMain releaseMain) {
		this.releaseMain = releaseMain;
	}

	/**
	 * @return the newsArticleUrl
	 */
	public String getNewsArticleUrl() {
		return newsArticleUrl;
	}

	/**
	 * @param newsArticleUrl the newsArticleUrl to set
	 */
	public void setNewsArticleUrl(String newsArticleUrl) {
		this.newsArticleUrl = newsArticleUrl;
	}

	@PostConstruct
	public void init() throws IOException {
		logger.debug("Entry :: CNWNewsDetailsModel :: init ");
		locale = currentPage.getLanguage().getLanguage();
		releaseMain = newsService.getCNWNewsOverview(locale);
		logger.debug("Fetched news :: {}", releaseMain);
	}
}
