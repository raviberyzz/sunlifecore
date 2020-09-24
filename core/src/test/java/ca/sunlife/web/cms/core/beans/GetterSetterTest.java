package ca.sunlife.web.cms.core.beans;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import ca.sunlife.web.cms.core.beans.TestUtils;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ ExtendWith (AemContextExtension.class)
public class GetterSetterTest {
	private NewsDetails newsDetails;
	private News news;
	private PageItem pageItem;
	private Release release;
	private ReleaseMain releaseMain;
	
	
	@ BeforeEach
	  void setup() {
		newsDetails=new NewsDetails();
		news = new News();
		pageItem = new PageItem();
		release=new Release();
		releaseMain = new ReleaseMain();
		
	}
	
	  @ Test
	  void testNewsDetails() {
	    TestUtils.executeTestBean(newsDetails);
	  }
	  
	  @ Test
	  void testNews() {
	    TestUtils.executeTestBean(news);
	  }
	  
	  @ Test
	  void testPageItem() {
	    TestUtils.executeTestBean(pageItem);
	  }
	  
	  
	  @ Test
	  void testRelease(){
	    TestUtils.executeTestBean(release);
	  }
	  
	  @ Test
	  void testReleaseMain() {
	    TestUtils.executeTestBean(releaseMain);
	  }

}
