package ca.sunlife.web.cms.core.models;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;



/**
 * The Interface FormDropdown.
 */
@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface FormDropdown {
	
	/**
	 * Gets the title.
	 *
	 * @return the title
	 */
	@Inject
	@Named("jcr:title")
	public String getTitle();
	
	/**
	 * Gets the name.
	 *
	 * @return the name
	 */
	@Inject
	public String getName();
	
	/**
	 * Gets the type.
	 *
	 * @return the type
	 */
	@Inject
	public String getType();
	
	/**
	 * Gets the help message.
	 *
	 * @return the help message
	 */
	@Inject
	public String getHelpMessage();
	
	/**
	 * Gets the aria label.
	 *
	 * @return the aria label
	 */
	@Inject
	public String getAriaLabel();
	
	/**
	 * Gets the items group.
	 *
	 * @return the items group
	 */
	@Inject
	public List<ItemsGroup> getItemsGroup();
	
	/**
	 * Gets the is custom action formation required flag.
	 *
	 * @return the is custom action formation required flag
	 */
	@Inject
	public String getCustomActionGenerationRequired();
	
	/**
	 * The Interface ItemsGroup.
	 */
	@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
	public interface ItemsGroup {

		/**
		 * Gets the group text.
		 *
		 * @return the group text
		 */
		@Inject
		public String getGroupText();
		
		/**
		 * Gets the items.
		 *
		 * @return the items
		 */
		@Inject
		public List<Items> getItems();
		
	}
	
	/**
	 * The Interface Items.
	 */
	@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
	public interface Items {

		/**
		 * Gets the text.
		 *
		 * @return the text
		 */
		@Inject
		public String getText();
		
		/**
		 * Gets the value.
		 *
		 * @return the value
		 */
		@Inject
		public String getValue();
		
		/**
		 * Checks if is selected.
		 *
		 * @return true, if is selected
		 */
		@Inject
		public boolean isSelected();
		
		/**
		 * Checks if is disabled.
		 *
		 * @return true, if is disabled
		 */
		@Inject
		public boolean isDisabled();
		
		/**
		 * Gets the short name.
		 *
		 * @return the short name
		 */
		@Inject
		public String getShortName();
		
	}
	
}
