package com.sunlife.core.models;

import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Model(
adaptables = {Resource.class},
defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface IconTextModel {
	
	@Inject
	  List<IconsText> getIconsText();
	  
	 @Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
	  interface IconsText {
		 
	@Inject
    String getIcon();
     
     @Inject
     String getTextName();
     
     @Inject
     String getLink();
     
     @Inject
     String getWindowSelection();
     
	}
}