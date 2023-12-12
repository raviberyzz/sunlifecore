package ca.sunlife.web.cms.core.models.v1.header;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import java.util.List;
/**
 * Interface for HeaderModel
 */
@Model(adaptables = {
        Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = HeaderModel.RESOURCE_TYPE)
public interface HeaderModel {
    String RESOURCE_TYPE = "sunlife/core/components/content/core-header/v1/header";

    /**
     * Gets true or false for displaying the mega menu
     *
     * @return the display mega menu
     */
    @ValueMapValue
    String displayMegaMenu();

    /**
     * Gets the mega menu links which is multifield
     *
     * @return the mega menu links
     */
    @ChildResource
    List<MegaMenuLinks> getMegaMenuLinks();

    /**
     * Gets the list from nav which is multifield
     *
     * @return the list from nav
     */
    @ValueMapValue
    String getListFromNav();

    @ValueMapValue
    String getListFromRegion();

    @ValueMapValue
    String getRegionTitle();

    @ValueMapValue
    String getLanguage();

    @ChildResource
    List<LanguageLink> getLanguageLinks();

    /**
     * Gets the navlinks which is multifield
     *
     * @return the navlinks
     */
    @ChildResource
    List<UtilityBarNavlinks> getNavlinks();
}
