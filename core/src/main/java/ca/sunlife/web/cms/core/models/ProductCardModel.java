package ca.sunlife.web.cms.core.models;

import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import javax.annotation.PostConstruct;
import javax.inject.Inject;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import com.day.cq.wcm.api.Page;
import ca.sunlife.web.cms.core.services.CoreResourceResolver;
import ca.sunlife.web.cms.core.services.SiteConfigService;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.Value;
import javax.jcr.Property;
import java.util.Iterator;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Collection;
import javax.jcr.Session;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ValueMap;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.SearchResult;
import com.adobe.cq.dam.cfm.converter.ContentTypeConverter;
import com.adobe.cq.wcm.core.components.internal.models.v1.contentfragment.DAMContentFragmentImpl;
import com.adobe.cq.wcm.core.components.models.contentfragment.DAMContentFragment;
import com.day.cq.commons.jcr.JcrConstants;

/**
 * The Class ProductCardModel.
 */
@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "sunlife/core/components/content/product-cards")
public class ProductCardModel {

	/** The topc. */
	@Inject
	@Via("resource")
	private String topc;

	/** The fragment path. */
	@Inject
	@Via("resource")
	private String productCardFragmentPath;

	/** The folder path. */
	@Inject
	@Via("resource")
	private String folderPath;
	
	/** The title. */
	@Inject
	@Via("resource")
	private String title;
	
	/** The icon. */
	@Inject
	@Via("resource")
	private String icon;
	
	/** The text. */
	@Inject
	@Via("resource")
	private String text;
	
	/** The card is featured. */
	@Inject
	@Via("resource")
	private String cardIsFeatured;

	/** The config service. */
	@Inject
	private SiteConfigService configService;

	/** The current page. */
	@ScriptVariable
	private Page currentPage;

	/** The core resource resolver. */
	@Inject
	private CoreResourceResolver coreResourceResolver;

	/** The content type converter. */
	@Inject
	private ContentTypeConverter contentTypeConverter;

	/** The Constant JCR_CONTENT_DATA_MASTER. */
	private static final String JCR_CONTENT_DATA_MASTER = "/jcr:content/data/master";
	
	/** The Constant JCR_CONTENT_METADATA. */
	private static final String JCR_CONTENT_METADATA = "/jcr:content/metadata";
	
	/** The Constant ELEMENT_NAMES. */
	private static final String[] ELEMENT_NAMES = { "productCardHeading", "productCardContent",
			"productCardPagePath", "featuredCard", "productCardImage" };
	
	/** The featured image path. */
	private String featuredImagePath;
	
	/** The pc data. */
	private final Map<String, String> pcData = new HashMap<>();
	
	/** The list of product cards. */
	private final List<Map<String, String>> listOfProductCards = new ArrayList<>();
	
	/** The item list. */
	private final List<DAMContentFragment> itemList = new ArrayList<>();
	
	/** The article CF path. */
	private String articleCFPath;
	
	/** The Constant LOG. */
	private static final Logger LOG = LoggerFactory.getLogger(ProductCardModel.class);
	
	/**
	 * Gets the topc.
	 *
	 * @return the topc
	 */
	public String getTopc() {
		return topc;
	}

	/**
	 * Sets the topc.
	 *
	 * @param topc the new topc
	 */
	public void setTopc(String topc) {
		this.topc = topc;
	}

	
	/**
	 * Gets the product card fragment path.
	 *
	 * @return the product card fragment path
	 */
	public String getProductCardFragmentPath() {
		return productCardFragmentPath;
	}

	
	/**
	 * Sets the product card fragment path.
	 *
	 * @param productCardFragmentPath the new product card fragment path
	 */
	public void setProductCardFragmentPath(String productCardFragmentPath) {
		this.productCardFragmentPath = productCardFragmentPath;
	}

	/**
	 * Gets the folder path.
	 *
	 * @return the folder path
	 */
	public String getFolderPath() {
		return folderPath;
	}

	/**
	 * Sets the folder path.
	 *
	 * @param folderPath the new folder path
	 */
	public void setFolderPath(String folderPath) {
		this.folderPath = folderPath;
	}

	/**
	 * Gets the pc data.
	 *
	 * @return the pc data
	 */
	public final Map<String, String> getPcData() {
		return Collections.unmodifiableMap(pcData);
	}

	/**
	 * Gets the list of product cards.
	 *
	 * @return the list of product cards
	 */
	public final List<Map<String, String>> getListOfProductCards() {
		return listOfProductCards;
	}

	/**
	 * Gets the featured image path.
	 *
	 * @return the featured image path
	 */
	public String getFeaturedImagePath() {
		return featuredImagePath;
	}

	/**
	 * Sets the featured image path.
	 *
	 * @param featuredImagePath the new featured image path
	 */
	public void setFeaturedImagePath(String featuredImagePath) {
		this.featuredImagePath = featuredImagePath;
	}

