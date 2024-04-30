package ca.sunlife.web.cms.core.groovy;

import java.io.IOException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import groovy.lang.Binding;
import ca.sunlife.web.cms.core.groovy.Importer;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;
@ ExtendWith (AemContextExtension.class)
public class ImporterTest {
	@ Mock
	private SlingHttpServletRequest request;
	
	@ Mock
	private SlingHttpServletResponse response;
	
	@ Mock
	private Importer importer;
	
	@ Mock
	private Binding binding;
	
	@ BeforeEach
	void setup() {
		MockitoAnnotations.initMocks(this);
	}
		
	@ Test
	void testScript() throws IOException {
		String path = "removeStyle.groovy";
		importer.script(binding, path);		
	}
}
