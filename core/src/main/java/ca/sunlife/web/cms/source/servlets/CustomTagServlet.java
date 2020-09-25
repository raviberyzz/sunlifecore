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
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.tagging.Tag;

/**
 * The Class CustomTagServlet.
 *
 * @author TCS
 * @version 1.0
 */
@ Component (service = Servlet.class, property = { Constants.SERVICE_DESCRIPTION + "= Custom Tag Servlet",
		"sling.servlet.methods=" + HttpConstants.METHOD_GET, "sling.servlet.resourceTypes=" + "cq/tagging/components/tag",
		"sling.servlet.extensions=json", "sling.servlet.selectors=tags" })
public class CustomTagServlet extends SlingSafeMethodsServlet {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The log. */
	private static final Logger LOGGER = LoggerFactory.getLogger(CustomTagServlet.class);

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
		LOGGER.debug("Entry :: CustomTagServlet :: doGet ::");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json;charset=utf-8");
		PrintWriter writer = response.getWriter();
		JSONArray jsonArrayMain = new JSONArray();
		Resource resource = request.getResource();
		resource.getChildren().forEach(child -> {
			try {
				if (null != child) {
					JSONObject jsonObject = new JSONObject();
					JSONArray jsonArray = new JSONArray();
					Tag childTag = child.adaptTo(Tag.class);
					if( null == childTag)
						return;
					child.getChildren().forEach(subChild -> {
						try {
							Tag tag = subChild.adaptTo(Tag.class);
							if( null != tag ) {
								JSONObject subChildObj = new JSONObject();
								subChildObj.put("name", tag.getTitle());
								subChildObj.put("value", tag.getTagID());
								jsonArray.put(subChildObj);
							}
						} catch (JSONException e) {
							LOGGER.error("Error while iterating child sub tags :: {}", e);
						}
					});
					jsonObject.put("name", childTag.getTitle());
					jsonObject.put("tags", jsonArray);
					jsonArrayMain.put(jsonObject);
				}
			} catch (JSONException e) {
				LOGGER.error("Error :: CustomTagServlet :: doGet :: {}", e);
			}
		});
		LOGGER.debug("Json array :: {} ", jsonArrayMain);
		writer.print(jsonArrayMain.toString());
		LOGGER.debug("Exit :: CustomTagServlet :: doGet ::");
	}

}
