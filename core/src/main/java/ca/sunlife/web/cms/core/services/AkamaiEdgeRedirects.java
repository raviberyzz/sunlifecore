/**
 * 
 */
package ca.sunlife.web.cms.core.services;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * The Interface AkamaiEdgeRedirects.
 *
 * @author TCS
 */
public interface AkamaiEdgeRedirects {
  
  /**
   * Publish rules.
   *
   * @param policyID
   *          the policy ID
   * @param rules
   *          the rules
   * @return the JSONObject
   * @throws JSONException 
   */
  public JSONObject publishRules(String policyID, String rules) throws JSONException;
}
