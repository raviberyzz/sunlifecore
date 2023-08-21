/**
 * 
 */
package ca.sunlife.web.cms.core.filters;

import org.apache.commons.lang.StringUtils;

import com.day.cq.replication.Agent;
import com.day.cq.replication.AgentFilter;

/**
 * @author TCS
 *
 */
public class DispatcherReplicationAgentFilter implements AgentFilter {

  /* (non-Javadoc)
   * @see com.day.cq.replication.AgentFilter#isIncluded(com.day.cq.replication.Agent)
   */
  @ Override
  public boolean isIncluded(final Agent agent) {
    return StringUtils.equals("flush", agent.getConfiguration().getSerializationType()) && agent.isEnabled();
  }
  
}
