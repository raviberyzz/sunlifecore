package ca.sunlife.web.cms.core.services.impl;

import ca.sunlife.web.cms.core.services.druglist.DrugListConfig;
import ca.sunlife.web.cms.core.services.druglist.DrugListService;
import ca.sunlife.web.cms.core.services.druglist.ErrorReportWriter;
import ca.sunlife.web.cms.core.services.druglist.PaForm;
import com.adobe.granite.asset.api.Asset;
import com.adobe.granite.asset.api.AssetManager;
import com.adobe.granite.asset.api.AssetVersionManager;
import com.adobe.granite.asset.api.Rendition;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObjectBuilder;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Component(service = DrugListService.class, immediate = true)
@Designate(ocd = DrugListConfig.class)
public class DrugListServiceImpl implements DrugListService {

    public static final String ORIGINAL = "original";

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    private String pdfFolder;

    private String dataAssetPath;

    private String reportAssetPath;

    private final Map<String, Object> authInfo = Collections.singletonMap(
            ResourceResolverFactory.SUBSERVICE,
            "drug-list"
    );

    @Override
    public String getDataAssetPath() {
        return dataAssetPath;
    }

    @Override
    public void updateDrugLists(String paFormsPath, String lookupPath, String nonPolicyPath) throws IOException {

        ErrorReportWriter reporter = new ErrorReportWriter();

        try (ResourceResolver resourceResolver = resourceResolverFactory
                .getServiceResourceResolver(authInfo)){

            AssetManager assetManager = resourceResolver.adaptTo(AssetManager.class);
            if(assetManager == null) {
                throw new LoginException("Attempting to adapt ResourceResolver to AssetManager returned null.");
            }

            HashMap<String, PaForm> paForms = buildPaFormLookUpMap(paFormsPath, assetManager, reporter);

            JsonObjectBuilder builder = buildJsonAsset(lookupPath, assetManager, paForms,reporter);
            buildNonPolicyRecords(nonPolicyPath, assetManager, builder,reporter);

            Asset outputAsset;
            if (assetManager.assetExists(getDataAssetPath())) {
                outputAsset = assetManager.getAsset(getDataAssetPath());

                AssetVersionManager versionManager = resourceResolver.adaptTo(AssetVersionManager.class);
                if (versionManager == null) {
                    throw new LoginException("Attempting to adapt ResourceResolver to AssetVersionManager returned null.");
                }

                versionManager.createVersion(outputAsset.getPath(), UUID.randomUUID().toString());

            } else {
                outputAsset = assetManager.createAsset(getDataAssetPath());
            }

            ByteArrayInputStream stream = new ByteArrayInputStream(builder.build().toString().getBytes(StandardCharsets.UTF_8));
            outputAsset.setRendition(ORIGINAL, stream, new HashMap<>() );

            Asset reportAsset;
            if (assetManager.assetExists(reportAssetPath)) {
                reportAsset = assetManager.getAsset(reportAssetPath);
            } else {
                reportAsset = assetManager.createAsset(reportAssetPath);
            }
            ByteArrayInputStream reportStream = new ByteArrayInputStream(reporter.getReport().getBytes(StandardCharsets.UTF_8));
            reportAsset.setRendition(ORIGINAL, reportStream, new HashMap<>() );

            Session session = resourceResolver.adaptTo(Session.class);
            if (session != null) {
                session.save();
            }

        } catch (LoginException e) {
            logger.error("Can't create AssetManager", e);
        } catch (RepositoryException e) {
            logger.error("Failed to save JSON asset", e);
        }

    }

