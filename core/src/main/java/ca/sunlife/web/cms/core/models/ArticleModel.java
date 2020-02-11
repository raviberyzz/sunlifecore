
package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import java.text.DateFormatSymbols;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.Via;
import javax.inject.Named;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;

import com.adobe.cq.wcm.core.components.internal.models.v1.contentfragment.ContentFragmentImpl;
import com.adobe.cq.wcm.core.components.models.contentfragment.ContentFragment;

/**
 * The Class FormContainer.
 */
@Model(adaptables = SlingHttpServletRequest.class,adapters = ContentFragment.class,resourceType = "sunlife/core/components/content/article", defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ArticleModel extends ContentFragmentImpl {
	
	/**
	 * Instantiates a new article model.
	 */
	public ArticleModel() {
		super();
	}
	
	/** The article unique ID. */
	@Inject
	@Via("resource")
	@Optional
	private String articleUniqueID;
	

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
			e.printStackTrace();
		}
		return dateParam;
	}

}