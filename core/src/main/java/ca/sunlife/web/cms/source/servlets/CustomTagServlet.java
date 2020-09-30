/**
 * 
 */
package ca.sunlife.web.cms.source.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;

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
	protected void doGet (SlingHttpServletRequest request, SlingHttpServletResponse response)
			throws ServletException, IOException {
		LOGGER.debug("Entry :: CustomTagServlet :: doGet ::");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json;charset=utf-8");
		PrintWriter writer = response.getWriter();
		String outJson = "";
		try {
			Resource resource = request.getResource();
			Tag tag = resource.adaptTo(Tag.class);
			if (null == tag) {
				return;
			}
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("name", tag.getName());
			jsonObject.put("title", tag.getTitle());
			jsonObject.put("id", tag.getTagID());
			Iterator<Tag> childTags = tag.listChildren();
			if (null != childTags) {
				final JSONArray jsonArray = new JSONArray();
				childTags.forEachRemaining(childTag -> {
					JSONObject object = new JSONObject();
					try {
						object.put("name", childTag.getName());
						object.put("title", childTag.getTitle());
						object.put("id", childTag.getTagID());
						jsonArray.put(object);
					} catch (JSONException e) {
						LOGGER.error("JSON error whie iterating the child {}", e);
					}
				});
				jsonObject.put("tags", jsonArray);
			}
			outJson = jsonObject.toString();
		} catch (JSONException e1) {
			LOGGER.error("Error :: while parsing json {}", e1);
		}
		writer.write(outJson);
		LOGGER.debug("Exit :: CustomTagServlet :: doGet ::");
	}
}