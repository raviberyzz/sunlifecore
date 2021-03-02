package ca.sunlife.web.cms.advisorhub.models;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;

/**
 * @author yv29
 *
 */
@ Model (adaptables = SlingHttpServletRequest.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
resourceType = "sunlife/advisorhub/components/content/lumino")
public class LuminoModel {
	
	
  /** The Constant LOG. */
  private static final Logger LOG = LoggerFactory.getLogger(LuminoModel.class);
  
  /** The current page. */
  @ScriptVariable
  private Page currentPage;

  @ValueMapValue
  private String dataTitle;

  private String language;
  private String pageTitle;

  /**
   *Gets the language code from the current page locale's language
   * 
   * @return the language code
   */
   public String getLanguage() {
       return language;
   }

    /**
     * Language specific redirect host
     * @return redirect host
     */
   public String getRedirectHost() {

       StringBuilder result = new StringBuilder("lumino");

       if ("fr".equals(language)) {
           result.append("sante");
       } else {
           result.append("health");
       }
       result.append(".sunlife.ca");

       return result.toString();

   }

   public String getAnalyticsName() {
       String result;
       if (dataTitle == null) {
           result = pageTitle;
       } else {
           result = dataTitle;
       }
       return result;
   }

   @PostConstruct
    protected void initialize() {
       if (currentPage != null) {
           language = currentPage.getLanguage(false).getLanguage();

           pageTitle = currentPage.getPageTitle();
           if(pageTitle == null) {
               pageTitle = currentPage.getTitle();
           }
           if (pageTitle == null) {
               pageTitle = currentPage.getName();
           }

       } else {
           language = "en";
           LOG.warn("Failed to identify configured page language. Defaulting to \"en\"");
           pageTitle = "";
       }
   }

 }
