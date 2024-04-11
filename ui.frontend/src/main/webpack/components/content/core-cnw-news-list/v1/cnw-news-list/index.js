/**
 * cnw-news-list/index.js
 * news list component tab related functionality.
 * This module used to handle the news list component tab click and key scroll event.
 * Handle scrolling enable and disabled for news list component component.
 * Anchor link scrolling on click on anchor link to news list component tab component.
 * Handler for enable mobile scrolling.
 * Handler for navigating news list component tabs on left and right arrow key.
 */
(function (core) {
	"use strict";

	/**
	 * cnw news list component
	 * @namespace cnwNewsList
	 * @memberof sunCore.comp
	 */
  core.comp.cnwNewsList = (function ($, util) {
  const CONSTANT = {
    SELECTOR: {
      tabNavItem: '.nav-item',
      tabNavButton: '.arrow-btn',
      navTab: '.nav-tabs',
      navTabLink: '.nav-item .nav-link',
      navLink: '.nav-link',
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
      tabindex: 'tabindex',
      ariaSelected: 'aria-selected',
      activeTab: 'data-activeTab',
      href: 'href'
    }
  };
  /**
   * Method to handle the tab click and key press event
   * @function tabItemEventHandler
   * @memberof sunCore.comp.cnwNewsList
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
   * @memberof sunCore.comp.cnwNewsList
   * @private
   */
  function tabItemClickEventHandler(){
    tabItemEventHandler(this);
  }
 /**
   * Method to to navigate the tab on arrow key
   * @function navigateTabOnArrowKey
   * @memberof sunCore.comp.cnwNewsList
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
   * @function getCurrentItem
   * @memberof sunCore.comp.cnwNewsList
   * @private
   * @param {object} navItem - pass the first/last element of nav item
   * @param {object} sccurrentItemope - pass the current element of nav item
   */
  function getCurrentItem($navItem, $currentItem) {
    return $currentItem.index() < 0 ? $navItem : $currentItem
  }
  /**
   * Method to handle the tab keypress for left arrow, right arrow, and enter
   * @function tabItemKeyEventHandler
   * @memberof sunCore.comp.cnwNewsList
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
    //Redirect for Tab Links
    else if($keyCode === util.constants.KeyCode.ENTER_RETURN) {
      let redirectURL = $(this).find("a").attr(CONSTANT.ATTR.href);
      window.location.href = redirectURL;
    }
    if($currentItem && $currentItem.index() >= 0){
      const scrollWidth = parseInt($thisKey.width()) * ($currentItem.index() + 1);        
      const activeTabsWidth = $navTabs.width();
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
      const $activeNavItem = $navTabs.find(CONSTANT.SELECTOR.activeNavItem);
      $navItem.removeClass(CONSTANT.CLASS.activeFocus);
      $navItem.find(CONSTANT.SELECTOR.navLink).attr(CONSTANT.ATTR.tabindex, "-1").removeClass(CONSTANT.CLASS.active);
      $activeNavItem.addClass(CONSTANT.CLASS.activeFocus);
      $activeNavItem.find(CONSTANT.SELECTOR.navLink).attr(CONSTANT.ATTR.tabindex, "0").addClass(CONSTANT.CLASS.active);
    }
  }
  /**
   * Method to get the scroll width for all visible tablist
   * @function getActiveScrollWidth
   * @memberof sunCore.comp.cnwNewsList
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
   * @memberof sunCore.comp.cnwNewsList
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
    /*condition for right arrow scrolling */
    if($currentNav.hasClass("right")){  
      if(navWidth < scrollWidth){       
        activeScrollTab = activeScrollTab + 1; 
        $navTab.attr(CONSTANT.ATTR.activeTab, activeScrollTab);
        $leftNavScroll.removeClass(CONSTANT.CLASS.disabled).addClass(CONSTANT.CLASS.active)
        for(let i = 0; i < activeScrollTab; i++) {
          $navItem.eq(i).addClass(CONSTANT.CLASS.hide).removeClass(CONSTANT.CLASS.show);
        }
        /*Condition to disabled the right arrow when scroll reach to last tab item */
        if(navWidth >= (scrollWidth - $navTab.find(CONSTANT.SELECTOR.lastNavItem).width())){
          $rightNavScroll.removeClass(CONSTANT.CLASS.active).addClass(CONSTANT.CLASS.disabled);
        }
      }
      /*condition to disabled the right arrow */
      else{
        $rightNavScroll.removeClass(CONSTANT.CLASS.active).addClass(CONSTANT.CLASS.disabled);
      }
    }
    /*condition for left arrow scrolling */
    else{        
      $rightNavScroll.removeClass(CONSTANT.CLASS.disabled).addClass(CONSTANT.CLASS.active);
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
   * @memberof sunCore.comp.cnwNewsList
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
		 * Handler to bind event specific for cnwNewsList
		 * @function bindEvent
		 * @memberof sunCore.comp.cnwNewsList
		 * @private
		 */
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
  }
  /**
    * Method used to initilize the module
    * @function init
    * @memberof sunCore.comp.cnwNewsList
    * @public
  */
  function init() {
    const $navButton = $(CONSTANT.SELECTOR.navTab)
    $navButton.attr(CONSTANT.ATTR.activeTab, 0);
    bindEvent();
    mobileEnableScrolling($(CONSTANT.SELECTOR.tabNavButton));
  }   
      
  return {
    init: init,
};
})(core.$, core.util);

/**
* Initialise cnwNewsList module if given selector is in DOM
*/
core.util.initialise(core.comp, "cnwNewsList", ".cnw-news-list .sl-tabs");
})(sunCore);
