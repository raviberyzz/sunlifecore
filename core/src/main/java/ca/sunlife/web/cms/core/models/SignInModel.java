/*
 *
 */

package ca.sunlife.web.cms.core.models;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.regex.Pattern;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.RepositoryException;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.services.SiteConfigService;

/**
 * The Class SigninModel.
 *
 * @author TCS
 * @version 1.0
 */
@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, adapters = SignInModel.class, resourceType = "sunlife/core/components/content/sign-in")
public class SignInModel {

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(SignInModel.class);
	
	/** The config service. */
    @ Inject
    private SiteConfigService configService;
    
    /** The current page. */
    @ ScriptVariable
    private Page currentPage;
    
    /** The Constant DOMAIN_STR. */
    private static final String DOMAIN_STR = "domain";
    
    /** The Constant MFA_DOMAIN_PATH. */
    private static final String MFA_DOMAIN_PATH = "mfaDomainPath";
    
	/** The Constant SEPARATOR. */
	private static final String SEPARATOR = "|";

	/** The signInHeadingText. */
	@Inject
	@Via("resource")
	private String signInHeadingText;

	/** The mobileAppBadge. */
	@Inject
	@Via("resource")
	private String mobileAppBadge;

	/** The mobileAppBadgeLink. */
	@Inject
	@Via("resource")
	private String mobileAppBadgeLink;

	/** The accessIDPlaceholder. */
	@Inject
	@Via("resource")
	private String accessIDPlaceholder;

	/** The passwordPlaceholder. */
	@Inject
	@Via("resource")
	private String passwordPlaceholder;

	/** The checkboxLabel. */
	@Inject
	@Via("resource")
	private String checkboxLabel;

	/** The disableRememberMe. */
	@Inject
	@Via("resource")
	private String disableRememberMe;

	/** The signInButtonLabel. */
	@Inject
	@Via("resource")
	private String signInButtonLabel;

	/** The formActionUrl. */
	@Inject
	@Via("resource")
	private String formActionUrl;

	/** The forgotAccessIdLabel. */
	@Inject
	@Via("resource")
	private String forgotAccessIdLabel;

	/** The forgotAccessIdLink. */
	@Inject
	@Via("resource")
	private String forgotAccessIdLink;

	/** The forgotPasswordLabel. */
	@Inject
	@Via("resource")
	private String forgotPasswordLabel;

	/** The forgotPasswordLink. */
	@Inject
	@Via("resource")
	private String forgotPasswordLink;

	/** The signInBottomText. */
	@Inject
	@Via("resource")
	private String signInBottomText;

	/** The domain. */
	@Inject
	@Via("resource")
	private String domain;
	
	/** The language. */
	@Inject
	@Via("resource")
	private String language;

	/** The logLang. */
	@Inject
	@Via("resource")
	private String logLang;

	/** The target. */
	private String target;
	
	/** The mfaDomainPath. */
	private String mfaDomainPath;
	
	/** The isTargetPathAbsolute. */
	@Inject
	@Via("resource")
	private String isTargetPathAbsolute;

	/** The errorMsgPlaceholder. */
	@Inject
	@Via("resource")
	private String errorMsgPlaceholder;

	/** The errorRedirectPath. */
	@Inject
	@Via("resource")
	private String errorRedirectPath;
	
	/** The hiddenMetadata. */
	@Inject
	@Via("resource")
	private List<HiddenMetadataModel> hiddenMetadata;

	/**
	 * @return the signInHeadingText
	 */
	public String getSignInHeadingText() {
		return signInHeadingText;
	}

	/**
	 * @param signInHeadingText
	 *            the signInHeadingText to set
	 */
	public void setSignInHeadingText(final String signInHeadingText) {
		this.signInHeadingText = signInHeadingText;
	}

	/**
	 * @return the mobileAppBadge
	 */
	public String getMobileAppBadge() {
		return mobileAppBadge;
	}

	/**
	 * @param mobileAppBadge
	 *            the mobileAppBadge to set
	 */
	public void setMobileAppBadge(final String mobileAppBadge) {
		this.mobileAppBadge = mobileAppBadge;
	}

	/**
	 * @return the mobileAppBadgeLink
	 */
	public String getMobileAppBadgeLink() {
		return mobileAppBadgeLink;
	}

	/**
	 * @param mobileAppBadgeLink
	 *            the mobileAppBadgeLink to set
	 */
	public void setMobileAppBadgeLink(final String mobileAppBadgeLink) {
		this.mobileAppBadgeLink = mobileAppBadgeLink;
	}

	/**
	 * @return the accessIDPlaceholder
	 */
	public String getAccessIDPlaceholder() {
		return accessIDPlaceholder;
	}

