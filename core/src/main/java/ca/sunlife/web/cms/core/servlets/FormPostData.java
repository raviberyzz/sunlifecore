package ca.sunlife.web.cms.core.servlets;

import java.io.IOException;
import java.util.Base64;
import java.util.Enumeration;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@ Component (service = Servlet.class, property = {
	    Constants.SERVICE_DESCRIPTION + "=POST Servlet",
	    "sling.servlet.methods=" + HttpConstants.METHOD_POST,
	    "sling.servlet.resourceTypes=" + "sunlife/core/components/config/post-redirection",
	    "sling.servlet.extensions=service", "sling.servlet.selectors=config" })
public class FormPostData  extends SlingAllMethodsServlet {
	
	 /** The Constant serialVersionUID. */
	  private static final long serialVersionUID = 1L;

	  /** The Constant LOG. */
	  private static final Logger LOG = LoggerFactory.getLogger(FormPostData.class);
	  
	  
	  @ Override
	  public void doPost(final SlingHttpServletRequest request, final SlingHttpServletResponse response)
	      throws ServletException, IOException {
	    StringBuilder postData = new StringBuilder();
		String submitURL = "";
		postData.append("{");
	    
	    	Enumeration paramNames = request.getParameterNames();	    	
	        while(paramNames.hasMoreElements()) {
	           String paramName = (String)paramNames.nextElement();
	           String paramValue = request.getParameter(paramName);	
			   if(paramName.equals("submitURL"))
				   submitURL = paramValue;
	           postData.append("\"").append(paramName).append("\"");
			   postData.append(":").append("\"").append(paramValue).append("\"");
			   postData.append(",");
	        }
			if( postData.length() > 1 )
				postData.deleteCharAt( postData.length() - 1 );
			postData.append("}");
			LOG.debug("Processing request"+postData.toString());
			String encodedData = Base64.getEncoder().encodeToString(postData.toString().getBytes("utf-8"));
	        Cookie cookie = new Cookie("redirectData",encodedData);
			cookie.setPath("/");
	        response.addCookie(cookie);
			String redirect = request.getParameter("redirectURL") != null ? request.getParameter("redirectURL") : "";
			submitURL = submitURL.isEmpty() ? redirect : submitURL;
	        response.sendRedirect(submitURL);
	  }

	  /*
	   * (non-Javadoc)
	   * @see org.apache.sling.api.servlets.SlingSafeMethodsServlet#doGet(org.apache.sling.
	   * api.SlingHttpServletRequest, org.apache.sling.api.SlingHttpServletResponse)
	   */
	  @ Override
	  public void doGet(final SlingHttpServletRequest request, final SlingHttpServletResponse response)
	      throws ServletException, IOException {
	    doPost(request, response);
	  }

}
