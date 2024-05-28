package ca.sunlife.web.cms.core.groovy;

import groovy.lang.Binding;
import groovy.lang.GroovyShell;
import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;


public class Importer {
	
	private static final String SCRIPT_HOME = "/var/groovyconsole/scripts/";
	
	public void script(final Binding binding, String path) throws IOException {
		
		//Allow the use of absolute JCR paths or local paths within SCRIPT_HOME
		path = (path.startsWith("/") ? StringUtils.EMPTY : SCRIPT_HOME) + path;
		
		//use the script binding's resource resolver
		final ResourceResolver resolver = (ResourceResolver) binding.getVariable("resourceResolver");
		
		//Fetch the script resource
		final Resource resource = resolver.getResource(path);
		if(resource == null) {
			throw new FileNotFoundException("Could not find script at " + path);			
		}
		
		//Read the contents of the script file
		final InputStream inputStream = resource.adaptTo(InputStream.class);
		if(inputStream == null) {
			throw new IOException("Could not read contents of script at " + path);			
		}		
		
		//combine all lines into one script
		final BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8));
		final String script = reader.lines().collect(Collectors.joining("\n"));
		
		//Parse and run the string as a Groovy script
		new GroovyShell(binding).parse(script).run();		
		
	}

}
