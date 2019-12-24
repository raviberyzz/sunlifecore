	package com.sunlife.core.models;

import java.util.List;

import javax.inject.Inject;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import com.sunlife.core.models.ListModel.Links;

/**
 * Sling model for Links - regional languages menu
 * @author MO92
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface HeaderModel {

	 @Inject
	  List<Links> getLinks(); // the name `getLinks` corresponds to the multifield name="./links"
	 
	 @Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
	  interface Links {
		  
	    @Inject
	    String getAltText();
	    
	    @Inject
	    String getLogoImage();
	    
	    @Inject
	    String getTarget();   
	    
	    @Inject
	    String getLinkUrl();
	   
	  }

}
