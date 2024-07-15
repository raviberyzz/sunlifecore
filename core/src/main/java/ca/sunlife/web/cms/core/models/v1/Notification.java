package ca.sunlife.web.cms.core.models.v1;


 public interface Notification {

    String getNotificationType();

    String getNotificationHeading();

    String getText();

    Boolean getMultiline();

    String getButtonTitle();

    String getButtonURL();

    String getButtonTarget();

    String getButtonAccessibilityLabel();

    String getAccessibilityLabel();

    String getDataTitle();

    String getSpacing();

    /**
     * Retrieves the type of link from the value map.
     *
     * The link type indicates whether the link is an internal link, an external link,
     * or a link to a PDF document.
     *
     * @return the link type as a {@code String}.
     *
     */
    String getLinkType();

}
