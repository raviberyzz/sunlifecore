package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ButtonItems {

	@ValueMapValue
	String buttonType;

	@ValueMapValue
	String buttonText;

	@ValueMapValue
	String linkURL;

	@ValueMapValue
	String linkTarget;
}