package ca.sunlife.web.cms.core.workflow;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.RepositoryException;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.reflect.MethodUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.jcr.resource.api.JcrResourceConstants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.dam.cfm.ContentFragment;
import com.adobe.cq.dam.cfm.FragmentTemplate;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.dam.api.AssetManager;
import com.day.cq.tagging.TagConstants;
import com.day.cq.wcm.api.NameConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.WCMException;
import com.day.cq.workflow.WorkflowException;
import com.day.cq.workflow.WorkflowSession;
import com.day.cq.workflow.exec.WorkItem;
import com.day.cq.workflow.exec.WorkflowData;
import com.day.cq.workflow.exec.WorkflowProcess;
import com.day.cq.workflow.metadata.MetaDataMap;

import ca.sunlife.web.cms.core.services.CoreResourceResolver;

/**
 * The Class SunhubUploadUtility.
 *
 * @author TCS
 * @version 1.0
 */
@Component(service = WorkflowProcess.class, property = { "process.label=Sunhub content upload utility" })
public class SunhubUploadUtility implements WorkflowProcess {
	/** The log. */
	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	/** The core resource resolver. */
	@Reference
	private CoreResourceResolver coreResourceResolver;

	/** The report book. */
	private XSSFWorkbook reportBook;

	/** The folder path. */
	private String folderPath;
	
	/** The content type. */
	private String contentType;
	
	/** The language. */
	private String language;
	
	/** The title. */
	private String title;
	
	/** The name. */
	private String name;
	
	/** The external url. */
	private String externalUrl;
	
	/** The site name. */
	private String siteName;
	
	/** The teaser. */
	private String teaser;
	
	/** The thumbnail image. */
	private String thumbnailImage;
	
	/** The display date. */
	private String displayDate;
	
	/** The seo description. */
	private String seoDescription;
	
	/** The unpublish date. */
	private String unpublishDate;
	
	/** The category. */
	private String category;
	
	/** The Constant FORWARD_SLASH. */
	private static final String FORWARD_SLASH = "/";
	
	/** The Constant FRAGMENTPATH. */
	private static final String FRAGMENTPATH = "fragmentPath";
	
	/** The Constant FALSE. */
	private static final String FALSE = "false";
	
	/** The Constant LAYOUT_CONTAINER. */
	private static final String LAYOUT_CONTAINER = "layout_container";
	
	/** The Constant CONTENT_FOR_CLIENT. */
	private static final String CONTENT_FOR_CLIENT = "content-for-clients";
	
	/** The Constant CONTAINER. */
	private static final String CONTAINER = "container1";
	/** The zero. */
	public static final int INT_ZERO = 0;

	/** The one. */
	public static final int INT_ONE = 1;

	/** The two. */
	public static final int INT_TWO = 2;

	/** The Constant THREE. */
	public static final int INT_THREE = 3;

	/** The four. */
	public static final int INT_FOUR = 4;

	/** The int five. */
	public static final int INT_FIVE = 5;

	/** The int six. */
	public static final int INT_SIX = 6;

	/** The int seven. */
	public static final int INT_SEVEN = 7;

	/** The int eight. */
	public static final int INT_EIGHT = 8;

	/** The int nine. */
	public static final int INT_NINE = 9;

	/** The int ten. */
	public static final int INT_TEN = 10;

	/** The int eleven. */
	public static final int INT_ELEVEN = 11;

	/** The int twelve. */
	public static final int INT_TWELVE = 12;

	/** The thirteen. */
	public static final int THIRTEEN = 13;

	/** The Constant JCR_CONTENT. */
	public static final String JCR_CONTENT = "/jcr:content";

	
	/** execute method.
	 * @param item the WorkItem
	 * @param wfsession the WorkflowSession
	 * @param args the MetaDataMap
	 * @throws WorkflowException the WorkflowException Exception
	 */
	@Override
	public void execute(WorkItem item, WorkflowSession wfsession, MetaDataMap args) throws WorkflowException {

		try {
			final WorkflowData workflowData = item.getWorkflowData();
			final String type = workflowData.getPayloadType();
			ResourceResolver resolver = coreResourceResolver.getResourceResolver();
			if (!StringUtils.equals(type, "JCR_PATH")) {
				return;
			}
			final String payloadId = workflowData.getPayload().toString();
			if (isXslxFile(payloadId)) {
				readXlsxFile(resolver, payloadId);
				resolver.commit();
			}
		} catch (RepositoryException | IOException | LoginException e) {
			logger.error("Exception occured {}", e.getMessage());

		}
	}

