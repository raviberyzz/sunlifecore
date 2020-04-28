package ca.sunlife.web.cms.core.services.impl;

import java.io.IOException;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.akamai.edgegrid.signer.exceptions.RequestSigningException;
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
 */
@ Component (service = TransportHandler.class, immediate = true)
public class AkamaiTransportHandler implements TransportHandler {

  /** The akamai cache. */
  @ Reference
  private AkamaiCacheClear akamaiCache;

  /** Logger Instantiation for Akamai Transport Handler. */
  private static final Logger LOGGER = LoggerFactory.getLogger(AkamaiTransportHandler.class);

  /** Protocol for replication agent transport URI that triggers this transport handler. */
  private static final String AKAMAI_PROTOCOL = "akamai://";

  /**
   * {@inheritDoc}
   */
  @ Override
  public boolean canHandle(final AgentConfig config) {
    final String transportURI = config.getTransportURI();

    return transportURI != null && transportURI.startsWith(AKAMAI_PROTOCOL);
  }

  /**
   * {@inheritDoc}
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
   * @param ctx
   *          the ctx
   * @param tx
   *          the tx
   * @return the replication result
   * @throws ReplicationException
   *           the replication exception
   * @throws RequestSigningException
   *           the request signing exception
   * @throws IOException
   *           Signals that an I/O exception has occurred.
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
      return ReplicationResult.OK;
    } catch (final ApplicationException e) {
      return new ReplicationResult.OK;
    }
  }

}
