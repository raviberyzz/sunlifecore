package ca.sunlife.web.cms.core.models.v1.impl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith({ AemContextExtension.class })
public class NotificationImplTest {

    private final AemContext context = new AemContext();
    NotificationImpl notification;

    @BeforeEach
    public void setUp(AemContext context) throws Exception{
        context.addModelsForClasses(NotificationImpl.class);
        context.load().json("/ca/sunlife/web/cms/core/models/v1/notification/notification.json", "/content");
    }

    @Test
	void testGetterMethods() {		
		context.currentResource("/content/notification");
    	notification = context.request().adaptTo(NotificationImpl.class);
    	assertEquals("warning", notification.getNotificationType());
        assertEquals("Sample notification heading", notification.getNotificationHeading());
        assertEquals("Sample button title", notification.getButtonTitle());
        assertEquals("/content/sunlife/external/ca/en/explore-products/insurance", notification.getButtonURL());
    	assertEquals("Sample accessibility label", notification.getAccessibilityLabel());
    	assertEquals("Sample data title", notification.getDataTitle());
    	assertEquals("mb-sl12", notification.getSpacing());    	
	}
}
