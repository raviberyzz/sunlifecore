package ca.sunlife.web.cms.core.services;

import ca.sunlife.web.cms.core.beans.v1.ContentFragmentCriteria;
import com.adobe.cq.wcm.core.components.models.contentfragment.DAMContentFragment;
import org.apache.sling.api.resource.Resource;

import java.util.List;

public interface DAMContentFragmentService {

    /**
     * This method is used to get the DAMContentFragment List
     *
     * @param cfResourceList cfResourceList
     * @return DAMContentFragment DAMContentFragment
     */
    List<DAMContentFragment> getContentFragmentList(List<Resource> cfResourceList);

    /**
     * This method is used to get the DAMContentFragmentList
     *
     * @param contentFragmentCriteria contentFragmentCriteria
     * @return List<DAMContentFragment> List<DAMContentFragment>
     */
    List<Resource> getCFResourceList(ContentFragmentCriteria contentFragmentCriteria);

}

