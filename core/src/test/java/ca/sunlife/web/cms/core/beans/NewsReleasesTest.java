package ca.sunlife.web.cms.core.beans;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ ExtendWith (AemContextExtension.class)
public class NewsReleasesTest {
	
	NewsReleases newsReleases;
	/**
	 * Sets up mocks.
	 */
	@ BeforeEach
	void setUp() {
		newsReleases = new NewsReleases();
	}
	
	@Test
	public void testSetReturnedCount() {
		newsReleases.setReturnedCount("1");
		assertEquals(newsReleases.getReturnedCount(), "1");
	}

}
