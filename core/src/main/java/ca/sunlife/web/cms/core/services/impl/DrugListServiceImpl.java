package ca.sunlife.web.cms.core.services.impl;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.math.MathContext;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.UUID;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObjectBuilder;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.granite.asset.api.AssetVersionManager;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.AssetManager;
import com.day.cq.dam.api.Rendition;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.Replicator;

import ca.sunlife.web.cms.core.services.druglist.DrugListConfig;
import ca.sunlife.web.cms.core.services.druglist.DrugListKey;
import ca.sunlife.web.cms.core.services.druglist.DrugListService;
import ca.sunlife.web.cms.core.services.druglist.ErrorReportWriter;
import ca.sunlife.web.cms.core.services.druglist.PaForm;


/**
 * converts inputs into the drug list. See updateDrugList method.
 */
@Component(service = DrugListService.class, immediate = true)
@Designate(ocd = DrugListConfig.class)
public class DrugListServiceImpl implements DrugListService {

    public static final String ORIGINAL = "original";
    public static final String APPLICATION_JSON = "application/json";
    public static final String APPLICATION_GZIP = "application/gzip";

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Reference
    private ResourceResolverFactory resourceResolverFactory;
    
    @Reference
    private Replicator replicator;

    private String pdfFolder;

	private String dataAssetPath;
	
	private String chessDataAssetPath;

	private String dataAssetZipPath;

    private String reportAssetPath;

    private final Map<String, Object> authInfo = Collections.singletonMap(
            ResourceResolverFactory.SUBSERVICE,
            "drug-list"
    );

    /**
     * Provides the DAM path where generated JSON data and reports can be found.
     * @return the DAM path.
     */
    @Override
    public String getDataAssetPath() {
        return dataAssetPath;
    }
    
    @Override
	public String getChessDataAssetPath() {
		return chessDataAssetPath;
	}

	/**
	 * Provides the DAM path where generated JSON zip file can be found.
	 *
	 * @return the DAM path.
	 */
	@Override
	public String getDataAssetZipPath() {
		return dataAssetZipPath;
	}

