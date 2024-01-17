package ca.sunlife.web.cms.core.models.v1.impl;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import ca.sunlife.web.cms.core.models.v1.CardContainer;

@Model(adaptables = { Resource.class }, adapters = { CardContainer.class }, resourceType = {
        CardContainerImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CardContainerImpl implements CardContainer {
    protected static final String RESOURCE_TYPE = "sunlife/core/components/card-container/footer/v1/card-container";

    @ValueMapValue
    private String name;

    @ValueMapValue
    private String cardType;

    @ValueMapValue
    private String horizontalHeightControl;

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

    public String getName() {
        return name;
    }

    public String getCardType() {
        return cardType;
    }

    public String getHorizontalHeightControl() {
        return horizontalHeightControl;
    }

    public Boolean getHorizontalMultipleClickable() {
        return horizontalMultipleClickable;
    }

    public Boolean getHorizontalMultipleWithIcon() {
        return horizontalMultipleWithIcon;
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
}
