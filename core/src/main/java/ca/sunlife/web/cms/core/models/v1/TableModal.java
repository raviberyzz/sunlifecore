package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = {
        Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface TableModal {

    /**
     * Gets the table data.
     *
     * @return the table data
     */

    @ValueMapValue
    String getTableData();

    /**
     * Gets the spacing
     *
     * @return the spacing
     */
    @ValueMapValue
    String getSpacing();

}