	/**
	 * @param accessIDPlaceholder
	 *            the accessIDPlaceholder to set
	 */
	public void setAccessIDPlaceholder(final String accessIDPlaceholder) {
		this.accessIDPlaceholder = accessIDPlaceholder;
	}

	/**
	 * @return the passwordPlaceholder
	 */
	public String getPasswordPlaceholder() {
		return passwordPlaceholder;
	}

	/**
	 * @param passwordPlaceholder
	 *            the passwordPlaceholder to set
	 */
	public void setPasswordPlaceholder(final String passwordPlaceholder) {
		this.passwordPlaceholder = passwordPlaceholder;
	}

	/**
	 * @return the checkboxLabel
	 */
	public String getCheckboxLabel() {
		return checkboxLabel;
	}

	/**
	 * @param checkboxLabel
	 *            the checkboxLabel to set
	 */
	public void setCheckboxLabel(final String checkboxLabel) {
		this.checkboxLabel = checkboxLabel;
	}
	
	/**
	 * @return the disableRememberMe
	 */
	public String getDisableRememberMe() {
		return disableRememberMe;
	}

	/**
	 * @param disableRememberMe the disableRememberMe to set
	 */
	public void setDisableRememberMe(final String disableRememberMe) {
		this.disableRememberMe = disableRememberMe;
	}

	/**
	 * @return the signInButtonLabel
	 */
	public String getSignInButtonLabel() {
		return signInButtonLabel;
	}

	/**
	 * @param signInButtonLabel
	 *            the signInButtonLabel to set
	 */
	public void setSignInButtonLabel(final String signInButtonLabel) {
		this.signInButtonLabel = signInButtonLabel;
	}

	/**
	 * @return the formActionUrl
	 */
	public String getFormActionUrl() {
		return formActionUrl;
	}

	/**
	 * @param formActionUrl
	 *            the formActionUrl to set
	 */
	public void setFormActionUrl(final String formActionUrl) {
		this.formActionUrl = formActionUrl;
	}

	/**
	 * @return the forgotAccessIdLabel
	 */
	public String getForgotAccessIdLabel() {
		return forgotAccessIdLabel;
	}

	/**
	 * @param forgotAccessIdLabel
	 *            the forgotAccessIdLabel to set
	 */
	public void setForgotAccessIdLabel(final String forgotAccessIdLabel) {
		this.forgotAccessIdLabel = forgotAccessIdLabel;
	}

	/**
	 * @return the forgotAccessIdLink
	 */
	public String getForgotAccessIdLink() {
		return forgotAccessIdLink;
	}

	/**
	 * @param forgotAccessIdLink
	 *            the forgotAccessIdLink to set
	 */
	public void setForgotAccessIdLink(final String forgotAccessIdLink) {
		this.forgotAccessIdLink = forgotAccessIdLink;
	}

	/**
	 * @return the forgotPasswordLabel
	 */
	public String getForgotPasswordLabel() {
		return forgotPasswordLabel;
	}

	/**
	 * @param forgotPasswordLabel
	 *            the forgotPasswordLabel to set
	 */
	public void setForgotPasswordLabel(final String forgotPasswordLabel) {
		this.forgotPasswordLabel = forgotPasswordLabel;
	}

	/**
	 * @return the forgotPasswordLink
	 */
	public String getForgotPasswordLink() {
		return forgotPasswordLink;
	}

	/**
	 * @param forgotPasswordLink
	 *            the forgotPasswordLink to set
	 */
	public void setForgotPasswordLink(final String forgotPasswordLink) {
		this.forgotPasswordLink = forgotPasswordLink;
	}

	/**
	 * @return the signInBottomText
	 */
	public String getSignInBottomText() {
		return signInBottomText;
	}

	/**
	 * @param signInBottomText
	 *            the signInBottomText to set
	 */
	public void setSignInBottomText(final String signInBottomText) {
		this.signInBottomText = signInBottomText;
	}

	/**
	 * @return the domain
	 */
	public String getDomain() {
		return domain;
	}

	/**
	 * @param domain
	 *            the domain to set
	 */
	public void setDomain(final String domain) {
		this.domain = domain;
	}

	/**
	 * @return the language
	 */
	public String getLanguage() {
		return language;
	}

	/**
	 * @param language
	 *            the language to set
	 */
	public void setLanguage(final String language) {
		this.language = language;
	}

	/**
	 * @return the logLang
	 */
	public String getLogLang() {
		return logLang;
	}

	/**
	 * @param logLang
	 *            the logLang to set
	 */
	public void setLogLang(final String logLang) {
		this.logLang = logLang;
	}

	/**
	 * @return the target
	 */
	public String getTarget() {
		return target;
	}

