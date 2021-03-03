package ca.sunlife.web.cms.core.servlets;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.servlet.Servlet;
import javax.servlet.ServletException;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.dam.api.AssetManager;
import com.day.cq.replication.ReplicationStatus;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

/**
 * The Class ArticleListingServlet.
 */
@Component(service = Servlet.class, property = { Constants.SERVICE_DESCRIPTION + "=Article Listing Servlet",
		"sling.servlet.methods=" + HttpConstants.METHOD_GET,
		"sling.servlet.resourceTypes=" + "sunlife/legacy/components/structure/base-page",
		"sling.servlet.selectors=" + "article", "sling.servlet.extensions=" + "json" })
public class ArticleListingServlet extends SlingSafeMethodsServlet {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(ArticleListingServlet.class);

	/** The Constant CF_MULTIFIELD. */
	private static final String CF_MULTIFIELD = "cfmultifield";

	/** The Constant MULTI_CONTENT_FRAGMENT. */
	private static final String MULTI_CONTENT_FRAGMENT = "multicontentfragment";

	/** The Constant ARTICLE_MINI_DESCRIPTION. */
	private static final String ARTICLE_MINI_DESCRIPTION = "articleMiniDescription";

	/** The Constant ARTICLE_PUBLISHED_DATE. */
	private static final String ARTICLE_PUBLISHED_DATE = "articlePublishedDate";

	/** The Constant ARTICLE_MAIN_DESCRIPTION. */
	private static final String ARTICLE_MAIN_DESCRIPTION = "articleMainDescription";

	/** The Constant ARTICLE_HEAD_LINE. */
	private static final String ARTICLE_HEAD_LINE = "articleHeadline";

	/** The Constant ARTICLE_PAGE_LINK. */
	private static final String ARTICLE_PAGE_LINK = "articlePageLink";

	/** The Constant ARTICLE_THUMBNAIL_IMAGE. */
	private static final String ARTICLE_THUMBNAIL_IMAGE = "articleThumbnailImage";

	/** The Constant TPADVISOR. */
	private static final String TPADVISOR = "tpadvisor";

	/** The Constant CSFADVISOR. */
	private static final String CSFADVISOR = "csfadvisor";

	/** The Constant LOCALE_CODE_EN. */
	private static final String LOCALE_CODE_EN = "en";

	/** The Constant LOCALE_CODE_FR. */
	private static final String LOCALE_CODE_FR = "fr";

	/** The Constant ENGLISH_JSON_PATH. */
	private static final String ENGLISH_JSON_PATH = "/content/dam/sunlife/legacy/assets/slf/sunhub/JSON/ArticleListing_EN.json";

	/** The Constant FRENCH_JSON_PATH. */
	private static final String FRENCH_JSON_PATH = "/content/dam/sunlife/legacy/assets/slf/sunhub/JSON/ArticleListing_FR.json";

	/** The Constant JCR_CONTENT_MASTER_DATA. */
	private static final String JCR_CONTENT_MASTER_DATA = "jcr:content/data/master";

	/** The Constant MIME_TYPE. */
	private static final String MIME_TYPE = "application/json";

	/** The Constant CONTENT_FOR_CLIENT. */
	private static final String CONTENT_FOR_CLIENT = "cfc";

	/** The Constant GROW_YOUR_BUSINESS. */
	private static final String GROW_YOUR_BUSINESS = "gyb";

