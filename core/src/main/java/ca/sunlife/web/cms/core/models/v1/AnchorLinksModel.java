package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.wcm.core.components.internal.models.v1.TableOfContentsImpl;
import lombok.Getter;
import lombok.Setter;
/**
 * The Anchor Links is a sling model associated with Core-Anchor-Links component. it
 * implements com.adobe.cq.wcm.core.components.models.TableOfContents interface to
 * provide project specific implementation
 *
 * @author Sunlife
 */
@Setter
@Getter
 @Model(adaptables = { SlingHttpServletRequest.class, Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AnchorLinksModel extends TableOfContentsImpl{
   
    @ValueMapValue
    String anchorHeading;

    @ValueMapValue
    String spacing;

}