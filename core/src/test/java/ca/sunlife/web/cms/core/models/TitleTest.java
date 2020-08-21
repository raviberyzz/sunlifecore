/**
 * 
 */
package ca.sunlife.web.cms.core.models;

import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.day.cq.wcm.api.Page;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * @author mo92
 *
 */
@ ExtendWith (AemContextExtension.class)
public class TitleTest {

	@ InjectMocks
	private Title title;
	
	@ Mock
	private Page currentPage;
	
	@ BeforeEach
	void setup() {
      MockitoAnnotations.initMocks(this);
	}
	
	@ Test
	void testInit() {
		title.init();
		title.setText("Test title");
		when(currentPage.getPageTitle()).thenReturn("page title");
		title.init();
	}
}
