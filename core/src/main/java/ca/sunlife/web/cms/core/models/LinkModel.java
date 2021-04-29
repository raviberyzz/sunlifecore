/*
 *
 */

package ca.sunlife.web.cms.core.models;

import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

/**
 * The Interface LinkModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface LinkModel {

  /**
   * Gets the link name.
   *
   * @return the link name
   */
  @ Inject
  String getLinkName();

  /**
   * Gets the link url.
   *
   * @return the link url
   */
  @ Inject
  String getLinkUrl();

  /**
   * Gets the link target.
   *
   * @return the link target
   */
  @ Inject
  String getLinkTarget();
  
  /**
   * Gets the data title.
   *
   * @return the data title
   */
  @ Inject
  String getDataTitle();

  /**
   * Gets the next list.
   *
   * @return the next list
   */
  @ Inject
  String getNextList();

  /**
   * Gets the expand list.
   *
   * @return the expand list
   */
  @ Inject
  String getExpandList();

  /**
   * Gets the sub links.
   *
   * @return the sub links
   */
  @ ChildResource (name = "subLinks")
  List <SubLinkModel> getSubLinks();

}
