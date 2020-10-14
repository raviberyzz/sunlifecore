/**
 * 
 */
package ca.sunlife.web.cms.source.services.impl;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ca.sunlife.web.cms.core.constants.UserInfoConstants;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.services.RestService;
import ca.sunlife.web.cms.source.osgi.config.UGCConfig;
import ca.sunlife.web.cms.source.services.UGCService;

/**
 * The Class UGCServiceImpl.
 *
 * @author TCS
 * @version 1.0
 */
@ Component(service = UGCService.class, immediate = true)
@ Designate(ocd = UGCConfig.class)
public class UGCServiceImpl implements UGCService {

	/** The logger. */
	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	/** The rest service. */
	@ Reference
	private RestService restService;

	/** The UGC service. */
	private UGCConfig ugcConfig;

	/** The UGC service urls map. */
	private Map<String, String> servicesMap;

	/**
	 * Activate ugc service config for UGCServiceImpl.
	 * 
	 * @param ugcConfig
	 */
	@ Activate
	public void activate(UGCConfig ugcConfig) {
		logger.debug("Activating UGCConfig for NewsListing servlet");
		this.ugcConfig = ugcConfig;
		servicesMap = new HashMap<>();
		for (String url : ugcConfig.getUGCServices()) {
			String[] serviceUrl = url.split("~");
			servicesMap.put(serviceUrl[0], serviceUrl[1]);
		}
		logger.debug("Activated UGCConfig for NewsListing servlet :: {} , {}", this.ugcConfig, servicesMap);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see ca.sunlife.web.cms.source.services.UGCService#callWebService(java.lang.
	 * String, java.lang.String, java.util.Map)
	 */
	@ Override
	public String callWebService(String serviceUrl, String methodType, String userInfo,
			Map<String, String[]> requestParams, String requestJsonPost) throws ApplicationException, SystemException, IOException {
		logger.debug("Entry :: callWebService method of UGCServiceImpl :: serviceUrl {}, methodType {}, userInfo {}, requestParams {}", serviceUrl, methodType, userInfo, requestParams);
		JSONObject reqHeaderjson = new JSONObject();
		try {
			JSONObject userProfileJson = new JSONObject(userInfo);
			reqHeaderjson.put("authentication-token", this.ugcConfig.getAuthToken());
			reqHeaderjson.put("user-acf-id", userProfileJson.get(UserInfoConstants.ACF2_CONSTANT));
			reqHeaderjson.put("user-given-name", userProfileJson.get(UserInfoConstants.USER_NAME_CONSTANT));
			reqHeaderjson.put("user-email-address", userProfileJson.get(UserInfoConstants.EMAIL_CONSTANT));
		} catch (JSONException e) {
			logger.error("JSONException :: while setting request headers {}", e);
		}
		if ("GET".equals(methodType)) {
			StringBuilder url = new StringBuilder(this.ugcConfig.getUGCServiceDomain());
			url.append(servicesMap.get(serviceUrl));
			url.append("?siteName=").append(this.ugcConfig.getUGCServiceSite());
			if (null != requestParams && requestParams.size() > 0) {
				requestParams.forEach((key, value) -> {
					url.append("&").append(key).append("=").append(value[0]);
				});
			}
			logger.debug("callWebService :: url :: {}", url);
			return restService.callGetWebService(url.toString(), reqHeaderjson.toString());
		} else {
			JSONObject json = null;
				try {
					if (null != requestJsonPost && requestJsonPost.length() > 2) {
						json = new JSONObject(requestJsonPost);
						json.put("siteName", this.ugcConfig.getUGCServiceSite());
					} else {
						json = new JSONObject();
					}
				} catch (JSONException e1) {
					logger.error("JSONException :: while setting site name {}", e1);
				}
				String url = this.ugcConfig.getUGCServiceDomain() + servicesMap.get(serviceUrl);
				if("POST".equals(methodType)) {
				return restService.callPostWebService(url, reqHeaderjson.toString(), null != json ? json.toString() : null);
				}
				else {
			    return restService.callDeleteWebService(url, reqHeaderjson.toString(), null != json ? json.toString() : null);	
				}
		}
	
	}

}
