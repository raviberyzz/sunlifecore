package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = {Resource.class},
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

    /**
     * Gets the boolean value for hideInMobile
     *
     * @return the boolean value for hideInMobile
     */
    @ValueMapValue
    boolean getHideInMobile();

    /**
     * Gets the mobileMenuItemLinkName
     *
     * @return the mobileMenuItemLinkName
     */
    @ValueMapValue
    String getMobileMenuItemLinkName();

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
