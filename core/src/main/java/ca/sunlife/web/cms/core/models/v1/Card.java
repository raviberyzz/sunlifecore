package ca.sunlife.web.cms.core.models.v1;

import java.util.HashMap;
import java.util.List;

public interface Card {
    public DynamicCardContainer getCardContainer();

    public List<HashMap<String, String>> getComboList();

    public String getCardHeading();

    public String getCardHeadingType();

    public String getCardDescription();

    public String getCardCaption();

    public String getCardCategory();

    public String getCardBadgeText();

    public String getCardBadgeType();

    public String getAssetType(); 

    public String getCardImageFileReference();

    public String getAltText();

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

    public String getCardClickableLinkURL();

    public String getCardClickableLinkTarget();

    public String getName();

    public String getAvatarHeadingType();

    public String getJobTitle();

    public String getQuote();

    public String getBannerHeading();

    public String getBannerHeadingType();

    public String getBannerDescription();

    public String getBannerCaption();

    public Boolean getBannerFormContainer();

    public String getBannerImageHeading();

    public String getBannerImageHeadingType();

    public String getBannerImageDescription();

    public String getBannerImageCaption();

    public String getMediaHeading();

    public String getMediaHeadingType();

    public String getMediaDescription();

    public String getSegmentHeading();

    public String getSegmentHeadingType();

    public String getSegmentDescription();

    public Boolean getSegmentCardFormContainer();

    public String getStatisticHeading();

    public String getStatisticHeadingType();

    public String getStatisticDescription();

    public String getStatisticCaption();

    public String getDataTitle();
    
}