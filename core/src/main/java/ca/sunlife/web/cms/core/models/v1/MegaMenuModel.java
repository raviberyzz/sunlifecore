package ca.sunlife.web.cms.core.models.v1;

import com.adobe.acs.commons.models.injectors.annotation.ChildResourceFromRequest;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import java.util.List;

@Model(adaptables = {SlingHttpServletRequest.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = MegaMenuModel.RESOURCE_TYPE)
@Exporter(name = "jackson", extensions = "json")
public interface MegaMenuModel {

    public final static String RESOURCE_TYPE = "sunlife/core/components/content/core-megamenu/v1/megamenu";

    @ValueMapValue
    String getNavigationType();

    @ValueMapValue
    String getHeading();

    @ChildResourceFromRequest
    List<MenuSections> getMenuSections();

    @ValueMapValue
    String getSpacing();
}
