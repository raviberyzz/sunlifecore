package ca.sunlife.web.cms.core.models;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.Via;

import com.adobe.cq.wcm.core.components.internal.models.v1.contentfragment.ContentFragmentListImpl;
import com.adobe.cq.wcm.core.components.models.contentfragment.ContentFragmentList;

/**
 * The Class ArticleListModel.
 */
@Model(adaptables = SlingHttpServletRequest.class,adapters = ContentFragmentList.class,resourceType = "sunlife/core/components/content/articleList", defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ArticleListModel extends ContentFragmentListImpl {
	
	/**
	 * Instantiates a new article list model.
	 */
	public ArticleListModel() {
		super();
	}

	/** The hide top. */
	@Inject
	@Via("resource")
	@Optional
	private String hideTop;
	
	/**
	 * Gets the hide top.
	 *
	 * @return the hide top
	 */
	public String getHideTop() {
		return hideTop;
	}

	/**
	 * Sets the hide top.
	 *
	 * @param hideTop the new hide top
	 */
	public void setHideTop(String hideTop) {
		this.hideTop = hideTop;
	}

}