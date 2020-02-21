package ca.sunlife.web.cms.core.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import com.day.cq.wcm.api.Page;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ExperienceFragmentModel {
	
		
	/** The Fragment Path. */
	@Inject
	@Via("resource")
	private String fragmentPath;
	
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
		
		String pageLocale = currentPage.getLanguage().getLanguage(); 
		String currentLocale = currentPage.getLanguage().toString(); 
		
		if( null == fragmentPath )
		{
			return;
		}
		else if(currentPage.getPath().contains("/content/experience-fragments")) {
			modifiedFragmentPath = fragmentPath;
		}
		else
		{
		String country = currentLocale.split("_")[1];
		country = StringUtils.lowerCase(country);
	
		if(fragmentPath.contains(country)&&(fragmentPath.contains("header")||fragmentPath.contains("footer"))) {
			String localeToBReplaced=fragmentPath.substring(fragmentPath.indexOf(country)).split("/")[1];
			modifiedFragmentPath=fragmentPath.replace("/"+localeToBReplaced+"/", "/"+pageLocale+"/");
		}else {
			modifiedFragmentPath=fragmentPath;
		}
		}
	  }
	}
