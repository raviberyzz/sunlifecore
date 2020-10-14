var journeyPlayer = xmsdk.XmSdk(); // the Transmit SDK object
var XmUIHandler = new xmui.XmUIHandler(); // the default UI Handler
var sessionTimeout = new SessionTimeout();

var useMarcServer = true;
var elementsIds = {
  transmitContainer: "transmitContainer"
}
/*var elementsIds = {
  login: "login_with_username_container",
  home: "home_container",
  homeContent: "home_content",
  accountSettings: "account_settings",
  transmitContainer: "transmitContainer",
  userIdInput: "input_username",
  headerTitle: "header_title",
  signInContainer: "landing_page_container",
  signInModalContainer: "sign_in_modal_container",
  signInClientIdInput: "sign_in_client_id_input",
  signInPasswordInput: "sign_in_password_input"
};
*/

/*function onLogout() {
  journeyPlayer.logout().then(function (results) {
    return new Promise(function(resolve, reject) {
      updateSessionToken(null); // clears the token from the session
      self.setAppContentApperance(false);
      resolve(com.ts.mobile.sdk.JsonDataProcessingResult.create(true));
     });
  }).catch(function (error) {
    console.log("Authenticate Error: ".concat(error));
    console.log("ERROR CODE :"+error.getErrorCode());
		if(error.getErrorCode() === com.ts.mobile.sdk.AuthenticationErrorCode.AppImplementation){
				   // 	getMFADetailsForAccountSetting();
				  }else{
            self.setAppContentApperance(true);
            sessionTimeout.showErrorMessage();
            reject(error);
          }
  });
}*/

function onLogout(isVisible) {

   isVisible = isVisible || false ;
  this.setAppContentApperance(isVisible);
  return new Promise(function(resolve,reject){
   // journeyPlayer.cancelCurrentRunningControlFlow().then(function(){
     journeyPlayer.cancelCurrentRunningControlFlow();
     journeyPlayer.logout().then(function(result){
        updateSessionToken(null);
        resolve(true);
      })
      .catch(function (error) {
        console.log("Authenticate Error: ".concat(error));
        if(error.getErrorCode === 8) {
           
        }else
        reject(error);
      })
     })
    /* .catch(function (error) {
      reject(error);
    })
  })*/
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
    console.log("Transmit SDK initialized succesfuly: ".concat(results));
    
    if (!getSessionToken()) {
      setAppContentApperance(false);
    } else {
      setAppContentApperance(true);
    }
  }).catch(function (error) {
    console.error("Transmit SDK initialization error!: ".concat(error));
		if(error.getErrorCode() === com.ts.mobile.sdk.AuthenticationErrorCode.AppImplementation){
      setAppContentApperance(false);
				  }else{
            setAppContentApperance(true);
            sessionTimeout.showErrorMessage();
            reject(error);
          }
  });
} 

  function getTransmitConnectionSettings() {
      
     //var serverUrl = "https://mfa-uat.sunlifecorp.com";
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


  function showModalPopup(){
    $("#mfa_signin_modal").modal("show");
  }

  function showSpinner(){
    $("#loadingMessageDiv").show();
  }

  function hideSpinner(){
    $("#loadingMessageDiv").hide();
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

function setAppContentApperance(isVisible) {
    if (isVisible) {
        $("#loadingMessageDiv").hide();
        $("#mfa_signin_modal").modal("show");
        
    } else {
        $("#mfa_signin_modal").modal("hide");
       // $("#loadingMessageDiv").show();
    }
}

$(document).ready(function() {
    onPageReady();
});