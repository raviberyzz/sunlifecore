package ca.sunlife.web.cms.core.models.v1;

import static org.mockito.Mockito.when;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class TitleModelTest {

	@InjectMocks
	private TitleModel title;

	@Mock
	Page currentPage;

	@Mock
	Page page;

	@BeforeEach
	void setup() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	void testInitWithText() {
		title.getSpacing();
		title.getLinkURL();
		title.getText();
		title.getType();
		title.init();
	}

	@Test
	void testInitWithNoText() {
		title.init();
		title.getCurrentPage();
		when(currentPage.getPageTitle()).thenReturn("page title");
		when(currentPage.getTitle()).thenReturn("page title");
	}
}
