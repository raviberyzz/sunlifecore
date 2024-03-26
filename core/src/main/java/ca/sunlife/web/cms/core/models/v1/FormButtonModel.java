package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.day.cq.commons.jcr.JcrConstants;

/**
 * The FormButtonModel is a sling model associated with Form Button component.
 *
 * @author Sunlife
 */
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = FormButtonModel.RESOURCE_TYPE)
public interface FormButtonModel {

	String RESOURCE_TYPE = "sunlife/core/components/form/core-button/v1/button";

	@ValueMapValue
	String getType();

	@ValueMapValue
	String getButtonStyle();

	@ValueMapValue(name = JcrConstants.JCR_TITLE)
	String getText();

	@ValueMapValue
	String getName();

	@ValueMapValue
	String getValue();

	@ValueMapValue
	String getIcon();

	@ValueMapValue
    @Default(booleanValues = {false})
    boolean isIconPosition();

	@ValueMapValue
	@Default(booleanValues = {false})
	boolean isInlineButton();

	@ValueMapValue
	@Default(booleanValues = {false})
	boolean isFullWidth();

	@ValueMapValue
	String getId();

	@ValueMapValue
	String getAccessibilityLabel();

	@ValueMapValue
	String getDataTitle();

	@ValueMapValue
	String getSpacing();
}