	/**
	 * The doGet.
	 * 
	 * @param req
	 *            the request
	 * @param resp
	 *            the response
	 * @throws ServletException
	 *             the Servlet exception
	 * @throws IOException
	 *             the IO exception
	 */
	@Override
	protected void doGet(final SlingHttpServletRequest req, final SlingHttpServletResponse resp)
			throws ServletException, IOException {
		LOGGER.debug("Inside doGet::::");
		final ResourceResolver resResolver = req.getResourceResolver();
		/** The cfs advisor data en. */
		JSONArray cfsAdvisorDataEn;

		/** The cfs advisor data fr. */
		JSONArray cfsAdvisorDataFr;

		/** The tp advisor data en. */
		JSONArray tpAdvisorDataEn;

		/** The tp advisor data fr. */
		JSONArray tpAdvisorDataFr;

		/** The article list json en. */
		JSONObject articleListJsonEn = new JSONObject();

		/** The article list json fr. */
		JSONObject articleListJsonFr = new JSONObject();

		/** The cfc data en. */
		JSONObject cfcDataEn = new JSONObject();

		/** The cfc data fr. */
		JSONObject cfcDataFr = new JSONObject();

		/** The gyb data en. */
		JSONObject gybDataEn = new JSONObject();

		/** The gyb data fr. */
		JSONObject gybDataFr = new JSONObject();
		// ** The article list json en. *//*
		Session session = resResolver.adaptTo(Session.class);
		ArrayList<String> pageList = new ArrayList<>();
		pageList.add("/content/sunlife/external/ca/sl/sunhub/en/content-for-clients");
		pageList.add("/content/sunlife/external/ca/sl/sunhub/en/grow-your-business");
		pageList.add("/content/sunlife/external/ca/sl/sunhub/fr/content-for-clients");
		pageList.add("/content/sunlife/external/ca/sl/sunhub/fr/grow-your-business");
		String locale = "";
		String contentType = "";
		Map<String, JSONArray> cfsAndtpData = new HashMap<String, JSONArray>();
		Map<String, JSONObject> cfcAndGybData = new HashMap<String, JSONObject>();
		cfcAndGybData.put("gybDataEn", gybDataEn);
		cfcAndGybData.put("gybDataFr", gybDataFr);
		cfcAndGybData.put("cfcDataEn", cfcDataEn);
		cfcAndGybData.put("cfcDataFr", cfcDataFr);
		try {
			for (String pagePath : pageList) {
				locale = getLocale(pagePath);
				contentType = getContentType(pagePath);
				Resource resource = resResolver.getResource(pagePath + "/jcr:content/root/layout_container/container1");
				cfsAdvisorDataEn = new JSONArray();
				cfsAdvisorDataFr = new JSONArray();
				tpAdvisorDataEn = new JSONArray();
				tpAdvisorDataFr = new JSONArray();
				cfsAndtpData.put("cfsAdvisorDataEn", cfsAdvisorDataEn);
				cfsAndtpData.put("cfsAdvisorDataFr", cfsAdvisorDataFr);
				cfsAndtpData.put("tpAdvisorDataEn", tpAdvisorDataEn);
				cfsAndtpData.put("tpAdvisorDataFr", tpAdvisorDataFr);
				if (resource != null) {
					Node pageNode = resource.adaptTo(Node.class);
					if (null != pageNode) {
						NodeIterator nodeItr = pageNode.getNodes();
						while (nodeItr.hasNext()) {
							Node node = nodeItr.nextNode();
							if (node.getName().contains(MULTI_CONTENT_FRAGMENT)) {
								processMultiCfComponent(node, req, locale, cfsAndtpData);
							}
						}
						cfcAndGybData = createJsonBasedOnLangAndContentType(locale, contentType, cfsAndtpData,
								cfcAndGybData);
					}
				}
			}
			articleListJsonEn.put("GYBData", gybDataEn);
			articleListJsonEn.put("CFCData", cfcDataEn);
			articleListJsonFr.put("GYBData", gybDataFr);
			articleListJsonFr.put("CFCData", cfcDataFr);
			InputStream englishInputStream = new ByteArrayInputStream(
					articleListJsonEn.toString().getBytes(StandardCharsets.UTF_8));
			InputStream frenchInputStream = new ByteArrayInputStream(
					articleListJsonFr.toString().getBytes(StandardCharsets.UTF_8));
			AssetManager assetMgr = resResolver.adaptTo(AssetManager.class);
			if (null != assetMgr) {
				assetMgr.createAsset(ENGLISH_JSON_PATH, englishInputStream, MIME_TYPE, true);
				assetMgr.createAsset(FRENCH_JSON_PATH, frenchInputStream, MIME_TYPE, true);
				session.save();
			}
		} catch (RepositoryException | ParseException | JSONException e) {
			LOGGER.error("Exception is {}", e);
		}
		resp.setCharacterEncoding("UTF-8");
		resp.setContentType(MIME_TYPE);
		resp.getWriter().write(articleListJsonEn.toString());
	}

