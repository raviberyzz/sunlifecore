package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.wcm.core.components.internal.models.v1.form.OptionsImpl;
import com.adobe.cq.wcm.core.components.models.form.Options;

import lombok.Getter;

/**
 * The FormOptionModel is a sling model associated with Form option component.
 *
 * @author Sunlife
 */
@Getter
@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, adapters = Options.class, resourceType = "sunlife/core/components/form/core-options/v1/options")
public class FormOptionsModel extends OptionsImpl {

	@ValueMapValue
	private String id;

	@ValueMapValue
	private String constraintMessage;

	@ValueMapValue
	private String required;
	
	@ValueMapValue
	private String dataSection;

	@ValueMapValue
	private String spacing;
	
	@ValueMapValue
	private String layout;
}