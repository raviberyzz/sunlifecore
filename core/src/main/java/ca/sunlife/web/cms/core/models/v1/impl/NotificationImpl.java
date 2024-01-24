package ca.sunlife.web.cms.core.models.v1.impl;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import lombok.Getter;

import ca.sunlife.web.cms.core.models.v1.NotificationModel;
import com.day.cq.wcm.api.Page;

@Model(adaptables = { Resource.class }, adapters = { NotificationModel.class }, resourceType = {
        NotificationImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class NotificationImpl implements NotificationModel {

    protected static final String RESOURCE_TYPE = "sunlife/core/components/content/core-notification/v1/notification";

    @ValueMapValue
    private String notificationType;

    @ValueMapValue
    private String notificationHeading;

    @ValueMapValue
    private String text;

    @ValueMapValue
    private String displayNotificationButton;

    @ValueMapValue
    private String buttonTitle;

    @ValueMapValue
    private String buttonLink;

    @ValueMapValue
    private String buttonTarget;

    @ValueMapValue
    private String accessibilityLabel;

    @ValueMapValue
    private String dataTitle;

    @ValueMapValue
    private String spacing;

    String infoIcon = "sl-icon fak fa-info sl-icon_color_information sl-icon_size_md";
    String successIcon = "sl-icon fak fa-check-circle-yes sl-icon_color_success sl-icon_size_md";
    String warningIcon = "sl-icon fak fa-exclamation-circle sl-icon_color_warning sl-icon_size_md";
    String dangerIcon = "sl-icon fak fa-exclamation-triangle sl-icon_size_md sl-icon_color_error";

   @Getter
   private String iconType;

    @PostConstruct
    private void initModel() {
        iconType = "";
        if (notificationType == "info") {
            this.iconType = infoIcon;
        }    
        if (notificationType == "success") {
            this.iconType = successIcon;
        }
        
        if (notificationType == "warning") {
            this.iconType = warningIcon;
        }
        
        if (notificationType == "danger") {
          this.iconType = dangerIcon;
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
    public String getDisplayNotificationButton() {
        return displayNotificationButton;
    }

    @Override
    public String getButtonTitle() {
        return buttonTitle;
    }

    @Override
    public String getButtonLink() {
        return buttonLink;
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