	/**
	 * Creates the json based on lang and content type.
	 *
	 * @param locale
	 *            the locale
	 * @param contentType
	 *            the content type
	 * @param cfsAndtpData
	 *            the cfs andtp data
	 * @param cfcAndGybData
	 *            the cfc and gyb data
	 * @return the map
	 * @throws JSONException
	 *             the JSON exception
	 */
	private Map<String, JSONObject> createJsonBasedOnLangAndContentType(String locale, String contentType,
			Map<String, JSONArray> cfsAndtpData, Map<String, JSONObject> cfcAndGybData) throws JSONException {

		JSONObject cfcDataEn = cfcAndGybData.get("cfcDataEn");

		JSONObject cfcDataFr = cfcAndGybData.get("cfcDataFr");

		JSONObject gybDataEn = cfcAndGybData.get("gybDataEn");

		JSONObject gybDataFr = cfcAndGybData.get("gybDataFr");

		JSONArray cfsAdvisorDataEn = cfsAndtpData.get("cfsAdvisorDataEn");
		JSONArray cfsAdvisorDataFr = cfsAndtpData.get("cfsAdvisorDataFr");
		JSONArray tpAdvisorDataEn = cfsAndtpData.get("tpAdvisorDataEn");
		JSONArray tpAdvisorDataFr = cfsAndtpData.get("tpAdvisorDataFr");
		if (locale.equalsIgnoreCase(LOCALE_CODE_EN) && contentType.equalsIgnoreCase(CONTENT_FOR_CLIENT)) {
			cfcDataEn.put(TPADVISOR, tpAdvisorDataEn);
			cfcDataEn.put(CSFADVISOR, cfsAdvisorDataEn);
		} else if (locale.equalsIgnoreCase(LOCALE_CODE_EN) && contentType.equalsIgnoreCase(GROW_YOUR_BUSINESS)) {
			gybDataEn.put(TPADVISOR, tpAdvisorDataEn);
			gybDataEn.put(CSFADVISOR, cfsAdvisorDataEn);
		}
		if (locale.equalsIgnoreCase(LOCALE_CODE_FR) && contentType.equalsIgnoreCase(CONTENT_FOR_CLIENT)) {
			cfcDataFr.put(TPADVISOR, tpAdvisorDataFr);
			cfcDataFr.put(CSFADVISOR, cfsAdvisorDataFr);
		} else if (locale.equalsIgnoreCase(LOCALE_CODE_FR) && contentType.equalsIgnoreCase(GROW_YOUR_BUSINESS)) {
			gybDataFr.put(TPADVISOR, tpAdvisorDataFr);
			gybDataFr.put(CSFADVISOR, cfsAdvisorDataFr);
		}
		return cfcAndGybData;
	}

	/**
	 * Gets the content type.
	 *
	 * @param pagePath
	 *            the page path
	 * @return the content type
	 */
	private String getContentType(String pagePath) {
		String contentType;
		if (pagePath.contains("content-for-clients")) {
			contentType = CONTENT_FOR_CLIENT;
		} else {
			contentType = GROW_YOUR_BUSINESS;
		}
		return contentType;
	}

	/**
	 * Gets the locale.
	 *
	 * @param pagePath
	 *            the page path
	 * @return the locale
	 */
	private String getLocale(String pagePath) {
		String locale;
		if (pagePath.contains("/en/")) {
			locale = LOCALE_CODE_EN;
		} else {
			locale = LOCALE_CODE_FR;
		}
		return locale;
	}

	/**
	 * Process multi cf component.
	 *
	 * @param node
	 *            the node
	 * @param req
	 *            the req
	 * @param locale
	 *            the locale
	 * @param cfsAndtpData
	 *            the cfs andtp data
	 * @return the map
	 * @throws RepositoryException
	 *             the repository exception
	 * @throws ParseException
	 *             the parse exception
	 * @throws JSONException
	 *             the JSON exception
	 */
	private Map<String, JSONArray> processMultiCfComponent(Node node, SlingHttpServletRequest req, String locale,
			Map<String, JSONArray> cfsAndtpData) throws RepositoryException, ParseException, JSONException {
		if (node.hasNode(CF_MULTIFIELD)) {
			NodeIterator nodeItr = node.getNode(CF_MULTIFIELD).getNodes();
			while (nodeItr.hasNext()) {
				Node itemNode = nodeItr.nextNode();
				String cfPath = itemNode.getProperty("cfPath").getString();
				if (StringUtils.isNotBlank(cfPath)) {
					cfsAndtpData = getPageStatusAndData(cfPath, req, locale, cfsAndtpData);
				}
			}
		}
		return cfsAndtpData;
	}

