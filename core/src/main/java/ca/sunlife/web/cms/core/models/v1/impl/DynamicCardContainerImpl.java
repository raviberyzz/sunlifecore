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
	private String cardType;

    @ValueMapValue
    private String horizontalHeightControl;

    @ValueMapValue
    private String verticalHeightControl;

    @ValueMapValue
    private Boolean withLink;

   
	@ValueMapValue
	private String bannerImagePosition;   

    @ValueMapValue
	private String mediaType; 

    @ValueMapValue
	private String spacing;

    @ValueMapValue
	
    private Boolean horizontalMultipleCard;

    @ValueMapValue
	private Boolean horizontalClickable; 

    @ValueMapValue
	private Boolean horizontalIconCard;

    @ValueMapValue
	private Boolean verticalMultipleCard;    

    @ValueMapValue
	private Boolean verticalClickable;

    @ValueMapValue
	private Boolean verticalIconCard;

    @ValueMapValue
    private Boolean largeAvatarSize; 

    @ValueMapValue
	private Boolean avatarWithBody; 

    @ValueMapValue
	private Boolean avatarMultipleCard; 

    @ValueMapValue
	private Boolean segmentedMultipleCard;

    @ValueMapValue
	private Boolean segmentedformContainer; 

    @ValueMapValue
	private Boolean statisticsMultipleCard;

	@Override
	public String getCardType() {
		return cardType;
	}

	@Override
	public String getSpacing() {
		return spacing;
	}

	@Override
	public String getHorizontalHeightControl() {
		return horizontalHeightControl;
	}

	@Override
	public Boolean getHorizontalMultipleCard() {
		return horizontalMultipleCard;
	}

	@Override
	public Boolean getHorizontalClickable() {
		return horizontalClickable;
	}

	@Override
	public Boolean getHorizontalIconCard() {
		return horizontalIconCard;
	}

	@Override
	public String getVerticalHeightControl() {
		return verticalHeightControl;
	}

	@Override
	public Boolean getVerticalMultipleCard() {
		return verticalMultipleCard;
	}

	@Override
	public Boolean getVerticalClickable() {
		return verticalClickable;
	}

	@Override
	public Boolean getVerticalIconCard() {
		return verticalIconCard;
	}

	@Override
	public Boolean getLargeAvatarSize() {
		return largeAvatarSize;
	}

	@Override
	public Boolean getAvatarWithBody() {
		return avatarWithBody;
	}

	@Override
	public Boolean getAvatarMultipleCard() {
		return avatarMultipleCard;
	}

	@Override
	public String getBannerImagePosition() {
		return bannerImagePosition;
	}

	@Override
	public String getMediaType() {
		return mediaType;
	}

	@Override
	public Boolean getSegmentedMultipleCard() {
		return segmentedMultipleCard;
	}

	@Override
	public Boolean getSegmentedformContainer() {
		return segmentedformContainer;
	}

	@Override
	public Boolean getStatisticsMultipleCard() {
		return statisticsMultipleCard;
	}
	@Override
	public Boolean getWithLink() {
			return withLink;
	}
}
