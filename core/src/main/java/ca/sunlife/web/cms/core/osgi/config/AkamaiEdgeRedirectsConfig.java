package ca.sunlife.web.cms.core.osgi.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.osgi.service.metatype.annotations.Option;

/**
 * Configuration interface for managing Akamai Edge Redirect settings within Sun Life applications.
 * This interface allows for dynamic configuration of Akamai-related settings directly from the OSGi console,
 * including environment settings, host details, and timeouts.
 *
 * @author TCS
 * @version 1.0
 */
@ObjectClassDefinition(name = "Sun Life - Akamai Edge Redirects Configuration", description = "Sun Life Akamai Edge Redirects Configuration")
public @interface AkamaiEdgeRedirectsConfig {

    /**
     * Retrieves the Akamai host URL configured for edge redirects.
     * 
     * @return the host URL used for Akamai edge redirect requests
     */
    @AttributeDefinition(name = "host", description = "Akamai Host")
    String getHost();
  
    /**
     * Retrieves the environment configuration for Akamai redirects.
     * This setting allows selection between production and staging environments to align with deployment strategies.
     *
     * @return the current environment setting ('production' or 'staging')
     */
    @AttributeDefinition(
        name = "Environment",
        description = "Select Akamai environment",
        options = {
            @Option(label = "PRODUCTION", value = "production"),
            @Option(label = "STAGING", value = "staging")
        }
    )
    String getEnvironment() default "production";

    /**
     * Retrieves the access key used for authenticating with Akamai APIs for edge redirects.
     *
     * @return the access key
     */
    @AttributeDefinition(name = "accessKey", description = "Access Key")
    String getAccessKey();

    /**
     * Retrieves the client secret associated with the Akamai API credentials for edge redirects.
     *
     * @return the client secret
     */
    @AttributeDefinition(name = "clientSecret", description = "Client Secret")
    String getClientSecret();

    /**
     * Retrieves the client token used in Akamai API requests for edge redirects.
     *
     * @return the client token
     */
    @AttributeDefinition(name = "clientToken", description = "Client Token")
    String getClientToken();
  
    /**
     * Retrieves the socket timeout setting for Akamai API connections.
     * This is the maximum time in milliseconds that the connection will wait for data.
     *
     * @return the socket timeout in milliseconds
     */
    @AttributeDefinition(name = "socketTimeout", description = "Socket Timeout")
    int getSocketTimeout() default 300000;

    /**
     * Retrieves the connection timeout setting for initiating connections to Akamai.
     * This is the maximum time in milliseconds that the client will attempt to establish a connection before timing out.
     *
     * @return the connection timeout in milliseconds
     */
    @AttributeDefinition(name = "connectionTimeout", description = "Connection Timeout")
    int getConnectionTimeout() default 300000;
}
