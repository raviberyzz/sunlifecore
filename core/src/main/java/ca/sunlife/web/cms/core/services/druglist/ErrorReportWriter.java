package ca.sunlife.web.cms.core.services.druglist;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;

public class ErrorReportWriter {

    private final String formsPath;
    private final String lookupPath;
    private final String propertiesPath;

    private final StringBuilder invalidForms = new StringBuilder();
    private final HashSet<String> mismatchedForms = new HashSet<>();
    private final StringBuilder nonPolicyIssues = new StringBuilder();

    private final DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    public ErrorReportWriter(String forms, String lookup, String props) {
        this.formsPath = forms;
        this.lookupPath = lookup;
        this.propertiesPath = props;
    }

    public void addInvalidFormReport(String message) {
        invalidForms.append(message).append("\n");
    }

    public void addFormSelectionMismatch(String message) {
        mismatchedForms.add(message);
    }

    public void addNonPolicyIssue(String message) {
        nonPolicyIssues.append(message).append("\n");
    }

    public String getReport() {
        StringBuilder report = new StringBuilder();
        report.append("Report generated on ").append(dateFormat.format(new Date())).append("\n");
        report.append("===============Invalid Forms================\n");
        report.append("Source: ").append(formsPath).append("\n");
        report.append(invalidForms);
        report.append("===============Mismatched Forms=============\n");
        report.append("Source: ").append(lookupPath).append("\n");
        mismatchedForms.stream().forEach(item -> report.append(item).append("\n"));
        report.append("===============Non-Policy Issues============\n");
        report.append("Source: ").append(propertiesPath).append("\n");
        report.append(nonPolicyIssues);
        return report.toString();
    }
}
