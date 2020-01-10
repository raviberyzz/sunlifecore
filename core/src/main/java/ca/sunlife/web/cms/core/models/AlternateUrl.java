/**
 * 
 */
package ca.sunlife.web.cms.core.models;

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
public @interface AlternateUrl {

	@Inject
	@Named("altLanguageSeo")
	String getAltLanguageSeo();
	
	@Inject
	@Named("altLanguageUrlSeo")
	String getAltLanguageUrlSeo();
	
}