    private void buildNonPolicyRecords(String nonPolicyPath,
                                       AssetManager assetManager,
                                       JsonObjectBuilder builder,
                                       ErrorReportWriter reporter)
            throws IOException {

        Rendition nonPolicies = assetManager.getAsset(nonPolicyPath).getRendition(ORIGINAL);
        Properties nonPolicyProps = new Properties();
        nonPolicyProps.load(nonPolicies.getStream());
        JsonObjectBuilder nonPolicyBuilder = Json.createObjectBuilder();
        HashMap<String, HashMap<String, String>> nonPolicyMap = new HashMap<>();
        for(Map.Entry<Object, Object> nonPolicy : nonPolicyProps.entrySet()) {
            String key = (String)nonPolicy.getKey();
            String value = (String)nonPolicy.getValue();
            if (key.startsWith("forms.default.message")) {
                HashMap<String, String> messageMap;
                if (nonPolicyMap.containsKey("default")) {
                    messageMap = nonPolicyMap.get("default");
                } else {
                    messageMap = new HashMap<>();
                    nonPolicyMap.put("default", messageMap);
                }
                if (key.endsWith("en")) {
                    messageMap.put("message-en", value);
                } else if (key.endsWith("fr")) {
                    messageMap.put("message-fr", value);
                }
            } else {
                String[] keyParts = key.split("-");
                if (keyParts.length > 1) {
                    HashMap<String, String> messageMap;
                    if(nonPolicyMap.containsKey(keyParts[0])) {
                        messageMap = nonPolicyMap.get(keyParts[0]);
                    } else {
                        messageMap = new HashMap<>();
                        nonPolicyMap.put(keyParts[0], messageMap);
                    }

                    if("ENG".equals(keyParts[1])) {
                        messageMap.put("message-en", value);
                    } else if ("FR".equals(keyParts[1])) {
                        messageMap.put("message-fr", value);
                    } else {
                        String message = String.format("Non-policy file contained unexpected value: %s", nonPolicy.toString());
                        logger.warn(message);
                        reporter.addNonPolicyIssue(message);
                    }

                } else {
                    String message = String.format("Non-policy file contained unexpected value: %s", nonPolicy.toString());
                    logger.warn(message);
                    reporter.addNonPolicyIssue(message);
                }
            }

        }
        for(Map.Entry<String, HashMap<String, String>> entry : nonPolicyMap.entrySet()) {
            JsonObjectBuilder messages = Json.createObjectBuilder();
            for(Map.Entry<String, String> nonPolicyMessage : entry.getValue().entrySet()) {
                messages.add(nonPolicyMessage.getKey(), nonPolicyMessage.getValue());
            }
            nonPolicyBuilder.add(
                    entry.getKey(),
                    Json.createArrayBuilder()
                            .add(messages.build())
                            .build()
            );

        }
        builder.add("non-slf-policy", nonPolicyBuilder.build());
    }

