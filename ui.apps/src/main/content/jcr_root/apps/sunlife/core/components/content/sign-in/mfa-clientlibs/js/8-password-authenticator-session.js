
function PasswordAuthenticatorSession(title, username) {
    
  this.submitHandler = null;

/*this.startSession = function (description, mode, actionContext, clientContext) {
  console.log("started new ".concat(mode, " password session"));
  var self = this;
  this.actionContext = actionContext;
  /** Fetch the localized strings using the actionContext object */

 /* var uiContext = this.actionContext.getUiContext();
  var submitButtonTitle = uiContext.getString("sl_auth__password_submit");
  var cancelButtonTitle = uiContext.getString("sl_auth__password_cancel");
  /*********************************************************************** */

  /*$.get("transmit/signin/password-authenticator.html", function (data) {
    $(clientContext.uiContainer).html(data);
    $("#custom-password-authenticator_title").text(title);
    $("#custom-password-authenticator_text").text("Hello ".concat(username, ", please type your password to continue"));
    /** Set the localized strings on the buttons */

   /* $("#custom-password-authenticator_continue-button").text(submitButtonTitle);
    $("#custom-password-authenticator_cancel-button").text(cancelButtonTitle);
    /*********************************************************************** */

   /* $("#custom-password-authenticator_continue-button").on("click", function () {
      var password = $("#input_password").val();

      if (password.length === 0) {
        return alert('Please type a valid password');
      }

      var inputResponse = com.ts.mobile.sdk.PasswordInput.create(password);
      var response = com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(inputResponse);
      self.submitHandler(response);
    });
    $("#custom-password-authenticator_cancel-button").on("click", function () {
      var escapeOptions = self.actionContext.getEscapeOptions();
      var cancelOption = escapeOptions.filter(function (option) {
        return option.getId() === "cancel";
      })[0];
      if (!cancelOption) return console.error("unable to find a \"Cancel\" option in actionContext.escapeOptions");
      self.submitHandler(com.ts.mobile.sdk.InputOrControlResponse.createEscapeResponse(cancelOption));
    });
  });
};*/

this.endSession = function () {
  console.log('password session ended');
};

this.promiseInput = function () {
  var _this = this;

  return new Promise(function (resolve, reject) {
    _this.submitHandler = function (response) {
      resolve(response);
    };
  });
};

this.promiseRecoveryForError = function (error, validRecoveries, defaultRecovery) {
  return new Promise(function (resolve, reject) {
    console.log("promiseRecoveryForError was called with error: ".concat(error));

    if (defaultRecovery === com.ts.mobile.sdk.AuthenticationErrorRecovery.RetryAuthenticator) {
      if (confirm(error.getMessage() + ", would you like to try again ?")) {
        resolve(defaultRecovery);
      } else {
        resolve(com.ts.mobile.sdk.AuthenticationErrorRecovery.Fail);
      }
    } else {
      resolve(defaultRecovery);
    }
  });
};

this.promiseCancelAction = function (validOptions, session, clientContext) {
  var controlRequest = com.ts.mobile.sdk.ControlRequest.create(com.ts.mobile.sdk.ControlRequestType.CancelAuthenticator);
  var response = com.ts.mobile.sdk.InputOrControlResponse.createControlResponse(controlRequest);
  return Promise.resolve(response);
};
}