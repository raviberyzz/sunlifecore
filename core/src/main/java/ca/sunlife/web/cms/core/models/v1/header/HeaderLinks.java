package ca.sunlife.web.cms.core.models.v1.header;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = {
        Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface HeaderLinks {

    @ValueMapValue
    String getLinkName();

    @ValueMapValue
    String getLinkTarget();

    @ValueMapValue
    String getLinkURL();

    @ValueMapValue
    String getLinkIcon();

    @ValueMapValue
    String getDataTitle();

    @ValueMapValue
    String getLinkLanguageCode();

    @ValueMapValue
    String getLinkHighlight();

}
