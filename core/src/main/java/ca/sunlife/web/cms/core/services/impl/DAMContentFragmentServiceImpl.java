/**
 *
 */
package ca.sunlife.web.cms.core.services.impl;

import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.DAMContentFragmentService;
import com.adobe.cq.dam.cfm.converter.ContentTypeConverter;
import com.adobe.cq.wcm.core.components.internal.models.v1.contentfragment.DAMContentFragmentImpl;
import com.adobe.cq.wcm.core.components.models.contentfragment.DAMContentFragment;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Component(service = DAMContentFragmentService.class, immediate = true)
public class DAMContentFragmentServiceImpl implements DAMContentFragmentService {

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    @Reference
    private CoreResourceResolver coreResourceResolver;

    @Override
    public DAMContentFragment getContentFragment(String path, String[] elementNames, ContentTypeConverter contentTypeConverter) {
        LOGGER.debug("Entering getContentFragment : path : {} : elementNames : {} : contentTypeConverter : {}", path, elementNames, contentTypeConverter);
        DAMContentFragment damContentFragment = null;
        try (ResourceResolver resourceResolver = coreResourceResolver.getResourceResolver()) {
            if (null != path) {
                Resource resource = resourceResolver.getResource(path);
                if (null != resource && null != contentTypeConverter) {
                    DAMContentFragment contentFragmentModel = new DAMContentFragmentImpl(resource,
                            contentTypeConverter, null, elementNames);
                    damContentFragment = contentFragmentModel;
                } else {
                    LOGGER.debug("Resource/contentTypeConverter is null for path : {}", path);
                }
            }
        } catch (LoginException e) {
            LOGGER.error("Error in getContentFragmentList " + e.getMessage(), e);
        }
        LOGGER.debug("Exiting getContentFragment : damContentFragment");
        return damContentFragment;
    }

    @Activate
    public void activate() {
        LOGGER.debug("Entry :: activate method of DAMContentFragmentServiceo");
    }
}