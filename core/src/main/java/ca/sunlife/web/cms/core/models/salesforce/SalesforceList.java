package ca.sunlife.web.cms.core.models.salesforce;

import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import com.adobe.cq.wcm.core.components.internal.models.v2.ListImpl;
import com.adobe.cq.wcm.core.components.models.List;
import com.adobe.cq.wcm.core.components.models.ListItem;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

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
public class SalesforceList extends ListImpl {

    /*
    @Self @Via(type= ResourceSuperType.class)
    private List delegate;
     */

    @Self
    private SlingHttpServletRequest self;

    @Override
    public Collection<ListItem> getListItems() {

        Collection<ListItem> result;
        ResourceResolver resolver = self.getResourceResolver();
        PageManager pageManager = resolver.adaptTo(PageManager.class);
        if (pageManager != null) {

            result = super.getListItems().stream()
                    .map(listItem -> {
                        ListItem anItem;
                        if (listItem != null) {
                            Page page = pageManager.getPage(listItem.getPath());
                            anItem = new SalesforceListItem(listItem, page.getProperties());
                        } else {
                            anItem = null;
                        }

                        return anItem;

                    }).collect(Collectors.toList());

        } else {
            result = Collections.emptyList();
        }

        return result;
    }

}