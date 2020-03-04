package ca.sunlife.web.cms.core.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.RepositoryException;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;
import ca.sunlife.web.cms.core.services.SiteConfigService;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ExperienceFragmentModel {
	
    /** The Constant LOGGER. */
	private static final Logger log = LoggerFactory.getLogger(ExperienceFragmentModel.class);
	
		
	/** The Fragment Path. */
	@Inject
	@Via("resource")
	private String fragmentPath;
	
	
	/** The config service. */
	@Inject
	private SiteConfigService configService;
	
	private String modifiedFragmentPath;	
	
	@ScriptVariable
    private Page currentPage;

	public String getFragmentPath() {
		return fragmentPath;
	}

	public void setFragmentPath(String fragmentPath) {
		this.fragmentPath = fragmentPath;
	}

	public String getModifiedFragmentPath() {
		return modifiedFragmentPath;
	}

	public void setModifiedFragmentPath(String modifiedFragmentPath) {
		this.modifiedFragmentPath = modifiedFragmentPath;
	}

	@PostConstruct
	public void init()  {	
		
		String headerPath = null;
		String fragmentSplit = null;		
		
		try {
		if( null == fragmentPath )
		{
			return;
		}
		else if(currentPage.getPath().contains("/content/experience-fragments")) {
			modifiedFragmentPath = fragmentPath;
		}
		else
		{			
			if(fragmentPath.contains("header")||fragmentPath.contains("footer")) {
			
				headerPath = configService.getConfigValues("experienceFragmentPath", currentPage.getPath());	
				log.info("Header path is : {}" , headerPath);
				if( null != headerPath && headerPath.length() > 0 ) {	
				String[] pathSplit = fragmentPath.split("/");
				for(int i=0; i<pathSplit.length;i++) {
        		if(pathSplit[i].contains("header") || pathSplit[i].contains("footer")) {
        			fragmentSplit = pathSplit[i];
        			fragmentSplit = "/" + fragmentSplit + "/";
        				break;
        				}
				}
				String[] finalSplit = fragmentPath.split(fragmentSplit);
				modifiedFragmentPath = headerPath + fragmentSplit + finalSplit[1];
				}
				else {
					modifiedFragmentPath=fragmentPath;
				}
			}
			
			else {
				modifiedFragmentPath=fragmentPath;		
			}
		}
		
		}
		 catch (Exception e) {
			 log.error("Error :: init method of Experience fragment model :: {}", e);
			}
	  }
	
	}
