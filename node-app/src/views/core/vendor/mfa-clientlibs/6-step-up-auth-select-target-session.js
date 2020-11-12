function StepUpSelectTargetFormSession(formId, payload) {

  this.formId = formId;
  this.payload = payload;
  this.phoneNumbers = payload["phoneNumbers"] || [];
  this.clientContext = null;
  this.showDebugInfo = false;

  this.submitBlock = null;

  /** Form Session */
      
  this.startSession = function (clientContext, actionContext) {
    if(this.showDebugInfo){
      console.log("Form session started: ", this.formId);
    }
    this.clientContext = clientContext;
    setupForm.call(this);
  };

  this.endSession = function () {
    $("#mfa-container").off('keypress'); // remove the keypress event handler from the mfa-container
    if(this.showDebugInfo){
      console.log("Form session ended: ", this.formId);
    }
  };

  //setting the send code method based on the radio button checked attribute
  var selected_code = $('input[name="send_code_method"]:checked').attr('id');
  $("#"+selected_code).parent().siblings().removeClass('radio-btn-selected ');		    		
  $("#"+selected_code).parent().addClass('radio-btn-selected ');


  this.promiseFormInput = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
      self.submitBlock = function (payload) {
        if ( $('#mfa-form').parsley().validate()){
          resolve(com.ts.mobile.sdk.FormInput.createFormInputSubmissionRequest(Object.assign(payload)));
          self.submitBlock = null; // assign null to prevent using the same promise more then once
        }
      };
    });
  };

  this.onContinue = function (payload) {
    if(this.showDebugInfo){
      console.log('on continue called');
      console.log(payload);
    }
  };

  this.onError = function (payload) {
    if(this.showDebugInfo){
      console.log('on error called');
      console.log(payload);
    }
  }; //** End Form Session */

  function handleSendCode() {
    var selectedPhone = $('input[name="phone_number_target"]:checked').val();
    var selectedMethod = $('input[name="send_code_method"]:checked').val();
    var selectedCommunicationId = $('input[id="'+selectedPhone+'"]').val();
    var selectedId = $('input[name="phone_number_target"]:checked').attr('id');
    var maskedPhoneNo = $('label[for="'+selectedId+'"]').text();

    const valid = $('#mfa-form').parsley().validate()
    if(valid){

      utag.link({
        ev_type: 'other',
        ev_action: 'clk',
        ev_data_one: selectedMethod, // depending on the radio selection
        ev_title: 'verify-you:send-code'
      });
      
      if(this.showDebugInfo){
        console.log(maskedPhoneNo);
        console.log("selectedPhone :"+selectedPhone+"selectedCommunicationId :"+selectedCommunicationId);
      }

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

    utag.link({
      ev_type: 'other',
      ev_action: 'clk',
      ev_title: 'verify-you-modal'
    });
    
    $.get("/content/dam/sunlife/external/signin/transmit/html/"+lang+"/step-up-auth-select-target-form.html", function (data) {
      $(self.clientContext.uiContainer).html(data);
      setAppContentApperance(true);

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

      //adding event listner for the phone number and send code radio button and changing the background accordingly
      $('input[name="phone_number_target"], input[name="send_code_method"]').on('click', function(e) {
        $("#"+e.target.id).parent().siblings().removeClass('radio-btn-selected ');		    		
        $("#"+e.target.id).parent().addClass('radio-btn-selected ');
      });

    });
  }
  this.constructor=StepUpSelectTargetFormSession;
}

function setPhoneNumbersList() {
  if(this.showDebugInfo){
    console.log("selectedPhone : "+this.clientContext.otpSelection);
  }
  const phoneNumbers = this.phoneNumbers;

  let phoneListStr = '';
  
  for(var i=0;i<phoneNumbers.length;i++){
      if(phoneNumbers.length>1){
        phoneListStr += renderPhone.call(this, phoneNumbers[i], i,"");
      }
      else{
        phoneListStr += renderPhone.call(this, phoneNumbers[i], i, "checked");  
      }
  }
  $("#step-up-phone-list-container").html(phoneListStr);

  // select the last phone number
  if(this.clientContext.selectedId !== undefined){
    $("#"+this.clientContext.selectedId).prop('checked', true);
    $("#"+this.clientContext.selectedId).parent().addClass('radio-btn-selected');
  }
  // select the last security code method
  if(this.clientContext.otpSelection !== undefined){
    $('input[name="send_code_method"][value="' + this.clientContext.otpSelection.selectedMethod + '"]').attr('checked', 'checked');
    $('input[name="send_code_method"][value="' + this.clientContext.otpSelection.selectedMethod + '"]').parent().addClass('radio-btn-selected ')
  }

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

  let phoneInfo  = '<div class="radio-btn-container">';
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
