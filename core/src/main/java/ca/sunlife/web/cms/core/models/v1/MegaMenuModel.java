package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;
@Model(adaptables = {Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = MegaMenuModel.RESOURCE_TYPE)
@Exporter(name = "jackson", extensions = "json")
public interface MegaMenuModel {

    public final static String RESOURCE_TYPE = "sunlife/core/components/content/core-megamenu/v1/megamenu";

    /**
     * Gets the Heading
     *
     * @return the heading
     */
    @ValueMapValue
    String getHeading();

    /**
     * Gets the List of Menu Sections
     *
     * @return the list of Menu Sections
     */
    @ChildResource
    List<MenuSections> getMenuSections();

    /**
     * Gets the Spacing
     *
     * @return the spacing
     */
    @ValueMapValue
    String getSpacing();
}
