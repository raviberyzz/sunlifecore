package ca.sunlife.web.cms.core.models.v1.impl;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

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
    private String avatarSize;

    @ValueMapValue
    private String bannerImagePosition;

    @ValueMapValue
    private String mediaType;

    public String getCardType() {
        return cardType;
    }

    public String getHorizontalHeightControl () {
        return horizontalHeightControl;
    }

    public Boolean getWithLink() {
        return withLink;
    }

    public String getVerticalHeightControl() {
        return verticalHeightControl;
    }

    public String getAvatarSize() {
        return avatarSize;
    }

    public String getBannerImagePosition() {
        return bannerImagePosition;
    }

    public String getMediaType() {
        return mediaType;
    }

    @ValueMapValue
    private String spacing;

    public String getSpacing() {
        return spacing;
    }

    @ValueMapValue
    private Boolean horizontalMultipleCard;

    public Boolean getHorizontalMultipleCard() {
        return horizontalMultipleCard;
    }

    @ValueMapValue
    private Boolean horizontalClickable;

    public Boolean getHorizontalClickable() {
        return horizontalClickable;
    }

    @ValueMapValue
    private Boolean horizontalIconCard;

    public Boolean getHorizontalIconCard() {
        return horizontalIconCard;
    }

    @ValueMapValue
    private Boolean verticalMultipleCard;
      
    public Boolean getVerticalMultipleCard() {
        return verticalMultipleCard;
    }

    @ValueMapValue
    private Boolean verticalClickable;

    public Boolean getVerticalClickable() {
        return verticalClickable;
    }

    @ValueMapValue
    private Boolean verticalIconCard;

    public Boolean getVerticalIconCard() {
        return verticalIconCard;
    }

    @ValueMapValue
    private Boolean avatarMultipleCard; 

    public Boolean getAvatarMultipleCard() {
        return avatarMultipleCard;
    }

    @ValueMapValue
    private Boolean segmentedMultipleCard;

    public Boolean getSegmentedMultipleCard() {
        return segmentedMultipleCard;
    }

    @ValueMapValue
    private Boolean statisticsMultipleCard;

    public Boolean getStatisticsMultipleCard() {
        return statisticsMultipleCard;
    }
}
