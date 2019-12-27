/**
 * 
 */
package com.sunlife.core.models;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * @author MO92
 *
 */
@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AlternateUrl {

	@Inject
	@Named("altLanguageSeo")
	public String altLanguageSeo;
	
	@Inject
	@Named("altLanguageUrlSeo")
	public String altLanguageUrlSeo;
	
}
