package ca.sunlife.web.cms.core.workflow;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.Property;
import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.jcr.resource.api.JcrResourceConstants;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.adobe.cq.dam.cfm.FragmentTemplate;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.WCMException;
import com.day.cq.workflow.WorkflowException;
import com.day.cq.workflow.WorkflowSession;
import com.day.cq.workflow.exec.WorkItem;
import com.day.cq.workflow.exec.WorkflowData;
import com.day.cq.workflow.metadata.MetaDataMap;

import ca.sunlife.web.cms.core.services.CoreResourceResolver;

public class SunhubUploadUtilityTest {

	@Mock
	WorkItem workItem;

	@Mock
	WorkflowData workflowData;

	@Mock
	private WorkflowSession workflowSession;

	@Mock
	private ResourceResolver resolver;

	@Mock
	private Resource resource;

	@Mock
	private Node node;

	@Mock
	private MetaDataMap metaDataMap;

	@Mock
	CoreResourceResolver coreResourceResolver;

	@Mock
	Property property;

	@InjectMocks
	SunhubUploadUtility sunhubUploadUtility;

	@Mock
	PageManager pageManager;

	@Mock
	Page page;

	@BeforeEach
	public void setUp() throws LoginException {
		MockitoAnnotations.initMocks(this);
		when(resolver.getResource(anyString())).thenReturn(resource);
		when(resource.adaptTo(Node.class)).thenReturn(node);
	}

	@Test
	void testExecute() throws LoginException, WorkflowException, PathNotFoundException, RepositoryException {
		when(coreResourceResolver.getResourceResolver()).thenReturn(resolver);
		when(workItem.getWorkflowData()).thenReturn(workflowData);
		when(workflowData.getPayloadType()).thenReturn("JCR_PATH");
		when(workflowData.getPayload()).thenReturn("/content/dam/test.xlsx");
		Assertions.assertThrows(NullPointerException.class, ()->sunhubUploadUtility.execute(workItem, workflowSession, metaDataMap));
	}

	@Test
	void testValidateInput() throws NoSuchMethodException, SecurityException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException {
		Method privateMethod = SunhubUploadUtility.class.getDeclaredMethod("validateInput");
		privateMethod.setAccessible(true);
		privateMethod.invoke(sunhubUploadUtility);
	}

	@Test
	void testAddProperty() throws NoSuchMethodException, SecurityException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException {
		Method privateMethod = SunhubUploadUtility.class.getDeclaredMethod("addProperty", ResourceResolver.class,
				String.class, String.class);
		privateMethod.setAccessible(true);
		String category = "tpadvisor,investment";
		String displayDate = "2019-08-08T09:30:00.000+05:30";
		sunhubUploadUtility.setCategory(category);
		sunhubUploadUtility.setDisplayDate(displayDate);
		privateMethod.invoke(sunhubUploadUtility, resolver, "test", "test");
	}

	@Test
	void testParseDateAndTime() throws NoSuchMethodException, SecurityException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException {
		Method privateMethod = SunhubUploadUtility.class.getDeclaredMethod("parseDateAndTime", SimpleDateFormat.class,
				String.class);
		privateMethod.setAccessible(true);
		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
		String date = "01/01/1900";
		Assertions.assertNotNull(privateMethod.invoke(sunhubUploadUtility, sdf, date));
	}

	@Test
	void testRemoveSpCh() throws NoSuchMethodException, SecurityException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException {
		Method privateMethod = SunhubUploadUtility.class.getDeclaredMethod("removeSpecialCharAndToLowerCase",
				String.class);
		privateMethod.setAccessible(true);
		Assertions.assertEquals("test-test", privateMethod.invoke(sunhubUploadUtility, "test@Test"));
	}

	@Test
	void testGetTimeStamp() throws IllegalAccessException, IllegalArgumentException, InvocationTargetException,
			NoSuchMethodException, SecurityException {
		Method privateMethod = SunhubUploadUtility.class.getDeclaredMethod("getTimeStamp");
		privateMethod.setAccessible(true);
		String returnValue = (String) privateMethod.invoke(sunhubUploadUtility);
		Assertions.assertNotNull(returnValue);
	}

