
function onAccountSettings() {
    window.sessionStorage.setItem('currentPage', 'account_settings');

    const journeyId = "fetch_stored_user_data";
    const additionalParams = { };
    const clientContext = getClientContext();

    clientContext['shouldStoreJSON'] = true;

    invokeJourney(journeyId, additionalParams, clientContext)
    .then((results) => {
        console.log(`Journey ended succesfully: ${journeyId}`);

        const jsonData = clientContext['json_data'];
        if (jsonData && jsonData['verified_phones'] && jsonData['how_often_selection']) {
            onFetchUserDataReturn(jsonData['verified_phones'], jsonData['how_often_selection']);   
        }
    });
}

function onFetchUserDataReturn(verifiedPhones, howOftenSelection) {
    setAcountSettingsVerifiedPhonesList(verifiedPhones);
    setAccountSettingsHowOftenSelection(howOftenSelection);
    showAccountSettings();
}

function setAccountSettingsHowOftenSelection(howOftenSelection) {
    const onVerificationSpan = $(`#account_settings__how_often__on_verification`);
    const onLoginSpan = $(`#account_settings__how_often__on_login`);

    if (howOftenSelection === 'on_verification') {
        onVerificationSpan.show();
        onLoginSpan.hide();
    } else {
        onVerificationSpan.hide();
        onLoginSpan.show();
    }
}

function setAcountSettingsVerifiedPhonesList(verifiedPhones) {
    const $ul = $('<ul>', { class: "verified-phones-list" }).append(
        verifiedPhones.map((phone, index) => {
            return $("<li>").append($("<a>").html(renderVerifiedPhone.call(phone.phoneNumber, phone.uid, index)));
        })
    );

    $("#account_settings_phone_list_container").html($ul);
}

function renderVerifiedPhone(phoneNumber, uid, index) {    
    const elem = $(`<div>
        <label class="small-margin">Phone number: ${phoneNumber}</label>
        <label class="small-margin">|</label>
        <label class="small-margin" style="color: green;">uid: ${uid}</label>
        <label class="small-margin">|</label>
        <label class="small-margin" style="color: green;">Verified</label>
    </div>`);

    return elem;
}

function onAccountSettingsEditPhones() {
    const journeyId = "edit_account_phones";
    const additionalParams = {};
    const clientContext = getClientContext();

    window.sessionStorage.setItem('currentPage', 'edit_account_phones');

    invokeJourney(journeyId, additionalParams, clientContext)
    .then((results) => {
        console.log(`Journey ended succesfully: ${journeyId}`);
        onAccountSettings(); // re-fetch data in case it changed
    });
}

function onAccountSettingsEditHowOften() {
    const journeyId = "edit_how_often_selection";
    const additionalParams = {};
    const clientContext = getClientContext();

    invokeJourney(journeyId, additionalParams, clientContext)
    .then((results) => {
        console.log(`Journey ended succesfully: ${journeyId}`);
        onAccountSettings(); // re-fetch data in case it changed
    });
}