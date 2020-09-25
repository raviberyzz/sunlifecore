/**
 * 
 */
package ca.sunlife.web.cms.source.servlets;

import java.io.IOException;
import java.io.PrintWriter;

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
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.source.constants.NewsConstants;

/**
 * The Class NewsListServlet.
 *
 * @author TCS
 * @version 1.0
 */
@ Component (service = Servlet.class, property = { Constants.SERVICE_DESCRIPTION + "= News Listing Servlet",
		"sling.servlet.methods=" + HttpConstants.METHOD_GET, "sling.servlet.paths=" + "/bin/getNews" })
public class NewsListServlet extends SlingSafeMethodsServlet {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The log. */
	private static final Logger log = LoggerFactory.getLogger(NewsListServlet.class);

	/** The core resource resolver. */
	@ Reference
	private transient CoreResourceResolver coreResourceResolver;

	/** The Constant JCR_CONTENT_DATA_MASTER. */
	private static final String JCR_CONTENT_DATA_MASTER = "/jcr:content/data/master";

	/** The Constant JCR_CONTENT_METDATA_MASTER. */
	private static final String JCR_CONTENT_METDATA_MASTER = "/jcr:content/metadata";

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
		try {
			resource = coreResourceResolver.getResourceResolver().getResource("/content/dam/sunlife/internal/source/en/content-fragments/news-articles"); //Currently hard coded - will remove it once we configure it
			if (null != resource) {
				resource.listChildren().forEachRemaining(o -> {
					log.debug("Fetching news in content fragment parent path [ {} ] ", o.getName());
					try {
						JSONObject jsonObject = null;
						// Data
						final Resource contentFragmentData = coreResourceResolver.getResourceResolver()
								.getResource(o.getPath().concat(JCR_CONTENT_DATA_MASTER));
						if (null != contentFragmentData) {
							jsonObject = new JSONObject();
							ValueMap valueMap = contentFragmentData.getValueMap();
							jsonObject.put(NewsConstants.PUBLISHED_DATE_CONSTANT, valueMap.get(NewsConstants.PUBLISHED_DATE_CONSTANT, String.class)); // published
																																																					// date
							jsonObject.put(NewsConstants.HEADING_CONSTANT, valueMap.get(NewsConstants.HEADING_CONSTANT, String.class)); // heading
							jsonObject.put(NewsConstants.PAGE_CONSTANT, valueMap.get(NewsConstants.PAGE_CONSTANT, String.class)); // article page path
							jsonObject.put(NewsConstants.THUMBNAIL_IMAGE_CONSTANT, valueMap.get(NewsConstants.THUMBNAIL_IMAGE_CONSTANT, String.class)); // image path
							jsonObject.put(NewsConstants.PIN_ARTICLE_CONSTANT, valueMap.get(NewsConstants.PIN_ARTICLE_CONSTANT, String.class)); // image path
							String summary = valueMap.get(NewsConstants.ARTICLE_CONTENT_CONSTANT, String.class);
							int summaryMaxSize = 155;
							jsonObject.put(NewsConstants.SUMMARY_CONSTANT,
									null != summary && summary.length() > summaryMaxSize ? summary.substring(0, summaryMaxSize)
											: summary); // summary
						}
						// Meta data
						final Resource contentFragmentMetaData = coreResourceResolver.getResourceResolver()
								.getResource(o.getPath().concat(JCR_CONTENT_METDATA_MASTER));
						if (null != contentFragmentMetaData) {
							ValueMap valueMap = contentFragmentMetaData.getValueMap();
							jsonObject.put(NewsConstants.TAGS_CONSTANT, valueMap.get("cq:tags", String[].class)); // cq:tags
						}
						if (null != jsonObject)
							jsonArray.put(jsonObject);
						log.info("News list fetched: {}", jsonArray);
					} catch (LoginException e) {
						log.error("NewsListServlet :: LoginException :: {}", e);
					} catch (JSONException e) {
						log.error("NewsListServlet :: JSONException :: {}", e);
					}
				});
			}
			writer.print(jsonArray.toString());
		} catch (LoginException e) {
			log.error("Error :: {}", e);
		} finally {
			writer.flush();
		}
	}

}
