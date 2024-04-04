package ca.sunlife.web.cms.core.models.v1;

import ca.sunlife.web.cms.core.beans.News;
import ca.sunlife.web.cms.core.beans.ReleaseMain;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.models.NewsCategory;
import ca.sunlife.web.cms.core.services.CNWNewsService;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import com.day.cq.wcm.api.Page;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.RepositoryException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Getter
@Setter
public class CNWNewsModel {

    /**
     * The logger.
     */
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    /** News Type tab **/
    /**
     * Next Type
     **/
    @ValueMapValue
    private String newsType;

    /** Common fields for news categories and news listing tabs **/
    /**
     * News Categories
     **/
    @ChildResource
    private List<NewsCategory> newsCategories;

    /**
     * News Article URL
     **/
    @ValueMapValue
    private String newsArticleUrl;

    /** News Overview tab **/
    /**
     * Number of News
     **/
    @ValueMapValue
    private String numberOfNews;

    /** News Listing tab **/
    /**
     * Latest Year
     **/
    @ValueMapValue
    private String latestYear;

    /**
     * Number of Tabs
     **/
    @ValueMapValue
    private String numberOfTabs;

    /**
     * No News Message
     **/
    @ValueMapValue
    private String noNewsMessage;

    /** Pagination Tab **/
    
    /**
     * page Size
     **/
    @ValueMapValue
    private String pageSize;

    /** Analytics tab **/
    /**
     * Analytics data Section
     **/
    @ValueMapValue
    private String dataSection;

    /** Spacing tab **/
    /**
     * Spacing
     **/
    @ValueMapValue
    private String spacing;

    /** Work on this **/
    /**
     * Gets the configService.
     *
     * @return the configService
     */
    @OSGiService
    private SiteConfigService configService;

    /**
     * Gets the currentPage.
     *
     * @return the currentPage
     */
    @Inject
    private Page currentPage;

    /**
     * Gets the locale.
     *
     * @return the locale
     */
    private String locale;

    /**
     * Gets the locale.
     *
     * @return the locale
     */
    private String newsArticleShortenedUrl;

    /**
     * Gets the releaseMain.
     *
     * @return the releaseMain
     */
    private ReleaseMain releaseMain;

    /** Work on this **/
    /**
     * Injects the newsService.
     *
     * @return the newsService
     */
    @OSGiService
    private CNWNewsService newsService;

    /**
     * Gets the yearsToShow.
     *
     * @return the list of yearsToShow
     */
    private List<Integer> yearsToShow;

    /**
     * Gets the activeYear.
     *
     * @return the activeYear
     */
    private int activeYear;

    /**
     * Gets the SlingHttpServletRequest.
     *
     * @return the SlingHttpServletRequest
     */
    @Self
    private SlingHttpServletRequest request;

    /**
     * Gets the relativeURL.
     *
     * @return the relativeURL
     */
    private String relativeURL;

    /**
     * Gets the requestURL.
     *
     * @return the requestURL
     */
    private String requestURL;

    /**
     * Gets the news.
     *
     * @return the news
     */
    private News news;


    /**
     * Intitialize the model.
     */
    @PostConstruct
    public void init() {
        logger.debug("Entry :: CNWNewsModel :: init :: newsType: {}", newsType);
        if (null == newsType) {
            return;
        }
        try {
            String pageLocale = configService.getConfigValues("pageLocale", currentPage.getPath());
            if (null != pageLocale && pageLocale.length() > 0) {
                locale = pageLocale.split("_")[0];
            }
            logger.debug("Fetched locale: {}, newsType: {}", locale, newsType);
            if (newsType.equals("1")) {
                processOverviewData();
            } else {
                processReleasesData();
            }
            if (null != newsArticleUrl && newsArticleUrl.length() > 0) {
                newsArticleShortenedUrl = configService.getPageRelativeUrl(newsArticleUrl);
            }
        } catch (IOException | ApplicationException | SystemException | LoginException
                 | RepositoryException e) {
            logger.error("Error :: CNWNewsModel :: init :: error trace: {}", e);
        }
    }

