/**
 * 
 */
package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import javax.jcr.RepositoryException;

import org.apache.commons.lang3.reflect.FieldUtils;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.models.SignInModel.HiddenMetadataModel;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * @author yj99
 *
 */
@ExtendWith(AemContextExtension.class)
class SignInModelTest {

	SignInModel sm;

	private Page currentPage;

	@Mock
	private ValueMap valueMap;

	final static String PAGE_PATH = "/content/sunlife/signin/en";
	
	private SiteConfigService configService;
	
	/**
	 * @throws java.lang.Exception
	 */
	@BeforeEach
	void setUp() throws Exception {
		sm = new SignInModel();
		currentPage = Mockito.mock(Page.class);
		configService = Mockito.mock(SiteConfigService.class);
		FieldUtils.getDeclaredField(SignInModel.class, "currentPage", true).set(sm, currentPage);
		FieldUtils.getDeclaredField(SignInModel.class, "configService", true).set(sm, configService);
		MockitoAnnotations.initMocks(this);
	}

	

	/**
	 * Test method for
	 * {@link ca.sunlife.web.cms.core.models.SignInModel#setSignInHeadingText(java.lang.String)}.
	 */
	@Test
	void testSetSignInHeadingText() {
		sm.setSignInHeadingText("Client sign in..");
		assertTrue(sm.getSignInHeadingText() == "Client sign in..");
	}

	/**
	 * Test method for
	 * {@link ca.sunlife.web.cms.core.models.SignInModel#setMobileAppBadge(java.lang.String)}.
	 */
	@Test
	void testSetMobileAppBadge() {
		sm.setMobileAppBadge("For the best mobile experience");
		assertTrue(sm.getMobileAppBadge() == "For the best mobile experience");
	}

	/**
	 * Test method for
	 * {@link ca.sunlife.web.cms.core.models.SignInModel#setMobileAppBadgeLink(java.lang.String)}.
	 */
	@Test
	void testSetMobileAppBadgeLink() {
		sm.setMobileAppBadgeLink(
				"https://www.sunlife.ca/ca/Customer+support/Sign+in+help/my+Sun+Life+Mobile?vgnLocale=en_CA");
		assertTrue(sm
				.getMobileAppBadgeLink() == "https://www.sunlife.ca/ca/Customer+support/Sign+in+help/my+Sun+Life+Mobile?vgnLocale=en_CA");
	}

	/**
	 * Test method for
	 * {@link ca.sunlife.web.cms.core.models.SignInModel#setAccessIDPlaceholder(java.lang.String)}.
	 */
	@Test
	void testSetAccessIDPlaceholder() {
		sm.setAccessIDPlaceholder("Email/Access ID");
		assertTrue(sm.getAccessIDPlaceholder() == "Email/Access ID");
	}

	/**
	 * Test method for
	 * {@link ca.sunlife.web.cms.core.models.SignInModel#setPasswordPlaceholder(java.lang.String)}.
	 */
	@Test
	void testSetPasswordPlaceholder() {
		sm.setPasswordPlaceholder("Password");
		assertTrue(sm.getPasswordPlaceholder() == "Password");
	}

	/**
	 * Test method for
	 * {@link ca.sunlife.web.cms.core.models.SignInModel#setCheckboxLabel(java.lang.String)}.
	 */
	@Test
	void testSetCheckboxLabel() {
		sm.setCheckboxLabel("Remember me");
		assertTrue(sm.getCheckboxLabel() == "Remember me");
	}

	/**
	 * Test method for
	 * {@link ca.sunlife.web.cms.core.models.SignInModel#setSignInButtonLabel(java.lang.String)}.
	 */
	@Test
	void testSetSignInButtonLabel() {
		sm.setSignInButtonLabel("Sign in");
		assertTrue(sm.getSignInButtonLabel() == "Sign in");
	}

	/**
	 * Test method for
	 * {@link ca.sunlife.web.cms.core.models.SignInModel#setFormActionUrl(java.lang.String)}.
	 */
	@Test
	void testSetFormActionUrl() {
		sm.setFormActionUrl("https://sit-www.sunnet.sunlife.com/siteminder/FormsAuthLogin.fcc");
		assertTrue(sm.getFormActionUrl() == "https://sit-www.sunnet.sunlife.com/siteminder/FormsAuthLogin.fcc");
	}

	/**
	 * Test method for
	 * {@link ca.sunlife.web.cms.core.models.SignInModel#setForgotAccessIdLabel(java.lang.String)}.
	 */
	@Test
	void testSetForgotAccessIdLabel() {
		sm.setForgotAccessIdLabel("Forgot Access ID?");
		assertTrue(sm.getForgotAccessIdLabel() == "Forgot Access ID?");
	}

	/**
	 * Test method for
	 * {@link ca.sunlife.web.cms.core.models.SignInModel#setForgotAccessIdLink(java.lang.String)}.
	 */
	@Test
	void testSetForgotAccessIdLink() {
		sm.setForgotAccessIdLink("/content/sunlife/external/signin/en/mysunlife");
		assertTrue(sm.getForgotAccessIdLink() == "/content/sunlife/external/signin/en/mysunlife");
	}

