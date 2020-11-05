function StepUpOTPSession(title, username, possibleTargets, autoExecedTarget) {
  var _this = this;


  this.clientContext = null;
  this.submitHandler = null;
  this.alreadyLoaded = false;
  this.actionContext = null;
  this.resendCodeMsgTimer = null;
  let invalidCodeFlag = false; // for loading the error message when the jsp content is reloaded
  
   /***
     * If the OTP Authenticate step is defined to auto excecute if single target then
     * the 'autoExecedTarget' object will contain that target
     * */ 
    this.autoExecedTarget = autoExecedTarget;
    this.shouldSubmitAutoExecedTarget = false;
  
  //2
  this.startSession = function (description, mode, actionContext, clientContext) {
    console.log("started new ".concat(mode, " OTP session"));
    console.log("actionContext :"+actionContext+ ":clientContext :"+clientContext);
    this.actionContext=actionContext;
    this.clientContext = clientContext;

    window.Parsley.addValidator('valid_code', {
      validateString: function(code) {
          if(code.length === 0 || !code.trim() || invalidCodeFlag){
              $("label[for='step-up-input-otp-code-screen-input']").addClass("label-error");
              $("#step-up-input-otp-code-screen-input_resend_button").addClass("mar-top-10").removeClass("mar-top-30");
              $("#step-up-input-otp-code-screen-input").focus();
              errorMessage = (lang =='en')? "That code is incorrect. Try again.": "Ce code n’est pas valide. Réessayez.";
              return $.Deferred().reject(errorMessage);
          }
          $("label[for='step-up-input-otp-code-screen-input']").removeClass("label-error");
          $("#step-up-input-otp-code-screen-input_resend_button").addClass("mar-top-30").removeClass("mar-top-10");
          return true;
      },
      messages: {
          en: "...",
          fr: "..."
      }
    });
  };

//3
  this.setGeneratedOtp = function (format, target) {
    if (format && target) {
                console.log('setGenertedOTP is called and format and target both is not null');
      // if `format` and `target` are NOT null then we present the otp-submit-code html
      this.renderWaitingForInput(format, target);
      this.otpCodeWasGenerated();
    } else {
                console.log('setGenertedOTP is called and format and target both is null and running else part for target selection');
      // instead of showing a UI to allow the user to choose a phone number and a method to send the OTP
      // we do this programmatically based on the selection made in step-up-auth-select-target screen
     if (this.autoExecedTarget) {
        // CHANGE: 1 - for when OTP expires
        this.renderWaitingForInput(this.format, this.autoExecedTarget);
        this.otpCodeWasGenerated();
        // ---------------
      
      // this will let us know that we need to ask the session to use the autoExecedTarget when promiseInput is called
        this.shouldSubmitAutoExecedTarget = true;
        console.log('this.shouldSubmitAutoExecedTarget set to true');
    } else {
        console.error('OTPSession setGeneratedOtp called with format and/or target == null. This state is not supported in this example ');
                                }
                // var selectedMethod = this.clientContext.otpSelection.selectedMethod;

     // if (selectedMethod === "text_message") {
     //   selectSMSMethod.call(this);
     // } else if (selectedMethod === "phone_call") {
     //   selectVoiceCall.call(this);
     // } else {
     //   log.error("Unsupported OTP method selection: " + selectedMethod);
     // }
    }
  };

//1
  this.setAvailableTargets = function (targets) {
    _this.targets = targets || [];
  };

//4
  this.promiseInput = function () {
    var _this2 = this;

    var self = this;
    return new Promise(function (resolve, reject) {
      console.log('Inside promiseInput method and selected target is ${self.selectedTarget}');
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
      console.log("promiseRecoveryForError was called with error: ", error);
      console.log('defaultRecovery', defaultRecovery, com.ts.mobile.sdk.AuthenticationErrorCode.Communication)
      if(error.getErrorCode() === com.ts.mobile.sdk.AuthenticationErrorCode.Communication){
        // make sure it's a 401 error in message
        if (error.getMessage().toLowerCase().indexOf('401 unauthorized') != -1) {
          displaylockedOutMessage();
          //reject(defaultRecovery);
          hideSpinner();
          return;
        }
      }

      if(defaultRecovery === com.ts.mobile.sdk.AuthenticationErrorRecovery.RetryAuthenticator) {
          invalidCodeFlag = true;
          waitLoader.keepModalContent = false;
          // check if the user has any retries
          hideSpinner();
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
    waitLoader.noWaitLoader = false;
    var selectedNumber = this.clientContext.otpSelection.maskedPhoneNo;
    if(!this.alreadyLoaded){ 

      utag.link({
        ev_type: 'other',
        ev_action: 'clk',
        ev_title: 'verify-number-modal'
        })

      $.get("/content/dam/sunlife/external/signin/transmit/html/"+lang+"/step-up-input-otp-code.html", function(data){
        self.alreadyLoaded = true;
        $(self.clientContext.uiContainer).html(data);
        $("#step-up-input-otp-code-screen-input-label").html(selectedNumber);  
        $("#step-up-input-otp-code-screen-input_cancel-button").on("click", self.onCancelClicked);
        $("#step-up-input-otp-code-screen-input_submit-button").on("click", self.onSubmitClicked);
        $("#mfa_signin_modal").on("hidden.bs.modal", self.onCloseClicked);
        $("#step-up-input-otp-code-screen-input_resend_button").on("click", self.onResendClicked.bind(self));
        setAppContentApperance(true);

        //$("#step-up-input-otp-code-screen-input").focus(); // focus the code intially on the first item
        // force numberic values
        $('#step-up-input-otp-code-screen-input').on('keypress', function(event){
          const keycode = (event.keyCode ? event.keyCode : event.which);
          if (keycode == '13') {
              self.onSubmitClicked();
              return false; // prevent submission
          }
        });

        let prevCode = $('#step-up-input-otp-code-screen-input').val();
        $('#step-up-input-otp-code-screen-input').on('input', function() {
          if(prevCode == $(this).val()){
            return;
          }
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

  this.onCloseClicked = function(){
    const controlRequest = com.ts.mobile.sdk.ControlRequest.create(com.ts.mobile.sdk.ControlRequestType.AbortAuthentication);
    _this.submitHandler(com.ts.mobile.sdk.InputOrControlResponse.createControlResponse(controlRequest));

  }

  this.onCancelClicked = function(){

        console.log("actionContext :"+_this.actionContext);

        utag.link({
          ev_type: 'other',
          ev_action: 'clk',
          ev_title: 'verify-number:back'
          })
        
        const escapeOptions = _this.actionContext.getEscapeOptions();
        const cancelOption = escapeOptions.filter(function (option) {
            return option.getId() === "cancel";
          })[0];
        if (!cancelOption) return console.error('unable to find a "Cancel" option in actionContext.escapeOptions');
        _this.submitHandler(com.ts.mobile.sdk.InputOrControlResponse.createEscapeResponse(cancelOption));

      
  } 
    
  this.onSubmitClicked = function () {
      console.log('Code submitted!');
      waitLoader.keepWaitLoader = true;
      waitLoader.keepModalContent = true;
      var code = $("#step-up-input-otp-code-screen-input").val(); 
      var input = com.ts.mobile.sdk.OtpInputOtpSubmission.createOtpSubmission(code);
      var inputTargetBased = com.ts.mobile.sdk.TargetBasedAuthenticatorInput.createAuthenticatorInput(input);
      _this.submitHandler(com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(inputTargetBased));
      otpEntryAttemptFlag = 2;
      setTimeout(function(){
        hideSpinner();
      }, 30000);
  };

  this.onResendClicked = function () {
  //Added for OTP expiry issue
    // CHANGE: 2 - for when OTP expires
    if (this.autoExecedTarget && this.shouldSubmitAutoExecedTarget === true) {
      this.shouldSubmitAutoExecedTarget = false; // ******* IMPORTANT!
      const input = com.ts.mobile.sdk.TargetBasedAuthenticatorInput.createTargetSelectionRequest(this.autoExecedTarget);
      const response = com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(input);
      return _this.submitHandler(response);
  }
  //End for OTP Expiry issue
    waitLoader.noWaitLoader = true;
    this.resendCodeMsgTimer = setTimeout(
      function(){
        $("#step-up-input-otp-code-screen-input_resend_button").show();
        $("#otp-resend-alert-msg").addClass("hidden"); 
      }, 
      30000
    );

     utag.link({
      ev_type: 'other',
      ev_action: 'clk',
      ev_title: 'verify-number:didn\'t-receive-code'
      })
    
    $("#otp-resend-alert-msg").removeClass("hidden");
    $("#step-up-input-otp-code-screen-input_resend_button").hide();
    var resend = com.ts.mobile.sdk.OtpInputRequestResend.createOtpResendRequest();
    var inputTargetBased = com.ts.mobile.sdk.TargetBasedAuthenticatorInput.createAuthenticatorInput(resend);
    _this.submitHandler(com.ts.mobile.sdk.InputOrControlResponse.createInputResponse(inputTargetBased));
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