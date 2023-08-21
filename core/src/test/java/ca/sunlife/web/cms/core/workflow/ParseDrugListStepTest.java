package ca.sunlife.web.cms.core.workflow;

import ca.sunlife.web.cms.core.services.druglist.DrugListService;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.internal.util.reflection.FieldSetter;

import javax.jcr.Node;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class ParseDrugListStepTest {

    private ParseDrugListStep subject;

    @Mock
    WorkItem workItem;

    @Mock
    WorkflowData workflowData;

    @Mock
    private WorkflowSession workflowSession;

    @Mock
    private ResourceResolver resolver;

    @Mock
    private Resource resource;

    @Mock
    private Node node;

    @Mock
    private MetaDataMap metaDataMap;

    @Mock
    DrugListService drugListService;

    @BeforeEach
    public void setUp() throws Exception {

        MockitoAnnotations.initMocks(this);
        when(workItem.getWorkflowData()).thenReturn(workflowData);
        when(workflowData.getPayload()).thenReturn("/content/dam/sunlife/data/foo.xlsx");
        when(workflowSession.adaptTo(ResourceResolver.class)).thenReturn(resolver);
        when(resolver.getResource(anyString())).thenReturn(resource);
        when(resource.adaptTo(Node.class)).thenReturn(null);
        when(node.isNodeType("dam:Asset")).thenReturn(true);

        subject = new ParseDrugListStep();

        FieldSetter.setField(subject, subject.getClass().getDeclaredField("drugListService"), drugListService);

    }

    @Test
    public void testReadParams_Aos() throws Exception {

        when(metaDataMap.containsKey(ParseDrugListStep.PROCESS_ARGS)).thenReturn(true);
        when(metaDataMap.get(ParseDrugListStep.PROCESS_ARGS, String.class))
                .thenReturn("paforms::file1.xslx,lookup::file2.xslx,nonpolicy::file3.properties");

        subject.execute(workItem, workflowSession, metaDataMap);

        verify(drugListService)
                .updateDrugLists(eq("/content/dam/sunlife/data/file1.xslx"),
                        eq("/content/dam/sunlife/data/file2.xslx"),
                        eq("/content/dam/sunlife/data/file3.properties")
                );
    }

    @Test
    public void testReadParams_Chess() throws Exception {

        when(metaDataMap.containsKey(ParseDrugListStep.PROCESS_ARGS)).thenReturn(true);
        when(metaDataMap.get(ParseDrugListStep.PROCESS_ARGS, String.class))
                .thenReturn("chess::file4.csv");

        subject.execute(workItem, workflowSession, metaDataMap);

        verify(drugListService)
                .updateChessLists(eq("/content/dam/sunlife/data/file4.csv") );
    }
}
