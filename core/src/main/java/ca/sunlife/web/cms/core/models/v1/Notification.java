package ca.sunlife.web.cms.core.models.v1;


 public interface Notification {

    String getNotificationType();

    String getNotificationHeading();

    String getText();

    String getButtonTitle();

    String getButtonURL();

    String getButtonTarget();

    String getButtonAccessibilityLabel();

    String getAccessibilityLabel();

    String getDataTitle();

    String getSpacing();

}