	/**
	 * Checks if is xslx file.
	 *
	 * @param fileName
	 *            the file name
	 * @return true, if is xslx file
	 */
	private boolean isXslxFile(String fileName) {
		boolean isXslxFile = false;
		if (StringUtils.isNotBlank(fileName)) {
			String extension = fileName.substring(fileName.lastIndexOf('.') + INT_ONE);
			if (extension.contains("xls")) {
				isXslxFile = true;
			}
		}

		return isXslxFile;
	}

	/**
	 * Read xlsx file.
	 *
	 * @param resolver the resolver
	 * @param inputFile the input file
	 * @throws RepositoryException the repository exception
	 * @throws IOException Signals that an I/O exception has occurred.
	 */
	private void readXlsxFile(ResourceResolver resolver, String inputFile) throws RepositoryException, IOException {
		Resource resource = resolver.getResource(inputFile + JCR_CONTENT + "/renditions/original/jcr:content");
		if (resource != null) {
			Node node = resource.adaptTo(Node.class);
			if (node != null) {
				InputStream in = node.getProperty(JcrConstants.JCR_DATA).getBinary().getStream();
				Workbook workbook = new XSSFWorkbook(in);
				XSSFWorkbook reportWorkBook = (XSSFWorkbook) workbook;
				createSheetForReport(reportWorkBook);
				Sheet firstSheet = workbook.getSheetAt(1);
				int totalRow = firstSheet.getLastRowNum();
				int rowsAllowed = INT_ELEVEN;
				for (int i = 1; i <= totalRow; i++) {
					Row nextRow = firstSheet.getRow(i);
					folderPath = getCellValue(nextRow.getCell(INT_ZERO));
					contentType = getCellValue(nextRow.getCell(INT_ONE));
					language = getCellValue(nextRow.getCell(INT_TWO));
					title = getCellValue(nextRow.getCell(INT_THREE));
					name = getCellValue(nextRow.getCell(INT_FOUR));
					externalUrl = getCellValue(nextRow.getCell(INT_SIX));
					siteName = getCellValue(nextRow.getCell(INT_SEVEN));
					teaser = getCellValue(nextRow.getCell(INT_EIGHT));
					thumbnailImage = getCellValue(nextRow.getCell(INT_NINE));
					displayDate = getCellValue(nextRow.getCell(INT_TEN));
					seoDescription = getCellValue(nextRow.getCell(INT_ELEVEN));
					unpublishDate = getCellValue(nextRow.getCell(INT_TWELVE));
					category = getCellValue(nextRow.getCell(THIRTEEN));
					String errorMessage = validateInput();
					if (i >= rowsAllowed) {
						errorMessage = "Can not be created. Number of  content allowed exceeded";
					}
					if (StringUtils.isBlank(errorMessage)) {
						try {
							errorMessage = createData(resolver);
						} catch (PersistenceException | NoSuchMethodException | IllegalAccessException
								| InvocationTargetException | WCMException | RepositoryException | ParseException e) {
							logger.error("Sunhub::Error:: {}", e.getMessage());
							errorMessage = "Something went wrong";
							createReport(i, errorMessage);
						}
						createReport(i, errorMessage);
					} else {
						createReport(i, errorMessage);
					}

				}
				writeReportToDAM(inputFile, resolver);
			}

		}
	}

	/**
	 * Creates the sheet for report.
	 *
	 * @param workbook
	 *            the workbook
	 */
	private void createSheetForReport(XSSFWorkbook workbook) {
		Sheet firstSheet = workbook.getSheetAt(1);
		Row firstRow = firstSheet.getRow(INT_ZERO);
		CellStyle cellStyle = workbook.createCellStyle();
		XSSFFont font = workbook.createFont();
		font.setBold(true);
		cellStyle.setFont(font);
		Cell statusCell = firstRow.createCell(firstRow.getLastCellNum());
		statusCell.setCellValue("Status");
		statusCell.setCellStyle(cellStyle);
		Cell errorMessage = firstRow.createCell(firstRow.getLastCellNum());
		errorMessage.setCellValue("Error");
		errorMessage.setCellStyle(cellStyle);
		reportBook = workbook;
	}

