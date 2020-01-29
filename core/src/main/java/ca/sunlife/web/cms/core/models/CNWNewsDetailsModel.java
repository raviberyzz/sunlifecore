package ca.sunlife.web.cms.core.models;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Locale;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;
import com.fasterxml.jackson.databind.ObjectMapper;

import ca.sunlife.web.cms.core.beans.NewsDetails;
import ca.sunlife.web.cms.core.services.CNWNewsService;

/**
 * The Class CNWNewsDetailsModel.
 */
@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CNWNewsDetailsModel {

	@Self
	private SlingHttpServletRequest request;

	@Inject
	private Page currentPage;

	@Inject
	private CNWNewsService newsService;

	/** logger */
	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	/** news details */
	private NewsDetails newsDetails;

	/** news - release id */
	private String newsCNWIDFromReq;

	/** locale */
	private String locale;

	/** Getters/Setters */
	/**
	 * @return the newsDetails
	 */
	public NewsDetails getNewsDetails() {
		return newsDetails;
	}

	/**
	 * @param newsDetails
	 *            the newsDetails to set
	 */
	public void setNewsDetails(NewsDetails newsDetails) {
		this.newsDetails = newsDetails;
	}

	/**
	 * @return the newsCNWIDFromReq
	 */
	public String getNewsCNWIDFromReq() {
		return newsCNWIDFromReq;
	}

	/**
	 * @param newsCNWIDFromReq
	 *            the newsCNWIDFromReq to set
	 */
	public void setNewsCNWIDFromReq(String newsCNWIDFromReq) {
		this.newsCNWIDFromReq = newsCNWIDFromReq;
	}

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
	 * CNWNewsDetailsModel - init method for processing the data
	 */
	@PostConstruct
	public void init() {
		logger.debug("Entry :: CNWNewsDetailsModel :: init ");
		String datePattern = "MMMM dd, yyyy";
		String cnwDatePattern = "EEE, dd MMM yyyy HH:mm:ss zzzzz";
		try {
			newsCNWIDFromReq = request.getParameter("id");
			locale = currentPage.getLanguage().getLanguage();
			StringBuilder importUrl = new StringBuilder();
			String cnwRequestGetURI = newsService.getCNWNewsDetailsUrl();

			importUrl.append(cnwRequestGetURI);
			importUrl.append(newsCNWIDFromReq);
			newsDetails = new ObjectMapper().readValue(newsService.getCNWNewsDetails(importUrl.toString()), NewsDetails.class);

			SimpleDateFormat inputFormatter = new SimpleDateFormat(cnwDatePattern);
			newsDetails.getRelease().setReleaseDate(new SimpleDateFormat(datePattern, new Locale(locale))
					.format(inputFormatter.parse(newsDetails.getRelease().getReleaseDate())));
		} catch (IOException e) {
			logger.error("Error :: NWNewsDetailsModel :: init :: IOException :: {}", e);
		} catch (ParseException e) {
			logger.error("Error :: CNWNewsDetailsModel :: init :: ParseException :: {}", e);
		} catch (Exception e) {
			logger.error("Error :: CNWNewsDetailsModel :: init :: Exception :: {}", e);
		}
	}

}
