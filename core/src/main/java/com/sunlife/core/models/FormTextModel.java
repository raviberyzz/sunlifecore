package com.sunlife.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Model(
		adaptables = {Resource.class},
		 defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface FormTextModel {

	@Inject
	String getType();
	
	@Inject
	String getFieldLabel();
	
	@Inject
	String getPlaceholder();
	
	@Inject
	String getName();
	
	@Inject
	String getMaxlength();
	
	@Inject
	String getConstraintMessage();
  
	@Inject
	String getRequired();
	
	@Inject
	String getRequiredMessage();
  
	@Inject
	String getReadOnly();
	
	@Inject
	String getErrorMessage();
  
	@Inject
	String getPattern();
}
