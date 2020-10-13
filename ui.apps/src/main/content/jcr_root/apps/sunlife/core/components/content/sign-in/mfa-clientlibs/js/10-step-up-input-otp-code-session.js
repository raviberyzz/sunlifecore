function StepUpOTPSession(title, username, possibleTargets, autoExecedTarget) {
  var _this = this;


  this.clientContext = null;
  this.submitHandler = null;
  this.alreadyLoaded = false;
  this.resendCodeMsgTimer = null;
  this.actionContext = null;
  let invalidCodeFlag = false; // for loading the error message when the jsp content is reloaded
  
  this.startSession = function (description, mode, actionContext, clientContext) {
    console.log("started new ".concat(mode, " OTP session"));
    console.log("actionContext :"+actionContext+ ":clientContext :"+clientContext);
    this.actionContext=actionContext;
    this.clientContext = clientContext;

    const uiContext = this.actionContext.getUiContext();
    window.Parsley.addValidator('valid_code', {
      validateString: function(code) {
          if(code.length === 0 || !code.trim() || invalidCodeFlag){
              $("label[for='step-up-input-otp-code-screen-input']").addClass("label-error");
              $("#step-up-input-otp-code-screen-input_resend_button").addClass("mar-top-10").removeClass("mar-top-30");
              return false;
          }
          $("label[for='step-up-input-otp-code-screen-input']").removeClass("label-error");
          $("#step-up-input-otp-code-screen-input_resend_button").addClass("mar-top-30").removeClass("mar-top-10");
          return true;
      },
      messages: {
          en: uiContext.getString('slf_verify_code_error_text')
      }
    });
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
     clearTimeout(this.resendCodeMsgTimer);
    console.log('OTP session ended');
  };

    this.promiseRecoveryForError = function(error, validRecoveries, defaultRecovery) {
    return new Promise(function (resolve, reject) {
      console.log("promiseRecoveryForError was called with error: ".concat(error));
      if(defaultRecovery === com.ts.mobile.sdk.AuthenticationErrorRecovery.RetryAuthenticator) {
          invalidCodeFlag = true;
          resolve(defaultRecovery);
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
    setAppContentApperance(true);
    var selectedNumber = this.clientContext.otpSelection.maskedPhoneNo;
    if(!this.alreadyLoaded){
      $.get("/content/dam/sunlife/external/signin/transmit/html/"+lang+"/step-up-input-otp-code.html", function(data){
        self.alreadyLoaded = true;
        $(self.clientContext.uiContainer).html(data);
        $("#step-up-input-otp-code-screen-input-label").html(selectedNumber);  
        $("#step-up-input-otp-code-screen-input_cancel-button").on("click", self.onCancelClicked);
        $("#step-up-input-otp-code-screen-input_submit-button").on("click", self.onSubmitClicked);
        $("#step-up-input-otp-code-screen-input_resend_button").on("click", self.onResendClicked);

          // force numberic values
          $('#step-up-input-otp-code-screen-input').on('input', function() {
            const code = $(this).val();
            if(!/^\d+$/.test(code)){
                invalidCodeFlag = true;
            }
            else{
                invalidCodeFlag = false;
            }
            if($.trim(code)){
                $('#mfa-form').parsley().validate();
                $(this).val(code.replace(/[^0-9]/g,''));
            }
        });
        $("#step-up-input-otp-code-screen-input").change(function(){
            const code = $(this).val();
            if($.trim(code)){
                if(invalidCodeFlag){
                    invalidCodeFlag = false;
                    $('#mfa-form').parsley().validate();
                }
            }
        });
      });
    }
    $('#mfa-form').parsley();
    if(invalidCodeFlag){
        $('#mfa-form').parsley().validate();
    }
  }


  this.onCancelClicked = function(){

      // if (confirm("are you sure you want to cancel the authentication?")) {

        console.log("actionContext :"+_this.actionContext);
        const escapeOptions = _this.actionContext.getEscapeOptions();
        const cancelOption = escapeOptions.filter(option => option.getId() === "cancel")[0];
        if (!cancelOption) return console.error('unable to find a "Cancel" option in actionContext.escapeOptions');
        _this.submitHandler(com.ts.mobile.sdk.InputOrControlResponse.createEscapeResponse(cancelOption));

      //}
  } 
    
  this.onSubmitClicked = function () {
   
    if ( $('#mfa-form').parsley().validate()){
    var code = $("#step-up-input-otp-code-screen-input").val();
    var input = com.ts.mobile.sdk.OtpInputOtpSubmission.createOtpSubmission(code);
    var inputTargetBased = com.ts.mobile.sdk.TargetBasedAuthenticatorInput.createAuthenticatorInput(input);
    _this.submitHandler(com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(inputTargetBased));

     }
  };

  this.onResendClicked = function () {

    $("#otp-resend-alert-msg").removeClass("hidden");
    $("#step-up-input-otp-code-screen-input_resend_button").hide();
    var resend = com.ts.mobile.sdk.OtpInputRequestResend.createOtpResendRequest();
    var inputTargetBased = com.ts.mobile.sdk.TargetBasedAuthenticatorInput.createAuthenticatorInput(resend);
    _this.submitHandler(com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(inputTargetBased));
     this.resendCodeMsgTimer =  setTimeout(
         function(){
            $("#step-up-input-otp-code-screen-input_resend_button").show();
            $("#otp-resend-alert-msg").addClass("hidden"); 
        }, 
        30000
      );
  };

  this.generatePlaceholder = function (digitCount) {
    var length = digitCount.getOtpLength();
     return "x".repeat(length);
  };

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

