package ca.sunlife.web.cms.core.workflow;

import ca.sunlife.web.cms.core.services.druglist.DrugListService;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;


@Component(service=WorkflowProcess.class, property={"process.label=Workplace Benefits Drug List Update"})
public class ParseDrugListStep implements WorkflowProcess {

    public static final String PROCESS_ARGS = "PROCESS_ARGS";
    public static final String PAFORMS = "paforms";
    public static final String LOOKUP = "lookup";
    @Reference
    DrugListService drugListService;

    private String forms = "PAForms-2A2B.xlsx";
    private String lookup = "PAForms-Lookup.xlsx";

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {

        logger.info("Starting workflow step ParseDrugListStep");
        try {
            String payload = (String)workItem.getWorkflowData().getPayload();
            if (args.containsKey(PROCESS_ARGS)) {
                HashMap<String, String> processMap = new HashMap<>();
                Arrays.stream(((String)args.get(PROCESS_ARGS)).split(","))
                        .forEach(arg -> {
                            String[] pair = arg.split("::");
                            processMap.put(pair[0], pair[1]);
                        });

                if(processMap.containsKey(PAFORMS)){
                    forms = processMap.get(PAFORMS);
                }

                if(processMap.containsKey(LOOKUP)){
                    lookup = processMap.get(LOOKUP);
                }
            }
            String folder = payload.substring(0, payload.lastIndexOf("/"));
            drugListService.updateDrugLists(String.format("%s/%s", folder, forms),
                    String.format("%s/%s", folder, lookup));
        } catch (IOException e) {
            logger.error("Failed to parse the drug list for files {} and {}", forms, lookup, e);
            throw new WorkflowException(e);
        }


    }
}
