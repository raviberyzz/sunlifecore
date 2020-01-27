$(document).ready(function(){
    popUpWidth();   
    function popUpWidth(){
        var popWidth=$(window).width();
        $(".popup-modal-wrapper").width(popWidth);
      };
      $(window).resize(function() {
            popUpWidth();
      });
});