/*
 *
 */

package ca.sunlife.web.cms.core.services.impl;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.replication.AgentConfig;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.ReplicationResult;
import com.day.cq.replication.ReplicationTransaction;
import com.day.cq.replication.TransportContext;
import com.day.cq.replication.TransportHandler;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.services.AkamaiCacheClear;

/**
 * The Class AkamaiTransportHandler.
 *
 * @author TCS
 * @version 1.0
 */
@ Component (service = TransportHandler.class, immediate = true)
public class AkamaiTransportHandler implements TransportHandler {

  /** The akamai cache. */
  @ Reference
  private AkamaiCacheClear akamaiCache;

  /** The Constant LOGGER. */
  private static final Logger LOGGER = LoggerFactory.getLogger(AkamaiTransportHandler.class);

  /** The Constant AKAMAI_PROTOCOL. */
  private static final String AKAMAI_PROTOCOL = "akamai://";

  /*
   * (non-Javadoc)
   * @see com.day.cq.replication.TransportHandler#canHandle(com.day.cq.replication.AgentConfig)
   */
  @ Override
  public boolean canHandle(final AgentConfig config) {
    final String transportURI = config.getTransportURI();

    return transportURI != null && transportURI.startsWith(AKAMAI_PROTOCOL);
  }

  /*
   * (non-Javadoc)
   * @see com.day.cq.replication.TransportHandler#deliver(com.day.cq.replication.TransportContext,
   * com.day.cq.replication.ReplicationTransaction)
   */
  @ Override
  public ReplicationResult deliver(final TransportContext ctx, final ReplicationTransaction tx)
      throws ReplicationException {

    final ReplicationActionType replicationType = tx.getAction().getType();

    if (replicationType == ReplicationActionType.TEST) {
      return ReplicationResult.OK;
    } else if (replicationType == ReplicationActionType.ACTIVATE
        || replicationType == ReplicationActionType.DEACTIVATE
        || replicationType == ReplicationActionType.DELETE) {
      LOGGER.info("Replication  Type in Akamai Handler: {}", replicationType);
      final String resourcePath = tx.getAction().getPath();
      if (resourcePath.startsWith("/content")) {
        return doActivate(resourcePath);
      } else {
        return ReplicationResult.OK;
      }
    } else {
      throw new ReplicationException(
          "Replication action type " + replicationType + " not supported.");
    }
  }

  /**
   * Do activate.
   *
   * @param path
   *          the path
   * @return the replication result
   */
  private ReplicationResult doActivate(final String path) {
    LOGGER.info("Inside doActivate of Akamai");
    LOGGER.debug("Processing paths {} ", path);
    try {
      if (path.startsWith("/content/dam")) {
        final String response = akamaiCache.invalidateAssets(new String [ ] { path });
        LOGGER.debug("AKAMAI Response {}", response);
      } else {
        final String response = akamaiCache.invalidatePages(new String [ ] { path });
        LOGGER.debug("AKAMAI Response {}", response);
      }
    } catch (final ApplicationException e) {
      LOGGER.error("Error while processing request {}", e);
    }
    return ReplicationResult.OK;
  }

}
