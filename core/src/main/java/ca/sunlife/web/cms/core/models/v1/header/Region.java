package ca.sunlife.web.cms.core.models.v1.header;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;

@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface Region {
    @ValueMapValue
    String getRegionName();

    @ValueMapValue
    String getRegionURL();

    @ValueMapValue
    String getRegionTarget();

    @ValueMapValue
    String getDataTitle();

    @ChildResource
    List<HeaderLinks> getItems();

}
