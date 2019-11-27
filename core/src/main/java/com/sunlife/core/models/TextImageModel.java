package com.sunlife.core.models;

import java.util.List;
import javax.inject.Inject;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Model(
		adaptables = {Resource.class},
		 defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface TextImageModel {

	@Inject
	String getRichtext();
	
	@Inject
	String getFileReference();
	
	@Inject
	String getAlttext();
	
	@Inject
	String getTarget();
	
	@Inject
	String getImgtype();
	
	@Inject
	String getLink();
  
}
