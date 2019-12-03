package com.sunlife.core.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Model(adaptables= {Resource.class},
		defaultInjectionStrategy=DefaultInjectionStrategy.OPTIONAL)
public interface ColControler {

	@Inject
	public String getColcontroler();	
	@Inject
	public String getOnecolumnconfig();
	@Inject
	public String getTwocolumnconfig();
	@Inject
	public String getThreecolumnconfig();
	@Inject
	public String getOnecolstyle();
	@Inject
	public String getTwocolstylepar1();
	@Inject
	public String getTwocolstylepar12();
	@Inject
	public String getThreecolstylepar1();
	@Inject
	public String getThreecolstylepar2();
	@Inject
	public String getThreecolstylepar3();
	@Inject
	public String getAnalyticstextcol1();
	@Inject
	public String getAnalyticstextcol2par1();
	@Inject
	public String getAnalyticstextcol2par2();
	@Inject
	public String getAnalyticstextcol3par1();
	@Inject
	public String getAnalyticstextcol3par2();
	@Inject
	public String getAnalyticstextcol3par3();
	
	
	
}
