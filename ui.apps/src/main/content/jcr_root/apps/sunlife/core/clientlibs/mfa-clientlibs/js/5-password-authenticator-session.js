
function PasswordAuthenticatorSession(title, username) {
    
  this.submitHandler = null;
  this.showDebugInfo = false;

  this.endSession = function () {
    if(this.showDebugInfo){
      console.log('password session ended');
    }
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

  this.promiseCancelAction = function (validOptions, session, clientContext) {
    var controlRequest = com.ts.mobile.sdk.ControlRequest.create(com.ts.mobile.sdk.ControlRequestType.CancelAuthenticator);
    var response = com.ts.mobile.sdk.InputOrControlResponse.createControlResponse(controlRequest);
    return Promise.resolve(response);
  };
}