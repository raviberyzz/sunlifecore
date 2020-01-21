function stickyHeader(){
  let tableHeader = $("table tbody tr:first-child");
  let tableHeight = $("table").height();
  let theaderPosition = tableHeader.offset().top;
  let position = 0;
  let headerHidePos = theaderPosition + tableHeight;
  //sticky header function on scroll 
  $(window).on("scroll", function() {
    if (window.pageYOffset > theaderPosition) {
        position = window.pageYOffset - theaderPosition;
        tableHeader.attr("style", "transform: translateY(" + position + "px)");
      if (window.pageYOffset > headerHidePos) tableHeader.attr("style", "transform: translateY(" + 0 + "px)"); 
    } else if ( window.pageYOffset < theaderPosition ) {
      tableHeader.attr("style", "transform: translateY(" + 0 + "px)");
    } 
  });
}
$(stickyHeader);
$(window).resize(stickyHeader);