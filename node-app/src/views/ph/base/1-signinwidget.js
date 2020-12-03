$(document).ready(function () {
  var currentSignInForm;
  var contingencyWidgetDisplayed = false;
  var providerURL =
    "https://mobile.sunlife.com.ph/Sunlife/apps/services/www/Sunlife/mobilewebapp/default/index.html";
  var rpc;
  var hostname = window.location.hostname;
  var lang = $("html").attr("lang") === "fr" ? "fr" : "en";

  function updateSignInForm(formName) {
    //console.log("formUpdate called");

    currentSignInForm = formName;
    //console.log(" current signin form : "+currentSignInForm);
    try {
      rpc = new easyXDM.Rpc(
        {
          remote: providerURL,
        },
        {
          local: {
            authenticate: function (param, successFn, errorFn) {},
          },

          remote: {
            authenticate: {},
          },
        }
      );
    } catch (err) {
      //displayContingencyWidget();
    }
  }

  function authenticate() {
    //console.log("authenticate called");

    if (rpc) {
      //console.log("rpc :"+rpc);
      showLoadingImage();
      var param = {
        username: $("#" + currentSignInForm + " input[name=USER]").val(),
        password: $("#" + currentSignInForm + " input[name=PASSWORD]").val(),
      };

      if (!param.username || !param.password) {
        var data = {};
        data.message = "Please provide username/password";
        error(data);
      } else {
        rpc.authenticate(param, success, error);
        //Tagging for Upon click  of Login,
        var url = window.location.href;
        // utag.link({
        //   ev_type: "authenticate",
        //   ev_action: "clk",
        //   ev_title: "sign in",
        //   ev_data_one: "login successful",
        //   page_url: "+url+",
        // });
      }
    }
  }

  function success(data) {
    //console.log("Success called");
    if (!contingencyWidgetDisplayed) {
      window.location.href = providerURL + data;
      hideLoadingImage();
    }
  }

  function error(data) {
    //console.log("error called");
    var decodedApologyMessage = decodeURIComponent(data.message);
    decodedApologyMessage = decodedApologyMessage.replace(/\+/g, " ");

    //check if form is from the SLOCPI website's home page (desktop view) which is form_signon
    if (currentSignInForm == "form_signon") {
      $("#phsigninerr center strong").html(decodedApologyMessage);
      $("#phsigninerr").show();
    } else {
      $("#" + currentSignInForm + " #generalError").html(decodedApologyMessage);
      $("#" + currentSignInForm + " #generalError")
        .parent(".form-group")
        .addClass("has-error");
    }
    hideLoadingImage();
  }

  function displayContingencyWidget() {
    //console.log("displayContingencyWidget called");
    contigencyWidgetDisplayed = true;
    if (currentSignInForm == "form_signon") {
      $("#signin-widget").hide();
      $("#contigency-widget").show();
    } else if (currentSignInForm == "form_signon_mobile") {
      $("#signin-widget-mobile").hide();
      $("#contigency-widget-mobile").show();
    } else {
      $("#signin-widget-pinbar").hide();
      $("#contigency-widget-pinbar").show();
    }

    hideLoadingImage();
  }

  function showLoadingImage() {
    //console.log("showLoadingImage called");
    if (currentSignInForm == "form_signon") {
      $(".loading").show();
    } else if (currentSignInForm == "form_signon_mobile") {
      $(".loading-mobile").show();
    } else {
      $(".loading-pinbar").show();
    }
  }

  function hideLoadingImage() {
    //console.log("hideLoadingImage called");
    if (currentSignInForm == "form_signon") {
      $(".loading").hide();
    } else if (currentSignInForm == "form_signon_mobile") {
      $(".loading-mobile").hide();
    } else {
      $(".loading-pinbar").hide();
    }
  }

  var isSubmitted;
  isSubmitted = false;

  function CheckClicks(lang) {
    //console.log("CheckClicks called");
    if (isSubmitted == true) {
      /* if (lang=="f")
						//alert('Veuillez patienter pendant que nous soumettons vos renseignements.');
				else
						//alert('Please wait while we submit your information'); */
      return false;
    } else {
      isSubmitted = true;
      var idField;
      var id;
      var i;
      var IsSaveId = false;
      var idLen;

      //idField= $("#" + currentSignInForm + " input[name=USER]");
      //console.log("currentSignInForm in ajax : "+currentSignInForm);
      id = $("#" + currentSignInForm + " input[name=USER]").val();
      if (id) {
        idLen = id.length;
        for (i = 0; i < idLen; i++) {
          if (id.charAt(i) != "*") {
            IsSaveId = false;
            if (id.charAt(i) == "&") {
              id = id.replace("&", ":");
            } else if (id.charAt(i) == "!") {
              id = id.replace("!", ";");
            }
          } else if (id.charAt(i) == "*") {
            if (i == 0) IsSaveId = true;
            id = id.replace("*", "!");
          }
        }
        if (IsSaveId) {
          //$("#" + currentSignInForm + " input[name=SAVEIDSUBMISSION]").val("FALSE");
          // $("#" + currentSignInForm + " input[name=LOGONUSINGSAVEID]").val("TRUE");
        }

        $("#" + currentSignInForm + " input[name=USER]").val(id);

        //document.form_signon.submit();
        return true;
      }
    }
  }
  $("#accessIDHome").click(function () {
    $("#phsigninerr").hide();
  });

  $("#signin-widget-modal").unbind("shown.bs.modal");
  $("#signin-widget-modal").off("show.bs.modal");
  updateSignInForm("form_signon");
});
