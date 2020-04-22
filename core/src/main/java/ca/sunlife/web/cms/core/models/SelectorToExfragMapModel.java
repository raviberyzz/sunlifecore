package ca.sunlife.web.cms.core.models;

import java.util.Collections;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.inject.Inject;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.Via;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * The Class SelectorToExfragMapModel.
 */
@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class },resourceType = "sunlife/core/components/content/recommended-products-article", defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SelectorToExfragMapModel {

  /** The items. */
  @Inject
  @Via("resource")
  private List<SelectorExFragMap> items;

  /** The request. */
  @Self(injectionStrategy = InjectionStrategy.REQUIRED)
  private SlingHttpServletRequest request;

  /** The frag path. */
  private String fragPath;

  /** The Constant LOGGER. */
  private static final Logger LOGGER = LoggerFactory.getLogger(SelectorToExfragMapModel.class);

  /**
  * Gets the items.
  *
  * @return the items
  */
  public Collection<SelectorExFragMap> getItems() {
    return Collections.unmodifiableCollection(items);
  }


  /**
  * Gets the frag path.
  *
  * @return the frag path
  */
  public String getFragPath() {
    return fragPath;
  }

  /**
  * Sets the frag path.
  *
  * @param fragPath
  *            the new frag path
  */
  public void setFragPath(String fragPath) {
    this.fragPath = fragPath;
  }

  /**
  * Inits the.
  */
  @PostConstruct
  public void init() {
    final String[] selectors = request.getRequestPathInfo().getSelectors();
    LOGGER.debug("No of entries {}", getItems().size());
    if (selectors.length > 0 && !getItems().isEmpty()) {
      Iterator<SelectorExFragMap> itemIterator = items.iterator();
      while (itemIterator.hasNext()) {
        SelectorExFragMap item = itemIterator.next();
        if (item.getSelector().equals(selectors[0])) {
          fragPath = item.getExfragPath();
        }
      }
    }

  }
}
