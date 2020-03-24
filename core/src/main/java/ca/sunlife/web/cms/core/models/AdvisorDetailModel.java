/**
 * 
 */
package ca.sunlife.web.cms.core.models;

import java.io.IOException;

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
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.services.AdvisorDetailService;
import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * The Class AdvisorDetailModel
 */
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AdvisorDetailModel {

	/** The log */
	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Inject
	private Page currentPage;

	@Self
	private SlingHttpServletRequest request;

	@ScriptVariable
	private SlingHttpServletResponse response;
	
	/** The AdvisorDetailService service. */
	@Inject
	private AdvisorDetailService advisorDetailService;

	/** The SiteConfigService service. */
	@Inject
	private SiteConfigService configService;

	/** Type of advisor - ADVISOR/CORP */
	@ValueMapValue(name = "advisorType")
	private String advisorType;

	/** Address Label */
	@Inject
	@Via("resource")
	private String addressLabel;

	/** Languages Label */
	@Inject
	@Via("resource")
	private String languagesLabel;

	/** Phone Label */
	@Inject
	@Via("resource")
	private String phoneLabel;

	/** Cell Phone Label */
	@Inject
	@Via("resource")
	private String cellPhoneLabel;

	/** Email Label */
	@Inject
	@Via("resource")
	private String emailLabel;

	/** Fax Label */
	@Inject
	@Via("resource")
	private String faxLabel;

	/** Disclaimer Asterisk */
	@Inject
	@Via("resource")
	private String disclaimerAsteriskLabel;

	/** Advisor Image */
	@Inject
	@Via("resource")
	private String advisorImage;

	/** Image Domain */
	@Inject
	@Via("resource")
	private String domain;

	/** Visit my link label */
	@Inject
	@Via("resource")
	private String advisorLinkLabel;

	/** Advisor location label */
	@Inject
	@Via("resource")
	private String advisorLocationLabel;
	
	/** View larger map label */
	@Inject
	@Via("resource")
	private String viewLargerMapLabel;
	
	/** View larger map title */
	@Inject
	@Via("resource")
	private String viewLargerMapTitle;
	
	/** New Window Image */
	@Inject
	@Via("resource")
	private String newWindowImage;
	
	/** Marker corporate icon */
	@Inject
	@Via("resource")
	private String iconMarkerCorporate;
	
	/** Marker standard icon */
	@Inject
	@Via("resource")
	private String iconMarkerStandard;
	
	/** Advisor data json */
	private String advisorData;

	/** Advisor map data json */
	private String advisorMapData;

	/**
	 * @return the advisorType
	 */
	public String getAdvisorType() {
		return advisorType;
	}

	/**
	 * @param advisorType
	 *            the advisorType to set
	 */
	public void setAdvisorType(String advisorType) {
		this.advisorType = advisorType;
	}

	/**
	 * @return the addressLabel
	 */
	public String getAddressLabel() {
		return addressLabel;
	}

	/**
	 * @param addressLabel
	 *            the addressLabel to set
	 */
	public void setAddressLabel(String addressLabel) {
		this.addressLabel = addressLabel;
	}

	/**
	 * @return the languagesLabel
	 */
	public String getLanguagesLabel() {
		return languagesLabel;
	}

	/**
	 * @param languagesLabel
	 *            the languagesLabel to set
	 */
	public void setLanguagesLabel(String languagesLabel) {
		this.languagesLabel = languagesLabel;
	}

	/**
	 * @return the phoneLabel
	 */
	public String getPhoneLabel() {
		return phoneLabel;
	}

	/**
	 * @param phoneLabel
	 *            the phoneLabel to set
	 */
	public void setPhoneLabel(String phoneLabel) {
		this.phoneLabel = phoneLabel;
	}

	/**
	 * @return the cellPhoneLabel
	 */
	public String getCellPhoneLabel() {
		return cellPhoneLabel;
	}

	/**
	 * @param cellPhoneLabel
	 *            the cellPhoneLabel to set
	 */
	public void setCellPhoneLabel(String cellPhoneLabel) {
		this.cellPhoneLabel = cellPhoneLabel;
	}

	/**
	 * @return the emailLabel
	 */
	public String getEmailLabel() {
		return emailLabel;
	}

	/**
	 * @param emailLabel
	 *            the emailLabel to set
	 */
	public void setEmailLabel(String emailLabel) {
		this.emailLabel = emailLabel;
	}

	/**
	 * @return the faxLabel
	 */
	public String getFaxLabel() {
		return faxLabel;
	}

	/**
	 * @param faxLabel
	 *            the faxLabel to set
	 */
	public void setFaxLabel(String faxLabel) {
		this.faxLabel = faxLabel;
	}

	/**
	 * @return the disclaimerAsteriskLabel
	 */
	public String getDisclaimerAsteriskLabel() {
		return disclaimerAsteriskLabel;
	}

	/**
	 * @param disclaimerAsteriskLabel
	 *            the disclaimerAsteriskLabel to set
	 */
	public void setDisclaimerAsteriskLabel(String disclaimerAsteriskLabel) {
		this.disclaimerAsteriskLabel = disclaimerAsteriskLabel;
	}

	/**
	 * @return the advisorImage
	 */
	public String getAdvisorImage() {
		return advisorImage;
	}

	/**
	 * @param advisorImage
	 *            the advisorImage to set
	 */
	public void setAdvisorImage(String advisorImage) {
		this.advisorImage = advisorImage;
	}

	/**
	 * @return the domain
	 */
	public String getDomain() {
		return domain;
	}

	/**
	 * @param domain
	 *            the domain to set
	 */
	public void setDomain(String domain) {
		this.domain = domain;
	}

	/**
	 * @return the advisorLinkLabel
	 */
	public String getAdvisorLinkLabel() {
		return advisorLinkLabel;
	}

	/**
	 * @param advisorLinkLabel
	 *            the advisorLinkLabel to set
	 */
	public void setAdvisorLinkLabel(String advisorLinkLabel) {
		this.advisorLinkLabel = advisorLinkLabel;
	}

	/**
	 * @return the advisorLocationLabel
	 */
	public String getAdvisorLocationLabel() {
		return advisorLocationLabel;
	}

	/**
	 * @param advisorLocationLabel the advisorLocationLabel to set
	 */
	public void setAdvisorLocationLabel(String advisorLocationLabel) {
		this.advisorLocationLabel = advisorLocationLabel;
	}

	/**
	 * @return the viewLargerMapLabel
	 */
	public String getViewLargerMapLabel() {
		return viewLargerMapLabel;
	}

	/**
	 * @param viewLargerMapLabel the viewLargerMapLabel to set
	 */
	public void setViewLargerMapLabel(String viewLargerMapLabel) {
		this.viewLargerMapLabel = viewLargerMapLabel;
	}

	/**
	 * @return the viewLargerMapTitle
	 */
	public String getViewLargerMapTitle() {
		return viewLargerMapTitle;
	}

	/**
	 * @param viewLargerMapTitle the viewLargerMapTitle to set
	 */
	public void setViewLargerMapTitle(String viewLargerMapTitle) {
		this.viewLargerMapTitle = viewLargerMapTitle;
	}

	/**
	 * @return the newWindowImage
	 */
	public String getNewWindowImage() {
		return newWindowImage;
	}

	/**
	 * @param newWindowImage the newWindowImage to set
	 */
	public void setNewWindowImage(String newWindowImage) {
		this.newWindowImage = newWindowImage;
	}

	/**
	 * @return the advisorData
	 */
	public String getAdvisorData() {
		return advisorData;
	}

	/**
	 * @param advisorData
	 *            the advisorData to set
	 */
	public void setAdvisorData(String advisorData) {
		this.advisorData = advisorData;
	}

	/**
	 * @return the advisorMapData
	 */
	public String getAdvisorMapData() {
		return advisorMapData;
	}

	/**
	 * @param advisorMapData
	 *            the advisorMapData to set
	 */
	public void setAdvisorMapData(String advisorMapData) {
		this.advisorMapData = advisorMapData;
	}

	/**
	 * @return the iconMarkerCorporate
	 */
	public String getIconMarkerCorporate() {
		return iconMarkerCorporate;
	}

	/**
	 * @param iconMarkerCorporate the iconMarkerCorporate to set
	 */
	public void setIconMarkerCorporate(String iconMarkerCorporate) {
		this.iconMarkerCorporate = iconMarkerCorporate;
	}

	/**
	 * @return the iconMarkerStandard
	 */
	public String getIconMarkerStandard() {
		return iconMarkerStandard;
	}

	/**
	 * @param iconMarkerStandard the iconMarkerStandard to set
	 */
	public void setIconMarkerStandard(String iconMarkerStandard) {
		this.iconMarkerStandard = iconMarkerStandard;
	}

	/**
	 * Advisor Detail Model - init method to process data after model loads
	 */
	@PostConstruct
	public void init() {
		logger.debug("Entry :: init method of AdvisorDetailModel :: advisorType: {}", advisorType);
		String language = null;
		String[] requestSelectors = null;
		String advisorId = null;
		try {
			final String pagePath = currentPage.getPath();
			final String pageLocale = configService.getConfigValues("pageLocale", pagePath);
			
			advisorType = currentPage.getProperties().get(AdvisorDetailConstants.ADVISOR_TYPE_CONSTANT, String.class);
			
			if (advisorType == null) {
				logger.debug("Advisor type is not set, hence existing process to set map data.");
				return;
			}
			
			requestSelectors = request.getRequestPathInfo().getSelectors();
			if (requestSelectors.length <= 0) {
				logger.debug("Selector for advisor page doesn't exist, please use selector for advisor id.");
				return;
			}
			language = pageLocale.split("_")[0];
			advisorId = requestSelectors[0];
			logger.debug("advisorId: {}", advisorId);
			advisorData = advisorDetailService.getAdvisorDetails(language, advisorType, advisorId);
			if (null != advisorData) {
				validateAdvisorData();
				setMapData();
			}
		} catch (ApplicationException | LoginException | RepositoryException | SystemException e) {
			logger.error("Error :: init method of AdvisorDetailModel :: {}", e);
		}
		logger.debug("Exit :: init method of AdvisorDetailModel :: advisorData :: {}", advisorData);
	}

	/**
	 * Validates advisor data
	 */
	public void validateAdvisorData() {
		logger.debug("Entry :: AdvisorDetailModel :: validateAdvisorData :: ");
		JSONObject inputJson = null;
		String errorCode = null;
		try {
			inputJson = new JSONObject(advisorData);
			errorCode = inputJson.getString(AdvisorDetailConstants.ERROR_CODE_CONSTANT);
			if( null != errorCode && AdvisorDetailConstants.ERROR_CODE_LANGUAGE_NOT_SUPPORTED_CONSTANT.equals(errorCode) ) {
				response.sendRedirect("/content/sunlife/external/ca/en/error/404");
			}
		} catch (IOException | JSONException e) {
			logger.error("Error :: AdvisorDetailModel :: validateAdvisorData :: IOException :: {}", e);
		}
		logger.debug("Exit :: AdvisorDetailModel :: validateAdvisorData :: ");
	}
	
	/**
	 * Sets data for advisor map
	 */
	private void setMapData() {
		logger.debug("Entry :: setMapData :: advisorData :: {}", advisorData);
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
			JSONObject inputJson = new JSONObject(advisorData);

			if (AdvisorDetailConstants.CORP_CONSTANT.equals(advisorType)) {
				JSONObject advisorCorpJson = inputJson.getJSONObject(AdvisorDetailConstants.ADVISOR_CORP_CONSTANT);
				address = buildAddress(advisorCorpJson.getJSONObject(AdvisorDetailConstants.CORP_ADDRESS_CONSTANT));
				JSONObject corpContactInfoJson = advisorCorpJson.getJSONObject(AdvisorDetailConstants.CORP_CONTACT_INFO_CONSTANT);
				phone = corpContactInfoJson.getString(AdvisorDetailConstants.PHONE_CONSTANT);
				cell = corpContactInfoJson.isNull(AdvisorDetailConstants.CELL_PHONE_CONSTANT) ? null : corpContactInfoJson.getString(AdvisorDetailConstants.CELL_PHONE_CONSTANT);
				name = advisorCorpJson.getString(AdvisorDetailConstants.CORP_NAME_CONSTANT);
				aid = advisorCorpJson.getString(AdvisorDetailConstants.AID_CONSTANT);
				JSONObject googleMapJson = advisorCorpJson.getJSONObject(AdvisorDetailConstants.GOOGLE_MAP_CONSTANT);
				lat = googleMapJson.getString(AdvisorDetailConstants.LATITUDE_CONSTANT);
				lng = googleMapJson.getString(AdvisorDetailConstants.LONGITUDE_CONSTANT);
				email = corpContactInfoJson.getString(AdvisorDetailConstants.EMAIL_CONSTANT);
			} else {
				JSONObject advisorStdJson = inputJson.getJSONObject(AdvisorDetailConstants.ADVISOR_STD_CONSTANT);
				address = buildAddress(advisorStdJson.getJSONObject(AdvisorDetailConstants.ADDRESS_CONSTANT));
				JSONObject contactInfoJson = advisorStdJson.getJSONObject(AdvisorDetailConstants.CONTACT_INFO_CONSTANT);
				phone = contactInfoJson.getString(AdvisorDetailConstants.PHONE_CONSTANT);
				cell = contactInfoJson.isNull(AdvisorDetailConstants.CELL_PHONE_CONSTANT) ? null : contactInfoJson.getString(AdvisorDetailConstants.CELL_PHONE_CONSTANT);
				name = advisorStdJson.getString(AdvisorDetailConstants.FORMATTED_NAME_CONSTANT);
				aid = advisorStdJson.getString(AdvisorDetailConstants.AID_CONSTANT);
				JSONObject googleMapJson = advisorStdJson.getJSONObject(AdvisorDetailConstants.GOOGLE_MAP_CONSTANT);
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
			Gson gson = new GsonBuilder().disableHtmlEscaping().create();
			advisorMapData = gson.toJson(jsonObject);
		} catch (JSONException e) {
			logger.error("Error :: setMapData :: {}", e);
		}
		logger.debug("Exit :: setMapData :: advisorMapData :: {}", advisorMapData);
	}

	/**
	 * Prepares full address
	 * @param addressJson
	 * @return
	 * @throws JSONException
	 */
	private String buildAddress(JSONObject addressJson) throws JSONException {
		logger.debug("Entry :: buildAddress :: ");
		StringBuilder address = new StringBuilder();
		address.append(addressJson.get(AdvisorDetailConstants.STREET_ADDRESS_1_CONSTANT));
		address.append(", ");
		if (addressJson.has(AdvisorDetailConstants.STREET_ADDRESS_2_CONSTANT) && null != addressJson.get(AdvisorDetailConstants.STREET_ADDRESS_2_CONSTANT) && !"".equals(addressJson.get(AdvisorDetailConstants.STREET_ADDRESS_2_CONSTANT))) {
			address.append(addressJson.get(AdvisorDetailConstants.STREET_ADDRESS_2_CONSTANT));
			address.append(", ");
		}
		address.append(addressJson.get(AdvisorDetailConstants.CITY_CONSTANT));
		address.append(", ");
		address.append(addressJson.get(AdvisorDetailConstants.PROVINCE_CONSTANT));
		address.append(", ");
		address.append(addressJson.get(AdvisorDetailConstants.POSTAL_CODE_CONSTANT));
		logger.debug("Exit :: buildAddress :: address :: {}", address);
		return address.toString();
	}
}
