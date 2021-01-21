package ca.sunlife.web.cms.core.beans;

/**
 * The Class Guarantee.
 *
 * @author TCS
 * @version 1.0
 */
public class Guarantee {

	/** The seriesName. */
	protected String seriesName;

	/** The minimumInvestment. */
	protected String minimumInvestment;

	/** The mer. */
	protected String mer;

	/** The netAsset. */
	protected String netAsset;

	/** The numberUnits. */
	protected String numberUnits;

	/**
	 * Constructor for all fields.
	 * 
	 * @param seriesName
	 * @param minimumInvestment
	 * @param mer
	 * @param netAsset
	 * @param numberUnits
	 */
	public Guarantee(String seriesName, String minimumInvestment, String mer, String netAsset, String numberUnits) {
		super();
		this.seriesName = seriesName;
		this.minimumInvestment = minimumInvestment;
		this.mer = mer;
		this.netAsset = netAsset;
		this.numberUnits = numberUnits;
	}

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
