package ca.sunlife.web.cms.core.common.utility;

import ca.sunlife.web.cms.core.constants.v1.BasePageModelConstants;
import com.day.cq.wcm.api.Page;
import org.apache.sling.api.SlingHttpServletRequest;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CommonUtils {

    private static final Logger LOG = LoggerFactory.getLogger(CommonUtils.class);

    private CommonUtils() {
        // private constructor
    }


    /**
     * Gets the breadcrumb title.
     *
     * @param page the page
     * @return the breadcrumb title
     */
    public static String getBreadcrumbTitle(final Page page) {
        if (page == null) {
            return "";
        }
        String titleStr = page.getTitle();

        if (titleStr != null) {
            return titleStr;

        }
        titleStr = page.getNavigationTitle();
        if (titleStr != null || (titleStr = page.getPageTitle()) != null) {
            return titleStr;
        }
        return page.getName() != null ? page.getName() : "";

    }

    /* Below code will get the full url request and split the pagination from AEM page */
    public static String createHrefLangPath(String domain, String siteUrl, SlingHttpServletRequest request) {
        String selector[] = request.getRequestPathInfo().getSelectors();
        siteUrl = siteUrl.substring(0, siteUrl.length() - 1);
        String hrefLangPath = domain + siteUrl;
        LOG.debug("inital  hrefLangPath --> {}", hrefLangPath);
        String urlValue = "";
        for (String selectorValue : selector) {
            if (selectorValue.contains("-")) {
                urlValue = urlValue + "." + selectorValue; // in case of multiple selector dot is splitter
            } else {
                urlValue = urlValue + "/" + selectorValue; // in case of pagination paginated page value should be eg. /1/
            }
        }
        urlValue = urlValue + "/";  // all the urls should end with / slash
        LOG.debug("final String --> {}", urlValue);

        return hrefLangPath + urlValue;
    }

    public static String processPageIncludes(String pageInclude) {
	 /* if(pageInclude.isEmpty()) {
		  return pageInclude;
	  }*/
        String processedPageInclude = "";
        Document parsedPageInclude = Jsoup.parse(pageInclude);
        boolean hasHtmlTags = true;
        if (parsedPageInclude.getElementsByTag(BasePageModelConstants.PUBLIC).html().isEmpty() && parsedPageInclude.getElementsByTag(BasePageModelConstants.SECURE).html().isEmpty() && parsedPageInclude.getElementsByTag(BasePageModelConstants.SLGI).html().isEmpty()) {
            hasHtmlTags = false;
            LOG.debug("Page include does not have html");
        }
        if (hasHtmlTags) {
            processedPageInclude = parsedPageInclude.body().child(0).html();
        } else {
            processedPageInclude = pageInclude;
        }
        LOG.debug("Page include processed: {}", processedPageInclude);
        return processedPageInclude;
    }
}
