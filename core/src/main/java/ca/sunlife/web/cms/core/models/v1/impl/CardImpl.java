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

import lombok.Getter;

import ca.sunlife.web.cms.core.models.v1.Card;
import ca.sunlife.web.cms.core.models.v1.DynamicCardContainer;

@Model(adaptables = { Resource.class }, adapters = { Card.class }, resourceType = {
        CardImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CardImpl implements Card {
    protected static final String RESOURCE_TYPE = "sunlife/core/components/content/core-card/v1/card";
	
	private static final String TITLE = "title";

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
                comboMap.put(TITLE, comboItem.getValueMap().get(TITLE, String.class));
                comboItemList.add(comboMap);
            }
        }
        return comboItemList;
    }

    @ValueMapValue
	@Getter
    private String cardHeading;

    @ValueMapValue
	@Getter
    private String cardHeadingType;  

    @ValueMapValue
	@Getter
    private String cardDescription;   

    @ValueMapValue
	@Getter
    private String cardCaption;  

    @ValueMapValue
	@Getter
    private String cardCategory;  

    @ValueMapValue
	@Getter
    private String cardBadgeText;   

    @ValueMapValue
	@Getter
    private String cardBadgeType;   

    @ValueMapValue
	@Getter
    private String assetType;  

    @ValueMapValue
	@Getter
    private String cardImageFileReference;  

    @ValueMapValue
	@Getter
    private String altText; 

    @ValueMapValue
	@Getter
    private String cardIcon;  

    @ValueMapValue
	@Getter
    private String ctaType;  

    @ValueMapValue
	@Getter
    private String cardBtnLabel;
   
    @ValueMapValue
	@Getter
    private String cardBtnURL; 

    @ValueMapValue
	@Getter
    private String cardBtnIconType;

    @ValueMapValue
	@Getter
    private String cardBtnTarget;

    @ValueMapValue
	@Getter
    private String cardLinkLabel;  

    @ValueMapValue
	@Getter
    private String cardLinkURL;  

    @ValueMapValue
	@Getter
    private String cardLinkIconType;

    @ValueMapValue
	@Getter
    private String cardLinkTarget;  

    @ValueMapValue
	@Getter
    private String cardClickableLinkURL; 

    @ValueMapValue
	@Getter
    private String cardClickableLinkTarget;

    @ValueMapValue
	@Getter
    private String name;

    @ValueMapValue
	@Getter
    private String avatarHeadingType;

    @ValueMapValue
	@Getter
    private String jobTitle;

    @ValueMapValue
	@Getter
    private String quote;

    @ValueMapValue
	@Getter
    private String bannerHeading;

    @ValueMapValue
	@Getter
    private String bannerHeadingType;

    @ValueMapValue
	@Getter
    private String bannerDescription;
  
    @ValueMapValue
	@Getter
    private String bannerCaption;

    @ValueMapValue
	@Getter
    private Boolean bannerFormContainer;

    @ValueMapValue
	@Getter
    private String bannerImageHeading;

    @ValueMapValue
	@Getter
    private String bannerImageHeadingType;  

    @ValueMapValue
	@Getter
    private String bannerImageDescription;

    @ValueMapValue
	@Getter
    private String bannerImageCaption; 

    @ValueMapValue
	@Getter
    private String mediaHeading;

    @ValueMapValue
	@Getter
    private String mediaHeadingType;

    @ValueMapValue
	@Getter
    private String mediaDescription;

    @ValueMapValue
	@Getter
    private String mediaWatchTime;

    @ValueMapValue
	@Getter
    private String segmentHeading;

    @ValueMapValue
	@Getter
    private String segmentHeadingType;

    @ValueMapValue
	@Getter
    private String segmentDescription;

    @ValueMapValue
	@Getter
    private Boolean segmentCardFormContainer;

    @ValueMapValue
	@Getter
    private String statisticHeading;

    @ValueMapValue
	@Getter
    private String statisticHeadingType;

    @ValueMapValue
	@Getter
    private String statisticDescription;  

    @ValueMapValue
	@Getter
    private String statisticCaption;

    @ValueMapValue
	@Getter
    private String dataTitle;
    
}
