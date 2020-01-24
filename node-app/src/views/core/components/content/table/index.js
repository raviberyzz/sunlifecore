function stickyHeader(){
  let tableHeader = $("table tbody tr:first-child");
  //let theaderPosition = tableHeader.offset().top;
  let position = 0;
  let screenWidth = $(window).width();
  //sticky header function on scroll 
  $(window).on("scroll", function() {
    console.log("scrolling");
    if (window.pageYOffset > theaderPosition) {
      position = window.pageYOffset - theaderPosition;
      tableHeader.attr("style", "transform: translateY(" + position + "px)");
    } else if (position !== 0) {
      position = 0;
      tableHeader.attr("style", "transform: translateY(" + 0 + "px)");
    }
  });
}
$(stickyHeader);
$(window).resize(stickyHeader);
