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
      anchorLinksListItem += '<li class=""><a href="#anchorLinkHeading-'+index+'">'+$(this).html()+'</a></li>';
    })
    $anchorLinksList.html(anchorLinksListItem);
  }
  function init() {
    loadAnchorLinks();
    $(document).on("click", ".sl-anchor-links li", handleClickEventForActiveLink)
  }
  init();
});
