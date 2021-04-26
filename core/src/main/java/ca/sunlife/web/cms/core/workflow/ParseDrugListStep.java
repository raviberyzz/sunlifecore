package ca.sunlife.web.cms.core.workflow;

import ca.sunlife.web.cms.core.services.druglist.DrugListService;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.day.cq.dam.api.DamConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;

/**
 * Workflow for generating the workplace benefits drug list.
 *
 * This process relies on 4 input files: 1. "2A2B" spreadsheet. This contains
 * the form details for the drug 2. "Look-Up" spreadsheet. This cross-references
 * drugs to accounts. 3. "Non-policy" properties file. This provides messages
 * that are displayed when the user looks up an account that is not in the list.
 * 4. "Chess" csv file. A list of accounts that use the "******" account in the
 * lookup spreadsheet.
 */
@Component(service = WorkflowProcess.class, property = { "process.label=Workplace Benefits Drug List Update" })
public class ParseDrugListStep implements WorkflowProcess {

	public static final String PROCESS_ARGS = "PROCESS_ARGS";
	public static final String PAFORMS = "paforms";
	public static final String LOOKUP = "lookup";
	public static final String NONPOLICY = "nonpolicy";
	public static final String CHESS = "chess";

	@Reference
	DrugListService drugListService;

	/*
	 * private String forms = "PA Forms-2A2B.xlsx"; 
	 * private String lookup ="PA Forms-Lookup.xlsx"; 
	 * private String nonpolicy = "drugList.properties";
	 * private String chess = "NewPAForm.csv";
	 */

	private final Logger logger = LoggerFactory.getLogger(getClass());

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {

		logger.info("Starting workflow step ParseDrugListStep");
		String forms = null;
		String lookup = null;
		String nonpolicy = null;
		String chess = null;
		try {
			String payload = findAssetPath(workflowSession, (String) workItem.getWorkflowData().getPayload());
			if (args.containsKey(PROCESS_ARGS)) {
				HashMap<String, String> processMap = new HashMap<>();
				Arrays.stream(args.get(PROCESS_ARGS, String.class).split(",")).forEach(arg -> {
					String[] pair = arg.split("::");
					processMap.put(pair[0], pair[1]);
				});

				if (processMap.containsKey(PAFORMS)) {
					forms = processMap.get(PAFORMS);
				}

				if (processMap.containsKey(LOOKUP)) {
					lookup = processMap.get(LOOKUP);
				}

				if (processMap.containsKey(NONPOLICY)) {
					nonpolicy = processMap.get(NONPOLICY);
				}

				if (processMap.containsKey(CHESS)) {
					chess = processMap.get(CHESS);
					logger.debug("value of chess ={}", chess);
				}

				String folder = payload.substring(0, payload.lastIndexOf("/"));
				if (chess == null) {
					drugListService.updateDrugLists(String.format("%s/%s", folder, forms),
							String.format("%s/%s", folder, lookup), String.format("%s/%s", folder, nonpolicy));
				} else {
					logger.debug("entered else part");
					drugListService.updateChessLists(String.format("%s/%s", folder, chess));
				}
			}
		} catch (IOException | RepositoryException e) {
			throw new WorkflowException(
					String.format("Failed to parse the drug list for files %s and %s", forms, lookup), e);
		}

	}

	private String findAssetPath(WorkflowSession workflowSession, final String payload) throws RepositoryException {

		String result = payload;
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		if (resolver != null) {

			Resource payloadResource = resolver.getResource(payload);
			while (payloadResource != null) {
				Node node = payloadResource.adaptTo(Node.class);
				if (node != null && node.isNodeType(DamConstants.NT_DAM_ASSET)) {
					break;
				}
				payloadResource = payloadResource.getParent();
			}
			if (payloadResource != null) {
				result = payloadResource.getPath();
			} else {
				logger.warn("Failed to find asset above path {}. Attempting to use payload path.");
			}

		}

		return result;

	}
}
