package ca.sunlife.web.cms.core.services.impl;

import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.github.mustachejava.DefaultMustacheFactory;
import com.github.mustachejava.Mustache;
import com.github.mustachejava.MustacheFactory;

import ca.sunlife.web.cms.core.beans.AssetMix;
import ca.sunlife.web.cms.core.beans.FundFactsData;
import ca.sunlife.web.cms.core.beans.Guarantee;
import ca.sunlife.web.cms.core.beans.Holding;
import ca.sunlife.web.cms.core.beans.PerformanceData;
import ca.sunlife.web.cms.core.exception.ApplicationException;
import ca.sunlife.web.cms.core.exception.SystemException;
import ca.sunlife.web.cms.core.osgi.config.FundFactPDFConfig;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.FundFactPDFService;
import ca.sunlife.web.cms.core.services.RestService;

/**
 * The Class FundFactPDFServiceImpl.
 *
 * @author TCS
 * @version 1.0
 */
@ Component(service = { FundFactPDFService.class }, immediate = true)
@ Designate(ocd = FundFactPDFConfig.class)
public class FundFactPDFServiceImpl implements FundFactPDFService {

	/** The logger. */
	private static final Logger LOG = LoggerFactory.getLogger(FundFactPDFServiceImpl.class);

	/** The fact PDF config. */
	private FundFactPDFConfig factPDFConfig;

	/** The rest service. */
	@ Reference
	private RestService restService;

	/** The core resource resolver. */
	@ Reference
	private CoreResourceResolver coreResourceResolver;

	/** The salseChargeSectionHideClasses. */
	public static final String salseChargeSectionHideClasses = "IF,EF,AF,PF,SF";

	/** The iOClasses. */
	public static final String iOClasses = "IO,EO,AO,SO";

	/** The salseChargeSectionDeferedHideClasses. */
	public static final String salseChargeSectionDeferedHideClasses = "IO,IF,EO,EF,AO,AF,PF,SO,SF";

	/** The strfundFactsResponse. */
	public static final String strfundFactsResponse = "fundFactsResponse";

	/** The strfundFactsData. */
	public static final String strfundFactsData = "fundFactsData";

	/** The bolFundLessThanOneYear. */
	public static final String bolFundLessThanOneYear = "fundLessThanOneYear";

	/** The bolUnderlying. */
	public static final String bolUnderlying = "underlying";

	/** The bolGuaranteeSeriesAvailable. */
	public static final String bolGuaranteeSeriesAvailable = "guaranteeSeriesAvailable";

	/** The keySingleValuesMap. */
	public static final String keySingleValuesMap = "values";

	/** The keyYearByYearReturnAvailable. */
	public static final String keyYearByYearReturnAvailable = "yearByYearReturnAvailable";

	/** The keyNumberOfYears. */
	public static final String keyNumberOfYears = "numberOfYears";

	/** The keyMaxReturnYear. */
	public static final String keyMaxReturnYear = "maxReturnYear";

	/** The keyMinReturnYear. */
	public static final String keyMinReturnYear = "minReturnYear";

	/** The keytotalvalueon. */
	public static final String keytotalvalueon = "TotalValueOn";

	/** The keyunderlyingfund. */
	public static final String keyunderlyingfund = "UnderlyingFund";

	/** The keyproductname. */
	public static final String keyproductname = "ProductName";

	/** The keyplandate. */
	public static final String keyplandate = "PlanDate";

	/** The keyfellow. */
	public static final String keyfellow = "FELLow";

	/** The keytotalnumberofinvestments. */
	public static final String keytotalnumberofinvestments = "TotalNumberOfInvestments";

	/** The keyfundclass. */
	public static final String keyfundclass = "FundClass";

	/** The keyturnover. */
	public static final String keyturnover = "TurnOver";

	/** The keyreturnamount. */
	public static final String keyreturnamount = "ReturnAmount";

	/** The keyfelhigh. */
	public static final String keyfelhigh = "FELHigh";

	/** The keyriskratingvalue. */
	public static final String keyriskratingvalue = "RiskRatingValue";

	/** The keyreasonstoinvestcaution. */
	public static final String keyreasonstoinvestcaution = "ReasonsToInvestCaution";

	/** The keyfundmanager. */
	public static final String keyfundmanager = "FundManager";

	/** The keydateseries. */
	public static final String keydateseries = "DateSeries";

	/** The keywithdrawdays. */
	public static final String keywithdrawdays = "WithdrawDays";

	/** The keysubadvisor. */
	public static final String keysubadvisor = "SubAdvisor";

	/** The keyreturndate. */
	public static final String keyreturndate = "ReturnRate";

	/** The keyfundname. */
	public static final String keyfundname = "FundName";

	/** The keyfundobjective. */
	public static final String keyfundobjective = "FundObjective";

