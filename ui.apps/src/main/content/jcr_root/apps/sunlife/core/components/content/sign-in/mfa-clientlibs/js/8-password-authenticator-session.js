
function PasswordAuthenticatorSession(title, username) {
    
    this.submitHandler = null;

    this.startSession = function(description, mode, actionContext, clientContext) {
        console.log(`started new ${mode} password session`);
        const self = this;
        this.actionContext = actionContext;

        /** Fetch the localized strings using the actionContext object */
        const uiContext = this.actionContext.getUiContext();
        const submitButtonTitle = uiContext.getString("sl_auth__password_submit");
        const cancelButtonTitle = uiContext.getString("sl_auth__password_cancel");
        /*********************************************************************** */

        $.get("/content/dam/sunlife/external/signin/transmit/password-authenticator.html", function(data){
            console.log(data);
            $(clientContext.uiContainer).html(data);                        
            $("#custom-password-authenticator_title").text(title);
            $("#custom-password-authenticator_text").text(`Hello ${username}, please type your password to continue`);
            
            /** Set the localized strings on the buttons */
            $("#custom-password-authenticator_continue-button").text(submitButtonTitle);
            $("#custom-password-authenticator_cancel-button").text(cancelButtonTitle);
            /*********************************************************************** */

            $("#custom-password-authenticator_continue-button").on("click", function() {
                const password = $("#input_password").val();
                if (password.length === 0) { return alert('Please type a valid password') }
                const inputResponse = com.ts.mobile.sdk.PasswordInput.create(password);
                const response = com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(inputResponse);
                self.submitHandler(response);
            });
            
            $("#custom-password-authenticator_cancel-button").on("click", function() {
                const escapeOptions = self.actionContext.getEscapeOptions();
                const cancelOption = escapeOptions.filter(option => option.getId() === "cancel")[0];

                if (!cancelOption) return console.error(`unable to find a "Cancel" option in actionContext.escapeOptions`);
                self.submitHandler(com.ts.mobile.sdk.InputOrControlResponse.createEscapeResponse(cancelOption));
            });
        });
    }

    this.endSession = function() {
        console.log('password session ended')
    }

    this.promiseInput = function() {
        return new Promise((resolve, reject) => {
            this.submitHandler = (response) => {
                resolve(response);
            }
        });
    }

    this.promiseRecoveryForError = function(error, validRecoveries, defaultRecovery) {
        return new Promise((resolve, reject) => {
            console.log(`promiseRecoveryForError was called with error: ${error}`);
            if(defaultRecovery === com.ts.mobile.sdk.AuthenticationErrorRecovery.RetryAuthenticator) {
                if (confirm(error.getMessage() + ", would you like to try again ?")) {
                    resolve(defaultRecovery);
                } else {
                    resolve(com.ts.mobile.sdk.AuthenticationErrorRecovery.Fail);
                }
            } else {
                resolve(defaultRecovery);
            } 
        });
    }

    this.promiseCancelAction = function(validOptions, session, clientContext) {
        const controlRequest = com.ts.mobile.sdk.ControlRequest.create(com.ts.mobile.sdk.ControlRequestType.CancelAuthenticator);
        const response = com.ts.mobile.sdk.InputOrControlResponse.createControlResponse(controlRequest);
        return Promise.resolve(response)
    }
}