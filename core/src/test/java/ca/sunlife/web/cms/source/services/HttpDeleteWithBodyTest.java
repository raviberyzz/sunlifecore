package ca.sunlife.web.cms.source.services;

import java.net.URI;
import java.net.URISyntaxException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

import ca.sunlife.web.cms.core.services.HttpDeleteWithBody;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * The Class HttpDeleteWithBodyTest.
 */
@ ExtendWith (AemContextExtension.class)
public class HttpDeleteWithBodyTest {

	@ InjectMocks
	private HttpDeleteWithBody deleteWithBody;
	
	/**
	 * set up.
	 */
	@ BeforeEach
	public void setup() {
		MockitoAnnotations.initMocks(this);
	}

	@ Test
	public void testDoPost() throws URISyntaxException {
		deleteWithBody.getMethod();
		HttpDeleteWithBody body = new HttpDeleteWithBody("/adpi/retriveData");
		
		HttpDeleteWithBody httpDeleteWithBody = new HttpDeleteWithBody(new URI("/adpi/retriveData"));
	}
}
