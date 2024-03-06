/**
 * Bind a throttled scroll window event if there is anchor links on the page which gets triggered on page scroll. 
 * Manage to activate the anchor link on click of links.
 * load id's in anchor links and map it to content to scroll it to correct place.
 */
$(document).ready(function () {
  let isVisible = null;
  /**
     * Function used to update the active anchor link on click event.
     * @function
  */
  function handleClickEventForActiveLink() {
    $(".sl-anchor-links li").removeClass("active-anchor");
    $(this).addClass("active-anchor");
  }
  /**
     * Function used to generate the anchorlinks
     * @function
  */
  function loadAnchorLinks() {
    const $anchorLinks = $("h2");
    if($anchorLinks.length === 0) return;
    $anchorLinks.each(function(index, item){
      $(this).attr("id", "heading-"+(index+1));
      $(".cmp-toc__content li").eq(index).addClass("heading-"+(index+1))
    })
  }
  /**
     * Function used to handle the scroll and update visible anchor link active.
     * @function
  */
  var handleScroll = function handleScroll() {
    let linkIds = [];
    const $anchorLinks = $(".cmp-toc__content li");
    $anchorLinks.each(function(index, item){
      linkIds.push("heading-"+(index+1))
    })
    let activeLinkIndex = null;
    const container = document.querySelector(".layout-container")
    const options = {
      root: container
    }
    const callback = (entries) => {
      entries.map((item) => {
        if(item.isIntersecting){
          isVisible = item.target.id;
        }
      })      
    }    
    const observer = new IntersectionObserver(callback, options)    
    for (var index = 0; index < linkIds.length; index++) {
      var linkId = linkIds[index];
      var targetElement = document.getElementById(linkId);
      if (targetElement) {
        observer.observe(targetElement)
        var eleRect = targetElement === null || targetElement === void 0 ? void 0 : targetElement.getBoundingClientRect();
        var isInView = eleRect.top >= 0 && eleRect.bottom <= window.innerHeight;
        if (isInView) {
          activeLinkIndex = isVisible === linkId ? isVisible: linkId;
        }
      }
      if(activeLinkIndex !== null){
        break;
      }
    }
    if(activeLinkIndex !== null){
      $(".sl-anchor-links li").removeClass("active-anchor");
      $("."+activeLinkIndex).addClass("active-anchor");
    }
  };
  /**
     * Set up throttler.
     * @function
     * @param {function} fn - The function to throttle.
     * @param {number} delay - The function will run once per given amount of milliseconds.
  */
  const throttle = (fn, delay) => {
      let time = Date.now();
      return () => {
          if ((time + delay - Date.now()) <= 0) {
              fn();
              time = Date.now();
          }
      }
  }
  /**
     * Check if Anchor links component exists.
     * @function
  */
  function doesModuleExist() {
      if ($('.sl-anchor-links').length <= 0) {
          return false;
      }
      return true;
  }
  /**
     * Function used to initilize the event
     * @function
  */
  function init() {
    if(doesModuleExist()){
      loadAnchorLinks();
      $(document).on("click", ".sl-anchor-links li", handleClickEventForActiveLink);        
      $(window).bind("scroll", throttle(handleScroll, 10));
      $(window).bind("load", throttle(handleScroll, 10));
    }
  }
  init();
});
