/* Source custom JS starts here */
$(document).ready(function(){
 $('#find-people-button-modal').on('shown.bs.modal', function () {

     var inputs = $('#find-people-button-modal').find('select, input, textarea, button, a').filter(':visible');
     var firstInput = inputs.first();
     var lastInput = inputs.last();

     /*set focus on input box */
     $('#findPeopleInput').focus();

     /*redirect last tab to first input*/
     lastInput.on('keydown', function (e) {
         if ((e.which === 9 && !e.shiftKey)) {
             e.preventDefault();
             firstInput.focus();
         }
     });

     /*redirect first shift+tab to last input*/
     firstInput.on('keydown', function (e) {
         if ((e.which === 9 && e.shiftKey)) {
             e.preventDefault();
             lastInput.focus();
         }
     });

 })
 //Find people modal auto clears once modal is closed
 $('#find-people-button-modal').on('hidden.bs.modal', function () {
    var $findPeopleForm = $('#peopleSearchFormModal');
    $findPeopleForm[0].reset();
    $findPeopleForm.parsley().reset();
})
var targetedSiteCounter=0;
    var targetNotifCheck = setInterval(function() {
 if ($('#targeted-notification').length) {
    clearInterval(targetNotifCheck);
    checkCookieExists();
 }
        targetedSiteCounter++;
        if(targetedSiteCounter>=70){
        clearInterval(targetNotifCheck);
        }
}, 100); // check every 100ms

$(document).on('click',"#targeted-notification .close-div",function () {        
       var siteNotification = $(this).closest(".site-level-notification");
       var siteNotificationDiv = $(siteNotification).find(".cmp-container");
       var siteNotificationId = siteNotificationDiv.attr('id');
       createCookie("pageNotification-"+siteNotificationId,"true",1,false);
       $(siteNotification).css('display', 'none');
       $(siteNotification).removeClass('notification');
});
});