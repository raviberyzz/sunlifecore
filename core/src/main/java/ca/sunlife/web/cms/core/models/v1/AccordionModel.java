package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.wcm.core.components.models.Accordion;
import com.adobe.cq.wcm.core.components.internal.models.v1.AccordionImpl;

import lombok.Getter;
 
@Getter
@ Model (adaptables = { SlingHttpServletRequest.class,
    Resource.class }, adapters = Accordion.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = AccordionModel.RESOURCE_TYPE)
public class AccordionModel extends AccordionImpl implements Accordion {
	
	protected static final String RESOURCE_TYPE = "sunlife/core/components/content/core-accordion/v1/accordion";	
	
	@ScriptVariable
	private ResourceResolver resolver;
		
	@ValueMapValue 
	private String headingElement; 	 
	 
	@ValueMapValue
	private String accessibilityLabel;	 
	 
	@ValueMapValue
	private String dataTitle;	 
	 
	@ValueMapValue
	private String spacing; 
	 
	@ValueMapValue
	private String singleExpansion;	 
	 
	@ValueMapValue
	private String[] expandedItems;	 		
	
	public AccordionModel() {
	    super();
	}
	

}