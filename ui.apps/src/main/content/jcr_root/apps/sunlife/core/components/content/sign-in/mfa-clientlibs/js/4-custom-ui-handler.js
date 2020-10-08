function CustomUIHandler() {
    xmui.XmUIHandler.call(this);
}
CustomUIHandler.prototype = Object.create(xmui.XmUIHandler.prototype);
CustomUIHandler.prototype.constructor = CustomUIHandler;

CustomUIHandler.prototype.createFormSession = function(formId, payload) {
    switch (formId) {
        case 'input-phone-form': return new InputPhoneFormSession(formId, payload);
        case 'verified-phone-list': return new VerifiedPhoneListFormSession(formId, payload);
        case 'complete-verification': return new CompleteVerificationFormSession(formId, payload);
        case 'edit-account-phones': return new EditAccountPhonesFormSession(formId, payload);
        default: return null;
    }
}

CustomUIHandler.prototype.createOtpAuthSession = function(title, username, possibleTargets, autoExecedTarget) {
    return new OTPSession(title, username, possibleTargets, autoExecedTarget);
}


CustomUIHandler.prototype.createPasswordAuthSession = function(title, username) {
    return new PasswordAuthenticatorSession(title, username);
}


CustomUIHandler.prototype.processJsonData = function(jsonData, actionContext, clientContext) {
    return new Promise(function(resolve, reject) {
        const shouldStoreJSON = clientContext["shouldStoreJSON"];
        if (shouldStoreJSON) {
            clientContext['json_data'] = jsonData;
        }
        resolve(com.ts.mobile.sdk.JsonDataProcessingResult.create(true));
    });
}


// A custom UI Handler specific for password authenticator with no UI (password is in the clientContext)
function UIHandlerForStepUp() {
    xmui.XmUIHandler.call(this);
}
UIHandlerForStepUp.prototype = Object.create(xmui.XmUIHandler.prototype);
UIHandlerForStepUp.prototype.constructor = UIHandlerForStepUp;

UIHandlerForStepUp.prototype.createPasswordAuthSession = function(title, username) {
    return new PasswordAuthWithPassword(title, username);
}

UIHandlerForStepUp.prototype.createFormSession = function(formId, payload) {
    switch (formId) {
        case 'step-up-auth-select-target': return new StepUpSelectTargetFormSession(formId, payload);
        default: return null;
    }
}

UIHandlerForStepUp.prototype.createOtpAuthSession = function(title, username, possibleTargets, autoExecedTarget) {
    return new StepUpOTPSession(title, username, possibleTargets, autoExecedTarget);
}

UIHandlerForStepUp.prototype.processJsonData = function(jsonData, actionContext, clientContext) {
    return new Promise(function(resolve, reject) {
        if (jsonData.SMSESSION) {
            console.log(jsonData.SMSESSION);
            document.cookie="SMSESSION"+"="+jsonData.SMSESSION + ";domain=.sunnet.sunlife.com;path=/";
        }
        resolve(com.ts.mobile.sdk.JsonDataProcessingResult.create(true));
        if(jsonData.target != undefined && jsonData.target != ""){
            window.location.href = jsonData.target;
           console.log("Redirecting to PPHP...");
          }
    });
}
    

UIHandlerForStepUp.prototype.handlePolicyRejection = function(title, text, buttonText, failureData, actionContext, clientContext) {
    return new Promise(function(resolve, reject) {
    const failType = (failureData && failureData.reason && failureData.reason.type) ? failureData.reason.type : null;
    const authMethod = (failureData && failureData.source && failureData.source.method) ? failureData.source.method : null;
        if (failType && failType === "locked") {
            if (authMethod && authMethod === "otp") {
                alert("User is locked");
               
                $.get("/content/dam/sunlife/external/signin/transmit/html/"+lang+"/account-locked-out.html", function (data) {
                    $(clientContext.uiContainer).html(data);
              });
            } else {
                
               $.get("/content/dam/sunlife/external/signin/transmit/html/"+lang+"/come-back-later.html", function (data) {
                $(clientContext.uiContainer).html(data);
          });

        }
    }
    resolve(com.ts.mobile.sdk.ConfirmationInput.create(-1));
    });
}

// CustomUIHandler.prototype.startActivityIndicator = function(actionContext, clientContext) {
//     console.log('start');
// }
  
// CustomUIHandler.prototype.endActivityIndicator = function(actionContext, clientContext) {
//     console.log('end');
// }

UIHandlerForStepUp.prototype.startActivityIndicator = function(actionContext, clientContext) {
    //$("#loadingMessageDiv").show();
}
  
UIHandlerForStepUp.prototype.endActivityIndicator = function(actionContext, clientContext) {
   // $("#loadingMessageDiv").hide();
}