package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import javax.inject.Inject;
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

    @Inject
    String getTitle();

    @Inject
    Boolean getIsEditorial();

    @ChildResource
    List<Links> getLinks();

}
