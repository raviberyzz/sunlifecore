package ca.sunlife.web.cms.core.models.v1.header;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;

@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface Region {
    /**
     * Gets the Region Name
     *
     * @return the region name
     */
    @ValueMapValue
    String getRegionName();

    /**
     * Gets the Region URL
     *
     * @return the region URL
     */
    @ValueMapValue
    String getRegionURL();

    /**
     * Gets the Region Target
     *
     * @return the region target
     */
    @ValueMapValue
    String getRegionTarget();

    /**
     * Gets the Region Data Title
     *
     * @return the region Data Title
     */
    @ValueMapValue
    String getDataTitle();

    /**
     * Gets the Region Highlight
     *
     * @return the region highlight
     */
    @ValueMapValue
    String getLinkHighlight();

    /**
     * Gets the list of HeaderLinks objects
     *
     * @return the link items list
     */
    @ChildResource
    List<HeaderLinks> getItems();

    /**
     * Retrieves the type of link from the value map.
     *
     * The link type indicates whether the link is an internal link, an external link,
     * or a link to a PDF document.
     *
     * @return the link type as a {@code String}.
     *
     */
    @ValueMapValue
    String getLinkType();

}
