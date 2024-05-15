package ca.sunlife.web.cms.core.models.v1;

import com.adobe.cq.wcm.core.components.models.Text;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The TextModel is a sling model associated with core-text component.
 * It implements com.adobe.cq.wcm.core.components.models.Text interface to provide
 * project specific implementation
 *
 * @author Sunlife
 */

@Model(adaptables = {SlingHttpServletRequest.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = TextModel.RESOURCE_TYPE)

public interface TextModel {
    String RESOURCE_TYPE = "sunlife/core/components/content/core-text/v1/text";

    @ValueMapValue
    String getText();

    @ValueMapValue
    String getId();

    @ValueMapValue(name = "textIsRich")
    @Default(booleanValues = {false})
    boolean getIsRichText();

    @ValueMapValue(name = "spacing")
    String getBottomSpacing();
}