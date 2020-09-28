package ca.sunlife.web.cms.core.models;

import java.util.List;

import com.adobe.cq.wcm.core.components.models.NavigationItem;

public class NavigationItemImpl implements NavigationItem{
	
	private String URL;
	private String title;
	private String path;
	private String name;
	List<NavigationItem> children;
	
	NavigationItemImpl(String url, String title, String path, String name, List<NavigationItem> children){
		this.URL = url;
		this.title = title;
		this.path = path;
		this.name = name;
		this.children = children;
	}
	
	public String getURL() {
		return URL;
	}
	public String gettitle() {
		return title;
	}
	public String getpath() {
		return path;
	}
	public String getname() {
		return name;
	}
	public List<NavigationItem> getChildren(){
		return children;
		
	}
	

}
