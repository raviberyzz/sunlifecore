$(document).ready(function () {
  
  //Function used to update the active anchor link on click event
  function handleClickEventForActiveLink() {
    $(".sl-anchor-links li").removeClass("active-anchor");
    $(this).addClass("active-anchor");
  }
  //Function used to generate the anchorlinks
  function loadAnchorLinks() {
    const $anchorLinks = $("h2");
    if($anchorLinks.length === 0) return;
    $anchorLinks.each(function(index, item){
      $(this).attr("id", "heading-"+(index+1));
      $(".cmp-toc__content li").eq(index).addClass("heading-"+(index+1))
    })
  }
  var handleScroll = function handleScroll(e) {
    let linkIds = [];
    const $anchorLinks = $(".cmp-toc__content li");
    $anchorLinks.each(function(index, item){
      linkIds.push("heading-"+(index+1))
    })
    let activeLinkIndex = null;
    for (var index = 0; index < linkIds.length; index++) {
      var linkId = linkIds[index];
      var targetElement = document.getElementById(linkId);
      if (targetElement) {
        var eleRect = targetElement === null || targetElement === void 0 ? void 0 : targetElement.getBoundingClientRect();
        var isInView = eleRect.top >= 0 && eleRect.bottom <= window.innerHeight;
        if (isInView) {
          activeLinkIndex = linkId;
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
  function init() {
    loadAnchorLinks();
    $(document).on("click", ".sl-anchor-links li", handleClickEventForActiveLink)    
    window.addEventListener('load', handleScroll);
    window.addEventListener('scroll', handleScroll);
  }
  init();
});
