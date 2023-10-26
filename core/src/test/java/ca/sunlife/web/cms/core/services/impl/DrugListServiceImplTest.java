package ca.sunlife.web.cms.core.services.impl;

import ca.sunlife.web.cms.core.services.druglist.DrugListConfig;
import ca.sunlife.web.cms.core.services.druglist.DrugListKey;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.AssetManager;
import com.adobe.granite.asset.api.AssetVersionManager;
import com.day.cq.dam.api.Rendition;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.Replicator;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.io.IOUtils;
import org.apache.sling.api.resource.Resource;
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
import java.util.HashSet;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
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
    Rendition chess;

    @Mock
    Replicator replicator;

    @Mock
    DrugListConfig config;

    @BeforeEach
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);

        when(resourceResolverFactory.getServiceResourceResolver(any(Map.class))).thenReturn(resourceResolver);
        when(resourceResolver.adaptTo(AssetManager.class)).thenReturn(assetManager);
        when(resourceResolver.adaptTo(AssetVersionManager.class)).thenReturn(assetVersionManager);
        //when(assetManager.assetExists(anyString())).thenReturn(true);
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

        when(chess.getStream()).thenAnswer(new Answer<InputStream>(){

            @Override
            public InputStream answer(InvocationOnMock invocationOnMock) throws Throwable {
                return getClass().getClassLoader().getResourceAsStream("ca/sunlife/web/cms/core/services/impl/NewPAForm.csv");
            }
        });

        subject = new DrugListServiceImpl();

        FieldSetter.setField(subject,
                subject.getClass().getDeclaredField("resourceResolverFactory"),
                resourceResolverFactory );
        //when(assetManager.getAsset(anyString())).thenReturn(asset);
        Resource assetResource = mock(Resource.class);
        when(assetResource.adaptTo(Asset.class)).thenReturn(asset);
        when(resourceResolver.getResource((anyString()))).thenReturn(assetResource);
        when(asset.getRendition(DrugListServiceImpl.ORIGINAL)).thenReturn(paForms, lookup, nonpolicy, chess );

        when(config.pdf_folder()).thenReturn("/content/dam/sunlife/pdf");
        when(config.drug_list_asset_path()).thenReturn("/content/dam/sunlife/data");
        when(config.drug_list_asset_name()).thenReturn("druglist.json");
        when(config.chess_list_asset_path()).thenReturn("/content/dam/sunlife/data");
        when(config.chess_list_asset_name()).thenReturn("chesslist.json");

        //when(assetManager.createAsset("/content/dam/sunlife/data/druglist-workflow-report.txt")).thenReturn(reportAsset);

        FieldSetter.setField(subject, subject.getClass().getDeclaredField("replicator"), replicator);

        subject.activate(config);
    }

    @Test
    public void testWriteJsonAssetToDamChess() throws Exception {

        Resource outResource = mock(Resource.class);
        Asset outAsset = mock(Asset.class);
        when(outResource.adaptTo(Asset.class)).thenReturn(outAsset);

        when(resourceResolver.getResource("/content/dam/sunlife/data/chesslist.json")).thenReturn(outResource);
        subject.updateChessLists("NewPAForm.csv");

        ArgumentCaptor<InputStream> streamCaptor = ArgumentCaptor.forClass(InputStream.class);
        verify(outAsset).addRendition(eq(DrugListServiceImpl.ORIGINAL), streamCaptor.capture(), eq("application/json"));
        ByteArrayInputStream bais = (ByteArrayInputStream) streamCaptor.getAllValues().get(0);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(IOUtils.toString(bais, StandardCharsets.UTF_8));


        JsonNode chessArray = jsonNode.get("chess");
        assertNotNull(chessArray);
        assertTrue(chessArray.isArray());
        //assertEquals("\"�h\"", chessArray.get(0));

        verify(replicator).replicate(any(Session.class), eq(ReplicationActionType.ACTIVATE), eq("/content/dam/sunlife/data/chesslist.json"));

    }
    //@Test
    public void testWriteJsonAssetToDam() throws Exception {

        Resource outResource = mock(Resource.class);
        Asset outAsset = mock(Asset.class);
        when(outResource.adaptTo(Asset.class)).thenReturn(outAsset);

        when(resourceResolver.getResource("/content/dam/sunlife/data/druglist.json")).thenReturn(outResource);
        subject.updateDrugLists("paforms.xlsx", "lookup.xlsx", "drugList.properties");

        ArgumentCaptor<InputStream> streamCaptor = ArgumentCaptor.forClass(InputStream.class);
        verify(outAsset).addRendition(eq(DrugListServiceImpl.ORIGINAL), streamCaptor.capture(), eq("application/json"));
        ByteArrayInputStream bais = (ByteArrayInputStream) streamCaptor.getAllValues().get(0);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(IOUtils.toString(bais, StandardCharsets.UTF_8));


        assertEquals(251, jsonNode.get("slf-policy").size());
        JsonNode policy = jsonNode.get("slf-policy").get("14178");
        assertEquals(153, policy.size());
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

        policy = jsonNode.get("slf-policy").get("******");
        assertNotNull(policy);
        assertEquals(203, policy.size());

        policy = jsonNode.get("slf-policy").get("*#*#*");
        assertNotNull(policy);
        assertEquals(233, policy.size());

        policy = jsonNode.get("slf-policy").get("22199");
        assertNotNull(policy);
        assertEquals(229, policy.size());

        verify(assetVersionManager, times(0)).createVersion(eq("/content/dam/sunlife/data/druglist.json"), anyString());

        assertTrue(jsonNode.get("chess") == null);

    }

    //@Test
    public void testExistingAssetVersioned() throws Exception {

        Resource outResource = mock(Resource.class);
        Asset outAsset = mock(Asset.class);
        when(outResource.adaptTo(Asset.class)).thenReturn(outAsset);
        when(resourceResolver.getResource("/content/dam/sunlife/data/druglist.json")).thenReturn(outResource);
        when(outAsset.getPath()).thenReturn("/content/dam/sunlife/data/druglist.json");

        subject.updateDrugLists("paforms.xlsx", "lookup.xlsx", "drugList.properties");

        verify(assetVersionManager, times(1)).createVersion(eq("/content/dam/sunlife/data/druglist.json"), anyString());

    }

    @Test
    public void testDrugKeyEquivalence() {
        DrugListKey one = new DrugListKey("foo", "Bar");
        DrugListKey two = new DrugListKey("FOO", "bar");
        assertEquals(one.hashCode(), two.hashCode());
        assertEquals(one, two);
    }

    //@Test
    public void testDuplicatePolicyNumberUnion() throws Exception {

        Resource outResource = mock(Resource.class);
        Asset outAsset = mock(Asset.class);
        when(outResource.adaptTo(Asset.class)).thenReturn(outAsset);

        when(resourceResolver.getResource("/content/dam/sunlife/data/druglist.json")).thenReturn(outResource);
        subject.updateDrugLists("paforms.xlsx", "lookup.xlsx", "drugList.properties");

        ArgumentCaptor<InputStream> streamCaptor = ArgumentCaptor.forClass(InputStream.class);
        verify(outAsset).addRendition(eq(DrugListServiceImpl.ORIGINAL), streamCaptor.capture(), eq("application/json"));
        ByteArrayInputStream bais = (ByteArrayInputStream) streamCaptor.getAllValues().get(0);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(IOUtils.toString(bais, StandardCharsets.UTF_8));


        assertEquals(251, jsonNode.get("slf-policy").size());
        JsonNode policy = jsonNode.get("slf-policy").get("150195");
        assertEquals(218, policy.size());
        assertNotNull(policy);
        JsonNode form = policy.get(11);
        assertNotNull(form);
        assertEquals("/content/dam/sunlife/pdf/3454-E.pdf", form.get("form-en").textValue());
        HashSet<String> nameSet = new HashSet<>();
        for (int i = 0; i < policy.size(); i++) {
            form = policy.get(i);
            String drugName = form.get("drug-name-en").textValue();
            nameSet.add(drugName);
        }
        assertTrue(nameSet.contains("Prevymis (letermovir)"));
        assertTrue(nameSet.contains("Sanorex (mazindol)"));

    }
}
