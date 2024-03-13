package ca.sunlife.web.cms.core.models.v1;

import com.adobe.cq.wcm.core.components.models.Breadcrumb;

/**
 * The Breadcrumb is a Interface associated with Breadcrumb component.
 *
 * @author Sunlife
 */

public interface CustomBreadcrumb extends Breadcrumb {

	/**
	 * Gets the Accordion Start Level
	 *
	 * @return the accordion start level
	 */
	String getStartLevel();

	/**
	 * Gets the Accordion Lang Code
	 *
	 * @return the accordion lang code
	 */
	String getLangcode();

	/**
	 * Gets the Accordion Spacing
	 *
	 * @return the accordion spacing
	 */
	String getSpacing();

}
