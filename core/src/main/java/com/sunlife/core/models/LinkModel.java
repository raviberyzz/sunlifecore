package com.sunlife.core.models;

import java.util.List;

import javax.inject.Inject;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * Sling model for Links - regional languages menu
 * @author MO92
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class LinkModel {

	@Inject
	public String linkName;

	@Inject
	public String linkUrl;

	@Inject
	public String nextList;

	@Inject
	public List<SubLinkModel> subLinks;

}
