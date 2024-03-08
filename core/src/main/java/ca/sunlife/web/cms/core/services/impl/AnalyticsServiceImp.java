
package ca.sunlife.web.cms.core.services.impl;

import ca.sunlife.web.cms.core.constants.AdvisorDetailConstants;
import ca.sunlife.web.cms.core.constants.ArticleConstants;
import ca.sunlife.web.cms.core.constants.v1.BasePageModelConstants;
import ca.sunlife.web.cms.core.services.AnalyticsService;
import ca.sunlife.web.cms.core.services.SEOService;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.GregorianCalendar;
import java.util.Map;


@Component(service = {AnalyticsService.class}, immediate = true)
public class AnalyticsServiceImp implements AnalyticsService {

    private static final Logger LOG = LoggerFactory.getLogger(SEOService.class);


}

