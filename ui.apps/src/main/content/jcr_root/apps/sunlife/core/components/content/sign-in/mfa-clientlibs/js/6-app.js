var journeyPlayer = xmsdk.XmSdk(); // the Transmit SDK object

var XmUIHandler = new xmui.XmUIHandler(); // the default UI Handler

var useMarcServer = true;
var elementsIds = {
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
/*** Account Settings code is under ./accountSettings.js */

function onRegisterPhoneNumbers() {
  var journeyId = "multiple_phone_verification";
  var additionalParams = {};
  var clientContext = getClientContext();
  invokeJourney(journeyId, additionalParams, clientContext).then(function (results) {
    console.log("Journey ended succesfully: ".concat(journeyId));
  });
}

function onProcessPhonesArray() {
    /**
     * 
     * This function submits an array of phone numbers (strings) to a Transmit journey that 
     * process it to an array of objects using a AuthScript Function:
     * --------------------------------------------------------------
     * 
     * 1. Invoke a Journey named `process_phones_array` with additionalParams containing the phonesArray to process
     * 2. Journey invoke an AuthScript Function named `processPhonesArray` providing the phonesArray as input parameter
     * 3. The AuthScript function loop the array (using @map) and returns an array of objects: 
     *          ==============================================================================
     *          @map(phonesArray, (phone) => { "phoneNumber": phone, "keyA": "valueA", "keyB": "valueB" })
     *          ==============================================================================
     * 4. The journey use Display Information step to present the results
     * 
     */
  var phonesArray = ["+1-208-972-3765", "+1-208-912-4324", "+1-208-976-5435", "+1-208-902-6566"];

  if (confirm("Click 'OK' to submit this phone numbers array to be processed in an AuthScript function:\n".concat(JSON.stringify(phonesArray)))) {
    var journeyId = "process_phones_array";
    var additionalParams = {
      phonesArray: phonesArray
    };
    var clientContext = getClientContext();
    invokeJourney(journeyId, additionalParams, clientContext).then(function (results) {
      console.log("Journey ended succesfully: ".concat(journeyId));
    });
  }
}

function onAuthenticatorConfiguration() {
  setAppContentApperance(false);
  var clientContext = getClientContext();
  journeyPlayer.startAuthenticationConfiguration(clientContext).then(function (results) {
    console.log("Finished configuration with results: ".concat(results));
    clearTransmitContainer(clientContext);
    setAppContentApperance(true);
  }).catch(function (err) {
    console.error("Error: ".concat(err.getMessage()));
    clearTransmitContainer(clientContext);
    setAppContentApperance(true);
  });
}

function onSubmitUserId() {
  var userId = $("#".concat(elementsIds.userIdInput)).val();

  if (!userId || userId.length === 0) {
    alert('Please fill in your username to authenticate');
    return;
  }

  var clientContext = getClientContext();
  var additionalParams = {};
  var journeyId = 'authenticate';
  setAppContentApperance(false);
  journeyPlayer.authenticate(userId, journeyId, additionalParams, clientContext).then(function (results) {
    var token = results.getToken();
    updateSessionToken(token);
    clearTransmitContainer(clientContext);
    setAppContentApperance(true);
    showHomeDiv();
  }).catch(function (error) {
    clearTransmitContainer(clientContext);
    setAppContentApperance(true);
    console.error("Authenticate Error: ".concat(error));
  });
}

function onLogout() {
  journeyPlayer.logout().then(function (results) {
    updateSessionToken(null); // clears the token from the session

    showSignInDiv();
  }).catch(function (error) {
    console.log("Authenticate Error: ".concat(error));
  });
}

/**
 * Transmit Code
 */

function invokeJourney(journeyId, additionalParams, clientContext) {
  var self = this;
  return new Promise(function (resolve, reject) {
    self.setAppContentApperance(false);
    journeyPlayer.invokePolicy(journeyId, additionalParams, clientContext).then(function (results) {
      clearTransmitContainer(clientContext);
      self.setAppContentApperance(true);
      resolve(results);
    }).catch(function (error) {
      console.error("error invoking journey with id: ".concat(journeyId, ", error: ").concat(error));
      clearTransmitContainer(clientContext);
      self.setAppContentApperance(true);
      reject(error);
    });
  });
}

function initJourneyPlayer() {
  var settings = getTransmitConnectionSettings();
  journeyPlayer.setConnectionSettings(settings);
  journeyPlayer.setUiHandler(new CustomUIHandler());
  var askChooseLanguage = false;

    if (askChooseLanguage) {
        if (confirm("Would you like to use Franch language?")) {

            /**
             * 
             * If you do not set a custom locale or the requested locale does not exist in the server,
             * then the API returns an error and the SDK uses the preferred language configured bythe app.
             * 
             * It is recommended to call this method before the SDK is initialized. 
             * The localeformat must be set according to ISO standard 639, "Code for the representation ofnames of languages" [ISO 639]. 
             * For example: ("en-US") [Language code - Region code]
             */
    
            journeyPlayer.setLocale("fr-FR");
        }
    }

  journeyPlayer.initialize().then(function (results) {
    console.log("Transmit SDK initialized succesfuly: ".concat(results));

    if (!getSessionToken()) {
      showSignInDiv();
    } else {
      showHomeDiv();
    }
  }).catch(function (error) {
    console.error("Transmit SDK initialization error!: ".concat(error));
  });
} // Transmit related helper methods

// Transmit related helper methods

function getTransmitConnectionSettings() {
    
   var serverUrl = "https://mfa-dev.sunlifecorp.com";
    //var serverUrl = "https://mfa-uat.sunlifecorp.com";
  var appId = "mfa_signin";
  var apiTokenId = "";
  var apiToken = "";
  var realm = ""; //let settings = com.ts.mobile.sdk.SDKConnectionSettings.create(serverUrl, appId, apiTokenId, apiToken);

    //let settings = com.ts.mobile.sdk.SDKConnectionSettings.create(serverUrl, appId, apiTokenId, apiToken);
  var settings = com.ts.mobile.sdk.SDKConnectionSettings.create(serverUrl, appId);
  settings.setRealm(realm);
  return settings;

}

function getClientContext() {
    return {
        // returning the container div that will be used to present the authentication layer UI
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

/* End Transmit Code */

function showLoginDiv() {
  $("#".concat(elementsIds.login)).show();
  $("#".concat(elementsIds.home)).hide();
}

function showSignInDiv() {
  $("#".concat(elementsIds.signInContainer)).show();
  $("#".concat(elementsIds.home)).hide();
  $("#".concat(elementsIds.login)).hide();
}

function showHomeDiv() {
  $("#".concat(elementsIds.login)).hide();
  $("#".concat(elementsIds.home)).show();
  toggleSignInModalVisibility(false);
  $("#".concat(elementsIds.homeContent)).show();
  $("#".concat(elementsIds.accountSettings)).hide();
  setHeaderTitle("Protect your account");
  var currentPage = sessionStorage.getItem('currentPage');

  if (currentPage === "edit_account_phones") {
    onAccountSettingsEditPhones();
  }
}

function showAccountSettings() {
  $("#".concat(elementsIds.login)).hide();
  $("#".concat(elementsIds.homeContent)).hide();
  $("#".concat(elementsIds.accountSettings)).show();
  setHeaderTitle("Account Settings");
}

function setHeaderTitle(title) {
  $("#".concat(elementsIds.headerTitle)).text(title);
}

function toggleSignInModalVisibility(isVisible) {
  if (isVisible) {
    $("#".concat(elementsIds.signInModalContainer)).show();
  } else {
    $("#".concat(elementsIds.signInModalContainer)).hide();
  }
}

function onPageReady() {
    // When the document loads, we initialize the transmit journey player
    toggleSignInModalVisibility(false);
    initJourneyPlayer(); 
}

function setAppContentApperance(isVisible) {
    if (isVisible) {
        $("#appContent").removeClass("hidden_container");
    } else {
        $("#appContent").addClass("hidden_container");
    }
}

$(document).ready(function() {
    onPageReady();
});