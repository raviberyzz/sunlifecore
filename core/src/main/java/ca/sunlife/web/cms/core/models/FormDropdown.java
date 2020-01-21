package ca.sunlife.web.cms.core.models;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;


@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface FormDropdown {
	@Inject
	@Named("jcr:title")
	public String getTitle();
	
	@Inject
	public String getName();
	
	@Inject
	public String getType();
	
	@Inject
	public String getHelpMessage();
	
	@Inject
	public List<ItemsGroup> getItemsGroup();
	
	@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
	public interface ItemsGroup {

		@Inject
		public String getGroupText();
		
		@Inject
		public List<Items> getItems();
		
	}
	@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
	public interface Items {

		@Inject
		public String getText();
		
		@Inject
		public String getValue();
		
		@Inject
		public boolean isSelected();
		
		@Inject
		public boolean isDisabled();
		
		@Inject
		public boolean getShortName();
		
	}
	
}
