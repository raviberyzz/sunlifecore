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
    if ($(window).width() > 1024) {
      modalWidth();
    }
    $(window).resize(function() {
      if ($(window).width() > 1024) {
        modalWidth();
      }
    });
    $('.icon-reg').html('');
    var a1=$('#userIdDiv').html();
    if(a1 && a1.indexOf("&nbsp;") != -1){
      var updatedString = a1.replace("&nbsp;", "");
      $('#userIdDiv').html(updatedString);
    } 
});     