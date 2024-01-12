$(document).ready(function() {
  let activeScrollTab = 0;    
  const $leftNavScroll = $(".arrow-btn.left");      
  const $rightNavScroll = $(".arrow-btn.right");
  //Function used to handle the tab click and key press event
  function tabItemEventHandler(scope){
    const $currentTab = $(scope);
    const $tabContainer = $currentTab.parents(".nav-tabs").parents(".stack-tab-container").parents(".sl-tabs")
    const id = $currentTab.attr('id');
    $tabContainer.find(".nav-item").removeClass("active focused")
    $tabContainer.find(".nav-item .nav-link").removeClass("active focused").attr("tabindex","-1").attr("aria-selected", "false");
    $currentTab.addClass("active focused");
    $currentTab.find(".nav-link").addClass("active").attr("tabindex","0").attr("aria-selected", "true");
    $tabContainer.find(".tab-pane").removeClass("active show")
    $("#default-tab-tabpane-"+id).addClass("active show")
  }
  //Function used to handle the tab click
  function tabItemClickEventHandler(){
    tabItemEventHandler(this);
  }
  //Function is used to navigate the tab on arrow key
  function navigateTabOnArrowKey($thisScope) {      
    $thisScope.parents(".nav-tabs").find(".nav-item .nav-link").attr("tabindex", "-1").attr("aria-selected", "false");
    $thisScope.parents(".nav-tabs").find(".nav-item").removeClass("focused");
    tabItemEventHandler($thisScope);
  }
  //Function used to handle the tab keypress for left arrow, right arrow, and enter
  function tabItemKeyEventHandler(e) {
    const $thisKey = $(this);
    const $keyName = e.key;
    let $currentItem;
    if($keyName === "ArrowRight"){
      $thisKey.next('.nav-item').find(".nav-link").attr("tabindex", "0").focus().attr("aria-selected", "true");
      $thisKey.next('.nav-item').addClass("focused");
      $currentItem = $thisKey.next('.nav-item');
      navigateTabOnArrowKey($currentItem);
    }
    else if($keyName === "ArrowLeft"){
      $thisKey.prev('.nav-item').addClass("focused");
      $thisKey.prev('.nav-item').find(".nav-link").attr("tabindex", "0").focus().attr("aria-selected", "true");
      $currentItem = $thisKey.prev('.nav-item');        
      navigateTabOnArrowKey($currentItem);
    }
    if($currentItem.index()){
      let $scrollWidth = parseInt($(this).width()) * ($currentItem.index() + 1);        
      const $navWidth = $thisKey.siblings(".nav-tabs").width();
      if($navWidth < $scrollWidth && $keyName === "ArrowRight"){
        $leftNavScroll.removeClass("disabled").addClass("active")
      }
      else if($navWidth >= $scrollWidth) {
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
  //Function used to get the scroll width 
  function getActiveScrollWidth($currentNav) {
    const $navItem = $currentNav.parents(".stack-tab-container").find(".nav-item:not(.hide)");
    let $navWidth = 0;
    $navItem.each(function(){
      $navWidth = $navWidth + parseInt($(this).width());
    })
    return $navWidth;
  }
  //Function used to handle the enable scrolling feature for tab
  function slideTabEventHandler() {
    const $currentNav = $(this);
    const $navWidth = $currentNav.siblings(".nav-tabs").width();
    const $scrollWidth = getActiveScrollWidth($currentNav);
    const $navItem = $currentNav.siblings(".nav-tabs").find(".nav-item");
    if($currentNav.hasClass("right")){
      if($navWidth < $scrollWidth){
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
