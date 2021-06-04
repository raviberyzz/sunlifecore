package ca.sunlife.web.cms.advisorhub.models;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.dam.cfm.converter.ContentTypeConverter;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.internal.models.v1.contentfragment.DAMContentFragmentImpl;
import com.adobe.cq.wcm.core.components.models.contentfragment.DAMContentFragment;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * The Class OutageListModel
 * 
 * @author TCS
 * @version 1.0
 *
 */
@ Model(adaptables = SlingHttpServletRequest.class, adapters = {
		ComponentExporter.class }, resourceType = OutageListModel.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@ Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
@ JsonSerialize(as = OutageListModel.class)

public class OutageListModel implements ComponentExporter {

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(OutageListModel.class);

	public static final String RESOURCE_TYPE = "sunlife/advisorhub/components/content/outageList";

	/** The parent path. */
	@ Inject
	@ Via("resource")
	private String parentPath;

	/** The display type. */
	@ Inject
	@ Via("resource")
	private String displayType;
	
	/** The outage helptext. */
	@ Inject
	@ Via("resource")
	private String outageHelpText;
	
	/** The outage notification type. */
	@ Inject
	@ Via("resource")
	private String outageNotificationType;

	
	/** The config service. */
	@ Inject
	private SiteConfigService configService;

	/** The date format. */
	private String dateFormat;

	/** The page locale. */
	private String pageLocale;

	/** The resource resolver. */
	@ SlingObject
	private ResourceResolver resourceResolver;

	/** The items. */
	private final List<DAMContentFragment> items = new ArrayList<>();

	/** The request. */
	@ Self(injectionStrategy = InjectionStrategy.REQUIRED)
	private SlingHttpServletRequest request;

	/** The content type converter. */
	@ Inject
	private ContentTypeConverter contentTypeConverter;

	/** The current page. */
	@ ScriptVariable
	private Page currentPage;

	/**
	 * Gets the dateFormat.
	 *
	 * @return the dateFormat
	 */
	public String getDateFormat() {
		return dateFormat;
	}

	/**
	 * Sets the dateFormat.
	 *
	 * @param dateFormat
	 *          the dateFormat
	 */
	public void setDateFormat(String dateFormat) {
		this.dateFormat = dateFormat;
	}
	
	/**
	 * Gets the total match.
	 *
	 * @return the total match
	 */
	public final int getTotalMatch() {
		return totalMatch;
	}

	/**
	 * Sets the total match.
	 *
	 * @param totalMatch
	 *          the new total match
	 */
	public final void setTotalMatch(final int totalMatch) {
		this.totalMatch = totalMatch;
	}

	/** The total match. */
	private int totalMatch;

	/** The Constant ELEMENT_NAMES. */
	private static final String[] ELEMENT_NAMES = { "outageDate", "outageTitle", "outagePageLink", "outageDescription",
			"outageIcon", "outageIconColor", "outageStatus", "outageTeaser" };

	/**
	 * Gets the parent path.
	 *
	 * @return the parent path
	 */
	public final String getParentPath() {
		return parentPath;
	}

	/**
	 * Sets the parent path.
	 *
	 * @param parentPath
	 *          the new parent path
	 */
	public final void setParentPath(final String parentPath) {
		this.parentPath = parentPath;
	}

	/**
	 * Gets the display type.
	 *
	 * @return the display type
	 */
	public final String getDisplayType() {
		return displayType;
	}

	/**
	 * Sets the display type.
	 *
	 * @param displayType
	 *          the new display type
	 */
	public final void setDisplayType(final String displayType) {
		this.displayType = displayType;
	}
	
	/**
	 * Gets the outage help text.
	 *
	 * @return the outage help text
	 */
	public String getOutageHelpText() {
		return outageHelpText;
	}
    
	/**
	 * Sets the outage help text.
	 *
	 * @param outageHelpText
	 *          the new outage help text
	 */
	public void setOutageHelpText(String outageHelpText) {
		this.outageHelpText = outageHelpText;
	}

	/**
	 * Gets the outage notification type.
	 *
	 * @return the outage notification type
	 */
	public String getOutageNotificationType() {
		return outageNotificationType;
	}
    
	/**
	 * Sets the outage notification type.
	 *
	 * @param outageNotificationType
	 *          the new outage notification type
	 */
	public void setOutageNotificationType(String outageNotificationType) {
		this.outageNotificationType = outageNotificationType;
	}


	/**
	 * Gets the page locale.
	 *
	 * @return the page locale
	 */
	public final String getPageLocale() {
		return pageLocale;
	}

	/**
	 * Sets the page locale.
	 *
	 * @param pageLocale
	 *          the new page locale
	 */
	public final void setPageLocale(final String pageLocale) {
		this.pageLocale = pageLocale;
	}

	/**
	 * Gets the list items.
	 *
	 * @return the list items
	 */
	public Collection<DAMContentFragment> getListItems() {
		return Collections.unmodifiableCollection(items);
	}

	/**
	 * Inits the model.
	 */
	@ PostConstruct
	private void initModel() {

		String pageLocaleDefault = StringUtils.EMPTY;
		if (StringUtils.isEmpty(getParentPath())) {
			return;
		}
		//final String[] selectors = request.getRequestPathInfo().getSelectors();
		try {

			setDateFormat(configService.getConfigValues("outageDateFormat", currentPage.getPath()));
			final String locale = configService.getConfigValues("pageLocale", currentPage.getPath());
			if (null != locale && locale.length() > 0) {
				pageLocaleDefault = locale.contains("-") ? locale.split("-")[0] : locale.split("_")[0];
			}

			setPageLocale(pageLocaleDefault);

			final Session session = resourceResolver.adaptTo(Session.class);
			if (session == null) {
				LOGGER.warn("Session was null therefore no query was executed");
				return;
			}
			final QueryBuilder queryBuilder = resourceResolver.adaptTo(QueryBuilder.class);
			if (queryBuilder == null) {
				LOGGER.warn("Query builder was null therefore no query was executed");
				return;
			}
			final Map<String, String> queryParameterMap = new HashMap<>();
			setQueryParameterMap(queryParameterMap);
			final PredicateGroup predicateGroup = PredicateGroup.create(queryParameterMap);
			LOGGER.debug("Query Params : {} : predicateGroup {}", queryParameterMap, predicateGroup);
			final Query query = queryBuilder.createQuery(predicateGroup, session);
			LOGGER.debug("Query before search {}", query);
			final SearchResult searchResult = query.getResult();
			LOGGER.debug("Query statement: '{}' : total matches: {}", searchResult.getQueryStatement(),
					searchResult.getTotalMatches());

			setTotalMatch(Integer.parseInt(searchResult.getTotalMatches() + StringUtils.EMPTY));
			// Query builder has a leaking resource resolver, so the following work around
			// is required.
			ResourceResolver leakingResourceResolver = null;
			try {
				// Iterate over the hits if you need special information
				final Iterator<Resource> resourceIterator = searchResult.getResources();
				while (resourceIterator.hasNext()) {
					final Resource resource = resourceIterator.next();
					if (leakingResourceResolver == null) {
						// Get a reference to QB's leaking resource resolver
						leakingResourceResolver = resource.getResourceResolver();
					}

					final DAMContentFragment contentFragmentModel = new DAMContentFragmentImpl(resource, contentTypeConverter,
							null, ELEMENT_NAMES);

					items.add(contentFragmentModel);
				}
			} finally {
				if (null != leakingResourceResolver) {
					// Always close the leaking query builder resource resolver
					leakingResourceResolver.close();
				}
			}
		} catch (LoginException | RepositoryException e) {
			LOGGER.error("Login exception while trying to get resource resolver {}", e);
		}
	}

	/**
	 * Sets the query parameter map.
	 *
	 * @param queryParameterMap
	 *          the query parameter map
	 */
	private void setQueryParameterMap(final Map<String, String> queryParameterMap) {
		queryParameterMap.put("path", getParentPath());
		queryParameterMap.put("type", com.day.cq.dam.api.DamConstants.NT_DAM_ASSET);
		queryParameterMap.put("p.limit", "-1");
		queryParameterMap.put("1_property", JcrConstants.JCR_CONTENT + "/data/cq:model");
		queryParameterMap.put("1_property.value", "/conf/sunlife/settings/dam/cfm/models/advisorhub-outage-model");
		queryParameterMap.put("orderby", "@" + JcrConstants.JCR_CONTENT + "/data/master/outageDate");
		queryParameterMap.put("orderby.sort", "desc");
	}

	@ Override
	public String getExportedType() {
		return RESOURCE_TYPE;
	}
}
