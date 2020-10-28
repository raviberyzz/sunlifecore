package ca.sunlife.web.cms.core.servlets;

import ca.sunlife.web.cms.core.services.druglist.DrugListService;
import com.adobe.granite.asset.api.Asset;
import com.adobe.granite.asset.api.AssetManager;
import com.adobe.granite.asset.api.Rendition;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ValueMap;
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

@Component(service = Servlet.class, property = {
        Constants.SERVICE_DESCRIPTION + "= Drug List Servlet",
        "sling.servlet.methods=" + HttpConstants.METHOD_GET,
        "sling.servlet.paths=" + "/bin/getDrugList"
})
public class DrugListServlet extends SlingSafeMethodsServlet{

    private static final long serialVersionUID = 5180493823438186865L;

    private static final Logger LOGGER = LoggerFactory.getLogger(DrugListService.class);

    @Reference
    private transient DrugListService drugListService;

    @ Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws IOException {

        String json;

        ValueMap valueMap = request.getResource().getValueMap();
        String druglistJson = valueMap.get("assetPath", String.class);
        if (StringUtils.isEmpty(druglistJson)) {
            druglistJson = drugListService.getDataAssetPath();
        }

        AssetManager assetManager = request.getResourceResolver().adaptTo(AssetManager.class);
        if (assetManager != null && assetManager.assetExists(druglistJson)) {
            Asset asset = assetManager.getAsset(druglistJson);
            Rendition rendition = asset.getRendition("original");
            json = IOUtils.toString(rendition.getStream(), StandardCharsets.UTF_8);

        } else {
            LOGGER.error("Can't find Asset at {}. Sending error message.", druglistJson);
            json = getErrorJson(null);
        }

        response.setContentType("application/json; charset=UTF-8");
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

