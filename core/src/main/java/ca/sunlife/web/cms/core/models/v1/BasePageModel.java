package ca.sunlife.web.cms.core.models.v1;

import ca.sunlife.web.cms.core.beans.NewsDetails;
import ca.sunlife.web.cms.core.beans.v1.CoveoSearchConfig;
import ca.sunlife.web.cms.core.common.utility.CommonUtils;
import ca.sunlife.web.cms.core.constants.AdvisorDetailConstants;
import ca.sunlife.web.cms.core.constants.v1.BasePageModelConstants;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.services.*;
import com.adobe.cq.wcm.launches.utils.LaunchUtils;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.WCMException;
import com.day.cq.wcm.msm.api.LiveCopy;
import com.day.cq.wcm.msm.api.LiveRelationship;
import com.day.cq.wcm.msm.api.LiveRelationshipManager;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.WordUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.*;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Named;
import javax.jcr.RangeIterator;
import javax.jcr.RepositoryException;
import java.io.IOException;
import java.text.ParseException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

@Model(adaptables = {SlingHttpServletRequest.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = BasePageModel.RESOURCE_TYPE)
public class BasePageModel {

    protected static final String RESOURCE_TYPE = "sunlife/corfe/components/structure/core-base-page";
    /**
     * The Constant LOG.
     */
    private static final Logger LOG = LoggerFactory.getLogger(BasePageModel.class);

    /**
     * The current page.
     */
    @ScriptVariable
    private Page currentPage;

    /**
     * The request.
     */
    @Self
    private SlingHttpServletRequest request;

    /**
     * The resolver.
     */
    @SlingObject
    private ResourceResolver resolver;


    /**
     * The relationship manager.
     */
    @OSGiService
    private LiveRelationshipManager relationshipManager;

    @OSGiService
    private SEOService seoService;

    @OSGiService
    private AnalyticsService analyticsService;

    /**
     * The canonical url.
     */
    @ValueMapValue
    @Via("resource")
    private String canonicalUrl;


    /**
     * The page title.
     */
    @ValueMapValue
    @Via("resource")
    private String pageTitle;

    /**
     * The description.
     */
    @ValueMapValue
    @Named(com.day.cq.commons.jcr.JcrConstants.JCR_DESCRIPTION)
    @Via("resource")
    private String description;


    /**
     * The language.
     */
    @ValueMapValue
    @Named(com.day.cq.commons.jcr.JcrConstants.JCR_LANGUAGE)
    @Via("resource")
    private String language;

    /**
     * The title.
     */
    @ValueMapValue
    @Named(com.day.cq.commons.jcr.JcrConstants.JCR_TITLE)
    @Via("resource")
    private String title;

    /**
     * The social media descripton.
     */
    @Getter
    @Setter
    @ValueMapValue
    @Via("resource")
    private String socialMediaDescripton;

    /**
     * The page indexing.
     */
    @Getter
    @ValueMapValue
    @Via("resource")
    private String pageIndexing;

    /**
     * The social media title.
     */
    private String socialMediaTitle;

    /**
     * The seo page title.
     */
    @Getter
    private String seoPageTitle;

    /**
     * The seo canonical url.
     */
    @Getter
    @Setter
    private String seoCanonicalUrl;

    /**
     * The seo description.
     */
    @Getter
    private String seoDescription;

    /**
     * The social media image.
     */
    @Getter
    @Setter
    @ValueMapValue
    @Via("resource")
    private String socialMediaImage;

    /**
     * The advanced page type.
     */
    @Getter
    @Setter
    @ValueMapValue
    @Via("resource")
    private String advancedPageType;

    /**
     * The head include.
     */
    @Getter
    @Setter
    @ValueMapValue
    @Via("resource")
    private String headInclude;

    /**
     * The body include.
     */
    @ValueMapValue
    @Via("resource")
    @Getter
    @Setter
    private String bodyInclude;

    /**
     * The advisor type.
     */
    @ValueMapValue
    @Via("resource")
    private String advisorType;

    /**
     * The config service.
     */
    @OSGiService
    private SiteConfigService configService;

    /**
     * The cnw news service.
     */
    @OSGiService
    private CNWNewsService cnwNewsService;

    /**
     * The advisor detail service.
     */
    @OSGiService
    private AdvisorDetailService advisorDetailService;

    @OSGiService
    private SearchService searchService;

    /**
     * The custom metadata.
     */
    @Getter
    @Setter
    private Map<String, String> customMetadata;

    /**
     * The alt language links.
     */
    @Getter
    @Setter
    private Map<String, String> altLanguageLinks;

    /**
     * The analytics scriptlet.
     */
    @Getter
    @Setter
    private String analyticsScriptlet;

    /**
     * The analytics script path.
     */
    @Getter
    @Setter
    private String analyticsScriptPath;

    /**
     * The bread crumb.
     */
    @Getter
    @Setter
    private String breadCrumb;

    /**
     * The page category.
     */
    @Getter
    @Setter
    private String pageCategory;

    /**
     * The page sub category.
     */
    @Getter
    @Setter
    private String pageSubCategory;

    /**
     * The tags.
     */
    @ValueMapValue
    @Named(com.day.cq.tagging.TagConstants.PN_TAGS)
    @Via("resource")
    private String[] tags;

    /**
     * The other UDO tags map.
     */
    @Getter
    @Setter
    private JsonObject otherUDOTagsMap;

    /**
     * The udo tags.
     */
    @Getter
    @Setter
    private String udoTags;


    /**
     * The master page path.
     */
    private String masterPagePath;

    /**
     * The master seo canonical url.
     */
    private String masterSeoCanonicalUrl;


    /**
     * The page locale default.
     */
    @Getter
    @Setter
    private String pageLocaleDefault = "en";

    /**
     * The auto complete url.
     */
    @Getter
    @Setter
    private String autoCompleteUrl;

    /**
     * The search api.
     */
    @Getter
    @Setter
    private String searchApi;

    /**
     * The enable context hinub.
     */
    @Getter
    @Setter
    private String enableContextHub;

    /**
     * The User info path.
     */
    @Getter
    @Setter
    private String userInfoPath;


    /**
     * The extra Clientlibs.
     */
    @Getter
    @Setter
    private String extraClientlibs;

    /**
     * The site Head Include.
     */
    @Getter
    @Setter
    private String siteHeadInclude;

    /**
     * The site Body Include.
     */
    @Getter
    @Setter
    private String siteBodyInclude;

    /**
     * The site Body Include.
     */
    @Getter
    @Setter
    private String addOpeningDiv;

    /**
     * The site wrapper div class.
     */
    @Getter
    @Setter
    private String wrapperDivClass;

    /**
     * The mfa Domain Path.
     */
    @Getter
    @Setter
    private String mfaDomainPath;

    /**
     * The mfa Encryption.
     */
    @Getter
    @Setter
    private String mfaEncryption;

    /**
     * The favicon.
     */
    @Getter
    @Setter
    @ValueMapValue
    private String favIcon;

    /**
     * The disableSocialSharingTags.
     */
    @Getter
    @Setter
    @ValueMapValue
    private String disableSocialSharingTags;

    /**
     * The disableContextHubTags.
     */
    @Getter
    @Setter
    private String disableContextHubTags;


    @Getter
    private CoveoSearchConfig coveoSearchConfig;
    /**
     * The nonResponsive.
     */
    @Getter
    @Setter
    private String nonResponsive;


    /**
     * Gets the page title tag.
     *
     * @return the page title tag
     */
    public String getPageTitleTag() {
        return socialMediaTitle;
    }

    /**
     * Sets the page title tag.
     *
     * @param pageTitleTag the new page title tag
     */
    public void setPageTitleTag(final String pageTitleTag) {
        socialMediaTitle = pageTitleTag;
    }


    /**
     * Gets the tags.
     *
     * @return the tags
     */
    public String[] getTags() {
        return null != tags ? Arrays.copyOf(tags, tags.length) : new String[0];
    }

    /**
     * Sets the tags.
     *
     * @param tags the new tags
     */
    public void setTags(final String[] tags) {
        this.tags = null != tags ? tags.clone() : null;
    }

    /**
     * Inits the.
     *
     * @throws LoginException      the login exception
     * @throws RepositoryException the repository exception
     */
    @PostConstruct
    public void init() throws LoginException, RepositoryException, WCMException {
        final String pagePath = currentPage.getPath();
        final String domain = configService.getConfigValues(BasePageModelConstants.DOMAIN_STR, pagePath);
        final String staticPath = configService.getConfigValues(BasePageModelConstants.STATIC_PATH_CONSTANT, pagePath);
        final String locale = configService.getConfigValues(BasePageModelConstants.PAGE_LOCALE, pagePath);
        final String udoTagsPath = configService.getConfigValues(BasePageModelConstants.UDO_TAGS_PATH, pagePath);
        favIcon = configService.getConfigValues("favIcon", pagePath);
        enableContextHub = configService.getConfigValues(BasePageModelConstants.ENABLE_CONTEXT_HUB_CONSTANT, pagePath);
        userInfoPath = configService.getConfigValues("userInfoPath", pagePath);
        extraClientlibs = configService.getConfigValues(BasePageModelConstants.EXTRA_CLIENTLIBS, pagePath);
        disableSocialSharingTags = configService.getConfigValues("disableSocialSharingTags", pagePath);
        disableContextHubTags = configService.getConfigValues("disableContextHubTags", pagePath);
        nonResponsive = configService.getConfigValues("nonResponsive", pagePath);
        // setting Coveo Search Configurations
        coveoSearchConfig = searchService.getSearchConfig(pagePath);

        if (currentPage.getPath().contains(BasePageModelConstants.SLFAS_PATH) || currentPage.getPath().contains(BasePageModelConstants.SUNCENTRAL_PATH)) {
            siteHeadInclude = null == configService.getConfigValues(BasePageModelConstants.SITE_HEAD_INCLUDE, pagePath) ? "" : processSiteIncludes(configService.getConfigValues(BasePageModelConstants.SITE_HEAD_INCLUDE, pagePath));
            siteBodyInclude = null == configService.getConfigValues(BasePageModelConstants.SITE_BODY_INCLUDE, pagePath) ? "" : processSiteIncludes(configService.getConfigValues(BasePageModelConstants.SITE_BODY_INCLUDE, pagePath));
            headInclude = null == this.headInclude ? "" : CommonUtils.processPageIncludes(this.headInclude);
            bodyInclude = null == this.bodyInclude ? "" : CommonUtils.processPageIncludes(this.bodyInclude);
            LOG.debug("Head include {}", headInclude);
            LOG.debug("Body include {}", bodyInclude);
        } else {
            siteHeadInclude = configService.getConfigValues(BasePageModelConstants.SITE_HEAD_INCLUDE, pagePath);
            siteBodyInclude = configService.getConfigValues(BasePageModelConstants.SITE_BODY_INCLUDE, pagePath);
        }
        addOpeningDiv = configService.getConfigValues(BasePageModelConstants.ADD_OPENING_DIV, pagePath);
        wrapperDivClass = configService.getConfigValues(BasePageModelConstants.WRAPPER_DIV_CLASS, pagePath);
        mfaDomainPath = configService.getConfigValues(BasePageModelConstants.MFA_DOMAIN_PATH, pagePath);
        mfaEncryption = configService.getConfigValues(BasePageModelConstants.MFA_ENCRYPTION, pagePath);
        if (null != locale && locale.length() > 0) {
            pageLocaleDefault = locale.split("_")[0];
        }
        LOG.debug("Base page model :: locale found is {}, language is {}", locale, pageLocaleDefault);

        // Condition for CNW News details page starts
        LOG.debug("advancedPageType: {}", advancedPageType);
        if (null != advancedPageType && BasePageModelConstants.PAGE_TYPE_CNW_CONSTANT.equals(advancedPageType)) {
            LOG.debug("Inside isCNWNewsDetailPage block");
            processDataForCNWNews(locale, pagePath);
        }
        // Condition for CNW News details page ends

        // Condition for advisor pages start
        if (null != advancedPageType && BasePageModelConstants.PAGE_TYPE_ADVISOR_CONSTANT.equals(advancedPageType)) {
            LOG.debug("Inside advisor page block");
            try {
                processDataForAdvisorPages();
            } catch (ApplicationException | SystemException e) {
                LOG.error("Error while processing advisor data {}", e);
            }
        }
        // Condition for advisor pages end

        // SEO title - <title> tag
        seoPageTitle = null == pageTitle ? getPageTitle(title) : pageTitle;

        if (null != advancedPageType && advancedPageType.equals("article")) {

            final String articleTitleFormat = configService.getConfigValues("articleTitleFormat", pagePath);

            if (null != articleTitleFormat && articleTitleFormat.length() > 0 && null == pageTitle) {
                seoPageTitle = WordUtils.capitalize(seoPageTitle);
            }

        }

        // socialMediaTitle
        final String navTitle = currentPage.getNavigationTitle();
        socialMediaTitle = null == navTitle ? title : navTitle;

        // SEO description - <meta name="description"> tag
        seoDescription = description;

        // Social media description
        socialMediaDescripton = null == socialMediaDescripton ? configService.getConfigValues("pageDescription", pagePath) : socialMediaDescripton;

        // Social media image
        socialMediaImage = null == socialMediaImage ? configService.getConfigValues("socialMediaImage", pagePath) : socialMediaImage;

        // SEO canonical URL - <link rel="canonical"> tag
        if (null != domain && domain.length() > 0) {
            seoCanonicalUrl = null == canonicalUrl ? configService.getPageUrl(pagePath) : canonicalUrl;
        }
        // Analytics script path
        analyticsScriptPath = configService.getConfigValues("analyticsScriptPath", pagePath);
        // Analytics scriptlet
        analyticsScriptlet = configService.getConfigValues("analyticsTealiumScript", pagePath);

        // Fetching social sharing component meta-data
        customMetadata = new HashMap<>();

        // Configuring custom social sharing - meta-tags
        customMetadata.put(BasePageModelConstants.OG_TITLE, socialMediaTitle);
        customMetadata.put(BasePageModelConstants.TWITTER_TITLE, socialMediaTitle);
        customMetadata.put(BasePageModelConstants.OG_URL, seoCanonicalUrl);
        customMetadata.put(BasePageModelConstants.TWITTER_URL, seoCanonicalUrl);
        customMetadata.put(BasePageModelConstants.OG_DESCRIPTION, socialMediaDescripton);
        customMetadata.put(BasePageModelConstants.TWITTER_DESCRIPTION, socialMediaDescripton);
        customMetadata.put(BasePageModelConstants.OG_LOCALE, null != locale ? locale.replace("-", "_") : null);
        if (socialMediaImage != null) {
            customMetadata.put(BasePageModelConstants.OG_IMAGE, staticPath + socialMediaImage);
            customMetadata.put(BasePageModelConstants.TWITTER_IMAGE, staticPath + socialMediaImage);
        }
        customMetadata.put(BasePageModelConstants.TWITTER_CARD, "summary_large_image");
        // Condition for article pages start
        if (null != advancedPageType && BasePageModelConstants.PAGE_TYPE_ARTICLE_PAGES_CONSTANT.equals(advancedPageType)) {
            LOG.debug("Inside article page block");
            customMetadata = seoService.setArticlePageSocialMetaTags(resolver, currentPage.getPath(), configService, customMetadata);
        }
        // Condition for article pages end
        LOG.debug("metadata :: {}", customMetadata);

        // Sets content structure specific alternate URLs
        if (null != currentPage.getPath() && null != resolver.getResource(currentPage.getPath())) {
            final Resource currentResource = resolver.getResource(currentPage.getPath());
            if (!currentPage.getPath().contains("slcm")) {
                generateAlternateUrls(currentResource);
            } else {
                generateLMAlternateUrls(currentResource);
            }
        }

        // Sets UDO parameters
        otherUDOTagsMap = new JsonObject();
        otherUDOTagsMap.addProperty("page_canonical_url", seoCanonicalUrl); // canonical url

        if (null != masterPagePath && masterPagePath.length() > 0 && null != seoCanonicalUrl) {
            if (null != canonicalUrl && null != masterSeoCanonicalUrl && masterSeoCanonicalUrl.length() > 0) {
                otherUDOTagsMap.addProperty("page_canonical_url_default", masterSeoCanonicalUrl);
            } else {
                String masterDomain = this.configService.getConfigValues(BasePageModelConstants.DOMAIN_STR, masterPagePath);
                otherUDOTagsMap.addProperty("page_canonical_url_default", masterDomain.concat(configService.getPageRelativeUrl(masterPagePath)));

            }

        } else {
            otherUDOTagsMap.addProperty("page_canonical_url_default", seoCanonicalUrl); // canonical url
        }
        if (null != pageLocaleDefault && pageLocaleDefault.length() > 0) {
            otherUDOTagsMap.addProperty("page_language", pageLocaleDefault.toLowerCase(Locale.ROOT)); // Page
            // language
        }

        // Sets UDO parameters
        analyticsService.setUDOParameters(currentPage, masterPagePath, advancedPageType, pageCategory, pageSubCategory, breadCrumb, otherUDOTagsMap);

        // Sets UDO other parameters
        if (null != udoTagsPath && udoTagsPath.length() > 0) {
            analyticsService.setOtherUDOTags(udoTagsPath, tags, otherUDOTagsMap);
        }

        // Sets UDO tags specific to advisor pages
        if (null != advancedPageType && BasePageModelConstants.PAGE_TYPE_ADVISOR_CONSTANT.equals(advancedPageType)) {
            analyticsService.setUDOTagsForAdvisorPages(request, advisorType, otherUDOTagsMap);
        }

        final Gson gson = new GsonBuilder().setPrettyPrinting().disableHtmlEscaping().create();
        udoTags = gson.toJson(otherUDOTagsMap);
        autoCompleteUrl = StringUtils.defaultIfEmpty(configService.getConfigValues("autoCompleteUrl", pagePath), StringUtils.EMPTY);
        searchApi = StringUtils.defaultIfEmpty(configService.getConfigValues("searchApi", pagePath), StringUtils.EMPTY);
        LOG.debug("Map Display {}", udoTags);
    }

    /**
     * Gets the page title.
     *
     * @param titleStr the title
     * @return the page title
     * @throws LoginException      the login exception
     * @throws RepositoryException the repository exception
     */
    public String getPageTitle(String titleStr) throws LoginException, RepositoryException {
        final String pagePath = currentPage.getPath();
        final String siteSuffix = configService.getConfigValues("siteSuffix", pagePath);
        if (null == siteSuffix || siteSuffix.length() <= 1) {
            return titleStr;
        } else {
            return siteSuffix.replace(BasePageModelConstants.PAGE_TITLE_FORMAT_CONSTANT, titleStr);
        }
    }


    /**
     * Process data for CNW news.
     *
     * @param pageLocale the page locale
     * @param pagePath   the page path
     */
    public void processDataForCNWNews(final String pageLocale, final String pagePath) {
        LOG.debug("Entry :: processDataForCNWNews :: ");
        String releaseId = null;
        try {
            if (request.getRequestPathInfo().getSelectors().length > 0) {
                releaseId = request.getRequestPathInfo().getSelectors()[0];
                LOG.debug("Selector fetched :: releaseId :: {}", releaseId);
                final NewsDetails newsDetails = cnwNewsService.getCNWNewsDetails(releaseId, pageLocale.split("_")[0]);
                title = newsDetails.getRelease().getHeadline();
                description = "";
                String summary = newsDetails.getRelease().getSummary();
                summary = StringEscapeUtils.unescapeHtml(summary);
                summary = summary.replaceAll("<.*?>", "");
                summary = StringEscapeUtils.escapeJava(summary);
                socialMediaDescripton = summary.substring(0, Math.min(summary.length(), BasePageModelConstants.TITLE_MAX_LENGTH_CONSTANT));
                canonicalUrl = configService.getPageUrl(pagePath) + newsDetails.getRelease().getHeadline().replaceAll(" ", "-").replaceAll("%", "").replaceAll("[~@#$^&*()={}|,.?:<>'/;`%!\"]", "").toLowerCase(Locale.ROOT) + BasePageModelConstants.SLASH_CONSTANT + releaseId + BasePageModelConstants.SLASH_CONSTANT;
                LOG.debug("processDataForCNWNews :: Fetched items :: title: {}, description: {}, socialMediaDescripton: {}, canonicalUrl: {}", title, description, socialMediaDescripton, canonicalUrl);
            }
        } catch (IOException | ParseException | ApplicationException | SystemException e) {
            LOG.error("Error :: processDataForCNWNews :: {}", e);
        }
        LOG.debug("Exit :: processDataForCNWNews :: ");
    }

    /**
     * Process data for advisor pages.
     *
     * @throws LoginException       the login exception
     * @throws RepositoryException  the repository exception
     * @throws ApplicationException the application exception
     * @throws SystemException      the system exception
     */
    public void processDataForAdvisorPages() throws LoginException, RepositoryException, ApplicationException, SystemException {
        LOG.debug("Entry :: BasePageModel :: processDataForAdvisorPages :: ");
        String advisorId = null;
        if (request.getRequestPathInfo().getSelectors().length > 0) {
            advisorId = request.getRequestPathInfo().getSelectors()[0];
            if (null != advisorId && null != canonicalUrl) {
                canonicalUrl = canonicalUrl.replace(BasePageModelConstants.ADVISOR_ID_CANONICAL_URL_FORMAT_CONSTANT, advisorId).replace(BasePageModelConstants.ADVISOR_TYPE_CANONICAL_URL_FORMAT_CONSTANT, advisorType);
            }
            LOG.debug("canonicalUrl :: {}", canonicalUrl);

            final String advisorData = advisorDetailService.getAdvisorDetails(pageLocaleDefault, advisorType, advisorId);
            if (null != advisorData) {
                final JsonObject inputJson = new Gson().fromJson(advisorData, JsonObject.class);
                pageTitle = getPageTitle(getAdvisorTitle(inputJson));
            }
        }
        LOG.debug("Exit :: BasePageModel :: processDataForAdvisorPages :: canonicalUrl :: {}", canonicalUrl);
    }

    /**
     * Gets the advisor title.
     *
     * @param advisorData the input json
     * @return the advisor title
     */
    public String getAdvisorTitle(final JsonObject advisorData) {
        LOG.debug("Entry :: BasePageModel :: getAdvisorTitle :: ");
        String advisorTitle = null;
        if (advisorData.has(AdvisorDetailConstants.ERROR_CODE_CONSTANT) && !advisorData.get(AdvisorDetailConstants.ERROR_CODE_CONSTANT).toString().equals(AdvisorDetailConstants.ERROR_CODE_SUCCESS_CONSTANT)) {
            LOG.debug("BasePageModel :: getAdvisorTitle :: advisor details are not available");
            return advisorTitle;
        }
        if (AdvisorDetailConstants.CORP_CONSTANT.equals(advisorType)) {
            final JsonObject advisorCorpJson = advisorData.getAsJsonObject(AdvisorDetailConstants.ADVISOR_CORP_CONSTANT);
            advisorTitle = advisorCorpJson.get(AdvisorDetailConstants.CORP_NAME_CONSTANT).toString();
        } else {
            final JsonObject advisorStdJson = advisorData.getAsJsonObject(AdvisorDetailConstants.ADVISOR_STD_CONSTANT);
            advisorTitle = advisorStdJson.get(AdvisorDetailConstants.FORMATTED_NAME_CONSTANT).toString();
        }
        LOG.debug("Entry :: BasePageModel :: getAdvisorTitle :: advisorTitle :: {}", advisorTitle);
        return advisorTitle;
    }


    /**
     * Generate alternate urls.
     *
     * @param resource the resource
     */
    private void generateAlternateUrls(final Resource resource) {
        LOG.debug("Entry :: BasePageModel :: generateAlternateUrls :: resource :: {}", resource);
        try {
            if (null == resolver || null == resource) {
                return;
            }
            Map<String, String> pageAltLanguageLinks = new HashMap<>();
            final Resource altLanResource = resolver.getResource(resource.getPath() + "/jcr:content/alternateUrls");
            LOG.debug("Alt urls --> {}", altLanResource);
            if (null != altLanResource) {
                generatePageSpecificAlternateUrls();
                if (altLanguageLinks.size() == 1) pageAltLanguageLinks = altLanguageLinks;
                else return;

            }
            final String pagePath = currentPage.getPath();
            final String modHrefLang = configService.getConfigValues(BasePageModelConstants.HREF_LANG, pagePath);
            final String pageLocale = configService.getConfigValues(BasePageModelConstants.PAGE_LOCALE, pagePath);
            if (null == pageLocale || pageLocale.length() == 0) {
                return;
            }
            final String siteDomain = configService.getConfigValues(BasePageModelConstants.DOMAIN_STR, pagePath);
            //      final String siteUrl = configService.getConfigValues(SITE_URL, pagePath);
            // check if it is a source
            LOG.debug("is source {}", relationshipManager.isSource(resource));
            // check if it is a live copy
            LOG.debug("has live relationship {}", relationshipManager.hasLiveRelationship(resource));
            Resource sourceResource = resource;
            if (relationshipManager.hasLiveRelationship(resource)) {
                final LiveRelationship liveRelationship = relationshipManager.getLiveRelationship(resource, false);
                if (liveRelationship != null) {
                    final LiveCopy liveCopy = liveRelationship.getLiveCopy();
                    if (liveCopy != null) {
                        final String sourcePath = liveCopy.getBlueprintPath();
                        masterPagePath = sourcePath;
                        sourceResource = resolver.getResource(sourcePath);
                        if (sourceResource != null) {
                            Page page = sourceResource.adaptTo(Page.class);
                            if (page != null) {
                                masterSeoCanonicalUrl = (null == masterSeoCanonicalUrl) ? page.getProperties().get("canonicalUrl", String.class) : masterSeoCanonicalUrl;
                            }
                        }
                    }
                }
            }
            if (relationshipManager.isSource(sourceResource)) {
                LOG.debug("source page {}", sourceResource.getPath());
                final Resource target = resolver.getResource(sourceResource.getPath());
                final RangeIterator relationships = relationshipManager.getLiveRelationships(target, null, null);
                if (relationships != null) {
                    altLanguageLinks = new HashMap<>();
                    while (relationships.hasNext()) {
                        LiveRelationship relationship = (LiveRelationship) relationships.next();

                        final String liveCopyPath = relationship.getTargetPath();
                        // filter non-existing
                        // LiveCopy Resources and
                        // LiveCopy Launches
                        if (relationship.getStatus().isTargetExisting() && !LaunchUtils.isLaunchResourcePath(liveCopyPath)) {
                            addAlternateUrl(liveCopyPath);
                        }
                    }
                }
                if (relationshipManager.hasLiveRelationship(resource)) {
                    addAlternateUrl(sourceResource.getPath());
                }
            }
            if (null != altLanguageLinks && !altLanguageLinks.isEmpty()) {
                String hrefLang = null;
                if (modHrefLang != null && modHrefLang.equals("true")) {
                    hrefLang = pageLocale.substring(0, pageLocale.length() - 3);
                } else {
                    hrefLang = pageLocale.split("_")[0] + "-" + pageLocale.split("_")[1].replace("_", "-").toLowerCase(Locale.ROOT);
                }

                if (siteDomain.contains(".hk") || siteDomain.contains(".id")) {
                    LOG.debug("siteDomain {}", siteDomain);
                    String href_lang_path = CommonUtils.createHrefLangPath(siteDomain, configService.getPageRelativeUrl(pagePath), request);
                    altLanguageLinks.put(hrefLang, href_lang_path);
                } else {
                    altLanguageLinks.put(hrefLang, siteDomain + configService.getPageRelativeUrl(pagePath));
                }

                if (pageAltLanguageLinks.size() == 1) {
                    Map.Entry<String, String> entry = pageAltLanguageLinks.entrySet().iterator().next();
                    altLanguageLinks.put(entry.getKey(), entry.getValue());
                }
            }
            LOG.debug("New altLanguageLinks :: {}", altLanguageLinks);

        } catch (WCMException | LoginException | RepositoryException e) {
            LOG.error("Unable to get the live copy: {}", e.getMessage());
        }
        LOG.debug("Exit :: BasePageModel :: generateAlternateUrls :: resource :: {}", resource);
    }

    /**
     * Generate Language masters structured sites alternate urls.
     *
     * @param resource the resource
     */
    private void generateLMAlternateUrls(final Resource resource) {
        LOG.debug("Entry :: setAlternateURLs");

        altLanguageLinks = new HashMap<>();
        try {
            String syncPath = "";
            String altCount = configService.getConfigValues("altLangCount", resource.getPath());
            int altLangCount = 0;
            if (relationshipManager.hasLiveRelationship(resource))
                syncPath = relationshipManager.getLiveRelationship(resource, false).getSyncPath();
            if (!altCount.isEmpty()) altLangCount = Integer.parseInt(altCount);
            boolean isAltLangSameAsCurPgLocale = false;
            for (int altLangIterator = 0; altLangIterator < altLangCount; altLangIterator++) {
                final String altLang = configService.getConfigValues(BasePageModelConstants.ALTERNATE_URL_ITEMS_CONSTANT + altLangIterator + "_languageCode", resource.getPath());
                final String altUrl = configService.getConfigValues(BasePageModelConstants.ALTERNATE_URL_ITEMS_CONSTANT + altLangIterator + "_siteLocation", resource.getPath());
                final String defaultLanguage = configService.getConfigValues(BasePageModelConstants.ALTERNATE_URL_ITEMS_CONSTANT + altLangIterator + "_defaultLanguage", resource.getPath());

                final String altSiteUrl = configService.getPageRelativeUrl(altUrl);
                final String altSiteDomain = configService.getConfigValues(BasePageModelConstants.DOMAIN_STR, altUrl);
                String updatedSyncPath = "";

                if (defaultLanguage.length() > 0)
                    masterPagePath = altUrl.contains(syncPath) ? altUrl : altUrl + syncPath;

                if (null != masterPagePath) masterSeoCanonicalUrl = configService.getPageUrl(masterPagePath);
                canonicalUrl = configService.getPageUrl(currentPage.getPath());
                if (!syncPath.isEmpty()) {
                    updatedSyncPath = syncPath.substring(1, syncPath.length());
                    if (!updatedSyncPath.endsWith(BasePageModelConstants.SLASH_CONSTANT)) {
                        updatedSyncPath = updatedSyncPath + BasePageModelConstants.SLASH_CONSTANT;
                    }
                }

                altLanguageLinks.put(altLang.split("_")[0] + "-" + altLang.split("_")[1].replace("_", "-").toLowerCase(Locale.ROOT), altSiteDomain + altSiteUrl + updatedSyncPath);

                if (altSiteUrl.length() == 0 && altSiteDomain.length() == 0) {
                    altLanguageLinks.put(altLang.split("_")[0] + "-" + altLang.split("_")[1].replace("_", "-").toLowerCase(Locale.ROOT), altUrl);
                    if (configService.getConfigValues(BasePageModelConstants.PAGE_LOCALE, currentPage.getPath()).equalsIgnoreCase(altLang)) {
                        isAltLangSameAsCurPgLocale = true;
                    }
                }
            }
            final String pagePath = currentPage.getPath();
            final String pageLocale = configService.getConfigValues(BasePageModelConstants.PAGE_LOCALE, pagePath);
            final String siteDomain = configService.getConfigValues(BasePageModelConstants.DOMAIN_STR, pagePath);
            if (!altLanguageLinks.isEmpty()) {
                if (isAltLangSameAsCurPgLocale) return;

                altLanguageLinks.put(pageLocale.split("_")[0] + "-" + pageLocale.split("_")[1].replace("_", "-").toLowerCase(Locale.ROOT), siteDomain + configService.getPageRelativeUrl(pagePath));
            }
            LOG.debug("Page specific new altLanguageLinks :: {}", altLanguageLinks);
        } catch (LoginException | RepositoryException | WCMException e) {
            LOG.error("Error while generating alternate urls :: {}", e.getMessage());
        }
        LOG.debug("Map {}", altLanguageLinks);
    }

    /**
     * @param liveCopyPath
     * @throws LoginException
     * @throws RepositoryException
     */
    private void addAlternateUrl(final String liveCopyPath) throws LoginException, RepositoryException {
        LOG.debug("path :: {}", liveCopyPath);
        final String sourcePageLocale = configService.getConfigValues(BasePageModelConstants.PAGE_LOCALE, liveCopyPath);
        final String sourceSiteUrl = configService.getPageRelativeUrl(liveCopyPath);
        final String sourceSiteDomain = configService.getConfigValues(BasePageModelConstants.DOMAIN_STR, liveCopyPath);
        LOG.debug("generateAlternateUrls method :: sourcePath: {}, sourcePageLocale: {}, sourceSiteDomain: {}", liveCopyPath, sourcePageLocale, sourceSiteUrl);
        final String modHrefLang = configService.getConfigValues(BasePageModelConstants.HREF_LANG, liveCopyPath);
        String hrefLang = null;
        if (modHrefLang != null && modHrefLang.equals("true")) {
            hrefLang = sourcePageLocale.substring(0, sourcePageLocale.length() - 3);
        } else {
            hrefLang = sourcePageLocale.split("_")[0] + "-" + sourcePageLocale.split("_")[1].replace("_", "-").toLowerCase(Locale.ROOT);
        }
        if (StringUtils.isEmpty(sourcePageLocale) || StringUtils.isEmpty(sourceSiteUrl)) {
            return;
        }

        if (sourceSiteDomain.contains(".hk") || sourceSiteDomain.contains(".id")) {
            LOG.debug("sourceSiteDomain {}", sourceSiteDomain);
            String href_lang_path = CommonUtils.createHrefLangPath(sourceSiteDomain, sourceSiteUrl, request);
            altLanguageLinks.put(hrefLang, href_lang_path);
        } else {
            altLanguageLinks.put(hrefLang, sourceSiteDomain + sourceSiteUrl);
        }
    }

    /**
     * Generate page specific alternate urls.
     */
    public void generatePageSpecificAlternateUrls() {
        LOG.debug("Entry :: setAlternateURLs");
        final Resource alternateUrls = resolver.getResource(currentPage.getPath() + "/jcr:content/alternateUrls");
        if (null == alternateUrls) {
            return;
        }
        altLanguageLinks = new HashMap<>();
        try {
            boolean isAltLangSameAsCurPgLocale = false;
            for (final Resource currentResource : alternateUrls.getChildren()) {
                final ValueMap currentResourceProperties = ResourceUtil.getValueMap(currentResource);
                final String altLang = (String) currentResourceProperties.getOrDefault("alternateLanguage", StringUtils.EMPTY);
                final String altUrl = (String) currentResourceProperties.getOrDefault("alternateUrl", StringUtils.EMPTY);
                final String defaultLanguage = (String) currentResourceProperties.getOrDefault("defaultLanguage", StringUtils.EMPTY);

                final String altSiteUrl = configService.getPageRelativeUrl(altUrl);
                final String altSiteDomain = configService.getConfigValues(BasePageModelConstants.DOMAIN_STR, altUrl);
                final String modHrefLang = configService.getConfigValues(BasePageModelConstants.HREF_LANG, altUrl);
                String hrefLang = null;
                if (modHrefLang != null && modHrefLang.equals("true")) {
                    hrefLang = altLang.substring(0, altLang.length() - 3);
                } else {
                    hrefLang = altLang.split("_")[0] + "-" + altLang.split("_")[1].replace("_", "-").toLowerCase(Locale.ROOT);
                }

                masterPagePath = defaultLanguage.length() > 0 ? altUrl : null;

                if (null != masterPagePath) masterSeoCanonicalUrl = masterPagePath;

                altLanguageLinks.put(hrefLang, altSiteDomain + altSiteUrl);

                if (altSiteUrl.length() == 0 && altSiteDomain.length() == 0) {

                    altLanguageLinks.put(hrefLang, altUrl);
                    if (configService.getConfigValues(BasePageModelConstants.PAGE_LOCALE, currentPage.getPath()).equalsIgnoreCase(altLang)) {
                        isAltLangSameAsCurPgLocale = true;
                    }
                }

            }
            masterPagePath = masterSeoCanonicalUrl;
            if (null == masterPagePath) {
                Resource resource = resolver.getResource(currentPage.getPath());
                if (relationshipManager.hasLiveRelationship(resource)) {
                    final LiveRelationship liveRelationship = relationshipManager.getLiveRelationship(resource, false);
                    if (liveRelationship != null) {
                        final LiveCopy liveCopy = liveRelationship.getLiveCopy();
                        if (liveCopy != null) {
                            final String sourcePath = liveCopy.getBlueprintPath();
                            masterPagePath = sourcePath;
                            Resource sourceResource = resolver.getResource(sourcePath);
                            if (sourceResource != null) {
                                Page page = sourceResource.adaptTo(Page.class);
                                if (page != null) {
                                    masterSeoCanonicalUrl = page.getProperties().get("canonicalUrl", String.class);
                                }
                            }
                        }
                    }
                }

            }
            final String pagePath = currentPage.getPath();
            final String pageLocale = configService.getConfigValues(BasePageModelConstants.PAGE_LOCALE, pagePath);
            final String siteDomain = configService.getConfigValues(BasePageModelConstants.DOMAIN_STR, pagePath);
            final String modifiedHrefLang = configService.getConfigValues(BasePageModelConstants.HREF_LANG, pagePath);
            String pageHrefLang = null;
            if (modifiedHrefLang != null && modifiedHrefLang.equals("true")) {
                pageHrefLang = pageLocale.substring(0, pageLocale.length() - 3);
            } else {
                pageHrefLang = pageLocale.split("_")[0] + "-" + pageLocale.split("_")[1].replace("_", "-").toLowerCase(Locale.ROOT);
            }
            if (!altLanguageLinks.isEmpty()) {
                if (isAltLangSameAsCurPgLocale) return;

                altLanguageLinks.put(pageHrefLang, siteDomain + configService.getPageRelativeUrl(pagePath));
            }
            LOG.debug("Page specific new altLanguageLinks :: {}", altLanguageLinks);
        } catch (LoginException | RepositoryException | WCMException e) {
            LOG.error("Error while generating alternate urls :: {}", e.getMessage());
        }
        LOG.debug("Map {}", altLanguageLinks);
    }

    private String processSiteIncludes(String siteInclude) {
        return CommonUtils.processSiteIncludes(siteInclude, request, currentPage, configService);
    }
}