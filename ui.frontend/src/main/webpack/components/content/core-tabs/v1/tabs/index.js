$(document).ready(function() {
  let activeScrollTab = 0;    
  const $leftNavScroll = $(".arrow-btn.left");      
  const $rightNavScroll = $(".arrow-btn.right");
  //Function used to handle the tab click and key press event
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
  //Function used to handle the tab item click event
  function tabItemClickEventHandler(){
    tabItemEventHandler(this);
  }
  //Function is used to navigate the tab on arrow key
  function navigateTabOnArrowKey($thisScope) {  
    const $navTab = $thisScope.parents(".nav-tabs");   
    $navTab.find(".nav-item .nav-link").attr("tabindex", "-1").attr("aria-selected", "false");
    $navTab.find(".nav-item").removeClass("focused");    
    $thisScope.find(".nav-link").attr("tabindex", "0").focus().attr("aria-selected", "true");
    $thisScope.addClass("focused");
    tabItemEventHandler($thisScope);
  }
  //Function used to handle the tab keypress for left arrow, right arrow, and enter
  function tabItemKeyEventHandler(e) {
    const $thisKey = $(this);
    const $keyName = e.key;    
    const $navTabs = $thisKey.parents(".nav-tabs");
    const $navItem = $navTabs.find('.nav-item');
    let $currentItem;
    if($keyName === "ArrowRight"){
      $currentItem = $thisKey.next('.nav-item');
      $currentItem = $currentItem.index() < 0 ? $navItem.first() :$currentItem;
      navigateTabOnArrowKey($currentItem);
    }
    else if($keyName === "ArrowLeft"){
      $currentItem = $thisKey.prev('.nav-item'); 
      $currentItem = $currentItem.index() < 0 ? $navItem.last() :$currentItem;       
      navigateTabOnArrowKey($currentItem);
    }    
    if($currentItem && $currentItem.index()){
      const scrollWidth = parseInt($thisKey.width()) * ($currentItem.index() + 1);        
      const activeTabsWidth = $navTabs.width();      
      if(activeTabsWidth < scrollWidth && $currentItem.index() > 0){
        $leftNavScroll.removeClass("disabled").addClass("active")
      }
      else if(activeTabsWidth >= scrollWidth || $currentItem.index() < 0) {
        $leftNavScroll.removeClass("active").addClass("disabled")
      }
    }
    else {
      $(".nav-item").removeClass("focused");
      $(".nav-item .nav-link").attr("tabindex", "-1")
      $(".nav-item.active").addClass("focused");
      $(".nav-item.active .nav-link").attr("tabindex", "0")
    }
  }
  //Function used to get the scroll width for all visible tablist
  function getActiveScrollWidth($currentNav) {
    const $navItem = $currentNav.parents(".stack-tab-container").find(".nav-item:not(.hide)");
    let navWidth = 0;
    $navItem.each(function(){
      navWidth = navWidth + parseInt($(this).width());
    })
    return navWidth;
  }
  //Function used to handle the enable scrolling feature for tab on click of next and previous arrow button
  function slideTabEventHandler() {
    const $currentNav = $(this);
    const $navTab = $currentNav.siblings(".nav-tabs");
    const navWidth = $navTab.width();
    const scrollWidth = getActiveScrollWidth($currentNav);
    const $navItem = $navTab.find(".nav-item");
    if($currentNav.hasClass("right")){  
      if(navWidth < scrollWidth){       
        activeScrollTab = activeScrollTab + 1; 
        $leftNavScroll.removeClass("disabled").addClass("active")
        for(let i = 0; i < activeScrollTab; i++) {
          $navItem.eq(i).addClass("hide").removeClass("show");
        }
      }
      else{
        $rightNavScroll.removeClass("active").addClass("disabled")
      }
    }
    else{        
      $rightNavScroll.removeClass("disabled").addClass("active")
      if(activeScrollTab > 0){          
        activeScrollTab = activeScrollTab - 1;
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

  function init() {
    const $tabItem = $(".sl-tabs .nav-item");
    $tabItem.keydown(tabItemKeyEventHandler);
    $tabItem.click(tabItemClickEventHandler);
    const $navItem = $(".arrow-btn");
    $navItem.click(slideTabEventHandler);
  }
  init();

});
