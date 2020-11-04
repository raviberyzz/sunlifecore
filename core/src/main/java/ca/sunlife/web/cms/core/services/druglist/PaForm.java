package ca.sunlife.web.cms.core.services.druglist;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Row;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

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
            if (StringUtils.isEmpty(formNumberEn)) {
                invalidReasons.add("English form number is not defined.");
            } else if (!(formNumberEn.length() > 2 && formNumberEn.trim().endsWith("-E"))) {
                invalidReasons.add(String.format("English Form Number should end with -E but was %s", formNumberEn));
            }
            if (formNumberEn.isEmpty()) {
                formNumber = StringUtils.EMPTY;
                invalidReasons.add("Can't generate language-general form number.");
            } else {
                formNumber = formNumberEn.substring(0, formNumberEn.lastIndexOf("-") - 1);
            }
            formNumberFr = getCellValue(rowFr, 2);
            if (StringUtils.isEmpty(getFormNumberFr())) {
                invalidReasons.add("French form number is not defined.");
            } else if (!(formNumberFr.length() > 2 && formNumberFr.trim().endsWith("-F"))) {
                invalidReasons.add(String.format("French Form Number should end with -F but was %s", formNumberFr));
            } else {
                if (!formNumber.equals(getFormNumberFr().substring(0, getFormNumberFr().lastIndexOf("-") - 1))) {
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
            result = row.getCell(index).getStringCellValue();
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

    public final List<String> getInvalidReasons() {
        return invalidReasons;
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
        return dins;
    }

    public String getFormNumber() {
        return formNumber;
    }

    public String getFormNumberFr() {
        return formNumberFr;
    }
}
