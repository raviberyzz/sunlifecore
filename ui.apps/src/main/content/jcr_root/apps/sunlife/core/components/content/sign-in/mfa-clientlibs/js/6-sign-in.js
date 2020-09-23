function onShowSignInModal() {
    toggleSignInModalVisibility(true);
}

function onSignInClick() {

    console.log("Inside onSignInClick")
    var clientId =$(".mySlfSignIn #USER").val();
    var password =$(".mySlfSignIn #PASSWORD").val();

    if (clientId.length === 0 || password.length === 0) {
        return alert('Please type a valid client id and password to login');
    }

    

    const clientContext = getClientContext();
    const additionalParams = { user: clientId };
    const journeyName = "Consumer_SignIn_FetchPartyID";
    
    // add the password to the client context
    clientContext.password = password;

    setAppContentApperance(false);

    journeyPlayer.setUiHandler(new UIHandlerForStepUp());

    $("#mfa_signin_modal").modal("show");
    journeyPlayer.invokeAnonymousPolicy(journeyName, additionalParams, clientContext)
        .then((results) => {
            journeyEnded(clientContext);

            const token = results.getToken();
            if (token) {
                updateSessionToken(token);
               // $("#mfa_signin_modal").modal("show");
               // showHomeDiv();
               
            }
        })
        .catch((error) => {
            journeyEnded(clientContext);
            console.error(`Authenticate Error: ${error}`);           
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
    