package ca.sunlife.web.cms.core.models.v1;

public interface DynamicCardContainer {

    public String getCardType();

    public String getSpacing();

    public String getHorizontalHeightControl();

    public Boolean getHorizontalMultipleCard();

    public Boolean getHorizontalClickable();

    public Boolean getHorizontalIconCard();

    public String getVerticalHeightControl();

    public Boolean getVerticalMultipleCard();

    public Boolean getVerticalClickable();

    public Boolean getVerticalIconCard();

    public Boolean getLargeAvatarSize();

    public Boolean getAvatarWithBody();

    public Boolean getAvatarMultipleCard();

    public String getBannerImagePosition();
    
    public String getMediaType();

    public Boolean getSegmentedMultipleCard();

    public Boolean getSegmentedformContainer();

    public Boolean getStatisticsMultipleCard();
}
