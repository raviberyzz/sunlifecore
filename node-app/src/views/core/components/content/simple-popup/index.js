$(document).ready(function () {
  popUpWidth();
  function popUpWidth() {
    var popWidth = $(window).width();
    $(".subscribe-popup-wrapper").width(popWidth);
  };
  $(window).resize(function () {
    popUpWidth();
  });
  $("#subscribe .modal-content .cmp-form-button").keydown(function (e) {
    if (e.which == 9) {
      e.preventDefault();
      $(".close-popup").focus();
    }
  });
  //   $("#subscribe").modal({show:true});

});

