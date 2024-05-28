package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;


@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)

public interface SearchResultsModel {

    @ValueMapValue
    String getResultsFilterHeading();

    @ValueMapValue
    String getSearchResults();

    @ChildResource
    List<FilterOptions> filterOptions();

    @Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
    interface FilterOptions {

        @ValueMapValue
        String getDataID();

        @ValueMapValue
        String getFilterTitle();
    }
}
 