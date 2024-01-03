package ca.sunlife.web.cms.core.models.v1;

import ca.sunlife.web.cms.core.models.v1.impl.NavigationImpl;
import lombok.Getter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Getter
@Model(adaptables = {SlingHttpServletRequest.class,
        Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = SitemapModel.RESOURCE_TYPE)
public class SitemapModel extends NavigationImpl {

    protected static final String RESOURCE_TYPE = "sunlife/core/components/content/core-site-map/v1/site-map";

    @ValueMapValue
    private String spacing;

    public SitemapModel() {
        super();
    }


}