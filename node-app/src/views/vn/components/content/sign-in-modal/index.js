$(document).ready(function () {
    /*$('#signin-widget-modal').unbind("shown.bs.modal");
    $('#signin-widget-modal').off('show.bs.modal');*/
    function modalWidth(){
      var winWidth=$(window).width();
      $("#signin-widget-modal").width(winWidth);
      $("#signin-widget-modal").addClass('horizontal-middle-align');
    }
    if ($(window).width() > 1024) {
      modalWidth();
    }
    $(window).resize(function() {
      if ($(window).width() > 1024) {
        modalWidth();
      }
    }); 
}); 