/**
 * 
 */
package com.sunlife.core.servlets;

import java.io.IOException;

import javax.jcr.RepositoryException;
import javax.servlet.Servlet;
import javax.servlet.ServletException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sunlife.core.services.SiteConfigService;

/**
 * @author 660717
 *
 */
@Component(service = Servlet.class, property={
        Constants.SERVICE_DESCRIPTION + "=Site Config Servlet",
        "sling.servlet.methods=" + HttpConstants.METHOD_GET,
        "sling.servlet.paths="+ "/bin/getSiteConfigs"
   })
public class SiteConfigServlet extends SlingSafeMethodsServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Logger log = LoggerFactory.getLogger(this.getClass());
	@Reference
	private SiteConfigService configService;
	
	@Override
	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
			throws ServletException, IOException {
		String name = null, path = null;
		try {
			name = request.getParameter("param");
			path = request.getParameter("path");
			response.getWriter().write("The value is: "+configService.getConfigValues(name, path));
		} catch (LoginException e) {
			log.error("Error :: SiteConfigServlet :: {}", e);
		} catch (RepositoryException e) {
			log.error("Error :: SiteConfigServlet :: {}", e);
		}
	}

	
}
