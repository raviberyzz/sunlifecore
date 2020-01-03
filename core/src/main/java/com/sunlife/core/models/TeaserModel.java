package com.sunlife.core.models;

import javax.inject.Inject;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Model(
		adaptables = {Resource.class},
		 defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface TeaserModel {	

	@Inject
	String getImageAlignment();

	@Inject
	String getFileReference();
	
	@Inject
	String getFileReferenceMobile();
	
	@Inject
	String getAltText();
	
	@Inject
	String getDescription();
	
	@Inject
	String getLinkURL();	
	
	@Inject
	String getTarget();	
  
}
