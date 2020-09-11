function onShowSignInModal() {
    toggleSignInModalVisibility(true);
}

function onSignInClick() {
    console.log('inside onSignInClick');
    // const clientId = $(`#${elementsIds.signInClientIdInput}`).val();
    // const password = $(`#${elementsIds.signInPasswordInput}`).val();
    const clientId = $('.mySlfSignIn #USER').val();
    const password = $('.mySlfSignIn #PASSWORD').val();

    if (clientId.length === 0 || password.length === 0) {
        return alert('Please type a valid client id and password to login');
    }

    // const clientContext = getClientContext();
    // const additionalParams = { user: clientId };
    // const journeyName = "fetch_partyid"; 
    
    // //add the password to the client context
    // clientContext.password = password;

    // setAppContentApperance(false);

    // journeyPlayer.setUiHandler(new UIHandlerForStepUp());

    // journeyPlayer.invokeAnonymousPolicy(journeyName, additionalParams, clientContext)
    //     .then((results) => {
    //         journeyEnded(clientContext);

    //         const token = results.getToken();
    //         if (token) {
    //             updateSessionToken(token);
    //             showHomeDiv();
    //         }
    //     })
    //     .catch((error) => {
    //         console.error(`Authenticate Error: ${error}`);
    //         journeyEnded(clientContext);
    //     });
 }

function journeyEnded(clientContext) {
    clearTransmitContainer(clientContext);
    setAppContentApperance(true);
    journeyPlayer.setUiHandler(new CustomUIHandler());
}

function onSignInCancelClick() {
    toggleSignInModalVisibility(false);
}