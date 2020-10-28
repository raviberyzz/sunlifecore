package ca.sunlife.web.cms.core.services.druglist;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Sun Life - Drug List API Configuration", description = "API configuration for Drug List Service")
public @interface DrugListConfig {

    @AttributeDefinition(name = "pdfFolder", description = "DAM folder containing the pdfs")
    String getPdfFolder() default "/content/dam/sunlife/data";

    @AttributeDefinition(name = "drugListAssetPath", description = "Path to JSON Data")
    String getDrugListAssetPath() default "/content/dam/sunlife/data";

    @AttributeDefinition(name = "drugListAssetName", description = "Name of JSON Asset")
    String getDrugListAssetName() default "druglist.json";
}
