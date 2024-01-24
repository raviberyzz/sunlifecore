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

import ca.sunlife.web.cms.core.models.v1.Card;
import ca.sunlife.web.cms.core.models.v1.CardContainer;

@Model(adaptables = { Resource.class }, adapters = { Card.class }, resourceType = {
        CardImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CardImpl implements Card {
    protected static final String RESOURCE_TYPE = "sunlife/core/components/content/core-card/v1/card";

    @SlingObject
    private Resource card;

    @ChildResource
    private Resource comboList;

    private CardContainer cardContainer;

    @PostConstruct
    private void init() {
        if (card != null && card.getParent() != null) {
            cardContainer = card.getParent().adaptTo(CardContainer.class);
        }
    }

    @Override
    public CardContainer getCardContainer() {
        return cardContainer;
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

}
