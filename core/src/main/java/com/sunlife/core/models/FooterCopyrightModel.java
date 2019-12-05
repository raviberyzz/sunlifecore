package com.sunlife.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Model(
		adaptables = {Resource.class},
		 defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface FooterCopyrightModel {

	@Inject
	String getTitle();
	
	@Inject
	String getRichTitle();
	
	@Inject
	String getSlfText();
	
	@Inject
	String getProducts();
	
	@Inject
	String getLabel();
	
	@Inject
	String getUrl();
  
	@Inject
	String getWindowSelection();
	
	@Inject
	String getCheckboxSeparator();

	@Inject
	String getCheckboxHide();
}
