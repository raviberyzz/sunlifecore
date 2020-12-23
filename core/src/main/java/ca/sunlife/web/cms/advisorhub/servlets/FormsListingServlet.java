package ca.sunlife.web.cms.advisorhub.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.advisorhub.servlets.FormsListingServlet;
import ca.sunlife.web.cms.advisorhub.osgi.config.FormsConfig;
import ca.sunlife.web.cms.advisorhub.constants.FormsConstants;

/**
 * The Class FormsListingServlet
 * 
 * @author TCS
 * @version 1.0
 */
@ Component(service = Servlet.class, property = { Constants.SERVICE_DESCRIPTION + "= Forms Listing Servlet",
		"sling.servlet.methods=" + HttpConstants.METHOD_GET,
		"sling.servlet.resourceTypes=" + "sunlife/advisorhub/components/content/generic", "sling.servlet.extensions=json",
		"sling.servlet.selectors=forms" })
@ Designate(ocd = FormsConfig.class)
public class FormsListingServlet extends SlingSafeMethodsServlet {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The log. */
	private static final Logger LOGGER = LoggerFactory.getLogger(FormsListingServlet.class);

	/** The core resource resolver. */
	@ Reference
	private transient CoreResourceResolver coreResourceResolver;

	/** The Constant JCR_CONTENT_DATA_MASTER. */
	private static final String JCR_CONTENT_DATA_MASTER = "/jcr:content/data/master";

	/** The content fragment path map. */
	private HashMap<String, String> contentFragmentPathMap = new HashMap<>();
	
	/**
	 * Activate formss config for Formslisting servlet.
	 * 
	 * @param formsConfig
	 *          the formsConfig
	 */
	@ Activate
	public void activate(FormsConfig formsConfig) {
		LOGGER.debug("Activating FormsConfig for FormsListing servlet");
		for (String path : formsConfig.getFormsPath()) {
			String[] pathFields = path.split("~");
			contentFragmentPathMap.put(pathFields[0], pathFields[1]);
		}
		LOGGER.debug("Activated FormsConfig for FormsListing servlet :: {}", contentFragmentPathMap);
	}
	
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
		
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json;charset=utf-8");
		PrintWriter writer = response.getWriter();
		Resource resource = null;
		final JSONArray jsonArray = new JSONArray();
		String resourcePath = null;
		try {
			if (request.getRequestPathInfo().getSelectors().length < 1) {
				return;
			}
			resourcePath = contentFragmentPathMap.get(request.getRequestPathInfo().getSelectors()[1]);
			LOGGER.debug("Forms content fragment parent path fetched :: {}", resourcePath);
			resource = coreResourceResolver.getResourceResolver().getResource(resourcePath);
			if(null != resource) {
				resource.listChildren().forEachRemaining( forms -> {
					LOGGER.trace("Fetching forms in content fragment parent path [ {} ] ", forms.getName());
					try {
						JSONObject jsonObject = null;
						final Resource contentFragmentData = coreResourceResolver.getResourceResolver()
								.getResource(forms.getPath().concat(JCR_CONTENT_DATA_MASTER));
						if(null != contentFragmentData) {
							jsonObject = new JSONObject();
							ValueMap valueMap = contentFragmentData.getValueMap();
							jsonObject.put(FormsConstants.FORM_NUMBER, valueMap.get(FormsConstants.FORM_NUMBER, String.class));
							jsonObject.put(FormsConstants.LAST_UPDATED, valueMap.get(FormsConstants.LAST_UPDATED, String.class));
							jsonObject.put(FormsConstants.ESIGN, valueMap.get(FormsConstants.ESIGN,String.class));							
							String summary = valueMap.get(FormsConstants.FORM_INFORMATION, String.class);
							Document docObj = null != summary ? Jsoup.parse(summary) : null;
							jsonObject.put(FormsConstants.FORM_INFORMATION, null != docObj ? docObj.text() : "");
							jsonObject.put(FormsConstants.FAVOURITES, jsonArray.length() % 2 == 0 ? "true" : "false");
						}
						if (null != jsonObject) {
							jsonArray.put(jsonObject);
						}
						LOGGER.trace("Forms list fetched: {}", jsonArray);						
					}
					catch (LoginException e) {
						LOGGER.error("FormsListingServlet :: LoginException :: {}", e);
					} catch (JSONException e) {
						LOGGER.error("FormsListingServlet :: JSONException :: {}", e);
					}			
				});
			 }
			 writer.print(jsonArray.toString());
		 }
		catch (LoginException e) {
			LOGGER.error("Error :: {}", e);
		} finally {
			writer.flush();
		}		
	}
}
