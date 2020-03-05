/**
 * 
 */
package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * @author mo92
 *
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface AlternateLanguageModel {
	
	@Inject
	String getLanguageCode();
	
	@Inject
	String getSiteLocation();
	
	@Inject
	String getDomain();
	
	@Inject
	String getDefaultLanguage();

}
