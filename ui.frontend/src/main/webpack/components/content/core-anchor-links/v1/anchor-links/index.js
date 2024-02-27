$(document).ready(function () {
  function getAllHeadingForAnchorLinks() {
    const startLevel = parseInt($(".anchor-link-lists").attr("data-startLevel").replace("h",""));
    const stopLevel = parseInt($(".anchor-link-lists").attr("data-stopLevel").replace("h",""));
    let $anchorLinks = [];
    for(let i = startLevel; i <= stopLevel; i++) {
      $anchorLinks.push("h"+i);
    }
    return $anchorLinks;
  }
  //Function used to update the active anchor link on click event
  function handleClickEventForActiveLink() {
    $(".sl-anchor-links li").removeClass("active-anchor");
    $(this).addClass("active-anchor");
  }
  //Function used to generate the anchorlinks
  function loadAnchorLinks() {
    let listIndex = 0;
    getAllHeadingForAnchorLinks().map((item) => {
      const $anchorLinks = $(item)
      if($anchorLinks.length === 0) return;
      const $anchorLinksList = $(".sl-anchor-links ul");
      let anchorLinksListItem = '';
      $anchorLinks.each(function(index, item){
        $(this).attr("id", "anchorLinkHeading-"+listIndex);
        anchorLinksListItem += '<li class=""><a class="anchorLinkHeading-'+listIndex+'" href="#anchorLinkHeading-'+listIndex+'">'+$(this).html()+'</a></li>';
        listIndex++;
      })  
      $anchorLinksList.append(anchorLinksListItem);    
    })
  }
  var handleScroll = function handleScroll(e) {
    let linkIds = [];
    const $anchorLinks = $(".anchor-link-lists li");
    $anchorLinks.each(function(index, item){
      linkIds.push("anchorLinkHeading-"+index)
    })
    for (var index = 0; index < linkIds.length; index++) {
      var linkId = linkIds[index];
      var targetElement = document.getElementById(linkId);
      if (targetElement) {
        var eleRect = targetElement === null || targetElement === void 0 ? void 0 : targetElement.getBoundingClientRect();
        var isInView = eleRect.top >= 0 && $(".anchorLinkHeading-"+(index + 1))?.top <= window.innerHeight;
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
