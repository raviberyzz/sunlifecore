/**
 * 
 */
package ca.sunlife.web.cms.core.servlets;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashSet;

import javax.servlet.Servlet;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
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
  
  /** The Constant TIME_OUT. */
  private static final int TIME_OUT = 36000;
  
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
      String uri = agent.getConfiguration().getTransportURI();
      if(agent.isEnabled() && agent.getConfiguration().getSerializationType().equalsIgnoreCase("flush") && StringUtils.isNotEmpty(uri) &&
          (uri.startsWith("http://") || uri.startsWith("https://"))) {
        dispatchers.add(uri);
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
          RequestConfig reqConfig = RequestConfig.custom()
              .setConnectTimeout(TIME_OUT)
              .setConnectionRequestTimeout(TIME_OUT)
              .setSocketTimeout(TIME_OUT).build();
          CloseableHttpClient client = HttpClientBuilder.create().setDefaultRequestConfig(reqConfig).build();
          HttpPost post = new HttpPost(uri);
          post.addHeader("CQ-Action", "Delete");
          post.addHeader("CQ-Handle", path.trim());
          post.addHeader("Host", domain);
          post.setEntity(new StringEntity(path.trim()));
          final CloseableHttpResponse res = client.execute(post);
          String responseText = IOUtils.toString(res.getEntity().getContent(), StandardCharsets.UTF_8);
          LOGGER.debug("result : {}", responseText);
          res.close();
          client.close();
        }
      }
    }
  }
}
