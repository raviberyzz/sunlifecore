$(document).ready(function () {
  $("a.customer-sign-sm").click(function () {
    updateSignInForm("form_signon_mobile");
  });
  $("#signin-widget-modal").on("shown.bs.modal", function () {
    var host = providerURL.match(/^(?:https?:)?(?:\/\/)?([^\/\?]+)/g);
    if (host === null || host === undefined) {
      host = "https://www.sunnet.sunlife.com";
    }
    var signinWidget = $("#signin-widget-modal .ca-modal .modal-body").html();
    var newString = signinWidget.replace(
      /(https?:\/\/)(.*?)(\/+?)/g,
      host + "$3"
    );
    $("#signin-widget-modal .ca-modal .modal-body").html(newString);
    updateSignInForm("form_signon");
    function mfaCssJs() {
      var newTime = new Date().getTime();
      let head = document.getElementsByTagName("head")[0];
      var style = document.createElement("link");
      style.href =
        "/etc.clientlibs/sunlife/core/components/content/sign-in/mfa-clientlibs.min.css?date=" +
        newTime;
      style.rel = "stylesheet";
      style.id = "mfa-css";
      head.appendChild(style);
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "/etc.clientlibs/sunlife/core/components/content/sign-in/mfa-clientlibs.min.js?date=" +
        newTime;
      script.id = "mfa-js";
      $("body").append(script);
    }
    function mfaHtml() {
      $(".full-header header").append(
        '<!-- transmit container starts here -->\
        <div class="modal slf-modal fix-order" id="mfa_signin_modal"\
        role="dialog" tabindex="-1" data-keyboard="false" data-backdrop="static">\
          <span id="startOfModal" class="sr-only">Start of dialog window</span>\
          <div class="modal-dialog slf-yellow-modal">\
              <div class="modal-content">\
                  <div class="modal-header">\
                      <h3 id="your_header_id" class="modal-title inline-block"></h3>\
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                      <span class="fa fa-times"></span></button>\
                  </div>\
                  <div class="modal-body" id="termsAndConditionContent">\
                      <div id="transmitContainer"></div>\
                      <!-- start modal content -->\
                  </div>\
                  <div class="modal-footer"></div>\
              </div>\
          </div>\
          <span id="endOfModal" class="sr-only">End of dialog window</span>\
        </div>\
        <!-- Spinner -->\
        <div id="loadingMessageDiv" style="display:none;" class="loadingmessage" \
        role="alert" aria-hidden="false" aria-label="Loading" aria-atomic="true">\
          <div class="white-container">\
              <div class="loading-container">\
                  <i class="fa fa-spinner fa-pulse"></i>\
                  <p><strong>Loading...</strong></p>\
                  <p>One moment please</p>\
              </div>\
          </div>\
        </div>\
        <!-- transmit container ends here -->\
      '
      );
    }
    mfaHtml();
    mfaCssJs();
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
        $(".mySlfSignIn input[name=ESAVEID]").attr("value").trim().length > 0 &&
        $(".mySlfSignIn input[name=ESAVEID]").attr("value").trim() != "false"
      ) {
        $(".mySlfSignIn input[name=LOGONUSINGSAVEID]").val("TRUE");
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
