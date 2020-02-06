package ca.sunlife.web.cms.core.models;

import java.util.List;

import net.sf.beanrunner.BeanRunner;
import uk.org.lidalia.slf4jtest.LoggingEvent;

public class Utils {
	static void executeTestBean(Object bean) {
		try {
			BeanRunner beanRunner = new BeanRunner();
			beanRunner.testBean(bean);
		} catch (Exception e) {
			System.err.println("Exception occured:" + e.toString());
		}
	}

	static boolean getLogMessageFlag(List<LoggingEvent> eventList, String expectedMessage) {
		boolean flag = false;
		for (LoggingEvent event : eventList) {
			if (event.getMessage().contains(expectedMessage)) {
				flag = true;
				break;
			}
		}
		return flag;
	}

	static boolean getLogArgumentFlag(List<LoggingEvent> eventList, String expectedArgument) {
		boolean flag = false;
		for (LoggingEvent event : eventList) {
			if (event.getArguments().toString().contains(expectedArgument)) {
				flag = true;
				break;
			}
		}
		return flag;
	}
}
