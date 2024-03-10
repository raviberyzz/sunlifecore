
package ca.sunlife.web.cms.core.services.impl;

import ca.sunlife.web.cms.core.common.utility.CommonUtils;
import ca.sunlife.web.cms.core.constants.AdvisorDetailConstants;
import ca.sunlife.web.cms.core.constants.v1.BasePageModelConstants;
import ca.sunlife.web.cms.core.services.AnalyticsService;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.SEOService;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import com.day.cq.wcm.api.Page;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;


@Component(service = {AnalyticsService.class}, immediate = true)
public class AnalyticsServiceImp implements AnalyticsService {

    private static final Logger LOG = LoggerFactory.getLogger(SEOService.class);

    @Reference
    SiteConfigService configService;

    @Reference
    CoreResourceResolver coreResourceResolver;

    /**
     * Sets the UDO parameters.
     *
     * @throws LoginException      the login exception
     * @throws RepositoryException the repository exception
     */
    public void setUDOParameters(Page currentPage, String masterPagePath, String advancedPageType, String pageCategory, String pageSubCategory, String breadCrumb, JsonObject otherUDOTagsMap) throws LoginException, RepositoryException {
        LOG.debug("Entry :: setUDOParameters :: ");
        Page pageResource = null;
        String pagePath = currentPage.getPath();
        final String siteUrl = configService.getConfigValues(BasePageModelConstants.SITE_URL_CONSTANT, pagePath);
        LOG.debug("setUDOParameters :: siteUrl: {}", siteUrl);
        if (null == siteUrl || siteUrl.length() <= 0) {
            return;
        }
        pagePath = null == masterPagePath ? pagePath : masterPagePath;
        LOG.debug("pagePath is: {}", pagePath);

        try (ResourceResolver resolver = coreResourceResolver.getResourceResolver()) {
            final Resource resource = resolver.getResource(pagePath);
            if (null != resource) {
                pageResource = resource.adaptTo(Page.class);
            } else {
                pageResource = currentPage;
            }
            int startLevel = siteUrl.replaceFirst(BasePageModelConstants.SLASH_CONSTANT, "")
                    .split(BasePageModelConstants.SLASH_CONSTANT).length;
            int rootPageLevel = startLevel - 1;
            int currentLevel = null != pageResource ? pageResource.getDepth() : 0;
            final List<String> navList = new ArrayList<>();
            // Root page title fetch
            final Page rootPage = null != pageResource ? pageResource.getAbsoluteParent(rootPageLevel)
                    : null;
            if (rootPage != null) {
                navList.add(CommonUtils.getBreadcrumbTitle(rootPage).toLowerCase(Locale.getDefault()));
            }
            if (null != advancedPageType
                    && BasePageModelConstants.PAGE_TYPE_ARTICLE_PAGES_CONSTANT.equals(advancedPageType)) {
                currentLevel = currentLevel - 1;
            }
            while (startLevel < currentLevel) {
                final Page page = null != pageResource ? pageResource.getAbsoluteParent(startLevel) : null;
                if (page != null) {
                    final boolean isActivePage = page.equals(pageResource);
                    navList.add(page.getName().replaceAll("-", " "));
                    if (isActivePage) {
                        break;
                    }
                }
                startLevel++;
            }

            if (!navList.isEmpty()) {
                if (navList.size() > 1) {
                    pageCategory = navList.get(1);
                }
                if (navList.size() > 2) {
                    pageSubCategory = navList.get(2);
                }
                breadCrumb = BasePageModelConstants.SLASH_CONSTANT
                        + navList.stream().collect(Collectors.joining(BasePageModelConstants.SLASH_CONSTANT));
            }
            LOG.debug("breadCrumb: {}, pageCategory: {}, pageSubCategory: {}", breadCrumb, pageCategory,
                    pageSubCategory);
            otherUDOTagsMap.addProperty("page_breadcrumb", breadCrumb); // Bread crumb
            otherUDOTagsMap.addProperty("page_category", pageCategory == null ? breadCrumb : pageCategory); // Page
            // category
            otherUDOTagsMap.addProperty("page_subcategory", pageSubCategory == null ? "" : pageSubCategory); // Page
            // sub
            // category

            // For advisor pages

            LOG.debug("Exit :: setUDOParameters :: otherUDOTagsMap: {}", otherUDOTagsMap);
        }
    }

