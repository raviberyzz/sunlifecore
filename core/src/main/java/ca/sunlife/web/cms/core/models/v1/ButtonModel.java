package ca.sunlife.web.cms.core.models.v1;

import com.adobe.cq.wcm.core.components.models.Button;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.day.cq.commons.jcr.JcrConstants;


import lombok.Getter;

/**
 * The ButtonModel is a sling model associated with core-title component. it
 * implements com.adobe.cq.wcm.core.components.models.Button interface to provide
 * project specific implementation
 * 
 * @author Sunlife
 *
 */
@Getter
@Model(adaptables = {
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = ButtonModel.RESOURCE_TYPE)
public class ButtonModel implements Button {

	protected static final String RESOURCE_TYPE = "sunlife/core/components/content/core-button/v1/button";

	
	@ValueMapValue(name = JcrConstants.JCR_TITLE)
	private String text;

	@ValueMapValue
	private String icon;

	@ValueMapValue
	@Default(booleanValues = {false})
	private boolean iconPosition;

	@ValueMapValue
	private String buttonType;

	@ValueMapValue
	private String dataTitle;

	@ValueMapValue
	private String accessibilityLabel;

	@ValueMapValue
	private String spacing;


}