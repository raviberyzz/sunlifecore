package ca.sunlife.web.cms.core.beans;

import java.util.ArrayList;

public class NewsReleases {

	private String matching_count;
	private ArrayList<Release> release;
	private String returned_count;

	public String getMatching_count() {
		return matching_count;
	}

	public void setMatching_count(String matching_count) {
		this.matching_count = matching_count;
	}

	public ArrayList<Release> getRelease() {
		return release;
	}

	public void setRelease(ArrayList<Release> release) {
		this.release = release;
	}

	public String getReturned_count() {
		return returned_count;
	}

	public void setReturned_count(String returned_count) {
		this.returned_count = returned_count;
	}
	
}
