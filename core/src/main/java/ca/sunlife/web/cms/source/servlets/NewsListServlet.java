/**
 * 
 */
package ca.sunlife.web.cms.source.servlets;

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
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.tagging.TagConstants;

import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.source.constants.NewsConstants;
import ca.sunlife.web.cms.source.osgi.config.NewsConfig;

/**
 * The Class NewsListServlet.
 *
 * @author TCS
 * @version 1.0
 */
@ Component(service = Servlet.class, property = { Constants.SERVICE_DESCRIPTION + "= News Listing Servlet",
		"sling.servlet.methods=" + HttpConstants.METHOD_GET,
		"sling.servlet.resourceTypes=" + "sunlife/source/components/content/generic", "sling.servlet.extensions=json",
		"sling.servlet.selectors=news" })
@ Designate(ocd = NewsConfig.class)
public class NewsListServlet extends SlingSafeMethodsServlet {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The log. */
	private static final Logger LOGGER = LoggerFactory.getLogger(NewsListServlet.class);

	/** The core resource resolver. */
	@ Reference
	private transient CoreResourceResolver coreResourceResolver;

	/** The Constant JCR_CONTENT_DATA_MASTER. */
	private static final String JCR_CONTENT_DATA_MASTER = "/jcr:content/data/master";

	/** The Constant JCR_CONTENT_METDATA_MASTER. */
	private static final String JCR_CONTENT_METDATA_MASTER = "/jcr:content/metadata";

	/** The content fragment path map. */
	private HashMap<String, String> contentFragmentPathMap = new HashMap<>();

	/** The summary text length. */
	public static final int SUMMARY_LENGTH = 155;

	/**
	 * Activate news config for NewsList servlet.
	 * 
	 * @param newsConfig
	 */
	@ Activate
	public void activate(NewsConfig newsConfig) {
		LOGGER.debug("Activating NewsConfig for NewsListing servlet");
		for (String path : newsConfig.getNewsPath()) {
			String[] pathFields = path.split("~");
			contentFragmentPathMap.put(pathFields[0], pathFields[1]);
		}
		LOGGER.debug("Activated NewsConfig for NewsListing servlet :: {}", contentFragmentPathMap);
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
			LOGGER.debug("News content fragment parent path fetched :: {}", resourcePath);
			resource = coreResourceResolver.getResourceResolver().getResource(resourcePath);
			if (null != resource) {
				resource.listChildren().forEachRemaining(o -> {
					LOGGER.debug("Fetching news in content fragment parent path [ {} ] ", o.getName());
					try {
						JSONObject jsonObject = null;
						// Data
						final Resource contentFragmentData = coreResourceResolver.getResourceResolver()
								.getResource(o.getPath().concat(JCR_CONTENT_DATA_MASTER));
						if (null != contentFragmentData) {
							jsonObject = new JSONObject();
							ValueMap valueMap = contentFragmentData.getValueMap();
							jsonObject.put(NewsConstants.PUBLISHED_DATE_CONSTANT,
									valueMap.get(NewsConstants.PUBLISHED_DATE_CONSTANT, String.class)); // published
							// date
							jsonObject.put(NewsConstants.HEADING_CONSTANT,
									valueMap.get(NewsConstants.HEADING_CONSTANT, String.class)); // heading
							jsonObject.put(NewsConstants.PAGE_CONSTANT, valueMap.get(NewsConstants.PAGE_CONSTANT, String.class)); // article
							// page
							// path
							jsonObject.put(NewsConstants.THUMBNAIL_IMAGE_CONSTANT,
									valueMap.get(NewsConstants.THUMBNAIL_IMAGE_CONSTANT, String.class)); // image path
							jsonObject.put(NewsConstants.THUMBNAIL_IMAGE_FEATURED_CONSTANT,
									valueMap.get(NewsConstants.THUMBNAIL_IMAGE_FEATURED_CONSTANT, String.class)); // image path - featured
							jsonObject.put(NewsConstants.PIN_ARTICLE_CONSTANT,
									valueMap.get(NewsConstants.PIN_ARTICLE_CONSTANT, String.class)); // pin order
							jsonObject.put(NewsConstants.ARTICLE_SUMMARY_CONSTANT,
									valueMap.get(NewsConstants.ARTICLE_SUMMARY_CONSTANT, String.class)); // summary
						}
						// Meta data
						final Resource contentFragmentMetaData = coreResourceResolver.getResourceResolver()
								.getResource(o.getPath().concat(JCR_CONTENT_METDATA_MASTER));
						if (null != contentFragmentMetaData) {
							ValueMap valueMap = contentFragmentMetaData.getValueMap();
							jsonObject.put(NewsConstants.TAGS_CONSTANT, valueMap.get(TagConstants.PN_TAGS, String[].class)); // cq:tags
						}
						if (null != jsonObject) {
							jsonArray.put(jsonObject);
						}
						LOGGER.info("News list fetched: {}", jsonArray);
					} catch (LoginException e) {
						LOGGER.error("NewsListServlet :: LoginException :: {}", e);
					} catch (JSONException e) {
						LOGGER.error("NewsListServlet :: JSONException :: {}", e);
					}
				});
			}
			writer.print(jsonArray.toString());
		} catch (LoginException e) {
			LOGGER.error("Error :: {}", e);
		} finally {
			writer.flush();
		}
	}
}