	@Test
	void testArticleMiniDesc() throws IllegalAccessException, IllegalArgumentException, InvocationTargetException,
			NoSuchMethodException, SecurityException {
		Method privateMethod = SunhubUploadUtility.class.getDeclaredMethod("getArticleMainDescription");
		privateMethod.setAccessible(true);
		String returnValue = (String) privateMethod.invoke(sunhubUploadUtility);
		Assertions.assertNotNull(returnValue);
	}

	@Test
	void testCreateFolder() throws NoSuchMethodException, SecurityException, PersistenceException,
			IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		Method privateMethod = SunhubUploadUtility.class.getDeclaredMethod("createFolder", ResourceResolver.class,
				String.class, String.class);
		privateMethod.setAccessible(true);
		String parentFolder = "/content/dam/test";
		String folderName = "test";		
		final Map<String, Object> folderProperties = new HashMap<>();
		folderProperties.put(JcrConstants.JCR_PRIMARYTYPE, JcrResourceConstants.NT_SLING_ORDERED_FOLDER);
		when(resolver.create(resource, folderName, folderProperties)).thenReturn(resource);
		final Map<String, Object> jcrContent = new HashMap<>();
		jcrContent.put(JcrConstants.JCR_PRIMARYTYPE, JcrConstants.NT_UNSTRUCTURED);
		when(resolver.create(resource, JcrConstants.JCR_CONTENT, jcrContent)).thenReturn(resource);
		privateMethod.invoke(sunhubUploadUtility, resolver, parentFolder, folderName);
	}

	@Test
	void testCreateContentFragment() throws NoSuchMethodException, SecurityException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException {
		Method privateMethod = SunhubUploadUtility.class.getDeclaredMethod("createContentFragment",
				ResourceResolver.class, String.class);
		privateMethod.setAccessible(true);
		when(resolver.resolve(anyString())).thenReturn(resource);		
		FragmentTemplate fragmentTemplate = Mockito.mock(FragmentTemplate.class);
		when(resource.adaptTo(FragmentTemplate.class)).thenReturn(fragmentTemplate);
		privateMethod.invoke(sunhubUploadUtility, resolver, "test");
	}

	@Test
	void testCategoryTags() throws NoSuchMethodException, SecurityException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException {
		Method privateMethod = SunhubUploadUtility.class.getDeclaredMethod("categoryTags", String.class);
		privateMethod.setAccessible(true);
		String category = "test";
		sunhubUploadUtility.setCategory(category);
		Assertions.assertNotNull(privateMethod.invoke(sunhubUploadUtility, "/content/content-for-clients"));
		category = "tpadvisor,investment";
		sunhubUploadUtility.setCategory(category);
		Assertions.assertNotNull(privateMethod.invoke(sunhubUploadUtility, "/content/content-for-clients"));
	}

	@Test
	void testCreatePage() throws NoSuchMethodException, SecurityException, WCMException, PathNotFoundException,
			RepositoryException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		Method privateMethod = SunhubUploadUtility.class.getDeclaredMethod("createPage", ResourceResolver.class,
				StringBuilder.class, String.class, String.class, String[].class);
		privateMethod.setAccessible(true);
		String[] split = { "sl", "sunhub", "test" };
		String unpublishDate = "01/01/1900";
		sunhubUploadUtility.setUnpublishDate(unpublishDate);
		sunhubUploadUtility.setTitle("title");
		sunhubUploadUtility.setName("name");
		StringBuilder sb = new StringBuilder();
		sb.append("test");		
		when(resolver.adaptTo(PageManager.class)).thenReturn(pageManager);
		when(pageManager.create(anyString(), anyString(), anyString(), anyString())).thenReturn(page);
		when(page.adaptTo(Node.class)).thenReturn(node);
		when(node.getNode(anyString())).thenReturn(node);
		when(resource.getChild(anyString())).thenReturn(resource);
		privateMethod.invoke(sunhubUploadUtility, resolver, sb, "/content/content-for-clients",
				"/content/content-for-clients", split);
	}

	@Test
	void testCreateData() throws NoSuchMethodException, SecurityException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException {
		Method privateMethod = SunhubUploadUtility.class.getDeclaredMethod("createData", ResourceResolver.class);
		privateMethod.setAccessible(true);
		sunhubUploadUtility.setFolderPath("/content/dam/sunlife/content-for-clients");
		sunhubUploadUtility.setName("name");		
		privateMethod.invoke(sunhubUploadUtility, resolver);
	}
}
