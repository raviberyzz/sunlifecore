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
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = { SlingHttpServletRequest.class,
    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AdvisorDetailModel {

  /** The logger. */
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

  /** The advisor detail service. */
  @ Inject
  private AdvisorDetailService advisorDetailService;

  /** The config service. */
  @ Inject
  private SiteConfigService configService;

  /** The advisor type. */
  @ ValueMapValue (name = "advisorType")
  private String advisorType;

  /** The address label. */
  @ Inject
  @ Via ("resource")
  private String addressLabel;

  /** The languages label. */
  @ Inject
  @ Via ("resource")
  private String languagesLabel;

  /** The phone label. */
  @ Inject
  @ Via ("resource")
  private String phoneLabel;

  /** The cell phone label. */
  @ Inject
  @ Via ("resource")
  private String cellPhoneLabel;

  /** The invalid advisor id message. */
  @ Inject
  @ Via ("resource")
  private String invalidAdvisorIdMessage;

  /** The language not supported message. */
  @ Inject
  @ Via ("resource")
  private String languageNotSupportedMessage;

  /** The alternate language. */
  @ Inject
  @ Via ("resource")
  private String alternateLanguage;

  /** The alternate url. */
  @ Inject
  @ Via ("resource")
  private String alternateUrl;

  /** The email label. */
  @ Inject
  @ Via ("resource")
  private String emailLabel;

  /** The fax label. */
  @ Inject
  @ Via ("resource")
  private String faxLabel;

  /** The disclaimer asterisk label. */
  @ Inject
  @ Via ("resource")
  private String disclaimerAsteriskLabel;

  /** The advisor image. */
  @ Inject
  @ Via ("resource")
  private String advisorImage;

  /** The domain. */
  @ Inject
  @ Via ("resource")
  private String domain;

  /** The advisor link label. */
  @ Inject
  @ Via ("resource")
  private String advisorLinkLabel;

  /** The advisor location label. */
  @ Inject
  @ Via ("resource")
  private String advisorLocationLabel;

  /** The view larger map label. */
  @ Inject
  @ Via ("resource")
  private String viewLargerMapLabel;

  /** The view larger map title. */
  @ Inject
  @ Via ("resource")
  private String viewLargerMapTitle;

  /** The new window image. */
  @ Inject
  @ Via ("resource")
  private String newWindowImage;

  /** The icon marker corporate. */
  @ Inject
  @ Via ("resource")
  private String iconMarkerCorporate;

  /** The icon marker standard. */
  @ Inject
  @ Via ("resource")
  private String iconMarkerStandard;

  /** The advisor data. */
  private String advisorData;

  /** The advisor map data. */
  private String advisorMapData;
  
  /** The if error scenario. */
  private boolean isError;

  /**
   * Gets the advisor type.
   *
   * @return the advisor type
   */
  public String getAdvisorType() {
    return advisorType;
  }

  /**
   * Sets the advisor type.
   *
   * @param advisorType
   *          the new advisor type
   */
  public void setAdvisorType(final String advisorType) {
    this.advisorType = advisorType;
  }

  /**
   * Gets the address label.
   *
   * @return the address label
   */
  public String getAddressLabel() {
    return addressLabel;
  }

  /**
   * Sets the address label.
   *
   * @param addressLabel
   *          the new address label
   */
  public void setAddressLabel(final String addressLabel) {
    this.addressLabel = addressLabel;
  }

  /**
   * Gets the languages label.
   *
   * @return the languages label
   */
  public String getLanguagesLabel() {
    return languagesLabel;
  }

  /**
   * Sets the languages label.
   *
   * @param languagesLabel
   *          the new languages label
   */
  public void setLanguagesLabel(final String languagesLabel) {
    this.languagesLabel = languagesLabel;
  }

  /**
   * Gets the phone label.
   *
   * @return the phone label
   */
  public String getPhoneLabel() {
    return phoneLabel;
  }

  /**
   * Sets the phone label.
   *
   * @param phoneLabel
   *          the new phone label
   */
  public void setPhoneLabel(final String phoneLabel) {
    this.phoneLabel = phoneLabel;
  }

  /**
   * Gets the cell phone label.
   *
   * @return the cell phone label
   */
  public String getCellPhoneLabel() {
    return cellPhoneLabel;
  }

  /**
   * Sets the cell phone label.
   *
   * @param cellPhoneLabel
   *          the new cell phone label
   */
  public void setCellPhoneLabel(final String cellPhoneLabel) {
    this.cellPhoneLabel = cellPhoneLabel;
  }

  /**
   * Gets the email label.
   *
   * @return the email label
   */
  public String getEmailLabel() {
    return emailLabel;
  }

  /**
   * Sets the email label.
   *
   * @param emailLabel
   *          the new email label
   */
  public void setEmailLabel(final String emailLabel) {
    this.emailLabel = emailLabel;
  }

  /**
   * Gets the fax label.
   *
   * @return the fax label
   */
  public String getFaxLabel() {
    return faxLabel;
  }

  /**
   * Sets the fax label.
   *
   * @param faxLabel
   *          the new fax label
   */
  public void setFaxLabel(final String faxLabel) {
    this.faxLabel = faxLabel;
  }

  /**
   * Gets the disclaimer asterisk label.
   *
   * @return the disclaimer asterisk label
   */
  public String getDisclaimerAsteriskLabel() {
    return disclaimerAsteriskLabel;
  }

  /**
   * Sets the disclaimer asterisk label.
   *
   * @param disclaimerAsteriskLabel
   *          the new disclaimer asterisk label
   */
  public void setDisclaimerAsteriskLabel(final String disclaimerAsteriskLabel) {
    this.disclaimerAsteriskLabel = disclaimerAsteriskLabel;
  }

  /**
   * Gets the advisor image.
   *
   * @return the advisor image
   */
  public String getAdvisorImage() {
    return advisorImage;
  }

  /**
   * Sets the advisor image.
   *
   * @param advisorImage
   *          the new advisor image
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
   *          the new domain
   */
  public void setDomain(final String domain) {
    this.domain = domain;
  }

  /**
   * Gets the advisor link label.
   *
   * @return the advisor link label
   */
  public String getAdvisorLinkLabel() {
    return advisorLinkLabel;
  }

  /**
   * Sets the advisor link label.
   *
   * @param advisorLinkLabel
   *          the new advisor link label
   */
  public void setAdvisorLinkLabel(final String advisorLinkLabel) {
    this.advisorLinkLabel = advisorLinkLabel;
  }

  /**
   * Gets the advisor location label.
   *
   * @return the advisor location label
   */
  public String getAdvisorLocationLabel() {
    return advisorLocationLabel;
  }

  /**
   * Sets the advisor location label.
   *
   * @param advisorLocationLabel
   *          the new advisor location label
   */
  public void setAdvisorLocationLabel(final String advisorLocationLabel) {
    this.advisorLocationLabel = advisorLocationLabel;
  }

  /**
   * Gets the view larger map label.
   *
   * @return the view larger map label
   */
  public String getViewLargerMapLabel() {
    return viewLargerMapLabel;
  }

  /**
   * Sets the view larger map label.
   *
   * @param viewLargerMapLabel
   *          the new view larger map label
   */
  public void setViewLargerMapLabel(final String viewLargerMapLabel) {
    this.viewLargerMapLabel = viewLargerMapLabel;
  }

  /**
   * Gets the view larger map title.
   *
   * @return the view larger map title
   */
  public String getViewLargerMapTitle() {
    return viewLargerMapTitle;
  }

  /**
   * Sets the view larger map title.
   *
   * @param viewLargerMapTitle
   *          the new view larger map title
   */
  public void setViewLargerMapTitle(final String viewLargerMapTitle) {
    this.viewLargerMapTitle = viewLargerMapTitle;
  }

  /**
   * Gets the new window image.
   *
   * @return the new window image
   */
  public String getNewWindowImage() {
    return newWindowImage;
  }

  /**
   * Sets the new window image.
   *
   * @param newWindowImage
   *          the new new window image
   */
  public void setNewWindowImage(final String newWindowImage) {
    this.newWindowImage = newWindowImage;
  }

  /**
   * Gets the advisor data.
   *
   * @return the advisor data
   */
  public String getAdvisorData() {
    return advisorData;
  }

  /**
   * Sets the advisor data.
   *
   * @param advisorData
   *          the new advisor data
   */
  public void setAdvisorData(final String advisorData) {
    this.advisorData = advisorData;
  }

  /**
   * Gets the advisor map data.
   *
   * @return the advisor map data
   */
  public String getAdvisorMapData() {
    return advisorMapData;
  }

  /**
   * Sets the advisor map data.
   *
   * @param advisorMapData
   *          the new advisor map data
   */
  public void setAdvisorMapData(final String advisorMapData) {
    this.advisorMapData = advisorMapData;
  }

  /**
   * Gets the icon marker corporate.
   *
   * @return the icon marker corporate
   */
  public String getIconMarkerCorporate() {
    return iconMarkerCorporate;
  }

  /**
   * Sets the icon marker corporate.
   *
   * @param iconMarkerCorporate
   *          the new icon marker corporate
   */
  public void setIconMarkerCorporate(final String iconMarkerCorporate) {
    this.iconMarkerCorporate = iconMarkerCorporate;
  }

  /**
   * Gets the icon marker standard.
   *
   * @return the icon marker standard
   */
  public String getIconMarkerStandard() {
    return iconMarkerStandard;
  }

  /**
   * Sets the icon marker standard.
   *
   * @param iconMarkerStandard
   *          the new icon marker standard
   */
  public void setIconMarkerStandard(final String iconMarkerStandard) {
    this.iconMarkerStandard = iconMarkerStandard;
  }

  /**
   * Gets the invalid advisor id message.
   *
   * @return the invalid advisor id message
   */
  public String getInvalidAdvisorIdMessage() {
    return invalidAdvisorIdMessage;
  }

  /**
   * Sets the invalid advisor id message.
   *
   * @param invalidAdvisorIdMessage
   *          the new invalid advisor id message
   */
  public void setInvalidAdvisorIdMessage(final String invalidAdvisorIdMessage) {
    this.invalidAdvisorIdMessage = invalidAdvisorIdMessage;
  }

  /**
   * Gets the language not supported message.
   *
   * @return the language not supported message
   */
  public String getLanguageNotSupportedMessage() {
    return languageNotSupportedMessage;
  }

  /**
   * Sets the language not supported message.
   *
   * @param languageNotSupportedMessage
   *          the new language not supported message
   */
  public void setLanguageNotSupportedMessage(final String languageNotSupportedMessage) {
    this.languageNotSupportedMessage = languageNotSupportedMessage;
  }

  /**
   * Gets the alternate language.
   *
   * @return the alternate language
   */
  public String getAlternateLanguage() {
    return alternateLanguage;
  }

  /**
   * Sets the alternate language.
   *
   * @param alternateLanguage
   *          the new alternate language
   */
  public void setAlternateLanguage(final String alternateLanguage) {
    this.alternateLanguage = alternateLanguage;
  }

  /**
   * Gets the alternate url.
   *
   * @return the alternate url
   */
  public String getAlternateUrl() {
    return alternateUrl;
  }

  /**
   * Sets the alternate url.
   *
   * @param alternateUrl
   *          the new alternate url
   */
  public void setAlternateUrl(final String alternateUrl) {
    this.alternateUrl = alternateUrl;
  }

  /**
   * Inits sling model.
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
   * Sets the map data.
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
    	if (isError) {
    		return;
    	}
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
   * Builds the address.
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
   * Validate advisor data.
   *
   * @param advisorId
   *          the advisor id
   * @throws JSONException
   *           the JSON exception
   */
	public void validateAdvisorData(final String advisorId) throws JSONException {
		logger.debug("Entry :: AdvisorDetailModel :: validateAdvisorData");
		final JSONObject inputJson = new JSONObject(advisorData);
		if (inputJson.has(AdvisorDetailConstants.ERROR_CODE_CONSTANT) && inputJson.get(
		                                                            AdvisorDetailConstants.ERROR_CODE_CONSTANT)
		                                                            .equals(AdvisorDetailConstants.ERROR_CODE_LANGUAGE_NOT_SUPPORTED_CONSTANT)) {
			isError = true;
			setAlternateUrls(advisorId);
		}
		if (inputJson.has(AdvisorDetailConstants.ERROR_CODE_CONSTANT) && inputJson.get(
		                                                            AdvisorDetailConstants.ERROR_CODE_CONSTANT)
		                                                            .equals(AdvisorDetailConstants.ERROR_CODE_INVALID_ADVISOR_ID_CONSTANT)) {
			isError = true;
		}
		logger.debug("Entry :: AdvisorDetailModel :: validateAdvisorData");
	}

  /**
   * Sets the alternate URL.
   *
   * @param advisorId
   *          the new alternate URL
   */
  public void setAlternateUrls(final String advisorId) {
    logger.debug("Entry :: AdvisorDetailModel :: setAlternateUrls");
    alternateUrl = alternateUrl
        .replace(BasePageModelConstants.ADVISOR_ID_CANONICAL_URL_FORMAT_CONSTANT, advisorId)
        .replace(BasePageModelConstants.ADVISOR_TYPE_CANONICAL_URL_FORMAT_CONSTANT, advisorType);
    logger.debug("Exit :: AdvisorDetailModel :: setAlternateURL :: {}", alternateUrl);
  }
}
