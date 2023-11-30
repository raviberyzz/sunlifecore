package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The HtmlComponentModel is a sling model associated with Html component. 
 *
 * @author Sunlife
 */

 @Model(adaptables = {
    Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = HtmlComponentModel.RESOURCE_TYPE)
public interface HtmlComponentModel {

    String RESOURCE_TYPE = "sunlife/core/components/content/core-html-component";

    @ValueMapValue
    String getText();

}
