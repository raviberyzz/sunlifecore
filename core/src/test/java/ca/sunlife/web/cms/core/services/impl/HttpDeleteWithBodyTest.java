package ca.sunlife.web.cms.core.services.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import ca.sunlife.web.cms.core.services.HttpDeleteWithBody;

public class HttpDeleteWithBodyTest {
	HttpDeleteWithBody httpDeleteWithBody;
	
	@BeforeEach
	void setUp() {
		httpDeleteWithBody = new HttpDeleteWithBody();
	}
	
	@Test
	public void testGetMethod() {
		assertEquals(httpDeleteWithBody.getMethod(), "DELETE");
	}
}
