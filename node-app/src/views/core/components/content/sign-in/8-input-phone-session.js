/**
 * Form handler Logic
 * ------------------
 
First we create variables to hold the possible responses (valid, cancel or invalid)
- Next we check if the application had submit a "cancel" action, 
- otherwise we check if the application submit a "submit" action and a "phoneNumber"
- otherwise we return with "invalid" response

-------- AUTH SCRIPT CODE ------------------------------------
let validResponse = { "status": "valid", "phoneNumber": application_input.phoneNumber } return
let cancelResponse = { "status" : "cancel" } return
let invalidResponse = { "status" : "invalid" } return
(application_input.action == "cancel") ? cancelResponse : ((application_input.action == "submit" && application_input.phoneNumber) ? validResponse : invalidResponse)
--------------------------------------------------------------

If the response is "invalid" we keep the form alive and inform the application to retry collecting data,
If the response is "valid" then we continue as usual
If the response is "cancel" we return to the "phonesListForm"

*/


function InputPhoneFormSession(formId, payload) {
    this.formId = formId;
    this.payload = payload;
    this.submitBlock = null;

    this.startSession = function (clientContext, actionContext) {
        console.log(`Form session started: ${this.formId}`);
        this.clientContext = clientContext;
        setupForm.call(this);
    }

    this.endSession = function () {
        console.log(`Form session ended: ${this.formId}`);
        setAsScreen.call(this);
    }

    this.promiseFormInput = function () {
        const self = this;
        return new Promise(function (resolve, reject) {
            self.submitBlock = function(payload) {
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

    function handleSendCode() {
        const phoneNumber = $("#input-phone-screen_phone-input").val();
        if (phoneNumber.length === 0) { return alert("Please enter a valid phone number"); }

        this.submitBlock({
            action: 'submit',
            phoneNumber: phoneNumber
        });
    }

    function handleCancel() {
        this.submitBlock({
            action: 'cancel'
        });
    }

    function setupForm() {
        const self = this;
        $.get("../transmit/input-phone-screen/input-phone-screen.html", function(data){
            $(self.clientContext.uiContainer).html(data);  

            $("#input-phone-screen_submit-button").on("click", function() {
                handleSendCode.call(self);
            });
            $("#input-phone-screen_cancel-button").on("click", function() {
                handleCancel.call(self);
            });

            const showInModal = self.payload.showInModal;
            if (showInModal && showInModal === true) {
                setAsModal.call(self);
            }
        });
    }

    function setAsModal() {
        const container = this.clientContext.uiContainer;
        $(container).addClass("modal-style");
        $("#input-phone-screen").addClass("modal-content");
        $("#input-phone-screen-content").removeClass("bordered");
    }

    function setAsScreen() {
        const container = this.clientContext.uiContainer;
        $(container).removeClass("modal-style");
        $("#input-phone-screen").removeClass("modal-content");
        $("#input-phone-screen-content").addClass("bordered");
    }

    this.constructor = InputPhoneFormSession;
}

