/**
 * 
 */
package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * @author mo92
 * The class FooterItemsModelTest.
 */
@ ExtendWith (AemContextExtension.class)
public class FooterItemsModelTest {

	@ InjectMocks
	private FooterItemsModel footerItemsModel;
	
	@ BeforeEach
  public void setup() {
		MockitoAnnotations.initMocks(this);
	}
	
	@ Test
	void testInit() {
		footerItemsModel.setCheckboxHide("yes");
		footerItemsModel.setCheckboxSeparator("no");
		footerItemsModel.setLabel("Link");
		footerItemsModel.setTarget("_self");
		footerItemsModel.setUrl("www.sit-sunlife.ca");
		footerItemsModel.init();
		assertEquals(false, footerItemsModel.isContentUrl());
		
		footerItemsModel.setUrl("/content/sunlife/external/ca/en/home");
		footerItemsModel.init();
		assertEquals(true, footerItemsModel.isContentUrl());
	}
}
