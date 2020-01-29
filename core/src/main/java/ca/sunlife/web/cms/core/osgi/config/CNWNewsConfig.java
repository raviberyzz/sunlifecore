/**
 * 
 */
package ca.sunlife.web.cms.core.osgi.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

/**
 * @author mo92
 * The Interface CNWNewsConfig.
 */
@ObjectClassDefinition(name = "CNW News Configuration", description = "CNW News Configuration")
public @interface CNWNewsConfig {
	/**
	 * Web service url for CNW News list - News Overview
	 * 
	 * @return
	 */
	@AttributeDefinition(name = "newsCNWOverview", description = "CNW News Overview - List", defaultValue = "http://internal-www.sunlife.ca/slfServiceApp/invokeService.wca?service=cnw&method=list&safehtml=1&category=773&format=json&limit=3")
	String getCNWNewsOverview();
	/**
	 * Web service url for CNW News list
	 * 
	 * @return
	 */
	@AttributeDefinition(name = "listCNWNews", description = "CNW News List", defaultValue = "http://internal-www.sunlife.ca/slfServiceApp/invokeService.wca?service=cnw&method=list&safehtml=1&format=json&fields=releaseDate,headline,subheadline,summary")
	String getCNWNewsList();
	
	/**
	 * Web service url for CNW News Details
	 * 
	 * @return
	 */
	@AttributeDefinition(name = "newsCNWDetails", description = "CNW News Details", defaultValue = "http://internal-www.sunlife.ca/slfServiceApp/invokeService.wca?service=cnw&method=get&safehtml=1&format=json&id=")
	String getCNWNewsDetails();
}
