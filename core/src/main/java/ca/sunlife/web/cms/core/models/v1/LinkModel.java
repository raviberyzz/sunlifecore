package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The @LinkModel interface represents the model for the List of Links which are used in ListList component.
 *
 * @author Sunlife
 */

@Model(adaptables = {
        Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)

public interface LinkModel {

    @ValueMapValue
    String getLinkTitle();

    @ValueMapValue
    String getLinkSize();

    @ValueMapValue
    String getLinkType();

    @ValueMapValue
    String getLinkURL();

    @ValueMapValue
    String getLangCode();

    @ValueMapValue
    String getLinkTarget();

    @ValueMapValue
    String getDataTitle();

}
