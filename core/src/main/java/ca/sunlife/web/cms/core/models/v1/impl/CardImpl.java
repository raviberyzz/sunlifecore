package ca.sunlife.web.cms.core.models.v1.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import javax.annotation.PostConstruct;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import ca.sunlife.web.cms.core.models.v1.Card;
import ca.sunlife.web.cms.core.models.v1.DynamicCardContainer;

@Model(adaptables = { Resource.class }, adapters = { Card.class }, resourceType = {
        CardImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CardImpl implements Card {
    protected static final String RESOURCE_TYPE = "sunlife/core/components/content/core-card/v1/card";

    @SlingObject
    private Resource card;

    @ChildResource
    private Resource comboList;

    private DynamicCardContainer dynamicCardContainer;

    @PostConstruct
    private void init() {
        if (card != null && card.getParent() != null) {
            dynamicCardContainer = card.getParent().adaptTo(DynamicCardContainer.class);
        }
    }

    @Override
    public DynamicCardContainer getCardContainer() {
        return dynamicCardContainer;
    }

    @Override
    public List<HashMap<String, String>> getComboList() {
        List<HashMap<String, String>> comboItemList = new ArrayList<>();
        if (comboList != null) {
            Iterator<Resource> comboListIterator = comboList.listChildren();
            while (comboListIterator.hasNext()) {
                Resource comboItem = comboListIterator.next();
                HashMap<String, String> comboMap = new HashMap<>();
                comboMap.put("title", comboItem.getValueMap().get("title").toString());
                comboItemList.add(comboMap);
            }
        }
        return comboItemList;
    }

    @ValueMapValue
    private String cardHeading;

    public String getCardHeading() {
        return cardHeading;
    }

    @ValueMapValue
    private String cardDescription;

    public String getCardDescription() {
        return cardDescription;
    }

    @ValueMapValue
    private String cardCaption;

    public String getCardCaption() {
        return cardCaption;
    }

    @ValueMapValue
    private String cardCategory;

    public String getCardCategory() {
        return cardCategory;
    }

    @ValueMapValue
    private String cardBadgeText;

    public String getCardBadgeText() {
        return cardBadgeText;
    }

    @ValueMapValue
    private String cardBadgeType;

    public String getCardBadgeType() {
        return cardBadgeType;
    }

    @ValueMapValue
    private String assetType;

    public String getAssetType() {
        return assetType;
    }

    @ValueMapValue
    private String cardImageFileReference;

    public String getCardImageFileReference() {
        return cardImageFileReference;
    }

    @ValueMapValue
    private String cardIcon;

    public String getCardIcon() {
        return cardIcon;
    }

    @ValueMapValue
    private String ctaType;

    public String getCtaType() {
        return ctaType;
    }

    @ValueMapValue
    private String cardBtnLabel;

    public String getCardBtnLabel() {
        return cardBtnLabel;
    }

    @ValueMapValue
    private String cardBtnURL;

    public String getCardBtnURL() {
        return cardBtnURL;
    }

    @ValueMapValue
    private String cardBtnIconType;

    public String getCardBtnIconType() {
        return cardBtnIconType;
    }

    @ValueMapValue
    private String cardBtnTarget;

    public String getCardBtnTarget() {
        return cardBtnTarget;
    }

    @ValueMapValue
    private String cardLinkLabel;

    public String getCardLinkLabel() {
        return cardLinkLabel;
    }

    @ValueMapValue
    private String cardLinkURL;

    public String getCardLinkURL() {
        return cardLinkURL;
    }

    @ValueMapValue
    private String cardLinkIconType;

    public String getCardLinkIconType() {
        return cardLinkIconType;
    }

    @ValueMapValue
    private String cardLinkTarget;

    public String getCardLinkTarget() {
        return cardLinkTarget;
    }
    
}
