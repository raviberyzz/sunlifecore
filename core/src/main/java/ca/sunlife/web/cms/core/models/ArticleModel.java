
package ca.sunlife.web.cms.core.models;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.inject.Inject;
import javax.inject.Named;
import javax.jcr.Node;
import javax.jcr.Session;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.wcm.core.components.internal.models.v1.contentfragment.ContentFragmentImpl;
import com.adobe.cq.wcm.core.components.models.contentfragment.ContentFragment;

/**
 * The Class FormContainer.
 */
@Model(adaptables = {SlingHttpServletRequest.class, Resource.class},adapters = ContentFragment.class,resourceType = "sunlife/core/components/content/article", defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ArticleModel extends ContentFragmentImpl {
	
	/** The log */
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	/**
	 * Instantiates a new article model.
	 */
	public ArticleModel() {
		super();
	}
	
	/** The fragment path. */
	@Inject
	@Via("resource")
	@Optional
	private String fragmentPath;
	
	@ScriptVariable
	private ResourceResolver resolver;
	
	/** The article unique ID. */
	@Inject
	@Via("resource")
	@Optional
	private String articleUniqueID;
	
	/** The checkbox comment. */
	@Inject
	@Via("resource")
	@Optional
	private String checkboxComment;
	
	/** The checkbox hide date. */
	@Inject
	@Via("resource")
	@Optional
	private String checkboxHideDate;
	
	/** The article ID. */
	@Inject
	@Via("resource")
	@Optional
	private String articleID;
	
	/** The jcr last modified. */
	@Inject
	@Named("jcr:lastModified")
	@Via("resource")
	private String jcrLastModified;
	
	
	/**
	 * Gets the fragment path.
	 *
	 * @return the fragment path
	 */
	public String getFragmentPath() {
		return fragmentPath;
	}


	/**
	 * Sets the fragment path.
	 *
	 * @param fragmentPath the new fragment path
	 */
	public void setFragmentPath(String fragmentPath) {
		this.fragmentPath = fragmentPath;
	}


	/**
	 * Gets the checkbox comment.
	 *
	 * @return the checkbox comment
	 */
	public String getCheckboxComment() {
		return checkboxComment;
	}


	/**
	 * Sets the checkbox comment.
	 *
	 * @param checkboxComment the new checkbox comment
	 */
	public void setCheckboxComment(String checkboxComment) {
		this.checkboxComment = checkboxComment;
	}


	/**
	 * Gets the checkbox hide date.
	 *
	 * @return the checkbox hide date
	 */
	public String getCheckboxHideDate() {
		return checkboxHideDate;
	}


	/**
	 * Sets the checkbox hide date.
	 *
	 * @param checkboxHideDate the new checkbox hide date
	 */
	public void setCheckboxHideDate(String checkboxHideDate) {
		this.checkboxHideDate = checkboxHideDate;
	}


	/**
	 * Gets the article unique ID.
	 *
	 * @return the article unique ID
	 */
	public String getArticleUniqueID() {
		return articleUniqueID;
	}


	/**
	 * Sets the article unique ID.
	 *
	 * @param articleUniqueID the new article unique ID
	 */
	public void setArticleUniqueID(String articleUniqueID) {
		this.articleUniqueID = articleUniqueID;
	}


	/**
	 * Gets the article ID.
	 *
	 * @return the article ID
	 */
	public String getArticleID() {
		return articleID;
	}


	/**
	 * Sets the article ID.
	 *
	 * @param articleID the new article ID
	 */
	public void setArticleID(String articleID) {
		this.articleID = articleID;
	}
	
	/**
	 * Gets the jcr last modified.
	 *
	 * @return the jcr last modified
	 */
	public String getJcrLastModified() {
		return getFormatedDate(jcrLastModified);
	}


	/**
	 * Sets the jcr last modified.
	 *
	 * @param jcrLastModified the new jcr last modified
	 */
	public void setJcrLastModified(String jcrLastModified) {
		this.jcrLastModified = jcrLastModified;
	}


	/**
	 * Gets the formated date.
	 *
	 * @param dateParam the date param
	 * @return the formated date
	 */
	public String getFormatedDate(String dateParam) {
		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-DD");
		SimpleDateFormat newFormatter = new SimpleDateFormat("MMMM DD YYYY");
		try {
			Date newdate = formatter.parse(dateParam);
			dateParam= newFormatter.format(newdate);
		}catch (ParseException e) {
			logger.error("getFormatedDate :: {}", e.getMessage());
		}
		return dateParam;
	}
	
	public String getAuthorName() {
		String artFragmentPath = getFragmentPath();
		String authorName = "";
		if(null != setAuthorDetail(artFragmentPath)) {
			String[] splitAuthorDetails = setAuthorDetail(artFragmentPath).split(",");
			if(splitAuthorDetails.length>0)
			authorName = splitAuthorDetails[0];
		}
		return authorName;
	}
	public String getAuthorPic() {
		String artFragmentPath = getFragmentPath();
		String authorPic = "";
		if(null != setAuthorDetail(artFragmentPath)) {
			String[] splitAuthorDetails = setAuthorDetail(artFragmentPath).split(",");
			if(splitAuthorDetails.length>1)
				authorPic = splitAuthorDetails[1];
		}
		return authorPic;
	}
	
	/**
	 * Sets the author detail.
	 *
	 * @param fragmentPath the fragment path
	 * @return the string
	 */
	public String setAuthorDetail(String fragmentPath) {
		String authorDetails = "";
		try
		{
		     Session session = resolver.adaptTo(Session.class);  
		     Node rootNode = session.getRootNode();
		     String articlePath = fragmentPath+"/jcr:content/data/master";
		     if(resolver.getResource(articlePath) != null) {
		     Node articleNode = resolver.getResource(articlePath).adaptTo(Node.class);
		     String authorNodePath = articleNode.getProperty("articleAuthor").getValue().toString();
		     String authorPath = authorNodePath+"/jcr:content/data/master";
		     if(resolver.getResource(authorPath) != null) {
		     Node authorNode = resolver.getResource(authorPath).adaptTo(Node.class);
		     String authorName = authorNode.getProperty("authorName").getValue().toString();
		     String authorPic = authorNode.getProperty("authorPic").getValue().toString();
		     authorDetails = authorName+","+authorPic;
		     }
		     }
		}
		catch (Exception e) {
			logger.error("setAuthorDetail :: {}", e.getMessage());
		}
	         
		return authorDetails;
	}

}