package ca.sunlife.web.cms.core.models;

import ca.sunlife.web.cms.core.models.salesforce.SalesforceList;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(AemContextExtension.class)
public class SalesforceListTest {

    private final static String LIST_1 = "/content/list/jcr:content/root/staticListType";
    private final AemContext context = new AemContext();

    private SalesforceList subject;

    @BeforeEach
    public void setUp() throws Exception {
        context.addModelsForPackage("ca.sunlife.web.cms.core.models");

        context.load().json(
                getClass()
                        .getClassLoader()
                        .getResourceAsStream("/ca/sunlife/web/cms/core/models/salesforce/sample-SalesforceList.json"),
        "/content"
        );
        Resource resource = context.resourceResolver().getResource(LIST_1);
        if (resource == null) {
            throw new IllegalStateException("no resource for " + LIST_1);
        }
        context.request().setContextPath("/context");
        context.currentResource(resource);
        subject = context.request().adaptTo(SalesforceList.class);


    }

    @Test
    public void testGetListItems() throws Exception {
        assertNotNull(subject.getListItems());

    }

}
