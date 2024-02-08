package ca.sunlife.web.cms.core.models.v1;

import java.util.HashMap;
import java.util.List;

public interface Card {
    public DynamicCardContainer getCardContainer();

    public List<HashMap<String, String>> getComboList();

    public String getCardHeading();

    public String getCardDescription();

    public String getCardCaption();

    public String getCardCategory();

    public String getCardBadgeText();

    public String getCardBadgeType();

    public String getAssetType(); 

    public String getCardImageFileReference();

    public String getCardIcon();

    public String getCtaType(); 

    public String getCardBtnLabel();

    public String getCardBtnURL();

    public String getCardBtnIconType();

    public String getCardBtnTarget();

    public String getCardLinkLabel();

    public String getCardLinkURL(); 

    public String getCardLinkIconType();

    public String getCardLinkTarget();

}