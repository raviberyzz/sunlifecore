package ca.sunlife.web.cms.core.models.v1;

import com.adobe.acs.commons.models.injectors.annotation.ChildResourceFromRequest;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;

@Model(adaptables = {SlingHttpServletRequest.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface MenuSections {
    /**
     * Gets the Subheading
     *
     * @return the subheading
     */
    @ValueMapValue
    String getSubheadingLinkName();

    /**
     * Gets the Subheading Link URL
     *
     * @return the subheading link URL
     */
    @ValueMapValue
    String getSubheadingLinkURL();

    /**
     * Gets the Subheading Data Title
     *
     * @return the subheading data title
     */
    @ValueMapValue
    String getSubheadingDataTitle();

    /**
     * Gets the Subheading Target
     *
     * @return the subheading target
     */
    @ValueMapValue
    String getSubheadingTarget();

    /**
     * Gets the Menu Items
     *
     * @return the menu items
     */
    @ChildResourceFromRequest
    List<MenuItems> getMenuItems();
}
