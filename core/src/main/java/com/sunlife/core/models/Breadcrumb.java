package com.sunlife.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Model(adaptables= {Resource.class},
		defaultInjectionStrategy=DefaultInjectionStrategy.OPTIONAL
)
public interface Breadcrumb {
	
	@Inject
	public int getStartLevel();
	
	@Inject
	public boolean getShowHidden();
	
	@Inject
	public boolean getHideCurrent();
	
	@Inject
	public boolean getSocialShareReqd();

}
