$(document).ready(function () {
    $("a.customer-sign-sm").click(function() {
        updateSignInForm('form_signon_mobile');     
      });  
    $('#signin-widget-modal-modal').on('shown.bs.modal', function() {
          updateSignInForm('form_signon');        
    });
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