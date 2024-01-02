package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The SeparatorModel is a sling model associated with Separator component. it
 * implements com.adobe.cq.wcm.core.components.models.Separator interface to
 * provide project specific implementation
 *
 * @author Sunlife
 */

 @Model(adaptables = {
    Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = SeparatorModel.RESOURCE_TYPE)
public interface SeparatorModel {

    String RESOURCE_TYPE = "sunlife/core/components/content/core-separator";

    @ValueMapValue
    String getSeparatorType();

     @ValueMapValue
    String getSpacing();

}