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


@Component(service=WorkflowProcess.class, property={"process.label=Workplace Benefits Drug List Update"})
public class ParseDrugListStep implements WorkflowProcess {

    public static final String PROCESS_ARGS = "PROCESS_ARGS";
    public static final String PAFORMS = "paforms";
    public static final String LOOKUP = "lookup";
    public static final String NONPOLICY = "nonpolicy";
    @Reference
    DrugListService drugListService;

    private String forms = "PA Forms-2A2B.xlsx";
    private String lookup = "PA Forms-Lookup.xlsx";
    private String nonpolicy = "drugList.properties";

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {

        logger.info("Starting workflow step ParseDrugListStep");

        try {
            String payload = findAssetPath(workflowSession,(String)workItem.getWorkflowData().getPayload() );
            if (args.containsKey(PROCESS_ARGS)) {
                HashMap<String, String> processMap = new HashMap<>();
                Arrays.stream(args.get(PROCESS_ARGS, String.class).split(","))
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

                if(processMap.containsKey(NONPOLICY)){
                    nonpolicy = processMap.get(NONPOLICY);
                }
            }
            String folder = payload.substring(0, payload.lastIndexOf("/"));
            drugListService.updateDrugLists(
                    String.format("%s/%s", folder, forms),
                    String.format("%s/%s", folder, lookup),
                    String.format("%s/%s", folder, nonpolicy));
        } catch (IOException | RepositoryException e) {
            throw new WorkflowException(
                    String.format("Failed to parse the drug list for files %s and %s", forms, lookup),
                    e
            );
        }


    }

    private String findAssetPath(WorkflowSession workflowSession, final String payload) throws RepositoryException {

        String result = payload;
        ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
        if (resolver != null) {

            Resource payloadResource = resolver.getResource(payload);
            while (payloadResource != null ) {
                Node node = payloadResource.adaptTo(Node.class);
                if( node != null && node.isNodeType(DamConstants.NT_DAM_ASSET)) {
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
