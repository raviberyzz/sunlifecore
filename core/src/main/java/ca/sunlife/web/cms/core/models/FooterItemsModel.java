/**
 * 
 */
package ca.sunlife.web.cms.core.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author mo92 The class
 *         FooterItemsModel.
 */
@ Model(adaptables = { SlingHttpServletRequest.class,
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FooterItemsModel {

	/** The log. */
	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	/** The label. */
	@ Inject
	private String label;

	/** The url. */
	@ Inject
	private String url;

	/** The target. */
	@ Inject
	private String target;

	/** The checkboxSeparator. */
	@ Inject
	private String checkboxSeparator;

	/** The checkboxHide. */
	@ Inject
	private String checkboxHide;

	/** The contentUrl. */
	private boolean contentUrl;
	
	/**
	 * @return the label
	 */
	public String getLabel() {
		return label;
	}

	/**
	 * @param label
	 *          the label to set
	 */
	public void setLabel(String label) {
		this.label = label;
	}

	/**
	 * @return the url
	 */
	public String getUrl() {
		return url;
	}

	/**
	 * @param url
	 *          the url to set
	 */
	public void setUrl(String url) {
		this.url = url;
	}

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
	 * @return the
	 *         checkboxSeparator
	 */
	public String getCheckboxSeparator() {
		return checkboxSeparator;
	}

	/**
	 * @param checkboxSeparator
	 *          the
	 *          checkboxSeparator
	 *          to set
	 */
	public void setCheckboxSeparator(String checkboxSeparator) {
		this.checkboxSeparator = checkboxSeparator;
	}

	/**
	 * @return the checkboxHide
	 */
	public String getCheckboxHide() {
		return checkboxHide;
	}

	/**
	 * @param checkboxHide
	 *          the checkboxHide
	 *          to set
	 */
	public void setCheckboxHide(String checkboxHide) {
		this.checkboxHide = checkboxHide;
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
	 * Inits FooterItemsImpl
	 * model.
	 */
	@PostConstruct
	public void init() {
		logger.debug("Entry :: init method of FooterItemsImpl :: label {}", label);
		if( null != url && url.length() > 0 ) {
			contentUrl = url.startsWith("/");
		}
		logger.debug("Exit :: init method of FooterItemsImpl :: contentUrl :: {}", contentUrl);
	}
}
