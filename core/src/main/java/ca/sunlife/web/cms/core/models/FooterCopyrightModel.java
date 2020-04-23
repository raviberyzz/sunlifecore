package ca.sunlife.web.cms.core.models;

import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface FooterCopyrightModel.
 */
@ Model (adaptables = {
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface FooterCopyrightModel {

  /**
   * Gets the title.
   *
   * @return the title
   */
  @ Inject
  String getTitle();

  /**
   * Gets the copyright text.
   *
   * @return the copyright text
   */
  @ Inject
  String getCopyrightText();

  /**
   * Gets the slf text.
   *
   * @return the slf text
   */
  @ Inject
  String getSlfText();

  /**
   * Gets the footer items.
   *
   * @return the footer items
   */
  @ Inject
  List <FooterItemsModel> getFooterItems();
  
}
