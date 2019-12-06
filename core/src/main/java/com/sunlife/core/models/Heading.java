package com.sunlife.core.models;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Model(adaptables= {Resource.class},
		defaultInjectionStrategy=DefaultInjectionStrategy.OPTIONAL
		)
public interface Heading{
	
	@Inject
	@Named("jcr:title")
	public String getTitle();
	
	@Inject
	public String getType();
	
	@Inject
	public String getLinkURL();
	@Inject
	public String getSelection();
	
}
