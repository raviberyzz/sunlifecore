package ca.sunlife.web.cms.advisorhub.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
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

  private String language;

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

   @PostConstruct
    protected void initialize() {
       if (currentPage != null) {
           language = currentPage.getLanguage(false).getLanguage();
       } else {
           language = "en";
           LOG.warn("Failed to identify configured page language. Defaulting to \"en\"");
       }
   }

 }
