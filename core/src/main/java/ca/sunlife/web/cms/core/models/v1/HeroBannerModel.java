package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


@Model(adaptables = {
        Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = HeroBannerModel.RESOURCE_TYPE)	
public interface HeroBannerModel {

	String RESOURCE_TYPE = "sunlife/core/components/content/core-hero-banner";	
	 
	 @ValueMapValue
	 String getVariant();	
	 
	 @ValueMapValue
	 String getImgDesktopFileReference();
	 
	 @ValueMapValue
	 String getImgTabletFileReference();
	 
	 @ValueMapValue
	 String getImgMobileFileReference();	 
	 
	 @ValueMapValue(name = "isLazyLoaded")
	 @Default(booleanValues = {false})
     boolean getLazyLoaded();	
	 
	 @ValueMapValue(name = "isDecorative")
	 @Default(booleanValues = {false})
     boolean getDecorative();
	 	 
	 @ValueMapValue
	 String getLink();	 
	
	 @ValueMapValue
	 String getSrcUriTemplate();
	 
	 @ValueMapValue
	 @Default(booleanValues = {false})
     boolean getLazyEnabled();		 
	 
	 @ValueMapValue
	 String getAltText();	 

	 @ValueMapValue
	 String getHeading();
	 
	 @ValueMapValue
	 String getDescription();	 
	 
	 @ValueMapValue
	 String getBackgroundStyle();	 
	 
	 @ValueMapValue
	 String getContentAlignment(); 	 
	 
	 @ValueMapValue
	 String getBannerSize();
	 
	 @ValueMapValue
	 String getExperienceFragmentPath(); 		 
	 
	 @ValueMapValue
	 String getCtaType();

	 @ValueMapValue
	 String getBtnLabel();
	 
	 @ValueMapValue
	 String getBtnURL();

	 @ValueMapValue
	 String getCtaLabel();
	 
	 @ValueMapValue
	 String getLinkURL();
	 
	 @ValueMapValue
	 String getTarget();

	 @ValueMapValue
	 String getCtaIconType();	 	

	 @ValueMapValue
	 String getLinkIconType();  
	
	 @ValueMapValue
	 String getSpacing();

	 @ValueMapValue
	 String getDataTitle(); 

	 @ValueMapValue
	 String getDataSection(); 	 
}
