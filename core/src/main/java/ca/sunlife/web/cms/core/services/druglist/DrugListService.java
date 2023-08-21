package ca.sunlife.web.cms.core.services.druglist;

import java.io.IOException;

/**
 * Service for updating the JSON ouptut for the Workplace Benefits Drug List.
 */
public interface DrugListService {
    /**
     * Combines the inputs into a generated JSON file. Both the inputs and the output are Assets in the DAM.
     *
     * @param formsPath the DAM path of the Excel spreadsheet of the forms
     * @param lookupPath the DAM path of the Excel spreadsheet, cross-referencing accounts to forms
     * @param nonPolicyPath the DAM path of the properies file with messages for non-policy numbers
     * @throws IOException Service failed to either read or write DAM Assets
     *
     */
    void updateDrugLists(String formsPath, String lookupPath, String nonPolicyPath) throws IOException;

    /**
     * The DAM path where the JSON Asset will be (or has been) placed. Allows service users to locate
     * the Asset.
     *
     * @return path to JSON asset.
     */
    String getDataAssetPath();
    String getChessDataAssetPath();
    String getDataAssetZipPath();

	void updateChessLists( String chessPath)
			throws IOException;
}
