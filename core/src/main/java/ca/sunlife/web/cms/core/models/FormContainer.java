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
	
	/** The container. */
	@Self
	@Via(type = ResourceSuperType.class)
    private Container container;	
	
	/** The form action. */
	@Inject
	@Via("resource")
	@Optional
	public String formAction;
	
	/** The validation. */
	@Inject
	@Via("resource")
	@Optional
	public String validation;
	
	/* (non-Javadoc)
	 * @see com.adobe.cq.wcm.core.components.models.form.Container#getMethod()
	 */
	@Override
	public String getMethod() {
		return container.getMethod();
    }
	
	/* (non-Javadoc)
	 * @see com.adobe.cq.wcm.core.components.models.form.Container#getName()
	 */
	@Override
	public String getName() {
		return container.getName();
    }
	
	/* (non-Javadoc)
	 * @see com.adobe.cq.wcm.core.components.models.form.Container#getAction()
	 */
	@Override
	public String getAction() {
        return container.getAction();
    }
	
	/* (non-Javadoc)
	 * @see com.adobe.cq.wcm.core.components.models.form.Container#getId()
	 */
	@Override
	public String getId() {
        return container.getId();
    }
	
	/* (non-Javadoc)
	 * @see com.adobe.cq.wcm.core.components.models.form.Container#getEnctype()
	 */
	@Override
	public String getEnctype() {
        return container.getEnctype();
    }
	
	/* (non-Javadoc)
	 * @see com.adobe.cq.wcm.core.components.models.form.Container#getResourceTypeForDropArea()
	 */
	@Override
	public String getResourceTypeForDropArea() {
        return container.getResourceTypeForDropArea();
    }
	
	/* (non-Javadoc)
	 * @see com.adobe.cq.wcm.core.components.models.form.Container#getRedirect()
	 */
	@Override
	public String getRedirect() {
        return container.getRedirect();
    }
	
	/* (non-Javadoc)
	 * @see com.adobe.cq.wcm.core.components.models.form.Container#getExportedItemsOrder()
	 */
	@Override
	public String[] getExportedItemsOrder() {
        return container.getExportedItemsOrder();
    }
	
	/* (non-Javadoc)
	 * @see com.adobe.cq.wcm.core.components.models.form.Container#getExportedItems()
	 */
	@Override
	public Map<String, ? extends ComponentExporter> getExportedItems() {
		return container.getExportedItems();
    }
	
	/* (non-Javadoc)
	 * @see com.adobe.cq.wcm.core.components.models.form.Container#getExportedType()
	 */
	@Override
	public String getExportedType() {
        return container.getExportedType();
    }

}