	/** The keytrailingcommission. */
	public static final String keytrailingcommission = "TrailingCommission";

	/** The keyfundunderlying. */
	public static final String keyfundunderlying = "FundUnderlying";

	/** The keydatefund. */
	public static final String keydatefund = "DateFund";

	/** The keytotalvalueamount. */
	public static final String keytotalvalueamount = "TotalValueAmount";

	/** The keyadvisorcommission. */
	public static final String keyadvisorcommission = "AdvisorCommission";

	/** The lowstringEN. */
	public static final String lowstringEN = "low";

	/** The lowstringFR. */
	public static final String lowstringFR = "faible";

	/** The lowtomedstringEN. */
	public static final String lowtomedstringEN = "low-to-medium";

	/** The lowtomedstringFR. */
	public static final String lowtomedstringFR = "faible à moyenne"; // faible à moyenne

	/** The medstringEN. */
	public static final String medstringEN = "medium";

	/** The medstringFR. */
	public static final String medstringFR = "moyenne";

	/** The medtohighstringEN. */
	public static final String medtohighstringEN = "medium-to-high";

	/** The medtohighstringFR. */
	public static final String medtohighstringFR = "moyenne à élevée";

	/** The highstringEN. */
	public static final String highstringEN = "high";

	/** The highstringFR. */
	public static final String highstringFR = "élevée";

	/** The strTrailingCommission. */
	public static final String strTrailingCommission = "TrailingCommission";

	/** The strTurnOverRate. */
	public static final String strTurnOverRate = "TurnOver";

	/** The strNAEN. */
	public static final String strNAEN = "N/A";

	/** The strNAFR. */
	public static final String strNAFR = "s.o.";

	/** The incomingDateFormatEN. */
	public static final String incomingDateFormatEN = "dd/MM/yyyy";

	/** The incomingDateFormatFR. */
	public static final String incomingDateFormatFR = "dd/MM/yyyy";

	/** The outcomingDateFormatEN. */
	public static final String outcomingDateFormatEN = "MMMMMMMM dd, yyyy";

	/** The outcomingDateFormatFR. */
	public static final String outcomingDateFormatFR = "dd MMMMMMMM yyyy";

	/** The errorjsonEN. */
	public static final String errorjsonEN = "{\"fundFactsResponse\": {\"returnCode\": \"9\",\"returnMessage\": \"Data not available\"}}";

	/** The errorjsonFR. */
	public static final String errorjsonFR = "{\"fundFactsResponse\": {\"returnCode\": \"9\",\"returnMessage\": \"Data not available-FR\"}}";

	/** The sungifssolutionen. */
	public static final String sungifssolutionen = "Sun GIF Solutions";

	/** The sungifssolutionfr. */
	public static final String sungifssolutionfr = "Solutions FPG Sun Life";

	/** The pichartURLPlaceholder. */
	private static final String pichartURLPlaceholder = "PI-CHART-URL-PLACEHOLDER";

	/** The barchartURLPlaceholder. */
	private static final String barchartURLPlaceholder = "BAR-CHART-URL-PLACEHOLDER";

	/** The barChartHiddenTablePlaceholder. */
	private static final String barChartHiddenTablePlaceholder = "BAR-CHART-HIDDEN-TABLE-PLACEHOLDER";

	/**
	 * Activate.
	 *
	 * @param factPDFConfig
	 *          the provider profile config
	 */
	@ Activate
	public void activate(FundFactPDFConfig factPDFConfig) {
		this.factPDFConfig = factPDFConfig;
		LOG.debug("FundFactPDFServiceImpl :: activate :: getfundFactsUrl :: {} ", this.factPDFConfig.getFundFactsUrl());
	}

