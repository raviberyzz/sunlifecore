/**
 * 
 */
package ca.sunlife.web.cms.core.servlets;

import java.io.IOException;
import java.util.HashSet;

import javax.servlet.Servlet;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.StringRequestEntity;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.replication.Agent;
import com.day.cq.replication.AgentManager;

/**
 * The Class DispatcherCacheClearServlet.
 *
 * @author TCS
 */
@ Component (service = Servlet.class, property = {
    Constants.SERVICE_DESCRIPTION + "=Dispatcher Cache Clear Servlet",
    "sling.servlet.methods=" + HttpConstants.METHOD_POST,
    "sling.servlet.resourceTypes=" + "sunlife/core/components/config/dispatcher-cache-clear",
    "sling.servlet.extensions=service", "sling.servlet.selectors=config" })
public class DispatcherCacheClearServlet extends SlingAllMethodsServlet {

  /** The Constant serialVersionUID. */
  private static final long serialVersionUID = 1L;
  
  /** The Constant LOGGER. */
  private static final Logger LOGGER = LoggerFactory.getLogger(DispatcherCacheClearServlet.class);
  
  /** The agent manager. */
  @Reference
  private transient AgentManager agentManager;
  
  /** The dispatchers. */
  private final HashSet<String> dispatchers = new HashSet<>();
  
  /**
   * Activate.
   */
  @Activate
  public void activate() {
    for (final Agent agent : agentManager.getAgents().values()) {
      if(agent.isEnabled() && agent.getConfiguration().getSerializationType().equalsIgnoreCase("flush") && agent.getConfiguration().getTransportURI().startsWith("http")) {
        dispatchers.add(agent.getConfiguration().getTransportURI());
      }
    }
    LOGGER.debug("Got dispatcher agents {}", dispatchers);
  }
  
  /* (non-Javadoc)
   * @see org.apache.sling.api.servlets.SlingAllMethodsServlet#doPost(org.apache.sling.api.SlingHttpServletRequest, org.apache.sling.api.SlingHttpServletResponse)
   */
  @ Override
  public void doPost(final SlingHttpServletRequest request, final SlingHttpServletResponse response)
      throws IOException {
    String paths = request.getParameter("paths");
    String domain = request.getParameter("domain");
    if(StringUtils.isNotBlank(domain) && StringUtils.isNotBlank(paths)) {
      for(String path:paths.split(",")) {
        LOGGER.debug("Invalidating path {} for domain {}", path, domain);
        for(String uri: dispatchers) {
          LOGGER.debug("Invalidating dispatcher {}", uri);
          HttpClient client = new HttpClient();
          PostMethod post = new PostMethod(uri);
          post.setRequestHeader("CQ-Action", "Delete");
          post.setRequestHeader("CQ-Handle", path.trim());
          post.setRequestHeader("CQ-Host", domain);
          StringRequestEntity body = new StringRequestEntity(path.trim(), null, null);
          post.setRequestEntity(body);
          post.setRequestHeader("Content-length", String.valueOf(body.getContentLength()));
          client.executeMethod(post);
          LOGGER.debug("result : {}", post.getResponseBodyAsString());
          post.releaseConnection();
        }
      }
    }
  }
}
