package ca.sunlife.web.cms.core.models.v1.header;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;

/**
 * Interface for HeaderModel
 */
@Model(adaptables = {
        Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = HeaderModel.RESOURCE_TYPE)
public interface HeaderModel {
    public final static String RESOURCE_TYPE = "sunlife/core/components/content/core-header/v1/header";

    /** Search */
    /**
     * Gets the search
     *
     * @return the search
     */
    @ValueMapValue
    String getListFromSearch();

    /**
     * Gets the searchTitle
     *
     * @return the searchTitle
     */
    @ValueMapValue
    String getSearchTitle();

    /**
     * Gets the searchPlaceholder
     *
     * @return the searchPlaceholder
     */
    @ValueMapValue
    String getSearchPlaceholder();

    /**
     * Gets the searchButton
     *
     * @return the searchButton
     */
    @ValueMapValue
    String getSearchButton();

    /**
     * Gets the searchUrl
     *
     * @return the searchUrl
     */
    @ValueMapValue
    String getSearchURL();

    /** Logo */

    /**
     * Gets the logo
     *
     * @return the logo
     */
    @ValueMapValue
    String getListFrom();

    /**
     * Gets the logo image.
     *
     * @return the logo image
     */
    @ValueMapValue
    String getLogoImage();

    /**
     * Gets the mobile logo image.
     *
     * @return the mobile logo image
     */
    @ValueMapValue
    String getMobileLogoImage();


    /**
     * Gets the link url.
     *
     * @return the link url
     */
    @ValueMapValue
    String getLinkUrl();


    /**
     * Gets the alt text.
     *
     * @return the alt text
     */
    @ValueMapValue
    String getAltText();

    /**
     * Gets the target.
     *
     * @return the target
     */
    @ValueMapValue
    String getTarget();

    /**
     * Gets the separator.
     *
     * @return the separator
     */
    @ValueMapValue
    String getSeparator();

    /**
     * Gets the hide logo.
     *
     * @return the hide logo
     */
    @ValueMapValue
    String getHideLogo();

    /** Mega Menu */

    /**
     * Gets true or false for displaying the mega menu
     *
     * @return the display mega menu
     */
    @ValueMapValue
    String displayMegaMenu();

    /**
     * Gets the mega menu links which is multifield
     *
     * @return the mega menu links
     */
    @ChildResource
    List<MegaMenuLinks> getMegaMenuLinks();

    /**
     * Gets the list from nav which is multifield
     *
     * @return the list from nav
     */
    @ValueMapValue
    String getListFromNav();

    /**
     * Gets the navlinks which is multifield
     *
     * @return the navlinks
     */
    @ChildResource
    List<UtilityBarNavlinks> getNavlinks();
}
