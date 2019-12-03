package com.sunlife.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Model(
		adaptables= {Resource.class},
		defaultInjectionStrategy=DefaultInjectionStrategy.OPTIONAL)
public interface Container {

	@Inject
	public String getMethod();
	
	@Inject
	public String getAction();
	
	@Inject
	public String getName();
	@Inject
	public String getId();
	@Inject
	public String getRedirect();
	@Inject
	public String getValidation();
	
}
