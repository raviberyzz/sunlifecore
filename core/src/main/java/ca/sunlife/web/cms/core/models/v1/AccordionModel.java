package ca.sunlife.web.cms.core.models.v1;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.wcm.core.components.internal.models.v1.PanelContainerItemImpl;
import com.adobe.cq.wcm.core.components.internal.models.v1.PanelContainerListItemImpl;
import com.adobe.cq.wcm.core.components.models.Accordion;
import com.adobe.cq.wcm.core.components.models.Component;
import com.adobe.cq.wcm.core.components.models.ListItem;
import com.adobe.cq.wcm.core.components.models.PanelContainer;
import com.adobe.cq.wcm.core.components.models.PanelContainerItem;
import com.adobe.cq.wcm.core.components.util.ComponentUtils;
import com.day.cq.wcm.api.Page;
import com.adobe.cq.wcm.core.components.commons.link.LinkManager;

import lombok.Getter;
 
@Getter
@ Model (adaptables = { SlingHttpServletRequest.class,
    Resource.class }, adapters = Accordion.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = AccordionModel.RESOURCE_TYPE)
public class AccordionModel implements Accordion {
	
	protected static final String RESOURCE_TYPE = "sunlife/core/components/content/core-accordion/v1/accordion";	
	
	@ScriptVariable
	private ResourceResolver resolver;
	
	@ScriptVariable
	private Page currentPage;
	
	@Self
	private SlingHttpServletRequest request;

	@Self
    private LinkManager linkManager;
	
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
	
	private List<ListItem> items; 
	
	private List<PanelContainerItemImpl> panelItems;	
	
	
	@PostConstruct
	public void init() {	
		items = readItems();		
	}		
	
	@Override 
	public final List<PanelContainerItemImpl> getChildren() {		
        if (this.panelItems == null) {   
            this.panelItems = ComponentUtils.getChildComponents(request.getResource(), this.request).stream()
            		.map(item -> new PanelContainerItemImpl(item, (Component)this))
            		.collect(Collectors.collectingAndThen(Collectors.toList(), Collections::unmodifiableList));
        }	        
        return this.panelItems;
	}
	
	
	protected final List<ListItem> readItems() {	
        return getChildren().stream()
            .map(res -> new PanelContainerListItemImpl(this.linkManager, res.getResource(), getId(), null, currentPage))
            .collect(Collectors.toList());
	}
	
	
}