	/**
	 * @param target
	 *            the target to set
	 */
	public void setTarget(final String target) {
		this.target = target;
	}
	
	/**
	 * @return the mfaDomainPath
	 */
	public String getMfaDomainPath() {
		return mfaDomainPath;
	}

	/**
	 * @param mfaDomainPath the mfaDomainPath to set
	 */
	public void setMfaDomainPath(final String mfaDomainPath) {
		this.mfaDomainPath = mfaDomainPath;
	}

	/**
	 * @return the isTargetPathAbsolute
	 */
	public String getIsTargetPathAbsolute() {
		return isTargetPathAbsolute;
	}

	/**
	 * @param isTargetPathAbsolute the isTargetPathAbsolute to set
	 */
	public void setIsTargetPathAbsolute(final String isTargetPathAbsolute) {
		this.isTargetPathAbsolute = isTargetPathAbsolute;
	}

	/**
	 * @return the errorMsgPlaceholder
	 */
	public String getErrorMsgPlaceholder() {
		return errorMsgPlaceholder;
	}

	/**
	 * @param errorMsgPlaceholder
	 *            the errorMsgPlaceholder to set
	 */
	public void setErrorMsgPlaceholder(final String errorMsgPlaceholder) {
		this.errorMsgPlaceholder = errorMsgPlaceholder;
	}

	/**
	 * @return the errorRedirectPath
	 */
	public String getErrorRedirectPath() {
		return errorRedirectPath;
	}

	/**
	 * @param errorRedirectPath
	 *            the errorRedirectPath to set
	 */
	public void setErrorRedirectPath(final String errorRedirectPath) {
		this.errorRedirectPath = errorRedirectPath;
	}

	/**
	 * @return the hiddenMetadata
	 */
	public List<HiddenMetadataModel> getHiddenMetadata() {
		return Collections.unmodifiableList(hiddenMetadata);
	}

	/**
	 * @param hiddenMetadata
	 *            the hiddenMetadata to set
	 */
	public void setHiddenMetadata(final List<HiddenMetadataModel> hiddenMetadata) {
		 this.hiddenMetadata = Collections.unmodifiableList(hiddenMetadata);
	}

	/**
	 * Inits the.
	 */
	@PostConstruct
	public void init() {
		try {
		  if(null == hiddenMetadata) {
		    hiddenMetadata = new ArrayList<HiddenMetadataModel>();
		  }
			final String pagePath = currentPage.getPath();
		    final String domainName = configService.getConfigValues(DOMAIN_STR, pagePath);
		    mfaDomainPath = configService.getConfigValues(MFA_DOMAIN_PATH, pagePath);
		    
			if (null != domain && !StringUtils.isEmpty(domain)) {
				String domainTargetArray[] = domain.split(Pattern.quote(SEPARATOR));
				if (domainTargetArray.length > 1) {
					domain = domainTargetArray[0].trim();
					target = domainTargetArray[1].trim();
					LOGGER.debug("SignInModel :: domain after split is {}", domain);
					LOGGER.debug("SignInModel :: target after split is {}", target);
				}
			}
			if(null != isTargetPathAbsolute && !StringUtils.isEmpty(isTargetPathAbsolute.trim()) && isTargetPathAbsolute.trim().equalsIgnoreCase("true")) {
				if(null != domainName && !StringUtils.isEmpty(domainName.trim())) {
						if(null != target && !StringUtils.isEmpty(target.trim())) {
							target = domainName.concat(target);
						}
						LOGGER.debug("SignInModel :: target is {}", target);
			   }
		   }
		} catch (ArrayIndexOutOfBoundsException e) {
			LOGGER.error("ArrayIndexOutOfBoundsException :: init method of SignInModel :: {}", e);
		} catch (LoginException e) {
			LOGGER.error("LoginException :: init method of SignInModel :: {}", e);
		} catch (RepositoryException e) {
			LOGGER.error("RepositoryException :: init method of SignInModel :: {}", e);
		}

	}


	/**
	 * The Class HiddenMetadataModel.
	 *
	 * @author TCS
	 * @version 1.0
	 */
	@Model(adaptables = { SlingHttpServletRequest.class,
			Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
	public static class HiddenMetadataModel {

		/** The name. */
		@Inject
		private String name;

		/** The value. */
		@Inject
		private String value;

		/**
		 * @return the name
		 */
		public String getName() {
			return name;
		}

		/**
		 * @param name
		 *            the name to set
		 */
		public void setName(final String name) {
			this.name = name;
		}

		/**
		 * @return the value
		 */
		public String getValue() {
			return value;
		}

		/**
		 * @param value
		 *            the value to set
		 */
		public void setValue(final String value) {
			this.value = value;
		}

	}

}
