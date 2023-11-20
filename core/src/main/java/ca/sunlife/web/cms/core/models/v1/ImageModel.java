package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.day.cq.commons.jcr.JcrConstants;

@Model(adaptables = {
        Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = ImageModel.RESOURCE_TYPE)	
public interface ImageModel {

	String RESOURCE_TYPE = "sunlife/core/components/content/core-image";	
	 
	 @ValueMapValue
	 String getFileReference();	
	 
	 @ValueMapValue
	 String getSrc();
	 
	 @ValueMapValue
	 String getAlt();
	 
	 @ValueMapValue(name = JcrConstants.JCR_TITLE)
	 String getTitle();
	 
	 
	 @ValueMapValue
	 String getUuid();
	 
	 @ValueMapValue
	 String getLink();
	 
	 @ValueMapValue
	 @Default(booleanValues = {false})
     boolean getDisplayPopupTitle();	
	 
	 @ValueMapValue
	 @Default(intValues = {0})
	 int[] getWidths();
		 
	 @ValueMapValue
	 String getSrcUriTemplate();
	 
	 @ValueMapValue
	 @Default(booleanValues = {false})
     boolean getLazyEnabled();
	
	 @ValueMapValue
	 @Default(booleanValues = {false})
     boolean getDecorative();	 
	 
	 @ValueMapValue(name = "isAvatar")
	 String getAvatar();
	 	
	 @ValueMapValue
	 String getAvatarType();
	 
	 @ValueMapValue
	 String getAvatarSize();
	 
	 @ValueMapValue
	 String getImageAlignment();
		 
	 @ValueMapValue
	 String getFileReferenceMobile();
	 
	 @ValueMapValue
	 String getHideImageMobile(); 	 
	
	 @ValueMapValue
	 String getSpacing();	 
	
	 
}
