package ca.sunlife.web.cms.core.models;

import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Interface IconTextModel.
 */
@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface IconTextModel {
	
	 /**
	  * Gets the title.
	  *
	  * @return the title
	  */
	@Inject
	String getTitle();
	 
	/**
	 * Gets the titleLabel.
	 *
	 * @return the titleLabel
	 */
    @Inject
	String getTitleLevel();

	/**
	 * Gets the icons text.
	 *
	 * @return the icons text
	 */
	@Inject
	List<IconsText> getIconsText();

	/**
	 * The Interface IconsText.
	 */
	@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
	interface IconsText {

		/**
		 * Gets the icon.
		 *
		 * @return the icon
		 */
		@Inject
		String getIcon();

		/**
		 * Gets the text.
		 *
		 * @return the text
		 */
		@Inject
		String getText();

		/**
		 * Gets the link.
		 *
		 * @return the link
		 */
		@Inject
		String getLink();

		/**
		 * Gets the target.
		 *
		 * @return the target
		 */
		@Inject
		String getTarget();
		
		/**
		 * Gets the srText.
		 *
		 * @return the srText
		 */
		@Inject
		String getSrText();

	}
}
