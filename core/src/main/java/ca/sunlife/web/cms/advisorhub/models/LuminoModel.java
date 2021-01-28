package ca.sunlife.web.cms.advisorhub.models;

import javax.inject.Inject;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
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
  
  /** The searchPlaceholder text. */
  @ Inject
  private Page currentPage;

  /**
   *Gets the searchPlaceholder
   * 
   * @return the searchPlaceholder
   */
   public String getLanguage() {
	return currentPage.getLanguage(false).getLanguage();
   }

 }
