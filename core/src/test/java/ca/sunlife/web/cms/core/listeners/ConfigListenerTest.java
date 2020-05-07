package ca.sunlife.web.cms.core.listeners;

import java.util.HashMap;
import java.util.Map;

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
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("path", "/content/sunlife/config/ca/en");
		map.put("resourceType", "sunlife/core/components/config/configuration");
		event = new Event("topic", map);
		configListener.handleEvent(event);
	}
}
