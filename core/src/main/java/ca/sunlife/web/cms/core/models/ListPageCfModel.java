/**
 *
 */
package ca.sunlife.web.cms.core.models;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;
import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.NameConstants;
import com.day.cq.wcm.api.Page;


/**
 * The Class BasePageModel.
 *
 * @author TCS
 * @version 1.0
 */
@ Model (adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ListPageCfModel {

	/** The Constant LOG. */
	private static final Logger LOG = LoggerFactory.getLogger(ListPageCfModel.class);

	/** The current page. */
	@ScriptVariable
	private Page currentPage;

	/** The request. */
	@Self
	private SlingHttpServletRequest request;

	/** The resource resolver. */
	@ SlingObject
	private ResourceResolver resourceResolver;

	//	  @Inject
	//	  @Optional
	//	  private List<Resource> countries;


	/** The items. */
	private final List<String> items = new ArrayList <>();

	/** The resourceType. */
	@Inject
	@Named("sling:resourceType")
	@Default(values = "No resourceType")
	protected String resourceType;

	/** The CFPAth. */
	@Inject
	@Optional
	@Named("cfParentPath")
	private List<Resource> cfParentPath;

	private List<CFPaths> cfPathLists = new ArrayList<>();
	/**
	 * Gets the list items.
	 *
	 * @return the list items
	 */
	public List<String> getListItems() {
		return Collections.unmodifiableList(items);
	}


	/**
	 * Gets the cfPathLists.
	 *
	 * @return the cfPathLists
	 */	  
	public List <CFPaths> getCfPathLists(){
		return Collections.unmodifiableList(cfPathLists);
	}

	/**
	 * Sets the cfPathLists.
	 *
	 * @param cfPathLists
	 */
	public void setCfPathLists(List<CFPaths> cfPathLists){
		this.cfPathLists = Collections.unmodifiableList(cfPathLists);
	}

	/** The regular page root path. */
	@ Inject
	@ Named ("regularPagePath")
	private String regularPagePath;

	/**
	 * Gets the regularPagePath.
	 *
	 * @return the regularPagePath
	 */
	public String getRegularPagePath() {
		return regularPagePath;
	}
	/**
	 * Sets the regularPagePath.
	 *
	 * @param regularPagePath
	 */
	public void setRegularPagePath(String regularPagePath) {
		this.regularPagePath = regularPagePath;
	}	

	/**
	 * Inits the model.
	 *
	 * @throws LoginException
	 *             the login exception
	 * @throws RepositoryException
	 *             the repository exception
	 */
	@PostConstruct
	public void init() throws LoginException, RepositoryException {
		LOG.debug("Inside ListPageCfModel Init method");
		String newRegularPagePath = getRegularPagePath();
		LOG.debug("newRegularPagePath::"+newRegularPagePath);
		Session session = resourceResolver.adaptTo(Session.class);
		if(newRegularPagePath!=null) {
			LOG.debug("nerRegularpagePath is not null");
			Node rootNode = session.getRootNode();
			Node regularNode = rootNode.getNode(newRegularPagePath.substring(1));
			items.add(regularNode.getPath());
			NodeIterator childNodes = regularNode.getNodes();
			while(childNodes.hasNext()) {
				LOG.debug("regular page has child");
				Node childNode = childNodes.nextNode();
				if(childNode.getProperty(JcrConstants.JCR_PRIMARYTYPE).getValue().getString().equalsIgnoreCase(NameConstants.NT_PAGE)) {
					Node newNode = rootNode.getNode(childNode.getPath().substring(1)+"/jcr:content");
					if(newNode.hasProperty("advancedPageType")) {
					String advPageType = newNode.getProperty("advancedPageType").getValue().getString();
					if(advPageType.equalsIgnoreCase("regular")) {
						LOG.debug("ADV page type is regular");
						items.add(childNode.getPath());
					}
				}
			}
			}
		}
		if(!cfParentPath.isEmpty()) {
			LOG.debug("cfParentPath is not empty");
			for(Resource resource : cfParentPath) {			
				CFPaths cfPaths = resource.adaptTo(CFPaths.class);
				cfPathLists.add(cfPaths);
			}
		}
		LOG.debug("after cfParentPath is not empty");
		List <CFPaths> cfPaths = getCfPathLists();
		for(CFPaths nodePathItem : cfPaths) {
			String nodePath = 	nodePathItem.getRootPagePath();
			if(nodePath!=null) {
				Node rootNode = session.getRootNode();
				Node currentNode = rootNode.getNode(nodePath.substring(1));
				Node newNode = rootNode.getNode(currentNode.getPath().substring(1)+"/jcr:content/root/layout_container/container1");
				NodeIterator multiChildNodes = newNode.getNodes();
				while(multiChildNodes.hasNext()) {
					Node multiChildNode = multiChildNodes.nextNode();
					Node newCfmNode = rootNode.getNode(multiChildNode.getPath().substring(1)+"/cfmultifield");
					NodeIterator itemChildNodes = newCfmNode.getNodes();
					while(itemChildNodes.hasNext()) {
						Node itemChildNode = itemChildNodes.nextNode();
						String cfPath = itemChildNode.getProperty("cfPath").getValue().getString();
						//if(cfPath.contains("/content/dam/sunlife/external/ca/en/content-fragments") || cfPath.contains("/content/dam/sunlife/external/ca/fr/content-fragments")) {
						if(rootNode.hasNode(cfPath.substring(1))) {
						Node metaData = rootNode.getNode(cfPath.substring(1)+"/jcr:content/metadata");
						Node cfmNode = rootNode.getNode(cfPath.substring(1)+"/jcr:content/data/master");
						String aemtags = "";
						StringBuffer tmp = new StringBuffer(aemtags);
						LOG.debug("cfmNode Path is: "+ cfmNode.getPath());
						if(metaData.hasProperty(NameConstants.PN_TAGS)){
							for(int p=0;p<metaData.getProperty(NameConstants.PN_TAGS).getValues().length;p++){
								tmp.append( metaData.getProperty(NameConstants.PN_TAGS).getValues()[p].getString());
							}							
							String tagValue = tmp.toString();
							LOG.debug("tagValue is::"+tagValue);
							if(tagValue.contains("sunlife:slf/sunhub/article-type/tpsite")) {
								String articleMainDescription = cfmNode.getProperty("articleMainDescription").getValue().getString();
								Document doc = Jsoup.parse(articleMainDescription);
								String articlePageLink = doc.select("#third_party_article_url").text();
								items.add(articlePageLink);
							}else {
								String pageLink = cfmNode.getProperty("articlePageLink").getValue().getString();
								items.add(pageLink);									
							}								

						}						

					  }
					}
				}			
			}
		}
	}

}
