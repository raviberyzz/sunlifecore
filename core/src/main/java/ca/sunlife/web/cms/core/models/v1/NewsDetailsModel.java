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
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.jcr.RepositoryException;
import java.io.IOException;
import java.text.ParseException;

@Getter
@Model(adaptables = {SlingHttpServletRequest.class, Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class NewsDetailsModel {

    /**
     * The logger for this class.
     */
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * The request object.
     */
    @Self
    private SlingHttpServletRequest request;

    /**
     * The current page object.
     */
    @ScriptVariable
    private Page currentPage;

    /**
     * The news service object.
     */
    @OSGiService
    private CNWNewsService newsService;

    /**
     * The config service object.
     */
    @OSGiService
    private SiteConfigService configService;

    /**
     * The news details object.
     */
    private NewsDetails newsDetails;

    /**
     * The Accessibility Label in the component.
     */
    @ValueMapValue
    private String accessibilityLabel;
    
    /**
     * The spacing in the component.
     */
    @ValueMapValue
    private String spacing;

    /**
     * NewsDetailsModel - init method for processing the data from the CNW News service.
     */
    @PostConstruct
    public void init() {
        logger.debug("Entry :: CNWNewsDetailsModel :: init ");
        String pageLocaleDefault = "en";
        try {
            final String locale = configService.getConfigValues("pageLocale", currentPage.getPath());
            String releaseId = request.getRequestPathInfo().getSelectors()[0];
            if (null != locale && locale.length() > 0) {
                pageLocaleDefault = locale.split("_")[0];
            }
            logger.debug("calling getCNWNewsDetails method with releaseID {} and pageLocaleDefault {}", releaseId, pageLocaleDefault);
            newsDetails = newsService.getCNWNewsDetails(releaseId, pageLocaleDefault);
        } catch (IOException | ParseException | ApplicationException | SystemException | LoginException |
                 RepositoryException exception) {
            logger.error("Error :: NewsDetailsModel :: init :: Exception :: {}", exception.getMessage());
        }
    }
}
