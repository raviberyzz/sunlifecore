package ca.sunlife.web.cms.core.models.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class AnchorLinksModelTest {

	@InjectMocks
	private AnchorLinksModel anchorLinksModel;

	@BeforeEach
	public void setup() {
		MockitoAnnotations.initMocks(this);
		anchorLinksModel.setAnchorHeading("Test Heading");
		anchorLinksModel.setSpacing("mb-12");

	}

	@Test
	public void testInit() {
		assertEquals("Test Heading", anchorLinksModel.getAnchorHeading());
		assertEquals("mb-12", anchorLinksModel.getSpacing());
	}

}
