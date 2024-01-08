package ca.sunlife.web.cms.core.models.v1;

import ca.sunlife.web.cms.core.beans.NewsDetails;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.services.CNWNewsService;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import com.day.cq.wcm.api.Page;
import lombok.Getter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.RepositoryException;
import java.io.IOException;
import java.text.ParseException;

@Getter
@Model(adaptables = {SlingHttpServletRequest.class,
        Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class NewsDetailsModel {

    /**
     * The logger.
     */
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * The request.
     */
    @Self
    private SlingHttpServletRequest request;

    /**
     * The current page.
     */
    @ScriptVariable
    private Page currentPage;

    /**
     * The news service.
     */
    @OSGiService
    private CNWNewsService newsService;

    /**
     * The config service.
     */
    @OSGiService
    private SiteConfigService configService;

    /**
     * The news details.
     */
    private NewsDetails newsDetails;


    /**
     * Inits the.
     * CNWNewsDetailsModel - init method for processing the data.
     */
    @PostConstruct
    public void init() {
        logger.debug("Entry :: CNWNewsDetailsModel :: init ");
        String pageLocaleDefault = "en";
        try {
            final String locale = configService.getConfigValues("pageLocale", currentPage.getPath());
            String[] segments = request.getPathInfo().split("/");
            String releaseId = segments[segments.length - 1];
            // releaseId = request.getRequestPathInfo().getSelectors() [ 0 ];
            if (null != locale && locale.length() > 0) {
                pageLocaleDefault = locale.split("_")[0];
            }
            newsDetails = newsService.getCNWNewsDetails(releaseId, pageLocaleDefault);
        } catch (IOException | ParseException | ApplicationException | SystemException | LoginException
                 | RepositoryException e) {
            logger.error("Error :: CNWNewsDetailsModel :: init :: Exception :: {}", e);
        }
    }


}
