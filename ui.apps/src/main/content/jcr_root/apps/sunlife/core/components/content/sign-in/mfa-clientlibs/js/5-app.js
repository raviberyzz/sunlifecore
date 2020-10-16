var journeyPlayer = xmsdk.XmSdk(); // the Transmit SDK object
var XmUIHandler = new xmui.XmUIHandler(); // the default UI Handler
var sessionTimeout = new SessionTimeout();
var waitLoaderStay = false;
var useMarcServer = true;
var elementsIds = {
  transmitContainer: "transmitContainer"
}

function onLogout(isVisible) {

  isVisible = isVisible || false ;
  this.setAppContentApperance(isVisible);
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
	} else {
    console.log("set English Locale.");
		journeyPlayer.setLocale("en-CA");
	}

  journeyPlayer.initialize().then(function (results) {
    console.log("Transmit SDK initialized successfully: ".concat(results));
    
    if (!getSessionToken()) {
      setAppContentApperance(false);
    } else {
      setAppContentApperance(true);
    }
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
     //var serverUrl = "https://mfa-dev.sunlifecorp.com";
     // var serverUrl = "https://mfa-uat.sunlifecorp.com";
      //var serverUrl =  "https://sit-www.sunnet.sunlife.com/mfaservices";

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


  function showModalPopup(){
    $("#mfa_signin_modal").modal("show");
  }

  function showSpinner(){
    $("#loadingMessageDiv").show();
  }

  function hideSpinner(){
    $("#loadingMessageDiv").hide();
    waitLoaderStay = false;
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
      showModalPopup();
        
    } else {
        $("#mfa_signin_modal").modal("hide");
       // $("#loadingMessageDiv").show();
    }
}

$(document).ready(function() {
    onPageReady();
});