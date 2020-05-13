/*
 *
 */

package ca.sunlife.web.cms.core.osgi.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

/**
 * The Interface AkamaiConfig.
 *
 * @author TCS
 * @version 1.0
 */
@ ObjectClassDefinition (name = "Sun Life - Akamai Configuration", description = "Sun Life Akamai Configuration")
public @interface AkamaiConfig {

  /**
   * Gets the host.
   *
   * @return the host
   */
  @ AttributeDefinition (name = "host", description = "Akamai Host", defaultValue = "akab-q4llmyphorqyrxkf-vhrt6t6mg3kgr5z5.purge.akamaiapis.net")
  String getHost ();

  /**
   * Gets the access key.
   *
   * @return the access key
   */
  @ AttributeDefinition (name = "accessKey", description = "Access Key", defaultValue = "akab-coaxo5i7uyh25rdl-ukgkilqkilqhekri")
  String getAccessKey ();

  /**
   * Gets the client secret.
   *
   * @return the client secret
   */
  @ AttributeDefinition (name = "clientSecret", description = "Client Secret", defaultValue = "5nBJ+6AZyG6e2+tkxZWhrilX2Ys2UObM7fKB8ld0rvY=")
  String getClientSecret ();

  /**
   * Gets the client token.
   *
   * @return the client token
   */
  @ AttributeDefinition (name = "clientToken", description = "Client Token", defaultValue = "akab-7ilhfrrlqf3ak4w2-awgfokfuslr7th2u")
  String getClientToken ();

}