	/**
	 * Gets the cell value.
	 *
	 * @param cell
	 *            the cell
	 * @return the cell value
	 */
	private String getCellValue(Cell cell) {
		String cellValue = "";
		if (cell != null) {
			if (cell.getCellType().toString().equals("STRING")) {
				cellValue = cell.getStringCellValue();
			}
			if (cell.getCellType().toString().equals("NUMERIC")) {
				cellValue = String.valueOf(cell.getNumericCellValue());
			}
			logger.debug("not null value is {}", cellValue);
		} else {
			logger.debug("Cell is null");
		}
		return cellValue;
	}

	/**
	 * Validate input.
	 *
	 * @return the string
	 */
	private String validateInput() {
		StringBuilder errorMessage = new StringBuilder();
		if (StringUtils.isBlank(folderPath)) {
			errorMessage = errorMessage.append("Folder Path is empty. ");
		}
		if (StringUtils.isBlank(contentType) || !contentType.equalsIgnoreCase("Article Composite")) {
			errorMessage = errorMessage.append("Content Type is not defined. ");
		}
		if (StringUtils.isBlank(language)) {
			errorMessage = errorMessage.append("Language is Empty. ");
		}
		if (StringUtils.isBlank(name)) {
			errorMessage = errorMessage.append("Name is Empty. ");
		}
		if (StringUtils.isBlank(category)) {
			errorMessage = errorMessage.append("Category is Empty. ");
		}
		return errorMessage.toString();
	}

	/**
	 * Creates the data.
	 *
	 * @param resolver the resolver
	 * @return the string
	 * @throws PersistenceException the persistence exception
	 * @throws NoSuchMethodException the no such method exception
	 * @throws IllegalAccessException the illegal access exception
	 * @throws InvocationTargetException the invocation target exception
	 * @throws WCMException the WCM exception
	 * @throws RepositoryException the repository exception
	 * @throws ParseException the parse exception
	 */
	private String createData(ResourceResolver resolver) throws PersistenceException, NoSuchMethodException,
			IllegalAccessException, InvocationTargetException, WCMException, RepositoryException, ParseException {
		String errorMessage = "";
		StringBuilder rootFolder = new StringBuilder();
		StringBuilder rootPagePath = new StringBuilder();
		rootFolder.append("/content/dam/sunlife/external/ca");
		rootPagePath.append("/content/sunlife/external/ca");
		folderPath = removeSpecialCharAndToLowerCase(folderPath);
		String cfFolderPath = rootFolder.toString() + folderPath;
		name = removeSpecialCharAndToLowerCase(name);
		String cfPath = cfFolderPath + FORWARD_SLASH + name;
		String pagePath = rootPagePath.toString() + folderPath.replace("/content-fragments", "") + FORWARD_SLASH + name;
		String pageTemplate = "/conf/sunlife/settings/wcm/templates/sunlife-legacy-content-page";
		String[] folderSplit = folderPath.split(FORWARD_SLASH);
		String[] pageSplit = folderPath.replace("/content-fragments", "").split(FORWARD_SLASH);
		if (resolver.getResource(cfPath) == null || resolver.getResource(pagePath) == null) {
			for (String folderName : folderSplit) {
				if (StringUtils.isNotBlank(folderName)) {
					Resource res = resolver.getResource(rootFolder + FORWARD_SLASH + folderName);
					if (null == res) {
						createFolder(resolver, rootFolder.toString(), folderName);
						rootFolder.append(FORWARD_SLASH).append(folderName);
					} else {
						rootFolder.append(FORWARD_SLASH).append(folderName);
					}
				}
			}
			logger.debug("Sunhub:::Folderpath received");
			ContentFragment contentFragment = null;
			contentFragment = createContentFragment(resolver, cfFolderPath);
			logger.debug("Sunhub:::Content Fragment created");

			if (null != contentFragment) {
				addProperty(resolver, cfPath, pagePath);
				logger.debug("Sunhub:::CF property added");
				createPage(resolver, rootPagePath, cfPath, pageTemplate, pageSplit);
				logger.debug("Sunhub:::Page created");
			}
		} else {
			errorMessage = "Article already exists";
		}
		return errorMessage;
	}