    /**
     * Process overview data.
     *
     * @throws IOException          Signals that an I/O exception has occurred.
     * @throws ApplicationException the application exception
     * @throws SystemException      the system exception
     */
    public void processOverviewData() throws IOException, ApplicationException, SystemException {
        logger.debug(
                "Entry :: CNWNewsDetailsModel :: processOverviewData :: numberOfNews: {}, newsCategories: {}, locale: {}",
                numberOfNews, newsCategories, locale);
        if (null == numberOfNews || null == newsCategories) {
            return;
        }
        releaseMain = newsService.getCNWNewsOverview(locale, numberOfNews, newsCategories);
        logger.debug("Fetched news :: {}", releaseMain);
    }

    /**
     * Process releases data.
     *
     * @throws IOException          Signals that an I/O exception has occurred.
     * @throws ApplicationException the application exception
     * @throws SystemException      the system exception
     * @throws LoginException       the login exception
     * @throws RepositoryException  the repository exception
     */
    public void processReleasesData() throws IOException, ApplicationException, SystemException,
            LoginException, RepositoryException {
        logger.debug(
                "Entry :: CNWNewsModel :: processReleasesData :: latestYear: {}, numberOfTabs: {}, locale: {}, newsCategories: {}, pageSize: {}",
                latestYear, numberOfTabs, locale, newsCategories, pageSize);
        int year;
        int totalNoYears;
        String strYear = null;
        String pageNum = null;
        if (null == latestYear) {
            year = Calendar.getInstance().get(Calendar.YEAR);
        } else {
            year = Integer.parseInt(latestYear);
        }

        int downYear = year;
        totalNoYears = Integer.parseInt(numberOfTabs);
        logger.debug("downYear: {}, totalNoYears: {}", downYear, totalNoYears);
        yearsToShow = new ArrayList<>();
        for (int i = 0; i < totalNoYears; i++) {
            yearsToShow.add(downYear--);
        }
        logger.debug("yearsToShow :: {}", yearsToShow);

        activeYear = year;

       final String[] selectors = request.getRequestPathInfo().getSelectors();        
        if (selectors.length > 0) {
            strYear = selectors[0]; // Year - Selector
            if (selectors.length > 1) {
                pageNum = selectors[1]; // Page number - Selector
            }
        }
        logger.debug("Fetched params  pageNum: {}, strYear: {}", pageNum, strYear);

        if (null != strYear && !"".equals(strYear) && !"html".equals(strYear)) {
            activeYear = Integer.parseInt(strYear);
        }
        logger.debug("activeYear :: {}", activeYear);

        final String uri = request.getRequestURI();
        logger.debug("uri: {}", uri);
        relativeURL = uri.contains(".") ? uri.substring(0, uri.indexOf('.')) : uri;
        requestURL = uri.contains(".") ? uri.substring(0, uri.lastIndexOf('.')) : uri;
        logger.debug("relativeURL: {}, requestURL: {}", relativeURL, requestURL);
        if (null != pageNum) { // Code to remove page number from url
            requestURL = requestURL.replaceAll("." + pageNum + "$", "");
        }
        if (selectors.length == 0) {
            requestURL = requestURL + "." + activeYear;
        }
        requestURL = requestURL.replace(".", "/");
        relativeURL = configService.getPageRelativeUrl(relativeURL);
        requestURL = configService.getPageRelativeUrl(requestURL);
        logger.debug("requestURL - after clean up: {}", requestURL);
        try {
            news = newsService.getCNWNews(locale, requestURL, pageNum, String.valueOf(activeYear), pageSize,
                    newsCategories);
        } catch (Exception e) {
            logger.error("Error :: CNWNewsModel :: processReleasesData :: error trace: {}", e);
        }
        if (logger.isDebugEnabled()) {
            logger.debug("Final news object :: {}", new ObjectMapper().writeValueAsString(news));
        }
    }
}
