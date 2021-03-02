/**
 * 
 */
package ca.sunlife.web.cms.advisorhub.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.util.stream.Collectors;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.models.UserInfo;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.advisorhub.services.UGCService;

/**
 * The Class UGCServlet.
 *
 * @author TCS
 * @version 1.0
 */
@ Component(service = Servlet.class, property = { Constants.SERVICE_DESCRIPTION + "= UGC Services Servlet",
		"sling.servlet.methods=" + HttpConstants.METHOD_GET,
		"sling.servlet.methods=" + HttpConstants.METHOD_POST,
		"sling.servlet.resourceTypes=" + "sunlife/advisorhub/components/content/generic",
		"sling.servlet.extensions=json",
		"sling.servlet.selectors=ugc" })
public class UGCServlet extends SlingAllMethodsServlet {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The log. */
	private static final Logger LOGGER = LoggerFactory.getLogger(UGCServlet.class);

	/** The core resource resolver. */
	@ Reference
	private transient CoreResourceResolver coreResourceResolver;

	/** The UGC service. */
	@ Reference
	private transient UGCService ugcService;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.apache.sling.api.servlets.SlingSafeMethodsServlet#doGet(org.apache.sling.
	 * api.SlingHttpServletRequest, org.apache.sling.api.SlingHttpServletResponse)
	 */
	@ Override
	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
			throws ServletException, IOException {
		LOGGER.debug("Entry :: doGet method of Advisorhub UGC Servlet :: ");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json;charset=utf-8");
		PrintWriter writer = response.getWriter();
		String responseStr = null;
		try {
			if (request.getRequestPathInfo().getSelectors().length > 1) {
				LOGGER.debug("Entry to get selector method");
				UserInfo userInfoModel = request.adaptTo(UserInfo.class);
				LOGGER.trace("userInfoModel New :: {}", userInfoModel);
				responseStr = ugcService.callWebService(request.getRequestPathInfo().getSelectors()[1], "GET",
						userInfoModel, request.getParameterMap(), null);
				
				}
		
		} catch (ApplicationException | SystemException e) {
			LOGGER.error("Error :: doGet method of UGC Servlet :: {}", e);
		}
		writer.print(responseStr);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.apache.sling.api.servlets.SlingAllMethodsServlet#doPost(org.apache.sling.
	 * api.SlingHttpServletRequest, org.apache.sling.api.SlingHttpServletResponse)
	 */
	@ Override
	protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response)
			throws ServletException, IOException {
		LOGGER.debug("Entry :: doPost method of UGC Servlet :: ");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json;charset=utf-8");
		PrintWriter writer = response.getWriter();
		String responseStr = null;
		try {
			if (request.getRequestPathInfo().getSelectors().length > 1) {
				LOGGER.trace("request params :: {}", request.getParameterMap());
				UserInfo userInfoModel = request.adaptTo(UserInfo.class);
				responseStr = ugcService.callWebService(request.getRequestPathInfo().getSelectors()[1], "POST",
						userInfoModel, null, null !=  request.getReader() ? request.getReader().lines().collect(Collectors.joining()) : null);
			}
		} catch (ApplicationException | SystemException e) {
			LOGGER.error("Error :: doPost method of UGC Servlet :: {}", e);
		}
		writer.print(responseStr);
	}

	

}