	/**
	 * Gets the compiled data from all mustache templates.
	 *
	 * @param request
	 *          the request
	 */
	@ Override
	public String getCompiledData(SlingHttpServletRequest request)
			throws ApplicationException, SystemException, IOException, LoginException {
		LOG.debug("Entry :: FundFactPDFServiceImpl :: getCompiledData :: {}", request);
		String compiledData = null;
		// String reqParams = request.getParameter("fparams");
		String reqParams = request.getRequestPathInfo().getSelectors()[1];
		LOG.debug("FundFactPDFServiceImpl :: reqParams :: {}", reqParams);
		if (null != reqParams && reqParams.length() > 0) {
			// Reads query params and process them
			String[] paramArray = reqParams.split("\\|");
			Map<String, String> paramMap = new HashMap<>();
			for (String param : paramArray) {
				String[] valueArr = param.split("~");
				paramMap.put(valueArr[0], valueArr[1]);
			}
			LOG.debug("FundFactPDFServiceImpl :: paramMap :: {}", paramMap);

			String mPowerCode = paramMap.get("mp");
			String lang = paramMap.get("lang");

			// Building web service url with necessary params
			final StringBuilder importUrl = new StringBuilder();
			importUrl.append(factPDFConfig.getFundFactsUrl());
			importUrl.append("?fundCode=").append(mPowerCode);
			importUrl.append("&lang=").append(lang.toUpperCase(Locale.ROOT));

			String barchartURLprop;
			String pichartURLprop;

			pichartURLprop = factPDFConfig.getPichartURL() + "?mp=" + mPowerCode + "&lang=" + lang;
			barchartURLprop = factPDFConfig.getBarChartURL() + "&mp=" + mPowerCode + "&lang=" + lang;

			// web service call
			String response = restService.callGetWebService(importUrl.toString(), null);
			// Process response
			final StringBuilder sb = new StringBuilder();
			if (null != response && response.length() > 0) {
				LOG.debug("FundFactPDFServiceImpl :: processing response :: {}", response.length());
				// Web service call & response processing
				FundFactsData fundFactsData = populateJsonValue(response);
				// Mustache templates compilation
				final Resource currentResource = request.getResource();
				ValueMap currResValueMap = currentResource.getValueMap();
				sb.append(currResValueMap.getOrDefault("headInclude", StringUtils.EMPTY));
				sb.append("<body id=\"fundfactsinfo\">");
				sb.append("<div id=\"wrapper\">");
				final Resource pageResource = coreResourceResolver.getResourceResolver()
						.getResource(request.getResource().getPath().concat("/root"));
				if (null != pageResource) {
					pageResource.getChildren().forEach(child -> {
						try {
							final Resource childResource = coreResourceResolver.getResourceResolver()
									.getResource(child.getPath().concat("/container1"));
							if (null == childResource) {
								return;
							}
							// If first layout container
							if (child.getName().equals("layout_container")) {
								childResource.getChildren().forEach(htmlChild -> {
									final MustacheFactory mf = new DefaultMustacheFactory();
									final StringWriter writer = new StringWriter();
									ValueMap valueMap = htmlChild.getValueMap();
									// Reads mustache template from HTML component
									final String mustachTemplate = (String) valueMap.getOrDefault("text", StringUtils.EMPTY);
									LOG.debug("FundFactPDFServiceImpl :: mustachTemplate :: {}", mustachTemplate);
									final Mustache mustache = mf.compile(new StringReader(mustachTemplate), " ");
									mustache.execute(writer, fundFactsData);
									// Appends the compiled template to sb
									sb.append(writer.toString());
								});
							} else { // If others
								sb.append(
										"<div class=\"global-content-1column global-content clearfix\" id=\"content\"><div class=\"global-col1\" role=\"main\" id=\"mainbodycontent\"><div class=\"main-content\">");
								childResource.getChildren().forEach(htmlChild -> {
									final StringWriter writer = new StringWriter();
									final MustacheFactory mf = new DefaultMustacheFactory();
									String compiledOutput = null;
									ValueMap valueMap = htmlChild.getValueMap();
									// Reads mustache template from HTML component
									final String mustachTemplate = (String) valueMap.getOrDefault("text", StringUtils.EMPTY);
									LOG.debug("FundFactPDFServiceImpl :: mustachTemplate :: {}", mustachTemplate);
									final Mustache mustache = mf.compile(new StringReader(mustachTemplate), " ");
									mustache.execute(writer, fundFactsData);
									// Appends the compiled template to sb
									compiledOutput = writer.toString();
									if (compiledOutput.indexOf(pichartURLPlaceholder) > -1) {
										compiledOutput = compiledOutput.replaceAll(pichartURLPlaceholder, pichartURLprop);
									}
									if (compiledOutput.indexOf(barchartURLPlaceholder) > -1) {
										compiledOutput = compiledOutput.replaceAll(barchartURLPlaceholder, barchartURLprop);
										// Changes for accessibility defects for gifs 2020
										String hiddenTable = createDataTable(fundFactsData.getPerformanceData(),
												fundFactsData.getSingleValueMap());
										compiledOutput = compiledOutput.replaceAll(barChartHiddenTablePlaceholder, hiddenTable);
										LOG.debug("CompiledOutput is {}", compiledOutput);
									}
									sb.append(compiledOutput);
								});
								sb.append("</div></div></div>");
							}
						} catch (LoginException e) {
							LOG.error("Error :: LoginException :: {}", e);
						}
					});
				}
				sb.append("</div>");
				sb.append(currResValueMap.getOrDefault("bodyInclude", StringUtils.EMPTY));
				sb.append("</body>");
				compiledData = sb.toString();
				LOG.debug("FundFactPDFServiceImpl :: processing of response completed :: {}", compiledData);
			}
		}
		LOG.debug("Exit :: FundFactPDFServiceImpl :: getCompiledData ::");
		return compiledData;
	}

