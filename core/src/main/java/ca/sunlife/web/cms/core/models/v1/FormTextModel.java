package ca.sunlife.web.cms.core.models.v1;

import com.adobe.cq.wcm.core.components.models.form.Text;

/**
 * The FormTextModel is a sling model associated with Form Text component.
 *
 * @author Sunlife
 */
public interface FormTextModel extends Text {

	String getValidation();

	String getValidationError();

	String getIcon();

	String getSpacing();

	boolean isIconPosition();

}