	/**
	 * Creates the page.
	 *
	 * @param resolver the resolver
	 * @param parentPagePath the parent page path
	 * @param cfPath the cf path
	 * @param pageTemplate the page template
	 * @param split the split
	 * @throws WCMException the WCM exception
	 * @throws RepositoryException the repository exception
	 * @throws PersistenceException the persistence exception
	 */
	private void createPage(ResourceResolver resolver, StringBuilder parentPagePath, String cfPath, String pageTemplate,
			String[] split) throws WCMException, RepositoryException, PersistenceException {
		PageManager pageManager = resolver.adaptTo(PageManager.class);
		if (pageManager != null) {
			for (String pageName : split) {
				if (StringUtils.isNotBlank(pageName)) {
					Resource res = resolver.getResource(parentPagePath.toString() + FORWARD_SLASH + pageName);
					if (null == res) {
						pageManager.create(parentPagePath.toString(), pageName, pageTemplate,
								StringUtils.capitalize(pageName));
						parentPagePath.append(FORWARD_SLASH).append(pageName);
					} else {
						parentPagePath.append(FORWARD_SLASH).append(pageName);
					}
				}
			}
			Page page = pageManager.create(parentPagePath.toString(), name, pageTemplate, title);
			Node pageNode = page.adaptTo(Node.class);
			if (null != pageNode) {
				logger.debug("Sunhub:::Pagenode not null {}", pageNode.getPath());
				Node jcrNode = pageNode.getNode(JcrConstants.JCR_CONTENT);
				logger.debug("Sunhub:::Pagenode jcr content not null {}", jcrNode.getPath());
				SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
				Calendar cal = parseDateAndTime(sdf, unpublishDate);
				//logger.debug("Sunhub:::Calendar date::"+ cal.toString());
				jcrNode.setProperty(JcrResourceConstants.SLING_RESOURCE_TYPE_PROPERTY,
						"sunlife/legacy/components/structure/base-page");
				jcrNode.setProperty("socialMediaDescripton", seoDescription);
				jcrNode.setProperty(JcrConstants.JCR_DESCRIPTION, seoDescription);
				jcrNode.setProperty(NameConstants.NN_TEMPLATE, pageTemplate);
				jcrNode.setProperty("advancedPageType", "article");
				if (null != cal) {
					logger.debug("Sunhub:::cal date not null {}", cal.toString());
					jcrNode.setProperty(NameConstants.PN_OFF_TIME, cal);
					logger.debug("Sunhub:::jcrnode property is set");
				}
				logger.debug("Sunhub:::before add root node");
				if (!jcrNode.hasNode("root")) {
					jcrNode.addNode("root", JcrConstants.NT_UNSTRUCTURED);
				}
				logger.debug("Sunhub:::after add root node");
			}
			logger.debug("Sunhub:::rootpath is:: {}",  page.getPath());
			Resource rootResource = resolver.getResource(page.getPath() + "/jcr:content/root");
			
			if (null != rootResource) {
				logger.debug("Sunhub:::rootResource not null");
				final Map<String, Object> expFragment = new HashMap<>();
				expFragment.put(FRAGMENTPATH,
						"/content/experience-fragments/sunlife/internal/source/pal/en/header/master");
				expFragment.put(JcrResourceConstants.SLING_RESOURCE_TYPE_PROPERTY,
						"sunlife/legacy/components/content/experiencefragment");
				expFragment.put(JcrConstants.JCR_PRIMARYTYPE, JcrConstants.NT_UNSTRUCTURED);
				Resource expHeader = rootResource.getChild("experiencefragment_header");
				if (null == expHeader) {
					logger.debug("Sunhub:::experience fragment header not present");
					resolver.create(rootResource, "experiencefragment_header", expFragment);
				} else {
					logger.debug("Sunhub:::experience fragment header present");
				}
				final Map<String, Object> layoutContainer = new HashMap<>();
				layoutContainer.put(JcrConstants.JCR_PRIMARYTYPE, JcrConstants.NT_UNSTRUCTURED);
				layoutContainer.put("modelTitleLevel", "p");
				layoutContainer.put("noc", "1");
				layoutContainer.put(JcrResourceConstants.SLING_RESOURCE_TYPE_PROPERTY,
						"sunlife/legacy/components/content/legacy-layout-container");
				layoutContainer.put("type", "normal");
				layoutContainer.put("typeVal", "normal");
				Resource layoutCont = rootResource.getChild(LAYOUT_CONTAINER);
				if (null == layoutCont) {
					logger.debug("Sunhub:::layout container not present");
					resolver.create(rootResource, LAYOUT_CONTAINER, layoutContainer);
				} else {
					logger.debug("Sunhub:::layout container is present");
					//Resource layoutContRes = resolver.getResource(rootResource.getPath()+"/layout_container");
					Node layoutContNode = layoutCont.adaptTo(Node.class);
					if (null != layoutContNode) {
						logger.debug("Sunhub:::layout container node not null");
					//Node expHeaderNode = pageNode.getNode(rootResource.getPath()+"/layout_container");					
						layoutContNode.setProperty("modelTitleLevel", "p");
						layoutContNode.setProperty("noc", "1");
						layoutContNode.setProperty("type", "normal");
						layoutContNode.setProperty("typeVal", "normal");
						//layoutContNode.save();
						logger.debug("Sunhub:::layout container node property set");
					}
				}
				expFragment.put(FRAGMENTPATH,
						"/content/experience-fragments/sunlife/internal/source/pal/en/footer/master");
				expFragment.put(JcrResourceConstants.SLING_RESOURCE_TYPE_PROPERTY,
						"sunlife/legacy/components/content/experiencefragment");
				expFragment.put(JcrConstants.JCR_PRIMARYTYPE, JcrConstants.NT_UNSTRUCTURED);
				Resource expFooter = rootResource.getChild("experiencefragment_footer");
				if (null == expFooter) {
					logger.debug("Sunhub:::experience fragment footer not present");
					resolver.create(rootResource, "experiencefragment_footer", expFragment);
				} else {
					logger.debug("Sunhub:::experience fragment footer present");
				}
				final Map<String, Object> container = new HashMap<>();
				Resource layoutContainerResource1 = rootResource.getChild(LAYOUT_CONTAINER);
				if (null != layoutContainerResource1) {
					logger.debug("Sunhub:::creating layout container child nodes");
					container.put(JcrConstants.JCR_PRIMARYTYPE, JcrConstants.NT_UNSTRUCTURED);
					container.put(JcrResourceConstants.SLING_RESOURCE_TYPE_PROPERTY,
							"sunlife/legacy/components/content/container");
					resolver.create(layoutContainerResource1, CONTAINER, container);
					final Map<String, Object> breadcrumb = new HashMap<>();
					Resource containerResource = layoutContainerResource1.getChild(CONTAINER);
					if (null != containerResource) {
						breadcrumb.put(JcrConstants.JCR_PRIMARYTYPE, JcrConstants.NT_UNSTRUCTURED);
						breadcrumb.put(JcrResourceConstants.SLING_RESOURCE_TYPE_PROPERTY,
								"sunlife/legacy/components/content/breadcrumb");
						breadcrumb.put("hideBreadcrumb", FALSE);
						breadcrumb.put("hideCurrent", FALSE);
						breadcrumb.put("showHidden", FALSE);
						breadcrumb.put("startLevel", "6");
						resolver.create(containerResource, "breadcrumb", breadcrumb);
						final Map<String, Object> titlebar = new HashMap<>();
						titlebar.put(JcrConstants.JCR_PRIMARYTYPE, JcrConstants.NT_UNSTRUCTURED);
						String jcrTitle = parentPagePath.toString().contains(CONTENT_FOR_CLIENT) ? "Content for client"
								: "Grow your business";
						titlebar.put(JcrResourceConstants.SLING_RESOURCE_TYPE_PROPERTY,
								"sunlife/legacy/components/content/titlebar");
						titlebar.put(JcrConstants.JCR_TITLE, jcrTitle);
						resolver.create(containerResource, "titlebar", titlebar);
						layoutContainer.put("noc", "2");
						layoutContainer.put("type", "75:25N");
						layoutContainer.put("typeVal", "75:25N");
						resolver.create(containerResource, LAYOUT_CONTAINER, layoutContainer);
						Resource layoutContainerResource2 = containerResource.getChild(LAYOUT_CONTAINER);
						if (null != layoutContainerResource2) {
							resolver.create(layoutContainerResource2, CONTAINER, container);
							resolver.create(layoutContainerResource2, "container2", container);
							final Map<String, Object> article = new HashMap<>();
							Resource containerResource1 = layoutContainerResource2.getChild(CONTAINER);
							Resource containerResource2 = layoutContainerResource2.getChild("container2");
							if (null != containerResource1 && null != containerResource2) {
								article.put(JcrConstants.JCR_PRIMARYTYPE, JcrConstants.NT_UNSTRUCTURED);
								article.put(JcrResourceConstants.SLING_RESOURCE_TYPE_PROPERTY,
										"sunlife/legacy/components/content/article");
								article.put("checkboxComment", FALSE);
								article.put("checkboxHideDate", FALSE);
								article.put(FRAGMENTPATH, cfPath);
								article.put("ratingRequired", FALSE);
								article.put("variationName", "master");
								resolver.create(containerResource1, "article", article);
								expFragment.put(FRAGMENTPATH,
										"/content/experience-fragments/sunlife/external/ca/sl/sunhub/en/rightrail/master");
								expFragment.put(JcrResourceConstants.SLING_RESOURCE_TYPE_PROPERTY,
										"sunlife/ca/components/content/experiencefragment");
								expFragment.put(JcrConstants.JCR_PRIMARYTYPE, JcrConstants.NT_UNSTRUCTURED);
								resolver.create(containerResource2, "experiencefragment", expFragment);
							}
						}
					}
				}
				logger.debug("Sunhub:::page node created1");
			}
		}
	}

