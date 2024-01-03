package ca.sunlife.web.cms.core.models.v1;

import ca.sunlife.web.cms.core.models.v1.header.HeaderLinks;
import ca.sunlife.web.cms.core.models.v1.header.Region;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;

@Model(adaptables = {
        Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface RegionMenuModel {

    /**
     * Gets the List of Region.
     * @return List of Region
     */
    @ChildResource(name = "regions")
    List<Region> getRegions();

    /**
     * Gets the Worldwide(HeaderLinks) object
     * @return HeaderLinks object
     */
    @ChildResource(name = "worldwide")
    HeaderLinks getWorldwide();

    /**
     * Gets the Analytics Data Section
     * @return the analytics data section
     */
    @ValueMapValue
    String getDataSection();

    /**
     * Gets the Spacing
     *
     * @return the spacing
     */
    @ValueMapValue
    String getSpacing();

}
