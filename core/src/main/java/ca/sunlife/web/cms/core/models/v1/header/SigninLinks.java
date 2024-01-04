package ca.sunlife.web.cms.core.models.v1.header;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = {
        Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface SigninLinks {

    /**
     * Gets the sign in link title
     */
    @ValueMapValue
    String getDesktopLinkTitle();

    /**
     * Gets the mobile link title
     */
    @ValueMapValue
    String getMobileLinkTitle();

    /**
     * Gets the Link Icon
     */
    @ValueMapValue
    String getLinkIcon();

    /**
     * Gets the Link URL
     */
    @ValueMapValue
    String getLinkURL();

    /**
     * Gets the Link Style
     */
    @ValueMapValue
    String getLinkType();

    /**
     * Gets the Link target
     */
    @ValueMapValue
    String getLinkTarget();

}
