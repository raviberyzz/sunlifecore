package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.resource.ResourceResolver;
import com.adobe.cq.wcm.core.components.models.Accordion;



/**
 * @author Uma Maheshwaran
 *
 */
public interface CustomAccordion extends Accordion {

	/**
	 * Gets the Article Image
	 *
	 * @return the article image
	 */
	public ResourceResolver getResolver();

	/**
	 * Gets the Layout resource Type
	 *
	 * @return the layout resource type
	 */
	public String getHeadingElement();

	/**
	 * Gets the Og Image
	 * 
	 * @return the og image
	 */

	public String getDataTitle();

	/**
	 * Gets the Description
	 * 
	 * @return the description
	 */

	public String getSingleExpansion();

	/**
	 * Gets the Page Modified Date
	 * 
	 * @return the page modified date
	 */
	public String[] getExpandedItems();

	
	/**
	 * Gets the Social Share
	 * 
	 * @return the social share
	 */
	public String getAccessibilityLabel();

	/**
	 * Gets the Get Spacing value
	 * 
	 * @return the spacing value
	 */
	public String getSpacing();

}