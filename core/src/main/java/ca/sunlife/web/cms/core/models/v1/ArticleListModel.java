package ca.sunlife.web.cms.core.models.v1;

import ca.sunlife.web.cms.core.beans.Pagination;
import ca.sunlife.web.cms.core.constants.v1.ContentFragmentConstants;
import ca.sunlife.web.cms.core.services.ArticleQueryService;
import ca.sunlife.web.cms.core.services.DAMContentFragmentService;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import com.adobe.cq.dam.cfm.converter.ContentTypeConverter;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.contentfragment.DAMContentFragment;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.RepositoryException;
import java.util.*;

@Getter
@Setter
@Model(adaptables = {Resource.class, SlingHttpServletRequest.class}, adapters = {ComponentExporter.class}, resourceType = {
        ArticleListModel.RESOURCE_TYPE}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
@JsonSerialize(as = ArticleListModel.class)

public class ArticleListModel implements ComponentExporter {

    protected static final String RESOURCE_TYPE = "sunlife/core/components/content/core-articleList/v1/articleList";
    private static final Logger LOGGER = LoggerFactory.getLogger(ArticleListModel.class);

    private final List<DAMContentFragment> items = new ArrayList<>();

    @ValueMapValue
    private String parentPath;

    @ValueMapValue
    private String[] tagNames;

    @ValueMapValue
    private String displayType;

    @ValueMapValue
    private int hideTop;

    @ValueMapValue
    private int maxItems;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String titleLevel;

    @ValueMapValue
    private String spacing;

    @ValueMapValue
    private String accessibilityLabel;

    @Inject
    private ContentTypeConverter contentTypeConverter;

    @OSGiService
    private SiteConfigService configService;

    /** This is the service that is being used to get the article list.*/
    @OSGiService
    private ArticleQueryService articleQueryService;

    /** This is the service that is being used to get the content fragment.*/
    @OSGiService
    private DAMContentFragmentService damContentFragmentService;


    /**
     * The resource resolver.
     */
    @SlingObject
    private ResourceResolver resourceResolver;

    @Self(injectionStrategy = InjectionStrategy.REQUIRED)
    private SlingHttpServletRequest request;

    private int pageNum = 0;

    private int index = 0;

    private String dateFormat;

    private String pageLocale;

    @ScriptVariable
    private Page currentPage;

    private Pagination pagination;

    private String pageUrl;

    private int totalMatch;

    /**
     * Gets the list items.
     *
     * @return the list items
     */
    public Collection<DAMContentFragment> getListItems() {
        return Collections.unmodifiableCollection(items);
    }


    @Override
    public String getExportedType() {
        return request.getResource().getResourceType();
    }

    @PostConstruct
    private void initModel() {
        LOGGER.debug("Entry :: ArticleListImpl :: initModel ");
        String pageLocaleDefault = StringUtils.EMPTY;
        if (StringUtils.isEmpty(getParentPath())) {
            LOGGER.debug("Parent path is empty, returning");
            return;
        }
        final String[] selectors = request.getRequestPathInfo().getSelectors();
        index = selectors.length > 0 ? (selectors.length - 1) : 0;
        if (selectors.length > 0 && StringUtils.isNumeric(selectors[index]) && Integer.parseInt(selectors[index]) > 1
                && !getDisplayType().equals("articleList")) {
            LOGGER.debug("Returning as the selector is not a number or is less than 1 or display type is not articleList");
            return;
        }
        try {
            setDateFormat(configService.getConfigValues("articleDateFormat", currentPage.getPath()));

            final String locale = configService.getConfigValues("pageLocale", currentPage.getPath());
            if (null != locale && locale.length() > 0) {
                pageLocaleDefault = locale.contains("-") ? locale.split("-")[0] : locale.split("_")[0];
            }
            setPageLocale(pageLocaleDefault);
            SearchResult searchResult = articleQueryService.processQuery(getQueryParameterMap(selectors));
            if (null != searchResult) {
                setTotalMatch(Integer.parseInt(searchResult.getTotalMatches() + StringUtils.EMPTY));
                List<Hit> hits = searchResult.getHits();
                for (Hit hit : hits) {
                    items.add(damContentFragmentService.getContentFragment(hit.getPath(), ContentFragmentConstants.ARTICLE_LIST_ELEMENT, contentTypeConverter));
                }
            }

            if (getDisplayType().equals("articleList")) {
                String path = currentPage.getPath();
                path = configService.getPageRelativeUrl(path);
                setPagination(new Pagination(request, getMaxItems(), getTotalMatch(), path));
                setPageUrl(path);
            }
        } catch (LoginException | RepositoryException e) {
            LOGGER.error("Login exception while trying to get resource resolver {}", e.getMessage());
        }
    }

    private Map<String, String> getQueryParameterMap(String[] selectors) {
        LOGGER.debug("Entry :: ArticleListImpl :: getQueryParameterMap");

        int offset = 0;
        int limit = getMaxItems();
        if (selectors.length > 0 && StringUtils.isNumeric(selectors[index])) {
            setPageNum(Integer.parseInt(selectors[index]));
            offset = (getPageNum() - 1) * getMaxItems(); // Pagination
        } else if (getHideTop() > 0) {
            offset = getHideTop();
            limit = getMaxItems() - getHideTop();
        }
        return articleQueryService.generateQueryParameterMap(getParentPath(), offset, limit, tagNames);
    }

}
 