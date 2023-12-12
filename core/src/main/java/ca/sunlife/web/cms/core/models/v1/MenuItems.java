package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
@Model(adaptables = {SlingHttpServletRequest.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface MenuItems {
    @ValueMapValue
    String getMenuItemLinkName();

    @ValueMapValue
    String getMenuItemLinkURL();

    @ValueMapValue
    String getMenuItemDataTitle();

    @ValueMapValue
    String getMenuItemTarget();
}
