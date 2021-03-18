/**
 * 
 */
package ca.sunlife.web.cms.source.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.Locale;

import javax.servlet.Servlet;
import javax.servlet.ServletException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.tagging.Tag;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

/**
 * The Class CustomTagServlet.
 *
 * @author TCS
 * @version 1.0
 */
@ Component(service = Servlet.class, property = { Constants.SERVICE_DESCRIPTION + "= Custom Tag Servlet",
		"sling.servlet.methods=" + HttpConstants.METHOD_GET, "sling.servlet.resourceTypes=" + "cq/tagging/components/tag",
		"sling.servlet.extensions=json", "sling.servlet.selectors=tags" })
public class CustomTagServlet extends SlingSafeMethodsServlet {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The log. */
	private static final Logger LOGGER = LoggerFactory.getLogger(CustomTagServlet.class);

	/** The title constant. */
	private static final String TITLE = "title";

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
		String outJson = "";
		Resource resource = request.getResource();
		Tag tag = resource.adaptTo(Tag.class);
		if (null == tag) {
			LOGGER.debug("Parent tag is null");
			return;
		}
		if (request.getRequestPathInfo().getSelectors().length < 2) {
			LOGGER.debug("Length of selector doesn't match {}", request.getRequestPathInfo().getSelectors().length);
			return;
		}
		final Locale locale = new Locale(request.getRequestPathInfo().getSelectors()[1]);
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("name", tag.getName());
		jsonObject.addProperty(TITLE,
				tag.getLocalizedTitle(locale) == null ? tag.getTitle() : tag.getLocalizedTitle(locale));
		jsonObject.addProperty("id", tag.getTagID());
		Iterator<Tag> childTags = tag.listChildren();
		if (null != childTags) {
			childTags.forEachRemaining(childTag -> {
				JsonObject object = new JsonObject();
				object.addProperty(TITLE,
						childTag.getLocalizedTitle(locale) == null ? childTag.getTitle() : childTag.getLocalizedTitle(locale));
				object.addProperty("id", childTag.getTagID());
				// start
				Iterator<Tag> subChildTags = childTag.listChildren();
				if (null != subChildTags) {
					final JsonArray childJsonArray = new JsonArray();
					subChildTags.forEachRemaining(subChildTag -> {
						JsonObject childObject = new JsonObject();
						childObject.addProperty("name", subChildTag.getName());
						childObject.addProperty(TITLE, subChildTag.getLocalizedTitle(locale) == null ? subChildTag.getTitle()
								: subChildTag.getLocalizedTitle(locale));
						childObject.addProperty("id", subChildTag.getTagID());
						childJsonArray.add(childObject);
					});
					object.add("tags", childJsonArray);
				}
				jsonObject.add(childTag.getName(), object);
				// end
			});
		}
		outJson = jsonObject.toString();
		writer.write(outJson);
		LOGGER.debug("Exit :: CustomTagServlet :: doGet ::");
	}
}
