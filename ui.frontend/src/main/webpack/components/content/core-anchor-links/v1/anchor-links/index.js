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
    const $anchorLinksList = $(".sl-anchor-links ul");
    let anchorLinksListItem = '';
    $anchorLinks.each(function(index, item){
      $(this).attr("id", "anchorLinkHeading-"+index);
      anchorLinksListItem += '<li class=""><a class="anchorLinkHeading-'+index+'" href="#anchorLinkHeading-'+index+'">'+$(this).html()+'</a></li>';
    })
    $anchorLinksList.html(anchorLinksListItem);
  }
  var handleScroll = function handleScroll(e) {
    let linkIds = [];
    const $anchorLinks = $("h2");
    $anchorLinks.each(function(index, item){
      linkIds.push("anchorLinkHeading-"+index)
    })
    for (var index = 0; index < linkIds.length; index++) {
      var linkId = linkIds[index];
      var targetElement = document.getElementById(linkId);
      if (targetElement) {
        var eleRect = targetElement === null || targetElement === void 0 ? void 0 : targetElement.getBoundingClientRect();
        var isInView = eleRect.top >= 0 && eleRect.bottom <= window.innerHeight;
        if (isInView) {
          $(".sl-anchor-links li").removeClass("active-anchor");
          $(".anchorLinkHeading-"+index).parents("li").addClass("active-anchor");
        }
      }
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
