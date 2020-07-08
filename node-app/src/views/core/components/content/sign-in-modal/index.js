$(document).ready(function () {
    $("a.customer-sign-sm").click(function() {
        updateSignInForm('form_signon_mobile');     
      });  
    $('#signin-widget-modal').on('shown.bs.modal', function() {
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
    function slfMmodalWidth(){
      var winWidths=$(window).width();
      $(".slf-modal").width(winWidths);
      //$(".slf-modal").addClass('horizontal-middle-align');
    }
    if ($(window).width() > 1024) {
      slfMmodalWidth();
    }
    $(window).resize(function() {
      if ($(window).width() > 1024) {
        slfMmodalWidth();
      } else{
        var winWidth = $(window).width();
       $(".slf-modal").width(winWidth);
    }
    });
    $('.icon-reg').html('');
    var a1=$('#userIdDiv').html();
    if(a1 && a1.indexOf("&nbsp;") != -1){
      var updatedString = a1.replace("&nbsp;", "");
      $('#userIdDiv').html(updatedString);
    } 
    $(".sign-in-modal-wrapper #form_signon .btn.btn-blue").click(function(){
      return CheckClicks('e');
    });
    $(".sign-in-modal-wrapper #rememberIDModal").click(function(){
      remember(this);
    });
    $('#rememberIDModal').keypress(function(event) {
      var keycode = (event.keyCode ? event.keyCode : event.which);

      if (keycode == 13) {
          clickCheckBox(this,event);
      }
      event.stopPropagation();
     event.preventDefault();
     return false;
  });
 function clickCheckBox(box,e) {
  $(box).trigger('click');
}
 $(".signin-sponsor").keydown(function(e){
      if (e.which == 9 ) {
     e.preventDefault();
         $('#closeSignInModal').focus();
          e.stopPropagation();
      }
 });
 $("#signinbutton").keydown(function(e){
     if ($('#signin-widget-modal').hasClass('in')) {
      if (e.which == 9 ) {
       e.preventDefault();
         $('#closeSignInModal').focus();
          e.stopPropagation();
      }
     }
 });
 $("#closeSignInModal").keydown(function(e){
      if (e.which == 13 ) {
         $('#signinbutton').focus();
          e.stopPropagation();
      }
 });
});     