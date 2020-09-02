
function EditAccountPhonesFormSession(formId, payload) {

    this.formId = formId;
    this.payload = payload;
    this.verifiedPhones = payload["verified_phones"] || [];

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

    function handleAddNumber() {
        this.submitBlock({
            action: 'add'
        });
    }

    function handleCancel() {
        this.submitBlock({
            action: 'cancel'
        });
    }

    function handleSave() {
        this.submitBlock({
            action: 'save'
        });
    }

    function handleRemovePhone(index) {
        const phoneToDelete = this.verifiedPhones[index];
        if (!phoneToDelete) { return alert(`Error!, phone was not found at index: ${index}`)};
        if (confirm(`Are you sure you want to remove the phone number: ${phoneToDelete.phoneNumber}`)) {
            this.submitBlock({
                action: 'remove',
                uid: phoneToDelete.uid
            });
        }
    }

    function setupForm() {
        const self = this;
        $.get("../transmit/edit-account-phones-screen/edit-account-phones-screen.html", function (data) {
            $(self.clientContext.uiContainer).html(data);

            $("#as-verified-phone-list-screen_add-number").on("click", function () {
                handleAddNumber.call(self);
            });
            $("#as-verified-phone-list-screen_cancel-button").on("click", function () {
                handleCancel.call(self);
            });
            $("#as-verified-phone-list-screen_save-button").on("click", function () {
                handleSave.call(self);
            });

            setVerifiedPhonesList.call(self);
        });
    }

    function setVerifiedPhonesList() {
        const verifiedPhones = this.verifiedPhones;

        const $ul = $('<ul>', { class: "verified-phones-list" }).append(
            verifiedPhones.map((phone, index) => {
                return $("<li>").append($("<a>").html(renderPhone.call(this, phone.phoneNumber, phone.uid, index)));
            })
        );

        $("#as-verified-phone-list-container").html($ul);
    }

    function renderPhone(phoneNumber, uid, index) {
        const self = this;
        const removeButtonId = `phone-item-remove-${index}`;
        
        const elem = $(`<div>
            <label class="small-margin">Phone number: ${phoneNumber}</label>
            <label class="small-margin">|</label>
            <label class="small-margin" style="color: green;">uid: ${uid}</label>
            <label class="small-margin">|</label>
            <label class="small-margin" style="color: green;">Verified</label>
            <button id="${removeButtonId}">Remove</button>
        </div>`);

        elem.find(`#${removeButtonId}`).on("click", function() {
            handleRemovePhone.call(self, index);
        })

        return elem;
    }

    this.constructor = VerifiedPhoneListFormSession;
}