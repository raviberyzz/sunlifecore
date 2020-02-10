package ca.sunlife.web.cms.core.models;

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

import ca.sunlife.web.cms.core.beans.NewsDetails;
import ca.sunlife.web.cms.core.services.CNWNewsService;

/**
 * The Class CNWNewsDetailsModel.
 */
@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CNWNewsDetailsModel {

	/** logger */
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Self
	private SlingHttpServletRequest request;

	@Inject
	private Page currentPage;
	
	@Inject
	private CNWNewsService newsService;

	/** news details */
	private NewsDetails newsDetails;

	/** news - release id */
	private String releaseId;

	/** Getters/Setters */
	/**
	 * CNWNewsDetailsModel - init method for processing the data
	 */
	@PostConstruct
	public void init() {
		logger.debug("Entry :: CNWNewsDetailsModel :: init ");
		try {
			releaseId = request.getRequestPathInfo().getSelectors()[0];
			newsDetails = newsService.getCNWNewsDetails(releaseId, currentPage.getLanguage().getLanguage());
		} catch (Exception e) {
			logger.error("Error :: CNWNewsDetailsModel :: init :: Exception :: {}", e);
		}
	}

	/**
	 * @return the newsDetails
	 */
	public NewsDetails getNewsDetails() {
		return newsDetails;
	}

	/**
	 * @param newsDetails the newsDetails to set
	 */
	public void setNewsDetails(NewsDetails newsDetails) {
		this.newsDetails = newsDetails;
	}

	/**
	 * @return the releaseId
	 */
	public String getReleaseId() {
		return releaseId;
	}

	/**
	 * @param releaseId the releaseId to set
	 */
	public void setReleaseId(String releaseId) {
		this.releaseId = releaseId;
	}

}
