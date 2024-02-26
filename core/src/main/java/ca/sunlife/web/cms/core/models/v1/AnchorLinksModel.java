package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.wcm.core.components.models.TableOfContents;

/**
 * The Anchor Links is a sling model associated with Core-Anchor-Links component. it
 * implements com.adobe.cq.wcm.core.components.models.TableOfContents interface to
 * provide project specific implementation
 *
 * @author Sunlife
 */

 @Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = AnchorLinksModel.RESOURCE_TYPE)
public interface AnchorLinksModel extends TableOfContents{

    String RESOURCE_TYPE = "sunlife/core/components/content/core-anchor-links/v1/anchor-links";
   
    @ValueMapValue
    String getAnchorHeading();

    @ValueMapValue
    String getSpacing();

}