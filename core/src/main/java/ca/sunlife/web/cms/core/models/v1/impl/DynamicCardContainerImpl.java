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
    private String name;

    @ValueMapValue
    private String cardType;

    @ValueMapValue
    private String heightControl;

    @ValueMapValue
    private Boolean horizontalMultipleClickable;

    @ValueMapValue
    private Boolean horizontalMultipleWithIcon;

    @ValueMapValue
    private String verticalHeightControl;

    @ValueMapValue
    private Boolean verticalMultipleClickable;

    @ValueMapValue
    private Boolean verticalMultipleWithIcon;

    @ValueMapValue
    private Boolean withLink;

    @ValueMapValue
    private String avatarSize;

    @ValueMapValue
    private String bannerImagePosition;

    @ValueMapValue
    private String mediaType;

    @ValueMapValue
    private String additionalFeatures;

    @ValueMapValue
    private String statisticEnhancements;

    public String getName() {
        return name;
    }

    public String getCardType() {
        return cardType;
    }

    public String getHeightControl () {
        return heightControl;
    }

    public Boolean getHorizontalMultipleClickable() {
        return horizontalMultipleClickable;
    }

    public Boolean getHorizontalMultipleWithIcon() {
        return horizontalMultipleWithIcon;
    }

    public Boolean getWithLink() {
        return withLink;
    }

    public String getVerticalHeightControl() {
        return verticalHeightControl;
    }

    public Boolean getVerticalMultipleClickable() {
        return verticalMultipleClickable;
    }

    public Boolean getVerticalMultipleWithIcon() {
        return verticalMultipleWithIcon;
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

    public String getAdditionalFeatures() {
        return additionalFeatures;
    }

    public String getStatisticEnhancements() {
        return statisticEnhancements;
    }

}
