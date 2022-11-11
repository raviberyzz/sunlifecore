$(document).ready(function () {
  
   $('#signin-widget-modal').on('shown.bs.modal', function () {

     var inputs = $('#signin-widget-modal').find('select, input, textarea, button, a').filter(':visible');
     var firstInput = inputs.first();
     var lastInput = inputs.last();

     /*set focus on input box */
      firstInput.focus();

     /*redirect last tab to first input*/
     lastInput.on('keydown', function (e) {
         if ((e.which === 9 && !e.shiftKey)) {
             e.preventDefault();
             firstInput.focus();
         }
     });

     /*redirect first shift+tab to last input*/
     firstInput.on('keydown', function (e) {
         if ((e.which === 9 && e.shiftKey)) {
             e.preventDefault();
             lastInput.focus();
         }
     });

 });
  $("a.customer-sign-sm").click(function () {
    updateSignInForm("form_signon_mobile");
  });
  var mfaAjaxCallDone=false;
  $("#signin-widget-modal").on("shown.bs.modal", function () {
    var host = providerURL.match(/^(?:https?:)?(?:\/\/)?([^\/\?]+)/g);
    if (host === null || host === undefined) {
      host = "https://www.sunnet.sunlife.com";
    }
    let errorVal=$('#signin-widget-modal .modal-body input[name="ERRORREDIRPATH"]').attr("value");
    let targetVal=$('#signin-widget-modal .modal-body input[name="TARGET"]').attr("value");
    var signinWidget = $("#signin-widget-modal .modal-body").html();
    var newString = signinWidget.replace(
      /(https?:\/\/)(.*?)(\/+?)/g,
      host + "$3"
    );
    $("#signin-widget-modal .modal-body").html(newString);
    $('#signin-widget-modal .modal-body input[name="ERRORREDIRPATH"]').attr("value",errorVal);
    $('#signin-widget-modal .modal-body input[name="TARGET"]').attr("value",targetVal);
    updateSignInForm("form_signon");
    function mfaCssJs() {
      var newTime = new Date().getTime();
      let head = document.getElementsByTagName("head")[0];
      var style = document.createElement("link");
      style.href =
        //"/etc.clientlibs/sunlife/core/components/content/sign-in/mfa-clientlibs.min.css?date=" +
        "/etc.clientlibs/sunlife/core/clientlibs/vendor/mfa-clientlibs.min.css?date=" +
        newTime;
      style.rel = "stylesheet";
      style.id = "mfa-css";
      head.appendChild(style);
      var script1 = document.createElement("script");
      script1.type = "text/javascript";
      script1.src =
        //"/etc.clientlibs/sunlife/core/components/content/sign-in/mfa-transit-jdk.js?date=" +
        "/etc.clientlibs/sunlife/core/clientlibs/vendor/mfa-transit-jdk.min.js?date=" +
        newTime;
      script1.id = "mfa1-js";
      $("body").append(script1);
      var script2 = document.createElement("script");
      script2.type = "text/javascript";
      script2.src =
        //"/etc.clientlibs/sunlife/core/components/content/sign-in/mfa-clientlibs.min.js?date=" +
        "/etc.clientlibs/sunlife/core/clientlibs/vendor/mfa-clientlibs.min.js?date=" +
        newTime;
      script2.id = "mfa2-js";
      $("body").append(script2);
    }
    function mfaHtml() {
      $(".full-header header").append(
        '<!-- transmit container starts here -->\
        <div class="sign-in">\
          <div class="modal slf-modal fix-order" id="mfa_signin_modal" role="dialog" tabindex="-1" data-keyboard="false"\
          data-backdrop="static">\
            <span id="startOfModal" class="sr-only">Start of dialog window</span>\
            <div class="modal-dialog slf-yellow-modal">\
                <div class="modal-content">\
                    <div class="modal-header">\
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span\
                                class="fa fa-times"></span></button>\
                    </div>\
                    <div class="modal-body">\
                        <div id="transmitContainer" aria-live="polite">\
                        </div>\
                    </div>\
                    <div class="modal-footer">\
                    </div>\
                </div>\
            </div>\
            <span id="endOfModal" class="sr-only">End of dialog window</span>\
          </div>\
          <!-- Spinner -->\
          <div id="loadingMessageDiv" style="display:none;" class="loadingmessage" role="alert" aria-hidden="false"\
              aria-label="Loading" aria-atomic="true">\
              <div class="white-container">\
                  <div class="loading-container">\
                      <i class="fa fa-spinner fa-pulse"></i>\
                      <p><strong data-id="title">Loading...</strong></p>\
                      <p data-id="message">One moment please</p>\
                  </div>\
              </div>\
          </div>\
          <div style="height:0px;width:0px;visibility: hidden;" >\
            <form id="smHiddenForm" action="" method="post">\
                <input id="smValue" name="smValue" type="hidden" value="abc"> \
            </form>\
          </div>\
        </div>\
      '
      );
    }
    if (
      window.location.hostname.indexOf("www") > -1 &&
      window.location.hostname.indexOf(".ca") > -1
    ) {
      var action = $("#signin-widget-modal #form_signon").attr("action").trim();
      if (action != undefined && action == "") {
        if(mfaAjaxCallDone===false){
          console.log('mfa modal'+mfaAjaxCallDone);
          mfaHtml();
          mfaCssJs();
          mfaAjaxCallDone=true;
        }
      }
    }
  });
  function modalWidth() {
    var winWidth = $(window).width();
    $("#signin-widget-modal").width(winWidth);
    $("#signin-widget-modal").addClass("horizontal-middle-align");
  }
  if ($(window).width() > 1024) {
    modalWidth();
  }
  $(window).resize(function () {
    if ($(window).width() > 1024) {
      modalWidth();
    }
  });
  function slfMmodalWidth() {
    var winWidths = $(window).width();
    $(".slf-modal").width(winWidths);
    //$(".slf-modal").addClass('horizontal-middle-align');
  }
  if ($(window).width() > 1024) {
    slfMmodalWidth();
  }
  $(window).resize(function () {
    if ($(window).width() > 1024) {
      slfMmodalWidth();
    } else {
      var winWidth = $(window).width();
      $(".slf-modal").width(winWidth);
    }
  });
  $(".icon-reg").html("");
  var a1 = $("#userIdDiv").html();
  if (a1 && a1.indexOf("&nbsp;") != -1) {
    var updatedString = a1.replace("&nbsp;", "");
    $("#userIdDiv").html(updatedString);
  }
  $(".sign-in-modal-wrapper #rememberIDModal").click(function () {
    remember(this);
  });
  $("#rememberIDModal").keypress(function (event) {
    var keycode = event.keyCode ? event.keyCode : event.which;

    if (keycode == 13) {
      clickCheckBox(this, event);
    }
    event.stopPropagation();
    event.preventDefault();
    return false;
  });
  function clickCheckBox(box, e) {
    $(box).trigger("click");
  }
  $(".signin-sponsor").keydown(function (e) {
    if (e.which == 9) {
      e.preventDefault();
      $("#closeSignInModal").focus();
      e.stopPropagation();
    }
  });
  $("#signinbutton").keydown(function (e) {
    if ($("#signin-widget-modal").hasClass("in")) {
      if (e.which == 9) {
        e.preventDefault();
        $("#closeSignInModal").focus();
        e.stopPropagation();
      }
    }
  });
  $("#closeSignInModal").keydown(function (e) {
    if (e.which == 13) {
      $("#signinbutton").focus();
      e.stopPropagation();
    }
  });
});
function CheckClicksCa(event) {
  var action = $("#signin-widget-modal #form_signon").attr("action").trim();
  if (action != undefined && action == "") {
    console.log("transmit");
    $("#signin-widget-modal").modal("hide");
    event.preventDefault();
    setTimeout(onSignInClick, 500);
  } else {
    console.log("siteminder");
    if (
      $("#signin-widget-modal input[name=ESAVEID]").attr("value") != undefined
    ) {
      if (
        $("#signin-widget-modal input[name=ESAVEID]").attr("value").trim().length > 0 &&
        $("#signin-widget-modal input[name=ESAVEID]").attr("value").trim() != "false"
      ) {
        $("#signin-widget-modal input[name=LOGONUSINGSAVEID]").val("TRUE");
      }
    }
    let lang = $("html").attr("lang");
    if (lang == "fr") {
      CheckClicks("f");
    } else {
      CheckClicks("e");
    }
  }
}
