package ca.sunlife.web.cms.core.models.v1;

import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.wcm.core.components.internal.models.v1.TableOfContentsImpl;
import lombok.Setter;
import lombok.Getter;
/**
 * The Modal is a sling model associated with Modal component. 
 *
 * @author Sunlife
 */
@Setter
@Getter
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class Modal extends TableOfContentsImpl{

	@ValueMapValue
	String modalID;

	@ValueMapValue
	String modalTypes;

	@ValueMapValue
	@Default(booleanValues = { false })
	boolean isTrigger;

	@ValueMapValue
	String heading;

	@ValueMapValue
	String content;

	@ValueMapValue
    String additionalText;

	@ValueMapValue
    String dataSection;

	@ChildResource
	List<ButtonItems> modalButtons;

}