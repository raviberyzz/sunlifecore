package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.wcm.core.components.internal.models.v1.TabsImpl;

import com.adobe.cq.wcm.core.components.models.Tabs;

import lombok.Getter;

@Getter
@ Model (adaptables = { SlingHttpServletRequest.class,
    Resource.class }, adapters = Tabs.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = TabsModel.RESOURCE_TYPE)
public class TabsModel extends TabsImpl implements Tabs {

	protected static final String RESOURCE_TYPE = "sunlife/core/components/content/core-tabs/v1/tabs";	
	
	@ValueMapValue
	private String dataTitle;	 
	 
	@ValueMapValue
	private String spacing; 	
		
	@ValueMapValue
	private String enableScrolling;
	
	
	public TabsModel() {
	    super();
	}
	
}
