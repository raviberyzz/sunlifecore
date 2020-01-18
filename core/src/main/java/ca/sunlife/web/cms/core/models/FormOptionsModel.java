package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import javax.inject.Named;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestDispatcherOptions;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import com.adobe.granite.ui.components.ds.DataSource;
import com.adobe.granite.ui.components.ds.SimpleDataSource;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.wcm.core.components.internal.models.v1.form.OptionsImpl;

@Model(adaptables = SlingHttpServletRequest.class,
adapters = OptionsImpl.class,
resourceType = "sunlife/core/components/form/options")
public class FormOptionsModel extends OptionsImpl {
	
	
	private List<OptionItemModel> optionItems;
	private static final Logger LOGGER = LoggerFactory.getLogger(FormOptionsModel.class);
	
	private List<OptionItemModel> items;
	
	@ScriptVariable
	private Resource resource;

    @ScriptVariable
    private SlingHttpServletResponse response;

    @ScriptVariable
    private ResourceResolver resolver;
	    
	@Inject
	@Named("source")
	private String sourceString;
	
	 @Self
	 private SlingHttpServletRequest request;
	 
	 @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
	 private String listPath;
	 
	 @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
	    private String datasourceRT;

	 
	
	@ChildResource(injectionStrategy = InjectionStrategy.OPTIONAL) 
	@Named("items")
    private List<Resource> itemResources;
	
	@Override
    public List<OptionItemModel> getItems() {
        if (optionItems == null) {
            populateOptionItems();
        }
        items= Collections.unmodifiableList(optionItems);
        return items;
    }
	 
	 
	 private void populateOptionItems() {
	        this.optionItems = new ArrayList<>();
	        Source source = Source.getSource(sourceString);
	        if (source == null) {
	            populateOptionItemsFromLocal();
	        } else {
	            switch (source) {
	                case DATASOURCE:
	                    populateOptionItemsFromDatasource();
	                    break;
	                case LIST:
	                    populateOptionItemsFromList();
	                    break;
	                default:
	                    populateOptionItemsFromLocal();
	            }
	        }
	    }

	    private void populateOptionItemsFromLocal() {
	        if (itemResources != null) {
	            for (Resource itemResource : itemResources) {
	                OptionItemModel optionItem = new OptionItemModel(request, resource, itemResource);
	                if ((optionItem.isDisabled() || StringUtils.isNotBlank(optionItem.getValue()))) {
	                    optionItems.add(optionItem);
	                }
	            }
	        }
	    }

	    private void populateOptionItemsFromList() {
	        if (StringUtils.isBlank(listPath)) {
	            return;
	        }
	        Resource parent = resolver.getResource(listPath);
	        if (parent != null) {
	            for(Resource itemResource: parent.getChildren()) {
	            	OptionItemModel optionItem = new OptionItemModel(request, resource, itemResource);
	                if ((optionItem.isDisabled() || StringUtils.isNotBlank(optionItem.getValue()))) {
	                    optionItems.add(optionItem);
	                }
	            }
	        }
	    }

	    @SuppressWarnings("unchecked")
	    private void populateOptionItemsFromDatasource() {
	        if (StringUtils.isBlank(datasourceRT)) {
	            return;
	        }
	        // build the options by running the datasource code (the list is set as a request attribute)
	        RequestDispatcherOptions opts = new RequestDispatcherOptions();
	        opts.setForceResourceType(datasourceRT);
	        RequestDispatcher dispatcher = request.getRequestDispatcher(resource, opts);
	        try {
	            if (dispatcher != null) {
	                dispatcher.include(request, response);
	            } else {
	                LOGGER.error("Failed to include the datasource at " + datasourceRT);
	            }
	        } catch (IOException | ServletException|RuntimeException e) {
	            LOGGER.error("Failed to include the datasource at " + datasourceRT, e);
	        }

	        // retrieve the datasource from the request and adapt it to form options
	        SimpleDataSource dataSource = (SimpleDataSource) request.getAttribute(DataSource.class.getName());
	        if (dataSource != null) {
	            Iterator<Resource> itemIterator = dataSource.iterator();
	            
	                while (itemIterator.hasNext()) {
	                    Resource itemResource = itemIterator.next();
	                    OptionItemModel optionItem = new OptionItemModel(request, resource, itemResource);
	                    if ((optionItem.isDisabled() || StringUtils.isNotBlank(optionItem.getValue()))) {
	                        optionItems.add(optionItem);
	                    }
	                }
	        }
	    }

	    private enum Source {
	        LOCAL("local"),
	        LIST("list"),
	        DATASOURCE("datasource");

	        private String element;

	        Source(String element) {
	            this.element = element;
	        }

	        private static Source getSource(String value) {
	            for (Source source : values()) {
	                if (StringUtils.equalsIgnoreCase(source.element, value)) {
	                    return source;
	                }
	            }
	            return null;
	        }
	    }

}
