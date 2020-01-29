package ca.sunlife.web.cms.core.services.impl;

import java.io.IOException;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ca.sunlife.web.cms.core.osgi.config.CNWNewsConfig;
import ca.sunlife.web.cms.core.services.CNWNewsService;
import ca.sunlife.web.cms.core.services.RestService;

/**
 * The Class CNWNewsServiceImpl.
 */
@Component(service = CNWNewsService.class, immediate = true)
@Designate(ocd = CNWNewsConfig.class)
public class CNWNewsServiceImpl implements CNWNewsService {
	/** The log. */
	private final Logger log = LoggerFactory.getLogger(this.getClass());

	@Reference
	private RestService restService;

	/** CNW News Config. */
	private CNWNewsConfig cnwNewsConfig;

	@Activate
	public void activate(final CNWNewsConfig cnwNewsConfig) {
		this.cnwNewsConfig = cnwNewsConfig;
		log.debug("cnwNewsConfig {}", cnwNewsConfig.getCNWNewsList());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see ca.sunlife.web.cms.core.services.CNWNewsService#getCNWNewsListUrl()
	 */
	@Override
	public String getCNWNewsListUrl() {
		return cnwNewsConfig.getCNWNewsList();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see ca.sunlife.web.cms.core.services.CNWNewsService#getCNWNewsDetailsUrl()
	 */
	@Override
	public String getCNWNewsDetailsUrl() {
		return cnwNewsConfig.getCNWNewsDetails();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see ca.sunlife.web.cms.core.services.CNWNewsService#getCNWNewsOverview()
	 */
	@Override
	public String getCNWNewsOverview() throws IOException {
		return restService.callGetWebService(cnwNewsConfig.getCNWNewsOverview());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * ca.sunlife.web.cms.core.services.CNWNewsService#getCNWNews(java.lang.String)
	 * Gets the list of CNW news
	 */
	@Override
	public String getCNWNews(String url) throws IOException {
		return restService.callGetWebService(url);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * ca.sunlife.web.cms.core.services.CNWNewsService#getCNWNewsDetails(java.lang.
	 * String)
	 */
	@Override
	public String getCNWNewsDetails(String url) throws IOException {
		return restService.callGetWebService(url);
	}

}
