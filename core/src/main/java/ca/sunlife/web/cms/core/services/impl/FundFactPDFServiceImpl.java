package ca.sunlife.web.cms.core.services.impl;

import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.mustachejava.DefaultMustacheFactory;
import com.github.mustachejava.Mustache;
import com.github.mustachejava.MustacheFactory;

import ca.sunlife.web.cms.core.beans.FundFactsResponse;
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

	/**
	 * Activate.
	 *
	 * @param factPDFConfig
	 *          the provider profile config
	 */
	@ Activate
	public void activate(FundFactPDFConfig factPDFConfig) {
		this.factPDFConfig = factPDFConfig;
		LOG.debug("FundFactPDFServiceImpl :: activate :: getfundFactsUrl :: {} ", this.factPDFConfig.getfundFactsUrl());
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
		String reqParams = request.getParameter("fparams");
		LOG.debug("FundFactPDFServiceImpl :: reqParams :: {}", reqParams);
		if (null != reqParams && reqParams.length() > 0) {
			//Reads query params and process them
			String[] paramArray = reqParams.split("\\|");
			Map<String, String> paramMap = new HashMap<>();
			for (String param : paramArray) {
				String[] valueArr = param.split("~");
				paramMap.put(valueArr[0], valueArr[1]);
			}
			LOG.debug("FundFactPDFServiceImpl :: paramMap :: {}", paramMap);
			//Building web service url with necessary params
			final StringBuilder importUrl = new StringBuilder();
			importUrl.append(factPDFConfig.getfundFactsUrl());
			importUrl.append("?fundCode=").append(paramMap.get("mp"));
			importUrl.append("&lang=").append(paramMap.get("lang").toUpperCase(Locale.ROOT));
			//web service call
			String response = restService.callGetWebService(importUrl.toString(), null);
			//Process response
			final StringBuilder sb = new StringBuilder();
			if (null != response && response.length() > 0) {
				LOG.debug("FundFactPDFServiceImpl :: processing response :: {}", response.length());
				ObjectMapper om = new ObjectMapper();
				JsonNode jn = om.readTree(response);
				try {
					FundFactsResponse factsResponse = om.readValue(jn.get("fundFactsResponse").toString(),
							FundFactsResponse.class);
					final Resource pageResource = coreResourceResolver.getResourceResolver()
							.getResource(request.getResource().getPath().concat("/root"));
					if (null != pageResource) {
						pageResource.getChildren().forEach(child -> {
							final MustacheFactory mf = new DefaultMustacheFactory();
							final StringWriter writer = new StringWriter();
							ValueMap valueMap = child.getValueMap();
							//Reads mustache template from HTML component
							final String mustachTemplate = (String) valueMap.getOrDefault("text", StringUtils.EMPTY);
							LOG.debug("FundFactPDFServiceImpl :: mustachTemplate :: {}", mustachTemplate);
							final Mustache mustache = mf.compile(new StringReader(mustachTemplate), " ");
							mustache.execute(writer, factsResponse.getFundFactsData());
							//Appends the compiled template to sb
							sb.append(writer.toString());
						});
					}
				} catch (JsonParseException | JsonMappingException e) {
					LOG.error("Error :: {}", e);
				}
				compiledData = sb.toString();
				LOG.debug("FundFactPDFServiceImpl :: processing of response completed :: {}", compiledData);
			}
		}
		LOG.debug("Exit :: FundFactPDFServiceImpl :: getCompiledData ::");
		return compiledData;
	}

}
