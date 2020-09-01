
function OTPSession(title, username, possibleTargets, autoExecedTarget) {
    
    this.clientContext = null;
    this.submitHandler = null;

    this.otpGenerationCounter = 0;
    const kMaxOtpGenerations = 2;

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
            console.log(`OTPSession setGeneratedOtp called with format and/or target == null.This state is not supported in this example `);
        }
    }

    this.setAvailableTargets = (targets) => {
        this.targets = targets || [];
    };

    this.promiseInput = function() {
        return new Promise((resolve, reject) => {
            this.submitHandler = (response) => {
                resolve(response);
            }
        });
    }

    this.endSession = function() {
        console.log('OTP session ended');
        setAsScreen.call(this);
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

        $.get("../transmit/input-otp-code-screen/input-otp-code-screen.html", function(data){
            $(self.clientContext.uiContainer).html(data);            
            $("#input-otp-code-screen_cancel-button").on("click", self.onCancelClicked);
            $("#input-otp-code-screen_submit-button").on("click", self.onSubmitClicked);
            $("#input-otp-code-screen_resend_button").on("click", self.onResendClicked);
            $("#input-otp-code-screen_code-input").attr("placeholder", self.generatePlaceholder(format));

            if (self.otpGenerationCounter >= kMaxOtpGenerations) {
                $("#input-otp-code-screen_resend_button").prop('disabled', true);
                $("#input-otp-code-screen_max-generations-reached").show();
            } else {
                $("#input-otp-code-screen_resend_button").prop('disabled', false);
                $("#input-otp-code-screen_max-generations-reached").hide();
            }

            if (self.clientContext.newOTPCodeRequested) {
                $("#input-otp-code-screen_new_code_generated").show();
            } else {
                $("#input-otp-code-screen_new_code_generated").hide();
            }

            setAsModal.call(self);
        });
    }

    this.onCancelClicked = () => {
        if (confirm("are you sure you want to cancel the authentication?")) {
            const controlRequest = com.ts.mobile.sdk.ControlRequest.create(com.ts.mobile.sdk.ControlRequestType.CancelAuthenticator);
            this.submitHandler(com.ts.mobile.sdk.InputOrControlResponse.createControlResponse(controlRequest));
        }
    }

    this.onSubmitClicked = () => {
        const code = $("#input-otp-code-screen_code-input").val();
        const input = com.ts.mobile.sdk.OtpInputOtpSubmission.createOtpSubmission(code);
        const inputTargetBased = com.ts.mobile.sdk.TargetBasedAuthenticatorInput.createAuthenticatorInput(input);
        this.submitHandler(com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(inputTargetBased));
    }

    this.onResendClicked = () => {
        
        this.clientContext.newOTPCodeRequested = true; // Create this variable and set it to true

        let resend = com.ts.mobile.sdk.OtpInputRequestResend.createOtpResendRequest();
        let inputTargetBased = com.ts.mobile.sdk.TargetBasedAuthenticatorInput.createAuthenticatorInput(resend);
        this.submitHandler(com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(inputTargetBased));
    }

    this.generatePlaceholder = function(digitCount) {
        const length = digitCount.getOtpLength();
        return "x".repeat(length);
    }

    function setAsModal() {
        const container = this.clientContext.uiContainer;
        $(container).addClass("modal-style");
        $("#input-otp-code-screen").addClass("modal-content");
        $("#input-otp-code-screen-content").removeClass("bordered");
    }

    function setAsScreen() {
        const container = this.clientContext.uiContainer;
        $(container).removeClass("modal-style");
        $("#input-otp-code-screen").removeClass("modal-content");
        $("#input-otp-code-screen-content").addClass("bordered");
    }
}