package com.sunlife.core.models;

import java.util.Collection;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import com.adobe.cq.wcm.core.components.models.Breadcrumb;
import com.adobe.cq.wcm.core.components.models.NavigationItem;


@Model(adaptables = SlingHttpServletRequest.class,
adapters = Breadcrumb.class,
resourceType = "sunlife/core/components/content/breadcrumb")
public class BreadcrumbModel implements Breadcrumb{

	@Self @Via(type = ResourceSuperType.class)
    private Breadcrumb breadcrumb;

	
	@Inject
	@Via("resource")
	@Optional
	public String socialShareReqd;
	
	@Inject
	@Via("resource")
	@Optional
	public String socialShareText;
	
	@Override
	public Collection<NavigationItem> getItems() {
       return breadcrumb.getItems();
    }
	
	
}
