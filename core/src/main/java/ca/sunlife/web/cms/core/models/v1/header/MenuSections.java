package ca.sunlife.web.cms.core.models.v1.header;

import ca.sunlife.web.cms.core.models.v1.header.MenuItems;
import com.adobe.acs.commons.models.injectors.annotation.ChildResourceFromRequest;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import java.util.List;

@Model(adaptables = {SlingHttpServletRequest.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface MenuSections {
    @ValueMapValue
    String getSubheadingLinkName();

    @ValueMapValue
    String getSubheadingLinkURL();

    @ValueMapValue
    String getSubheadingDataTitle();

    @ValueMapValue
    String getSubheadingTarget();

    @ChildResourceFromRequest
    List<MenuItems> getMenuItems();
}
