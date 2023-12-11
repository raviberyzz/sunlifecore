/**
 *
 */
package ca.sunlife.web.cms.core.models.v1;

import ca.sunlife.web.cms.core.models.v1.header.Region;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;

@Model(adaptables = {
        Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface RegionLanguageMenuModel {


    @ChildResource(name = "regions")
    List<Region> getRegions();

    /**
     * Gets the title from Worldwide Tab
     */
    @ValueMapValue
    String getWorldwideName();

    /**
     * Gets the URL from Worldwide Tab
     */
    @ValueMapValue
    String getWorldwideURL();

    /**
     * Gets the Target from Worldwide Tab
     */
    @ValueMapValue
    String getWorldwideTarget();

    /**
     * Gets the Data Title from Worldwide Tab
     */
    @ValueMapValue
    String getWorldwideDataTitle();

    /**
     * Gets the Analytics Data Section from Worldwide Tab
     */
    @ValueMapValue
    String getDataSection();

    @ValueMapValue
    String getSpacing();

}
