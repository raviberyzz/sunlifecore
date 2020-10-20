package ca.sunlife.web.cms.core.servlets;

import ca.sunlife.web.cms.core.services.druglist.DrugListService;
import com.adobe.granite.asset.api.Asset;
import com.adobe.granite.asset.api.AssetManager;
import com.adobe.granite.asset.api.Rendition;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Component(service = Servlet.class, property = { Constants.SERVICE_DESCRIPTION + "= Drug List Servlet",
        "sling.servlet.methods=" + HttpConstants.METHOD_GET, "sling.servlet.paths=" + "/bin/getDrugList" })
public class DrugListServlet extends SlingSafeMethodsServlet{

    private static final long serialVersionUID = 5180493823438186865L;


    public static final String DRUGLIST_JSON = "/content/dam/sunlife/data/druglist.json";
    private static final Logger LOGGER = LoggerFactory.getLogger(DrugListService.class);

    @ Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws IOException {

        String json;

        AssetManager assetManager = request.getResourceResolver().adaptTo(AssetManager.class);
        if (assetManager != null && assetManager.assetExists(DRUGLIST_JSON)) {
            Asset asset = assetManager.getAsset(DRUGLIST_JSON);
            Rendition rendition = asset.getRendition("original");
            json = IOUtils.toString(rendition.getStream(), StandardCharsets.UTF_8);

        } else {
            LOGGER.error("Can't find Asset at {}. Sending error message.", DRUGLIST_JSON);
            json = getErrorJson(null);
        }

        response.getWriter().write(json);

    }

    private String getErrorJson( String message ) {

        String reason = "Data not currently available.";
        if (StringUtils.isNotEmpty(message)) {
            reason = message;
        }

        return String.format("{ \"error\": \"%s\"}", reason);

    }

}

