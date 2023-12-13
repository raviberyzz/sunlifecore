package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.api.SlingHttpServletRequest;
import lombok.Getter;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.adobe.cq.wcm.core.components.services.embed.UrlProcessor;
import com.drew.lang.annotations.Nullable;
import ca.sunlife.web.cms.core.models.v1.impl.EmbedImpl;
import com.adobe.cq.wcm.core.components.models.Embed;


@Getter
@Model(adaptables = {
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = EmbedModel.RESOURCE_TYPE)
public class EmbedModel extends EmbedImpl implements Embed {
 
	protected static final  String RESOURCE_TYPE = "sunlife/core/components/content/core-embed/v1/embed";

    @ValueMapValue
    private String caption;

     @ValueMapValue
     private String spacing;

}