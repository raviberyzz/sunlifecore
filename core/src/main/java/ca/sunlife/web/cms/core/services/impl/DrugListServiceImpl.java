package ca.sunlife.web.cms.core.services.impl;

import ca.sunlife.web.cms.core.services.druglist.DrugListConfig;
import ca.sunlife.web.cms.core.services.druglist.DrugListService;
import ca.sunlife.web.cms.core.services.druglist.PaForm;
import com.adobe.granite.asset.api.Asset;
import com.adobe.granite.asset.api.AssetManager;
import com.adobe.granite.asset.api.Rendition;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
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
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Component(service = DrugListService.class, immediate = true)
@Designate(ocd = DrugListConfig.class)
public class DrugListServiceImpl implements DrugListService {

    public static final String ORIGINAL = "original";
    private final Logger logger = LoggerFactory.getLogger(getClass());

    //private final Pattern dinListPattern = Pattern.compile("^[;:`\\.]?([0-9]{8}[;:`\\.,\\u00A0]*)+\\u00A0*$");

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    private String pdfFolder;

    private final Map<String, Object> authInfo = Collections.singletonMap(
            ResourceResolverFactory.SUBSERVICE,
            "drug-list"
    );

    @Override
    public void updateDrugLists(String paFormsPath, String lookupPath) throws IOException {

        AssetManager assetManager = null;

        try (ResourceResolver resourceResolver = resourceResolverFactory
                .getServiceResourceResolver(authInfo)){

            assetManager = resourceResolver.adaptTo(AssetManager.class);

            HashMap<String, PaForm> paForms = buildPaFormLookUpMap(paFormsPath, assetManager);

            JsonObjectBuilder builder = buildJsonAsset(lookupPath, assetManager, paForms);

            Asset outputAsset;
            String assetName = pdfFolder + "/druglist.json";
            if (assetManager.assetExists(assetName)) {
                outputAsset = assetManager.getAsset(assetName);
            } else {
                outputAsset = assetManager.createAsset(assetName);
            }
            ByteArrayInputStream stream = new ByteArrayInputStream(builder.build().toString().getBytes(StandardCharsets.UTF_8));
            outputAsset.setRendition(ORIGINAL, stream, new HashMap<>() );

            resourceResolver.adaptTo(Session.class).save();

        } catch (LoginException e) {
            logger.error("Can't create AssetManager", e);
        } catch (RepositoryException e) {
            logger.error("Failed to save JSON asset", e);
        }

    }

    private JsonObjectBuilder buildJsonAsset(String lookupPath, AssetManager assetManager, HashMap<String, PaForm> paForms) throws IOException {
        Workbook lookupWorkbook = readWorkbook(lookupPath, assetManager);
        Sheet lookupSheet = lookupWorkbook.getSheetAt(0);
        JsonBuilderFactory factory = Json.createBuilderFactory(new HashMap<String, Object>());
        JsonObjectBuilder builder = factory.createObjectBuilder();
        JsonObjectBuilder policyBuilder = factory.createObjectBuilder();

        Row formRow = lookupSheet.getRow(1);

        for (int rowIndex = 4; rowIndex < lookupSheet.getLastRowNum() -1; rowIndex++) {
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
                    if (policy.getCell(colIndex) != null && "x".equals(policy.getCell(colIndex).getStringCellValue())){
                        String formName = formRow.getCell(colIndex).getStringCellValue();
                        formName = formName.substring(0, formName.length()-4);
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
                        }
                    }
                }

                policyBuilder.add(policyNumber, drugArray.build());
            }
        }
        builder.add("slf-policy", policyBuilder.build());
        return builder;
    }

    private HashMap<String, PaForm> buildPaFormLookUpMap(String paFormsPath, AssetManager assetManager) throws IOException {
        Workbook formsWorkbook = readWorkbook(paFormsPath, assetManager);
        Sheet sheetEn = formsWorkbook.getSheetAt(0);
        Sheet sheetFr = formsWorkbook.getSheetAt(1);
        HashMap<String, PaForm> paForms = new HashMap<>();
        for(int rowIndex = sheetEn.getFirstRowNum() + 1; rowIndex <= sheetEn.getLastRowNum(); rowIndex++) {
            Row rowEn = sheetEn.getRow(rowIndex);
            Row rowFr = sheetFr.getRow(rowIndex);
            PaForm paForm = new PaForm(rowEn, rowFr);
            if (paForm.isValid()) {
                paForms.put(paForm.getFormNumber(),paForm);
            } else {
                logger.debug("Rejecting row {} because it is invalid: {}", rowIndex, paForm.getInvalidReasons().toString());
            }
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

        pdfFolder = config.getPdfFolder();

    }

}
