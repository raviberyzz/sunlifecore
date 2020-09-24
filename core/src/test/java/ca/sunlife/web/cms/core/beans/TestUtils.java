package ca.sunlife.web.cms.core.beans;

import net.sf.beanrunner.BeanRunner;

public class TestUtils {

	  static void executeTestBean(Object bean) {
		    try {
		      BeanRunner beanRunner = new BeanRunner( );
		      beanRunner.testBean(bean);
		      beanRunner.testException(Exception.class);
		    } catch (Exception e) {
		      System.err.println("Exception occured:" + e.toString( ));
		    }
		  }
}
