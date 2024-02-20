package ca.sunlife.web.cms.core.models.v1;

import com.adobe.cq.wcm.core.components.models.Component;

/**
 * @author Uma Maheshwaran
 *
 */
public interface Article extends Component {

	public String getArticleImage();

	public String getLayoutResourceType();

	public String getOgImage();

	public String getOgDescription();

	public String getPageModifiedDate();

	public String getPublisherName();

	public String getPublisherLogo();

	public String getPageUrl();

	public String getFragmentPath();

	public String getCheckboxComment();

	public String getCheckboxHideDate();

	public String getResourceType();

}