	/**
	 * get JSON obj node.
	 *
	 * @param obj
	 * @param nodeName
	 * @return
	 */
	public static JSONObject getNode(JSONObject obj, String nodeName) {
		JSONObject objJson;
		if (null != obj && !obj.isNull(nodeName)) {
			try {
				objJson = obj.getJSONObject(nodeName);
				return objJson;
			} catch (JSONException e) {
				LOG.error("Error :: getNode :: {}", e);
			}
		}
		return null;
	}

	/**
	 * get JSON array node.
	 *
	 * @param strNodeName
	 * @param obj
	 * @return
	 */
	public static JSONArray getJsonArray(String strNodeName, JSONObject obj) {
		try {
			if (!obj.isNull(strNodeName) && obj.getJSONArray(strNodeName) != null) {
				return obj.getJSONArray(strNodeName);
			}
		} catch (JSONException e) {
			LOG.error("Error :: getJsonArray :: {}", e);
		}
		return null;
	}

	/**
	 * This function populate FundFactsData from web service URL returns.
	 * 
	 * @param data
	 * @return
	 */
	public FundFactsData populateJsonValue(String data) {
		LOG.debug("Entering in populateJsonValue with WEB Service URL =");
		FundFactsData objFundFactsData = new FundFactsData();
		// parse json and put values in bean object.
		LOG.trace("JSON String from WS={} ", data);
		JSONObject jsonObjectFundFactsResponse = null;
		JSONObject jsonObject = null;
		try {
			JSONObject rootJsonObject = new JSONObject(data);
			jsonObjectFundFactsResponse = rootJsonObject.getJSONObject(strfundFactsResponse);
			if (jsonObjectFundFactsResponse != null) {
				LOG.trace("Got data for node={} ", strfundFactsResponse);
				String returnCode = jsonObjectFundFactsResponse.getString("returnCode");
				objFundFactsData.setReturnCode(returnCode);
				LOG.trace("returnCode=={} ", returnCode);
				if (returnCode.equals("0") || returnCode.equals("1")) {
					LOG.trace("Get return code from WS={} ", returnCode);
					jsonObject = jsonObjectFundFactsResponse.getJSONObject(strfundFactsData);
					// Top level node
					objFundFactsData.setmPowerCode(jsonObject.getString("mPowerCode"));
					String languageWS = jsonObject.getString("lang");
					String strNA = strNAEN;
					if (languageWS.equalsIgnoreCase("fr")) {
						strNA = strNAFR;
					}
					objFundFactsData.setLang(languageWS);
					objFundFactsData.setTotalPercentOfTop10Investments(jsonObject.getString("totalPercentOfTop10Investments"));
					objFundFactsData.setFundLessThanOneYear(jsonObject.getBoolean(bolFundLessThanOneYear));
					objFundFactsData.setUnderlying(jsonObject.getBoolean(bolUnderlying));
					objFundFactsData.setGuaranteeSeriesAvailable(jsonObject.getBoolean(bolGuaranteeSeriesAvailable));
					objFundFactsData.setIsyearByYearReturnAvailable(jsonObject.getBoolean(keyYearByYearReturnAvailable));
					objFundFactsData.setNumberOfYears(jsonObject.getString(keyNumberOfYears));
					objFundFactsData.setMaxReturnYear(jsonObject.getString(keyMaxReturnYear));
					objFundFactsData.setMinReturnYear(jsonObject.getString(keyMinReturnYear));

					// SingleValuesMap
					LOG.trace("keySingleValuesMap>>{} ", keySingleValuesMap);
					JSONObject singleValuesMapJSonObject = getNode(jsonObject, keySingleValuesMap);

					if (null != singleValuesMapJSonObject) {
						@ SuppressWarnings("unchecked")
						Iterator<String> nameItr = singleValuesMapJSonObject.keys();
						Map<String, String> singleValuesMap = new HashMap<>();
						String name = "";
						String jdata = "";
						while (nameItr.hasNext()) {
							name = nameItr.next();
							jdata = singleValuesMapJSonObject.getString(name) != null ? singleValuesMapJSonObject.getString(name)
									: "";
							singleValuesMap.put(name, jdata);
						}
						LOG.trace("singleValuesMap >>{} ", singleValuesMap);
						// below code is fix to wrong data from WS. may be need to remove when it is
						// fixed.
						String totalnumberofinvestments = singleValuesMap.get(keytotalnumberofinvestments);
						if (totalnumberofinvestments != null && !totalnumberofinvestments.trim().equals("")
								&& (totalnumberofinvestments.indexOf('.') > -1)) {
							LOG.trace("WS: totalnumberofinvestments>>{} ", totalnumberofinvestments);
							totalnumberofinvestments = totalnumberofinvestments.trim().substring(0,
									totalnumberofinvestments.indexOf('.'));
							singleValuesMap.put(keytotalnumberofinvestments, totalnumberofinvestments);
							LOG.trace("After format :: totalnumberofinvestments>>{} ", totalnumberofinvestments);
						}

						String withdrawdays = singleValuesMap.get(keywithdrawdays);
						if (withdrawdays != null && !withdrawdays.trim().equals("") && (withdrawdays.indexOf('.') > -1)) {
							LOG.trace("WS: keywithdrawdays>>{} ", withdrawdays);
							withdrawdays = withdrawdays.trim().substring(0, withdrawdays.indexOf('.'));
							singleValuesMap.put(keywithdrawdays, withdrawdays);
							LOG.trace("After format :: keywithdrawdays>>{} ", withdrawdays);
						}
						// as chart need data in row format .. so adding "dateFund" row data
						if (!singleValuesMapJSonObject.isNull(keydatefund)
								&& singleValuesMapJSonObject.getString(keydatefund) != null) {
							singleValuesMap.put("dateFundWS", singleValuesMapJSonObject.getString(keydatefund));
							LOG.trace("dateFundWS>>>>>>>>{} ", singleValuesMap.get("dateFundWS"));
						} else {
							LOG.trace(keySingleValuesMap, " {} dateFund is null");
						}
						if (singleValuesMap.get(strTrailingCommission) == null
								|| singleValuesMap.get(strTrailingCommission).trim().equals("")) {
							objFundFactsData.isTraillingCommisionAvailable = false;
						}
						if (singleValuesMap.get(strTurnOverRate) == null
								|| singleValuesMap.get(strTurnOverRate).trim().equals(strNA)) {
							objFundFactsData.isTunoverisNA = true;
						}
						// check if ProductName = Sun GIF Solutions or not
						if (singleValuesMap.get("ProductName") != null) {
							String productws = singleValuesMap.get("ProductName").trim();
							LOG.trace("productws>>{} ", productws);
							if (productws.equals(sungifssolutionen) || productws.equals(sungifssolutionfr)) {
								objFundFactsData.isSunGifSoln = true;
							} else {
								objFundFactsData.isSunGifSoln = false;
							}
						} else {
							LOG.trace("No product name from webservice with key=ProductName");
						}
						// change the values in single format map
						singleValuesMap = stringToDate(languageWS, singleValuesMap);
						singleValuesMap = numberFormat(languageWS, singleValuesMap);
						// now we have map populated ... so populate bean
						if (singleValuesMap.get(keyfellow).equals(strNA)) {
							objFundFactsData.isfELLow = true;
						}
						if (salseChargeSectionHideClasses.contains(singleValuesMap.get(keyfundclass))) {
							objFundFactsData.isFelFundClass = true;
						}
						if (salseChargeSectionDeferedHideClasses.contains(singleValuesMap.get(keyfundclass))) {
							objFundFactsData.isDeferFundClass = true;
						}
						if (iOClasses.contains(singleValuesMap.get(keyfundclass))) {
							objFundFactsData.isIOClass = true;
						}

						// Need to get the first year so setting up in single value map
						JSONArray advisorCommisionDCS = jsonObject.getJSONArray("dscList");
						if (advisorCommisionDCS.length() > 0) {
							String value = advisorCommisionDCS.get(0) != null ? advisorCommisionDCS.get(0).toString() : "";
							LOG.trace(value, "{} value in dscList");
							singleValuesMap.put("advisor_commision_DCS", value);
						} else {
							LOG.trace("dscList is size = 0");
						}

						JSONArray advisorCommisionLLSC = jsonObject.getJSONArray("llscList");
						if (advisorCommisionLLSC.length() > 0) {
							String value = advisorCommisionLLSC.get(0) != null ? advisorCommisionLLSC.get(0).toString() : "";
							LOG.trace(value, " {} LLSC");
							singleValuesMap.put("advisor_commision_LLSC", value);
						}

						String riskRatingWS = singleValuesMap.get(keyriskratingvalue);
						LOG.trace("riskRatingWS >>{} ", riskRatingWS);
						if (riskRatingWS.equals(lowstringEN) || riskRatingWS.equals(lowstringFR)) {
							objFundFactsData.lowRisk = true;
						} else if (riskRatingWS.equals(lowtomedstringEN) || riskRatingWS.equals(lowtomedstringFR)) {
							objFundFactsData.lowMedRisk = true;
						} else if (riskRatingWS.equals(medstringEN) || riskRatingWS.equals(medstringFR)) {
							objFundFactsData.medRisk = true;
						} else if (riskRatingWS.equals(medtohighstringEN) || riskRatingWS.equals(medtohighstringFR)) {
							objFundFactsData.medHighRisk = true;
						} else if (riskRatingWS.equals(highstringEN) || riskRatingWS.equals(highstringFR)) {
							objFundFactsData.highRisk = true;
						}
						if (!(singleValuesMap.get(keyreturndate).trim().equals(""))) {
							objFundFactsData.isReturnRate = true;
						}
						objFundFactsData.setSingleValueMap(singleValuesMap);
					} else {
						LOG.trace("** SINGLE VALUE MAP IS NULL for key={} ", keySingleValuesMap);
					}

					// Assets Mix List
					JSONArray arrAssetMix = getJsonArray("assetMixes", jsonObject);
					if (null != arrAssetMix && arrAssetMix.length() > 0) {
						objFundFactsData.setAssetMixAvailable(true);
						List<AssetMix> assetList = new ArrayList<>();
						LOG.trace("assetmix size= {} ", arrAssetMix.length());
						for (int i = 0; i < arrAssetMix.length(); i++) {
							JSONObject objAsset = arrAssetMix.getJSONObject(i);
							String assetName = objAsset.get("name") != null ? objAsset.get("name").toString() : "";
							String assetMixPercentage = objAsset.get("percentage") != null ? objAsset.get("percentage").toString()
									: "";
							String colourCd = objAsset.get("colourCd") != null ? objAsset.get("colourCd").toString() : "";
							AssetMix objAssets = new AssetMix(assetName, assetMixPercentage, colourCd);
							assetList.add(objAssets);
						}
						LOG.trace("AssetListSize={} ", assetList.size());
						objFundFactsData.setAssetMixes(assetList);
					} else {
						LOG.trace("Could not find the assetmix list from WS. Key -assetMixes");
					}

					// Fund Performance List
					JSONArray arrPerformanceData = getJsonArray("performanceData", jsonObject);
					if (null != arrPerformanceData && arrPerformanceData.length() > 0) {
						List<PerformanceData> performanceList = new ArrayList<>();
						LOG.trace("arrPerformanceData ={} ", arrPerformanceData.length());
						for (int i = 0; i < arrPerformanceData.length(); i++) {
							JSONObject objPerformance = arrPerformanceData.getJSONObject(i);
							String returnYear = objPerformance.get("year") != null ? objPerformance.get("year").toString() : "";
							String returnForYear = objPerformance.get("percentage") != null
									? objPerformance.get("percentage").toString()
									: "";
							String colourCd = objPerformance.get("colourCd") != null ? objPerformance.get("colourCd").toString() : "";
							PerformanceData objPerformances = new PerformanceData(returnYear, returnForYear, colourCd);
							performanceList.add(objPerformances);
						}
						objFundFactsData.setPerformanceData(performanceList);
					} else {
						LOG.trace("arrPerformanceData is null or zero");
					}

					// Guarantees list
					JSONArray arrGuarantees = getJsonArray("guarantees", jsonObject);
					if (null != arrGuarantees && arrGuarantees.length() > 0) {
						List<Guarantee> garList = new ArrayList<>();
						LOG.trace("FROM WS arrGuarantees.length()={} ", arrGuarantees.length());
						for (int i = 0; i < arrGuarantees.length(); i++) {
							JSONObject objGuarantey = arrGuarantees.getJSONObject(i);
							String seriesName = "";
							seriesName = objGuarantey.get("series") != null ? objGuarantey.get("series").toString() : "";
							String minInvestment = objGuarantey.get("minimumInvestment") != null
									? objGuarantey.get("minimumInvestment").toString().trim()
									: "";
							String mer = objGuarantey.get("MER") != null ? objGuarantey.get("MER").toString().trim() : "";
							String netAsset = objGuarantey.get("netAsset") != null ? objGuarantey.get("netAsset").toString().trim()
									: "";
							String numberUnits = objGuarantey.get("numberUnits") != null
									? objGuarantey.get("numberUnits").toString().trim()
									: "";
							if (!netAsset.trim().equals("")) {
								if (languageWS.equalsIgnoreCase("fr")) {
									netAsset = netAsset.replace(".", ",") + " $";
								} else {
									netAsset = "$" + netAsset;
								}
							}
							if (!minInvestment.trim().equals("")) {
								minInvestment = getFormatedCurrency(minInvestment, languageWS);
								if (languageWS.equalsIgnoreCase("fr")) {
									minInvestment = minInvestment.trim().substring(0, minInvestment.lastIndexOf(',')) + " $";
								} else {
									minInvestment = minInvestment.trim().substring(0, minInvestment.lastIndexOf('.'));
								}
							}

							if (!numberUnits.trim().equals("") && languageWS.equalsIgnoreCase("fr")) {
								numberUnits = numberUnits.replace(".", ",");
							}
							// boolean guarantyColDisplay = (seriesName == null ||
							// before adding to bean - need to format for lang
							Guarantee objGuarantee = new Guarantee(seriesName, minInvestment,
									getFormatedCurrency(mer, languageWS).replaceAll("\\$", ""), netAsset, numberUnits);
							garList.add(objGuarantee);
						}
						objFundFactsData.setGuarantees(garList);
					} else {
						LOG.trace("guarantees list is null or size=0");
					}

					// Holding List
					JSONArray arrHoldings = getJsonArray("holdings", jsonObject);
					if (null != arrHoldings && arrHoldings.length() > 0) {
						objFundFactsData.setTop10HoldingsAvailable(true);

						LOG.trace("arrHoldings.length()>>{} ", arrHoldings.length());
						List<Holding> holdingList = new ArrayList<>();
						for (int i = 0; i < arrHoldings.length(); i++) {
							JSONObject objHoldings = arrHoldings.getJSONObject(i);
							String holdingName = objHoldings.get("holdingName") != null ? objHoldings.get("holdingName").toString()
									: "";
							String holdingPercentage = objHoldings.get("investmentPercentage") != null
									? objHoldings.get("investmentPercentage").toString()
									: "";
							List<String> subHoldingNames = null;
							JSONArray arrSubHoldings = getJsonArray("subHoldingNames", objHoldings);
							if (arrSubHoldings != null) {
								// initialize array list.
								subHoldingNames = new ArrayList<>();
								for (int j = 0; j < arrSubHoldings.length(); j++) {
									String strSubholding = (String) arrSubHoldings.get(j);
									if (strSubholding != null && !strSubholding.trim().equals("")) {
										subHoldingNames.add(strSubholding);
									}
								}
								LOG.trace("Subholding list size ={} ", subHoldingNames.size());

							} else {
								LOG.trace("arrSubHoldings is null -----------");
							}
							Holding objHolding = new Holding(holdingName, holdingPercentage, subHoldingNames);
							holdingList.add(objHolding);
						}
						objFundFactsData.setHoldings(holdingList);
					}

					// Reason to invest
					JSONArray arrReasonsToInvest = jsonObject.getJSONArray("reasonsToInvest");
					if (null != arrReasonsToInvest && arrReasonsToInvest.length() > 0) {
						LOG.trace("arrReasonsToInvest.length()>>{} ", arrReasonsToInvest.length());
						List<String> reasonList = new ArrayList<>();
						for (int i = 0; i < arrReasonsToInvest.length(); i++) {
							String reason = arrReasonsToInvest.get(i) != null ? arrReasonsToInvest.get(i).toString().trim() : "";
							reasonList.add(reason);
						}
						objFundFactsData.setReasonsToInvest(reasonList);
					}
					// Reason to invest
					JSONArray arrllscList = jsonObject.getJSONArray("llscList");
					if (null != arrllscList && arrllscList.length() > 0) {
						LOG.trace("arrllscList.length()>>{} ", arrllscList.length());
						List<String> llscList = new ArrayList<>();
						for (int i = 0; i < arrllscList.length(); i++) {
							String value = arrllscList.get(i) != null ? arrllscList.get(i).toString() : "";
							llscList.add(value);
						}
						objFundFactsData.setLlscList(llscList);
					}

					// DCS List
					JSONArray arrDCSList = jsonObject.getJSONArray("dscList");
					if (null != arrDCSList && arrDCSList.length() > 0) {
						LOG.trace("arrDCSList.length()>>{} ", arrDCSList.length());
						List<String> dcsList = new ArrayList<>();
						for (int i = 0; i < arrDCSList.length(); i++) {
							String value = arrDCSList.get(i) != null ? arrDCSList.get(i).toString() : "";
							dcsList.add(value);
						}
						objFundFactsData.setDscList(dcsList);
						LOG.trace("dcsList size={} ", objFundFactsData.getDscList().size());
					}
				} else {
					objFundFactsData.returnCode = returnCode;
				}
			} else {
				LOG.trace("No json for node={} ", strfundFactsResponse);
			}
		} catch (JSONException e) {
			LOG.error("Error :: populateJsonValue :: {}", e);
		}
		return objFundFactsData;
	}

