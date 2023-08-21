package ca.sunlife.web.cms.core.servlets;

import java.io.IOException;
import java.io.PrintWriter;

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

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.services.FundFactPDFService;

/**
 * The Class FundFactPDFServlet.
 *
 * @author TCS
 * @version 1.0
 */
/**
 * @author mo92
 *
 */
@ Component(service = Servlet.class, property = { Constants.SERVICE_DESCRIPTION + "= Fund Fact PDF Servlet",
		"sling.servlet.methods=" + HttpConstants.METHOD_GET,
		"sling.servlet.resourceTypes=" + "sunlife/core/components/structure/base-page",
		"sling.servlet.selectors=gifsfundspdf" })
public class FundFactPDFServlet extends SlingSafeMethodsServlet {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The logger. */
	private static final Logger LOG = LoggerFactory.getLogger(FundFactPDFServlet.class);

	/** The core resource resolver. */
	@ Reference
	private transient FundFactPDFService fundFactPDFService;

	/**
	 * Do get method of FundFactPDFServlet.
	 *
	 * @param request
	 *          the request
	 * @param response
	 *          the response
	 */
	@ Override
	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
			throws ServletException, IOException {
		LOG.debug("Entry :: doGet method of FundFactPDFServlet :: ");
		PrintWriter out = response.getWriter();
		try {
			//calls fund fact PDF service
			out.print(fundFactPDFService.getCompiledData(request));
		} catch (ApplicationException e) {
			LOG.error("ApplicationException :: doGet method of FundFactPDFServlet :: ");
		} catch (SystemException e) {
			LOG.error("SystemException :: doGet method of FundFactPDFServlet :: ");
		} catch (LoginException e) {
			LOG.error("LoginException :: doGet method of FundFactPDFServlet :: ");
		}
		LOG.debug("Exit :: doGet method of FundFactPDFServlet :: ");
	}

}
