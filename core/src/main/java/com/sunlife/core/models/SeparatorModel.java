package sunlife.core.models;
/*import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;
 
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional; 
import org.apache.sling.settings.SlingSettingsService;*/

import java.util.List;
import javax.inject.Inject;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
 
//@Model(adaptables = Resource.class)

@Model(
		adaptables = {Resource.class},
		 defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface SeparatorModel {

	@Inject
	String getTarget();
	  
}
