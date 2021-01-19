package ca.sunlife.web.cms.core.services.impl;

import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.github.mustachejava.DefaultMustacheFactory;
import com.github.mustachejava.Mustache;
import com.github.mustachejava.MustacheFactory;

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
	private final Logger LOG = LoggerFactory.getLogger(getClass());

	/** The fact PDF config. */
	private FundFactPDFConfig factPDFConfig;

	/** The rest service. */
	@ Reference
	private RestService restService;

	/** The core resource resolver. */
	@ Reference
	private transient CoreResourceResolver coreResourceResolver;
	
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

	@ Override
	public String getCompiledData(SlingHttpServletRequest request) throws ApplicationException, SystemException, IOException {
		LOG.debug("Entry :: FundFactPDFServiceImpl :: getCompiledData :: {}", request);
		String compiledData = null;
		String reqParams = request.getParameter("fparams");
		LOG.debug("FundFactPDFServiceImpl :: reqParams :: {}", reqParams);
		if (null != reqParams && reqParams.length() > 0) {
			String[] paramArray = reqParams.split("\\|");
			Map<String, String> paramMap = new HashMap<>();
			for (String param : paramArray) {
				String[] valueArr = param.split("~");
				paramMap.put(valueArr[0], valueArr[1]);
			}
			LOG.debug("FundFactPDFServiceImpl :: paramMap :: {}", paramMap);
			final StringBuilder importUrl = new StringBuilder();
			importUrl.append(factPDFConfig.getfundFactsUrl());
			importUrl.append("fundCode=").append(paramMap.get("mp"));
			importUrl.append("&lang").append(paramMap.get("lang").toUpperCase());
			
			String fundFactsResponse = restService.callGetWebService(importUrl.toString(), null);
			
			final String mustachTemplate = "";
			if (null != fundFactsResponse && fundFactsResponse.length() > 0) {
				final Resource pageResource = request.getResource();
				if( null != pageResource ) {
					pageResource.listChildren().forEachRemaining(action);;
					((Collection<Resource>)pageResource.getChildren()).size();
					for(Resource childResource : pageResource.getChildren()) {
						ValueMap valueMap = childResource.getValueMap();
					}
				}
				
	      final MustacheFactory mf = new DefaultMustacheFactory();
	      final StringWriter writer = new StringWriter();
	      final Mustache mustache = mf.compile(new StringReader(mustachTemplate), " ");
	      mustache.execute(writer, profileDataMap);
	      compiledData = writer.toString().replace("&amp;", "&");
	    }
		}
		return compiledData;
	}

}