	/**
	 * Gets the item list.
	 *
	 * @return the item list
	 */
	public Collection<DAMContentFragment> getItemList() {
		return Collections.unmodifiableCollection(itemList);
	}

	/**
	 * Gets the title.
	 *
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * Sets the title.
	 *
	 * @param title the new title
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * Gets the icon.
	 *
	 * @return the icon
	 */
	public String getIcon() {
		return icon;
	}

	/**
	 * Sets the icon.
	 *
	 * @param icon the new icon
	 */
	public void setIcon(String icon) {
		this.icon = icon;
	}

	/**
	 * Gets the text.
	 *
	 * @return the text
	 */
	public String getText() {
		return text;
	}

	/**
	 * Sets the text.
	 *
	 * @param text the new text
	 */
	public void setText(String text) {
		this.text = text;
	}

	/**
	 * Gets the card is featured.
	 *
	 * @return the card is featured
	 */
	public String getCardIsFeatured() {
		return cardIsFeatured;
	}

	/**
	 * Sets the card is featured.
	 *
	 * @param cardIsFeatured the new card is featured
	 */
	public void setCardIsFeatured(String cardIsFeatured) {
		this.cardIsFeatured = cardIsFeatured;
	}


	/**
	 * Inits the.
	 */
	@PostConstruct
	private void init() {
		try {
			featuredImagePath = configService.getConfigValues("featuredImagePath", currentPage.getPath());
			if (topc.equalsIgnoreCase("static")) {
				getProductCardData();
				LOG.debug("Sent Product Card data for static cards");
			} else if (topc.equalsIgnoreCase("dynamic")) {
				LOG.debug("Dynamic option selected");
				getProductCardDataDynamic();
			} else if (topc.equalsIgnoreCase("rightnav")) {
				LOG.debug("Rignt Nav option selected");
			}
		} catch (Exception ex) {
			LOG.error("Exception occured in main :: {}", ex);
		}

	}

	/**
	 * Gets the product card data.
	 */
	public void getProductCardData() {
		ResourceResolver resourceResolver;
		try {
			resourceResolver = coreResourceResolver.getResourceResolver();
			LOG.debug("Reading content fragment {}", getProductCardFragmentPath() + JCR_CONTENT_DATA_MASTER);
		      final Resource productCardResource = resourceResolver
		          .getResource(getProductCardFragmentPath().concat(JCR_CONTENT_DATA_MASTER));
		      
		      if (null != productCardResource) {
		          LOG.debug("Parsing Article Data");
		          final ValueMap productContent = productCardResource.getValueMap();
		          for (int i = 0; i < ELEMENT_NAMES.length; i++) {
		        	  pcData.put(ELEMENT_NAMES[i], productContent.containsKey(ELEMENT_NAMES[i]) ? productContent.get(ELEMENT_NAMES[i], String.class) : StringUtils.EMPTY);
		          }
		      }
		      LOG.debug("Statict Product Card Data {}", pcData);
		      
		} catch (LoginException  e) {
			LOG.debug(" Exception in getProductCardData {}", e);
		}
	      
	}

	/**
	 * Gets the product card data dynamic.
	 */
	public void getProductCardDataDynamic() {
		ResourceResolver resourceResolver = null;
		try {
			resourceResolver = coreResourceResolver.getResourceResolver();
			final Session session = resourceResolver.adaptTo(Session.class);
			if (session == null) {
				LOG.warn("Session was null therefore no query was executed");
				return;
			}
			final QueryBuilder queryBuilder = resourceResolver.adaptTo(QueryBuilder.class);
			if (queryBuilder == null) {
				LOG.warn("Query builder was null therefore no query was executed");
				return;
			}
			List<String> articleTags = getTags(getArticleCFPath(currentPage.getPath()));

			switch (articleTags.size()) {
			case 0: 
				LOG.info("Article does not contain any tags.");
				break;
			

			case 1: 
				LOG.info("Article does not contains 1 tag.");
				itemList.addAll(getContentFragmentList(queryBuilder, session, articleTags.get(0), 3));
				LOG.info("Number of results {}", itemList.size());
				break;
			

			case 2: 
				LOG.info("Article does not contains 2 tags.");
				itemList.addAll(getContentFragmentList(queryBuilder, session, articleTags.get(0), 2));

				if (itemList.size() == 2) {
					itemList.addAll(1,
							getContentFragmentList(queryBuilder, session, articleTags.get(1), 1));

				} else {
					itemList.addAll(getContentFragmentList(queryBuilder, session, articleTags.get(1), 2));
				}

				break;
			

			case 3:
				LOG.info("Article does not contains 3 tags.");
				getContentFragmentList(queryBuilder, session, articleTags.get(0), 1);
				itemList.addAll(getContentFragmentList(queryBuilder, session, articleTags.get(0), 1));
				itemList.addAll(getContentFragmentList(queryBuilder, session, articleTags.get(1), 1));
				itemList.addAll(getContentFragmentList(queryBuilder, session, articleTags.get(2), 1));
				break;
			
			default:
				break;
			}

		} catch (LoginException e) {
			LOG.error("Login exception while trying to get resource resolver {}", e);
		} finally {
			if (null != resourceResolver) {
				resourceResolver.close();
			}
		}
	}

