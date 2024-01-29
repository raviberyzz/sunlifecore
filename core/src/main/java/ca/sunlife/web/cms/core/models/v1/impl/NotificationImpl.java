package ca.sunlife.web.cms.core.models.v1.impl;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import lombok.Getter;

import ca.sunlife.web.cms.core.constants.NotificationConstants;
import ca.sunlife.web.cms.core.models.v1.Notification;

@Model(adaptables = { Resource.class }, adapters = { Notification.class }, resourceType = {
        NotificationImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class NotificationImpl implements Notification {

    protected static final String RESOURCE_TYPE = "sunlife/core/components/content/core-notification/v1/notification";

    @ValueMapValue
    private String notificationType;

    @ValueMapValue
    private String notificationHeading;

    @ValueMapValue
    private String text;

    @ValueMapValue
    private String buttonTitle;

    @ValueMapValue
    private String buttonURL;

    @ValueMapValue
    private String buttonTarget;

    @ValueMapValue
    private String accessibilityLabel;

    @ValueMapValue
    private String dataTitle;

    @ValueMapValue
    private String spacing;


   @Getter
   private String iconType;

    @PostConstruct
    private void initModel() {
        if(notificationType != null){
			if (notificationType.equals("info") ) {
				this.iconType = NotificationConstants.INFO_ICON;
			}    
			if (notificationType.equals("success")) {
				this.iconType = NotificationConstants.SUCCESS_ICON;
			}			
			if (notificationType.equals("warning")) {
				this.iconType = NotificationConstants.WARNING_ICON;
			}			
			if (notificationType.equals("danger")) {
			  this.iconType = NotificationConstants.ERROR_ICON;
			}  
		}
    }

    @Override
    public String getNotificationType() {
        return notificationType;
    }

    @Override
    public String getNotificationHeading() {
        return notificationHeading;
    }

    @Override
    public String getText() {
        return text;
    }

    @Override
    public String getButtonTitle() {
        return buttonTitle;
    }

    @Override
    public String getButtonURL() {
        return buttonURL;
    }

    @Override
    public String getButtonTarget() {
        return buttonTarget;
    }

    @Override
    public String getAccessibilityLabel() {
        return accessibilityLabel;
    }

    @Override
    public String getDataTitle() {
        return dataTitle;
    }

    @Override
    public String getSpacing() {
        return spacing;
    }
}

