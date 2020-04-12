package ca.sunlife.web.cms.core.servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.*;
import javax.inject.Inject;
import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.ValueFormatException;
import javax.servlet.Servlet;
import javax.servlet.ServletException;

import org.apache.commons.lang3.text.StrSubstitutor;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.commons.osgi.PropertiesUtil;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.osgi.framework.Constants;
import org.osgi.service.cm.Configuration;
import org.osgi.service.cm.ConfigurationAdmin;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ca.sunlife.web.cms.core.osgi.config.MailConfig;

//
/**
 * The Class EmailServlet.
 */
@Component(service = Servlet.class, property = { Constants.SERVICE_DESCRIPTION + "=Email Servlet",
		"sling.servlet.methods=" + HttpConstants.METHOD_GET, "sling.servlet.paths=" + "/bin/emailServlet" })
@Designate(ocd = MailConfig.class)
public class EmailServlet extends SlingAllMethodsServlet {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The Constant LOG. */
	private static final Logger LOG = LoggerFactory.getLogger(EmailServlet.class);

	@Reference
	private transient ConfigurationAdmin configAdmin;

	/**
	 * Null check.
	 *
	 * @param value
	 *            the value
	 * @return the string
	 */
	// null check method
	public String nullCheck(String value) {
		return value != null ? value : "";
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.apache.sling.api.servlets.SlingAllMethodsServlet#doPost(org.apache.sling.
	 * api.SlingHttpServletRequest, org.apache.sling.api.SlingHttpServletResponse)
	 */
	@Override
	public void doPost(final SlingHttpServletRequest request, final SlingHttpServletResponse response)
			throws ServletException, IOException {

		// variable initialization - Starts
		// CF - Content Fragment
		String CF_PATH_PREFIX = "/content/dam/sunlife/external/ca/en/content-fragments/form-email-templates/";
		String CF_PATH_SUFFIX = "/jcr:content/data";
		String CF_PATH = "";
		String CF_NAME = "";
		String FROM_EMAIL_ID = "";
		String TO_EMAIL_ID = "";
		String CC_EMAIL_ID = "";
		String BCC_EMAIL_ID = "";
		String EMAIL_SUBJECT = "";
		String EMAIL_BODY = "";
		String FROM_EMAIL_TEXT = "";
		String COMPONENT_PATH = "";
		String SUCCESS_PAGE_URL = "";
		String ERROR_PAGE_URL = "";
		String MAIL_API = "";
		String API_KEY = "";
		

		// getting configuration values from OSGI
		Configuration mailConfig = configAdmin.getConfiguration("ca.sunlife.web.cms.core.servlets.EmailServlet");
		Dictionary<String, Object> properties = mailConfig.getProperties();
		if (null != properties) {
			MAIL_API = properties.get("apiUrl").toString();
			API_KEY = properties.get("apiKey").toString();
		} else {
			LOG.info("OSGI configuration is not done. Properties are ");
		}

		// variable initialization - Ends

		try {
			// getting all request parameters - Starts
			@SuppressWarnings("unchecked")
			Enumeration<String> requestParameterNames = request.getParameterNames();
			HashMap<String, String> requestParameters = new HashMap<String, String>();
			while (requestParameterNames.hasMoreElements()) {
				final String key = requestParameterNames.nextElement();
				requestParameters.put(key, request.getParameter(key));
			}
			// getting all request parameters - Ends

			COMPONENT_PATH = requestParameters.get(":formstart");
			TO_EMAIL_ID = requestParameters.get("email-id");

			if (null != request) {
				Resource componentResource = request.getResourceResolver().getResource(COMPONENT_PATH);
				if (null != componentResource) {
					Node componentNode = componentResource.adaptTo(Node.class);
					if (null != componentNode && null != componentNode.getProperty("id")) {
						CF_NAME = componentNode.getProperty("id").getString();
					}
				}
				// content fragment path
				CF_PATH = CF_PATH_PREFIX + CF_NAME + CF_PATH_SUFFIX;

				Resource contentResource = request.getResourceResolver().getResource(CF_PATH);
				if (null != contentResource) {
					Node node = contentResource.adaptTo(Node.class);
					if (null != node && node.hasNodes()) {
						Iterator<Node> ite = node.getNodes();
						while (ite.hasNext()) {
							Node childNode = ite.next();
							FROM_EMAIL_ID = nullCheck(childNode.getProperty("from-email-id").getString());
							CC_EMAIL_ID = nullCheck(childNode.getProperty("cc-email-id").getString());
							BCC_EMAIL_ID = nullCheck(childNode.getProperty("bcc-email-id").getString());
							EMAIL_SUBJECT = nullCheck(childNode.getProperty("subject-email").getString());
							EMAIL_BODY = nullCheck(childNode.getProperty("body-email").getString());
							FROM_EMAIL_TEXT = nullCheck(childNode.getProperty("from-text-email").getString());
							SUCCESS_PAGE_URL = nullCheck(childNode.getProperty("success-page-url").getString())
									+ ".html";
							ERROR_PAGE_URL = nullCheck(childNode.getProperty("error-page-url").getString()) + ".html";
						}
					}
				}
				StrSubstitutor strSub = new StrSubstitutor(requestParameters);
				EMAIL_BODY = strSub.replace(EMAIL_BODY);
				// Mail API service
				HttpClient client = HttpClientBuilder.create().build();
				HttpPost post = new HttpPost(MAIL_API);
				List<BasicNameValuePair> apiParameters = new ArrayList<BasicNameValuePair>(1);
				apiParameters.add(new BasicNameValuePair("slf-from-email-address", FROM_EMAIL_ID));
				apiParameters.add(new BasicNameValuePair("slf-to-email-address", TO_EMAIL_ID));
				apiParameters.add(new BasicNameValuePair("slf-cc-email-address", CC_EMAIL_ID));
				apiParameters.add(new BasicNameValuePair("slf-bcc-email-address", BCC_EMAIL_ID));
				apiParameters.add(new BasicNameValuePair("slf-email-subject", EMAIL_SUBJECT));
				apiParameters.add(new BasicNameValuePair("slf-email-body", EMAIL_BODY));
				apiParameters.add(new BasicNameValuePair("slf-from-email-text", FROM_EMAIL_TEXT));
				apiParameters.add(new BasicNameValuePair("slf-api-key", API_KEY));
				post.setEntity(new UrlEncodedFormEntity(apiParameters));
				HttpResponse emailResponse = client.execute(post);
				LOG.info("Response code for email is :: " + emailResponse.getStatusLine().getStatusCode() + " :: "
						+ emailResponse.getStatusLine().getReasonPhrase());
				response.sendRedirect(
						emailResponse.getStatusLine().getStatusCode() == 200 ? SUCCESS_PAGE_URL : ERROR_PAGE_URL);

			}
		} catch (PathNotFoundException pathEx) {
			LOG.info("Exception occured :: Path not found" + pathEx);
		} catch (ValueFormatException valEx) {
			LOG.info("Exception occured :: Incorrect value format" + valEx);
		} catch (RepositoryException repEx) {
			LOG.info("Exception occured :: Repository not found" + repEx);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.apache.sling.api.servlets.SlingSafeMethodsServlet#doGet(org.apache.sling.
	 * api.SlingHttpServletRequest, org.apache.sling.api.SlingHttpServletResponse)
	 */
	@Override
	public void doGet(final SlingHttpServletRequest request, final SlingHttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

}