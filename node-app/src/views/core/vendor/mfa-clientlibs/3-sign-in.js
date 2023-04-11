function onShowSignInModal() {
    toggleSignInModalVisibility(true);
}

function onSignInClick() {
    otpEntryAttemptFlag = 1; // reset it 
    if(Array.isArray(journeyPlayer.getUsersInfo()) && journeyPlayer.getUsersInfo().length){
        journeyPlayer.clearAllData();
    }
   
    var clientId = $("#USER").val().replace(/ /g, '');
    var password = $("#PASSWORD").val();

    // clear the wrong password message
    $("#generalError").hide();

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
    clientContext.password = password;

    $("#mfa_signin_modal").off().on('hidden.bs.modal', function (e) {
        $("#USER").val('');
        $("#PASSWORD").val('');
        $("#rememberID").prop('checked', false);
        if(clientContext.closeModalCallback){
            clientContext.closeModalCallback();
            sessionTimeout.clearSessionTimeout();
        }
        else{
            journeyEnded(clientContext);
            onLogout();
        }
    });

    // start the timer
    sessionTimeout.startTimeout();
    journeyPlayer.setUiHandler(new UIHandlerForStepUp());
    journeyPlayer.invokeAnonymousPolicy(journeyName, additionalParams, clientContext).then(function (results) {
        journeyEnded(clientContext);
        var token = results.getToken();
        if (token) {
            onLogout(waitLoader.keepModalContent);
        }
    })
    .catch(function(error) {
        hideSpinner();
        journeyEnded(clientContext);
        console.error("Authenticate Error: ", error);
        if('target_url' in clientContext){
            window.location.href = clientContext.target_url;
        }
        else{       
            if(otpEntryAttemptFlag !== 0){
                if(error.getErrorCode() === com.ts.mobile.sdk.AuthenticationErrorCode.Communication || error.getErrorCode() ===  com.ts.mobile.sdk.AuthenticationErrorCode.AppImplementation){
                    const journeyName = 'Consumer_SignIn_FetchPartyId_isUserLocked';
                    clientContext["shouldStoreJSON"] = true;
                    journeyPlayer.invokeAnonymousPolicy(journeyName, additionalParams, clientContext).then(function (results) {
                        if((String(clientContext['json_data'].locked).toLowerCase() == "true")){
                            if(otpEntryAttemptFlag === 2){
                                displaylockedOutMessage();
                            }
                            else{
                                displayComeBackLaterMessage();
                            }
                        }
                        else{
                            sessionTimeout.showErrorMessage();
                        }
                    });
                    return;
                }
                sessionTimeout.showErrorMessage();
            }
        }
    });
    
}

function displaylockedOutMessage(){
    var clientContext = getClientContext();
    $.get("/content/dam/sunlife/external/signin/transmit/html/"+lang+"/account-locked-out.html", function (data) {
        $(clientContext.uiContainer).html(data);
        setAppContentApperance(true);
    });
}

function displayComeBackLaterMessage(){
    var clientContext = getClientContext();
    $.get("/content/dam/sunlife/external/signin/transmit/html/"+lang+"/come-back-later.html", function (data) {
        $(clientContext.uiContainer).html(data);
        setAppContentApperance(true);
    });
}

function checkAccountIsLocked(){
    const clientContext = getClientContext();
    const journeyName = 'Consumer_SignIn_FetchPartyId_isUserLocked';
    var clientId = $("#USER").val();
    var loginParameters= getHiddenFormValues();
    var additionalParams = {
        user: clientId,
        loginParameters : loginParameters
    };
    clientContext["shouldStoreJSON"] = true;
    journeyPlayer.invokeAnonymousPolicy(journeyName, additionalParams, clientContext).then(function (results) {
        return clientContext['json_data'].locked;
    });
}

function journeyEnded(clientContext) {
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
    var smoidc =$('input[name="SMOIDC"]').val();
     
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
        "requestType": requestType,
        "smoidc":smoidc
    }
    return smParameter;
}
    