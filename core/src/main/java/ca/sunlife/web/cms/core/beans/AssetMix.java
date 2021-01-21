package ca.sunlife.web.cms.core.beans;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * The Class AssetMix.
 *
 * @author TCS
 * @version 1.0
 */
public class AssetMix {

	/** The assetMixName. */
	@ JsonProperty("name")
	protected String assetMixName;
	
	/** The assetMixPercentage. */
	@ JsonProperty("percentage")
	protected String assetMixPercentage;
	
	/** The colourCd. */
	protected String colourCd;

	/**
	 * Gets the assetMixName.
	 *
	 * @return the assetMixName
	 */
	public String getAssetMixName() {
		return assetMixName;
	}

	/**
	 * Sets the assetMixName.
	 *
	 * @param assetMixName
	 */
	public void setAssetMixName(String assetMixName) {
		this.assetMixName = assetMixName;
	}

	/**
	 * Gets the assetMixPercentage.
	 *
	 * @return the assetMixPercentage
	 */
	public String getAssetMixPercentage() {
		return assetMixPercentage;
	}

	/**
	 * Sets the assetMixPercentage.
	 *
	 * @param assetMixPercentage
	 */
	public void setAssetMixPercentage(String assetMixPercentage) {
		this.assetMixPercentage = assetMixPercentage;
	}

	/**
	 * Gets the colourCd.
	 *
	 * @return the colourCd
	 */
	public String getColourCd() {
		return colourCd;
	}

	/**
	 * Sets the colourCd.
	 *
	 * @param colourCd
	 */
	public void setColourCd(String colourCd) {
		this.colourCd = colourCd;
	}

}
