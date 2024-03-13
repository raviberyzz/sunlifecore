package ca.sunlife.web.cms.core.models.v1.impl;

import java.util.Arrays;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.util.AbstractComponentImpl;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.adobe.cq.wcm.core.components.models.Accordion;

import ca.sunlife.web.cms.core.models.v1.CustomAccordion;
import lombok.Getter;
import lombok.experimental.Delegate;

@Getter
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class }, adapters = { Accordion.class,
		ComponentExporter.class,
		CustomAccordion.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = CustomAccordionImpl.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, selector = ExporterConstants.SLING_MODEL_SELECTOR, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class CustomAccordionImpl extends AbstractComponentImpl implements CustomAccordion {

	protected static final String RESOURCE_TYPE = "sunlife/core/components/content/core-accordion/v1/accordion";

	@Self
	@Via(type = ResourceSuperType.class)
	@Delegate
	@JsonIgnore
	private Accordion delegate;

	@ScriptVariable
	private ResourceResolver resolver;

	@ValueMapValue
	private String headingElement;

	@ValueMapValue
	private String accessibilityLabel;

	@ValueMapValue
	private String dataTitle;

	@ValueMapValue
	private String spacing;

	@ValueMapValue
	private String singleExpansion;

	@ValueMapValue
	private String[] expandedItems;

	@Override
	public ResourceResolver getResolver() {
		return resolver;
	}

	@Override
	public String getHeadingElement() {
		return headingElement;
	}

	@Override
	public String getAccessibilityLabel() {
		return accessibilityLabel;
	}

	@Override
	public String getDataTitle() {
		return dataTitle;
	}

	@Override
	public String getSpacing() {
		return spacing;
	}

	@Override
	public String getSingleExpansion() {
		return singleExpansion;
	}

	@Override
	public String[] getExpandedItems() {
		return Arrays.copyOf(expandedItems, expandedItems.length);
	}

}