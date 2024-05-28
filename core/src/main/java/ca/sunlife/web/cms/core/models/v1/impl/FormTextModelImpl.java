package ca.sunlife.web.cms.core.models.v1.impl;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.*;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.form.Text;
import com.adobe.cq.wcm.core.components.util.AbstractComponentImpl;
import com.fasterxml.jackson.annotation.JsonIgnore;

import ca.sunlife.web.cms.core.models.v1.FormTextModel;
import lombok.Getter;
import lombok.experimental.Delegate;


@Getter
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class }, adapters = { Text.class, ComponentExporter.class,
        FormTextModel.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = FormTextModelImpl.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, selector = ExporterConstants.SLING_MODEL_SELECTOR, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class FormTextModelImpl extends AbstractComponentImpl implements FormTextModel {

    protected static final String RESOURCE_TYPE = "sunlife/core/components/form/core-text/v1/text";

    @Self
    @Via(type = ResourceSuperType.class)
    @Delegate
    @JsonIgnore
    private Text delegate;

    @ValueMapValue
    String validation;

    @ValueMapValue
    String validationError;

    @ValueMapValue
    String icon;

    @ValueMapValue
    String spacing;

    @ValueMapValue
    @Default(booleanValues = {false})
    boolean iconPosition;

    @Override
    public String getValidation() {
        return validation;
    }

    @Override
    public String getValidationError() {
        return validationError;
    }

    @Override
    public String getIcon() {
        return icon;
    }

    @Override
    public String getSpacing() {
        return spacing;
    }

    @Override
    public boolean isIconPosition() {
        return iconPosition;
    }

}