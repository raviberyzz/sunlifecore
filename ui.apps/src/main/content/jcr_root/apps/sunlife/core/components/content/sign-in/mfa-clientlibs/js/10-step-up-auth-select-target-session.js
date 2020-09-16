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
        const selectedMethod = $('input[name="send_code_method"]:checked').val();
        const selectedCommunicationId = $('input[name="mfa_communication_target"]').val();
        

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
        $.get("transmit/signin/step-up-auth-select-target-form.html", function (data) {
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

        const elem = $(`<div>
            <input type="radio" id="su-phone-number-item-${index}" name="phone_number_target" value="${phoneNumber.commData}" ${checked}>
            <input type="hidden" id=${phoneNumber.mfaCommunId} name="mfa_communication_target" value="${phoneNumber.mfaCommunId}">
            <label for="su-phone-number-item-${index}">${phoneNumber.commData}</label><br>
        </div>`);

        return elem;
    }

    this.constructor = VerifiedPhoneListFormSession;
}
