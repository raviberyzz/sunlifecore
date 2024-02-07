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
    String RESOURCE_TYPE = "sunlife/core/components/content/core-header/v1/header";

    /** Logo */

    /**
     * Checks if the logo is required
     *
     * @return the isLogoRequired
     */
    @ValueMapValue
    String listFrom();

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
     * Gets the link url for logo
     *
     * @return the link url for logo
     */
    @ValueMapValue
    String getLinkURL();


    /**
     * Gets the alt text for logo
     *
     * @return the alt text for logo
     */
    @ValueMapValue
    String getAltText();

    /**
     * Gets the opening mode for the logo
     *
     * @return the target mode for logo
     */
    @ValueMapValue
    String getTarget();

    /**
     * Gets the hide logo.
     *
     * @return the hide logo
     */
    @ValueMapValue
    String getHideLogo();


    /** Utility Nav */
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
    List<HeaderLinks> getNavlinks();


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


    /** Sign in */
    /**
     * Gets the sign in
     *
     * @return the sign in
     */
    @ValueMapValue
    String getListFromSignin();

    /**
     * Gets the sign in title
     *
     * @return the sign in title
     */
    @ChildResource
    List<SigninLinks> getSigninlinks();

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


    /** Region */
    /**
     * Gets the list from region
     *
     * @return
     */
    @ValueMapValue
    String getListFromRegion();

    /**
     * Gets the region title
     *
     * @return the region title
     */
    @ValueMapValue
    String getRegionTitle();

    /**
     * Gets the Screen Reader text for Region
     *
     * @return the Screen Text
     */
    @ValueMapValue
    String getSrRegionText();

    /** Language */
    /**
     * Gets the language
     *
     * @return the language
     */
    @ValueMapValue
    String getLanguage();

    /**
     * Gets the language title (Header
     *
     * @return the language title
     */
    @ValueMapValue
    String getLanguageTitle();

    /**
     * Gets the language Menu title for Desktop
     *
     * @return the language Menu title
     */
    @ValueMapValue
    String getDesktopMenuTitle();

    /**
     * Gets the language Menu title for Mobile and Tablet
     *
     * @return the language Menu title
     */
    @ValueMapValue
    String getMobileAndTabletMenuTitle();

    /**
     * Gets the language links which is multifield
     *
     * @return the language links
     */
    @ChildResource
    List<HeaderLinks> getLanguageLinks();

    /** Accessibility Variables */

    /**
     * Gets the skip to signin label
     *
     * @return skip to signin label
     */
    @ValueMapValue
    String getSkipToSignInLabel();

    /**
     * Gets the skip to main content label
     *
     * @return skip to  main content label
     */
    @ValueMapValue
    String getSkipToMainContentLabel();

    /**
     * Gets the skip to footer label
     *
     * @return skip to footer label
     */
    @ValueMapValue
    String getSkipToFooterLabel();

    /** Spacing Variables */
    /**
     * Gets the spacing
     *
     * @return the spacing
     */
    @ValueMapValue
    String getSpacing();

}
