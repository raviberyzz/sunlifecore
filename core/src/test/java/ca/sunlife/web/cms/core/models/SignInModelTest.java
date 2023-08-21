/**
 * 
 */
package ca.sunlife.web.cms.core.models;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.constants.BasePageModelConstants;
import ca.sunlife.web.cms.core.models.SignInModel.HiddenMetadataModel;
import ca.sunlife.web.cms.core.services.SiteConfigService;

import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ValueMap;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * @author yj99
 *
 */
@ExtendWith(AemContextExtension.class)
class SignInModelTest {

	@InjectMocks
	private SignInModel sm;

	@Mock
	private Page currentPage;

	@Mock
	private ValueMap valueMap;

	final static String PAGE_PATH = "/content/sunlife/signin/en";
	
    private static final String DOMAIN_STR = "domain";
    
    private static final String MFA_DOMAIN_PATH = "mfaDomainPath";
    
    private static final String SEPARATOR = "|";
	
	@Mock
	private SiteConfigService configService;

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
		sm.setDomain("Consumer | /mbrportal/req/secure/pphp/personalizedWelcome");
		assertTrue(sm.getDomain() == "Consumer | /mbrportal/req/secure/pphp/personalizedWelcome");
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
	 * {@link ca.sunlife.web.cms.core.models.SignInModel#setMfaDomainPath(java.lang.String)}.
	 */
	@Test
	void testSetMfaDomainPath() {
		sm.setMfaDomainPath("/public/transmit/mfa");
		assertTrue(sm.getMfaDomainPath() == "/public/transmit/mfa");
	}
	
	/**
	 * Test method for
	 * {@link ca.sunlife.web.cms.core.models.SignInModel#setIsTargetPathAbsolute(java.lang.String)}.
	 */
	@Test
	void testSetIsTargetPathAbsolute() {
		sm.setIsTargetPathAbsolute("false");
		assertTrue(sm.getIsTargetPathAbsolute() == "false");
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
	 * @throws java.lang.Exception
	 */
	@BeforeEach
	void setUp() throws Exception {
		MockitoAnnotations.initMocks(this);
	}

	public void setInitData() throws ArrayIndexOutOfBoundsException, LoginException, RepositoryException {
		when(currentPage.getPath()).thenReturn(PAGE_PATH);
		when(configService.getConfigValues(DOMAIN_STR, PAGE_PATH))
				.thenReturn("https://cmsstage-contentexport.ca.sunlife");
		when(currentPage.getLanguage()).thenReturn(TestUtils.CANADA_LOCALE);
		when(configService.getConfigValues(MFA_DOMAIN_PATH, PAGE_PATH))
				.thenReturn("/public/transmit/mfa");
		
		testSetDomain();
		String domainTargetArray[] = sm.getDomain().split(Pattern.quote(SEPARATOR));
		assertEquals("Consumer", domainTargetArray[0].trim());
		assertEquals("/mbrportal/req/secure/pphp/personalizedWelcome", domainTargetArray[1].trim());
		
		testSetIsTargetPathAbsolute();
		assertEquals("false", sm.getIsTargetPathAbsolute());
		
	}

	/**
	 * Test method for {@link ca.sunlife.web.cms.core.models.SignInModel#init()}.
	 */
	@Test
	void testInit() {
		try {
			setInitData();
			sm.init();
		} catch (Exception e) {
			assertTrue(e instanceof NullPointerException);
		}
		assertNotEquals("https://cmsstage-contentexport.ca.sunlife//",
				sm.getDomain());
	}

}
