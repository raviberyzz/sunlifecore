/**
 * 
 */
package com.sunlife.core.models;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * Sling model for regional languages menu
 * 
 * @author MO92
 */
@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class RegionLanguageMenu {
	// Tab1 Regions
	@Inject
	public String title;

	@Inject
	public String titleMobile;

	@Inject
	public List<LinkModel> regions;

	// Tab2 Languages
	@Inject
	public String languageSectionTitle;

	@Inject
	public String languageSectionTitleMobile;

	@Inject
	public List<SubLinkModel> languageLinks;

	//Tab 3 Settings
	@Inject
	public String closeModalText;

	@Inject
	public String selectLangText;

	@Inject
	public String backButtonText;
	
	@Inject
	public String selectedTabMobile;
	
	// Field to expose the processed links to front end
	private List<List<LinkModel>> regionLinks;

	public List<List<LinkModel>> getRegionLinks() {
		return regionLinks;
	}

	public void setRegionLinks(List<List<LinkModel>> regionLinks) {
		this.regionLinks = regionLinks;
	}

	/**
	 * To process data after injection of all injected fields
	 * 
	 * @param
	 * @return void
	 * @author MO92
	 */
	@PostConstruct
	public void init() {
		List<LinkModel> tempList = null;
		if (null == regions)
			return;
		this.regionLinks = new ArrayList<>();
		for (LinkModel region : regions) {
			if (tempList == null)
				tempList = new ArrayList<>();
			tempList.add(region);
			if ("yes".equals(region.nextList)) {
				this.regionLinks.add(tempList);
				tempList = null;
			}

			if (regions.indexOf(region) == regions.size() - 1) {
				this.regionLinks.add(tempList);
			}
		}
	}

}
