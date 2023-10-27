package ca.sunlife.web.cms.core.groovy;

import com.icfolson.aem.groovy.console.api.BindingExtensionProvider;
import com.icfolson.aem.groovy.console.api.BindingVariable;
import com.icfolson.aem.groovy.console.api.ScriptContext;
import org.osgi.service.component.annotations.Component;

import java.util.HashMap;
import java.util.Map;

//Tell the Groovy Console bundle to use this class as an extension to the default Binding
@Component(service = BindingExtensionProvider.class, immediate = true)

public class CustomBindingExtension implements BindingExtensionProvider {

	@Override
	public Map<String, BindingVariable> getBindingVariables(final ScriptContext scriptContext) {		
		
		//Return a map representing each new ninding variable you wish to add in
		final HashMap<String, BindingVariable> bindingVariables = new HashMap<>();
		bindingVariables.put("importer", new BindingVariable(new Importer()));
		return bindingVariables;		
		
	}	

}
