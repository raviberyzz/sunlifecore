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
  var additionalParams = {
    user: clientId
  };
    var journeyName = "Consumer_SignIn_FetchPartyID"; 
    
    // add the password to the client context
    clientContext.password = password;

    setAppContentApperance(false);

    journeyPlayer.setUiHandler(new UIHandlerForStepUp());

    $("#mfa_signin_modal").modal("show");
     journeyPlayer.invokeAnonymousPolicy(journeyName, additionalParams, clientContext).then(function (results) {
        
            journeyEnded(clientContext);

           var token = results.getToken();
            if (token) {
                updateSessionToken(token);
               // $("#mfa_signin_modal").modal("show");
               // showHomeDiv();
               
            }
        })
        .catch(function(error) {
            journeyEnded(clientContext);
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
    