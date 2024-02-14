package ca.sunlife.web.cms.core.models.v1.impl;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import lombok.Getter;

import ca.sunlife.web.cms.core.models.v1.DynamicCardContainer;

@Model(adaptables = { Resource.class }, adapters = { DynamicCardContainer.class }, resourceType = {
        DynamicCardContainerImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class DynamicCardContainerImpl implements DynamicCardContainer {
    protected static final String RESOURCE_TYPE = "sunlife/core/components/content/core-dynamic-card-container/v1/dynamic-card-container";

    @ValueMapValue
	@Getter
    private String cardType;

    @ValueMapValue
	@Getter
    private String horizontalHeightControl;

    @ValueMapValue
	@Getter
    private String verticalHeightControl;

    @ValueMapValue
	@Getter
    private Boolean withLink;

    @ValueMapValue
	@Getter
    private String bannerImagePosition;   

    @ValueMapValue
	@Getter
    private String mediaType; 

    @ValueMapValue
	@Getter
    private String spacing;

    @ValueMapValue
	@Getter
    private Boolean horizontalMultipleCard;

    @ValueMapValue
	@Getter
    private Boolean horizontalClickable; 

    @ValueMapValue
	@Getter
    private Boolean horizontalIconCard;

    @ValueMapValue
	@Getter
    private Boolean verticalMultipleCard;    

    @ValueMapValue
	@Getter
    private Boolean verticalClickable;

    @ValueMapValue
	@Getter
    private Boolean verticalIconCard;

    @ValueMapValue
	@Getter
    private Boolean largeAvatarSize; 

    @ValueMapValue
	@Getter
    private Boolean avatarWithBody; 

    @ValueMapValue
	@Getter
    private Boolean avatarMultipleCard; 

    @ValueMapValue
	@Getter
    private Boolean segmentedMultipleCard;

    @ValueMapValue
	@Getter
    private Boolean segmentedformContainer; 

    @ValueMapValue
	@Getter
    private Boolean statisticsMultipleCard;
  
}