	/**
	 * Parses the date and time.
	 *
	 * @param sdf the sdf
	 * @param dateAndTime the date and time
	 * @return the calendar
	 */
	private Calendar parseDateAndTime(SimpleDateFormat sdf, String dateAndTime) {
		Date date;
		Calendar cal = new GregorianCalendar();
		try {
			date = sdf.parse(dateAndTime);
			cal.setTime(date);
		} catch (ParseException e) {
			logger.error("Sunhub:::Date parse exception");
			return null;
		}
		return cal;
	}

	/**
	 * Creates the content fragment.
	 *
	 * @param resolver the resolver
	 * @param cfFolderPath the cf folder path
	 * @return the content fragment
	 * @throws NoSuchMethodException the no such method exception
	 * @throws IllegalAccessException the illegal access exception
	 * @throws InvocationTargetException the invocation target exception
	 */
	private ContentFragment createContentFragment(ResourceResolver resolver, String cfFolderPath)
			throws NoSuchMethodException, IllegalAccessException, InvocationTargetException {
		Resource template = resolver.resolve("/conf/sunlife/settings/dam/cfm/models/article-model");
		ContentFragment contentFragment = null;
		Resource parent = resolver.getResource(cfFolderPath);
		if (null != parent) {
			Resource fragmentResource = parent.getChild(name);
			if (fragmentResource == null) {
				FragmentTemplate fragmentTemplate = template.adaptTo(FragmentTemplate.class);
				contentFragment = (ContentFragment) MethodUtils.invokeMethod(fragmentTemplate, "createFragment", parent,
						name, title);
				logger.debug("Sunhub:::Inside CF creation complete");
			}
		}
		return contentFragment;
	}

