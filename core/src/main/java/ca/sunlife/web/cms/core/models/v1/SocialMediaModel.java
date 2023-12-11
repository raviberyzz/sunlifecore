package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import java.util.List;

/**
 * The SocialMediaModel is a sling model which is associated with Social Media component.
 *
 * @author Sunlife
 */

@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = SocialMediaModel.RESOURCE_TYPE)
public interface SocialMediaModel {

    String RESOURCE_TYPE = "sunlife/core/components/content/core-social-media/v1/social-media";
    						
    @ValueMapValue
    String getType();

    @ChildResource
    List<SocialLinksModel> getSocialLinks();
	
	@ValueMapValue
	String getShareText();
    
    @ChildResource
    List<SocialOptionsModel> getSocialOptions();

    @ValueMapValue
    String getSpacing();
}