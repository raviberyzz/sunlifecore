package ca.sunlife.web.cms.core.services.impl;

import ca.sunlife.web.cms.core.services.druglist.DrugListConfig;
import com.adobe.granite.asset.api.Asset;
import com.adobe.granite.asset.api.AssetManager;
import com.adobe.granite.asset.api.Rendition;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.io.IOUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.internal.util.reflection.FieldSetter;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

public class DrugListServiceImplTest {

    DrugListServiceImpl subject;

    @Mock
    AssetManager assetManager;

    @Mock
    Asset asset;

    @Mock
    Rendition paForms;

    @Mock
    Rendition lookup;

    @Mock
    DrugListConfig config;

    @BeforeEach
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);

        when(paForms.getStream()).thenAnswer(new Answer<InputStream>(){
            @Override
            public InputStream answer(InvocationOnMock invocationOnMock) throws Throwable {
                InputStream result = getClass().getClassLoader().getResourceAsStream("ca/sunlife/web/cms/core/services/impl/paforms.xlsx");
                return result;
            }
        });

        when(lookup.getStream()).thenAnswer(new Answer<InputStream>(){
            @Override
            public InputStream answer(InvocationOnMock invocationOnMock) throws Throwable {
                return getClass().getClassLoader().getResourceAsStream("ca/sunlife/web/cms/core/services/impl/lookup.xlsx");
            }
        });

        subject = new DrugListServiceImpl();

        FieldSetter.setField(subject, subject.getClass().getDeclaredField("assetManager"), assetManager );
        when(assetManager.getAsset(anyString())).thenReturn(asset);
        when(asset.getRendition(DrugListServiceImpl.ORIGINAL)).thenReturn(paForms, lookup);

        when(config.getPdfFolder()).thenReturn("/content/assets/sunlife/whatever");

        subject.activate(config);
    }

    @Test
    public void testSomething() throws Exception {

        Asset outAsset = mock(Asset.class);

        when(assetManager.createAsset("/content/assets/sunlife/whatever/druglist.json")).thenReturn(outAsset);
        subject.updateDrugLists("paforms.xlsx", "lookup.xlsx");

        ArgumentCaptor<InputStream> streamCaptor = ArgumentCaptor.forClass(InputStream.class);
        verify(outAsset).setRendition(eq(DrugListServiceImpl.ORIGINAL), streamCaptor.capture(), any(HashMap.class));
        ByteArrayInputStream bais = (ByteArrayInputStream) streamCaptor.getValue();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(IOUtils.toString(bais, StandardCharsets.UTF_8));

        assertEquals(252, jsonNode.get("slf-policy").size());
        JsonNode policy = jsonNode.get("slf-policy").get("14178");
        assertEquals(157, policy.size());
        assertNotNull(policy);
        JsonNode form = policy.get(0);
        assertNotNull(form);
        assertEquals("Cancer", form.get("drug-category-en").textValue());
        System.out.println(form.toString());

    }
}
