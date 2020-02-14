$(document).ready(function () {
    $("a.customer-sign-sm").click(function() {
        updateSignInForm('form_signon_mobile');     
      });  
    $('#signin-widget-modal').on('shown.bs.modal', function() {
          updateSignInForm('form_signon');        
    });
    function modalWidth(){
      var winWidth=$(window).width();
      $("#mySignInModal").width(winWidth);
      $("#mySignInModal").addClass('horizontal-middle-align');
    }
    function modalHeight(){
      var modalHeight=$(document).height();
      $("#mySignInModal").height(modalHeight);
    }
    if ($(window).width() > 1024) {
      modalWidth();
    }
     modalHeight();
    $(window).resize(function() {
	 modalHeight();
      if ($(window).width() > 1024) {
        modalWidth();
      }
    }); 
});     