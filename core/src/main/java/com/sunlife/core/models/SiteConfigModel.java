/**
 * 
 */
package com.sunlife.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * @author MO92 
 * Sling model for site specific configuration
 */
@Model(adaptables = {
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "sunlife/core/components/config/configuration")
public interface SiteConfigModel {

	@Inject
	String getDomain();

	@Inject
	String getSiteUrl();

	@Inject
	String getSiteSuffix();

	@Inject
	String getAlternateLanguages();

	@Inject
	String getPageDescription();

	@Inject
	String getPageLocale();

}
