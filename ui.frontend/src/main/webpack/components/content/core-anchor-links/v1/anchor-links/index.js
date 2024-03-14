/**
 * Bind a throttled scroll window event if there is anchor links on the page which gets triggered on page scroll. 
 * Manage to activate the anchor link on click of links.
 * load id's in anchor links and map it to content to scroll it to correct place.
 */

(function($, util) {
  let isVisible = null;
  /**
     * Function used to update the active anchor link on click event.
     * @function
  */
  function handleClickEventForActiveLink() {
    const $scope = $(this);
    setTimeout(function(){
      $(".sl-anchor-links li").removeClass("active-anchor");
      $scope.addClass("active-anchor");
    }, 100)
  }
  /**
     * Function used to generate the anchorlinks
     * @function
  */
  function loadAnchorLinks() {
    const $anchorLinks = $("h2");
    if($anchorLinks.length === 0) return;
    $anchorLinks.each(function(index, item){
      const id = $(".cmp-toc__content li").eq(index).find('a').attr('href')?.replace("#","")?.replace(".","");
      $(this).attr("id", "anchor-"+id);
      $(".cmp-toc__content li").eq(index).find('a').attr('href', "#anchor-"+id);
      $(this).parents("div").attr("data-id", "anchor-"+id);
      $(".cmp-toc__content li").eq(index).addClass("anchor-"+id)
    })
    const headerHeight = $(".header").height();
    $(".sl-anchor-links").css("top",headerHeight);
    $("html, body").scrollTop(0);
    $(".sl-anchor-links li").eq(0).addClass("active-anchor");
  }
  /**
     * Function used to handle the scroll and update visible anchor link active.
     * @function
  */
  var handleScroll = function handleScroll() {
    const $footer = $(".footer");
    const footerTop = $footer.offset().top;
    const $slLinks = $(".sl-anchor-links");
    $slLinks.removeClass("no-sticky");
    const slLinksTop = $slLinks.offset().top + $slLinks.height();
    if($footer.length > 0 && slLinksTop >= footerTop){
      $slLinks.addClass("no-sticky");
    }
    let linkIds = [];
    const $anchorLinks = $(".cmp-toc__content li");
    $anchorLinks.each(function(){
      const id = $(this).find('a').attr('href')?.replace("#","");
      linkIds.push(id)
    })
    let activeLinkIndex = null;
    const container = document.querySelector(".layout-container")
    const options = {
      root: container
    }
    const callback = (entries) => {
      entries.map((item) => {
        if(item.isIntersecting && item.intersectionRect.top <= 20 && item.intersectionRect.bottom >= 0){
          isVisible = item.target.dataset.id;
        }
      })      
    }    
    const observer = new IntersectionObserver(callback, options)    
    for (var index = 0; index < linkIds.length; index++) {
      var linkId = linkIds[index];
      var targetElement = document.getElementById(linkId).parentNode;
      if (targetElement) {
        observer.observe(targetElement)
        if (isVisible) {
          activeLinkIndex = isVisible;
        }
      }
      if(activeLinkIndex !== null) {
        $(".sl-anchor-links li").removeClass("active-anchor");
        $("."+activeLinkIndex).addClass("active-anchor");
      }
    }
  };
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
      $(window).bind("scroll", util.throttle(handleScroll, 10));
    }
  }
  init(); 

})(sunCore.$, sunCore.util);
