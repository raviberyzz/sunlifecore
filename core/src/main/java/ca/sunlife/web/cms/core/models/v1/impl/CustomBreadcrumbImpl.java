package ca.sunlife.web.cms.core.models.v1.impl;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.util.AbstractComponentImpl;
import com.fasterxml.jackson.annotation.JsonIgnore;

import ca.sunlife.web.cms.core.models.v1.CustomBreadcrumb;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;
import com.adobe.cq.wcm.core.components.models.Breadcrumb;
import com.adobe.cq.export.json.ExporterConstants;

/**
 * The CustomBreadcrumbImpl is a sling model associated with Breadcrumb component.
 *
 * @author Sunlife
 */

@Getter
@Setter
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class }, adapters = {
		Breadcrumb.class, ComponentExporter.class,
		CustomBreadcrumb.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = CustomBreadcrumbImpl.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, selector = ExporterConstants.SLING_MODEL_SELECTOR, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class CustomBreadcrumbImpl extends AbstractComponentImpl implements CustomBreadcrumb {

	protected static final String RESOURCE_TYPE = "sunlife/core/components/content/core-breadcrumb/v1/breadcrumb";

	@Self
	@Via(type = ResourceSuperType.class)
	@Delegate
	@JsonIgnore
	private Breadcrumb delegate;

	
	@ValueMapValue
	private String startLevel;

	@ValueMapValue
	private String langcode;

	@ValueMapValue
	private String spacing;

	/**
	 * Gets the Accordion Start Level.
	 *
	 * @return the start level
	 */
	@Override
	public final String getStartLevel() {

		return startLevel;
	}

	/**
	 * Gets the Accordion Lang Code.
	 *
	 * @return the accordion lang code
	 */
	@Override
	public final String getLangcode() {
		return langcode;
	}

	/**
	 * Gets the Accordion Spacing.
	 *
	 * @return the accordion spacing
	 */
	@Override
	public final String getSpacing() {
		return spacing;
	}

}
