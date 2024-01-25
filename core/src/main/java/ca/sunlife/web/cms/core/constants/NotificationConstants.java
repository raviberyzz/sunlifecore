package ca.sunlife.web.cms.core.constants;

/**
 * The Class NotificationConstants.
 *
 * @author TCS
 * @version 1.0
 */
public class NotificationConstants {
	
   /**
	 * Instantiates notification icon constants.
	 */
   private NotificationConstants() {
	  throw new IllegalStateException("NotificationConstants class");
   }
	  
   /** The Constant Notification Information Icon */
    public static final String INFO_ICON = "fa-info sl-icon_color_information";
   
   /** The Constant Notification Success Icon */
    public static final String SUCCESS_ICON = "fa-check-circle-yes sl-icon_color_success";

    /** The Constant Notification Warning Icon */
    public static final String WARNING_ICON = "fa-exclamation-circle sl-icon_color_warning";
   
    /** The Constant Notification Error Icon */
    public static final String ERROR_ICON = "fa-exclamation-triangle sl-icon_color_error";

}
