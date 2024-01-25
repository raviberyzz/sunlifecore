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
	  
   /** The Constant Information Icon */
   public static final String infoIcon = "fa-info sl-icon_color_information";
   
   /** The Constant Success Icon */
   public static final String successIcon = "fa-check-circle-yes sl-icon_color_success";

    /** The Constant Warning Icon */
    public static final String warningIcon = "fa-exclamation-circle sl-icon_color_warning";
   
    /** The Constant Error Icon */
    public static final String errorIcon = "fa-exclamation-triangle sl-icon_color_error";

}
