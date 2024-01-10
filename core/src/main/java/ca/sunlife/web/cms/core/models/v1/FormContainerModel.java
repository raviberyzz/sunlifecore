package ca.sunlife.web.cms.core.models.v1;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.adobe.cq.wcm.core.components.internal.models.v1.form.ContainerImpl;
import com.adobe.cq.wcm.core.components.models.form.Container;

import lombok.Getter;

/**
 * The FormContainerModel is a sling model which is associated with form
 * container component.
 *
 * @author Sunlife
 */
@Getter
@Model(adaptables = {SlingHttpServletRequest.class, Resource.class }, adapters = Container.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = FormContainerModel.RESOURCE_TYPE)
public class FormContainerModel extends ContainerImpl implements Container {

	protected static final String RESOURCE_TYPE = "sunlife/core/components/form/core-container/v1/container";

	@ValueMapValue
	private String formAction;

	@ValueMapValue
	private String validation;

	@ValueMapValue
	private String dataSection;

	@ValueMapValue
	private String formTarget;

	@ValueMapValue
	private String actionType;

	@ValueMapValue
	private String spacing;

	public FormContainerModel() {
		super();
	}
}
