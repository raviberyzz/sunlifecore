/**
 * 
 */
package ca.sunlife.web.cms.core.servlets;

import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.jcr.RepositoryException;
import javax.servlet.ServletException;

import org.apache.commons.httpclient.HttpException;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.LoginException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.day.cq.replication.Agent;
import com.day.cq.replication.AgentConfig;
import com.day.cq.replication.AgentManager;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * @author yj50
 *
 */
@ ExtendWith (AemContextExtension.class)
public class DispatcherCacheClearServletTest {

	@ Mock
	private SlingHttpServletRequest request;
	
	@ Mock
	private SlingHttpServletResponse response;
	
	@ InjectMocks
	private DispatcherCacheClearServlet servlet;
	
	@ Mock
	private AgentManager agentManager;
	
	@Mock
	private AgentConfig agentConfig;
	
	@Mock
	private Agent agent;
	
	@ BeforeEach
	void setup() throws HttpException, IOException {
	  MockitoAnnotations.initMocks(this);
	  Map<String,Agent> agents = new HashMap<>(); 
	  agents.put("",agent);
	  when(agentManager.getAgents()).thenReturn(agents);
	  when(agent.isEnabled()).thenReturn(true);
	  when(agent.getConfiguration()).thenReturn(agentConfig);
	  when(agentConfig.getSerializationType()).thenReturn("flush");
	  when(agentConfig.getTransportURI()).thenReturn("http://test");
	}
	
	@ Test
	void testDoGet() throws RepositoryException, LoginException, IOException, ServletException {
	  //servlet.activate();
		when(request.getParameter("domain")).thenReturn("cmsdev-www.ca.sunlife");
		when(request.getParameter("paths")).thenReturn("/content");
		//when(servlet.getConfigValues("domain", "/en/home")).thenReturn("testval");
		servlet.doPost(request, response);
	}
	
}
