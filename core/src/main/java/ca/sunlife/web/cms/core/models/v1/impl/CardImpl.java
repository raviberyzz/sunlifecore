package ca.sunlife.web.cms.core.models.v1.impl;

import javax.annotation.PostConstruct;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

import ca.sunlife.web.cms.core.models.v1.Card;
import ca.sunlife.web.cms.core.models.v1.CardContainer;

@Model(adaptables = { Resource.class }, adapters = { Card.class }, resourceType = {
        CardImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CardImpl implements Card {
    protected static final String RESOURCE_TYPE = "sunlife/core/components/content/card/v1/card";

    @SlingObject
    private Resource card;

    private CardContainer cardContainer;

    @PostConstruct
    private void init() {
        if (card != null && card.getParent() != null) {
            cardContainer = card.getParent().adaptTo(CardContainer.class);
        }
    }

    public CardContainer getCardContainer() {
        return cardContainer;
    }
}
