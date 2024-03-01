package ca.sunlife.web.cms.core.models.v1;

import lombok.Setter;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.api.SlingHttpServletRequest;
import lombok.Getter;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.adobe.cq.wcm.core.components.internal.models.v1.BreadcrumbImpl;



/**
 * The BreadcrumbModel is a sling model associated with Breadcrumb component. 
 *
 * @author Sunlife
 */

 @Getter
 @Setter
 @Model(adaptables = {
         SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = BreadcrumbModel.RESOURCE_TYPE)
 public class BreadcrumbModel extends BreadcrumbImpl {
  
     protected static final  String RESOURCE_TYPE = "sunlife/core/components/content/core-breadcrumb/v1/breadcrumb";

    @ValueMapValue
    private String startLevel;

    @ValueMapValue
    private String langcode;

    @ValueMapValue
    private String spacing;
}
