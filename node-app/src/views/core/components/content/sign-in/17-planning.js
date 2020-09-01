
/**
 * App starts a journey to verify phone numbers:
 * 
 * Phone input screen
 * ------------------
 * Where do you want to send the code to?
 * - phone number input
 * - radio option (text, phone) - selection will be sent to the server
 * - [send code] button
 * 
 * Verify Phone modal
 * -------------------
 * Verify your number:
 * - otp code input
 * - resend
 * - [verify] button
 * 
 * Almost done screen
 * ------------------
 * Your almost done
 * - verified phone numbers list with [remove] button
 * - [add number] button
 * - [next] button - opens the Phone Input Screen in a modal
 * 
 * You are all done screen
 * -----------------------
 * - radio options (opt1, opt2) 
 * - [done] button
 */


// Phones: ${@policy.user().custom_data.verified_phones}\\n
// How Often Selection: ${@policy.user().custom_data.how_often_selection}


/***
 * Account Settings Flow
 * ---------------------
 * 
 * 1. Start a Journey to fetch stored user data
 * 2. Show UI with verified phones and How Often Selection
 * 3. Button to verifeid phones => Starts a journey
 * 4. Button to change selection => Starts a journey
 * 5. Journey Ends => Fetch Stored Data and Show UI (1,2)
 */