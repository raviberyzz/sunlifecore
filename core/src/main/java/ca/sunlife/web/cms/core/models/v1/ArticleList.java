package ca.sunlife.web.cms.core.models.v1;

import java.util.HashMap;
import java.util.List;

public interface ArticleList {
	
	 String getParentPath(); 	  

	 String getDisplayType();	 

	 int getHideTop();	 
	 
	 int getMaxItems();	 

     String getSpacing();

     String getAccessibilityLabel();

}
