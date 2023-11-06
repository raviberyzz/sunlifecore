package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;

/**
 * The LinklistModel is a sling model which is associated with Linklist component.
 *
 * @author Sunlife
 */

@Model(adaptables = {
        Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = LinklistModel.RESOURCE_TYPE)
public interface LinklistModel {

    String RESOURCE_TYPE = "sunlife/core/components/content/core-link-list";

    @ValueMapValue
    String getTitle();

    @ValueMapValue
    Boolean getIsEditorial();

    @ChildResource
    List<Link> getLinks();

}
