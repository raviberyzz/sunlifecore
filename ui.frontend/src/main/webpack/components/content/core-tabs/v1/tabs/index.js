/**
 * Tab component event handling
 * Tab component scrolling enable and disabled
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
      tabNavItem: '.sl-tabs .nav-item',
      tabNavButton: '.sl-tabs .arrow-btn',
      navTab: '.sl-tabs .nav-tabs',
      tabContainer: '.sl-tabs',
      slLinks: '.sl-link'
    }
  };

  /**
   * Method to handle the tab click and key press event
   * @function tabItemEventHandler
   * @memberof sunCore.comp.coreTabs
   * @private
   * @param {object} scope - event object
   */
  function tabItemEventHandler(scope){
    const $currentTab = $(scope);
    const $tabContainer = $currentTab.parents(".nav-tabs").parents(".stack-tab-container").parents(".sl-tabs")
    const $id = $currentTab.attr('id');
    $tabContainer.find(".nav-item").removeClass("active focused")
    $tabContainer.find(".nav-item .nav-link").removeClass("active focused").attr("tabindex","-1").attr("aria-selected", "false");
    $currentTab.addClass("active focused");
    $currentTab.find(".nav-link").addClass("active").attr("tabindex","0").attr("aria-selected", "true");
    $tabContainer.find(".tab-pane").removeClass("active show")
    $("#default-tab-tabpane-"+$id).addClass("active show")
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
    * @param {object} $thisScope - event object
    */
  function navigateTabOnArrowKey($thisScope) {  
    const $navTab = $thisScope.parents(".nav-tabs");   
    $navTab.find(".nav-item .nav-link").attr("tabindex", "-1").attr("aria-selected", "false");
    $navTab.find(".nav-item").removeClass("focused");    
    $thisScope.find(".nav-link").attr("tabindex", "0").focus().attr("aria-selected", "true");
    $thisScope.addClass("focused");
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
    const $keyName = e.key;    
    const $navTabs = $thisKey.parents(".nav-tabs");
    const $navItem = $navTabs.find('.nav-item');   
    const $leftNavScroll = $navTabs.siblings(".arrow-btn.left");      
    const $rightNavScroll = $navTabs.siblings(".arrow-btn.right");
    let $currentItem;           
    const activeTabsWidth = $navTabs.width();
    const tabListWidth = getActiveScrollWidth($navItem.eq(0))
    if(tabListWidth <= activeTabsWidth){
      return false;
    }
    //condition for right arrow focus on key event
    if($keyName === "ArrowRight"){
      $currentItem = $thisKey.next('.nav-item');
      $currentItem = $currentItem.index() < 0 ? $navItem.first() :$currentItem;
      if($currentItem.index() === 0) {
        $navItem.show();
      }
      navigateTabOnArrowKey($currentItem);
    }
    //condition for left arrow focus on key event
    else if($keyName === "ArrowLeft"){
      $currentItem = $thisKey.prev('.nav-item'); 
      $currentItem = $currentItem.index() < 0 ? $navItem.last() :$currentItem;    
      navigateTabOnArrowKey($currentItem);
    }
    if($currentItem && $currentItem.index() >= 0){
      const scrollWidth = parseInt($thisKey.width()) * ($currentItem.index() + 1); 
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
      $navItem.removeClass("focused");
      $navItem.find(".nav-link").attr("tabindex", "-1")
      $navTabs.find(".nav-item.active").addClass("focused");
      $navTabs.find(".nav-item.active .nav-link").attr("tabindex", "0")
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
   * @memberof sunCore.comp.coreTabs
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
    //condition for right arrow scrolling
    if($currentNav.hasClass("right")){  
      if(navWidth < scrollWidth){       
        activeScrollTab = activeScrollTab + 1; 
        $navTab.attr('data-activeTab', activeScrollTab);
        $leftNavScroll.removeClass("disabled").addClass("active")
        for(let i = 0; i < activeScrollTab; i++) {
          $navItem.eq(i).addClass("hide").removeClass("show");
        }
        //Condition to disabled the right arrow when scroll reach to last tab item
        if(navWidth >= (scrollWidth - $navTab.find(".nav-item:last-child").width())){
          $rightNavScroll.removeClass("active").addClass("disabled");
        }
      }
      //condition to disabled the right arrow
      else{
        $rightNavScroll.removeClass("active").addClass("disabled");
      }
    }
    //condition for left arrow scrolling
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
   * @memberof sunCore.comp.coreTabs
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
   * Function used to disabled scrolling
   * @function mobileEnableScrolling
   * @memberof sunCore.comp.coTabs
   * @private
   * @param {object} $tabContainer - scope of the selected element
   */
  function disabledScrolling($tabContainer) {
    $tabContainer.each(function() {
      const $navTabs = $(this).find(".nav-tabs");
      const $navItem = $(this).find('.nav-item');   
      const $leftNavScroll = $navTabs.siblings(".arrow-btn.left");      
      const $rightNavScroll = $navTabs.siblings(".arrow-btn.right");
      const activeTabsWidth = $navTabs.width();
      const tabListWidth = getActiveScrollWidth($navItem.eq(0));
      if(tabListWidth <= activeTabsWidth){
        $leftNavScroll.addClass("disabled").removeClass("active");
        $rightNavScroll.addClass("disabled").removeClass("active");
      }
    })
  }
  /**
   * Function used to scroll to anchor link
   * @function scrollToAnchorLink
   * @memberof sunCore.comp.coTabs
   * @private
   */
  function scrollToAnchorLink() {
    const id = $(this).attr("href");
    if($(id).length > 0){
      const anchorTop = $(id).offset().top;
      const headerHeight = $(".sl-header").height()+20;
      $("html, body").animate({ scrollTop: anchorTop-headerHeight }, 500);
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
		 */
  function init() {
    const $navButton = $(CONSTANT.SELECTOR.navTab)
    $navButton.attr('data-activeTab', 0);
    const $tabContainer = $(CONSTANT.SELECTOR.tabContainer)
    const $cnwNewsList = $tabContainer.closest(".cnw-news-list")
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