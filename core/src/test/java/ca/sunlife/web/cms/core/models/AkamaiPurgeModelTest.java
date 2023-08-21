/**
 * 
 */
package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.jcr.Node;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import ca.sunlife.web.cms.core.exception.ApplicationException;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * The Class AkamaiPurgeModelTest.
 */
@ ExtendWith (AemContextExtension.class)
public class AkamaiPurgeModelTest {

	/**
	 * The resource mock.
	 */
	@ Mock
	private Resource resource;
	
	/** The akamai cache clear mock. */
	@ Mock
	private ca.sunlife.web.cms.core.services.AkamaiCacheClear akamaiCacheClear;
	  
	/**
	 * The AkamaiPurgeModel mock.
	 */
	@ InjectMocks
	private AkamaiPurgeModel akamaiPurgeModel;
	
	/**
	 * The Node mock.
	 */
	@ Mock
	private Node node;
	
	/**
	 * The resource resolver mock.
	 */
	@ Mock
	private ResourceResolver resourceResolver;
	
	/**
	 * The page paths for which cache has to be cleared.
	 */
	private static final String[] PAGE_PATHS = new String[] {"/content/sunlife/external/ca/"};
	
	/**
	 * The dam paths for which cache has to be cleared.
	 */
	private static final String[] DAM_PATHS = new String[] {"/content/dam/sunlife/external/ca/"};
	
	/**
	 * Sets up mocks.
	 */
	@ BeforeEach
	void setup() {
		MockitoAnnotations.initMocks(this);
	}
	
	/**
	 * Tests init method when paths are not specified.
	 */
	@ Test
	void testInitWhenPathsNull() {
		akamaiPurgeModel.init();
		assertNull(akamaiPurgeModel.getAkamaiResponse());
	}
	
	/**
	 * Tests init method.
	 */
	@ Test
	void testInit() {
		@SuppressWarnings({ "unchecked", "rawtypes" })
		List<String> list = new ArrayList(Arrays.asList(PAGE_PATHS));
	    list.addAll(Arrays.asList(DAM_PATHS));
		akamaiPurgeModel.setPaths(Arrays.stream(list.toArray()).toArray(String[]::new));
		try {
			when(akamaiCacheClear.invalidatePages(PAGE_PATHS)).thenReturn("{\"objects\" : [\"/content/sunlife/external/ca/\"]}");
			when(akamaiCacheClear.invalidateAssets(DAM_PATHS)).thenReturn("{\"objects\" : [\"/content/dam/sunlife/external/ca/\"]}");
			when(resource.adaptTo(Node.class)).thenReturn(node);
			when(resource.getResourceResolver()).thenReturn(resourceResolver);
		} catch (ApplicationException e) {
			assertTrue(e instanceof ApplicationException);
		}
		akamaiPurgeModel.init();
		assertEquals("<pre>{\"objects\" : [\"/content/dam/sunlife/external/ca/\"]}</pre>{\"objects\" : [\"/content/sunlife/external/ca/\"]}", akamaiPurgeModel.getAkamaiResponse());
	}
	
	/**
	 * Tests init method when exections.
	 */
	@ Test
	void testInitWhenException() {
		@SuppressWarnings({ "unchecked", "rawtypes" })
		List<String> list = new ArrayList(Arrays.asList(PAGE_PATHS));
	    list.addAll(Arrays.asList(DAM_PATHS));
		try {
			akamaiPurgeModel.setPaths(Arrays.stream(list.toArray()).toArray(String[]::new));
			when(akamaiCacheClear.invalidatePages(PAGE_PATHS)).thenThrow(new ApplicationException());
			when(akamaiCacheClear.invalidateAssets(DAM_PATHS)).thenThrow(new ApplicationException());
			when(resource.adaptTo(Node.class)).thenReturn(node);
			when(resource.getResourceResolver()).thenReturn(resourceResolver);
		} catch (ApplicationException e) {
			assertTrue(e instanceof ApplicationException);
		}
		akamaiPurgeModel.init();
		assertEquals("<p style='color:red'>Unable to process below pages <br />/content/sunlife/external/ca/</p>", akamaiPurgeModel.getAkamaiResponse());
	}
}
