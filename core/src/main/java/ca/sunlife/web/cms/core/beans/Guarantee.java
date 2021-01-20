package ca.sunlife.web.cms.core.beans;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * The Class Guarantee.
 *
 * @author TCS
 * @version 1.0
 */
public class Guarantee {
	
	/** The seriesName. */
	@JsonProperty("series")
	protected String seriesName;
	
	/** The minimumInvestment. */
	protected String minimumInvestment;
	
	/** The mer. */
	@JsonProperty("MER")
	protected String mer;
	
	/** The netAsset. */
	protected String netAsset;
	
	/** The numberUnits. */
	protected String numberUnits;

	/**
	 * Gets the seriesName.
	 *
	 * @return the seriesName
	 */
	public String getSeriesName() {
		return seriesName;
	}

	/**
	 * Sets the seriesName.
	 *
	 * @param seriesName
	 */
	public void setSeriesName(String seriesName) {
		this.seriesName = seriesName;
	}

	/**
	 * Gets the minimumInvestment.
	 *
	 * @return the minimumInvestment
	 */
	public String getMinimumInvestment() {
		return minimumInvestment;
	}

	/**
	 * Sets the minimumInvestment.
	 *
	 * @param minimumInvestment
	 */
	public void setMinimumInvestment(String minimumInvestment) {
		this.minimumInvestment = minimumInvestment;
	}

	/**
	 * Gets the mer.
	 *
	 * @return the mer
	 */
	public String getMer() {
		return mer;
	}

	/**
	 * Sets the mer.
	 *
	 * @param mer
	 */
	public void setMer(String mer) {
		this.mer = mer;
	}

	/**
	 * Gets the netAsset.
	 *
	 * @return the netAsset
	 */
	public String getNetAsset() {
		return netAsset;
	}

	/**
	 * Sets the netAsset.
	 *
	 * @param netAsset
	 */
	public void setNetAsset(String netAsset) {
		this.netAsset = netAsset;
	}

	/**
	 * Gets the numberUnits.
	 *
	 * @return the numberUnits
	 */
	public String getNumberUnits() {
		return numberUnits;
	}

	/**
	 * Sets the numberUnits.
	 *
	 * @param numberUnits
	 */
	public void setNumberUnits(String numberUnits) {
		this.numberUnits = numberUnits;
	}

}
