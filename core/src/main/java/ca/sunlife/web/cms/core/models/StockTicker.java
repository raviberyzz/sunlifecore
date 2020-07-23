package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;


/**
 * The Class StockTicker.
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = SlingHttpServletRequest.class, adapters = StockTicker.class, resourceType = "sunlife/core/components/content/stock-ticker", defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class StockTicker {
	  
	  /** The title. */
  	@ Inject
  	@ Via ("resource")
	  private String title;
	  
	  /** The view all. */
  	@ Inject
  	@ Via ("resource")
	  private String viewAll;
  	
  	/** The disclaimer. */
	@ Inject
   	@ Via ("resource")
 	  private String disclaimer;
 	  
	  /** The delay text. */
	@ Inject
  	@ Via ("resource")
	  private String delayText;
  	
	  /** The disclaimer text. */
	@ Inject
  	@ Via ("resource")
	  private String disclaimerText;
	  
	  /** The disclaimer. */
  	@ Inject
  	@ Via ("resource")
	  private String disclaimerLink;

	/**
	 * Gets the title.
	 *
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/** The position. */
	@ Inject
  	@ Via ("resource")
	  private String position;
	/**
	 * Sets the title.
	 *
	 * @param title the new title
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * Gets the view all.
	 *
	 * @return the view all
	 */
	public String getViewAll() {
		return viewAll;
	}

	/**
	 * Sets the view all.
	 *
	 * @param viewAll the new view all
	 */
	public void setViewAll(String viewAll) {
		this.viewAll = viewAll;
	}


	/**
	 * Gets the position.
	 *
	 * @return the position
	 */
	public String getPosition() {
		return position;
	}

	/**
	 * Sets the position.
	 *
	 * @param position the new position
	 */
	public void setPosition(String position) {
		this.position = position;
	}

	/**
	 * Gets the disclaimer.
	 *
	 * @return the disclaimer
	 */
	public String getDisclaimer() {
		return disclaimer;
	}

	/**
	 * Sets the disclaimer.
	 *
	 * @param disclaimer the new disclaimer
	 */
	public void setDisclaimer(String disclaimer) {
		this.disclaimer = disclaimer;
	}

	/**
	 * Gets the delay text.
	 *
	 * @return the delay text
	 */
	public String getDelayText() {
		return delayText;
	}

	/**
	 * Sets the delay text.
	 *
	 * @param delayText the new delay text
	 */
	public void setDelayText(String delayText) {
		this.delayText = delayText;
	}

	/**
	 * Gets the disclaimer text.
	 *
	 * @return the disclaimer text
	 */
	public String getDisclaimerText() {
		return disclaimerText;
	}

	/**
	 * Sets the disclaimer text.
	 *
	 * @param disclaimerText the new disclaimer text
	 */
	public void setDisclaimerText(String disclaimerText) {
		this.disclaimerText = disclaimerText;
	}

	/**
	 * Gets the disclaimer link.
	 *
	 * @return the disclaimer link
	 */
	public String getDisclaimerLink() {
		return disclaimerLink;
	}

	/**
	 * Sets the disclaimer link.
	 *
	 * @param disclaimerLink the new disclaimer link
	 */
	public void setDisclaimerLink(String disclaimerLink) {
		this.disclaimerLink = disclaimerLink;
	}

	
	  
	  
}
