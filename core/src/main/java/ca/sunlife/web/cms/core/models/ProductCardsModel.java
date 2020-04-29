package ca.sunlife.web.cms.core.models;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.Node;
import javax.jcr.Value;
import javax.jcr.Property;

import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.ValueFormatException;
import org.apache.sling.api.resource.LoginException;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;

import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.SiteConfigService;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, adapters = ProductCardsModel.class, resourceType = "sunlife/core/components/content/product-cards")
public class ProductCardsModel {

	private static final Logger LOG = LoggerFactory.getLogger(ProductCardsModel.class);

	public String getTopc() {
		return topc;
	}

	public void setTopc(String topc) {
		this.topc = topc;
	}

	public String getFragmentPath() {
		return fragmentPath;
	}

	public void setFragmentPath(String fragmentPath) {
		this.fragmentPath = fragmentPath;
	}

	public String getFolderPath() {
		return folderPath;
	}

	public void setFolderPath(String folderPath) {
		this.folderPath = folderPath;
	}

	public List<Categories> getCategories() {
		return categories;
	}

	public void setCategories(List<Categories> categories) {
		this.categories = categories;
	}

	@Inject
	@Via("resource")
	private String topc;

	@Inject
	@Via("resource")
	private String fragmentPath;

	@Inject
	@Via("resource")
	private String folderPath;

	@Inject
	@Via("resource")
	private List<Categories> categories;

	@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
	interface Categories {

		@Inject
		String getCategory();
	}

	@Inject
	private CoreResourceResolver coreResourceResolver;

	@Inject
	private SiteConfigService configService;

	@ScriptVariable
	private Page currentPage;

	// Static final variables
	private static final String JCR_CONTENT_DATA = "/jcr:content/data";
	private static final String JCR_CONTENT_METADATA = "/jcr:content/metadata";
	private static final String PC_PATH = "pcPath";
	private static final String PC_FEATURED_CARD = "pcFeaturedCard";
	private static final String PC_FEATURED_CARD_IMAGE = "pcFeaturedCardImage";
	private static final String PC_IMAGE = "pcImage";
	private static final String PC_HEADING = "pcHeading";
	private static final String PC_CONTENT = "pcContent";

	// Variable initialization and getter setters for content fragment -- Starts
	private String pcHeading;
	private String pcImage;
	private String pcContent;
	private String pcPath;
	private boolean pcFeaturedCard;

	public final String getPcHeading() {
		return pcHeading;
	}

	public final String getPcImage() {
		return pcImage;
	}

	public final String getPcContent() {
		return pcContent;
	}

	public final String getPcPath() {
		return pcPath;
	}

	public final boolean getPcFeaturedCard() {
		return pcFeaturedCard;
	}

	public final void setPcHeading(final String pcHeading) {
		this.pcHeading = pcHeading;
	}

	public final void setPcImage(final String pcImage) {
		this.pcImage = pcImage;
	}

	public final void setPcContent(final String pcContent) {
		this.pcContent = pcContent;
	}

	public final void setPcPath(final String pcPath) {
		this.pcPath = pcPath;
	}

	public final void setPcFeaturedCard(final boolean pcFeaturedCard) {
		this.pcFeaturedCard = pcFeaturedCard;
	}
	// Variable initialization and getter setters for content fragment -- Ends

	// Hash map to store all data from content fragment and it's getter -- Starts
	private final Map<String, String> pcData = new HashMap<>();

	public final Map<String, String> getPcData() {
		return pcData;
	}

	// Hash map to store all data from content fragment and it's getter -- Ends
	@SuppressWarnings("unchecked")
	private final List<String> productCardNames = new ArrayList<>();

	public final List<String> getProductCardNames() {
		return productCardNames;
	}

	@SuppressWarnings("unchecked")
	private final List<Map<String, String>> listOfProductCards = new ArrayList<>();

	public final List<Map<String, String>> getListOfProductCards() {
		return listOfProductCards;
	}

	@SuppressWarnings("unchecked")
	private final Map<String, String> productCards = new HashMap<>();

	public final Map<String, String> getProductCards() {
		return productCards;
	}

	private String nullCheck(String value) {
		return value.equalsIgnoreCase(null) ? StringUtils.EMPTY : value;
	}

	private String articleCFPath = "";
	private ResourceResolver resourceResolver;

	@PostConstruct
	private void init() {
		if (StringUtils.isEmpty(getFragmentPath())) {
			return;
		}
		try {
			if (topc.equalsIgnoreCase("static")) {
				getProductCardData(getFragmentPath());
				LOG.debug("Sent Product Card data for static cards");
			} else if (topc.equalsIgnoreCase("dynamic")) {
				getAllProductCards(getFolderPath());
				Collections.sort(productCardNames);
				List<String> articleTags = getTags(getArticleCFPath(currentPage.getPath()));
				LOG.info("Size of article tags is :: " + articleTags.size());
				switch (articleTags.size()) {
				case 0: {
					LOG.info("Article does not contain any tags.");
					break;
				}
				case 1: {
					LOG.info("One article tag");
					String articleTag = articleTags.get(0);
					String pcPath = "";
					for (String card : productCardNames) {
						pcPath = productCards.get(card);
						if (null != pcPath) {
							LOG.info("pcPath is not null");
							if (null != getTags(pcPath) && getTags(pcPath).size() > 0) {
								LOG.info("Gomma pcPath :: " + getTags(pcPath).get(0));
								if (getTags(pcPath).get(0).equalsIgnoreCase(articleTag)) {
									LOG.info("Match found");
									LOG.info("PCPath is :: " + pcPath);
									getProductCardData(pcPath);
								}
							}
						}
					}
					break;
				}
				case 2: {
					LOG.info("two article tag");
					break;
				}
				case 3:
				default: {
					LOG.info("three article tag");
					break;
				}
				}
				LOG.debug("Sent Product Card data for dynamic cards");

			}
		} catch (Exception ex) {
			LOG.error("Exception occured in main :: " + ex);
		}

	}

