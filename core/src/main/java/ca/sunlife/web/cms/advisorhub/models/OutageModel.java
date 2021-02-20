package ca.sunlife.web.cms.advisorhub.models;

import java.text.SimpleDateFormat;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

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
	
	/** The Constant OUTAGE_DATE. */
	private static final String OUTAGE_DATE = "outageDate";
	
	/** The Constant OUTAGE_TITLE. */
	private static final String OUTAGE_TITLE = "outageTitle";
	
	/** The Constant OUTAGE_PAGE_LINK. */
	private static final String OUTAGE_PAGE_LINK = "outagePageLink";
	
	/** The Constant OUTAGE_DESCRIPTION. */
	private static final String OUTAGE_DESCRIPTION = "outageDescription";
	
	/** The Constant OUTAGE_ICON. */
	private static final String OUTAGE_ICON = "outageIcon";
	
	/** The Constant OUTAGE_ICON_COLOR. */
	private static final String OUTAGE_ICON_COLOR = "outageIconColor";
	
	/** The Constant OUTAGE_DATE. */
	private static final String OUTAGE_STATUS = "outageStatus";
	
	/** The Constant OUTAGE_DATE. */
	private static final String OUTAGE_TEASER = "outageTeaser";
	
	/** The Constant JCR_CONTENT_DATA_MASTER. */
	private static final String JCR_CONTENT_DATA_MASTER = "/jcr:content/data/master";
	
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
	
	/** The resolver. */
	@ ScriptVariable
	private ResourceResolver resolver;
	
	/** The outage data. */
	private final Map <String, String> outageData = new HashMap <>();

	
	public Map<String, String> getOutageData() {
		return outageData;
	}

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
	 
	 /**
	   * Inits
	   */
	  @ PostConstruct
	  public void init() {		  
		 if (StringUtils.isEmpty(getFragmentPath())) {
		   return;
		 }
		 try {
			 final ResourceResolver resourceResolver = coreResourceResolver.getResourceResolver();
			 LOGGER.debug("Reading content fragment {}", getFragmentPath() + JCR_CONTENT_DATA_MASTER);
			 final Resource outageResource = resourceResolver
			          .getResource(getFragmentPath().concat(JCR_CONTENT_DATA_MASTER));
			 if(null != outageResource) {
				final ValueMap outageContent = outageResource.getValueMap();
				outageData.put(OUTAGE_TITLE, outageContent.containsKey(OUTAGE_TITLE) ? outageContent.get(OUTAGE_TITLE , String.class) : StringUtils.EMPTY); 
				outageData.put(OUTAGE_PAGE_LINK, outageContent.containsKey(OUTAGE_PAGE_LINK) ? outageContent.get(OUTAGE_PAGE_LINK , String.class) : StringUtils.EMPTY);
				outageData.put(OUTAGE_DESCRIPTION, outageContent.containsKey(OUTAGE_DESCRIPTION) ? outageContent.get(OUTAGE_DESCRIPTION , String.class) : StringUtils.EMPTY);
				outageData.put(OUTAGE_ICON, outageContent.containsKey(OUTAGE_ICON) ? outageContent.get(OUTAGE_ICON , String.class) : StringUtils.EMPTY);
				outageData.put(OUTAGE_ICON_COLOR, outageContent.containsKey(OUTAGE_ICON_COLOR) ? outageContent.get(OUTAGE_ICON_COLOR , String.class) : StringUtils.EMPTY);
				outageData.put(OUTAGE_STATUS, outageContent.containsKey(OUTAGE_STATUS) ? outageContent.get(OUTAGE_STATUS , String.class) : StringUtils.EMPTY);
				outageData.put(OUTAGE_TEASER, outageContent.containsKey(OUTAGE_TEASER) ? outageContent.get(OUTAGE_TEASER , String.class) : StringUtils.EMPTY);
				setOutagePublishedDate(outageContent); 
			 } 
		 }catch (LoginException e) {
		      LOGGER.error("Login Error while getting resource resolver : {}", e);
		  }
		  
	  }

	private void setOutagePublishedDate(final ValueMap outageContent) {
		String outagePublishedDate = StringUtils.EMPTY;
		String pageLocaleDefault = StringUtils.EMPTY;
		
		   try {
			      final String locale = configService.getConfigValues("pageLocale", currentPage.getPath());
			      if (null != locale && locale.length() > 0) {    	
			    	  pageLocaleDefault = locale.contains("-") ? locale.split("-")[ 0 ] : locale.split("_")[0];
			       }
			      
			      LOGGER.debug("Locale is {}", pageLocaleDefault);
			      if (outageContent.containsKey(OUTAGE_DATE)) {
			        LOGGER.debug("formatting date to {}",
			            configService.getConfigValues("articleDateFormat", currentPage.getPath()));
			        LOGGER.debug("Before adding locale");
			        final SimpleDateFormat formatter = new SimpleDateFormat(
			            configService.getConfigValues("articleDateFormat", currentPage.getPath()),
			            new Locale(pageLocaleDefault));
			        LOGGER.debug("after adding locale");
			        outagePublishedDate = formatter.format(((GregorianCalendar) outageContent
			            .getOrDefault(OUTAGE_DATE, new GregorianCalendar())).getTime());
			        LOGGER.debug("After date formatting");
			      }
			      outageData.put(OUTAGE_DATE, outagePublishedDate);
			    } catch (RepositoryException | org.apache.sling.api.resource.LoginException e) {
			      LOGGER.error("Error ::OutageModel :: Outage date :: Exception :: {}", e);
			    }
		
		
	}
	  
	  
	
	

}
