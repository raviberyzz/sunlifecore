package com.sunlife.core.models;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;



@Model(adaptables=Resource.class)
public interface FormButtonModel {

	@Inject
	@Optional
	public String getType();
	
	@Inject
	@Optional
	@Named("jcr:title")
	public String getTitle();
	
	@Inject
	@Optional
	public String getName();
	
	@Inject
	@Optional
	public String getValue();
	
	@Inject
	@Optional
	public String getButtonstyle();
	
		
}
