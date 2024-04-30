package ca.sunlife.web.cms.core.models.v1;

import com.day.cq.commons.jcr.JcrConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The ButtonModel is a sling model associated with Button component. it
 * implements com.adobe.cq.wcm.core.components.models.Button interface to
 * provide project specific implementation
 *
 * @author Sunlife
 */

 @Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = ButtonModel.RESOURCE_TYPE)
public interface ButtonModel {

    String RESOURCE_TYPE = "sunlife/core/components/content/core-button";

    @ValueMapValue(name = JcrConstants.JCR_TITLE)
    String getText();

    @ValueMapValue
    String getIcon();

    @ValueMapValue
    @Default(booleanValues = {false})
    boolean isIconPosition();

    @ValueMapValue
    String getLinkURL();

    @ValueMapValue
    String getLinkTarget();

    @ValueMapValue
    String getButtonType();

    @ValueMapValue
    String getDataTitle();

    @ValueMapValue
    String getAccessibilityLabel();

    @ValueMapValue
    String getSpacing();
    
	@ValueMapValue
	String getModalID();
	
	@ValueMapValue
	@Default(booleanValues = { false })
	boolean isTriggerModel();

}