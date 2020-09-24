function StepUpSelectTargetFormSession(formId, payload) {

    this.formId = formId;
    this.payload = payload;
    this.phoneNumbers = payload["phoneNumbers"] || [];

    this.submitBlock = null;

    /** Form Session */
        
    this.startSession = function (clientContext, actionContext) {
        console.log(`Form session started: ${this.formId}`);
        this.clientContext = clientContext;
        setupForm.call(this);
    }

    this.endSession = function () {
        console.log(`Form session ended: ${this.formId}`);
    }

    this.promiseFormInput = function () {
        const self = this;
        return new Promise(function (resolve, reject) {
            self.submitBlock = function (payload) {
                resolve(com.ts.mobile.sdk.FormInput.createFormInputSubmissionRequest(Object.assign(payload)));
                self.submitBlock = null; // assign null to prevent using the same promise more then once
            }
        });
    }

    this.onContinue = function (payload) {
        console.log('on continue called')
        console.log(payload)
    }

    this.onError = function (payload) {
        console.log('on error called')
        console.log(payload)
    }

    //** End Form Session */

    function handleSendCode() {
        const selectedPhone = $('input[name="phone_number_target"]:checked').val();
        console.log("selectedPhone:"+selectedPhone);
        const selectedMethod = $('input[name="send_code_method"]:checked').val();
        console.log("selectedMethod:"+selectedMethod);
        const selectedCommunicationId = $('input[id="'+selectedPhone+'"]').val();
        console.log("selectedCommunicationId:"+selectedCommunicationId);
        

        const otpSelection = {
            selectedPhone: selectedPhone,
            selectedMethod: selectedMethod,
            selectedCommunicationId: selectedCommunicationId
        };

        this.clientContext.otpSelection = otpSelection;
        this.submitBlock(otpSelection);
    }

    function setupForm() {
        const self = this;
        $.get("/content/dam/sunlife/external/signin/transmit/step-up-auth-select-target-form.html", function (data) {
            $(self.clientContext.uiContainer).html(data);

            $("#step-up-send-code-button").on("click", function () {
                handleSendCode.call(self);
            });

            setPhoneNumbersList.call(self);
        });
    }

    function setPhoneNumbersList() {
        const phoneNumbers = this.phoneNumbers;

        const $ul = $('<ul>', { class: "verified-phones-list" }).append(
            phoneNumbers.map((phoneNumber, index) => {
                return $("<li>").append($("<a>").html(renderPhone.call(this, phoneNumber, index)));
            })
        );

        $("#step-up-phone-list-container").html($ul);
    }

    function renderPhone(phoneNumber, index) {
        const self = this;
        const checked = (index === 0) ? "checked" : "";
        const phone = phoneNumber.countryCd+phoneNumber.areadCd+phoneNumber.commData;
        console.log(phone);
        const elem = $(`
        <div class="radio-btn-selected radio-btn-container">
        <input type="hidden" id=${phone} name="mfa_communication_target" value="${phone}">
        <input
            id="su-phone-number-item-${index}"
            class="mfa-receive-code-choice"
            name="phone_number_target"
            value="${phone}"
            type="radio"
            required
            data-parsley-min-check="1"
            data-parsley-error-message="Please select a phone number"
            data-parsley-errors-container=".radio-min-phone-err"
            data-parsley-class-handler=".radio-min-phone-err"
            ${checked}
        >
        <label for="su-phone-number-item-${index}">${phone}</label>
     </div>
        `);

        return elem;
    }

    //this.constructor = VerifiedPhoneListFormSession;
    this.constructor=StepUpSelectTargetFormSession;
}
