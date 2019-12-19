package com.sunlife.core.models;

import java.util.List;

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
	String getCopyrightText();
	
	@Inject
	String getSlfText();
	
	@Inject
	List<FooterItems> getFooterItems();
	
	 @Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
	  interface FooterItems {
	
	@Inject
	String getLabel();
	
	@Inject
	String getUrl();
  
	@Inject
	String getTarget();
	
	@Inject
	String getCheckboxSeparator();

	@Inject
	String getCheckboxHide();
	 }
}
