package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The Interface ContainerModel.
 */
@Model(adaptables = {
        Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface ContainerModel {

    @ValueMapValue
    String getId();

    @ValueMapValue
    String getDataSection();

    @ValueMapValue
    String getType();

    @ValueMapValue
    String getAccessibilityLabel();

    @ValueMapValue
    String getSpacing();

}
