var journeyPlayer = xmsdk.XmSdk(); // the Transmit SDK object
var XmUIHandler = new xmui.XmUIHandler(); // the default UI Handler
var sessionTimeout = new SessionTimeout();
var waitLoader = {
  keepWaitLoader: false,
  noWaitLoader: false,
  keepModalContent: false
};

var useMarcServer = true;
var elementsIds = {
  transmitContainer: "transmitContainer"
}

function onLogout(isVisible) {
  isVisible = isVisible || false ;

  // clear the oops message content
  this.setAppContentApperance(isVisible);

  // do not clear the modal when the OTP code is valid. Keep the display until they are redirected.
  if(!waitLoader.keepModalContent){
    $("#transmitContainer").empty();
    // make sure we do not show the modal when it's empty
    this.setAppContentApperance(false);
  }

  if(!$("#rememberID").is(':checked')){
    $("#USER").val('');
    $("#PASSWORD").val('');           
  }
  else{
    // $("#USER").val('************');
    $("#PASSWORD").val('');
  }

  return new Promise(function(resolve,reject){
    journeyPlayer.cancelCurrentRunningControlFlow();
    journeyPlayer.logout().then(function(result){
      updateSessionToken(null);
      resolve(true);
    })
    .catch(function (error) {
      console.log("Authenticate Error: ".concat(error));
      if(error.getErrorCode === 8) {
        
      }
      else{
        reject(error);
      }
    })
  })
}

function initJourneyPlayer() {
  var settings = getTransmitConnectionSettings();
  journeyPlayer.setConnectionSettings(settings);
  journeyPlayer.setUiHandler(new CustomUIHandler());
  
  if (lang === "fr"){
    console.log("set French Locale.");
    journeyPlayer.setLocale("fr-CA");

    // update the wait loader and modal content
    $("#loadingMessageDiv").attr("aria-label", "chargement");
    $("#loadingMessageDiv strong[data-id='title']").html('chargement...');
    $("#loadingMessageDiv p[data-id='message']").html('Un moment s\'il vous plait.');

    $("#startOfModal").html("Début de la fenêtre de dialogue");
    $("#mfa_signin_modal .modal-header .close").attr("aria-label","Fermer");
    $("#endOfModal").html("Fin de la fenêtre de dialogue ");

	} else {
    console.log("set English Locale.");
		journeyPlayer.setLocale("en-CA");
  }

  journeyPlayer.initialize().then(function (results) {
    console.log("Transmit SDK initialized successfully: ".concat(results));
    
    // if (!getSessionToken()) {
    //   setAppContentApperance(false);
    // } else {
    //   setAppContentApperance(true);
    // }
  }).catch(function (error) {
    console.error("Transmit SDK initialization error!: ".concat(error));
		if(error.getErrorCode() === com.ts.mobile.sdk.AuthenticationErrorCode.AppImplementation){
      setAppContentApperance(false);
    }
    else{
      setAppContentApperance(true);
      sessionTimeout.showErrorMessage();
      reject(error);
    }
  });
} 

  function getTransmitConnectionSettings() {
     var serverUrl = "https://mfa-uat.sunlifecorp.com";
     // var serverUrl = "https://mfa-dev.sunlifecorp.com";
      var appId = "mfa_signin";
      var realm = ""; 
      var settings = com.ts.mobile.sdk.SDKConnectionSettings.create(serverUrl, appId);
      settings.setRealm(realm);
      return settings;
  }

  function getClientContext() {
      return {
          uiContainer: document.getElementById(elementsIds.transmitContainer)
      };
  }

  function clearTransmitContainer(clientContext) {
      $(clientContext.uiContainer).html('');
  }

  function updateSessionToken(token) {
      if (!token) {
        sessionStorage.removeItem("transmit_session_token");
        return;
      }
      sessionStorage.setItem('transmit_session_token', token);
  }

  function getSessionToken() {
      return sessionStorage.getItem('transmit_session_token');
  }

  function showSpinner(){
    $("#loadingMessageDiv").show();
  }

  function hideSpinner(){
    $("#loadingMessageDiv").hide();
    waitLoader.keepWaitLoader = false;
  }

  function CloseModalPopup(){
    $("#mfa_signin_modal").on('hidden.bs.modal', function (e) {
      onLogout();
      console.log("Modal closed...");
    });
  }

function onPageReady() {
    initJourneyPlayer(); 
}

function setAppContentApperance(isVisible){
    if (isVisible) {
      $("#mfa_signin_modal").modal("show");
        
    } else {
        $("#mfa_signin_modal").modal("hide");
    }
}

$(document).ready(function() {
    onPageReady();
});