    /**
     * Process UDO path.
     *
     * @param path the path
     * @return
     */
    private JsonObject processUDOPath(final String path, JsonObject otherUDOTagsMap) {
        LOG.debug("Entry :: processUDOPath :: path :: {}", path);
        if (null == path || !path.contains(BasePageModelConstants.SLASH_CONSTANT)) {
            LOG.debug("No child tag exists for path: {}", path);
            return otherUDOTagsMap;
        }
        final String key = path.split(BasePageModelConstants.SLASH_CONSTANT)[0];
        final String value = path.split(BasePageModelConstants.SLASH_CONSTANT)[1];
        if (otherUDOTagsMap.has(key)) {
            if (otherUDOTagsMap.get(key).isJsonArray()) {
                final JsonArray jsonArray = otherUDOTagsMap.getAsJsonArray(key);
                jsonArray.add(value);
                otherUDOTagsMap.add(key, jsonArray);
            } else {
                final String oldValue = otherUDOTagsMap.get(key).getAsString();
                final JsonArray jsonArray = new JsonArray();
                jsonArray.add(oldValue);
                jsonArray.add(value);
                otherUDOTagsMap.add(key, jsonArray);
            }
        } else {
            otherUDOTagsMap.addProperty(key, value);
        }
        LOG.debug("Exit :: processUDOPath :: otherUDOTagsMap :: {}", otherUDOTagsMap);
        return otherUDOTagsMap;
    }


    @Override
    public JsonObject setOtherUDOTags(String udoTagStart, String[] tags, JsonObject otherUDOTagsMap) {
        LOG.debug("Entry :: setOtherUDOTags method of :: udoTagStart :: {}", udoTagStart);
        final String tagAbsolutePath = udoTagStart.replace("/content/cq:tags/", "");
        final String tagRootPath = tagAbsolutePath
                .substring(tagAbsolutePath.indexOf(BasePageModelConstants.SLASH_CONSTANT));
        if (null != tags && tags.length > 0) {
            LOG.debug("tags :: {}", Arrays.asList(tags));
            for (final String tag : tags) {
                final String[] array = tag.split(":");
                if (array[1]
                        .startsWith(tagRootPath.replaceFirst(BasePageModelConstants.SLASH_CONSTANT, ""))) {
                    final String path = array[1]
                            .replace(tagRootPath.substring(1) + BasePageModelConstants.SLASH_CONSTANT, "");
                    return otherUDOTagsMap = processUDOPath(path, otherUDOTagsMap);
                }
            }
        }
        LOG.debug("Exit :: setOtherUDOTags method of :: otherUDOTagsMap :: {}", otherUDOTagsMap);
        return otherUDOTagsMap;
    }

    @Override
    public JsonObject setUDOTagsForAdvisorPages(SlingHttpServletRequest request, String advisorType, JsonObject otherUDOTagsMap) {
        LOG.debug("Entry :: BasePageModel :: setUDOTagsForAdvisorPages :: ");
        String advisorId = null;
        if (request.getRequestPathInfo().getSelectors().length > 0) {
            advisorId = request.getRequestPathInfo().getSelectors()[0];
            otherUDOTagsMap.addProperty(AdvisorDetailConstants.PAGE_ADVISOR_ID_CONSTANT, advisorId);
            otherUDOTagsMap.addProperty(AdvisorDetailConstants.PAGE_ADVISOR_TYPE_CONSTANT, advisorType);
        }
        LOG.debug("setUDOTagsForAdvisorPages :: advisorId :: {}, advisorType :: {}", advisorId,
                advisorType);
        LOG.debug("Exit :: BasePageModel :: setUDOTagsForAdvisorPages :: ");
        return otherUDOTagsMap;
    }
}

