package ca.sunlife.web.cms.core.filters;

import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.day.cq.replication.Agent;
import com.day.cq.replication.AgentConfig;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * @author mo92 The Class DispatcherReplicationAgentFilterTest
 */
@ ExtendWith (AemContextExtension.class)
public class DispatcherReplicationAgentFilterTest {

	@ InjectMocks
	private DispatcherReplicationAgentFilter agentFilter;
	
	@ Mock
	private Agent agent;
	
	@ Mock
	private AgentConfig agentConfig;
	
	@ BeforeEach
  public void setup() {
    MockitoAnnotations.initMocks(this);
  }
	
	@ Test
  void testIsIncluded() {
		when(agent.getConfiguration()).thenReturn(agentConfig);
		when(agent.getConfiguration().getSerializationType()).thenReturn("flush");
		when(agent.isEnabled()).thenReturn(true);
		agentFilter.isIncluded(agent);
	}
}
