package ca.sunlife.web.cms.core.models;

import java.util.Map;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.wcm.core.components.models.form.Container;

/**
 * The Interface FormContainer.
 */
@Model(adaptables = SlingHttpServletRequest.class,adapters = Container.class,resourceType = "sunlife/core/components/form/container")
public class FormContainer implements Container {
	@Self
	@Via(type = ResourceSuperType.class)
    private Container container;	
	
	@Inject
	@Via("resource")
	@Optional
	public String formAction;
	
	@Inject
	@Via("resource")
	@Optional
	public String validation;
	
	@Override
	public String getMethod() {
		return container.getMethod();
    }
	
	@Override
	public String getName() {
		return container.getName();
    }
	@Override
	public String getAction() {
        return container.getAction();
    }
	@Override
	public String getId() {
        return container.getId();
    }
	@Override
	public String getEnctype() {
        return container.getEnctype();
    }
	@Override
	public String getResourceTypeForDropArea() {
        return container.getResourceTypeForDropArea();
    }
	@Override
	public String getRedirect() {
        return container.getRedirect();
    }
	@Override
	public String[] getExportedItemsOrder() {
        return container.getExportedItemsOrder();
    }
	@Override
	public Map<String, ? extends ComponentExporter> getExportedItems() {
		return container.getExportedItems();
    }
	@Override
	public String getExportedType() {
        return container.getExportedType();
    }

}