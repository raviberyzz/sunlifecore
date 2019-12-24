package com.sunlife.core.models;

import java.util.List;
import javax.inject.Inject;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import com.sunlife.core.models.ListModel.Links;

@Model(
    adaptables = {Resource.class},
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface UtilityNav {

	 @Inject
	  List<Navlinks> getNavlinks(); // the name `getNavlinks` corresponds to the multifield name="./navlinks"
	 
	 @Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
	  interface Navlinks {
		  
	    	    
	    @Inject
	    String getLinkName();
	    
	    @Inject
	    String getTarget();   
	    
	    @Inject
	    String getLinkUrl();
	   
	  }

}
