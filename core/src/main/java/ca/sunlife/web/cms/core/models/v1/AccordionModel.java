package ca.sunlife.web.cms.core.models.v1;

import com.adobe.cq.wcm.core.components.models.Accordion;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

public interface AccordionModel extends Accordion {
    String getHeadingElement();

    String getAccessibilityLabel();

    String getDataTitle();

    String getSpacing();

    String getSingleExpansion();

    String[] getExpandedItems();
}
