package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = {SlingHttpServletRequest.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface MenuItems {
    /**
     * Gets the Menu Item Link Name
     *
     * @return the menu item link name
     */
    @ValueMapValue
    String getMenuItemLinkName();

    /**
     * Gets the Menu Item Link URL
     *
     * @return the menu item link URL
     */
    @ValueMapValue
    String getMenuItemLinkURL();

    /**
     * Gets the Menu Item Data Title
     *
     * @return the menu item data title
     */
    @ValueMapValue
    String getMenuItemDataTitle();

    /**
     * Gets the Menu Item Target
     *
     * @return the menu item target
     */
    @ValueMapValue
    String getMenuItemTarget();
}
