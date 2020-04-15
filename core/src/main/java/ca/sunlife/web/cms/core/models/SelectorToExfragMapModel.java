package ca.sunlife.web.cms.core.models;

import java.util.Iterator;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Model(adaptables = { SlingHttpServletRequest.class, Resource.class},defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SelectorToExfragMapModel {

	@ Inject
	@ Via ("resource")
	  private List <SelectorExFragMap> items;
	
	@Self(injectionStrategy = InjectionStrategy.REQUIRED)
	private SlingHttpServletRequest request;
	
	private String fragPath;

	private static final Logger LOGGER = LoggerFactory.getLogger(SelectorToExfragMapModel.class);
	
	public List<SelectorExFragMap> getItems() {
		return items;
	}

	public void setItems(List<SelectorExFragMap> items) {
		this.items = items;
	}
	
	public String getFragPath() {
		return fragPath;
	}

	public void setFragPath(String fragPath) {
		this.fragPath = fragPath;
	}

	@ PostConstruct
	  public void init() {
		
		final String[] selectors = request.getRequestPathInfo().getSelectors();
		if(selectors.length>0) {
			LOGGER.debug("Selector is {}",selectors[0]);
		}
		LOGGER.debug("No of entries {}", getItems().size());
		
		if(getItems().size()>0 && selectors.length>0) {
			Iterator<SelectorExFragMap> itemIterator = items.iterator();
			while(itemIterator.hasNext()) {
				SelectorExFragMap item = itemIterator.next();
				if(item.getSelector().equals(selectors[0])) {
					fragPath=item.getExfragPath();
				}
			}
			
		}
		
	}
}

