package ca.sunlife.web.cms.core.listeners;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.osgi.service.event.Event;

import ca.sunlife.web.cms.core.services.SiteConfigService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * @author mo92
 * The class ConfigListenerTest.
 */
@ ExtendWith (AemContextExtension.class)
public class ConfigListenerTest {
	
	/**
	 * The config service.
	 */
	@ Mock
	private SiteConfigService configService;
	
	/**
	 * The config listener.
	 */
	@ InjectMocks
	private ConfigListener configListener;
	
	/**
	 * The event.
	 */
	@Mock
	private Event event;
	
	/**
	 * Sets up tests.
	 */
	@ BeforeEach
	void setup() {
		MockitoAnnotations.initMocks(this);
	}
	
	/**
	 * Tests handleEvent method.
	 */
	@ Test
	void testHandleEvent() {
		configListener.handleEvent(event);
	}
}