	// Method to get product card data and add to array list that is sent to the
	// client -- Starts
	public void getProductCardData(String path) {
		try {
			ResourceResolver pcResourceResolver = coreResourceResolver.getResourceResolver();
			LOG.debug("Reading content fragment {}", path.concat(JCR_CONTENT_DATA));
			final Resource pcResource = pcResourceResolver.getResource(path.concat(JCR_CONTENT_DATA));
			if (null != pcResource) {
				LOG.debug("Parsing Content Fragment Data");
				Node node = pcResource.adaptTo(Node.class);
				LOG.debug("node adapted");
				if (null != node && node.hasNodes()) {
					Iterator<Node> ite = node.getNodes();
					while (ite.hasNext()) {
						Node childNode = ite.next();
						pcData.put(PC_HEADING, nullCheck(childNode.getProperty("productCardHeading").getString()));
						pcData.put(PC_IMAGE, nullCheck(childNode.getProperty("productCardImage").getString()));
						pcData.put(PC_CONTENT, nullCheck(childNode.getProperty("productCardContent").getString()));
						pcData.put(PC_PATH, nullCheck(childNode.getProperty("productCardPagePath").getString()));
						pcData.put(PC_FEATURED_CARD,
								childNode.getProperty("featuredCard").getBoolean() ? "true" : null);
						if (childNode.getProperty("featuredCard").getBoolean()) {
							pcData.put(PC_FEATURED_CARD_IMAGE,
									configService.getConfigValues("featuredImagePath", currentPage.getPath()));
						}
						LOG.debug("Added data to hash map :: " + pcData.get("pcHeading"));
						if(listOfProductCards.size() <= 3) {
						listOfProductCards.add(pcData);
						LOG.debug("Added map to array");
						}
					}

				}

			} else {
				LOG.debug("productCard resouce is null ");
			}
		} catch (PathNotFoundException pathEx) {
			LOG.error("Exception occured :: Path not found" + pathEx);
		} catch (ValueFormatException valEx) {
			LOG.error("Exception occured :: Incorrect value format" + valEx);
		} catch (RepositoryException repEx) {
			LOG.error("Exception occured :: Repository not found" + repEx);
		} catch (LoginException logEx) {
			LOG.error("Exception occured :: Login failed" + logEx);
		}

	}
	// Method to get product card data and add to array list that is sent to the
	// client -- Ends

	// Method to get all the product cards - For dynamic variation -- Starts
	public void getAllProductCards(String folderPath) {
		try {
			ResourceResolver pcfResourceResolver = coreResourceResolver.getResourceResolver();
			LOG.debug("Reading all content fragments from the folder  {}", folderPath);
			final Resource pcfResource = pcfResourceResolver.getResource(folderPath);

			if (null != pcfResource) {
				LOG.debug("Parsing Content Fragment Folder");
				Node node = pcfResource.adaptTo(Node.class);
				if (null != node) {
					Iterator<Node> iterator = node.getNodes();
					while (iterator.hasNext()) {
						Node childNode = iterator.next();
						if (childNode.hasProperty("contentFragment")) {
							productCards.put(childNode.getProperty("jcr:title").getString(),
									childNode.getParent().getPath());
							productCardNames.add(childNode.getProperty("jcr:title").getString());

						} else {
							getAllProductCards(childNode.getPath());
						}
					}
				}

			} else {
				LOG.debug("The Content Fragment Folder is  {}", pcfResource);
			}
			pcfResourceResolver.close();
		} catch (Exception ex) {
			LOG.error("Error while getting product cards :: {}", ex);
		}

	}

	// Method to get all the product cards - For dynamic variation -- Ends

	public ArrayList<String> getTags(String path) {
		ArrayList<String> tagList = new ArrayList<String>();
		try {
			resourceResolver = coreResourceResolver.getResourceResolver();
			final Resource productCardMetadata = resourceResolver.getResource(path + JCR_CONTENT_METADATA);
			if (null != productCardMetadata) {
				LOG.info("Fetching metadata");
				Node metaNode = productCardMetadata.adaptTo(Node.class);
				LOG.info("Metanode is :: " + metaNode);
				if (null != metaNode) {
					Property tagArray = metaNode.getProperty("cq:tags");
					Value[] tags = tagArray.getValues();
					for (int i = 0; i < tags.length; i++) {
						tagList.add(tags[i].toString());
					}
				}
			}
			resourceResolver.close();

		} catch (Exception ex) {
			LOG.info("Exception occured :: in tags" + ex);
		}

		return tagList;

	}

	public String getArticleCFPath(String path) {
		if (!path.equals("")) {
			try {
				ResourceResolver acfpResourceResolver = coreResourceResolver.getResourceResolver();
				final Resource pageResource = acfpResourceResolver.getResource(path);
				Node startNode = pageResource.adaptTo(Node.class);
				Iterator<Node> iterator = startNode.getNodes();
				while (iterator.hasNext()) {
					Node childNode = iterator.next();
					if (childNode.hasProperty("articleID")) {
						articleCFPath = childNode.getProperty("fragmentPath").getString();
						LOG.info("Article path is :: " + articleCFPath);
						break;
					} else {
						getArticleCFPath(childNode.getPath());
					}
				}
				acfpResourceResolver.close();
			} catch (Exception e) {
				LOG.info("Exception occured while fetching article path :: " + e);
			}
		}
		return articleCFPath;
	}
}
