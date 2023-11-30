package ca.sunlife.web.cms.core.models.v1.Header;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.inject.Inject;
import java.util.List;

/**
 * Interface for HeaderModel
 */
@ Model (adaptables = {
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface HeaderModel {


  @ValueMapValue
  String getListFromNav();
  /**
   * Gets the navlinks which is multifield
   *
   * @return the navlinks
   */
  @ChildResource
  List <UtilityBarNavlinks> getNavlinks();

}