	/**
	 * Creates the folder.
	 *
	 * @param resolver the resolver
	 * @param parentFolder the parent folder
	 * @param folderName the folder name
	 * @throws PersistenceException the persistence exception
	 */
	private void createFolder(ResourceResolver resolver, String parentFolder, String folderName)
			throws PersistenceException {
		final Map<String, Object> folderProperties = new HashMap<>();
		folderProperties.put(JcrConstants.JCR_PRIMARYTYPE, JcrResourceConstants.NT_SLING_ORDERED_FOLDER);
		Resource r = resolver.getResource(parentFolder);
		if (null != r) {
			Resource folder = resolver.create(r, folderName, folderProperties);
			final Map<String, Object> jcrContent = new HashMap<>();
			jcrContent.put(JcrConstants.JCR_PRIMARYTYPE, JcrConstants.NT_UNSTRUCTURED);
			jcrContent.put(JcrConstants.JCR_TITLE, StringUtils.capitalize(folderName));
			jcrContent.put("dam:noThumbnail", true);
			resolver.create(folder, JcrConstants.JCR_CONTENT, jcrContent);
		}
	}

	/**
	 * Adds the property.
	 *
	 * @param resolver the resolver
	 * @param cfPath the cf path
	 * @param pagePath the page path
	 * @throws RepositoryException the repository exception
	 */
	private void addProperty(ResourceResolver resolver, String cfPath, String pagePath) throws RepositoryException {
		Resource masterData = resolver.getResource(cfPath + "/jcr:content/data/master");
		Resource metaData = resolver.getResource(cfPath + "/jcr:content/metadata");
		if (null != masterData && null != metaData) {
			Node masterDataNode = masterData.adaptTo(Node.class);
			Node metaDataNode = metaData.adaptTo(Node.class);
			if (null != metaDataNode && null != masterDataNode) {
				masterDataNode.setProperty("articleHeadline", title);
				masterDataNode.setProperty("articleMiniDescription", teaser);
				masterDataNode.setProperty("articleMainDescription", getArticleMainDescription());
				masterDataNode.setProperty("articlePageLink", pagePath);
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
				Calendar cal = parseDateAndTime(sdf, displayDate);
				if (null != cal) {
					logger.debug("Sunhub:::cal!=null in addProperty");
					masterDataNode.setProperty("articlePublishedDate", cal);
				}
				String[] tags = categoryTags(cfPath);
				metaDataNode.setProperty(TagConstants.PN_TAGS, tags);
			}
		}
	}