	/**
	 * Gets the page status and data.
	 *
	 * @param cfPath
	 *            the cf path
	 * @param req
	 *            the req
	 * @param locale
	 *            the locale
	 * @param cfsAndtpData
	 *            the cfs andtp data
	 * @return the page status and data
	 * @throws RepositoryException
	 *             the repository exception
	 * @throws ParseException
	 *             the parse exception
	 * @throws JSONException
	 *             the JSON exception
	 */
	private Map<String, JSONArray> getPageStatusAndData(String cfPath, SlingHttpServletRequest req, String locale,
			Map<String, JSONArray> cfsAndtpData) throws RepositoryException, ParseException, JSONException {
		ResourceResolver resResolver = req.getResourceResolver();
		Resource resource = resResolver.getResource(cfPath);
		Resource articleResource = resResolver.getResource(cfPath + "/" + JCR_CONTENT_MASTER_DATA);
		boolean isActivated = false;
		if (null != resource && null != articleResource) {
			Node resourceNode = resource.adaptTo(Node.class);
			if (null != resourceNode) {
				Node dataNode = resourceNode.getNode(JCR_CONTENT_MASTER_DATA);
				Node metaDataNode = resourceNode.getNode("jcr:content/metadata");
				String articlePageLink = dataNode.getProperty(ARTICLE_PAGE_LINK).getString();
				String jcrUuid = resourceNode.getProperty("jcr:uuid").getString();
				PageManager pageManager = resResolver.adaptTo(PageManager.class);
				if (pageManager != null) {
					Page page = pageManager.getPage(articlePageLink);
					if (page != null) {
						ReplicationStatus status = page.adaptTo(ReplicationStatus.class);
						if (status != null) {
							isActivated = status.isActivated();
						}
						if (isActivated) {
							cfsAndtpData = getData(req, articleResource, metaDataNode, jcrUuid, locale, cfsAndtpData);
						}
					}
				}

			}
		}
		return cfsAndtpData;
	}

	/**
	 * Gets the data.
	 *
	 * @param req
	 *            the req
	 * @param articleResource
	 *            the article resource
	 * @param metaDataNode
	 *            the meta data node
	 * @param jcrUuid
	 *            the jcr uuid
	 * @param locale
	 *            the locale
	 * @param cfsAndtpData
	 *            the cfs andtp data
	 * @return the data
	 * @throws RepositoryException
	 *             the repository exception
	 * @throws ParseException
	 *             the parse exception
	 * @throws JSONException
	 *             the JSON exception
	 */
	private Map<String, JSONArray> getData(SlingHttpServletRequest req, Resource articleResource, Node metaDataNode,
			String jcrUuid, String locale, Map<String, JSONArray> cfsAndtpData)
			throws RepositoryException, ParseException, JSONException {
		ResourceResolver resResolver = req.getResourceResolver();
		final ValueMap articleContent = articleResource.getValueMap();
		String teaser = articleContent.containsKey(ARTICLE_MINI_DESCRIPTION)
				? articleContent.get(ARTICLE_MINI_DESCRIPTION, String.class)
				: StringUtils.EMPTY;
		String articlePublishedDate = articleContent.containsKey(ARTICLE_PUBLISHED_DATE)
				? articleContent.get(ARTICLE_PUBLISHED_DATE, String.class)
				: StringUtils.EMPTY;
		String articleMainDescription = articleContent.containsKey(ARTICLE_MAIN_DESCRIPTION)
				? articleContent.get(ARTICLE_MAIN_DESCRIPTION, String.class)
				: StringUtils.EMPTY;
		String title = articleContent.containsKey(ARTICLE_HEAD_LINE)
				? articleContent.get(ARTICLE_HEAD_LINE, String.class)
				: StringUtils.EMPTY;
		String articlePageLink = articleContent.containsKey(ARTICLE_PAGE_LINK)
				? articleContent.get(ARTICLE_PAGE_LINK, String.class)
				: StringUtils.EMPTY;
		String articleThumbnailImage = articleContent.containsKey(ARTICLE_THUMBNAIL_IMAGE)
				? articleContent.get(ARTICLE_THUMBNAIL_IMAGE, String.class)
				: StringUtils.EMPTY;
		String articleSource = "";
		String displayDate = "";
		String articleType = "";
		String category = "";
		displayDate = formatDate(articlePublishedDate, displayDate);
		TagManager tagManager = resResolver.adaptTo(TagManager.class);
		ArrayList<String> tagList = new ArrayList<>();
		Property tags = metaDataNode.getProperty("cq:tags");
		Value[] values = tags.getValues();
		for (Value v : values) {
			Tag tag = tagManager.resolve(v.getString());
			if (null != tag) {
				tagList.add(tag.getTitle());
			}
		}
		articleType = getArticleType(tagList);
		category = getCategory(tagList);
		articlePageLink = articlePageLink + ".html";
		if (articleType.equalsIgnoreCase("Third-party")) {
			Document doc = Jsoup.parse(articleMainDescription);
			articleThumbnailImage = doc.select("#thumbnail_url").text();
			articlePageLink = doc.select("#third_party_article_url").text();
			articleSource = doc.select("#siteName").text();
		}
		Locale loc = Locale.ENGLISH;
		JSONObject jsonContent = new JSONObject();
		jsonContent.put("Articletype", articleType);
		jsonContent.put("Displaydate", displayDate);
		jsonContent.put("Articlesource", articleSource);
		jsonContent.put("Teasure", teaser);
		jsonContent.put("Title", title);
		jsonContent.put("id", jcrUuid);
		jsonContent.put("SEO-description", teaser);
		jsonContent.put("Thumbnail", articleThumbnailImage);
		jsonContent.put("ArticleURL", articlePageLink);
		jsonContent.put("Category", category);
		cfsAndtpData = addToJsonArray(category.toLowerCase(loc), locale, jsonContent, cfsAndtpData);
		return cfsAndtpData;
	}

