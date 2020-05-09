package ca.sunlife.web.cms.core.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ Model(adaptables = { SlingHttpServletRequest.class,
	    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class LifeMomentsItemsModel {
	
	/** The log. */
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	/** The label. */
	@ Inject
	private String linkName;
	
	/** The label. */
	@ Inject
	public String linkUrl;
	
	/** The label. */
	@ Inject
	private String target;
	
	/** The contentUrl. */
	private boolean contentUrl;
	
	
	/**
	 * @return the linkname
	 */
	public String getLinkName() {
		return linkName;
	}

	/**
	 * @param linkname
	 *          the linkname to set
	 */
	public void setLinkName(String linkName) {
		this.linkName = linkName;
	}
	
//	/**
//	 * @return the linkUrl
//	 */
//	public String getLinkUrl() {
//		return linkUrl;
//	}
//
//	/**
//	 * @param linkurl
//	 *          the linkurl to set
//	 */
//	public void setLinkUrl(String linkUrl) {
//		this.linkUrl = linkUrl;
//	}
	
	/**
	 * @return the target
	 */
	public String getTarget() {
		return target;
	}

	/**
	 * @param target
	 *          the target to set
	 */
	public void setTarget(String target) {
		this.target = target;
	}
	
	/**
	 * @return the contentUrl
	 */
	public boolean isContentUrl() {
		return contentUrl;
	}

	/**
	 * @param contentUrl the contentUrl to set
	 */
	public void setContentUrl(boolean contentUrl) {
		this.contentUrl = contentUrl;
	}
	
	/**
	 * Inits LifeMomentsItemsImpl
	 * model.
	 */
	@PostConstruct
	public void init() {
		logger.debug("Entry :: init method of LifeMomentsItemsImpl :: label {}", linkName);
		if( null != linkUrl && linkUrl.length() > 0 ) {
			contentUrl = linkUrl.startsWith("/");
		}
		logger.debug("Exit :: init method of LifeMomentsItemsImpl :: contentUrl :: {}", contentUrl);
	}
	
	

}