	/**
	 * Gets the article main description.
	 *
	 * @return the article main description
	 */
	private String getArticleMainDescription() {
		return "<div id=\"third_party_article_url\" style=\"display: none;\">" + externalUrl + "</div>"
				+ "<div id=\"thumbnail_url\" style=\"display: none;\">" + thumbnailImage + "</div>" + "</div>\r\n"
				+ "<div id=\"siteName\" style=\"display: none;\">" + siteName + "</div>";
	}

	/**
	 * Category tags.
	 *
	 * @param path the path
	 * @return the string[]
	 */
	private String[] categoryTags(String path) {
		Locale loc = Locale.ENGLISH;
		category = category.toLowerCase(loc);
		ArrayList<String> list = new ArrayList<>();
		if (category.contains(",")) {
			String[] split = category.split(",");
			for (String tag : split) {
				if (tag.equalsIgnoreCase("tpadvisor") || tag.equalsIgnoreCase("csfadvisor")) {
					list.add("sunlife:slf/sunhub/audience/" + tag);
				} else {
					if (path.contains(CONTENT_FOR_CLIENT)) {
						list.add("sunlife:slf/sunhub/content-for-clients/" + tag);
					} else {
						list.add("sunlife:slf/sunhub/grow-your-business/" + tag);
					}
				}
			}
		} else {
			if (category.equalsIgnoreCase("tpadvisor") || category.equalsIgnoreCase("csfadvisor")) {
				list.add("sunlife:slf/sunhub/audience/" + category);
			} else {
				if (path.contains(CONTENT_FOR_CLIENT)) {
					list.add("sunlife:slf/sunhub/content-for-clients/" + category);
				} else {
					list.add("sunlife:slf/sunhub/grow-your-business/" + category);
				}
			}
		}
		list.add("sunlife:slf/sunhub/article-type/tpsite");
		return list.toArray(new String[list.size()]);
	}

