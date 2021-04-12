function PasswordAuthWithPassword(title, username) {
    
  this.submitHandler = null;
  this.showDebugInfo = false;

  this.startSession = function (description, mode, actionContext, clientContext) {
    if(this.showDebugInfo){
      console.log("started new ".concat(mode, " password session"));
    }
    this.clientContext = clientContext;
  };

  this.endSession = function () {
    if(this.showDebugInfo){
      console.log('password session ended');
    }
  };

  this.promiseInput = function () {
    var password = this.clientContext.password;
    return new Promise(function (resolve, reject) {
      var inputResponse = com.ts.mobile.sdk.PasswordInput.create(password);
      var response = com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(inputResponse);
      resolve(response);
    });
  };

  this.promiseRecoveryForError = function (error, validRecoveries, defaultRecovery) {
    return new Promise(function (resolve, reject) {
      console.error("promiseRecoveryForError was called with error: ", error);

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
}