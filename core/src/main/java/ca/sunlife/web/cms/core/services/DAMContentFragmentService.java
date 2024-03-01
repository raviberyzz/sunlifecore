/**
 *
 */
package ca.sunlife.web.cms.core.services;

import com.adobe.cq.dam.cfm.converter.ContentTypeConverter;
import com.adobe.cq.wcm.core.components.models.contentfragment.DAMContentFragment;


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

}

