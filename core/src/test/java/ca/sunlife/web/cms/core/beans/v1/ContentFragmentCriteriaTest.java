package ca.sunlife.web.cms.core.beans.v1;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(AemContextExtension.class)
public class ContentFragmentCriteriaTest {

    ContentFragmentCriteria cfCriteria;

    @BeforeEach
    void setUp() {
        cfCriteria = new ContentFragmentCriteria();
        cfCriteria.setPath("/content");
        cfCriteria.setOffset(0);
        cfCriteria.setLimit(10);
        String[] tagNames = new String[]{"tag1", "tag2"};
        cfCriteria.setTagNames(tagNames);
        cfCriteria.setModelPath("/conf/content/model/fragment");
        cfCriteria.setOrderBy("orderBy");
        cfCriteria.setOrderBySort("asc");
        cfCriteria.setTotalMatchCount(112L);
        cfCriteria.setModelPath("/content");
        cfCriteria.setOrderBy("orderBy");
        cfCriteria.setOrderBySort("asc");

    }

    @Test
    public void testCase() {
        assertEquals(cfCriteria.getPath(), "/content");
        assertEquals(cfCriteria.getOffset(), 0);
        assertEquals(cfCriteria.getLimit(), 10);
        String[] tagNames = cfCriteria.getTagNames();
        assertEquals(tagNames.length, 2);
        assertEquals(cfCriteria.getModelPath(), "/content");
        assertEquals(cfCriteria.getOrderBy(), "orderBy");
        assertEquals(cfCriteria.getOrderBySort(), "asc");
        assertEquals(cfCriteria.getOrderBy(), "orderBy");
        assertEquals(cfCriteria.getOrderBySort(), "asc");
        Long totalMatchCount = cfCriteria.getTotalMatchCount();
        assertEquals(totalMatchCount.intValue(), 112);

    }

}
