package ca.sunlife.web.cms.core.services.impl;

import ca.sunlife.web.cms.core.beans.v1.ContentFragmentCriteria;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.internal.util.reflection.FieldSetter;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.jcr.Session;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class DAMContentFragmentServiceImplTest {

    private final AemContext ctx = new AemContext();

    @Mock
    private CoreResourceResolver coreResourceResolver;


    @Mock
    private QueryBuilder builder;

    @Mock
    ResourceResolver resolver;

    @Mock
    Query query;

    @Mock
    SearchResult result;

    @Mock
    Session session;

    @Mock
    PredicateGroup predicateGroup;


    private DAMContentFragmentServiceImpl damContentFragmentServiceImpl;


    ContentFragmentCriteria contentFragmentCriteria = new ContentFragmentCriteria();


    @BeforeEach
    public void setUp(AemContext ctx) throws Exception {
        MockitoAnnotations.initMocks(this);
        damContentFragmentServiceImpl = new DAMContentFragmentServiceImpl();
        FieldSetter.setField(damContentFragmentServiceImpl,
                damContentFragmentServiceImpl.getClass().getDeclaredField("coreResourceResolver"),
                coreResourceResolver);

        when(coreResourceResolver.getResourceResolver()).thenReturn(resolver);
        when(coreResourceResolver.getResourceResolver().adaptTo(Session.class)).thenReturn(session);
        when(coreResourceResolver.getResourceResolver().adaptTo(QueryBuilder.class)).thenReturn(builder);
        when(builder.createQuery(any(), any())).thenReturn(query);
        when(query.getResult()).thenReturn(result);
        when(query.getPredicates()).thenReturn(predicateGroup);
        when(predicateGroup.toString()).thenReturn("List of predicates");
        when(result.getHits()).thenReturn(Collections.emptyList());
        Hit hit = mock(Hit.class);
        final List<Hit> hits = Collections.singletonList(hit);
        when(result.getHits()).thenReturn(hits);
        when(hit.getPath()).thenReturn("/content/dam/sunlife/cf/en/well-being/health-wellness/health-wellness-articles");
        contentFragmentCriteria.setTagNames(new String[]{"tag1"});


    }

    @Test
    void testCase1() {
        List<Resource> resourceList = new ArrayList<>();
        damContentFragmentServiceImpl.activate();
        resourceList = damContentFragmentServiceImpl.getCFResourceList(contentFragmentCriteria);
        assertEquals(resourceList.size(), 1);
        damContentFragmentServiceImpl.getContentFragmentList(resourceList);
    }
}
