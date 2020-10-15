function StepUpSelectTargetFormSession(formId, payload) {

  this.formId = formId;
  this.payload = payload;
  this.phoneNumbers = payload["phoneNumbers"] || [];
  this.clientContext = null;

  this.submitBlock = null;

  /** Form Session */
      
  this.startSession = function (clientContext, actionContext) {
    console.log("Form session started: ".concat(this.formId));
    this.clientContext = clientContext;
    setupForm.call(this);
  };

  this.endSession = function () {
    $("#mfa-container").off('keypress'); // remove the keypress event handler from the mfa-container 
    console.log("Form session ended: ".concat(this.formId));
  };

  this.promiseFormInput = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
      self.submitBlock = function (payload) {
        console.log("Inside submit:");
        if ( $('#mfa-form').parsley().validate()){
        resolve(com.ts.mobile.sdk.FormInput.createFormInputSubmissionRequest(Object.assign(payload)));
        self.submitBlock = null; // assign null to prevent using the same promise more then once
        }
      };
    });
  };

  this.onContinue = function (payload) {
    console.log('on continue called');
    console.log(payload);
  };

  this.onError = function (payload) {
    console.log('on error called');
    console.log(payload);
  }; //** End Form Session */

  function handleSendCode() {
    var selectedPhone = $('input[name="phone_number_target"]:checked').val();
    var selectedMethod = $('input[name="send_code_method"]:checked').val();
    var selectedCommunicationId = $('input[id="'+selectedPhone+'"]').val();
    var selectedId = $('input[name="phone_number_target"]:checked').attr('id');
    var maskedPhoneNo = $('label[for="'+selectedId+'"]').text();

    
    const valid = $('#mfa-form').parsley().validate()
    if(valid){
      console.log(maskedPhoneNo);
      console.log("selectedPhone :"+selectedPhone+"selectedCommunicationId :"+selectedCommunicationId);
      var otpSelection = {
        selectedPhone: selectedPhone,
        selectedMethod: selectedMethod,
        selectedCommunicationId: selectedCommunicationId,
        maskedPhoneNo : maskedPhoneNo
      };
      this.clientContext.otpSelection = otpSelection;
      this.clientContext.selectedId = selectedId;
      this.submitBlock(otpSelection);
    }
  }

  function setupForm() {
    const self = this;
    setAppContentApperance(true);
    console.log(" lang :"+lang);
    $.get("/content/dam/sunlife/external/signin/transmit/html/"+lang+"/step-up-auth-select-target-form.html", function (data) {
        
      $(self.clientContext.uiContainer).html(data);

      $("#mfa-container").on('keypress', function(event){
        const keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
          handleSendCode.call(self);
        }
      });

      $("#step-up-send-code-button").on("click", function () {
          handleSendCode.call(self);
      });
      setPhoneNumbersList.call(self);
    });
  }
  this.constructor=StepUpSelectTargetFormSession;
}

function setPhoneNumbersList() {

  console.log("selectedPhone : "+this.clientContext.otpSelection);
  const phoneNumbers = this.phoneNumbers;

  let phoneListStr = '';
  
  for(var i=0;i<phoneNumbers.length;i++){
      if(phoneNumbers.length>1){
      phoneListStr += renderPhone.call(this, phoneNumbers[i], i,"");
      }else{
        phoneListStr += renderPhone.call(this, phoneNumbers[i], i, "checked");  
      }
  }
  $("#step-up-phone-list-container").html(phoneListStr);

  if(this.clientContext.selectedId !== undefined){
    $("#"+this.clientContext.selectedId).prop('checked', true);
  }

  $("#su-phone-number-item-0").focus(); // focus the code intially on the first item

  $("#su-phone-number-item-0").parsley().on("field:error", function() {
    $("#step-up-phone-list-container").addClass("validation-error");
  })

  $("#su-phone-number-item-0").parsley().on("field:success", function() {
    $("#step-up-phone-list-container").removeClass("validation-error");
  });
}


function renderPhone(phoneNumber, index, checked) {
  var errorMsg = (lang === 'fr') ? 'Veuillez sélectionner un numéro de téléphone.' : 'Please select a phone number';
  const phone = phoneNumber.countryCd+phoneNumber.areadCd+phoneNumber.commData;
  const maskPhone = "+* ***-"+"***-"+phoneNumber.commData.substring(3,7);
  
  let phoneInfo  = '<div class="radio-btn-selected radio-btn-container">';
      phoneInfo += '<input type="hidden" id="'+ phone + '" name="mfa_communication_target" value="'+ phoneNumber.mfaCommunId + '">';
      phoneInfo += '<input ';
      phoneInfo += 'id="su-phone-number-item-' + index + '" ';
      phoneInfo += 'class="mfa-receive-code-choice" ';
      phoneInfo += 'name="phone_number_target" ';
      phoneInfo += 'value="'+ phone + '" ';
      phoneInfo += 'type="radio" ';
      phoneInfo += 'required ';
      phoneInfo += 'data-parsley-min-check="1" ';
      phoneInfo += 'data-parsley-error-message="'+errorMsg+'"';
      phoneInfo += 'data-parsley-errors-container=".radio-min-phone-err" '
      phoneInfo += 'data-parsley-class-handler=".radio-min-phone-err" ';
      phoneInfo +=  checked;
      phoneInfo +=  '/>';
      phoneInfo += '<label for="su-phone-number-item-' + index + '" id='+index+'>' + maskPhone + '</label>';
      phoneInfo += '</div>';
  return phoneInfo;
}