	/**
	 * Number formatting.
	 * 
	 * @param lang
	 * @param map
	 * @return
	 */
	public static Map<String, String> numberFormat(String lang, Map<String, String> map) {
		String strTotalAmount = getFormatedCurrency(map.get(keytotalvalueamount), lang);
		String strReturnAmount = getFormatedCurrency(map.get(keyreturnamount), lang);
		switch (lang) {
		case "EN":
		case "en":
			// in case of EN - format currency
			if (null != strTotalAmount) {
				strTotalAmount = strTotalAmount.trim().substring(0, strTotalAmount.indexOf('.'));
			}
			break;
		case "FR":
		case "fr":
			// in case of French format currency
			if (null != strTotalAmount) {
				strTotalAmount = strTotalAmount.trim().substring(0, strTotalAmount.indexOf(','));
			}
			break;
		default:
			break;
		}
		map.put(keytotalvalueamount, strTotalAmount);
		map.put(keyreturnamount, strReturnAmount);
		return map;
	}

	/**
	 * Formating amounts.
	 * 
	 * @param incomingRawCur
	 * @param language
	 * @return
	 */
	public static String getFormatedCurrency(String incomingRawCur, String language) {
		NumberFormat fmt = null;
		switch (language) {
		case "EN":
		case "en":
			fmt = NumberFormat.getCurrencyInstance(Locale.CANADA);
			break;
		case "FR":
		case "fr":
			fmt = NumberFormat.getCurrencyInstance(Locale.CANADA_FRENCH);
			break;
		default:
			fmt = NumberFormat.getCurrencyInstance(Locale.CANADA);
			break;
		}
		try {
			Double doubleamount = Double.parseDouble(incomingRawCur);
			return fmt.format(doubleamount);
		} catch (Exception e) {
			LOG.error("ERROR WHILE Formatting currency ={} ", e);
			return incomingRawCur;
		}
	}

