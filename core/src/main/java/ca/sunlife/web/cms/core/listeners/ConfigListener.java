/*
 *
 */

package ca.sunlife.web.cms.core.listeners;

import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.LoginException;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventConstants;
import org.osgi.service.event.EventHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.replication.ConfigManager.ConfigEvent;

import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * The listener interface for receiving config events. The class that is interested in processing a
 * config event implements this interface, and the object created with that class is registered with
 * a component using the component's <code>addConfigListener</code> method. When the config event
 * occurs, that object's appropriate method is invoked.
 *
 * @see ConfigEvent
 */
@ Component (service = EventHandler.class, property = {
    EventConstants.EVENT_TOPIC + "=org/apache/sling/api/resource/Resource/*",
    EventConstants.EVENT_FILTER
        + "(&amp;(path=/content/sunlife/config/*)(resourceType=sunlife/core/components/config/configuration))" })
public class ConfigListener implements EventHandler {

  /** The logger. */
  private final Logger logger = LoggerFactory.getLogger(getClass());

  /** The config service. */
  @ Reference
  private SiteConfigService configService;

  /**
   * (non-Javadoc).
   *
   * @param event
   *          the event
   * @see org.osgi.service.event.EventHandler#handleEvent(org.osgi.service.event.Event)
   */
  @ Override
  public void handleEvent(final Event event) {
    if (! event.getProperty("path").toString().startsWith("/content/sunlife/config")
        || ! event.getProperty("resourceType").toString()
            .equalsIgnoreCase("sunlife/core/components/config/configuration")) {
      return;
    }
    logger.info("event handler called {}", event);
    try {
      configService.setConfiguration();
    } catch (LoginException | RepositoryException e) {
      logger.error("Error :: hanlder :: {}", e);
    }
  }

}
