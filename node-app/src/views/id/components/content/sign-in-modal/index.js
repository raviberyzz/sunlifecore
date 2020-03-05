
$(document).ready(function () {
  $("#id_sign_in").change(function(){
      if($("#id_sign_in").children("option:selected").attr('label') !== ''){
          $("#signIn input").removeAttr("disabled");
      }
  });
  function popupID(){
var selectBox = document.getElementById('id_sign_in');
var selIndex = selectBox.selectedIndex;
  var selValue = selectBox.options[selIndex].value;	
var day = new Date();
var id = day.getTime();
var tbar = 0;
var sbar = 0;
var mbar = 0;
    var rgn = window.location + '';
    var url = selValue;   	
if (selIndex == 2) {
      tbar = 1;
      sbar = 1;
      mbar = 1;
  
}	
eval("page" + id + " = window.open(url, '" + id + "', 'toolbar=" + tbar +", scrollbars=1, location=0, statusbar=" + sbar + ", menubar=" + mbar +", resizable=1, width=850, height=600, left = 215, top = 30');");
  }
  $("#signIn input").click(function(){
popupID();
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
});