$(document).ready(function () {
    $("a.customer-sign-sm").click(function() {
        updateSignInForm('form_signon_mobile');     
      });  
    $('#signin-widget-modal').on('shown.bs.modal', function() {
      var host = providerURL.match(/^(?:https?:)?(?:\/\/)?([^\/\?]+)/g);
      if (host === null || host === undefined) {
        host = "https://www.sunnet.sunlife.com";
      }
      var signinWidget = $('#signin-widget-modal .modal-body').html();
      var newString = signinWidget.replace (/(https?:\/\/)(.*?)(\/+?)/g, host + '$3');
      $('#signin-widget-modal .modal-body').html(newString);
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
    $('#caSubmit').click(function(e){
      alert(1);
      e.preventDefault();
      e.stopPropagation();
      alert(2);
    })
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
function CheckClicksCa(event){
  var action=$("#signin-widget-modal #form_signon").attr('action').trim();
  if(action==undefined || action==''){
      console.log('transmit');
      $("#signin-widget-modal").modal("hide");
      onSignInClick();
      event.preventDefault();
  }else{
      console.log('siteminder');
      if($("#signin-widget-modal input[name=ESAVEID]").attr('value')!=undefined){
          if($(".mySlfSignIn input[name=ESAVEID]").attr('value').trim().length>0 &&
            $(".mySlfSignIn input[name=ESAVEID]").attr('value').trim()!='false'){
              $(".mySlfSignIn input[name=LOGONUSINGSAVEID]").val("TRUE");
          }
      }
      let lang=$('html').attr('lang');
      if(lang=='fr'){
        CheckClicks('f');
      }else{
        CheckClicks('e');
      }
  }
}    