    private JsonObjectBuilder buildJsonAsset(String lookupPath,
                                             AssetManager assetManager,
                                             HashMap<String, PaForm> paForms,
                                             ErrorReportWriter reporter)
            throws IOException {

        JsonBuilderFactory factory = Json.createBuilderFactory(new HashMap<String, Object>());
        JsonObjectBuilder builder;
        Workbook lookupWorkbook = readWorkbook(lookupPath, assetManager);
        if (lookupWorkbook != null) {
            Sheet lookupSheet = lookupWorkbook.getSheetAt(0);
            builder = factory.createObjectBuilder();
            JsonObjectBuilder policyBuilder = factory.createObjectBuilder();

            Row formRow = lookupSheet.getRow(1);

            for (int rowIndex = 3; rowIndex < lookupSheet.getLastRowNum() -1; rowIndex++) {
                Row policy = lookupSheet.getRow(rowIndex);
                if (policy != null && policy.getCell(1) != null) {
                    String policyNumber;
                    if (CellType.STRING.equals(policy.getCell(1).getCellTypeEnum())) {
                        policyNumber = policy.getCell(1).getStringCellValue();
                    } else if (CellType.NUMERIC.equals(policy.getCell(1).getCellTypeEnum())) {
                        policyNumber = Double.toString(policy.getCell(1).getNumericCellValue());
                        policyNumber = policyNumber.substring(0, policyNumber.length() - 2);
                    } else {
                        policyNumber = "0";
                    }
                    JsonArrayBuilder drugArray = Json.createArrayBuilder();
                    for (int colIndex = 3; colIndex < policy.getLastCellNum(); colIndex++){
                        String columnCheck;
                        if (policy.getCell(colIndex) == null) {
                            columnCheck = StringUtils.EMPTY;
                        } else if (StringUtils.isNotEmpty(policy.getCell(colIndex).getStringCellValue())){
                            columnCheck = "x";
                        } else {
                            columnCheck = StringUtils.EMPTY;
                        }
                        if (StringUtils.isNotEmpty(columnCheck)) {
                            String formName = formRow.getCell(colIndex).getStringCellValue();
                            if (!formName.endsWith("-E/F")) {
                                logger.warn("Unexpected form name: {}", formName);
                            }
                            formName = formName.substring(0, formName.lastIndexOf("-"));
                            PaForm form = paForms.get(formName);
                            if (form != null) {
                                drugArray.add(Json.createObjectBuilder()
                                        .add("drug-category-en", form.getDrugCategoriesEn())
                                        .add("drug-category-fr", form.getDrugCategoriesFr())
                                        .add("drug-name-en", form.getDrugsEn())
                                        .add("drug-name-fr", form.getDrugsFr())
                                        .add("form-en", String.format("%s/%s.pdf", pdfFolder, form.getFormNumberEn()))
                                        .add("form-fr", String.format("%s/%s.pdf", pdfFolder, form.getFormNumberFr()))
                                        .add("DIN", form.getDins().toString())
                                        .build()
                                );
                            } else {
                                String message = String.format("Could not find drug form for %s", formName);
                                logger.warn(message);
                                reporter.addFormSelectionMismatch(message);
                            }
                        }
                    }

                    policyBuilder.add(policyNumber, drugArray.build());
                }
            }
            builder.add("slf-policy", policyBuilder.build());

        } else {
            throw new IOException(String.format("Could not get lookup spreadsheet at %s.", lookupPath));
        }
        return builder;
    }

    private HashMap<String, PaForm> buildPaFormLookUpMap(String paFormsPath, AssetManager assetManager, ErrorReportWriter reporter) throws IOException {
        HashMap<String, PaForm> paForms = new HashMap<>();
        Workbook formsWorkbook = readWorkbook(paFormsPath, assetManager);
        if(formsWorkbook != null) {
            Sheet sheetEn = formsWorkbook.getSheetAt(0);
            Sheet sheetFr = formsWorkbook.getSheetAt(1);
            for(int rowIndex = sheetEn.getFirstRowNum() + 1; rowIndex <= sheetEn.getLastRowNum(); rowIndex++) {
                Row rowEn = sheetEn.getRow(rowIndex);
                Row rowFr = sheetFr.getRow(rowIndex);
                PaForm paForm = new PaForm(rowEn, rowFr);
                if (paForm.isValid()) {
                    paForms.put(paForm.getFormNumber(),paForm);
                } else if (!paForm.isBlank()){
                    String message = String.format("Rejecting row %d because it is invalid: %s",
                            rowIndex + 1,
                            paForm.getInvalidReasons().toString());
                    logger.warn(message);
                    reporter.addInvalidFormReport(message);
                }
            }
        } else {
            throw new IOException(String.format("Could not read forms spreadsheet at %s", paFormsPath));
        }
        return paForms;
    }

    private Workbook readWorkbook(String spreadsheetPath, AssetManager assetManager) throws IOException {
        Workbook result;

        if (assetManager.assetExists(spreadsheetPath)) {

            Asset spreadsheetAsset = assetManager.getAsset(spreadsheetPath);
            Rendition rendition = spreadsheetAsset.getRendition(ORIGINAL);
            InputStream inputStream = rendition.getStream();
            result = new XSSFWorkbook(inputStream);

        } else {
            result = null;
            logger.error("Cannot read spreadsheet at {} because asset does not exist.", spreadsheetPath);
        }

        return result;
    }

    @Activate
    protected final void activate(DrugListConfig config) {

        pdfFolder = config.pdf_folder();

        dataAssetPath = String.format("%s/%s", config.drug_list_asset_path(), config.drug_list_asset_name());

        reportAssetPath = String.format("%s/%s", config.drug_list_asset_path(), "druglist-workflow-report.txt");


    }

}
