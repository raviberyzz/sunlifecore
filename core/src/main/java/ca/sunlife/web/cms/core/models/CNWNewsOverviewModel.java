/**
 * 
 */
package ca.sunlife.web.cms.core.models;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;
import com.fasterxml.jackson.databind.ObjectMapper;

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

	@PostConstruct
	public void init() throws IOException {
		logger.debug("Entry :: CNWNewsDetailsModel :: init ");
		String datePattern = "MMMM dd, yyyy";
		String cnwDatePattern = "EEE, dd MMM yyyy HH:mm:ss zzzzz";
			locale = currentPage.getLanguage().getLanguage();
			releaseMain = new ObjectMapper().readValue(newsService.getCNWNewsOverview(), ReleaseMain.class);
			logger.debug("locale: {}, {}", locale, releaseMain);
			releaseMain.getReleases().getRelease().stream().forEach(o -> {
				SimpleDateFormat inputFormatter = new SimpleDateFormat(cnwDatePattern);
				Date date;
				try {
					date = inputFormatter.parse(o.getReleaseDate());
					o.setReleaseDate(new SimpleDateFormat(datePattern, new Locale(locale)).format(date));
				} catch (ParseException e) {
					logger.error("Error :: parsing the release date {}", e);
				}
			});
		
		logger.debug("Fetched news :: {}", releaseMain);
	}
}