    /**
     * This service reads four input files and converts them to a JSON asset, providing drug form information for a
     * list of accounts.
     *
     * @param paFormsPath the DAM path of the Excel spreadsheet providing form details
     * @param lookupPath the DAM path of the Excel spreadsheet, cross-referencing accounts to forms
     * @param nonPolicyPath the DAM path of the properies file with messages for non-policy numbers
     * @param chessPath the DAM path of the csv file listing which accounts use the "******" lookup key.
     * @throws IOException
     */
    @Override
    public void updateDrugLists(String paFormsPath, String lookupPath, String nonPolicyPath) throws IOException {

        ErrorReportWriter reporter = new ErrorReportWriter(paFormsPath, lookupPath, nonPolicyPath);

        try (ResourceResolver resourceResolver = resourceResolverFactory
                .getServiceResourceResolver(authInfo)){

            AssetManager assetManager = resourceResolver.adaptTo(AssetManager.class);
            if(assetManager == null) {
                throw new LoginException("Attempting to adapt ResourceResolver to AssetManager returned null.");
            }

            HashMap<DrugListKey, PaForm> paForms = buildPaFormLookUpMap(paFormsPath, resourceResolver, reporter);

            JsonObjectBuilder builder = buildJsonAsset(lookupPath, resourceResolver, paForms, reporter);

            buildNonPolicyRecords(nonPolicyPath, resourceResolver, builder, reporter);
            
            String assetPath = getDataAssetPath();

            writeDataAsset(resourceResolver, assetManager, builder , assetPath);

            writeReportAsset(reporter, assetManager);

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
    /**
     * This service reads four input files and converts them to a JSON asset, providing chess form information for a
     * list of accounts.
     * @param chessPath the DAM path of the csv file listing which accounts use the "******" lookup key.
     */
	@Override
    public void updateChessLists(String chessPath) throws IOException {
		logger.info("entered the method updatechesslists");
        try (ResourceResolver resourceResolver = resourceResolverFactory
                .getServiceResourceResolver(authInfo)){
        	logger.debug("ResourceResolver={}", resourceResolver);
            AssetManager assetManager = resourceResolver.adaptTo(AssetManager.class);
            logger.debug("assetManager={}", assetManager);
            if(assetManager == null) {
                throw new LoginException("Attempting to adapt ResourceResolver to AssetManager returned null.");
            }

            JsonBuilderFactory factory = Json.createBuilderFactory(new HashMap<String, Object>());
            logger.debug("factory={}", factory);
            JsonObjectBuilder builder = factory.createObjectBuilder();
            logger.debug("builder={}", builder);

            builder.add("chess", createChessArrayBuilder(chessPath, resourceResolver).build());
            logger.debug("builder after add={}", builder);
            String assetPath = getChessDataAssetPath();
            writeDataAsset(resourceResolver, assetManager, builder, assetPath);

            Session session = resourceResolver.adaptTo(Session.class);
            
            if (session != null) {
                session.save();
                try {
                	replicator.replicate(session,ReplicationActionType.ACTIVATE,assetPath);
				} catch (ReplicationException e) {
					logger.error("Replication failed", e);
				}
                           }

        } catch (LoginException e) {
            logger.error("Can't create AssetManager", e);
        } catch (RepositoryException e) {
            logger.error("Failed to save JSON asset", e);
        }

    }
	
	
    private JsonArrayBuilder createChessArrayBuilder(String chessPath, ResourceResolver resolver)
            throws IOException {

        JsonArrayBuilder chessArray = Json.createArrayBuilder();

        //build chess accounts
        Asset chessAsset = retrieveAsset(resolver, chessPath);
        if(chessAsset != null){
            Rendition chessCsv = chessAsset.getRendition(ORIGINAL);

            try (
                    BufferedReader reader = new BufferedReader(
                            new InputStreamReader(chessCsv.getStream(), StandardCharsets.UTF_8)
                    )
            ) {
                for (String line = reader.readLine(); line != null; line = reader.readLine()) {
                    String[] values = line.split(",");
                    if (values.length >= 2 && "Y".equals(values[1])) {
                        chessArray.add(values[0].replaceFirst("^0+(?!$)",""));
                    }
                }
            }
        } else {
            throw new IOException(String.format("No chess asset found at %s", chessPath));
        }
        return chessArray;
    }

    private Asset retrieveAsset(ResourceResolver resolver, String path) {
    	logger.info("entered retrieveasset");
        Asset result = null;

        Resource resource = resolver.getResource(path);
        logger.debug("resource={}", resource);
        if (resource != null) {
            result = resource.adaptTo(Asset.class);
        }
        logger.debug("result={}", result);

        return result;
    }

	/**
	 * Converts the JSON data to a DAM asset
	 *
	 * @param resourceResolver
	 *            adapts to an AssetVersionManager
	 * @param assetManager
	 *            facilitates asset writing
	 * @param builder
	 *            the JSON Data
	 * @throws LoginException
	 *             indicates user doesn't have access to the DAM.
	 */
	private void writeDataAsset(ResourceResolver resourceResolver, AssetManager assetManager, JsonObjectBuilder builder, String assetPath)
            throws LoginException, IOException {
		logger.info("entered writedata asset");

        String json = builder.build().toString();
        logger.debug("json={}", json);
		Asset outputAsset = retrieveAsset(resourceResolver, assetPath);
		logger.debug("outputAsset={}", outputAsset);
		if (outputAsset == null) {
            try( ByteArrayInputStream stream = new ByteArrayInputStream(json.getBytes(StandardCharsets.UTF_8))) {

                assetManager.createAsset(assetPath, stream, APPLICATION_JSON, false);
            }

		} else {

            AssetVersionManager versionManager = resourceResolver.adaptTo(AssetVersionManager.class);
            logger.debug("versionManager={}", versionManager);
            if (versionManager == null) {
                throw new LoginException("Attempting to adapt ResourceResolver to AssetVersionManager returned null.");
            }

            versionManager.createVersion(outputAsset.getPath(), UUID.randomUUID().toString());
            try( ByteArrayInputStream stream = new ByteArrayInputStream(json.getBytes(StandardCharsets.UTF_8))) {
                outputAsset.addRendition(ORIGINAL, stream, APPLICATION_JSON);
            }
		}

		//compressGZip(assetManager, json);
	}

	/*
	void compressGZip( AssetManager assetManager, String json)
			throws IOException {

        File tmpdrugListJSONGZip = File.createTempFile("druglist.json", ".gz");

	    try {

            try(
                    ByteArrayInputStream inputStreamFromJSON = new ByteArrayInputStream(json.getBytes(StandardCharsets.UTF_8));
                    OutputStream outStream = FileUtils.openOutputStream(tmpdrugListJSONGZip);
                    GZIPOutputStream gos = new GZIPOutputStream(outStream)
            ) {
                // copy file
                byte[] buffer = new byte[1024];
                int len;
                while ((len = inputStreamFromJSON.read(buffer)) > 0) {
                    gos.write(buffer, 0, len);
                }
                gos.finish();
            }

            try(
                    InputStream inputStreamFromGZip =  FileUtils.openInputStream(tmpdrugListJSONGZip);
            ) {
                assetManager.createAsset(String.format("%s.gz", getDataAssetPath()), inputStreamFromGZip, APPLICATION_GZIP, false);
            }

        } finally {
            FileUtils.deleteQuietly(tmpdrugListJSONGZip);
        }
	}

	 */

	/**
	 * Turns the collected report writer data into an Asset.
	 *
	 * @param reporter
	 * @param assetManager
	 */
    private void writeReportAsset(ErrorReportWriter reporter, AssetManager assetManager) {
        Asset reportAsset;
        ByteArrayInputStream reportStream = new ByteArrayInputStream(reporter.getReport().getBytes(StandardCharsets.UTF_8));
        assetManager.createAsset(reportAssetPath, reportStream, "text/plain", false);
    }

    /**
     * Reads the non-policy property file and coverts the messages (displayed to the user on entering an invalid policy
     * number) to JSON.
     *
     * @param nonPolicyPath
     * @param resolver
     * @param builder
     * @param reporter
     * @throws IOException
     */
    private void buildNonPolicyRecords(String nonPolicyPath,
                                       ResourceResolver resolver,
                                       JsonObjectBuilder builder,
                                       ErrorReportWriter reporter)
            throws IOException {

        Asset nonPolicy = retrieveAsset(resolver, nonPolicyPath);
        if (nonPolicy != null) {
            Rendition nonPolicies = nonPolicy.getRendition(ORIGINAL);
            Properties nonPolicyProps = new Properties();
            nonPolicyProps.load(nonPolicies.getStream());

            HashMap<String, HashMap<String, String>> nonPolicyMap = createNonPolicyMessageMap(reporter, nonPolicyProps);

            JsonObjectBuilder nonPolicyBuilder = Json.createObjectBuilder();

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
        } else {
            throw new IOException(String.format("failed to read non-policy properties asset at %s", nonPolicyPath));
        }
    }

    private HashMap<String, HashMap<String, String>> createNonPolicyMessageMap(ErrorReportWriter reporter, Properties nonPolicyProps) {
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
        return nonPolicyMap;
    }

    /**
     * Reads each row from the lookup spreasheet and attempts to convert it to a record in the JSON.
     *
     * @param lookupPath location of the lookup spreadsheet
     * @param resolver allows access to the input files on the DAM
     * @param paForms map for cross-referencing drug names to form details
     * @param reporter error report writer for identifying input problems to the user.
     * @return the JSON object representing the account/form data.
     * @throws IOException
     */
    private JsonObjectBuilder buildJsonAsset(String lookupPath,
                                             ResourceResolver resolver,
                                             HashMap<DrugListKey, PaForm> paForms,
                                             ErrorReportWriter reporter)
            throws IOException {

        JsonBuilderFactory factory = Json.createBuilderFactory(new HashMap<String, Object>());
        JsonObjectBuilder builder;
        Workbook lookupWorkbook = readWorkbook(lookupPath, resolver);
        if (lookupWorkbook != null) {
            Sheet lookupSheet = lookupWorkbook.getSheetAt(0);
            builder = factory.createObjectBuilder();
            JsonObjectBuilder policyBuilder = factory.createObjectBuilder();

            Row categoryRow = lookupSheet.getRow(0);
            Row formRow = lookupSheet.getRow(1);
            Row drugRow = lookupSheet.getRow(2);

            List<Integer> testRow = new LinkedList<>();
            testRow.add(3);
            JsonArrayBuilder testArray = createDrugArrayBuilder(paForms, reporter, formRow, categoryRow, drugRow,
                    lookupSheet, testRow, true);
            policyBuilder.add("*#*#*", testArray.build());

            HashMap<String, List<Integer>> policyNumberMap = new HashMap<>();
            for (int precheckIndex = 3; precheckIndex < lookupSheet.getLastRowNum() -1; precheckIndex++) {
                Row checkP = lookupSheet.getRow(precheckIndex);
                if (checkP != null && checkP.getCell(1) != null) {
                    String checkPNum = getCellValue(checkP, 1).replaceFirst("^0*", "");
                    if (!policyNumberMap.containsKey(checkPNum)) {
                        LinkedList<Integer> rows = new LinkedList<>();
                        rows.add(precheckIndex);
                        policyNumberMap.put(checkPNum, rows);
                    } else {
                        policyNumberMap.get(checkPNum).add(precheckIndex);
                    }
                }
            }

            for (int rowIndex = 3; rowIndex < lookupSheet.getLastRowNum() -1; rowIndex++) {
                Row policy = lookupSheet.getRow(rowIndex);
                if (policy != null && policy.getCell(1) != null) {
                    String policyNumber = getCellValue(policy, 1);
                    if (CellType.STRING.equals(policy.getCell(1).getCellTypeEnum())) {
                        policyNumber = policy.getCell(1).getStringCellValue().replaceFirst("^0*","");
                    } else if (CellType.NUMERIC.equals(policy.getCell(1).getCellTypeEnum())) {
                        policyNumber = Double.toString(policy.getCell(1).getNumericCellValue());
                        policyNumber = policyNumber.substring(0, policyNumber.length() - 2);
                    } else {
                        policyNumber = "0";
                    }

                    if (policyNumberMap.containsKey(policyNumber)){
                        JsonArrayBuilder drugArray = createDrugArrayBuilder(paForms, reporter, formRow, categoryRow, drugRow,
                                lookupSheet, policyNumberMap.get(policyNumber), false);
                        policyBuilder.add(policyNumber, drugArray.build());
                    }
                }
            }
            builder.add("slf-policy", policyBuilder.build());

        } else {
            throw new IOException(String.format("Could not get lookup spreadsheet at %s.", lookupPath));
        }
        return builder;
    }

    private JsonArrayBuilder createDrugArrayBuilder(HashMap<DrugListKey, PaForm> paForms, ErrorReportWriter reporter,
                                                    Row formRow, Row categoryRow, Row drugRow, Sheet lookupSheet, List<Integer> policyRows,
                                                    boolean isTestpolicy) {
        Row policy = lookupSheet.getRow(policyRows.get(0));
        JsonArrayBuilder drugArray = Json.createArrayBuilder();
        for (int colIndex = 3; colIndex < policy.getLastCellNum(); colIndex++) {
            String columnCheck = getColumnCheck(isTestpolicy, lookupSheet, policyRows, colIndex);
            if (StringUtils.isNotEmpty(columnCheck)) {
                String formName = formRow.getCell(colIndex).getStringCellValue();
                if (!formName.endsWith("-E/F")) {
                    logger.warn("Unexpected form name: {}", formName);
                }
                formName = formName.substring(0, formName.lastIndexOf("-"));
                DrugListKey drugKey = new DrugListKey(
                        getCellValue(categoryRow, colIndex),
                        getCellValue(drugRow, colIndex)
                );
                PaForm form = paForms.get(drugKey);
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
                    String message = String.format("Could not find drug form for %s, %s, %s", formName, drugKey.getCategory(), drugKey.getName());
                    logger.warn(message);
                    reporter.addFormSelectionMismatch(message);
                }
            }
        }
        return drugArray;
    }

    private String getColumnCheck(boolean isTestpolicy, Sheet policySheet, List<Integer> rowList, int colIndex) {
        String columnCheck = StringUtils.EMPTY;
        Iterator<Integer> iter = rowList.iterator();
        while(iter.hasNext()) {
            Row policy = policySheet.getRow(iter.next());
            if (policy.getCell(colIndex) == null) {
                columnCheck = StringUtils.EMPTY;
            } else if (StringUtils.isNotBlank(policy.getCell(colIndex).getStringCellValue())) {
                columnCheck = "x";
            } else if (isTestpolicy){
                columnCheck = "x";
            }else {
                columnCheck = StringUtils.EMPTY;
            }
            if(StringUtils.isNotEmpty(columnCheck)){
                break;
            }
        }
        return columnCheck;
    }

    /**
     * Reads the 2A2B forms spreadsheet and converts it to a HashMap keyed to drug names, containing form details.
     *
     * @param paFormsPath
     * @param resolver
     * @param reporter
     * @return
     * @throws IOException
     */
    private HashMap<DrugListKey, PaForm> buildPaFormLookUpMap(String paFormsPath, ResourceResolver resolver, ErrorReportWriter reporter) throws IOException {
        HashMap<DrugListKey, PaForm> paForms = new HashMap<>();
        Workbook formsWorkbook = readWorkbook(paFormsPath, resolver);
        if(formsWorkbook != null) {
            Sheet sheetEn = formsWorkbook.getSheetAt(0);
            Sheet sheetFr = formsWorkbook.getSheetAt(1);
            for(int rowIndex = sheetEn.getFirstRowNum() + 1; rowIndex <= sheetEn.getLastRowNum(); rowIndex++) {
                Row rowEn = sheetEn.getRow(rowIndex);
                Row rowFr = sheetFr.getRow(rowIndex);
                PaForm paForm = new PaForm(rowEn, rowFr);
                if (paForm.isValid()) {
                    DrugListKey drugKey = new DrugListKey(
                            paForm.getDrugCategoriesEn(),
                            paForm.getDrugsEn()
                    );
                    paForms.put(drugKey, paForm);
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

    /**
     * General code for opening a spreadsheet.
     *
     * @param spreadsheetPath
     * @param resolver
     * @return
     * @throws IOException
     */
    private Workbook readWorkbook(String spreadsheetPath, ResourceResolver resolver) throws IOException {
        Workbook result;

        Asset spreadsheetAsset = retrieveAsset(resolver, spreadsheetPath);

        if (spreadsheetAsset != null) {

            Rendition rendition = spreadsheetAsset.getRendition(ORIGINAL);
            InputStream inputStream = rendition.getStream();
            result = new XSSFWorkbook(inputStream);

        } else {
            result = null;
            logger.error("Cannot read spreadsheet at {} because asset does not exist.", spreadsheetPath);
        }

        return result;
    }

    private String getCellValue(Row row, int index) {
        String result = StringUtils.EMPTY;
        if (row.getCell(index) != null) {
            CellType type = row.getCell(index).getCellTypeEnum();
            if (CellType.STRING.equals(type)) {
                result = row.getCell(index).getStringCellValue();
            } else if (CellType.NUMERIC.equals(type)) {
                double number = row.getCell(index).getNumericCellValue();
                result = new BigDecimal(number).round(new MathContext(0)).toString();
            } else {
                result = StringUtils.EMPTY;
            }
        }
        return result;
    }

    @Activate
    protected final void activate(DrugListConfig config) {

        pdfFolder = config.pdf_folder();

		dataAssetPath = String.format("%s/%s", config.drug_list_asset_path(), config.drug_list_asset_name());

		dataAssetZipPath = String.format("%s/%s", config.drug_list_asset_path(), config.drug_list_asset_name_gzip());

        reportAssetPath = String.format("%s/%s", config.drug_list_asset_path(), "druglist-workflow-report.txt");

        chessDataAssetPath= String.format("%s/%s", config.chess_list_asset_path(), config.chess_list_asset_name());
    }


}
