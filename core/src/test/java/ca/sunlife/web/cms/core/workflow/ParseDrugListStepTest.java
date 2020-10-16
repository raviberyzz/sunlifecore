package ca.sunlife.web.cms.core.workflow;

import ca.sunlife.web.cms.core.services.druglist.DrugListService;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.internal.util.reflection.FieldSetter;

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
    private MetaDataMap metaDataMap;

    @Mock
    DrugListService drugListService;

    @BeforeEach
    public void setUp() throws Exception {

        MockitoAnnotations.initMocks(this);
        when(workItem.getWorkflowData()).thenReturn(workflowData);
        when(workflowData.getPayload()).thenReturn("/content/dam/sunlife/data/foo.xlsx");

        subject = new ParseDrugListStep();

        FieldSetter.setField(subject, subject.getClass().getDeclaredField("drugListService"), drugListService);

    }

    @Test
    public void testReadParams() throws Exception {

        when(metaDataMap.containsKey(ParseDrugListStep.PROCESS_ARGS)).thenReturn(true);
        when(metaDataMap.get(ParseDrugListStep.PROCESS_ARGS)).thenReturn("paforms::file1.xslx,lookup::file2.xslx");

        subject.execute(workItem, workflowSession, metaDataMap);

        verify(drugListService)
                .updateDrugLists(eq("/content/dam/sunlife/data/file1.xslx"),
                eq("/content/dam/sunlife/data/file2.xslx"));
    }
}
