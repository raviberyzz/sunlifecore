package ca.sunlife.web.cms.advisorhub.models;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Collections;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.TimeZone;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.RepositoryException;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.adobe.cq.dam.cfm.converter.ContentTypeConverter;
import com.adobe.cq.wcm.core.components.internal.models.v1.contentfragment.DAMContentFragmentImpl;
import com.adobe.cq.wcm.core.components.models.contentfragment.DAMContentFragment;
import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * The Class OutageModel
 * 
 * @author TCS
 * @version 1.0
 *
 */
@ Model (adaptables = { SlingHttpServletRequest.class,
	    Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, adapters = OutageModel.class, resourceType = "sunlife/advisorhub/components/content/outage")

public class OutageModel {
	
	
	
	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(OutageModel.class);
	
	/** The fragment path. */
	@ Inject
	@ Via ("resource")
	private String fragmentPath;
	
	/** The config service. */
	@ Inject
	private SiteConfigService configService;
	
	/** The current page. */
	@ ScriptVariable
	private Page currentPage;
	
	/** The core resource resolver. */
	@ Inject
	private CoreResourceResolver coreResourceResolver;
	
	/** The date format. */
	private String dateFormat;

	  /** The page locale. */
	private String pageLocale;
	
	 public String getDateFormat() {
		return dateFormat;
	}

	public void setDateFormat(String dateFormat) {
		this.dateFormat = dateFormat;
	}

	public String getPageLocale() {
		return pageLocale;
	}

	public void setPageLocale(String pageLocale) {
		this.pageLocale = pageLocale;
	}

	/** The items. */
	private final List <DAMContentFragment> items = new ArrayList <>();
	
	/** The content type converter. */
	 @ Inject
	 private ContentTypeConverter contentTypeConverter;
	  
	  private static final String [ ] ELEMENT_NAMES = { "outageDate", "outageTitle", "outagePageLink", "outageDescription", "outageIcon","outageIconColor", "outageStatus","outageTeaser" };
	
	/** The resolver. */
	@ ScriptVariable
	private ResourceResolver resolver;
	
	/**
	   * Gets the fragment path.
	   *
	   * @return the fragment path
	   */
	public String getFragmentPath() {
	    return fragmentPath;
	}
	
	/**
	   * Sets the fragment path.
	   *
	   * @param fragmentPath
	   *          the new fragment path
	 */
	 public void setFragmentPath(final String fragmentPath) {
	    this.fragmentPath = fragmentPath;
	 }
	 
	 public Collection <DAMContentFragment> getListItems() {
		    return Collections.unmodifiableCollection(items);
		  }
	 
	 /**
	   * Inits
	   */
	  @ PostConstruct
	  public void init() {	
		  String pageLocaleDefault = StringUtils.EMPTY;
		 if (StringUtils.isEmpty(getFragmentPath())) {
		   return;
		 }
		 try {
			 
			 setDateFormat(configService.getConfigValues("outageDateFormat", currentPage.getPath()));
			 final String locale = configService.getConfigValues("pageLocale", currentPage.getPath());
		      if (null != locale && locale.length() > 0) { 
		    	  pageLocaleDefault = locale.contains("-") ? locale.split("-")[ 0 ] : locale.split("_")[0];
		        }

		      setPageLocale(pageLocaleDefault);
			 final ResourceResolver resourceResolver = coreResourceResolver.getResourceResolver();
			 final Resource outageResource = resourceResolver
			          .getResource(getFragmentPath());
			
			 if(null != outageResource) {
			 
			  final DAMContentFragment contentFragmentModel = new DAMContentFragmentImpl(outageResource,
		              contentTypeConverter, null, ELEMENT_NAMES);
			  
			  items.add(contentFragmentModel);
			 }

		 }catch (LoginException  | RepositoryException e) {
		      LOGGER.error("Login Error while getting resource resolver : {}", e);
		  }
		  
	  }



}
