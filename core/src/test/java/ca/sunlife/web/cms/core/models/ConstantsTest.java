/**
 * 
 */
package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import ca.sunlife.web.cms.core.constants.AdvisorDetailConstants;
import ca.sunlife.web.cms.core.constants.ArticleConstants;
import ca.sunlife.web.cms.core.constants.BasePageModelConstants;
import ca.sunlife.web.cms.core.constants.ProviderProfileConstants;
import ca.sunlife.web.cms.core.constants.SelectorToExfragConstants;
import ca.sunlife.web.cms.core.constants.UserInfoConstants;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * @author mo92 The class TestConstants.
 *
 */
@ ExtendWith (AemContextExtension.class)
public class ConstantsTest {

	/**
	 * The constant class list.
	 */
	private List<Class<?>> constantClassList = null;
	
	/**
	 * Sets up constant classes.
	 */
	@ BeforeEach
	void setUp() {
		constantClassList = new ArrayList<Class<?>>();
		constantClassList.add(AdvisorDetailConstants.class);
		constantClassList.add(ArticleConstants.class);
		constantClassList.add(BasePageModelConstants.class);
		constantClassList.add(ProviderProfileConstants.class);
		constantClassList.add(UserInfoConstants.class);
		constantClassList.add(SelectorToExfragConstants.class);
	}
	
	/**
	 * Tests private constructors 
	 */
	@ Test()
	void testPrivateConstructors() {
		for(Class<?> cls : constantClassList) {
			try {
				final Constructor<?> constructor = cls.getDeclaredConstructor();
				constructor.setAccessible(true);
				constructor.newInstance();
			} catch (NoSuchMethodException | SecurityException | InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
				assertTrue(e instanceof Exception);
			}
		    
		}
	}
	
}
