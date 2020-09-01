
function CompleteVerificationFormSession(formId, payload) {
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

    function handleDone() {
        const selected = $('input[name="complete-verification-screen_how-often"]:checked').val();
        this.submitBlock({
            howOftenSelection: selected
        });
    }

    function setupForm() {
        const self = this;
        $.get("../transmit/complete-verification-screen/complete-verification-screen.html", function(data){
            $(self.clientContext.uiContainer).html(data);  

            $("#complete-verification-screen_submit-button").on("click", function() {
                handleDone.call(self);
            });

            const currentSelection = self.payload.current_selection;
            if (currentSelection && currentSelection === "on_verification") {
                $('#radio-on-verification').attr('checked', true);
                $('#radio-on-login').attr('checked', false);
                
            } else if (currentSelection && currentSelection === "on_login") {
                $('#radio-on-verification').attr('checked', false);
                $('#radio-on-login').attr('checked', true);
            }
            
        });
    }

    this.constructor = InputPhoneFormSession;
}