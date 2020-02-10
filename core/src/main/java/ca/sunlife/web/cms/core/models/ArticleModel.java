
package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.Via;

import com.adobe.cq.wcm.core.components.internal.models.v1.contentfragment.ContentFragmentImpl;
import com.adobe.cq.wcm.core.components.models.contentfragment.ContentFragment;

/**
 * The Class FormContainer.
 */
@Model(adaptables = SlingHttpServletRequest.class,adapters = ContentFragment.class,resourceType = "sunlife/core/components/content/article")
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

}