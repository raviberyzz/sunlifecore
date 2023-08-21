package ca.sunlife.web.cms.core.services.druglist;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Sun Life - Drug List API Configuration", description = "API configuration for Drug List Service")
public @interface DrugListConfig {

    @AttributeDefinition(name = "pdfFolder", description = "DAM folder containing the pdfs")
    String pdf_folder() default "/content/dam/sunlife/data";

    @AttributeDefinition(name = "drugListAssetPath", description = "Path to JSON Data")
    String drug_list_asset_path() default "/content/dam/sunlife/data";
    
    @AttributeDefinition(name = "chessListAssetPath", description = "Path to JSON Data")
    String chess_list_asset_path() default "/content/dam/sunlife/data";

    @AttributeDefinition(name = "drugListAssetName", description = "Name of JSON Asset")
    String drug_list_asset_name() default "druglist.json";
    
    @AttributeDefinition(name = "chessListAssetName", description = "Name of JSON Asset")
    String chess_list_asset_name() default "chesslist.json";
    
    @AttributeDefinition(name = "drugListGZipAssetName", description = "Name of JSON Asset Gzip")
    String drug_list_asset_name_gzip() default "druglist.json.gz";
}
