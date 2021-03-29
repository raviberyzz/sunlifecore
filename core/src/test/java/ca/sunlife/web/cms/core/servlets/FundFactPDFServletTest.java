package ca.sunlife.web.cms.core.servlets;

import static org.mockito.Mockito.when;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.ServletException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.LoginException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.services.FundFactPDFService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * The Class FundFactPDFServletTest.
 */
@ ExtendWith(AemContextExtension.class)
public class FundFactPDFServletTest {

	/** The request. */
	@ Mock
	private SlingHttpServletRequest request;

	/** The response. */
	@ Mock
	private SlingHttpServletResponse response;

	/** The FundFactPDFServlet servlet. */
	@ InjectMocks
	private FundFactPDFServlet fundFactPDFServlet;

	/** The fact pdf service. */
	@ Mock
	private FundFactPDFService factPDFService;

	/**
	 * Setup.
	 */
	@ BeforeEach
	void setup() {
		MockitoAnnotations.initMocks(this);
	}

	/**
	 * tests doGet method.
	 * 
	 * @throws ApplicationException
	 * @throws SystemException
	 * @throws IOException
	 * @throws LoginException
	 * @throws ServletException
	 */
	@ Test
	void testDoGet() throws ApplicationException, SystemException, IOException, LoginException, ServletException {
		StringWriter stringWriter = new StringWriter();
		PrintWriter writer = new PrintWriter(stringWriter);
		when(response.getWriter()).thenReturn(writer);
		when(factPDFService.getCompiledData(request)).thenReturn("{'invoiceAmt':400.00}");
		fundFactPDFServlet.doGet(request, response);
		
		when(factPDFService.getCompiledData(request)).thenThrow(new ApplicationException());
		fundFactPDFServlet.doGet(request, response);
		
		//when(factPDFService.getCompiledData(request)).thenThrow(new SystemException());
		//fundFactPDFServlet.doGet(request, response);
		
		//when(factPDFService.getCompiledData(request)).thenThrow(new LoginException());
		//fundFactPDFServlet.doGet(request, response);
	}
	
	/**
	 * tests doGet method for sys exception.
	 * 
	 * @throws ApplicationException
	 * @throws SystemException
	 * @throws IOException
	 * @throws LoginException
	 * @throws ServletException
	 */
	@ Test
	void testDoGetSysExp() throws ApplicationException, SystemException, IOException, LoginException, ServletException {
		StringWriter stringWriter = new StringWriter();
		PrintWriter writer = new PrintWriter(stringWriter);
		when(response.getWriter()).thenReturn(writer);
		when(factPDFService.getCompiledData(request)).thenReturn("{'invoiceAmt':400.00}");
		fundFactPDFServlet.doGet(request, response);
		
		//when(factPDFService.getCompiledData(request)).thenThrow(new ApplicationException());
		//fundFactPDFServlet.doGet(request, response);
		
		when(factPDFService.getCompiledData(request)).thenThrow(new SystemException());
		fundFactPDFServlet.doGet(request, response);
		
		//when(factPDFService.getCompiledData(request)).thenThrow(new LoginException());
		//fundFactPDFServlet.doGet(request, response);
	}
	
	/**
	 * tests doGet method for sys exception.
	 * 
	 * @throws ApplicationException
	 * @throws SystemException
	 * @throws IOException
	 * @throws LoginException
	 * @throws ServletException
	 */
	@ Test
	void testDoGetLoginExp() throws ApplicationException, SystemException, IOException, LoginException, ServletException {
		StringWriter stringWriter = new StringWriter();
		PrintWriter writer = new PrintWriter(stringWriter);
		when(response.getWriter()).thenReturn(writer);
		when(factPDFService.getCompiledData(request)).thenReturn("{'invoiceAmt':400.00}");
		fundFactPDFServlet.doGet(request, response);
		
		when(factPDFService.getCompiledData(request)).thenThrow(new LoginException());
		fundFactPDFServlet.doGet(request, response);
	}
}
