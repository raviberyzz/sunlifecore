package ca.sunlife.web.cms.core.models.v1.impl;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.commons.link.LinkManager;
import com.adobe.cq.wcm.core.components.internal.LocalizationUtils;
import com.adobe.cq.wcm.core.components.internal.models.v2.NavigationItemImpl;
import com.adobe.cq.wcm.core.components.models.Navigation;
import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.adobe.cq.wcm.core.components.util.ComponentUtils;
import com.day.cq.wcm.api.LanguageManager;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageFilter;
import com.day.cq.wcm.api.components.Component;
import com.day.cq.wcm.api.components.ComponentContext;
import com.day.cq.wcm.api.designer.Style;
import com.day.cq.wcm.msm.api.LiveRelationshipManager;
import com.drew.lang.annotations.NotNull;
import com.drew.lang.annotations.Nullable;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

/**
 * Navigation model implementation.
 */
@Model(adaptables = {SlingHttpServletRequest.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        adapters = {Navigation.class, ComponentExporter.class},
        resourceType = {NavigationImpl.RESOURCE_TYPE_1, NavigationImpl.RESOURCE_TYPE_2})
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class NavigationImpl implements Navigation {

    /**
     * The resource navigation component resource type.
     */
    protected static final String RESOURCE_TYPE_1 = "sunlife/core/components/content/core-site-map/v1/site-map";
    protected static final String RESOURCE_TYPE_2 = "sunlife/core/components/content/core-navigation/v1/navigation";

    /**
     * Name of the resource / configuration policy property that defines the accessibility label.
     */
    private static final String PN_ACCESSIBILITY_LABEL = "accessibilityLabel";

    /**
     * The current request.
     */
    @Self
    private SlingHttpServletRequest request;

    private String id;

    @SlingObject
    protected Resource resource;

    @ScriptVariable
    @Nullable
    protected Component component;

    @ScriptVariable
    @Nullable
    protected Component componentContext;
    /**
     * The link manager.
     */
    @Self
    private LinkManager linkManager;

    /**
     * The current page.
     */
    @ScriptVariable
    private Page currentPage;

    /**
     * The current style.
     */
    @ScriptVariable
    private Style currentStyle;

    /**
     * The language manager service.
     */
    @OSGiService
    private LanguageManager languageManager;

    /**
     * The relationship manager service.
     */
    @OSGiService
    private LiveRelationshipManager relationshipManager;

    /**
     * The accessibility label.
     */
    @Nullable
    private String accessibilityLabel;

    /**
     * Number indicating how many levels below the navigation root the navigation should start.
     */
    private int structureStart;

    /**
     * Number indicating how many levels below the navigation root should be included in the results.
     * Use "-1" for no limit.
     */
    private int structureDepth;

    /**
     * The root page from which to build the navigation.
     */
    private Page navigationRootPage;

    /**
     * Placeholder for the list of results.
     */
    private List<NavigationItem> items;

    /**
     * Initialize the model.
     */
    @PostConstruct
    private void initModel() {
        ValueMap properties = this.resource.getValueMap();
        structureDepth = properties.get(PN_STRUCTURE_DEPTH, currentStyle.get(PN_STRUCTURE_DEPTH, -1));
        boolean collectAllPages = properties.get(PN_COLLECT_ALL_PAGES, currentStyle.get(PN_COLLECT_ALL_PAGES, true));
        if (collectAllPages) {
            structureDepth = -1;
        }
        if (currentStyle.containsKey(PN_STRUCTURE_START) || properties.containsKey(PN_STRUCTURE_START)) {
            structureStart = properties.get(PN_STRUCTURE_START, currentStyle.get(PN_STRUCTURE_START, 1));
        } else {
            boolean skipNavigationRoot = properties.get(PN_SKIP_NAVIGATION_ROOT, currentStyle.get(PN_SKIP_NAVIGATION_ROOT, true));
            if (skipNavigationRoot) {
                structureStart = 1;
            } else {
                structureStart = 0;
            }
        }
    }

    public String getId() {
        if (id == null) {
            String resourceCallerPath = (String) request.getAttribute("resourceCallerPath");
            this.id = ComponentUtils.getId(this.resource, this.currentPage, resourceCallerPath, (ComponentContext) this.componentContext);
        }
        return id;
    }

    /**
     * Get the effective navigation root page.
     *
     * @return The effective navigation root page.
     */
    private Page getNavigationRoot() {
        if (this.navigationRootPage == null) {
            String navigationRootPath = Optional.ofNullable(this.resource.getValueMap().get(PN_NAVIGATION_ROOT, String.class))
                    .orElseGet(() -> currentStyle.get(PN_NAVIGATION_ROOT, String.class));
            this.navigationRootPage = LocalizationUtils.getLocalPage(navigationRootPath,
                            this.currentPage,
                            this.request.getResourceResolver(),
                            this.languageManager,
                            this.relationshipManager)
                    .orElseGet(() -> currentPage.getPageManager().getPage(navigationRootPath));
        }
        return this.navigationRootPage;
    }

    @Override
    public List<NavigationItem> getItems() {
        if (this.items == null) {
            this.items = Optional.ofNullable(this.getNavigationRoot())
                    .map(navigationRoot -> getRootItems(navigationRoot, structureStart))
                    .orElseGet(Stream::empty)
                    .map(item -> this.createNavigationItem(item, getItems(item)))
                    .collect(Collectors.toList());
        }
        return Collections.unmodifiableList(items);
    }

    protected NavigationItem newNavigationItem(Page page, boolean active, boolean current, @NotNull LinkManager linkManager, int level,
                                               List<NavigationItem> children, String parentId, Component component) {
        return new NavigationItemImpl(page, active, current, linkManager, level, children, parentId, component);
    }

    @Override
    @Nullable
    public String getAccessibilityLabel() {
        if (this.accessibilityLabel == null) {
            this.accessibilityLabel = this.resource.getValueMap().get(PN_ACCESSIBILITY_LABEL, String.class);
        }
        return this.accessibilityLabel;
    }

    @NotNull
    @Override
    public String getExportedType() {
        return this.resource.getResourceType();
    }

    /**
     * Builds the navigation tree for a {@code navigationRoot} page.
     *
     * @param subtreeRoot The page for which to generate the sub-tree.
     * @return the list of collected navigation trees
     */
    private List<NavigationItem> getItems(@NotNull final Page subtreeRoot) {
        if (this.structureDepth < 0 || subtreeRoot.getDepth() - this.getNavigationRoot().getDepth() < this.structureDepth) {
            Iterator<Page> childIterator = subtreeRoot.listChildren(new PageFilter());
            return StreamSupport.stream(((Iterable<Page>) () -> childIterator).spliterator(), false)
                    .map(item -> this.createNavigationItem(item, getItems(item)))
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    /**
     * Gets a stream of the top level of pages in the navigation.
     *
     * @param navigationRoot The navigation root page.
     * @param structureStart The number of levels under the root page to begin collecting pages.
     * @return Stream of all descendant pages of navigationRoot that are exactly structureStart levels deeper.
     */
    private Stream<Page> getRootItems(@NotNull final Page navigationRoot, final int structureStart) {
        if (structureStart < 1) {
            return Stream.of(navigationRoot);
        }
        Iterator<Page> childIterator = navigationRoot.listChildren(new PageFilter());
        return StreamSupport.stream(((Iterable<Page>) () -> childIterator).spliterator(), false)
                .flatMap(child -> getRootItems(child, structureStart - 1));
    }

    /**
     * Create a navigation item for the given page/children.
     *
     * @param page     The page for which to create a navigation item.
     * @param children The child navigation items.
     * @return The newly created navigation item.
     */
    private NavigationItem createNavigationItem(@NotNull final Page page, @NotNull final List<NavigationItem> children) {
        int level = page.getDepth() - (this.getNavigationRoot().getDepth() + structureStart);
        boolean current = checkCurrent(page);
        boolean selected = checkSelected(page, current);
        return newNavigationItem(page, selected, current, linkManager, level, children, getId(), component);
    }

    /**
     * Checks if the specified page is selected.
     * A page is selected if it is either:
     * <ul>
     *     <li>The current page; or,</li>
     *     <li>A page that redirects to the current page; or,</li>
     *     <li>The current page is a child of the specified page</li>
     * </ul>
     *
     * @param page The page to check.
     * @return True if the page is selected, false if not.
     */
    private boolean checkSelected(@NotNull final Page page, boolean current) {
        return current
                || this.currentPage.getPath().startsWith(page.getPath() + "/");
    }

    private boolean checkCurrent(@NotNull final Page page) {
        return this.currentPage.equals(page);

    }


}