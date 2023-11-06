package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

/**
 * The @Links interface represents the model for the List of Links which are used in ListList component.
 *
 * @author Sunlife
 */

@Model(adaptables = {
        Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)

public interface Links {

    @Inject
    String getLinkTitle();

    @Inject
    String getLinkSize();

    @Inject
    String getLinkType();

    @Inject
    String getLinkURL();

    @Inject
    String getLangCode();

    @Inject
    String getTarget();

    @Inject
    String getDataTitle();

}
