/**
 *
 */
package ca.sunlife.web.cms.core.models;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

/**
 * The Class RegionLanguageMenu.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = {
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class RegionLanguageMenu {

  /** The title. */
  @ Inject
  private String title;
  
  /** The header type. */
  @ Inject
  private String type;

  
  /** The title mobile. */
  @ Inject
  private String titleMobile;

  /** The regions. */
  @ ChildResource (name = "regions")
  private List <LinkModel> regions;

  /** The language section title. */
  @ Inject
  private String languageSectionTitle;

  /** The language section title mobile. */
  @ Inject
  private String languageSectionTitleMobile;

  /** The language links. */
  @ Inject
  private List <SubLinkModel> languageLinks;

  /** The close modal text. */
  @ Inject
  private String closeModalText;

  /** The select lang text. */
  @ Inject
  private String selectLangText;

  /** The back button text. */
  @ Inject
  private String backButtonText;

  /** The selected tab mobile. */
  @ Inject
  private String selectedTabMobile;
  
  /** The region links. */
  private List <List <LinkModel>> regionLinks;
  
  /** The analytics id. */
  @ Inject
  private String analyticsId;
  /**
   * Gets the region links.
   *
   * @return the region links
   */
  public List <List <LinkModel>> getRegionLinks() {
    return null != regionLinks ? Collections.unmodifiableList(regionLinks) : null;
  }

  /**
   * Sets the region links.
   *
   * @param regionLinks
   *          the new region links
   */
  public void setRegionLinks(final List <List <LinkModel>> regionLinks) {
    this.regionLinks = Collections.unmodifiableList(regionLinks);
  }

  /**
   * Gets the title.
   *
   * @return the title
   */
  public String getTitle() {
    return title;
  }

  /**
   * Sets the title.
   *
   * @param title
   *          the new title
   */
  public void setTitle(final String title) {
    this.title = title;
  }
  
  /**
   * Gets the header type.
   *
   * @return the header type
   */
  public String getType() {
		return type;
  }

  /**
   * Sets the header type.
   *
   * @param type
   *          the new type
   */
  public void setType(String type) {
		this.type = type;
  }


  /**
   * Gets the title mobile.
   *
   * @return the title mobile
   */
  public String getTitleMobile() {
    return titleMobile;
  }

  /**
   * Sets the title mobile.
   *
   * @param titleMobile
   *          the new title mobile
   */
  public void setTitleMobile(final String titleMobile) {
    this.titleMobile = titleMobile;
  }

  /**
   * Gets the regions.
   *
   * @return the regions
   */
  public List <LinkModel> getRegions() {
    return null != regions ? Collections.unmodifiableList(regions) : null;
  }

  /**
   * Sets the regions.
   *
   * @param regions
   *          the new regions
   */
  public void setRegions(final List <LinkModel> regions) {
    this.regions = Collections.unmodifiableList(regions);
  }

  /**
   * Gets the language section title.
   *
   * @return the language section title
   */
  public String getLanguageSectionTitle() {
    return languageSectionTitle;
  }

  /**
   * Sets the language section title.
   *
   * @param languageSectionTitle
   *          the new language section title
   */
  public void setLanguageSectionTitle(final String languageSectionTitle) {
    this.languageSectionTitle = languageSectionTitle;
  }

  /**
   * Gets the language section title mobile.
   *
   * @return the language section title mobile
   */
  public String getLanguageSectionTitleMobile() {
    return languageSectionTitleMobile;
  }

  /**
   * Sets the language section title mobile.
   *
   * @param languageSectionTitleMobile
   *          the new language section title mobile
   */
  public void setLanguageSectionTitleMobile(final String languageSectionTitleMobile) {
    this.languageSectionTitleMobile = languageSectionTitleMobile;
  }

  /**
   * Gets the language links.
   *
   * @return the language links
   */
  public List <SubLinkModel> getLanguageLinks() {
    return Collections.unmodifiableList(languageLinks);
  }

  /**
   * Sets the language links.
   *
   * @param languageLinks
   *          the new language links
   */
  public void setLanguageLinks(final List <SubLinkModel> languageLinks) {
    this.languageLinks = Collections.unmodifiableList(languageLinks);
  }

  /**
   * Gets the close modal text.
   *
   * @return the close modal text
   */
  public String getCloseModalText() {
    return closeModalText;
  }

  /**
   * Sets the close modal text.
   *
   * @param closeModalText
   *          the new close modal text
   */
  public void setCloseModalText(final String closeModalText) {
    this.closeModalText = closeModalText;
  }

  /**
   * Gets the select lang text.
   *
   * @return the select lang text
   */
  public String getSelectLangText() {
    return selectLangText;
  }

  /**
   * Sets the select lang text.
   *
   * @param selectLangText
   *          the new select lang text
   */
  public void setSelectLangText(final String selectLangText) {
    this.selectLangText = selectLangText;
  }

  /**
   * Gets the back button text.
   *
   * @return the back button text
   */
  public String getBackButtonText() {
    return backButtonText;
  }

  /**
   * Sets the back button text.
   *
   * @param backButtonText
   *          the new back button text
   */
  public void setBackButtonText(final String backButtonText) {
    this.backButtonText = backButtonText;
  }

  /**
   * Gets the selected tab mobile.
   *
   * @return the selected tab mobile
   */
  public String getSelectedTabMobile() {
    return selectedTabMobile;
  }

  /**
   * Sets the selected tab mobile.
   *
   * @param selectedTabMobile
   *          the new selected tab mobile
   */
  public void setSelectedTabMobile(final String selectedTabMobile) {
    this.selectedTabMobile = selectedTabMobile;
  }
 
  /**
   * Gets the analytics id.
   *
   * @return the analytics id
   */
  public String getAnalyticsId() {
	return analyticsId;
  }

  /**
   * Sets the analytics id.
   *
   * @param analyticsId the new analytics id
   */
  public void setAnalyticsId(String analyticsId) {
	this.analyticsId = analyticsId;
  }

/**
   * Inits the.
   */
  @ PostConstruct
  public void init() {
    List <LinkModel> tempList = new ArrayList <>();
    if (null == regions) {
      return;
    }
    regionLinks = new ArrayList <>();
    for (final LinkModel region : regions) {
      tempList.add(region);
      if ("yes".equals(region.getNextList())) {
        regionLinks.add(tempList);
        tempList = new ArrayList <>();
      }
    }
    regionLinks.add(tempList);
  }

}
