/**
 * tabs.js
 * tabs related functionality.
 * This module used to handle the tab click and key scroll event.
 * Handle scrolling enable and disabled for tab component.
 * Anchor link scrolling on click on anchor link to tab component.
 * Handler for enable mobile scrolling.
 * Handler for navigating tabs on left and right arrow key.
 */
(function (core) {
	"use strict";

	/**
	 * Tab component
	 * @namespace coreTabs
	 * @memberof sunCore.comp
	 */
  core.comp.coreTabs = (function ($, util) {
  const CONSTANT = {
    SELECTOR: {
      tabNavItem: '.nav-item',
      tabNavButton: '.arrow-btn',
      navTab: '.nav-tabs',
      navTabLink: '.nav-item .nav-link',
      navLink: '.sl-nav-link.nav-link',
      tabContainer: '.sl-tabs',
      slLinks: '.sl-link',
      header: '.sl-header',
      stackTabContainer: '.stack-tab-container',
      tabPanel: '.tab-pane',
      arrowButtonLeft: '.arrow-btn.left',
      arrowButtonRight: '.arrow-btn.right',
      visibleNavItem: '.nav-item:not(.hide)',
      activeNavItem: '.nav-item.active',
      activeNavLink: '.nav-item.active .nav-link',
      cnwNewsList: '.cnw-news-list',
      lastNavItem: '.nav-item:last-child'
    },
    ID: {
      tabPanelContainer: '#default-tab-tabpane-'
    },
    CLASS: {
      activeFocus: 'active focused',
      activeShow: 'active show',
      active: 'active',    
      focused: 'focused',
      disabled: 'disabled',
      show: 'show',
      hide: 'hide'  
    },
    ATTR: {
      tabindex: "tabindex",
      ariaSelected: "aria-selected",
      activeTab: "data-activeTab"
    }
  };

  /**
   * Method to handle the tab click and key press event
   * @function tabItemEventHandler
   * @memberof sunCore.comp.coreTabs
   * @private
   * @param {object} scope - scope of the selected element
   */
  function tabItemEventHandler(scope){
    const $currentTab = $(scope);
    const $tabContainer = $currentTab.parents(CONSTANT.SELECTOR.navTab).parents(CONSTANT.SELECTOR.stackTabContainer).parents(CONSTANT.SELECTOR.tabContainer)
    const $id = $currentTab.attr('id');
    $tabContainer.find(CONSTANT.SELECTOR.tabNavItem).removeClass(CONSTANT.CLASS.activeFocus)
    $tabContainer.find(CONSTANT.SELECTOR.navTabLink).removeClass(CONSTANT.CLASS.activeFocus).attr(CONSTANT.ATTR.tabindex,"-1").attr(CONSTANT.ATTR.ariaSelected, "false");
    $currentTab.addClass(CONSTANT.CLASS.activeFocus);
    $currentTab.find(CONSTANT.SELECTOR.navLink).addClass(CONSTANT.CLASS.active).attr(CONSTANT.ATTR.tabindex,"0").attr(CONSTANT.ATTR.ariaSelected, "true");
    $tabContainer.find(CONSTANT.SELECTOR.tabPanel).removeClass(CONSTANT.CLASS.activeShow)
    $(CONSTANT.ID.tabPanelContainer+$id).addClass(CONSTANT.CLASS.activeShow)
  }
  /**
   * Method to handle the tab item click event
   * @function tabItemClickEventHandler
   * @memberof sunCore.comp.coreTabs
   * @private
   */
  function tabItemClickEventHandler(){
    tabItemEventHandler(this);
  }
  /**
    * Method to to navigate the tab on arrow key
    * @function navigateTabOnArrowKey
    * @memberof sunCore.comp.coreTabs
    * @private
    * @param {object} $thisScope - scope of the selected element
    */
  function navigateTabOnArrowKey($thisScope) {  
    const $navTab = $thisScope.parents(CONSTANT.SELECTOR.navTab);   
    $navTab.find(CONSTANT.SELECTOR.navTabLink).attr(CONSTANT.ATTR.tabindex, "-1").attr(CONSTANT.ATTR.ariaSelected, "false");
    $navTab.find(CONSTANT.SELECTOR.tabNavItem).removeClass(CONSTANT.CLASS.focused);    
    $thisScope.find(CONSTANT.SELECTOR.navLink).attr(CONSTANT.ATTR.tabindex, "0").focus().attr(CONSTANT.ATTR.ariaSelected, "true");
    $thisScope.addClass(CONSTANT.CLASS.focused);
    tabItemEventHandler($thisScope);
  }
  /**
   * Method to handle the tab keypress for left arrow, right arrow, and enter
   * @function tabItemKeyEventHandler
   * @memberof sunCore.comp.coreTabs
   * @private
   * @param {object} e - event Object
   */
  function tabItemKeyEventHandler(e) {
    const $thisKey = $(this);
    const $keyCode = e.keyCode;    
    const $navTabs = $thisKey.parents(CONSTANT.SELECTOR.navTab);
    const $navItem = $navTabs.find(CONSTANT.SELECTOR.tabNavItem);   
    const $leftNavScroll = $navTabs.siblings(CONSTANT.SELECTOR.arrowButtonLeft);      
    const $rightNavScroll = $navTabs.siblings(CONSTANT.SELECTOR.arrowButtonRight);
    let $currentItem;           
    const activeTabsWidth = $navTabs.width();
    const tabListWidth = getActiveScrollWidth($navItem.eq(0)); 
    if(tabListWidth <= activeTabsWidth && $keyCode !== util.constants.KeyCode.TAB){
      return false;
    }
    //condition for right arrow focus on key event
    if($keyCode === util.constants.KeyCode.RIGHT){
      $currentItem = $thisKey.next(CONSTANT.SELECTOR.tabNavItem);
      $currentItem = $currentItem.index() < 0 ? $navItem.first() :$currentItem;
      if($currentItem.index() === 0) {
        $navItem.show();
      }
      navigateTabOnArrowKey($currentItem);
    }
    //condition for left arrow focus on key event
    else if($keyCode === util.constants.KeyCode.LEFT){
      $currentItem = $thisKey.prev(CONSTANT.SELECTOR.tabNavItem);    
      $currentItem = $currentItem.index() < 0 ? $navItem.last() :$currentItem;    
      navigateTabOnArrowKey($currentItem);
    }
    if($currentItem && $currentItem.index() >= 0){
      const scrollWidth = parseInt($thisKey.width()) * ($currentItem.index() + 1); 
      if(activeTabsWidth < scrollWidth && $currentItem.index() > 0){
        $leftNavScroll.removeClass(CONSTANT.CLASS.disabled).addClass(CONSTANT.CLASS.active);
        $rightNavScroll.addClass(CONSTANT.CLASS.disabled).removeClass(CONSTANT.CLASS.active);
      }
      else if(activeTabsWidth >= scrollWidth || $currentItem.index() < 0) {
        $leftNavScroll.removeClass(CONSTANT.CLASS.active).addClass(CONSTANT.CLASS.disabled)
        $rightNavScroll.addClass(CONSTANT.CLASS.active).removeClass(CONSTANT.CLASS.disabled);
      }
    }
    else {
      $navItem.removeClass(CONSTANT.CLASS.focused);
      $navItem.find(CONSTANT.SELECTOR.tabNavItem).attr(CONSTANT.ATTR.tabindex, "-1")
      $navTabs.find(CONSTANT.SELECTOR.activeNavItem).addClass(CONSTANT.CLASS.focused);
      $navTabs.find(CONSTANT.SELECTOR.activeNavLink).attr(CONSTANT.ATTR.tabindex, "0")
    }
  }
  /**
   * Method to get the scroll width for all visible tablist
   * @function getActiveScrollWidth
   * @memberof sunCore.comp.coreTabs
   * @private
   * @param {object} $currentNav - scope for selected element
   */
  function getActiveScrollWidth($currentNav) {
    const $navItem = $currentNav.parents(CONSTANT.SELECTOR.stackTabContainer).find(CONSTANT.SELECTOR.visibleNavItem);
    let navWidth = 0;
    $navItem.each(function(){
      navWidth = navWidth + parseInt($(this).width());
    })
    return navWidth;
  }
  /**
   * Method to handle the enable scrolling feature for tab on click of next and previous arrow button
   * @function slideTabEventHandler
   * @memberof sunCore.comp.coreTabs
   * @private
   */
  function slideTabEventHandler() {
    const $currentNav = $(this);
    const $navTab = $currentNav.siblings(CONSTANT.SELECTOR.navTab);
    const navWidth = $navTab.width();
    const scrollWidth = getActiveScrollWidth($currentNav);
    const $navItem = $navTab.find(CONSTANT.SELECTOR.tabNavItem);     
    const $leftNavScroll = $navTab.siblings(CONSTANT.SELECTOR.arrowButtonLeft);      
    const $rightNavScroll = $navTab.siblings(CONSTANT.SELECTOR.arrowButtonRight);
    let activeScrollTab = parseInt($navTab.attr(CONSTANT.ATTR.activeTab));
    //condition for right arrow scrolling
    if($currentNav.hasClass("right")){  
      if(navWidth < scrollWidth){       
        activeScrollTab = activeScrollTab + 1; 
        $navTab.attr(CONSTANT.ATTR.activeTab, activeScrollTab);
        $leftNavScroll.removeClass(CONSTANT.CLASS.disabled).addClass(CONSTANT.CLASS.active)
        for(let i = 0; i < activeScrollTab; i++) {
          $navItem.eq(i).addClass(CONSTANT.CLASS.hide).removeClass(CONSTANT.CLASS.show);
        }
        //Condition to disabled the right arrow when scroll reach to last tab item
        if(navWidth >= (scrollWidth - $navTab.find(CONSTANT.SELECTOR.lastNavItem).width())){
          $rightNavScroll.removeClass(CONSTANT.CLASS.active).addClass(CONSTANT.CLASS.disabled);
        }
      }
      //condition to disabled the right arrow
      else{
        $rightNavScroll.removeClass(CONSTANT.CLASS.active).addClass(CONSTANT.CLASS.disabled);
      }
    }
    //condition for left arrow scrolling
    else{        
      $rightNavScroll.removeClass(CONSTANT.CLASS.disabled).addClass(CONSTANT.CLASS.active)
      if(activeScrollTab > 0){          
        activeScrollTab = activeScrollTab - 1;
        $navTab.attr(CONSTANT.ATTR.activeTab, activeScrollTab);
        $navItem.eq(activeScrollTab).addClass(CONSTANT.CLASS.show).removeClass(CONSTANT.CLASS.hide);
        if(activeScrollTab < 1) {
          $leftNavScroll.removeClass(CONSTANT.CLASS.active).addClass(CONSTANT.CLASS.disabled)
        }
      }
      else {
        $leftNavScroll.removeClass(CONSTANT.CLASS.active).addClass(CONSTANT.CLASS.disabled)
      }
    }
  }
  /**
   * Method to handle mobile enable scrolling.
   * @function mobileEnableScrolling
   * @memberof sunCore.comp.coreTabs
   * @private
   * @param {object} $navButton - Current selected navigation button (prev/next)
   */
  function mobileEnableScrolling ($navButton) {
    const $navTab = $navButton.siblings(CONSTANT.SELECTOR.navTab);
    const navWidth = $navTab.width();
    const scrollWidth = getActiveScrollWidth($navButton);
    if(util.matchmedia.XS.matches && navWidth < (scrollWidth + 15)) {
      $navButton.removeClass(CONSTANT.SELECTOR.hide);
    }
  }
 /**
   * Function used to disabled scrolling
   * @function mobileEnableScrolling
   * @memberof sunCore.comp.coreTabs
   * @private
   * @param {object} $tabContainer - scope of the selected element
   */
  function disabledScrolling($tabContainer) {
    $tabContainer.each(function() {
      const $navTabs = $(this).find(CONSTANT.SELECTOR.navTab);
      const $navItem = $(this).find(CONSTANT.SELECTOR.tabNavItem);   
      const $leftNavScroll = $navTabs.siblings(CONSTANT.SELECTOR.arrowButtonLeft);      
      const $rightNavScroll = $navTabs.siblings(CONSTANT.SELECTOR.arrowButtonRight);
      const activeTabsWidth = $navTabs.width();
      const tabListWidth = getActiveScrollWidth($navItem.eq(0));
      if(tabListWidth <= activeTabsWidth){
        $leftNavScroll.addClass(CONSTANT.CLASS.disabled).removeClass(CONSTANT.CLASS.active);
        $rightNavScroll.addClass(CONSTANT.CLASS.disabled).removeClass(CONSTANT.CLASS.active);
      }
    })
  }
  /**
		 * It returns the height of the header on the top
		 * @function 
		 * @memberof sunCore.comp.coreTabs
		 * @private
		 * @return {number} height of the sticky header on top
    */
  function getHeaderOffset() {
    return $(CONSTANT.SELECTOR.header).height();
  }
  /**
   * Function used to scroll to anchor link
   * @function scrollToAnchorLink
   * @memberof sunCore.comp.coreTabs
   * @private
   */
  function scrollToAnchorLink() {
    const id = $(this).attr("href");
    const $currentHrefElem = $(id);
    if($currentHrefElem.length > 0){
      let offsetTop = getHeaderOffset() + 20;
			core.util.scrollTo.element(
				$currentHrefElem,
				{ duration: 100 },
				offsetTop
			);
    }
  }
  
  function bindEvent() {
    $(document).on(
      util.customEvents.KEYDOWN,
      CONSTANT.SELECTOR.tabNavItem,
      tabItemKeyEventHandler
    );
    $(document).on(
      util.customEvents.INTERACTION,
      CONSTANT.SELECTOR.tabNavItem,
      tabItemClickEventHandler
    );
    $(document).on(
      util.customEvents.INTERACTION,
      CONSTANT.SELECTOR.tabNavButton,
      slideTabEventHandler
    );
    $(document).on(
      util.customEvents.INTERACTION,
      CONSTANT.SELECTOR.slLinks,
      scrollToAnchorLink
    );    
  }
  /**
    * Method used to initilize the module
    * @function
    * @memberof sunCore.comp.coreTabs
    * @public
  */
  function init() {
    const $navButton = $(CONSTANT.SELECTOR.navTab)
    $navButton.attr(CONSTANT.ATTR.activeTab, 0);
    const $tabContainer = $(CONSTANT.SELECTOR.tabContainer)
    const $cnwNewsList = $tabContainer.closest(CONSTANT.SELECTOR.cnwNewsList)
    if($cnwNewsList.length === 0){
      bindEvent();
    }
    mobileEnableScrolling($(CONSTANT.SELECTOR.tabNavButton));    
    disabledScrolling($tabContainer);
  }   
   
  return {
    init: init,
};
})(core.$, core.util);

/**
* Initialise coreTabs module if given selector is in DOM
*/
core.util.initialise(core.comp, "coreTabs", ".sl-tabs");
})(sunCore);