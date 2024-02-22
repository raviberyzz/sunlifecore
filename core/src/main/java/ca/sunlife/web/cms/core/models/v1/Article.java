package ca.sunlife.web.cms.core.models.v1;

import com.adobe.cq.wcm.core.components.models.Component;

/**
 * @author Uma Maheshwaran
 *
 */
public interface Article extends Component {

	/**
	 * Gets the Article Image
	 *
	 * @return the article image
	 */
	public String getArticleImage();

	/**
	 * Gets the Layout resource Type
	 *
	 * @return the layout resource type
	 */
	public String getLayoutResourceType();

	/**
	 * Gets the Og Image
	 * 
	 * @return the og image
	 */
	public String getOgImage();

	/**
	 * Gets the Description
	 * 
	 * @return the description
	 */
	public String getOgDescription();

	/**
	 * Gets the Page Modified Date
	 * 
	 * @return the page modified date
	 */
	public String getPageModifiedDate();

	/**
	 * Gets the Publisher Name
	 * 
	 * @return the publisher name
	 */
	public String getPublisherName();

	/**
	 * Gets the Publisher Logo
	 * 
	 * @return the publisher logo
	 */
	public String getPublisherLogo();

	/**
	 * Gets the Page URL
	 * 
	 * @return the page url
	 */
	public String getPageUrl();

	/**
	 * Gets the Fragment Path
	 * 
	 * @return the fragment path
	 */
	public String getFragmentPath();

	/**
	 * Gets the Checkbox Hide Date
	 * 
	 * @return the hide date
	 */
	public String getCheckboxHideDate();

	/**
	 * Gets the Resource Type
	 * 
	 * @return the resource type
	 */
	public String getResourceType();

	/**
	 * Gets the Social Share
	 * 
	 * @return the social share
	 */
	public String getSocialShare();

}