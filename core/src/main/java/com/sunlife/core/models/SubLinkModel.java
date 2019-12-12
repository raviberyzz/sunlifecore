package com.sunlife.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 *  Sling model for sub links in regional languages menu
 * @author MO92
 *
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SubLinkModel {

	@Inject
	public String subLinkName;

	@Inject
	public String subLinkUrl;

	@Inject
	public String subLinkTarget;

	@Inject
	public String subLinkSeparator;
	
	@Inject
	public String selected;
}
