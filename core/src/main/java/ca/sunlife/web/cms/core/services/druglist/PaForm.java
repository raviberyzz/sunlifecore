package ca.sunlife.web.cms.core.services.druglist;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;

import java.math.BigDecimal;
import java.math.MathContext;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Reader for the "2A2B" spreadsheet.
 * This class attempts to record every form in that spreadsheet and associate it with its drug name as the key.
 * This is then used by the "lookup" spreadsheet; if the account says that an account includes a specific drug,
 * the details of the drug's category, form number, and DIN can be retrieved from here.
 *
 * The spreadsheet is human-authored, so errors can be introduced. This class attempts to report on those errors in
 * order to facilitate corrections in the spreadsheet.
 */
public final class PaForm {

    private final LinkedList<String> invalidReasons = new LinkedList<>();

    private String drugCategoriesEn;
    private String drugCategoriesFr;
    private String drugsEn;
    private String drugsFr;
    private String formNumber;
    private String formNumberEn;
    private String formNumberFr;
    private List<String> dins;

    public PaForm(final Row rowEn, final Row rowFr) {
        if (rowEn == null) {
            invalidReasons.add("English input row is null.");
        } else if (rowFr == null) {
            invalidReasons.add("French input row is null.");
        } else if (rowEn.getLastCellNum() < 3) {
            invalidReasons.add(String.format("Wanted at least 4 cells for English. Found %d", rowEn.getLastCellNum() + 1));
        } else if (rowFr.getLastCellNum() < 3) {
            invalidReasons.add(String.format("Wanted at least 4 cells for French. Found %d", rowFr.getLastCellNum() + 1));
        } else {
            this.drugCategoriesEn = getCellValue(rowEn, 0);
            if (StringUtils.isEmpty(drugCategoriesEn)) {
                invalidReasons.add("English Drug Categories is not defined.");
            }

            this.drugCategoriesFr = getCellValue(rowFr, 0);
            if (StringUtils.isEmpty(drugCategoriesFr)) {
                invalidReasons.add("French Drug Categories is not defined.");
            }

            drugsEn = getCellValue(rowEn, 1);
            if (drugsEn.isEmpty()) {
                invalidReasons.add("English Drugs is not defined.");
            }

            drugsFr = getCellValue(rowFr, 1);
            if (drugsFr.isEmpty()) {
                invalidReasons.add("French Drugs is not defined.");
            }

            formNumberEn = getCellValue(rowEn, 2);
            if(StringUtils.isNotEmpty(formNumberEn)) {
                formNumberEn = formNumberEn.trim();
            }
            if (StringUtils.isEmpty(formNumberEn)) {
                invalidReasons.add("English form number is not defined.");
            } else if (!(formNumberEn.length() > 2 && formNumberEn.trim().endsWith("-E"))) {
                invalidReasons.add(String.format("English Form Number should end with -E but was %s", formNumberEn));
            }
            if (formNumberEn.isEmpty()) {
                formNumber = StringUtils.EMPTY;
                invalidReasons.add("Can't generate language-general form number.");
            } else {
                formNumber = formNumberEn.substring(0, formNumberEn.lastIndexOf("-") );
            }
            formNumberFr = getCellValue(rowFr, 2);
            if(StringUtils.isNotEmpty(formNumberFr)) {
                formNumberFr = formNumberFr.trim();
            }
            if (StringUtils.isEmpty(getFormNumberFr())) {
                invalidReasons.add("French form number is not defined.");
            } else if (!(formNumberFr.length() > 2 && formNumberFr.trim().endsWith("-F"))) {
                invalidReasons.add(String.format("French Form Number should end with -F but was %s", formNumberFr));
            } else {
                if (!formNumber.equals(getFormNumberFr().substring(0, getFormNumberFr().lastIndexOf("-") ))) {
                    invalidReasons.add(String.format("English form number %s and French form number %s don't match", formNumberEn, formNumberFr));
                }
            }
            dins = Arrays.stream(getCellValue(rowEn, 3)
                    .split("[,:;]"))
                    .filter(din -> StringUtils.isNotEmpty(din))
                    .map(din -> din.replaceAll("[^\\d]", ""))
                    .collect(Collectors.toList());
            if (dins.isEmpty()) {
                invalidReasons.add("DIN is not defined.");
            }
        }


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

    public String getDrugCategoriesEn() {
        return drugCategoriesEn;
    }

    public String getDrugCategoriesFr() {
        return drugCategoriesFr;
    }

    public final boolean isValid() {
        return invalidReasons.isEmpty();
    }

    public final boolean isBlank() {
        return invalidReasons.size() >= 8;
    }

    public final List<String> getInvalidReasons() {
        return Collections.unmodifiableList(invalidReasons);
    }

    public String getDrugsEn() {
        return drugsEn;
    }

    public String getDrugsFr() {
        return drugsFr;
    }

    public String getFormNumberEn() {
        return formNumberEn;
    }

    public List<String> getDins() {
        return Collections.unmodifiableList(dins);
    }

    public String getFormNumber() {
        return formNumber;
    }

    public String getFormNumberFr() {
        return formNumberFr;
    }
}
