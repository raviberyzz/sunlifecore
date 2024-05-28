package ca.sunlife.web.cms.core.models.v1;

import java.util.HashMap;
import java.util.List;

public interface Footer {

    String getTitle();

    String getRichText();

    String getSlfText();

	String getScreenReaderText();

    Boolean getFeedback();

    Boolean getDisplayTopSection();

    String getDataSection();

    String getSpacing();

    List<HashMap<String, Object>> getTopLinks();

    List<HashMap<String, Object>> getBottomLinks();

    List<HashMap<String, Object>> getSocialMedia();

    String getTopHeadingElement();
    
    String getMiddleHeadingElement();
}