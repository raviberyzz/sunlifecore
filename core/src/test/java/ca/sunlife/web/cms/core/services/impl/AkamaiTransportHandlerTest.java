/**
 * 
 */
package ca.sunlife.web.cms.core.services.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.day.cq.replication.AgentConfig;
import com.day.cq.replication.ReplicationAction;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.ReplicationResult;
import com.day.cq.replication.ReplicationTransaction;
import com.day.cq.replication.TransportContext;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.services.AkamaiCacheClear;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * @author mo92 the class
 *         AkamaiTransportHandlerTest.
 */
@ ExtendWith(AemContextExtension.class)
public class AkamaiTransportHandlerTest {

	@ InjectMocks
	private AkamaiTransportHandler akamaiTransportHandler;

	@ Mock
	private AgentConfig agentConfig;

	@ Mock
	private AkamaiCacheClear akamaiCache;
	
	@ Mock
	private TransportContext ctx;

	@ Mock
	private ReplicationTransaction tx;
	
	@ Mock
	private ReplicationAction action;
	
	@ BeforeEach
	void setup() {
		MockitoAnnotations.initMocks(this);
	}

	@ Test
	void testCanHandle() {
		when(agentConfig.getTransportURI()).thenReturn("/bin/transport");
		assertTrue(!akamaiTransportHandler.canHandle(agentConfig));
		
		when(agentConfig.getTransportURI()).thenReturn("akamai://bin/transport");
		assertTrue(akamaiTransportHandler.canHandle(agentConfig));
	}
	
	@Test 
	void testDeliver() {
		try {
			when(tx.getAction()).thenReturn(action);
			when(action.getType()).thenReturn(ReplicationActionType.TEST);
			assertEquals(ReplicationResult.OK, akamaiTransportHandler.deliver(ctx, tx));
			
			when(action.getType()).thenReturn(ReplicationActionType.ACTIVATE);
			when(action.getPath()).thenReturn("/path/");
			assertEquals(ReplicationResult.OK, akamaiTransportHandler.deliver(ctx, tx));
			
			when(action.getType()).thenReturn(ReplicationActionType.DELETE);
			when(action.getPath()).thenReturn("/content/en/");
			assertEquals(ReplicationResult.OK, akamaiTransportHandler.deliver(ctx, tx));
			
			when(action.getPath()).thenReturn("/content/dam/en/");
			assertEquals(ReplicationResult.OK, akamaiTransportHandler.deliver(ctx, tx));
			
			when(action.getPath()).thenReturn("/content/dam/ca/en/");
			when(akamaiCache.invalidatePages(new String [ ] { "/content/dam/ca/en/" })).thenThrow(new ApplicationException());
			akamaiTransportHandler.deliver(ctx, tx);
		} catch (ReplicationException | ApplicationException e) {
			assertTrue(e instanceof ReplicationException | e instanceof ApplicationException);
		}
	}
}
