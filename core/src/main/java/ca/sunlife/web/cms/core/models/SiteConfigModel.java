/**
 *
 */
package ca.sunlife.web.cms.core.models;

import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface SiteConfigModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = {
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "sunlife/core/components/config/configuration")
public interface SiteConfigModel {

  /**
   * Gets the site name.
   *
   * @return the site name
   */
  @ Inject
  String getSiteName();

  /**
   * Gets the domain.
   *
   * @return the domain
   */

  @ Inject
  String getDomain();

  /**
   * Gets the staticPath.
   *
   * @return the staticPath
   */

  @ Inject
  String getStaticPath();
  
  /**
   * Gets the site url.
   *
   * @return the site url
   */

  @ Inject
  String getSiteUrl();
  
  /**
   * Gets the site root path.
   *
   * @return the site root path
   */

  @ Inject
  String getSiteRootPath();

  /**
   * Gets the site suffix.
   *
   * @return the site suffix
   */
  @ Inject
  String getSiteSuffix();

  /**
   * Gets the alternate languages.
   *
   * @return the alternate languages
   */
  @ Inject
  List <AlternateLanguageModel> getAlternateLanguages();

  /**
   * Gets the page description.
   *
   * @return the page description
   */
  @ Inject
  String getPageDescription();

  /**
   * Gets the page locale.
   *
   * @return the page locale
   */
  @ Inject
  String getPageLocale();

  /**
   * Gets the social media image.
   *
   * @return the social media image
   */
  @ Inject
  String getSocialMediaImage();

  /**
   * Gets the default reporting language.
   *
   * @return the default reporting language
   */
  @ Inject
  String getDefaultReportingLanguage();

  /**
   * Gets the experience fragment path.
   *
   * @return the experience fragment path
   */
  @ Inject
  String getExperienceFragmentPath();

  /**
   * Gets the navigation overview.
   *
   * @return the navigation overview
   */
  @ Inject
  String getNavigationOverview();

  /**
   * Gets the udo tags path.
   *
   * @return the udo tags path
   */
  @ Inject
  String getUdoTagsPath();

  /**
   * Gets the article date format.
   *
   * @return the article date format
   */
  @ Inject
  String getArticleDateFormat();

  /**
   * Gets the article publisher name.
   *
   * @return the article publisher name
   */
  @ Inject
  String getArticlePublisherName();

  /**
   * Gets the article publisher logo.
   *
   * @return the article publisher logo
   */
  @ Inject
  String getArticlePublisherLogo();

  /**
   * Gets the article type.
   *
   * @return the article type
   */
  @ Inject
  String getArticleType();

  /**
   * Gets the article publisher for meta tag.
   *
   * @return the article publisher for meta tag
   */
  @ Inject
  String getArticlePublisherForMetaTag();

  /**
   * Gets the article creator.
   *
   * @return the article creator
   */
  @ Inject
  String getArticleCreator();

  /**
   * Gets the article site.
   *
   * @return the article site
   */
  @ Inject
  String getArticleSite();
  
  /**
   * Gets the article browser title format.
   *
   * @return the article title format
   */
  @ Inject
  String getArticleTitleFormat();

  /**
   * Gets the featured image path.
   *
   * @return the featured image path
   */
  @ Inject
  String getFeaturedImagePath();
  
  /**
   * Gets the enable context hub param.
   *
   * @return the enable context hub param
   */
  @ Inject
  String getEnableContextHub();
  
  /**
   * Gets the Disable SEO tags.
   *
   * @return the Disable SEO tags
   */
  @ Inject
  String getDisableSocialSharingTags();
  
  /**
   * Gets the mfaDomainPath param.
   *
   * @return the mfaDomainPath param
   */
  @ Inject
  String getMfaDomainPath();
  
  /**
   * Gets the mfaEncryption param.
   *
   * @return the mfaEncryption param
   */
  @ Inject
  String getMfaEncryption();

  /**
   * Gets the CoveoSearchEnabled param.
   *
   * @return the CoveoSearchEnabled param
   */
  @ Inject
  String getCoveoSearchEnabled();
  
  /**
   * Gets the SearchToken param.
   *
   * @return the SearchToken param
   */
  @ Inject
  String getSearchToken();
  
  /**
   * Gets the SearchUrl param.
   *
   * @return the SearchUrl param
   */
  @ Inject
  String getSearchUrl();
  
  /**
   * Gets the OrgId param.
   *
   * @return the OrgId param
   */
  @ Inject
  String getOrgId();
  
  /**
   * Gets the restUri param.
   *
   * @return the restUri param
   */
  @ Inject
  String getRestUri();

  /**
   * Gets the searchHub param.
   *
   * @return the searchHub param
   */
  @ Inject
  String getSearchHub();

  /**
   * Gets the siteLocale param.
   *
   * @return the siteLocale param
   */
  @ Inject
  String getSiteLocale();
}