	/**
	 * Test method for
	 * {@link ca.sunlife.web.cms.core.models.SignInModel#setForgotPasswordLabel(java.lang.String)}.
	 */
	@Test
	void testSetForgotPasswordLabel() {
		sm.setForgotPasswordLabel("Forgot password?");
		assertTrue(sm.getForgotPasswordLabel() == "Forgot password?");
	}

	/**
	 * Test method for
	 * {@link ca.sunlife.web.cms.core.models.SignInModel#setForgotPasswordLink(java.lang.String)}.
	 */
	@Test
	void testSetForgotPasswordLink() {
		sm.setForgotPasswordLink("/content/sunlife/external/signin/en/mysunlife");
		assertTrue(sm.getForgotPasswordLink() == "/content/sunlife/external/signin/en/mysunlife");
	}

	/**
	 * Test method for
	 * {@link ca.sunlife.web.cms.core.models.SignInModel#setSignInBottomText(java.lang.String)}.
	 */
	@Test
	void testSetSignInBottomText() {
		sm.setSignInBottomText("Don't have an Access ID");
		assertTrue(sm.getSignInBottomText() == "Don't have an Access ID");
	}

	/**
	 * Test method for
	 * {@link ca.sunlife.web.cms.core.models.SignInModel#setDomain(java.lang.String)}.
	 */
	@Test
	void testSetDomain() {
		sm.setDomain("https://cmsdev-auth.ca.sunlife");
		assertTrue(sm.getDomain() == "https://cmsdev-auth.ca.sunlife");
	}

	/**
	 * Test method for
	 * {@link ca.sunlife.web.cms.core.models.SignInModel#setLanguage(java.lang.String)}.
	 */
	@Test
	void testSetLanguage() {
		sm.setLanguage("en");
		assertTrue(sm.getLanguage() == "en");
	}

	/**
	 * Test method for
	 * {@link ca.sunlife.web.cms.core.models.SignInModel#setLogLang(java.lang.String)}.
	 */
	@Test
	void testSetLogLang() {
		sm.setLogLang("en-CA");
		assertTrue(sm.getLogLang() == "en-CA");
	}

	/**
	 * Test method for
	 * {@link ca.sunlife.web.cms.core.models.SignInModel#setTarget(java.lang.String)}.
	 */
	@Test
	void testSetTarget() {
		sm.setTarget("/mbrportal/req/secure/pphp/personalizedWelcome");
		assertTrue(sm.getTarget() == "/mbrportal/req/secure/pphp/personalizedWelcome");
	}

	/**
	 * Test method for
	 * {@link ca.sunlife.web.cms.core.models.SignInModel#setErrorMsgPlaceholder(java.lang.String)}.
	 */
	@Test
	void testSetErrorMsgPlaceholder() {
		sm.setErrorMsgPlaceholder("Required Field");
		assertTrue(sm.getErrorMsgPlaceholder() == "Required Field");
	}

	/**
	 * Test method for
	 * {@link ca.sunlife.web.cms.core.models.SignInModel#setErrorRedirectPath(java.lang.String)}.
	 */
	@Test
	void testSetErrorRedirectPath() {
		sm.setErrorRedirectPath("");
		assertTrue(sm.getErrorRedirectPath() == "");
	}

	/**
	 * Test method for
	 * {@link ca.sunlife.web.cms.core.models.SignInModel#setHiddenMetadata(java.util.List)}.
	 */
	@Test
	void testSetHiddenMetadata() {
		HiddenMetadataModel hiddenMetadataModel = new HiddenMetadataModel();
		List<HiddenMetadataModel> hiddenMetadataModelList = new ArrayList<HiddenMetadataModel>();
		hiddenMetadataModel.setName("testname");
		hiddenMetadataModel.setValue("testValue");
		assertNotNull(hiddenMetadataModel.getName());
		assertNotNull(hiddenMetadataModel.getValue());
		hiddenMetadataModelList.add(hiddenMetadataModel);
		sm.setHiddenMetadata(hiddenMetadataModelList);
		assertNotNull(sm.getHiddenMetadata());
	}

	/**
	 * Test method for {@link ca.sunlife.web.cms.core.models.SignInModel#init()}.
	 */
	@Test
	void testInit() {
		when(currentPage.getPath()).thenReturn(PAGE_PATH);
		//String pagePath = PAGE_PATH;
		try {
			when(configService.getConfigValues("domain", PAGE_PATH))
					.thenReturn("https://cmsstage-contentexport.ca.sunlife");
		} catch (LoginException | RepositoryException e) {
			assertTrue(e instanceof LoginException);
		}
		sm.init();
		//assertEquals("https://cmsstage-contentexport.ca.sunlife/mbrportal/req/secure/pphp/personalizedWelcome",sm.getTarget());
	}

}
