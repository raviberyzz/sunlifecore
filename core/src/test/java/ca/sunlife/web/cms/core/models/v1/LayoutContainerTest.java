package ca.sunlife.web.cms.core.models.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class LayoutContainerTest {
	
	
	private final AemContext context = new AemContext();
	LayoutContainerModel layoutContainer;
	
    @BeforeEach
    public void setUp(AemContext context) throws Exception{    	 	
    	context.addModelsForClasses(LayoutContainerModel.class);
    	context.load().json("/ca/sunlife/web/cms/core/models/v1/layout-container/layout-container.json", "/content");
    }
    
	
	@Test
	void testCustomlayout() {
		
		context.currentResource("/content/layout_container_custom");
    	layoutContainer = context.currentResource().adaptTo(LayoutContainerModel.class);
    	assertEquals("custom", layoutContainer.getNumberOfColumn());
    	assertEquals("6", layoutContainer.getNumberOfCustomColumns());
    	
    	assertEquals("1", layoutContainer.getDesktopOne());
    	assertEquals("1", layoutContainer.getTabletOne());
    	assertEquals("1", layoutContainer.getMobileOne());
    	assertEquals("true", layoutContainer.getOffsetOne());
    	assertEquals("1", layoutContainer.getOffsetDesktopOne());
    	assertEquals("1", layoutContainer.getOffsetTabletOne());
    	assertEquals("1", layoutContainer.getOffsetMobileOne());
    	
    	assertEquals("2", layoutContainer.getDesktopTwo());
    	assertEquals("2", layoutContainer.getTabletTwo());
    	assertEquals("2", layoutContainer.getMobileTwo());
    	assertEquals("true", layoutContainer.getOffsetTwo());
    	assertEquals("2", layoutContainer.getOffsetDesktopTwo());
    	assertEquals("2", layoutContainer.getOffsetTabletTwo());
    	assertEquals("2", layoutContainer.getOffsetMobileTwo());
    	
    	assertEquals("3", layoutContainer.getDesktopThree());
    	assertEquals("3", layoutContainer.getTabletThree());
    	assertEquals("3", layoutContainer.getMobileThree());
    	assertEquals("true", layoutContainer.getOffsetThree());
    	assertEquals("3", layoutContainer.getOffsetDesktopThree());
    	assertEquals("3", layoutContainer.getOffsetTabletThree());
    	assertEquals("3", layoutContainer.getOffsetMobileThree());
    	
    	assertEquals("4", layoutContainer.getDesktopFour());
    	assertEquals("4", layoutContainer.getTabletFour());
    	assertEquals("4", layoutContainer.getMobileFour());
    	assertEquals("true", layoutContainer.getOffsetFour());
    	assertEquals("4", layoutContainer.getOffsetDesktopFour());
    	assertEquals("4", layoutContainer.getOffsetTabletFour());
    	assertEquals("4", layoutContainer.getOffsetMobileFour());
    	
    	assertEquals("5", layoutContainer.getDesktopFive());
    	assertEquals("5", layoutContainer.getTabletFive());
    	assertEquals("5", layoutContainer.getMobileFive());
    	assertEquals("true", layoutContainer.getOffsetFive());
    	assertEquals("5", layoutContainer.getOffsetDesktopFive());
    	assertEquals("5", layoutContainer.getOffsetTabletFive());
    	assertEquals("5", layoutContainer.getOffsetMobileFive());
    	
    	assertEquals("6", layoutContainer.getDesktopSix());
    	assertEquals("6", layoutContainer.getTabletSix());
    	assertEquals("6", layoutContainer.getMobileSix());
    	assertEquals("true", layoutContainer.getOffsetSix());
    	assertEquals("6", layoutContainer.getOffsetDesktopSix());
    	assertEquals("6", layoutContainer.getOffsetTabletSix());
    	assertEquals("6", layoutContainer.getOffsetMobileSix());
    	
    	assertEquals("data-section", layoutContainer.getDataSection());
    	assertEquals("mb-sl16", layoutContainer.getSpacing());
	}

}