	/**
	 * Removes the special char and to lower case.
	 *
	 * @param inputString the input string
	 * @return the string
	 */
	private String removeSpecialCharAndToLowerCase(String inputString) {
		Locale loc = Locale.ENGLISH;
		return inputString.replaceAll("[^A-Za-z0-9/-]+", "-").toLowerCase(loc);
	}

	/**
	 * Creates the report.
	 *
	 * @param rowNumber the row number
	 * @param errorMessage the error message
	 */
	private void createReport(int rowNumber, String errorMessage) {
		Sheet sheet = reportBook.getSheetAt(1);
		Row headingRow = sheet.getRow(INT_ZERO);
		int lastCell = headingRow.getLastCellNum() - INT_ONE;
		CellStyle successStyle = reportBook.createCellStyle();
		CellStyle failStyle = reportBook.createCellStyle();
		successStyle.setFillForegroundColor(IndexedColors.GREEN.getIndex());
		successStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		failStyle.setFillForegroundColor(IndexedColors.RED.getIndex());
		failStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		Row row = sheet.getRow(rowNumber);
		Cell status = row.createCell(lastCell - INT_ONE);
		Cell error = row.createCell(lastCell);
		if (StringUtils.isBlank(errorMessage)) {
			status.setCellValue("Created");
			status.setCellStyle(successStyle);
			error.setCellValue("");
		} else {
			status.setCellValue("Failed");
			status.setCellStyle(failStyle);
			error.setCellValue(errorMessage);
		}
	}

	/**
	 * Write report to DAM.
	 *
	 * @param inputFile the input file
	 * @param resResolver the res resolver
	 * @throws IOException Signals that an I/O exception has occurred.
	 */
	private void writeReportToDAM(String inputFile, ResourceResolver resResolver) throws IOException {
		String reportFolderPath = null;
		String fileName = null;
		if (inputFile.contains(FORWARD_SLASH)) {
			reportFolderPath = inputFile.substring(INT_ZERO, inputFile.lastIndexOf(FORWARD_SLASH));
			fileName = inputFile.substring((inputFile.lastIndexOf(FORWARD_SLASH) + INT_ONE));
			fileName = fileName.substring(INT_ZERO, fileName.indexOf('.'));
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			reportBook.write(out);
			InputStream postAddInStream = new ByteArrayInputStream(out.toByteArray());
			AssetManager assetMgr = resResolver.adaptTo(AssetManager.class);
			String timeStamp = getTimeStamp();
			String reportPath = reportFolderPath + FORWARD_SLASH + fileName + "_Report_" + timeStamp + ".xlsx";
			if (null != assetMgr) {
				assetMgr.createAsset(reportPath, postAddInStream, "application/vnd.ms-excel", true);
			}
		}

	}

	/**
	 * Gets the time stamp.
	 *
	 * @return the time stamp
	 */
	private String getTimeStamp() {
		String time = "";
		Date date = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH-mm-ss");
		time = formatter.format(date);
		time = time.replace(" ", "-");
		time = time.replace("-", "_");

		return time;
	}
	
	/**
	 * Sets the category.
	 * 
	 * @param category
	 *          the category
	 */
	public void setCategory(String category) {
        this.category = category;
	 }
	 /**
	  * Sets the displayDate.
	  * 
	  * @param displayDate
	  *          the displayDate
	  */
	 public void setDisplayDate(String displayDate) {
	        this.displayDate = displayDate;
	 }
	/**
	 *Sets the unpublishDate.
	 * 
	 * @param unpublishDate
	 *           the unpublishDate
	 */
	 public void setUnpublishDate(String unpublishDate) {
	        this.unpublishDate = unpublishDate;
	 }
	/**
	 * Sets the title.
	 * 
	 * @param title
	 *           the title
	 */
	 public void setTitle(String title) {
	        this.title = title;
	 }
	/**
	 * Sets the name.
	 * 
	 * @param name
	 *           the name
	 */
	 public void setName(String name) {
	        this.name = name;
	 }
	/**
	 * Sets the folderPath.
	 * 
	 * @param folderPath
	 *           the folderPath
	 */
	 public void setFolderPath(String folderPath) {
	        this.folderPath = folderPath;
	 }

}
