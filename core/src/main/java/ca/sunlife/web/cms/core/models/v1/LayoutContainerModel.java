package ca.sunlife.web.cms.core.models.v1;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import javax.annotation.PostConstruct;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import lombok.Getter;

/**
 * The LayoutContainerModel is a sling model which is associated with Layout
 * Container component.
 *
 * @author Sunlife
 */
@Getter
@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = LayoutContainerModel.RESOURCE_TYPE)
public class LayoutContainerModel {
	
	protected static final String RESOURCE_TYPE = "sunlife/core/components/content/core-layout-container";
	
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	@ValueMapValue
	private String numberOfColumn;
	
	@ValueMapValue
	private String numberOfCustomColumns;

	@ValueMapValue
	@Default(values = "0")
	private String desktopOne;
	
	@ValueMapValue
	@Default(values = "0")
	private String tabletOne;
	
	@ValueMapValue
	@Default(values = "0")
	private String mobileOne;
	
	@ValueMapValue
	private String offsetOne;
	
	@ValueMapValue
	@Default(values = "0")
	private String offsetDesktopOne;
	
	@ValueMapValue
	@Default(values = "0")
	private String offsetTabletOne;
	
	@ValueMapValue
	@Default(values = "0")
	private String offsetMobileOne;

	@ValueMapValue
	@Default(values = "0")
	private String desktopTwo;
	
	@ValueMapValue
	@Default(values = "0")
	private String tabletTwo;
	
	@ValueMapValue
	@Default(values = "0")
	private String mobileTwo;
	
	@ValueMapValue
	private String offsetTwo;
	
	@ValueMapValue
	@Default(values = "0")
	private String offsetDesktopTwo;
	
	@ValueMapValue
	@Default(values = "0")
	private String offsetTabletTwo;
	
	@ValueMapValue
	@Default(values = "0")
	private String offsetMobileTwo;

	@ValueMapValue
	@Default(values = "0")
	private String desktopThree;
	
	@ValueMapValue
	@Default(values = "0")
	private String tabletThree;
	
	@ValueMapValue
	@Default(values = "0")
	private String mobileThree;
	
	@ValueMapValue
	private String offsetThree;
	
	@ValueMapValue
	@Default(values = "0")
	private String offsetDesktopThree;
	
	@ValueMapValue
	@Default(values = "0")
	private String offsetTabletThree;
	
	@ValueMapValue
	@Default(values = "0")
	private String offsetMobileThree;
	
	@ValueMapValue
	@Default(values = "0")
	private String desktopFour;
	
	@ValueMapValue
	@Default(values = "0")
	private String tabletFour;
	
	@ValueMapValue
	@Default(values = "0")
	private String mobileFour;
	
	@ValueMapValue
	private String offsetFour;
	
	@ValueMapValue
	@Default(values = "0")
	private String offsetDesktopFour;
	
	@ValueMapValue
	@Default(values = "0")
	private String offsetTabletFour;
	
	@ValueMapValue
	@Default(values = "0")
	private String offsetMobileFour;

	@ValueMapValue
	@Default(values = "0")
	private String desktopFive;
	
	@ValueMapValue
	@Default(values = "0")
	private String tabletFive;
	
	@ValueMapValue
	@Default(values = "0")
	private String mobileFive;
	
	@ValueMapValue
	private String offsetFive;
	
	@ValueMapValue
	@Default(values = "0")
	private String offsetDesktopFive;
	
	@ValueMapValue
	@Default(values = "0")
	private String offsetTabletFive;
	
	@ValueMapValue
	@Default(values = "0")
	private String offsetMobileFive;

	@ValueMapValue
	@Default(values = "0")
	private String desktopSix;
	
	@ValueMapValue
	@Default(values = "0")
	private String tabletSix;
	
	@ValueMapValue
	@Default(values = "0")
	private String mobileSix;
	
	@ValueMapValue
	private String offsetSix;
	
	@ValueMapValue
	@Default(values = "0")
	private String offsetDesktopSix;
	
	@ValueMapValue
	@Default(values = "0")
	private String offsetTabletSix;
	
	@ValueMapValue
	@Default(values = "0")
	private String offsetMobileSix;
	
	@ValueMapValue
	private String heightAuto;
	
	@ValueMapValue
	private String dataSection;

	@ValueMapValue
	private String spacing;
	
	private List<LinkedHashMap<String, List<String>>> customGrid;
	
	@PostConstruct
	public void init() {
		
		if(!StringUtils.isBlank(numberOfCustomColumns)) {

			customGrid = new ArrayList<>();			
			for(int i = 1; i<= Integer.parseInt(numberOfCustomColumns); i++ ) {	
				
				if( i == 1) {
					addCustomGridInfo(customGrid, desktopOne, offsetDesktopOne, tabletOne, offsetTabletOne, mobileOne, offsetMobileOne);	
				} else if( i == 2) {
					addCustomGridInfo(customGrid, desktopTwo, offsetDesktopTwo, tabletTwo, offsetTabletTwo, mobileTwo, offsetMobileTwo);					
				}else if( i == 3) {
					addCustomGridInfo(customGrid, desktopThree, offsetDesktopThree, tabletThree, offsetTabletThree, mobileThree, offsetMobileThree);	
				} else if( i == 4) {
					addCustomGridInfo(customGrid, desktopFour, offsetDesktopFour, tabletFour, offsetTabletFour, mobileFour, offsetMobileFour);
				} else if( i == 5) {
					addCustomGridInfo(customGrid, desktopFive, offsetDesktopFive, tabletFive, offsetTabletFive, mobileFive, offsetMobileFive);
				} else if( i == 6) {
					addCustomGridInfo(customGrid, desktopSix, offsetDesktopSix, tabletSix, offsetTabletSix, mobileSix, offsetMobileSix);
				} 							
			}
			
			logger.info("( Layout Container Model Custom Grid Object : "+customGrid.toString());
		}
	}

	private void addCustomGridInfo(List<LinkedHashMap<String, List<String>>> customGrid2, String desktop, String offsetDesktop, String tablet, String offsetTablet, String mobile, String offsetMobile) {
		LinkedHashMap<String, List<String>> customViewPort = new LinkedHashMap<>();
		customViewPort.put("desktop", new ArrayList<>(Arrays.asList(desktop, offsetDesktop)));
		customViewPort.put("tablet", new ArrayList<>(Arrays.asList(tablet, offsetTablet)));
		customViewPort.put("mobile", new ArrayList<>(Arrays.asList(mobile, offsetMobile)));
		customGrid.add(customViewPort);
	}
}
