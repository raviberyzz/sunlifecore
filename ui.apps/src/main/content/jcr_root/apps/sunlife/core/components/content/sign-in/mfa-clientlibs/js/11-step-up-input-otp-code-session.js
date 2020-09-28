function StepUpOTPSession(title, username, possibleTargets, autoExecedTarget) {
    var _this = this;
  
    this.clientContext = null;
    this.submitHandler = null;
  
    this.startSession = function (description, mode, actionContext, clientContext) {
      console.log("started new ".concat(mode, " OTP session"));
      this.clientContext = clientContext;
    };
  
    this.setGeneratedOtp = function (format, target) {
      if (format && target) {
        // if `format` and `target` are NOT null then we present the otp-submit-code html
        this.renderWaitingForInput(format, target);
        this.otpCodeWasGenerated();
      } else {
        // instead of showing a UI to allow the user to choose a phone number and a method to send the OTP
        // we do this programmatically based on the selection made in step-up-auth-select-target screen
        var selectedMethod = this.clientContext.otpSelection.selectedMethod;
  
        if (selectedMethod === "text_message") {
          selectSMSMethod.call(this);
        } else if (selectedMethod === "phone_call") {
          selectVoiceCall.call(this);
        } else {
          log.error("Unsupported OTP method selection: " + selectedMethod);
        }
      }
    };
  
    this.setAvailableTargets = function (targets) {
      _this.targets = targets || [];
    };
  
    this.promiseInput = function () {
      var _this2 = this;
  
      var self = this;
      return new Promise(function (resolve, reject) {
        var selectedTarget = self.selectedTarget;
  
        if (selectedTarget) {
          var input = com.ts.mobile.sdk.TargetBasedAuthenticatorInput.createTargetSelectionRequest(selectedTarget);
          var response = com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(input);
          resolve(response);
          self.selectedTarget = null;
          return;
        }
  
        _this2.submitHandler = function (response) {
          resolve(response);
        };
      });
    };
  
    this.endSession = function () {
      console.log('OTP session ended');
    };
  
      this.promiseRecoveryForError = function(error, validRecoveries, defaultRecovery) {
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
  
    this.renderTargetsComponent = function () {// this state is not supported in this example
    };
  
    this.otpCodeWasGenerated = function () {
      this.otpGenerationCounter++;
    };
  
      this.renderWaitingForInput = function(format, target) {
          var self = this;
          var selectedNumber = this.clientContext.otpSelection.selectedPhone;
          //const instuctionText = `To verify ${selectedNumber} we've sent you a code. Type it to continue:`
          var instuctionText = `We've sent a security code to <span class="text-bold">${selectedNumber} </span>.
                          <span class="desktop-text-block">Enter it to continue</span>`;
  
          $.get("/content/dam/sunlife/external/signin/transmit/step-up-input-otp-code.html", function(data){
              $(self.clientContext.uiContainer).html(data);
              $("#step-up-input-otp-code-screen-input-label").html(instuctionText);  
              $("#step-up-input-otp-code-screen-input_cancel-button").on("click", self.onCancelClicked);
              $("#step-up-input-otp-code-screen-input_submit-button").on("click", self.onSubmitClicked);
              $("#step-up-input-otp-code-screen-input_resend_button").on("click", self.onResendClicked);
              $("#step-up-input-otp-code-screen-input").attr("placeholder", self.generatePlaceholder(format));
          });
      }
  
      this.onCancelClicked = function(){
          if (confirm("are you sure you want to cancel the authentication?")) {
              var controlRequest = com.ts.mobile.sdk.ControlRequest.create(com.ts.mobile.sdk.ControlRequestType.AbortAuthentication);
              //console.log("controlRequest:"+controlRequest.CancelAuthenticator);
              _this.submitHandler(com.ts.mobile.sdk.InputOrControlResponse.createControlResponse(controlRequest));
  
            $.get("mfa_signin/html/step-up-auth-select-target-form.html", function (data) {
              $(self.clientContext.uiContainer).html(data);
  
              $("#step-up-send-code-button").on("click", function () {
                  handleSendCode.call(self);
              });
  
              setPhoneNumbersList.call(self);
          });
          }
      }
      
      /*$("#verify-code").on("click", function() {
          
      })
      
      $('#mfa-code').parsley().on('field:error', function() {
          $("label[for='mfa-code']").addClass("label-error");
          $("#step-up-input-otp-code-screen-input_resend_button").addClass("mar-top-10").removeClass("mar-top-30");
      });
      
      $('#mfa-code').parsley().on('field:success', function() {
          $("label[for='mfa-code']").removeClass("label-error");
          $("step-up-input-otp-code-screen-input_resend_button").addClass("mar-top-30").removeClass("mar-top-10");
      });*/
  
    this.onSubmitClicked = function () {
     // $('#mfa-form').parsley().validate();
      if ( $('#mfa-form').parsley().validate()){
      var code = $("#step-up-input-otp-code-screen-input").val();
      var input = com.ts.mobile.sdk.OtpInputOtpSubmission.createOtpSubmission(code);
      var inputTargetBased = com.ts.mobile.sdk.TargetBasedAuthenticatorInput.createAuthenticatorInput(input);
  
      _this.submitHandler(com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(inputTargetBased));
      }
    };
  
    this.onResendClicked = function () {
      var resend = com.ts.mobile.sdk.OtpInputRequestResend.createOtpResendRequest();
      var inputTargetBased = com.ts.mobile.sdk.TargetBasedAuthenticatorInput.createAuthenticatorInput(resend);
  
      _this.submitHandler(com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(inputTargetBased));
  
      let alertMarkup = '<div role="alertdialog" role="alert" aria-labelledby="newCodeSentTxt" class="slf-alert-box slf-green-bg-10 mar-top-25 mar-bottom-25">';
      alertMarkup += '<p id="newCodeSentTxt" class="no-padding">A new code has been sent</p>';
      alertMarkup += '</div>';
  
      $("#otp-resend-alert-msg").html(alertMarkup);
      $("step-up-input-otp-code-screen-input_resend_button").hide();
  
       /*setTimeout(
           function(){
              $("#step-up-input-otp-code-screen-input_resend_button").show();
              $("#otp-resend-alert-msg").empty();
          }, 
         30000
        );*/
    };
  
    this.generatePlaceholder = function (digitCount) {
      var length = digitCount.getOtpLength();
      return "x".repeat(length);
    }; // Logic to resolve the target selection programmatically
  
      // Logic to resolve the target selection programmatically
  
    function selectSMSMethod() {
      var smsTarget = this.targets.filter(function (target) {
        return target.getChannel() === com.ts.mobile.sdk.OtpChannel.Sms;
      })[0];
      if (!smsTarget) return log.error('SMS Target not found in this.targets!');
      this.selectedTarget = smsTarget;
    }
  
    function selectVoiceCall() {
      var callTarget = this.targets.filter(function (target) {
        return target.getChannel() === com.ts.mobile.sdk.OtpChannel.VoiceCall;
      })[0];
      if (!callTarget) return log.error('Voice Call Target not found in this.targets!');
      this.selectedTarget = callTarget;
    }
  }