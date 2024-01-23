package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The NotificationModel is a sling model associated with Notification component. 
 *
 * @author Sunlife
 */

 @Model(adaptables = {
    Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = NotificationModel.RESOURCE_TYPE)
public interface NotificationModel {

    String RESOURCE_TYPE = "sunlife/core/components/content/core-notification";

    @ValueMapValue
    String getNotificationType();

    @ValueMapValue
    String getNotificationHeading();

    @ValueMapValue
    String getText();

    @ValueMapValue
    String getDisplayNotificationButton();

    @ValueMapValue
    String getButtonTitle();

    @ValueMapValue
    String getButtonLink();

    @ValueMapValue
    String getButtonTarget();

    @ValueMapValue
    String getAccessibilityLabel();

    @ValueMapValue
    String getDataTitle();

    @ValueMapValue
    String getSpacing();

    

}
