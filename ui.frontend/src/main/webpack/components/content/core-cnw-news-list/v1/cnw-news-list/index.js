/**
 * Update the tabs for news list component on key and click event
 */
(function (core) {
	"use strict";

	/**
	 * Text component
	 * @namespace cnwNewsList
	 * @memberof sunCore.comp
	 */
  core.comp.cnwNewsList = (function ($, util) {
  const CONSTANT = {
    SELECTOR: {
      tabNavItem: '.sl-tabs .nav-item',
      tabNavButton: '.sl-tabs .arrow-btn',
      navTab: '.sl-tabs .nav-tabs'
    }
  };
  /**
   * Method to handle the tab click and key press event
   * @function tabItemEventHandler
   * @memberof sunCore.comp.cnwNewsList
   * @private
   * @param {object} scope - event object
   */
  function tabItemEventHandler(scope){
    const $currentTab = $(scope);
    const $id = $currentTab.attr('id');
    const $navItem = $currentTab.closest(".nav-item");
    const $allTabsLink = $navItem.find(".nav-link");
    const $selectedNavLink = $currentTab.find(".nav-link");
    $navItem.removeClass("active focused cmp-tabs__tab--active")
    $allTabsLink.removeClass("active focused cmp-tabs__tab--active").attr("tabindex","-1").attr("aria-selected", "false");
    $currentTab.addClass("active focused");
    $selectedNavLink.addClass("active").attr("tabindex","0").attr("aria-selected", "true");
    $("#default-tab-tabpane-"+$id).addClass("active show")
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
   * @param {object} $thisScope - event object
   */
  function navigateTabOnArrowKey($thisScope) {  
    const $navTab = $thisScope.parents(".nav-tabs");   
    $navTab.find(".nav-item .nav-link").attr("tabindex", "-1").attr("aria-selected", "false");
    $navTab.find(".nav-item").removeClass("focused active");    
    $thisScope.find(".nav-link").attr("tabindex", "0").focus().attr("aria-selected", "true");
    $thisScope.addClass("focused active");
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
    const $keyName = e.key;    
    const $navTabs = $thisKey.parents(".nav-tabs");
    const $navItem = $navTabs.find('.nav-item');   
    const $leftNavScroll = $navTabs.siblings(".arrow-btn.left");      
    const $rightNavScroll = $navTabs.siblings(".arrow-btn.right");
    let $currentItem;
    //condition for right arrow focus on key event
    if($keyName === "ArrowRight"){
      $currentItem = $thisKey.next('.nav-item');
      $firstItem = $navItem.first();
      $currentItem = getCurrentItem($firstItem, $currentItem);
      if($currentItem.index() === 0) {
        $navItem.show();
      }
      navigateTabOnArrowKey($currentItem);
    }
    //condition for left arrow focus on key event
    else if($keyName === "ArrowLeft"){
      $currentItem = $thisKey.prev('.nav-item');      
      $lastItem = $navItem.first(); 
      $currentItem = getCurrentItem($lastItem, $currentItem);    
      navigateTabOnArrowKey($currentItem);
    }
    //Redirect for Tab Links
    else if($keyName === "Enter") {
      let redirectURL = $(this).find("a").attr("href");
      window.location.href = redirectURL;
    }
    //Ensure Tab moves to Panel for Keyboard Access
    else if($keyName === "Tab") {
      $(this).closest('.stack-tab-container').next('.tab-content').find('.cmp-tabs__tabpanel--active').focus();
    }
    if($currentItem && $currentItem.index() >= 0){
      const scrollWidth = parseInt($thisKey.width()) * ($currentItem.index() + 1);        
      const activeTabsWidth = $navTabs.width();
      if(activeTabsWidth < scrollWidth && $currentItem.index() > 0){
        $leftNavScroll.removeClass("disabled").addClass("active");
        $rightNavScroll.addClass("disabled").removeClass("active");
      }
      else if(activeTabsWidth >= scrollWidth || $currentItem.index() < 0) {
        $leftNavScroll.removeClass("active").addClass("disabled")
        $rightNavScroll.addClass("active").removeClass("disabled");
      }
    }
    else {
      const $activeNavItem = $navTabs.find(".nav-item.active");
      $navItem.removeClass("focused active");
      $navItem.find(".nav-link").attr("tabindex", "-1").removeClass("active");
      $activeNavItem.addClass("focused active");
      $activeNavItem.find(".nav-link").attr("tabindex", "0").addClass("active");
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
    const $navItem = $currentNav.parents(".stack-tab-container").find(".nav-item:not(.hide)");
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
    const $navTab = $currentNav.siblings(".nav-tabs");
    const navWidth = $navTab.width();
    const scrollWidth = getActiveScrollWidth($currentNav);
    const $navItem = $navTab.find(".nav-item");     
    const $leftNavScroll = $navTab.siblings(".arrow-btn.left");      
    const $rightNavScroll = $navTab.siblings(".arrow-btn.right");
    let activeScrollTab = parseInt($navTab.attr('data-activeTab'));
    /*condition for right arrow scrolling */
    if($currentNav.hasClass("right")){  
      if(navWidth < scrollWidth){       
        activeScrollTab = activeScrollTab + 1; 
        $navTab.attr('data-activeTab', activeScrollTab);
        $leftNavScroll.removeClass("disabled").addClass("active")
        for(let i = 0; i < activeScrollTab; i++) {
          $navItem.eq(i).addClass("hide").removeClass("show");
        }
        /*Condition to disabled the right arrow when scroll reach to last tab item */
        if(navWidth >= (scrollWidth - $navTab.find(".nav-item:last-child").width())){
          $rightNavScroll.removeClass("active").addClass("disabled");
        }
      }
      /*condition to disabled the right arrow */
      else{
        $rightNavScroll.removeClass("active").addClass("disabled");
      }
    }
    /*condition for left arrow scrolling */
    else{        
      $rightNavScroll.removeClass("disabled").addClass("active")
      if(activeScrollTab > 0){          
        activeScrollTab = activeScrollTab - 1;
        $navTab.attr('data-activeTab', activeScrollTab);
        $navItem.eq(activeScrollTab).addClass("show").removeClass("hide");
        if(activeScrollTab < 1) {
          $leftNavScroll.removeClass("active").addClass("disabled")
        }
      }
      else {
        $leftNavScroll.removeClass("active").addClass("disabled")
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
    const $navTab = $navButton.siblings(".nav-tabs");
    const navWidth = $navTab.width();
    const scrollWidth = getActiveScrollWidth($navButton);
    if($(window).width() < 767 && navWidth < (scrollWidth + 15)) {
      $navButton.removeClass('hide');
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
		 * @function
		 */
  function init() {
    const $navButton = $(CONSTANT.SELECTOR.navTab)
    $navButton.attr('data-activeTab', 0);
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
