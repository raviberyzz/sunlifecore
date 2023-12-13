package ca.sunlife.web.cms.core.models.v1.impl;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Embed;
import com.adobe.cq.wcm.core.components.services.embed.UrlProcessor;
import com.day.cq.wcm.api.designer.Style;
import com.drew.lang.annotations.NotNull;
import com.drew.lang.annotations.Nullable;

@Model(
    adaptables = SlingHttpServletRequest.class,
    adapters = { Embed.class, ComponentExporter.class },
    resourceType = {EmbedImpl.RESOURCE_TYPE}
)

public class EmbedImpl implements Embed {

    protected static final String RESOURCE_TYPE = "sunlife/core/components/content/core-embed/v1/embed";

    @ValueMapValue(name = PN_TYPE, injectionStrategy = InjectionStrategy.OPTIONAL)
    @Nullable
    private String type;

    @ValueMapValue(name = PN_URL, injectionStrategy = InjectionStrategy.OPTIONAL)
    @Nullable
    private String url;

    @ValueMapValue(name = PN_HTML, injectionStrategy = InjectionStrategy.OPTIONAL)
    @Nullable
    private String html;

    @ValueMapValue(name = PN_EMBEDDABLE_RESOURCE_TYPE, injectionStrategy = InjectionStrategy.OPTIONAL)
    @Nullable
    private String embeddableResourceType;

    @ScriptVariable(injectionStrategy = InjectionStrategy.OPTIONAL)
    @Nullable
    private Style currentStyle;

    @Inject @Optional
    private List<UrlProcessor> urlProcessors;

    @Inject
    private Resource resource;

    private Type embedType;
    private UrlProcessor.Result result;

    @PostConstruct
    private void initModel() {
        embedType = Type.fromString(type);
        if (embedType == null || embedType != Type.URL) {
            url = null;
        }
        if (embedType == null || embedType != Type.HTML) {
            html = null;
        }
        if (embedType == null || embedType != Type.EMBEDDABLE) {
            embeddableResourceType = null;
        }
        if (currentStyle != null) {
            boolean urlDisabled = currentStyle.get(PN_DESIGN_URL_DISABLED, false);
            boolean htmlDisabled = currentStyle.get(PN_DESIGN_HTML_DISABLED, false);
            boolean embeddablesDisabled = currentStyle.get(PN_DESIGN_EMBEDDABLES_DISABLED, false);
            if (urlDisabled) {
                url = null;
            }
            if (htmlDisabled) {
                html = null;
            }
            if (embeddablesDisabled) {
                embeddableResourceType = null;
            }
        }
        if (StringUtils.isNotEmpty(url)) {
            url = StringUtils.trim(url);
            if (urlProcessors != null) {
                for (UrlProcessor urlProcessor : urlProcessors) {
                    UrlProcessor.Result result = urlProcessor.process(url);
                    if (result != null) {
                        this.result = result;
                        break;
                    }
                }
            }
        }
    }

    @Nullable
    @Override
    public Type getType() {
        return embedType;
    }

    @Nullable
    @Override
    public String getUrl() {
        return url;
    }

    @Nullable
    @Override
    public UrlProcessor.Result getResult() {
        return result;
    }

    @Nullable
    @Override
    public String getHtml() {
        return html;
    }
    
    @Nullable
    @Override
    public String getEmbeddableResourceType() {
        return embeddableResourceType;
    }

    @NotNull
    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}