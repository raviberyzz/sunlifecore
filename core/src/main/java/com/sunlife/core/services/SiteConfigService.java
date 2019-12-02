package com.sunlife.core.services;

import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.LoginException;

public interface SiteConfigService {

	public String getConfigValues(String name, String resourcePath) throws LoginException, RepositoryException;
	
	public void setConfiguration() throws LoginException, RepositoryException;
}
