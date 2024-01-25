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

    protected static final String infoIcon = "fa-info sl-icon_color_information";
    protected static final String successIcon = "fa-check-circle-yes sl-icon_color_success";
    protected static final String warningIcon = "fa-exclamation-circle sl-icon_color_warning";
    protected static final String dangerIcon = "fa-exclamation-triangle sl-icon_color_error";

   @Getter
   private String iconType;

    @PostConstruct
    private void initModel() {
        if(notificationType != null){
			if (notificationType.equals("info") ) {
				this.iconType = infoIcon;
			}    
			if (notificationType.equals("success")) {
				this.iconType = successIcon;
			}			
			if (notificationType.equals("warning")) {
				this.iconType = warningIcon;
			}			
			if (notificationType.equals("danger")) {
			  this.iconType = dangerIcon;
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

