package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;

/**
 * The Interface LayoutContainerModel.
 */
@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface LayoutContainerModal {
	
	 /**
	  * Gets the number of columns.
	  *
	  * @return the number of columns
	  */
	@Inject
	String getNoc();
	 
	/**
	 * Gets the container type.
	 *
	 * @return the type
	 */
    @Inject
    String getType();
    
    /**
	 * Gets the close text for accessibility.
	 *
	 * @return the close text
	 */
    @Inject @Optional
	String getCloseText();

	/**
	 * Gets the modal id.
	 *
	 * @return the modal id
	 */
    @Inject @Optional
    String getModalID();

	/**
	 * Gets the modal title.
	 *
	 * @return the modal title
	 */
    @Inject @Optional
    String getModalTitle();
    
    /**
	 * Gets the modal title level.
	 *
	 * @return the modal title level
	 */
    @Inject @Optional
	String getModalTitleLevel();
    
    @Inject @Optional
   	String getAnalyticsId();
}
