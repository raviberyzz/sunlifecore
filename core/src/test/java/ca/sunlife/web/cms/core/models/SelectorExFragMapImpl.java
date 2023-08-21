package ca.sunlife.web.cms.core.models;

public class SelectorExFragMapImpl implements SelectorExFragMap{
	
	private String selector;
	private String exfragPath;
	
	SelectorExFragMapImpl(String selector, String expFragPath){
		this.selector = selector;
		this.exfragPath = expFragPath;
	}

	@Override
	public String getSelector() {
		// TODO Auto-generated method stub
		return selector;
	}

	@Override
	public String getExfragPath() {
		// TODO Auto-generated method stub
		return exfragPath;
	}

}
