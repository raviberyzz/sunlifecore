package ca.sunlife.web.cms.core.models.v1.impl;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.factory.ModelFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import io.wcm.testing.mock.aem.junit5.AemContext;
import junitx.util.PrivateAccessor;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import static org.mockito.Mockito.lenient;

@ExtendWith({ MockitoExtension.class })
public class FooterImplTest {

    @InjectMocks
    FooterImpl footer;

    @Mock
    Resource topLinks;

    @Mock
    Resource bottomLinks;

    @BeforeEach
    void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
        footer = Mockito.spy(FooterImpl.class);

    }

    @Test
    void testGetTopLinks() throws NoSuchFieldException {
        PrivateAccessor.setField(footer, "topLinks", topLinks);
        Resource item = Mockito.mock(Resource.class);

        List<Resource> itemList = new ArrayList<>();
        itemList.add(item);
        Iterator<Resource> topLinksIterator = itemList.iterator();
        lenient().when(topLinks.listChildren()).thenReturn(topLinksIterator);

        ValueMap valueMap = Mockito.mock(ValueMap.class);
        lenient().when(item.getValueMap()).thenReturn(valueMap);

        Resource link = Mockito.mock(Resource.class);
        lenient().when(item.getChild("links")).thenReturn(link);

        List<Resource> linkList = new ArrayList<>();
        linkList.add(item);
        Iterator<Resource> linksIterator = linkList.iterator();
        lenient().when(link.listChildren()).thenReturn(linksIterator);

        lenient().when(item.getValueMap()).thenReturn(valueMap);

        footer.getTopLinks();

    }

    @Test
    void testGetBottomLinks() throws NoSuchFieldException {
        PrivateAccessor.setField(footer, "bottomLinks", bottomLinks);
        Resource item = Mockito.mock(Resource.class);

        List<Resource> itemList = new ArrayList<>();
        itemList.add(item);
        Iterator<Resource> bottomLinksIterator = itemList.iterator();
        lenient().when(bottomLinks.listChildren()).thenReturn(bottomLinksIterator);

        ValueMap valueMap = Mockito.mock(ValueMap.class);
        lenient().when(item.getValueMap()).thenReturn(valueMap);

        footer.getBottomLinks();

    }
}