	/**
	 * Format decimals.
	 * 
	 * @param number
	 * @param places
	 * @return
	 */
	public static String getFormatDecimal(String number, int places) {
		String tempResult = "";
		if (number == null || number.trim().equals("")) {
			return "";
		}
		try {
			StringBuilder sb = new StringBuilder();
			double temp = Double.parseDouble(number);
			sb.append(".");
			for (int i = 0; i < places; i++) {
				sb.append("#");
			}
			DecimalFormat decimalFormat = new DecimalFormat(sb.toString());
			tempResult = decimalFormat.format(temp);
			return tempResult;
		} catch (Exception e) {
			LOG.error("Error :: getFormatDecimal :: {}", e);
			return number;
		}
	}

	/**
	 * Formats date.
	 * 
	 * @param incomingRawDate
	 * @param language
	 * @return
	 */
	public static String getFormatedDate(String incomingRawDate, String language) {
		LOG.trace("Entering in function getFormatedDate with lang={} ", language);
		// considering both EN and FR incoming date are in same format
		SimpleDateFormat incomingDateFormat = new SimpleDateFormat(incomingDateFormatEN);
		SimpleDateFormat outgoingDateFormat = null;
		switch (language) {
		case "EN":
		case "en":
			outgoingDateFormat = new SimpleDateFormat(outcomingDateFormatEN, Locale.CANADA);
			break;

		case "FR":
		case "fr":
			outgoingDateFormat = new SimpleDateFormat(outcomingDateFormatFR, Locale.FRANCE);
			break;

		default:
			break;
		}

		Date date;
		try {
			date = incomingDateFormat.parse(incomingRawDate);
			return null != outgoingDateFormat ? outgoingDateFormat.format(date) : null;
		} catch (ParseException e) {
			LOG.error("Error :: getFormatedDate :: {}", e);
		}
		LOG.trace("Exiting from function getFormatedDate with lang={} ", language);
		return incomingRawDate;
	}

