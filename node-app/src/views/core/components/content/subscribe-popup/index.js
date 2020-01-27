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
});