$(document).ready(function () {
  var popHeight = $(window).height();
  $(".subscribe-popup-wrapper").height(popHeight);
  popUpWidth();
  function popUpWidth() {
    var popWidth = $(window).width();
    $(".subscribe-popup-wrapper").width(popWidth);
  };
  $(window).resize(function () {
    popUpWidth();
  });
  $(".modal-content .cmp-form-button").keydown(function (e) {
    if (e.which == 9) {
      e.preventDefault();
      $(".close-popup").focus();
    }
  });
  //   $("#subscribe").modal({show:true});

});
