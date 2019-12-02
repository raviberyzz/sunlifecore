package com.sunlife.core.listeners;

import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.LoginException;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventConstants;
import org.osgi.service.event.EventHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sunlife.core.services.SiteConfigService;

@Component(service = EventHandler.class, 
		property = {
				EventConstants.EVENT_TOPIC + "=org/apache/sling/api/resource/Resource/*",
				EventConstants.EVENT_FILTER + "(&amp;(path=/content/sunlife/config/*)(resourceType=sunlife/core/components/common/configuration)"
		})
public class ConfigListener implements EventHandler {

	private final Logger logger = LoggerFactory.getLogger(getClass());
	@Reference
	private SiteConfigService configService;
	@Override
	public void handleEvent(Event event) {
		logger.info("event handler called");
		try {
			configService.setConfiguration();
		} catch (LoginException | RepositoryException e) {
			logger.error("Error :: hanlder :: {}", e);
		}
	}
	

}
