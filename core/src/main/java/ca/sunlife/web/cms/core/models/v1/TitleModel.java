package ca.sunlife.web.cms.core.models.v1;

import javax.annotation.PostConstruct;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.wcm.core.components.models.Title;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.Page;

import lombok.Getter;
import lombok.Setter;

/**
 * The TitleModel is a sling model associated with core-title component. it
 * implements com.adobe.cq.wcm.core.components.models.Title interface to provide
 * project specific implementation
 * 
 * @author Sunlife
 *
 */
@Getter
@Model(adaptables = {
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = TitleModel.RESOURCE_TYPE)
public class TitleModel implements Title {

	protected static final String RESOURCE_TYPE = "sunlife/core/components/content/core-title/v1/title";

	@Setter
	@ValueMapValue(name = JcrConstants.JCR_TITLE)
	private String text;

	@ValueMapValue
	private String type;

	@ValueMapValue
	private String linkURL;

	@ValueMapValue
	private String spacing;

	@ScriptVariable
	private Page currentPage;

	/*
	 * If the title is not authored then display the current page title
	 *
	 */
	@PostConstruct
	public void init() {
		if (StringUtils.isBlank(text)) {
			text = StringUtils.defaultIfEmpty(currentPage.getPageTitle(), currentPage.getTitle());
		}
	}

}
