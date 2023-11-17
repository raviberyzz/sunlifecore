package ca.sunlife.web.cms.core.models.v1;

import java.util.List;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.adobe.cq.wcm.core.components.models.Image;
import com.adobe.cq.wcm.core.components.models.ImageArea;
import com.day.cq.commons.jcr.JcrConstants;

import lombok.Getter;

@Getter
@Model(adaptables = {SlingHttpServletRequest.class},
	adapters = {Image.class},
	defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
	resourceType = ImageModel.RESOURCE_TYPE)
public class ImageModel implements Image {

	protected static final String RESOURCE_TYPE = "sunlife/core/components/content/core-image/v1/image";	
	 
	 @ValueMapValue
	 private String fileReference;
	 
	 @ValueMapValue
	 private String src;
	 
	 @ValueMapValue
	 private String alt;
	 
	 @ValueMapValue(name = JcrConstants.JCR_TITLE)
	 private String title;
	 
	 @ValueMapValue
	 private String uuid;
	 
	 @ValueMapValue
	 private String link;
	 
	 @ValueMapValue
	 @Default(booleanValues = {false})
     boolean displayPopupTitle;	
	 
	 @ValueMapValue
	 @Default(intValues = {0})
	 private int[] widths;
		 
	 @ValueMapValue
	 private String srcUriTemplate;
	 
	 @ValueMapValue
	 @Default(booleanValues = {false})
     boolean lazyEnabled;
	
	 @ValueMapValue
	 @Default(booleanValues = {false})
     boolean decorative;	 
	 
	 @ValueMapValue(name = "isAvatar")
	 private String avatar;
	 	
	 @ValueMapValue
	 private String avatarType;
	 
	 @ValueMapValue
	 private String avatarSize;
	 
	 @ValueMapValue
	 private String imageAlignment;
		 
	 @ValueMapValue
	 private String fileReferenceMobile;
	 
	 @ValueMapValue
	 private String hideImageMobile; 
	 
	 @ValueMapValue
	 private List<ImageArea> areas; 
	 
	 @ValueMapValue
	 private String spacing;	 
	
	 
}
