package ca.sunlife.web.cms.source.services;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.net.URISyntaxException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.MockitoAnnotations;

import ca.sunlife.web.cms.core.services.HttpDeleteWithBody;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * The Class HttpDeleteWithBodyTest.
 */
@ ExtendWith (AemContextExtension.class)
public class HttpDeleteWithBodyTest {

	/**
	 * set up.
	 */
	@ BeforeEach
	public void setup() {
		MockitoAnnotations.initMocks(this);
	}

	@ Test
	public void testDoPost() throws URISyntaxException {
		HttpDeleteWithBody body = new HttpDeleteWithBody("www.google.com");
		if( null != body ) {
			assertEquals("www.google.com", body.getURI().toString());
		}
	}
}
