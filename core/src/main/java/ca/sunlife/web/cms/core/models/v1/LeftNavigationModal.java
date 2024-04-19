package ca.sunlife.web.cms.core.models.v1;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.RangeIterator;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.commons.link.LinkManager;
import com.adobe.cq.wcm.core.components.models.Navigation;
import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.day.cq.wcm.api.LanguageManager;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.WCMException;
import com.day.cq.wcm.api.components.Component;
import com.day.cq.wcm.api.designer.Style;
import com.day.cq.wcm.msm.api.LiveRelationship;
import com.day.cq.wcm.msm.api.LiveRelationshipManager;
import com.drew.lang.annotations.Nullable;

import ca.sunlife.web.cms.core.services.SiteConfigService;
import lombok.Getter;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { LeftNavigationModal.class,
		ComponentExporter.class }, resourceType = LeftNavigationModal.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, selector = ExporterConstants.SLING_MODEL_SELECTOR, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class LeftNavigationModal implements Navigation {

	/** The Constant RESOURCE_TYPE. */
	public static final String RESOURCE_TYPE = "sunlife/core/components/content/core-left-navigation/v1/left-navigation";

	/** The Constant log. */
	private static final Logger LOGGER = LoggerFactory.getLogger(LeftNavigationModal.class);

	/** The request. */
	@Self
	private SlingHttpServletRequest request;

	/** The resource resolver. */
	@SlingObject
	private ResourceResolver resourceResolver;

	/** The current page. */
	@ScriptVariable
	private Page currentPage;

	/** The properties. */
	@ScriptVariable
	private ValueMap properties;

	/** The current style. */
	@ScriptVariable
	private Style currentStyle;

	/** The language manager. */
	@OSGiService
	private LanguageManager languageManager;

	/** The relationship manager. */
	@OSGiService
	private LiveRelationshipManager relationshipManager;

	/** The accessibility label. */
	@ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
	@Getter
	private String accessibilityLabel;

	/** The config service. */
	@Inject
	private SiteConfigService configService;

	/** The structure depth. */
	private int structureDepth;

	/** The navigation root page. */
	private String navigationRootPage;

	/** The items. */
	private List<NavigationItem> items;

	/** The structure start. */
	private int structureStart;

	/** The Skip navigation root */
	@Getter
	private boolean skipNavigationRoot;

	/** The updated list. */
	private List<NavigationItem> updatedList = new ArrayList<>();

	/** The constant for skip nav root. */
	private final static String PN_SKIP_NAVIGATION_ROOT_CONSTANT = "skipNavigationRoot";

	@Self
	private LinkManager linkManager;

	@ScriptVariable
	@Nullable
	protected Component component;

	/** The top header label. */
	@ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
	@Getter
	private String leftNavTopHeader;

	private LeftNavigationItemProcessor leftNavigationItemProcessor = new LeftNavigationItemProcessor();

	/**
	 * Gets the updated list.
	 *
	 * @return the updated list
	 */
	public List<NavigationItem> getUpdatedList() {
		return Collections.unmodifiableList(updatedList);
	}

	/**
	 * Sets the updated list.
	 *
	 * @param updatedList the new updated list
	 */
	public void setUpdatedList(final List<NavigationItem> updatedList) {
		this.updatedList = Collections.unmodifiableList(updatedList);
	}

	/**
	 * Inits the model.
	 */
	@PostConstruct
	private void initModel() {

		/*
		 * As per sunlife requirements leftnavigation should be autopopulated and it
		 * should not be read from dialog So the value of structuredepth, Navigation
		 * root page and structure start is hardcoded in the code
		 */

		final int pageDepth = currentPage.getDepth();
		final int m = pageDepth - 6;
		final Page page = currentPage.getParent(m);

		structureDepth = properties.get(PN_STRUCTURE_DEPTH, currentStyle.get(PN_STRUCTURE_DEPTH, -1));
		boolean collectAllPages = properties.get(PN_COLLECT_ALL_PAGES, currentStyle.get(PN_COLLECT_ALL_PAGES, true));
		structureDepth = collectAllPages ? -1 : 1;
		navigationRootPage = properties.get(PN_NAVIGATION_ROOT, String.class);
		if (currentStyle.containsKey(PN_STRUCTURE_START) || properties.containsKey(PN_STRUCTURE_START)) {
			structureStart = properties.get(PN_STRUCTURE_START, currentStyle.get(PN_STRUCTURE_START, 1));
		} else {
			skipNavigationRoot = properties.get(PN_SKIP_NAVIGATION_ROOT_CONSTANT,
					currentStyle.get(PN_SKIP_NAVIGATION_ROOT_CONSTANT, true));
			structureStart = skipNavigationRoot ? 1 : 0;
		}
		if (!(navigationRootPage != null && navigationRootPage.length() > 0)) {
			structureDepth = 2;
			navigationRootPage = page.getPath();
			structureStart = 0;
		}
		updatedList = leftNavigationItemProcessor.processNavigationList(getItems(), configService, currentPage, request,
				linkManager, component, resourceResolver, items);

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.adobe.cq.wcm.core.components.internal.models.v1.NavigationImpl#getItems()
	 */
	@Override
	public List<NavigationItem> getItems() {
		if (items == null) {
			final PageManager pageManager = currentPage.getPageManager();
			final Page rootPage = pageManager.getPage(navigationRootPage);
			if (rootPage != null) {
				NavigationRoot navigationRoot = new NavigationRoot(rootPage, structureDepth);
				final Page navigationRootLanguageRoot = navigationRoot.getPageResource(resourceResolver)
						.map(languageManager::getLanguageRoot).orElse(null);
				final Page currentPageLanguageRoot = languageManager.getLanguageRoot(currentPage.getContentResource());
				RangeIterator liveCopiesIterator = null;
				try {
					liveCopiesIterator = relationshipManager
							.getLiveRelationships(navigationRoot.getPage().adaptTo(Resource.class), null, null);
				} catch (final WCMException e) {
					LOGGER.error("Error while getting live relationships for page {}",
							navigationRoot.getPage().getPath(), e);
				}
				if (navigationRootLanguageRoot != null && currentPageLanguageRoot != null
						&& !navigationRootLanguageRoot.equals(currentPageLanguageRoot)) {
					// check if there's a language copy of the navigation root
					final Page languageCopyNavigationRoot = pageManager.getPage(
							ResourceUtil.normalize(currentPageLanguageRoot.getPath() + "/" + leftNavigationItemProcessor
									.getRelativePath(navigationRootLanguageRoot, navigationRoot.getPage())));
					if (languageCopyNavigationRoot != null) {
						navigationRoot = new NavigationRoot(languageCopyNavigationRoot, structureDepth);
					}
				} else if (liveCopiesIterator != null) {
					while (liveCopiesIterator.hasNext()) {
						final LiveRelationship relationship = (LiveRelationship) liveCopiesIterator.next();
						if (currentPage.getPath().startsWith(relationship.getTargetPath() + "/")) {
							final Page liveCopyNavigationRoot = pageManager.getPage(relationship.getTargetPath());
							if (liveCopyNavigationRoot != null) {
								navigationRoot = new NavigationRoot(liveCopyNavigationRoot, structureDepth);
								break;
							}
						}
					}
				}
				items = leftNavigationItemProcessor.getNavigationTree(navigationRoot, linkManager, component, getId(),
						structureStart, structureDepth, currentPage, resourceResolver);
			} else {
				items = Collections.emptyList();
			}
		}
		return Collections.unmodifiableList(items);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.adobe.cq.wcm.core.components.internal.models.v1.NavigationImpl#
	 * getExportedType()
	 */
	@Override
	public String getExportedType() {
		return request.getResource().getResourceType();
	}

}