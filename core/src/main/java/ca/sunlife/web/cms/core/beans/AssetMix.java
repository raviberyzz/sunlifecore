package ca.sunlife.web.cms.core.beans;

/**
 * The Class AssetMix.
 *
 * @author TCS
 * @version 1.0
 */
public class AssetMix {

	/** The assetMixName. */
	private String assetMixName;

	/** The assetMixPercentage. */
	private String assetMixPercentage;

	/** The colourCd. */
	private String colourCd;

	/**
	 * Constructor for all fields.
	 *
	 * @param assetMixName
	 * @param assetMixPercentage
	 * @param colourCd
	 */
	public AssetMix(String assetMixName, String assetMixPercentage, String colourCd) {
		super();
		this.assetMixName = assetMixName;
		this.assetMixPercentage = assetMixPercentage;
		this.colourCd = colourCd;
	}

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
	 *          the assetMixName
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
	 *          the assetMixPercentage
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
	 *          the colourCd
	 */
	public void setColourCd(String colourCd) {
		this.colourCd = colourCd;
	}

}
