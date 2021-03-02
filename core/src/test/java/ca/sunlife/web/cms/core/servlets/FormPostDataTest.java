package ca.sunlife.web.cms.core.servlets;

import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;

import javax.servlet.ServletException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * The Class FormPostDataTest.
 *
 */
@ ExtendWith(AemContextExtension.class)
public class FormPostDataTest {

	/** The request. */
	@ Mock
	private SlingHttpServletRequest request;

	/** The response. */
	@ Mock
	private SlingHttpServletResponse response;

	@ InjectMocks
	private FormPostData formPostData;

	/**
	 * set up.
	 */
	@ BeforeEach
	public void setup() {
		MockitoAnnotations.initMocks(this);
	}

	/**
	 * @throws ServletException
	 * @throws IOException
	 */
	@ Test
	public void testDoPost() throws ServletException, IOException {
		ArrayList<String> arrLst = new ArrayList<String>();
		arrLst.add("submitURL");
		arrLst.add("redirectURL");
		Enumeration<String> enumList = Collections.enumeration(arrLst);
		when(request.getParameterNames()).thenReturn(enumList);
		when(request.getParameter("submitURL")).thenReturn("/submitForm");
		when(request.getParameter("redirectURL")).thenReturn("/content/slf/success.html");
		formPostData.doGet(request, response);
	}
}
