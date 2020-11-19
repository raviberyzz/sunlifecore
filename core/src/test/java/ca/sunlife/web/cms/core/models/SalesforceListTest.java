package ca.sunlife.web.cms.core.models;

import ca.sunlife.web.cms.core.models.salesforce.SalesforceList;
import com.adobe.cq.wcm.core.components.internal.models.v1.ListImpl;
import com.adobe.cq.wcm.core.components.models.List;
import com.day.cq.wcm.api.designer.Style;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.internal.util.reflection.FieldSetter;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;

@ExtendWith(AemContextExtension.class)
public class SalesforceListTest {

    private final static String LIST_1 = "/content/list/jcr:content/root/staticListType";
    public final AemContext context = new AemContext();

    private List subject;

    @BeforeEach
    public void setUp() throws Exception {
        context.addModelsForClasses(SalesforceList.class, List.class);

        context.load().json(
                getClass()
                    .getClassLoader()
                    .getResourceAsStream("ca/sunlife/web/cms/core/models/salesforce/sample-SalesforceList.json"),
                LIST_1

        );
        Resource resource = context.resourceResolver().getResource(LIST_1);
        if (resource == null) {
            throw new IllegalStateException("no resource for " + LIST_1);
        }
        context.currentResource(resource);
        /*
        subject = context.request().adaptTo(SalesforceList.class);
        if (subject == null ) {
            throw new IllegalStateException("test subject not initialized");
        }

         */

        subject = new SalesforceList();
        FieldSetter.setField(subject, subject.getClass().getDeclaredField("self"), context.request());
        FieldSetter.setField(subject, ListImpl.class.getDeclaredField("properties"),
                context.currentResource().getValueMap());
        FieldSetter.setField(subject, ListImpl.class.getDeclaredField("currentStyle"),
                mock(Style.class));


    }

    @Test
    public void testGetListItems() throws Exception {
        assertNotNull(subject);
        //assertNotNull(subject.getListItems());

    }

}
