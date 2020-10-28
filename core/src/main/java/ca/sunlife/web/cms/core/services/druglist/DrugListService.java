package ca.sunlife.web.cms.core.services.druglist;

import java.io.IOException;

public interface DrugListService {
    void updateDrugLists(String formsPath, String lookupPath, String nonPolicyPath) throws IOException;
    String getDataAssetPath();
}
