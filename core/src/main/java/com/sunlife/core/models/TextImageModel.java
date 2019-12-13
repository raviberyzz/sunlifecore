package com.sunlife.core.models;

import javax.inject.Inject;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Model(
		adaptables = {Resource.class},
		 defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface TextImageModel {

	@Inject
	String getText();
	
	@Inject
	String getFileReference();
	
	@Inject
	String getImageAlignment();
	
	@Inject
	String getAltText();
	
	@Inject
	String getImageLink();
	
	@Inject
	String getTarget();	
  
}
