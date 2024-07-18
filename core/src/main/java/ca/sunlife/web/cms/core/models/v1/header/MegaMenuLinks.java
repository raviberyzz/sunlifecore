package ca.sunlife.web.cms.core.models.v1.header;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
/**
 * Interface for MegaMenuLinks
 */
@Model(adaptables = {
        Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface MegaMenuLinks {
    /**
     * Gets the mega menu link name
     *
     * @return the mega menu link name
     */
    @ValueMapValue
    String getMegaMenuLinkName();

    /**
     * Gets the mega menu link url
     *
     * @return the mega menu link url
     */
    @ValueMapValue
    String getMegaMenuLinkURL();

    /**
     * Gets the mega menu fragment path
     *
     * @return the mega menu  fragment path
     */
    @ValueMapValue
    String getMegaMenuFragmentPath();

    /**
     * Gets the mega menu link style
     *
     * @return the mega menu link style
     */
    @ValueMapValue
    String getMegaMenuLinkStyle();

}
