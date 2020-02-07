<<<<<<< HEAD
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
  $(".cmp-form-button").keydown(function (e) {
    if (e.which == 9) {
      e.preventDefault();
      $(".close-popup").focus();
    }
  });
  //   $("#subscribe").modal({show:true});

});
=======
$(document).ready(function(){
      var popHeight=$(window).height();
      $(".subscribe-popup-wrapper").height(popHeight);
    popUpWidth();   
    function popUpWidth(){
        var popWidth=$(window).width();
        $(".subscribe-popup-wrapper").width(popWidth);
      };
      $(window).resize(function() {
            popUpWidth();
      });
      $(".cmp-form-button").keydown(function (e) {
        if (e.which == 9) {
          e.preventDefault();
          $(".close-popup").focus();
        }
      });
     
});
>>>>>>> 39b1edd9a9ba0e1ffe7315a7336e0ed1c3bd86a3
