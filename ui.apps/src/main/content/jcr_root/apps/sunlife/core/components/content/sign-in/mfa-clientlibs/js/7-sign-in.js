function onShowSignInModal() {
    toggleSignInModalVisibility(true);
}

function onSignInClick() {

    console.log("Inside onSignInClick")
    var clientId =$(".mySlfSignIn #USER").val();
    var password =$(".mySlfSignIn #PASSWORD").val();

    var lang = ($('html').attr('lang') === 'fr') ? 'fr' : 'en';

    if (clientId.length === 0 || password.length === 0) {
        return alert('Please type a valid client id and password to login');
    }

  var clientContext = getClientContext();
  var loginParameters= getHiddenFormValues();

  var additionalParams = {
    user: clientId,
    loginParameters : loginParameters
  };
    var journeyName = "Consumer_SignIn_FetchPartyID"; 
    
    // add the password to the client context
    clientContext.password = password;

    setAppContentApperance(false);
    

    journeyPlayer.setUiHandler(new UIHandlerForStepUp());

    $("#mfa_signin_modal").modal("show");
     journeyPlayer.cancelCurrentRunningControlFlow();
     journeyPlayer.invokeAnonymousPolicy(journeyName, additionalParams, clientContext).then(function (results) {
        
            journeyEnded(clientContext);

           var token = results.getToken();
            if (token) {
                console.log("Journey completed successfully ...")
                onLogout();
               // updateSessionToken(token);
                //journeyPlayer.logout();
            }
        })
        .catch(function(error) {
            journeyEnded(clientContext);
            onLogout();
            console.error("Authenticate Error: ".concat(error));       
        });
  
}

function journeyEnded(clientContext) {
    clearTransmitContainer(clientContext);
     setAppContentApperance(true);
    journeyPlayer.setUiHandler(new CustomUIHandler());
}

function onSignInCancelClick() {
    toggleSignInModalVisibility(false);
}

function getHiddenFormValues(){
    
    var smenc =$('input[name="SMENC"]').val();
    var smlocale =$('input[name="SMLOCALE"]').val();
    var smAgentName =$('input[name="SMAGENTNAME"]').val();
    var realMOID =$('input[name="REALMOID"]').val();
    var domain =$('input[name="DOMAIN"]').val();
    var target =$('input[name="TARGET"]').val();
    var ipKey =$('input[name="IPKey"]').val();
    var context =$('input[name="CONTEXT"]').val();
    var language =$('input[name="LANGUAGE"]').val();
    var plateform =$('input[name="PLATFORM"]').val();
    var signinsite =$('input[name="SIGNINSITE"]').val();
    var screenres =$('input[name="SCREENRES"]').val();
    var logLang =$('input[name="LOGLANG"]').val();
    var browserId =$('input[name="BROWSERID"]').val();
    var browserVer =$('input[name="BROWSERVER"]').val();
    var browserDesc =$('input[name="BROWSERDESC"]').val();
    var clientIP =$('input[name="ClientIP"]').val();
    var establishSession =$('input[name="ESTABLISHSESSION"]').val();
    var saveIdSubmission =$('input[name="SAVEIDSUBMISSION"]').val();
    var logOnUsingSaveId =$('input[name="LOGONUSINGSAVEID"]').val();
    var eSaveId =$('input[name="ESAVEID"]').val();
    var requestType =$('input[name="REQUESTTYPE"]').val();
    var saveIdIdentifier =$('input[name="SAVEIDIDENTIFIER"]').val();
    var redirectPath =$('input[name="REDIRECTPATH"]').val();
    var errorRedirPath =$('input[name="ERRORREDIRPATH"]').val();
     
    var smParameter = {

                    "language": language,
                    "context": context,
                    "signInSite": signinsite ,
                    "screenRes": screenres ,
                    "platform": plateform ,
                    "domain": domain,
                    "saveIdSubmission": saveIdSubmission,
                    "logonUsingSaveId": logOnUsingSaveId ,
                    "eSaveId": eSaveId ,
                    "saveIdIdentifier": saveIdIdentifier ,
                    "logLang": logLang ,
                    "errorRedirPath": errorRedirPath ,
                    "target": target ,
                    "browsId": browserId ,
                    "browserVer": browserVer ,
                    "browseDesc": browserDesc,
                    "clientIp": clientIP,
                    "requestType": requestType
        
    }
    return smParameter;
}
    