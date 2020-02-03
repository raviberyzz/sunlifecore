package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.Via;
import com.adobe.cq.wcm.core.components.internal.models.v1.form.ButtonImpl;
import com.adobe.cq.wcm.core.components.models.form.Button;

/**
 * The class FormButtonModel.
 */
@Model(adaptables = SlingHttpServletRequest.class,adapters = Button.class,resourceType = "sunlife/core/components/form/button")
public class FormButtonModel extends ButtonImpl {
	
	/**
	 * Instantiates a new form button model.
	 */
	public FormButtonModel() {
		super();
	}
	/** The data title. */
	@Inject
	@Via("resource")
	@Optional
	private String dataTitle;
	
	/**
	 * Gets the modified title.
	 *
	 * @return the Title
	 */
	@Override
    public String getTitle() {
        return title;
    }
	
	/**
	 * Gets the data title.
	 *
	 * @return the dataTitle
	 */
	public String getDataTitle() {
		return dataTitle;
	}

	/**
	 * Sets the data title.
	 *
	 * @param dataTitle the dataTitle to set
	 */
	public void setDataTitle(String dataTitle) {
		this.dataTitle = dataTitle;
	}
}
	

	

