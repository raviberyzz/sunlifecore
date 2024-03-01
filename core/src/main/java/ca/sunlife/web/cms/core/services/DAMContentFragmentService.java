
package ca.sunlife.web.cms.core.services;

import ca.sunlife.web.cms.core.beans.v1.ContentFragmentCriteria;
import com.adobe.cq.dam.cfm.converter.ContentTypeConverter;
import com.adobe.cq.wcm.core.components.models.contentfragment.DAMContentFragment;
import org.apache.sling.api.resource.Resource;

import java.util.List;


public interface DAMContentFragmentService {

    /**
     * This method is used to get the DAMContentFragment
     *
     * @param path                 path
     * @param elementNames         elementNames
     * @param contentTypeConverter contentTypeConverter
     * @return DAMContentFragment DAMContentFragment
     */
    DAMContentFragment getContentFragment(String path, String[] elementNames, ContentTypeConverter contentTypeConverter);

    /**
     * This method is used to get the DAMContentFragmentList
     *
     * @param contentFragmentCriteria contentFragmentCriteria
     * @return List<DAMContentFragment> List<DAMContentFragment>
     */
    List<Resource> getCFResourceList(ContentFragmentCriteria contentFragmentCriteria);


}

