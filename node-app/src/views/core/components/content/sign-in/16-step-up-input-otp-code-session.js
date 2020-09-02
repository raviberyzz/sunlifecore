
function StepUpOTPSession(title, username, possibleTargets, autoExecedTarget) {
    
    this.clientContext = null;
    this.submitHandler = null;

    this.startSession = function(description, mode, actionContext, clientContext) {
        console.log(`started new ${mode} OTP session`);
        this.clientContext = clientContext;
    }

    this.setGeneratedOtp = function(format, target) {
        if (format && target) {
            // if `format` and `target` are NOT null then we present the otp-submit-code html
            this.renderWaitingForInput(format, target);
            this.otpCodeWasGenerated();
        }
        else {
            // instead of showing a UI to allow the user to choose a phone number and a method to send the OTP
            // we do this programmatically based on the selection made in step-up-auth-select-target screen

            const selectedMethod = this.clientContext.otpSelection.selectedMethod;
            
            if (selectedMethod === "text_message") {
                selectSMSMethod.call(this);
            } else if (selectedMethod === "phone_call") {
                selectVoiceCall.call(this);
            } else {
                log.error("Unsupported OTP method selection: " + selectedMethod);
            }
        }
    }

    this.setAvailableTargets = (targets) => {
        this.targets = targets || [];
    };

    this.promiseInput = function() {
        const self = this;
        return new Promise((resolve, reject) => {
            const selectedTarget = self.selectedTarget;
            if (selectedTarget) {
                const input = com.ts.mobile.sdk.TargetBasedAuthenticatorInput.createTargetSelectionRequest(selectedTarget);
                const response = com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(input);
                resolve(response);
                self.selectedTarget = null;
                return;
            }

            this.submitHandler = (response) => {
                resolve(response);
            }
        });
    }

    this.endSession = function() {
        console.log('OTP session ended');
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

    this.renderTargetsComponent = function() {
        // this state is not supported in this example
    }

    this.otpCodeWasGenerated = function() {
        this.otpGenerationCounter++;
    }

    this.renderWaitingForInput = function(format, target) {
        const self = this;
        const selectedNumber = this.clientContext.otpSelection.selectedPhone;
        const instuctionText = `To verify ${selectedNumber} we've sent you a code. Type it to continue:`

        $.get("../transmit/step-up-input-otp-code-screen/step-up-input-otp-code.html", function(data){
            $(self.clientContext.uiContainer).html(data);
            $("#step-up-input-otp-code-screen-input-label").text(instuctionText);  
            $("#step-up-input-otp-code-screen-input_cancel-button").on("click", self.onCancelClicked);
            $("#step-up-input-otp-code-screen-input_submit-button").on("click", self.onSubmitClicked);
            $("#step-up-input-otp-code-screen-input_resend_button").on("click", self.onResendClicked);
            $("#step-up-input-otp-code-screen-input").attr("placeholder", self.generatePlaceholder(format));
        });
    }

    this.onCancelClicked = () => {
        if (confirm("are you sure you want to cancel the authentication?")) {
            const controlRequest = com.ts.mobile.sdk.ControlRequest.create(com.ts.mobile.sdk.ControlRequestType.CancelAuthenticator);
            this.submitHandler(com.ts.mobile.sdk.InputOrControlResponse.createControlResponse(controlRequest));
        }
    }

    this.onSubmitClicked = () => {
        const code = $("#step-up-input-otp-code-screen-input").val();
        const input = com.ts.mobile.sdk.OtpInputOtpSubmission.createOtpSubmission(code);
        const inputTargetBased = com.ts.mobile.sdk.TargetBasedAuthenticatorInput.createAuthenticatorInput(input);
        this.submitHandler(com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(inputTargetBased));
    }

    this.onResendClicked = () => {
        let resend = com.ts.mobile.sdk.OtpInputRequestResend.createOtpResendRequest();
        let inputTargetBased = com.ts.mobile.sdk.TargetBasedAuthenticatorInput.createAuthenticatorInput(resend);
        this.submitHandler(com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(inputTargetBased));
    }

    this.generatePlaceholder = function(digitCount) {
        const length = digitCount.getOtpLength();
        return "x".repeat(length);
    }

    // Logic to resolve the target selection programmatically

    function selectSMSMethod() {
        const smsTarget = this.targets.filter(target => target.getChannel() === com.ts.mobile.sdk.OtpChannel.Sms)[0];
        if (!smsTarget) return log.error('SMS Target not found in this.targets!');
        this.selectedTarget = smsTarget;
    }

    function selectVoiceCall() {
        const callTarget = this.targets.filter(target => target.getChannel() === com.ts.mobile.sdk.OtpChannel.VoiceCall)[0];
        if (!callTarget) return log.error('Voice Call Target not found in this.targets!');
        this.selectedTarget = callTarget;
    }
}