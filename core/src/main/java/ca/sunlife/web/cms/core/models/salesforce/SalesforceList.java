package ca.sunlife.web.cms.core.models.salesforce;

import com.adobe.cq.wcm.core.components.internal.models.v2.ListImpl;
import com.adobe.cq.wcm.core.components.models.List;
import com.adobe.cq.wcm.core.components.models.ListItem;
import com.day.cq.wcm.api.Page;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import java.util.Collection;
import java.util.stream.Collectors;

/**
 * Model for a salesforce specific page list.
 * Please don't use this as an example of how to extend core models - you should use delegation:
 * https://github.com/adobe/aem-core-wcm-components/wiki/Delegation-Pattern-for-Sling-Models
 *
 * We are not currently using this approach because the core model interfaces are on the bundle classpath.
 * (See the maven-bundle-plugin embedding configuration). Delegation will not work until this problem is fixed.
 */
@Model(adaptables= {SlingHttpServletRequest.class},
        adapters = List.class,
        resourceType = "sunlife/advisorhub/components/content/salesforce/list/v1/list")
public class SalesforceList extends ListImpl implements List {

    /*
    @Self @Via(type= ResourceSuperType.class)
    private List delegate;
     */

    @Self
    private SlingHttpServletRequest self;

    @Override
    public Collection<ListItem> getListItems() {

        ResourceResolver resolver = self.getResourceResolver();

        Collection<ListItem> result = super.getListItems().stream()
                .map(listItem -> {
                    Resource itemResource = resolver.getResource(listItem.getPath());
                    Page page = itemResource.adaptTo(Page.class);
                    return new SalesforceListItem(listItem, page.getProperties());

                }).collect(Collectors.toList());

        return result;
    }

}