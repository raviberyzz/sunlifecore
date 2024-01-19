package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The @SocialLinksModel interface contains the set of fields related to
 * social links, which is consumed in Social Media component.
 *
 * @author Sunlife
 */

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)

public interface SocialLinksModel {

	@ValueMapValue
	String getIconName();

	@ValueMapValue
	String getIconLink();

	@ValueMapValue
	String getTarget();

	@ValueMapValue
	String getScreenReaderText();

}
