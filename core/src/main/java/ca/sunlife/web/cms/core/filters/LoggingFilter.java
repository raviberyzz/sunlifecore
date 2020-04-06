package ca.sunlife.web.cms.core.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.engine.EngineConstants;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Simple servlet filter component that logs incoming requests.
 */
@ Component (service = Filter.class, property = {
    Constants.SERVICE_DESCRIPTION + "=Demo to filter incoming requests",
    EngineConstants.SLING_FILTER_SCOPE + "=" + EngineConstants.FILTER_SCOPE_REQUEST,
    Constants.SERVICE_RANKING + ":Integer=-700"

})
public class LoggingFilter implements Filter {

  /** The logger. */
  private final Logger logger = LoggerFactory.getLogger(getClass());

  /**
   * (non-Javadoc).
   *
   * @param request
   *          the request
   * @param response
   *          the response
   * @param filterChain
   *          the filter chain
   * @throws IOException
   *           Signals that an I/O exception has occurred.
   * @throws ServletException
   *           the servlet exception
   * @see javax.servlet.Filter#doFilter(javax.servlet.ServletRequest, javax.servlet.ServletResponse,
   *      javax.servlet.FilterChain)
   */
  @ Override
  public void doFilter(final ServletRequest request, final ServletResponse response,
      final FilterChain filterChain) throws IOException, ServletException {

    final SlingHttpServletRequest slingRequest = (SlingHttpServletRequest) request;
    logger.debug("request for {}, with selector {}",
        slingRequest.getRequestPathInfo().getResourcePath(),
        slingRequest.getRequestPathInfo().getSelectorString());

    filterChain.doFilter(request, response);
  }

  /**
   * (non-Javadoc).
   *
   * @param filterConfig
   *          the filter config
   * @see javax.servlet.Filter#init(javax.servlet.FilterConfig)
   */
  @ Override
  public void init(final FilterConfig filterConfig) {
    logger.debug("Initializing Logging filter");
  }

  /**
   * (non-Javadoc).
   *
   * @see javax.servlet.Filter#destroy()
   */
  @ Override
  public void destroy() {
    logger.debug("Destroying Logging filter");
  }

}
