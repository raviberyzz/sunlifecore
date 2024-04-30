/* start placeholder content
   end placeholder content
 */

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
        case 'step-up-auth-select-target':
            return new StepUpSelectTargetFormSession(formId, payload);
        case "dummyForm":
            return new dummyForm(formId, payload);        
        default:
            return null;
    }
}

UIHandlerForStepUp.prototype.createOtpAuthSession = function(title, username, possibleTargets, autoExecedTarget) {
    return new StepUpOTPSession(title, username, possibleTargets, autoExecedTarget);
}

UIHandlerForStepUp.prototype.processJsonData = function(jsonData, actionContext, clientContext) {
    return new Promise(function(resolve, reject) {
    
        resolve(com.ts.mobile.sdk.JsonDataProcessingResult.create(true));
        if (jsonData.SMSESSION) {
            $("#smHiddenForm").attr("action",jsonData.target);
            $("#smValue").val(jsonData.SMSESSION);
            $("#smHiddenForm").submit();

        }
        else if(jsonData.target != undefined && jsonData.target != ""){
            if(jsonData.errorRedirect){
                // redirect later when error is caught
                clientContext['target_url'] = jsonData.target;
            }
            else{
                window.location.href = jsonData.target;
            }
        }
    });
}

UIHandlerForStepUp.prototype.handlePolicyRejection = function(title, text, buttonText, failureData, actionContext, clientContext) {
    return new Promise(function(resolve, reject) {
    const failType = (failureData && failureData.reason && failureData.reason.type) ? failureData.reason.type : null;
    const authMethod = (failureData && failureData.source && failureData.source.method) ? failureData.source.method : null;
        if (failType && failType === "locked") {
            otpEntryAttemptFlag = 0; // set it so we don't try to display this message again in sign-in
            if (authMethod && authMethod === "otp") {
                displaylockedOutMessage();
            } else {
                displayComeBackLaterMessage();
            }
        }
        resolve(com.ts.mobile.sdk.ConfirmationInput.create(-1));
    });
}

CustomUIHandler.prototype.startActivityIndicator = function(actionContext, clientContext) { }
  
CustomUIHandler.prototype.endActivityIndicator = function(actionContext, clientContext) { }

UIHandlerForStepUp.prototype.startActivityIndicator = function(actionContext, clientContext) {
    if(!waitLoader.noWaitLoader){
        showSpinner();
    }
}
  
UIHandlerForStepUp.prototype.endActivityIndicator = function(actionContext, clientContext) {
    if(!waitLoader.keepWaitLoader){
        hideSpinner();
    }
}