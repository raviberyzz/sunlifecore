package ca.sunlife.web.cms.core.models.v1;

import java.util.HashMap;
import java.util.List;
public interface Card {
    public CardContainer getCardContainer();

    public List<HashMap<String, String>> getComboList();
}