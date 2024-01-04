package ca.sunlife.web.cms.core.models.v1.header;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = {
        Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface HeaderLinks {

    /**
     * Gets the Link Name
     *
     * @return the link name
     */
    @ValueMapValue
    String getLinkName();

    /**
     * Gets the Link Target
     *
     * @return the link target
     */
    @ValueMapValue
    String getLinkTarget();

    /**
     * Gets the Link URL
     *
     * @return the link URL
     */
    @ValueMapValue
    String getLinkURL();

    /**
     * Gets the Link Icon
     *
     * @return the link icon
     */
    @ValueMapValue
    String getLinkIcon();

    /**
     * Gets the Link Data Title
     *
     * @return the link data title
     */
    @ValueMapValue
    String getDataTitle();

    /**
     * Gets the Link Language Code
     *
     * @return the link language code
     */
    @ValueMapValue
    String getLinkLanguageCode();

    /**
     * Gets the Link Highlight
     *
     * @return the link highlight
     */
    @ValueMapValue
    String getLinkHighlight();

}
