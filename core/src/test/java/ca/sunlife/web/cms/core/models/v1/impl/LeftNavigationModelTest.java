package ca.sunlife.web.cms.core.models.v1.impl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import ca.sunlife.web.cms.core.models.v1.LeftNavigationModal;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import static org.junit.jupiter.api.Assertions.assertEquals;


@ExtendWith(AemContextExtension.class)
public class LeftNavigationModelTest {

    @InjectMocks
    private LeftNavigationModal leftNavigation;

    @ BeforeEach
	void setup() {
      MockitoAnnotations.initMocks(this);
	}

    @ Test
	void testItemsList() {
    	assertEquals(0,leftNavigation.getUpdatedList().size());
    }
}
