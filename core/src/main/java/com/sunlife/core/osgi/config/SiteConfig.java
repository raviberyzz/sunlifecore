package com.sunlife.core.osgi.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
 
@ObjectClassDefinition(name = "Site configuration pages", description = "Site configuration pages")
public @interface SiteConfig {
     
    @AttributeDefinition(name = "siteConfigPath", description = "Site Config Root Path")
    String getSitePath();
     
}
