package ca.sunlife.web.cms.core.servlets;

import ca.sunlife.web.cms.core.services.druglist.DrugListService;
import com.adobe.granite.asset.api.AssetManager;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.io.PrintWriter;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(AemContextExtension.class)
public class DrugListServletTest {

    @Mock
    private SlingHttpServletRequest request;
    @Mock
    private ResourceResolver resolver;
    @Mock
    private AssetManager assetManager;

    @Mock
    private SlingHttpServletResponse response;
    @Mock
    private PrintWriter writer;

    @Mock
    DrugListService drugListService;

    @InjectMocks
    private DrugListServlet subject;

    @BeforeEach
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
        when(request.getResourceResolver()).thenReturn(resolver);
        when(resolver.adaptTo(AssetManager.class)).thenReturn(assetManager);

        when(response.getWriter()).thenReturn(writer);
    }

    @Test
    public void testGet_NoJson() throws Exception {
        subject.doGet(request, response);

        verify(response).setContentType("application/json; charset=UTF-8");
        verify(writer).write("{ \"error\": \"Data not currently available.\"}");

    }


}
