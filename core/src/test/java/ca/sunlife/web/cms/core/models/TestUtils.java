package ca.sunlife.web.cms.core.models;

import java.util.List;
import java.util.Locale;

import org.apache.sling.api.request.RequestPathInfo;
import org.apache.sling.api.resource.Resource;

import net.sf.beanrunner.BeanRunner;
import uk.org.lidalia.slf4jtest.LoggingEvent;

/**
 * The class TestUtils
 */
public class TestUtils {
  static final Locale CANADA_LOCALE = new Locale("en" , "CA");

  static void executeTestBean(Object bean) {
    try {
      BeanRunner beanRunner = new BeanRunner( );
      beanRunner.testBean(bean);
      beanRunner.testException(Exception.class);
    } catch (Exception e) {
      System.err.println("Exception occured:" + e.toString( ));
    }
  } 

  static void executeTestBean(Object bean , String [ ] excludedProperties) {
    try {
      BeanRunner beanRunner = new BeanRunner( );
      for (String property : excludedProperties) {
        beanRunner.excludeProperty(property);
      }
      beanRunner.testBean(bean);
    } catch (Exception e) {
      System.err.println("Exception occured:" + e.toString( ));
    }
  }

  static boolean getLogMessageFlag(List <LoggingEvent> eventList , String expectedMessage) {
    boolean flag = false;
    for (LoggingEvent event : eventList) {
      if (event.getMessage( ).contains(expectedMessage)) {
        flag = true;
        break;
      }
    }
    return flag;
  }

  /*static boolean getLogArgumentFlag(List <LoggingEvent> eventList , String expectedArgument) {
    boolean flag = false;
    for (LoggingEvent event : eventList) {
      if (event.getArguments( ).toString( ).contains(expectedArgument)) {
        flag = true;
        break;
      }
    }
    return flag;
  }*/

  public static RequestPathInfo getDummyRequestPathInfo(String [ ] dummySelector) {
    return new RequestPathInfo( ) {

      @ Override
      public Resource getSuffixResource() {
        // TODO Auto-generated method stub
        return null;
      }

      @ Override
      public String getSuffix() {
        // TODO Auto-generated method stub
        return null;
      }

      @ Override
      public String [ ] getSelectors() {
        return dummySelector;
      }

      @ Override
      public String getSelectorString() {
        // TODO Auto-generated method stub
        return null;
      }

      @ Override
      public String getResourcePath() {
        // TODO Auto-generated method stub
        return null;
      }

      @ Override
      public String getExtension() {
        // TODO Auto-generated method stub
        return null;
      }
    };

  }

}