	/**
	 * Gets the content fragment list.
	 *
	 * @param queryBuilder the query builder
	 * @param session the session
	 * @param tag the tag
	 * @param limit the limit
	 * @return the content fragment list
	 */
	private List<DAMContentFragment> getContentFragmentList(QueryBuilder queryBuilder,
			Session session, String tag, int limit) {
		int offset = 0;
		List<DAMContentFragment> items = new ArrayList<>();
		final Map<String, String> queryParameterMap = new HashMap<>();
		queryParameterMap.put("path", getFolderPath());
		queryParameterMap.put("type", com.day.cq.dam.api.DamConstants.NT_DAM_ASSET);
		queryParameterMap.put("p.limit", Integer.toString(limit));
		queryParameterMap.put("p.offset", Integer.toString(offset));
		queryParameterMap.put("1_property", JcrConstants.JCR_CONTENT + "/data/cq:model");
		queryParameterMap.put("1_property.value", "/conf/sunlife-apac/settings/dam/cfm/models/product-card-model");
		queryParameterMap.put("tagid.property", JcrConstants.JCR_CONTENT + "/metadata/cq:tags");
		queryParameterMap.put("tagid", tag);
		queryParameterMap.put("orderby", "@" + JcrConstants.JCR_CONTENT + "/data/master/productCardName");

		final PredicateGroup predicateGroup = PredicateGroup.create(queryParameterMap);
		LOG.debug("Query Params : {} : predicateGroup {}", queryParameterMap, predicateGroup);
		final Query query = queryBuilder.createQuery(predicateGroup, session);

		final SearchResult searchResult = query.getResult();

		LOG.debug("Query statement: '{}' : total matches: {}", searchResult.getQueryStatement(),
				searchResult.getTotalMatches());
		// Query builder has a leaking resource resolver, so the following work around
		// is required.
		ResourceResolver leakingResourceResolver = null;
		try {
			// Iterate over the hits if you need special information
			final Iterator<Resource> resourceIterator = searchResult.getResources();
			while (resourceIterator.hasNext()) {
				final Resource resource = resourceIterator.next();
				if (leakingResourceResolver == null) {
					// Get a reference to QB's leaking resource resolver
					leakingResourceResolver = resource.getResourceResolver();
				}

				final DAMContentFragment contentFragmentModel = new DAMContentFragmentImpl(resource,
						contentTypeConverter, null, ELEMENT_NAMES);

				items.add(contentFragmentModel);
			}
		} finally {
			if (null != leakingResourceResolver) {
				// Always close the leaking query builder resource resolver
				leakingResourceResolver.close();
			}
		}

		return items;
	}

	/**
	 * Gets the tags.
	 *
	 * @param path the path
	 * @return the tags
	 */
	public List<String> getTags(String path) {
		ArrayList<String> tagList = new ArrayList<>();
		try {
			ResourceResolver resourceResolver = coreResourceResolver.getResourceResolver();
			final Resource productCardMetadata = resourceResolver.getResource(path + JCR_CONTENT_METADATA);
			if (null != productCardMetadata) {
				LOG.info("Fetching metadata");
				Node metaNode = productCardMetadata.adaptTo(Node.class);
				LOG.info("Metanode is :: {}", metaNode);
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
			LOG.info("Exception occured :: in tags {}", ex);
		}

		return tagList;

	}

	/**
	 * Gets the article CF path.
	 *
	 * @param path the path
	 * @return the article CF path
	 */
	public String getArticleCFPath(String path) {
			try {
				ResourceResolver acfpResourceResolver = coreResourceResolver.getResourceResolver();
				final Resource pageResource = acfpResourceResolver.getResource(path);
				if (null != pageResource) {
					Node startNode = pageResource.adaptTo(Node.class);
					NodeIterator iterator = null != startNode ? startNode.getNodes() : null; 
					if (null != iterator) {
						 while (iterator.hasNext()) {
							 Node childNode = (Node) iterator.next();
							if (childNode.hasProperty("articleID")) {
								articleCFPath = childNode.getProperty("fragmentPath").getString();
								LOG.info("Article path is :: {}", articleCFPath);
								break;
							} else {
								getArticleCFPath(childNode.getPath());
							}
						}
					 }
				}
				acfpResourceResolver.close();
			} catch (Exception e) {
				LOG.info("Exception occured while fetching article path :: {}", e);
			}
		
		return articleCFPath;
	}
}
