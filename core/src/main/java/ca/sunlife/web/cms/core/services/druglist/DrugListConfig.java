package ca.sunlife.web.cms.core.services.druglist;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Sun Life - Drug List API Configuration", description = "API configuration for Drug List Service")
public @interface DrugListConfig {

    @AttributeDefinition(name = "pdfFolder", description = "DAM folder containing the pdfs")
    String getPdfFolder() default "/content/assets/sunlife/data";
}
