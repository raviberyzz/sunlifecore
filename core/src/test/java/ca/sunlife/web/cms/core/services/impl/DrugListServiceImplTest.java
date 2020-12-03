package ca.sunlife.web.cms.core.services.impl;

import ca.sunlife.web.cms.core.services.druglist.DrugListConfig;
import com.adobe.granite.asset.api.Asset;
import com.adobe.granite.asset.api.AssetManager;
import com.adobe.granite.asset.api.AssetVersionManager;
import com.adobe.granite.asset.api.Rendition;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.io.IOUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.internal.util.reflection.FieldSetter;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;

import javax.jcr.Session;
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
    ResourceResolverFactory resourceResolverFactory;

    @Mock
    ResourceResolver resourceResolver;

    @Mock
    AssetManager assetManager;

    @Mock
    AssetVersionManager assetVersionManager;

    @Mock
    Asset asset;

    @Mock Asset reportAsset;

    @Mock
    Rendition paForms;

    @Mock
    Rendition lookup;

    @Mock
    Rendition nonpolicy;

    @Mock
    DrugListConfig config;

    @BeforeEach
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);

        when(resourceResolverFactory.getServiceResourceResolver(any(Map.class))).thenReturn(resourceResolver);
        when(resourceResolver.adaptTo(AssetManager.class)).thenReturn(assetManager);
        when(resourceResolver.adaptTo(AssetVersionManager.class)).thenReturn(assetVersionManager);
        when(assetManager.assetExists(anyString())).thenReturn(true);
        when(resourceResolver.adaptTo(Session.class)).thenReturn(mock(Session.class));

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

        when(nonpolicy.getStream()).thenAnswer(new Answer<InputStream>(){

            @Override
            public InputStream answer(InvocationOnMock invocationOnMock) throws Throwable {
                return getClass().getClassLoader().getResourceAsStream("ca/sunlife/web/cms/core/services/impl/drugList.properties");
            }
        });

        subject = new DrugListServiceImpl();

        FieldSetter.setField(subject,
                subject.getClass().getDeclaredField("resourceResolverFactory"),
                resourceResolverFactory );
        when(assetManager.getAsset(anyString())).thenReturn(asset);
        when(asset.getRendition(DrugListServiceImpl.ORIGINAL)).thenReturn(paForms, lookup, nonpolicy);

        when(config.pdf_folder()).thenReturn("/content/dam/sunlife/pdf");
        when(config.drug_list_asset_path()).thenReturn("/content/dam/sunlife/data");
        when(config.drug_list_asset_name()).thenReturn("druglist.json");

        when(assetManager.createAsset("/content/dam/sunlife/data/druglist-workflow-report.txt")).thenReturn(reportAsset);

        subject.activate(config);
    }

    @Test
    public void testWriteJsonAssetToDam() throws Exception {

        Asset outAsset = mock(Asset.class);

        when(assetManager.assetExists("/content/dam/sunlife/data/druglist.json")).thenReturn(false);
        when(assetManager.createAsset("/content/dam/sunlife/data/druglist.json")).thenReturn(outAsset);
        subject.updateDrugLists("paforms.xlsx", "lookup.xlsx", "drugList.properties");

        verify(assetManager).assetExists("/content/dam/sunlife/data/druglist.json");
        verify(assetManager).createAsset("/content/dam/sunlife/data/druglist.json");

        ArgumentCaptor<InputStream> streamCaptor = ArgumentCaptor.forClass(InputStream.class);
        verify(outAsset).setRendition(eq(DrugListServiceImpl.ORIGINAL), streamCaptor.capture(), any(HashMap.class));
        ByteArrayInputStream bais = (ByteArrayInputStream) streamCaptor.getAllValues().get(0);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(IOUtils.toString(bais, StandardCharsets.UTF_8));

        assertEquals(253, jsonNode.get("slf-policy").size());
        JsonNode policy = jsonNode.get("slf-policy").get("14178");
        assertEquals(154, policy.size());
        assertNotNull(policy);
        JsonNode form = policy.get(0);
        assertNotNull(form);
        assertEquals("Anti-inflammatory - Specialty", form.get("drug-category-en").textValue());

        policy = jsonNode.get("slf-policy").get("57884");
        assertNotNull(policy);
        assertEquals(35, policy.size());

        policy = jsonNode.get("slf-policy").get("188728");
        assertNotNull(policy);
        assertEquals(5, policy.size());

        verify(assetVersionManager, times(0)).createVersion(eq("/content/dam/sunlife/data/druglist.json"), anyString());

    }

    @Test
    public void testExistingAssetVersioned() throws Exception {

        Asset outAsset = mock(Asset.class);
        when(outAsset.getPath()).thenReturn("/content/dam/sunlife/data/druglist.json");

        when(assetManager.assetExists("/content/dam/sunlife/data/druglist.json")).thenReturn(true);
        when(assetManager.getAsset("/content/dam/sunlife/data/druglist.json")).thenReturn(outAsset);
        subject.updateDrugLists("paforms.xlsx", "lookup.xlsx", "drugList.properties");

        verify(assetVersionManager, times(1)).createVersion(eq("/content/dam/sunlife/data/druglist.json"), anyString());

    }
}
