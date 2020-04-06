/**
 *
 */
package ca.sunlife.web.cms.core.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import ca.sunlife.web.cms.core.constants.AdvisorDetailConstants;
import ca.sunlife.web.cms.core.constants.BasePageModelConstants;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.services.AdvisorDetailService;
import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * The Class AdvisorDetailModel.
 */
@ Model (adaptables = { SlingHttpServletRequest.class,
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AdvisorDetailModel {

  /** The log. */
  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  /** The current page. */
  @ Inject
  private Page currentPage;

  /** The request. */
  @ Self
  private SlingHttpServletRequest request;

  /** The response. */
  @ ScriptVariable
  private SlingHttpServletResponse response;

  /** The AdvisorDetailService service. */
  @ Inject
  private AdvisorDetailService advisorDetailService;

  /** The SiteConfigService service. */
  @ Inject
  private SiteConfigService configService;

  /** Type of advisor - ADVISOR/CORP. */
  @ ValueMapValue (name = "advisorType")
  private String advisorType;

  /** Address Label. */
  @ Inject
  @ Via ("resource")
  private String addressLabel;

  /** Languages Label. */
  @ Inject
  @ Via ("resource")
  private String languagesLabel;

  /** Phone Label. */
  @ Inject
  @ Via ("resource")
  private String phoneLabel;

  /** Cell Phone Label. */
  @ Inject
  @ Via ("resource")
  private String cellPhoneLabel;

  /** Language not supported alert message. */
  @ Inject
  @ Via ("resource")
  private String languageNotSupportedMessage;

  /** Alternate language. */
  @ Inject
  @ Via ("resource")
  private String alternateLanguage;

  /** Alternate URL. */
  @ Inject
  @ Via ("resource")
  private String alternateUrl;

  /** Email Label. */
  @ Inject
  @ Via ("resource")
  private String emailLabel;

  /** Fax Label. */
  @ Inject
  @ Via ("resource")
  private String faxLabel;

  /** Disclaimer Asterisk. */
  @ Inject
  @ Via ("resource")
  private String disclaimerAsteriskLabel;

  /** Advisor Image. */
  @ Inject
  @ Via ("resource")
  private String advisorImage;

  /** Image Domain. */
  @ Inject
  @ Via ("resource")
  private String domain;

  /** Visit my link label. */
  @ Inject
  @ Via ("resource")
  private String advisorLinkLabel;

  /** Advisor location label. */
  @ Inject
  @ Via ("resource")
  private String advisorLocationLabel;

  /** View larger map label. */
  @ Inject
  @ Via ("resource")
  private String viewLargerMapLabel;

  /** View larger map title. */
  @ Inject
  @ Via ("resource")
  private String viewLargerMapTitle;

  /** New Window Image. */
  @ Inject
  @ Via ("resource")
  private String newWindowImage;

  /** Marker corporate icon. */
  @ Inject
  @ Via ("resource")
  private String iconMarkerCorporate;

  /** Marker standard icon. */
  @ Inject
  @ Via ("resource")
  private String iconMarkerStandard;

  /** Advisor data json. */
  private String advisorData;

  /** Advisor map data json. */
  private String advisorMapData;

  /**
   * Gets the advisor type.
   *
   * @return the advisorType
   */
  public String getAdvisorType() {
    return advisorType;
  }

  /**
   * Sets the advisor type.
   *
   * @param advisorType
   *          the advisorType to set
   */
  public void setAdvisorType(final String advisorType) {
    this.advisorType = advisorType;
  }

  /**
   * Gets the address label.
   *
   * @return the addressLabel
   */
  public String getAddressLabel() {
    return addressLabel;
  }

  /**
   * Sets the address label.
   *
   * @param addressLabel
   *          the addressLabel to set
   */
  public void setAddressLabel(final String addressLabel) {
    this.addressLabel = addressLabel;
  }

  /**
   * Gets the languages label.
   *
   * @return the languagesLabel
   */
  public String getLanguagesLabel() {
    return languagesLabel;
  }

  /**
   * Sets the languages label.
   *
   * @param languagesLabel
   *          the languagesLabel to set
   */
  public void setLanguagesLabel(final String languagesLabel) {
    this.languagesLabel = languagesLabel;
  }

  /**
   * Gets the phone label.
   *
   * @return the phoneLabel
   */
  public String getPhoneLabel() {
    return phoneLabel;
  }

  /**
   * Sets the phone label.
   *
   * @param phoneLabel
   *          the phoneLabel to set
   */
  public void setPhoneLabel(final String phoneLabel) {
    this.phoneLabel = phoneLabel;
  }

  /**
   * Gets the cell phone label.
   *
   * @return the cellPhoneLabel
   */
  public String getCellPhoneLabel() {
    return cellPhoneLabel;
  }

  /**
   * Sets the cell phone label.
   *
   * @param cellPhoneLabel
   *          the cellPhoneLabel to set
   */
  public void setCellPhoneLabel(final String cellPhoneLabel) {
    this.cellPhoneLabel = cellPhoneLabel;
  }

  /**
   * Gets the email label.
   *
   * @return the emailLabel
   */
  public String getEmailLabel() {
    return emailLabel;
  }

  /**
   * Sets the email label.
   *
   * @param emailLabel
   *          the emailLabel to set
   */
  public void setEmailLabel(final String emailLabel) {
    this.emailLabel = emailLabel;
  }

  /**
   * Gets the fax label.
   *
   * @return the faxLabel
   */
  public String getFaxLabel() {
    return faxLabel;
  }

  /**
   * Sets the fax label.
   *
   * @param faxLabel
   *          the faxLabel to set
   */
  public void setFaxLabel(final String faxLabel) {
    this.faxLabel = faxLabel;
  }

  /**
   * Gets the disclaimer asterisk label.
   *
   * @return the disclaimerAsteriskLabel
   */
  public String getDisclaimerAsteriskLabel() {
    return disclaimerAsteriskLabel;
  }

  /**
   * Sets the disclaimer asterisk label.
   *
   * @param disclaimerAsteriskLabel
   *          the disclaimerAsteriskLabel to set
   */
  public void setDisclaimerAsteriskLabel(final String disclaimerAsteriskLabel) {
    this.disclaimerAsteriskLabel = disclaimerAsteriskLabel;
  }

  /**
   * Gets the advisor image.
   *
   * @return the advisorImage
   */
  public String getAdvisorImage() {
    return advisorImage;
  }

  /**
   * Sets the advisor image.
   *
   * @param advisorImage
   *          the advisorImage to set
   */
  public void setAdvisorImage(final String advisorImage) {
    this.advisorImage = advisorImage;
  }

  /**
   * Gets the domain.
   *
   * @return the domain
   */
  public String getDomain() {
    return domain;
  }

  /**
   * Sets the domain.
   *
   * @param domain
   *          the domain to set
   */
  public void setDomain(final String domain) {
    this.domain = domain;
  }

  /**
   * Gets the advisor link label.
   *
   * @return the advisorLinkLabel
   */
  public String getAdvisorLinkLabel() {
    return advisorLinkLabel;
  }

  /**
   * Sets the advisor link label.
   *
   * @param advisorLinkLabel
   *          the advisorLinkLabel to set
   */
  public void setAdvisorLinkLabel(final String advisorLinkLabel) {
    this.advisorLinkLabel = advisorLinkLabel;
  }

  /**
   * Gets the advisor location label.
   *
   * @return the advisorLocationLabel
   */
  public String getAdvisorLocationLabel() {
    return advisorLocationLabel;
  }

  /**
   * Sets the advisor location label.
   *
   * @param advisorLocationLabel
   *          the advisorLocationLabel to set
   */
  public void setAdvisorLocationLabel(final String advisorLocationLabel) {
    this.advisorLocationLabel = advisorLocationLabel;
  }

  /**
   * Gets the view larger map label.
   *
   * @return the viewLargerMapLabel
   */
  public String getViewLargerMapLabel() {
    return viewLargerMapLabel;
  }

  /**
   * Sets the view larger map label.
   *
   * @param viewLargerMapLabel
   *          the viewLargerMapLabel to set
   */
  public void setViewLargerMapLabel(final String viewLargerMapLabel) {
    this.viewLargerMapLabel = viewLargerMapLabel;
  }

  /**
   * Gets the view larger map title.
   *
   * @return the viewLargerMapTitle
   */
  public String getViewLargerMapTitle() {
    return viewLargerMapTitle;
  }

  /**
   * Sets the view larger map title.
   *
   * @param viewLargerMapTitle
   *          the viewLargerMapTitle to set
   */
  public void setViewLargerMapTitle(final String viewLargerMapTitle) {
    this.viewLargerMapTitle = viewLargerMapTitle;
  }

  /**
   * Gets the new window image.
   *
   * @return the newWindowImage
   */
  public String getNewWindowImage() {
    return newWindowImage;
  }

  /**
   * Sets the new window image.
   *
   * @param newWindowImage
   *          the newWindowImage to set
   */
  public void setNewWindowImage(final String newWindowImage) {
    this.newWindowImage = newWindowImage;
  }

  /**
   * Gets the advisor data.
   *
   * @return the advisorData
   */
  public String getAdvisorData() {
    return advisorData;
  }

  /**
   * Sets the advisor data.
   *
   * @param advisorData
   *          the advisorData to set
   */
  public void setAdvisorData(final String advisorData) {
    this.advisorData = advisorData;
  }

  /**
   * Gets the advisor map data.
   *
   * @return the advisorMapData
   */
  public String getAdvisorMapData() {
    return advisorMapData;
  }

  /**
   * Sets the advisor map data.
   *
   * @param advisorMapData
   *          the advisorMapData to set
   */
  public void setAdvisorMapData(final String advisorMapData) {
    this.advisorMapData = advisorMapData;
  }

  /**
   * Gets the icon marker corporate.
   *
   * @return the iconMarkerCorporate
   */
  public String getIconMarkerCorporate() {
    return iconMarkerCorporate;
  }

  /**
   * Sets the icon marker corporate.
   *
   * @param iconMarkerCorporate
   *          the iconMarkerCorporate to set
   */
  public void setIconMarkerCorporate(final String iconMarkerCorporate) {
    this.iconMarkerCorporate = iconMarkerCorporate;
  }

  /**
   * Gets the icon marker standard.
   *
   * @return the iconMarkerStandard
   */
  public String getIconMarkerStandard() {
    return iconMarkerStandard;
  }

  /**
   * Sets the icon marker standard.
   *
   * @param iconMarkerStandard
   *          the iconMarkerStandard to set
   */
  public void setIconMarkerStandard(final String iconMarkerStandard) {
    this.iconMarkerStandard = iconMarkerStandard;
  }

  /**
   * @return the languageNotSupportedMessage
   */
  public String getLanguageNotSupportedMessage() {
    return languageNotSupportedMessage;
  }

  /**
   * @param languageNotSupportedMessage
   *          the languageNotSupportedMessage to set
   */
  public void setLanguageNotSupportedMessage(final String languageNotSupportedMessage) {
    this.languageNotSupportedMessage = languageNotSupportedMessage;
  }

  /**
   * @return the alternateLanguage
   */
  public String getAlternateLanguage() {
    return alternateLanguage;
  }

  /**
   * @param alternateLanguage
   *          the alternateLanguage to set
   */
  public void setAlternateLanguage(final String alternateLanguage) {
    this.alternateLanguage = alternateLanguage;
  }

  /**
   * @return the alternateUrl
   */
  public String getAlternateUrl() {
    return alternateUrl;
  }

  /**
   * @param alternateUrl
   *          the alternateUrl to set
   */
  public void setAlternateUrl(final String alternateUrl) {
    this.alternateUrl = alternateUrl;
  }

  /**
   * Advisor Detail Model - init method to process data after model loads.
   */
  @ PostConstruct
  public void init() {
    logger.debug("Entry :: init method of AdvisorDetailModel :: advisorType: {}", advisorType);
    String language = null;
    String [ ] requestSelectors = null;
    String advisorId = null;
    try {
      final String pagePath = currentPage.getPath();
      final String pageLocale = configService.getConfigValues("pageLocale", pagePath);

      advisorType = currentPage.getProperties().get(AdvisorDetailConstants.ADVISOR_TYPE_CONSTANT,
          String.class);

      if (advisorType == null) {
        logger.debug("Advisor type is not set, hence existing process to set map data.");
        return;
      }

      requestSelectors = request.getRequestPathInfo().getSelectors();
      if (requestSelectors.length <= 0) {
        logger
            .debug("Selector for advisor page doesn't exist, please use selector for advisor id.");
        return;
      }
      language = pageLocale.split("_") [ 0 ];
      advisorId = requestSelectors [ 0 ];
      logger.debug("advisorId: {}", advisorId);
      advisorData = advisorDetailService.getAdvisorDetails(language, advisorType, advisorId);
      if (null != advisorData) {
        validateAdvisorData(advisorId);
        setMapData();
      }
    } catch (ApplicationException | LoginException | RepositoryException | SystemException
        | JSONException e) {
      logger.error("Error :: init method of AdvisorDetailModel :: {}", e);
    }
    logger.debug("Exit :: init method of AdvisorDetailModel :: advisorData :: {}", advisorData);
  }

  /**
   * Sets data for advisor map.
   */
  private void setMapData() {
    logger.debug("Entry :: AdvisorDetailModel :: setMapData :: advisorData :: {}", advisorData);
    JSONObject jsonObject = null;
    String address = null;
    String lng = null;
    String phone = null;
    String name = null;
    String cell = null;
    String aid = null;
    String lat = null;
    String email = null;
    try {
      final JSONObject inputJson = new JSONObject(advisorData);

      if (AdvisorDetailConstants.CORP_CONSTANT.equals(advisorType)) {
        final JSONObject advisorCorpJson = inputJson
            .getJSONObject(AdvisorDetailConstants.ADVISOR_CORP_CONSTANT);
        address = buildAddress(
            advisorCorpJson.getJSONObject(AdvisorDetailConstants.CORP_ADDRESS_CONSTANT));
        final JSONObject corpContactInfoJson = advisorCorpJson
            .getJSONObject(AdvisorDetailConstants.CORP_CONTACT_INFO_CONSTANT);
        phone = corpContactInfoJson.getString(AdvisorDetailConstants.PHONE_CONSTANT);
        cell = corpContactInfoJson.isNull(AdvisorDetailConstants.CELL_PHONE_CONSTANT) ? null
            : corpContactInfoJson.getString(AdvisorDetailConstants.CELL_PHONE_CONSTANT);
        name = advisorCorpJson.getString(AdvisorDetailConstants.CORP_NAME_CONSTANT);
        aid = advisorCorpJson.getString(AdvisorDetailConstants.AID_CONSTANT);
        final JSONObject googleMapJson = advisorCorpJson
            .getJSONObject(AdvisorDetailConstants.GOOGLE_MAP_CONSTANT);
        lat = googleMapJson.getString(AdvisorDetailConstants.LATITUDE_CONSTANT);
        lng = googleMapJson.getString(AdvisorDetailConstants.LONGITUDE_CONSTANT);
        email = corpContactInfoJson.getString(AdvisorDetailConstants.EMAIL_CONSTANT);
      } else {
        final JSONObject advisorStdJson = inputJson
            .getJSONObject(AdvisorDetailConstants.ADVISOR_STD_CONSTANT);
        address = buildAddress(
            advisorStdJson.getJSONObject(AdvisorDetailConstants.ADDRESS_CONSTANT));
        final JSONObject contactInfoJson = advisorStdJson
            .getJSONObject(AdvisorDetailConstants.CONTACT_INFO_CONSTANT);
        phone = contactInfoJson.getString(AdvisorDetailConstants.PHONE_CONSTANT);
        cell = contactInfoJson.isNull(AdvisorDetailConstants.CELL_PHONE_CONSTANT) ? null
            : contactInfoJson.getString(AdvisorDetailConstants.CELL_PHONE_CONSTANT);
        name = advisorStdJson.getString(AdvisorDetailConstants.FORMATTED_NAME_CONSTANT);
        aid = advisorStdJson.getString(AdvisorDetailConstants.AID_CONSTANT);
        final JSONObject googleMapJson = advisorStdJson
            .getJSONObject(AdvisorDetailConstants.GOOGLE_MAP_CONSTANT);
        lat = googleMapJson.getString(AdvisorDetailConstants.LATITUDE_CONSTANT);
        lng = googleMapJson.getString(AdvisorDetailConstants.LONGITUDE_CONSTANT);
        email = contactInfoJson.getString(AdvisorDetailConstants.EMAIL_CONSTANT);
      }
      jsonObject = new JSONObject();
      jsonObject.put(AdvisorDetailConstants.ADDRESS_SM_CONSTANT, address);
      jsonObject.put(AdvisorDetailConstants.PHONE_SM_CONSTANT, phone);
      jsonObject.put(AdvisorDetailConstants.NAME_CONSTANT, name);
      jsonObject.put(AdvisorDetailConstants.LANG_CONSTANT, "EN"); // Need to check in WEM
      jsonObject.put(AdvisorDetailConstants.CELL_CONSTANT, cell);
      jsonObject.put(AdvisorDetailConstants.TYPE_CONSTANT, advisorType);
      jsonObject.put(AdvisorDetailConstants.AID_SM_CONSTANT, aid);
      jsonObject.put(AdvisorDetailConstants.LNG_CONSTANT, lng);
      jsonObject.put(AdvisorDetailConstants.LAT_CONSTANT, lat);
      jsonObject.put(AdvisorDetailConstants.EMAIL_SM_CONSTANT, email);
      final Gson gson = new GsonBuilder().disableHtmlEscaping().create();
      advisorMapData = gson.toJson(jsonObject);
    } catch (final JSONException e) {
      logger.error("Error :: AdvisorDetailModel :: setMapData :: {}", e);
    }
    logger.debug("Exit :: AdvisorDetailModel :: setMapData :: advisorMapData :: {}",
        advisorMapData);
  }

  /**
   * Prepares full address.
   *
   * @param addressJson
   *          the address json
   * @return the string
   * @throws JSONException
   *           the JSON exception
   */
  private String buildAddress(final JSONObject addressJson) throws JSONException {
    logger.debug("Entry :: AdvisorDetailModel :: buildAddress :: ");
    final StringBuilder address = new StringBuilder();
    address.append(addressJson.get(AdvisorDetailConstants.STREET_ADDRESS_1_CONSTANT));
    address.append(", ");
    if (addressJson.has(AdvisorDetailConstants.STREET_ADDRESS_2_CONSTANT)
        && null != addressJson.get(AdvisorDetailConstants.STREET_ADDRESS_2_CONSTANT)
        && ! "".equals(addressJson.get(AdvisorDetailConstants.STREET_ADDRESS_2_CONSTANT))) {
      address.append(addressJson.get(AdvisorDetailConstants.STREET_ADDRESS_2_CONSTANT));
      address.append(", ");
    }
    address.append(addressJson.get(AdvisorDetailConstants.CITY_CONSTANT));
    address.append(", ");
    address.append(addressJson.get(AdvisorDetailConstants.PROVINCE_CONSTANT));
    address.append(", ");
    address.append(addressJson.get(AdvisorDetailConstants.POSTAL_CODE_CONSTANT));
    logger.debug("Exit :: AdvisorDetailModel :: buildAddress :: address :: {}", address);
    return address.toString();
  }

  /**
   * validates advisor data
   *
   * @param advisorId
   * @throws JSONException
   */
  public void validateAdvisorData(final String advisorId) throws JSONException {
    logger.debug("Entry :: AdvisorDetailModel :: validateAdvisorData");
    final JSONObject inputJson = new JSONObject(advisorData);
    if (inputJson.has(AdvisorDetailConstants.ERROR_CODE_CONSTANT)
        && inputJson.get(AdvisorDetailConstants.ERROR_CODE_CONSTANT)
            .equals(AdvisorDetailConstants.ERROR_CODE_LANGUAGE_NOT_SUPPORTED_CONSTANT)) {
      setAlternateURL(advisorId);
    }
    logger.debug("Entry :: AdvisorDetailModel :: validateAdvisorData");
  }

  /**
   * sets alternate url for negative scenario
   *
   * @param advisorId
   */
  public void setAlternateURL(final String advisorId) {
    logger.debug("Entry :: AdvisorDetailModel :: setAlternateURL");
    alternateUrl = alternateUrl
        .replace(BasePageModelConstants.ADVISOR_ID_CANONICAL_URL_FORMAT_CONSTANT, advisorId);
    logger.debug("Exit :: AdvisorDetailModel :: setAlternateURL :: {}", alternateUrl);
  }
}