	/**
	 * Adds the to json array.
	 *
	 * @param category
	 *            the category
	 * @param locale
	 *            the locale
	 * @param jsonContent
	 *            the json content
	 * @param cfsAndtpData
	 *            the cfs andtp data
	 * @return the map
	 */
	private Map<String, JSONArray> addToJsonArray(String category, String locale, JSONObject jsonContent,
			Map<String, JSONArray> cfsAndtpData) {
		JSONArray cfsAdvisorDataEn = cfsAndtpData.get("cfsAdvisorDataEn");
		JSONArray cfsAdvisorDataFr = cfsAndtpData.get("cfsAdvisorDataFr");
		JSONArray tpAdvisorDataEn = cfsAndtpData.get("tpAdvisorDataEn");
		JSONArray tpAdvisorDataFr = cfsAndtpData.get("tpAdvisorDataFr");
		if (locale.equalsIgnoreCase(LOCALE_CODE_EN)) {
			if (category.contains(CSFADVISOR)) {
				cfsAdvisorDataEn.put(jsonContent);
			}
			if (category.contains(TPADVISOR)) {
				tpAdvisorDataEn.put(jsonContent);
			} //else if (!category.contains(CSFADVISOR) && !category.contains(TPADVISOR)) {
				//cfsAdvisorDataEn.put(jsonContent);
				//tpAdvisorDataEn.put(jsonContent);
			//}
		} else if (locale.equalsIgnoreCase(LOCALE_CODE_FR)) {
			if (category.contains(CSFADVISOR)) {
				cfsAdvisorDataFr.put(jsonContent);
			}
			if (category.contains(TPADVISOR)) {
				tpAdvisorDataFr.put(jsonContent);
			} //else if (!category.contains(CSFADVISOR) && !category.contains(TPADVISOR)) {
				//cfsAdvisorDataFr.put(jsonContent);
				//tpAdvisorDataFr.put(jsonContent);
			//}
		}
		return cfsAndtpData;
	}

	/**
	 * Format date.
	 *
	 * @param articlePublishedDate
	 *            the article published date
	 * @param displayDate
	 *            the display date
	 * @return the string
	 * @throws ParseException
	 *             the parse exception
	 */
	private String formatDate(String articlePublishedDate, String displayDate) throws ParseException {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
		if (StringUtils.isNotBlank(articlePublishedDate)) {
			Date date = format.parse(articlePublishedDate);
			format.applyPattern("dd/MM/yyyy");
			displayDate = format.format(date);
		}
		return displayDate;
	}

	/**
	 * Gets the article type.
	 *
	 * @param tagList
	 *            the tag list
	 * @return the article type
	 */
	private String getArticleType(ArrayList<String> tagList) {
		String articleType = "In-house";
		for (String tag : tagList) {
			if (tag.contains("TPSite")) {
				articleType = "Third-party";
			} else if (tag.contains("L&P")) {
				articleType = "Learn-and-plan";
			}
		}
		return articleType;
	}

	/**
	 * Gets the category.
	 *
	 * @param tagList
	 *            the tag list
	 * @return the category
	 */
	private String getCategory(ArrayList<String> tagList) {
		StringBuilder category = new StringBuilder();
		for (String tag : tagList) {
			if (StringUtils.isNotBlank(category.toString())) {
				category.append(",").append(tag);
			} else {
				category = category.append(tag);
			}
		}
		return category.toString();
	}
}
