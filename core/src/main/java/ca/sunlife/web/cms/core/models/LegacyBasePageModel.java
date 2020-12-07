/**
 *
 */
package ca.sunlife.web.cms.core.models;

import javax.annotation.PostConstruct;
import javax.jcr.RepositoryException;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.day.cq.wcm.api.WCMMode;
import com.day.cq.wcm.api.components.ComponentContext;


/**
 * The Class BasePageModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = {
    SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "sunlife/legacy/components/structure/base-page")
public class LegacyBasePageModel {

	 /** The Constant LOG. */
	  private static final Logger LOG = LoggerFactory.getLogger(LegacyBasePageModel.class);
	  
	 /** The request. */
	  @ Self
	  private SlingHttpServletRequest request;

	/**
	 * Inits the.
	 *
	 * @throws LoginException
	 *           the login exception
	 * @throws RepositoryException
	 *           the repository exception
	 */
  @ PostConstruct
  public void init() throws LoginException, RepositoryException {
    
    if ((WCMMode.fromRequest(request).equals(WCMMode.EDIT)) || (WCMMode.fromRequest(request).equals(WCMMode.DESIGN))) {  
    	LOG.debug("Mode is Edit!!!"); 
    }else {
    	LOG.debug("Mode is not Edit or Design");    	   	   
    	request.setAttribute(ComponentContext.BYPASS_COMPONENT_HANDLING_ON_INCLUDE_ATTRIBUTE, false); 
    }
  
  }

}
