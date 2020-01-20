$(function() {
  let tableHeader = $("table tbody tr:first-child");
  let theaderPosition = tableHeader.offset().top;
  let position = 0;
  let screenWidth = $(window).width();
  //sticky header function on scroll 
  $(window).on("scroll", function() {
    if (window.pageYOffset > theaderPosition) {
      position = window.pageYOffset - theaderPosition;
      if (screenWidth < 1024) {
        let mobilePos = position - 30;
        tableHeader.attr("style", "transform: translateY(" + mobilePos + "px)");
      } else {
        tableHeader.attr("style", "transform: translateY(" + position + "px)");
      }
    } else if (position !== 0) {
      position = 0;
      tableHeader.attr("style", "transform: translateY(" + 0 + "px)");
    }
  });
});
