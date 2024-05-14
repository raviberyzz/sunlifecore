package ca.sunlife.web.cms.core.osgi.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.osgi.service.metatype.annotations.Option;

/**
 * Defines the configuration parameters for Akamai CDN integration.
 * This interface is used to manage settings such as host, environment, and security credentials
 * necessary for connecting to Akamai's APIs within the Sun Life application context.
 *
 * @author TCS
 * @version 1.0
 */
@ObjectClassDefinition(name = "Sun Life - Akamai Configuration", description = "Configuration parameters for Akamai CDN.")
public @interface AkamaiConfig {

    /**
     * Retrieves the Akamai host URL.
     * 
     * @return the host URL used for Akamai requests
     */
    @AttributeDefinition(name = "host", description = "Akamai Host")
    String getHost();

    /**
     * Retrieves the configured environment for Akamai.
     * Allows administrators to select between production and staging environments.
     *
     * @return the current environment setting ('production' or 'staging')
     */
    @AttributeDefinition(
        name = "Environment",
        description = "Select akamai environment",
        options = {
            @Option(label = "PRODUCTION", value = "production"),
            @Option(label = "STAGING", value = "staging")
        }
    )
    String getEnvironment() default "production";

    /**
     * Retrieves the access key used for authenticating with Akamai APIs.
     *
     * @return the access key
     */
    @AttributeDefinition(name = "accessKey", description = "Access Key")
    String getAccessKey();

    /**
     * Retrieves the client secret associated with the Akamai API credentials.
     *
     * @return the client secret
     */
    @AttributeDefinition(name = "clientSecret", description = "Client Secret")
    String getClientSecret();

    /**
     * Retrieves the client token used in Akamai API requests.
     *
     * @return the client token
     */
    @AttributeDefinition(name = "clientToken", description = "Client Token")
    String getClientToken();
}