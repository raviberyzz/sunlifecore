package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The @SocialOptionsModel interface contains the set of fields related to
 * social options, which is consumed in Social Media component.
 *
 * @author Sunlife
 */

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface SocialOptionsModel {

	@ValueMapValue
	String getPlateforms();

	@ValueMapValue
	String getStringReaderText();
}