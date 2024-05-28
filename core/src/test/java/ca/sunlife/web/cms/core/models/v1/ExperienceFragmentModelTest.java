/**
 * 
 */
package ca.sunlife.web.cms.core.models.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.LoginException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.services.SiteConfigService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * @author mo92 The class
 *         ExperienceFragmentModelTest.
 */
@ ExtendWith(AemContextExtension.class)
public class ExperienceFragmentModelTest {

	/**
	 * The current page mock.
	 */
	@ Mock
	private Page currentPage;

	/** The config service. */
	@ Mock
	private SiteConfigService configService;

	/**
	 * The experience fragment
	 * model.
	 */
	@ InjectMocks
	private ExperienceFragmentModel experienceFragmentModel;

	/**
	 * Sets up mocks.
	 */
	@ BeforeEach
	void setup() {
		MockitoAnnotations.initMocks(this);
	}

	/**
	 * Tests init method when
	 * fragment path is not
	 * specified.
	 */
	@ Test
	void testInitWhenFragmentPathIsNull() {
		experienceFragmentModel.init();
	}

	/**
	 * Tests init method.
	 */
	@ Test
	void testInit() {
		experienceFragmentModel.setFragmentPath("/content/experience-fragments/sunlife/fragment3");
		
		when(currentPage.getPath()).thenReturn("/content/experience-fragments/sunlife/home");
		experienceFragmentModel.init();
		
		when(currentPage.getPath()).thenReturn("/content/sunlife/en/home");
		experienceFragmentModel.init();

		experienceFragmentModel.setFragmentPath("/content/experience-fragments/sunlife/header");
		experienceFragmentModel.init();

		try {
			when(configService.getConfigValues("experienceFragmentPath", currentPage.getPath())).thenReturn("/content/experience-fragments/ca/en");
		} catch (LoginException e) {
			assertTrue(e instanceof LoginException);
		} catch (RepositoryException e) {
			assertTrue(e instanceof RepositoryException);
		}
		experienceFragmentModel.setFragmentPath("/content/experience-fragments/sunlife/external/ca/en/footer/master");
		experienceFragmentModel.init();
		assertEquals("/content/experience-fragments/ca/en/footer/master", experienceFragmentModel.getModifiedFragmentPath());
	}

	/**
	 * Tests init method when
	 * exception.
	 */
	@ Test
	void testInitWhenException() {
		experienceFragmentModel.setFragmentPath("/content/experience-fragments/sunlife/fragment3");
		when(currentPage.getPath()).thenReturn("/content/sunlife/en/home");
		try {
			when(configService.getConfigValues("experienceFragmentPath", currentPage.getPath())).thenThrow(new LoginException());
			experienceFragmentModel.init();
		} catch (Exception e) {
			assertTrue(e instanceof LoginException);
		}
	}
	
	/**
	 * Tests init method when
	 * exception.
	 */
	@ Test
	void testInitWhenRepositoryException() {
		experienceFragmentModel.setFragmentPath("/content/experience-fragments/sunlife/fragment3");
		when(currentPage.getPath()).thenReturn("/content/sunlife/en/home");
		try {
			when(configService.getConfigValues("experienceFragmentPath", currentPage.getPath())).thenThrow(new RepositoryException());
			experienceFragmentModel.init();
		} catch (Exception e) {
			assertTrue(e instanceof RepositoryException);
		}
	}
}
