/**
 * Tab component event handling
 * Tab component scrolling enable and disabled
 */
$(document).ready(function() {
  /**
     * Function used to handle the tab click and key press event
     * @function
     * @param {object} scope - scope of the selected element
     * @returns {} It will not return anything, this method just update DOM
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
     * Function used to handle the tab item click event
     * @function
     * @returns {} It will not return anything, this method just update DOM
  */
  function tabItemClickEventHandler(){
    tabItemEventHandler(this);
  }
  /**
     * Function is used to navigate the tab on arrow key
     * @function
     * @param {object} thisScope - scope of the selected element
     * @returns {} It will not return anything, this method just update DOM
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
     * Function used to handle the tab keypress for left arrow, right arrow, and enter
     * @function
     * @param {object} e - scope of the selected element
     * @returns {} It will not return anything, this method just update DOM
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
     * Function used to get the scroll width for all visible tablist
     * @function
     * @param {object} e - scope of the selected element
     * @returns {} It will not return anything, this method just update DOM
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
     * Function used to handle the enable scrolling feature for tab on click of next and previous arrow button
     * @function
     * @returns {} It will not return anything, this method just update DOM
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
     * Function used to handle mobile enable scrolling
     * @function
     * @param {object} navButton - scope of the selected element
     * @returns {} It will not return anything, this method just update DOM
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
     * @function
     * @param {object} tabContainer - scope of the selected element
     * @returns {} It will not return anything, this method just update DOM
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
     * Function used to intialize the events
     * @function
     * @returns {} It will not return anything, this method just update DOM
  */
  function init() {
    const $tabContainer = $(".sl-tabs");   
    const $cnwNewsList = $tabContainer.closest(".cnw-news-list")
    if($tabContainer.length > 0 && $cnwNewsList.length === 0){
        const $navTab = $(".sl-tabs .nav-tabs");
        const $navButton =  $('.sl-tabs .arrow-btn');
        $navTab.attr('data-activeTab', 0);
        const $document = $(document);
        $document.on("keydown", ".sl-tabs .nav-item", tabItemKeyEventHandler);
        $document.on("click", ".sl-tabs .nav-item", tabItemClickEventHandler);
        $document.on("click", ".sl-tabs .arrow-btn", slideTabEventHandler);
        mobileEnableScrolling($navButton);
        disabledScrolling($tabContainer);
      }
  }
  init();

});