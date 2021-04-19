/*
 *
 */

package ca.sunlife.web.cms.core.models;

import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface ListModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = {
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface ListModel {

  /**
   * Gets the title.
   *
   * @return the title
   */
  @ Inject
  String getTitle();

  /**
   * Gets the links.
   *
   * @return the links
   */
  @ Inject
  List <Links> getLinks(); // the name `getLinks` corresponds to the multifield name="./links"

  /**
   * The Interface Links.
   *
   * @author TCS
   * @version 1.0
   */
  @ Model (adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
  interface Links {

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
     * Gets the lang code.
     *
     * @return the lang code
     */
    @ Inject
    String getLangCode();

    /**
     * Gets the target.
     *
     * @return the target
     */
    @ Inject
    String getTarget();
    
    /**
     * Gets the data title.
     *
     * @return the data title
     */
    @ Inject
    String getDataTitle();

  }
}