	/**
	 * All strings to date formating.
	 * 
	 * @param lang
	 * @param map
	 * @return
	 */
	public static Map<String, String> stringToDate(String lang, Map<String, String> map) {
		LOG.trace("Entering in stringToDate >>{} , map={}", lang, map);
		map.put(keydatefund, getFormatedDate(map.get(keydatefund), lang));
		map.put(keydateseries, getFormatedDate(map.get(keydateseries), lang));
		map.put(keyplandate, getFormatedDate(map.get(keyplandate), lang));
		map.put(keytotalvalueon, getFormatedDate(map.get(keytotalvalueon), lang));
		LOG.trace("Existing from StringToDate >>{} , updated map={} ", lang, map);
		return map;
	}

	/**
	 * Creates data table.
	 * 
	 * @param performanceDataList
	 * @param singleValueMap
	 * @return
	 */
	public String createDataTable(List<PerformanceData> performanceDataList, Map<String, String> singleValueMap) {
		LOG.debug("Entering in createDataTable.");
		String result = "";
		try {
			// year to switch fund name
			String dateFund = singleValueMap.get(keydatefund);
			int fundYear = Integer.parseInt(dateFund.substring(dateFund.lastIndexOf(',') + 2));
			for (PerformanceData perfData : performanceDataList) {
				result = result.concat("<tr>");
				result = result.concat("<td>" + perfData.getReturnYear() + "</td>");
				if (Integer.parseInt(perfData.getReturnYear()) <= fundYear) {
					result = result.concat("<td>" + singleValueMap.get("UnderlyingFund") + "</td>");
				} else {
					result = result.concat("<td>" + singleValueMap.get("FundName") + "</td>");
				}
				result = result.concat("<td>" + perfData.getPercentage() + "</td>");
				result = result.concat("</tr>");
			}
		} catch (Exception ex) {
			LOG.error("Error :: createDataTable :: {}", ex);
		}
		LOG.debug("Result is {}", result);
		LOG.debug("Exiting in createDataTable.");
		return result;
	}
}
