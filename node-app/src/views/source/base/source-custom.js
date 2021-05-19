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

});



//THIS FUNCTION IS COPIED FROM THE CORE FULL-HEADER COMPONENT. 
//function to keep sticky header at the top of the page when scrolling and site level notif is present
function mobileHeader() {
    var $win = $(window);
    //when page is reloaded in the middle
    var height = 0;
    console.log('mobile header SOURCE')

    //If site-level-notification exits and mobile header, then stick the site-level-notification to the top and have the mobile header stick following it.
    if ($('.site-level-notification').length > 0 ) {

        console.log('inside length');
        console.log($('.site-level-notification'));

        $('.site-level-notification').css({ 'position': 'fixed' });
        $('.site-level-notification').css({ 'z-index': '2' });
        /*$('.site-level-notification').css({ 'top': '0' });*/
        var notificationHeight = 0;
        var notificationTop = 0;
        console.log($('.notification'));
        $('.notification').each(function(index,value){
            console.log('each notification');
            console.log($('.notification'));
        $(this).css('top', notificationTop);
        notificationTop += $(this).outerHeight();
        notificationHeight += $(this).outerHeight();
            if(index>0){
            $(this).css('border-top', '4px solid #fff');
            }
        });
        height = notificationHeight;
        $('.slf-header-wrapper .slf-mobile-header-wrapper').css('top', height);

        if ($win.width() <= 1024) {
            $('.root > .aem-Grid > *:not(:first-child)').css({
                "position": "relative",
                "top": height
            });

            $('.slf-header-wrapper .slf-mobile-header-wrapper').css('top', height);
        } else if ($win.width() > 1024) {
            $('.root > .aem-Grid > *:not(:first-child)').css("top", "0");
            $('.site-level-notification').css({
                "position": "relative",
                "top": "auto",
                "border-top": "none"
            });
            $('.notification').last().css("margin-bottom", "0");
        }
    }

    //on scroll
    /*$win.scroll(function () {
        if ($('.site-level-notification').length == 0 || $('.site-level-notification').css('display') == "none") { height = 0; }
        $('.slf-header-wrapper .slf-mobile-header-wrapper').css('top', height);
    });*/
};
//End of Copied Function



// Adding AEM Event Teaser call to check for the Source Notifications. 
/*
    Currently the Targeted Div gets injected into the DOM after the page loads. So we need to call a few functions to ensure the Notification gets stickied in mobile view, cookie check, and add a click handler for the close Div. The mobileHeader, and .close-div click handler below were copied from the Full-Header Component. Need to investigate AEM to see if there is a way to have the targeted content be present from the beginning at which point we can optimize these functions and not have duplication.
*/
if (window.ContextHub && ContextHub.SegmentEngine) {
    ContextHubJQ(function() {
        ContextHub.eventing.on(ContextHub.Constants.EVENT_TEASER_LOADED, function(event, data){

            checkCookieExists();
            mobileHeader();

            //This function is copied from the FULL-HEADER CORE Component. 
            $('.site-level-notification .close-div').click(function() {
                var notification = $(this).closest(".site-level-notification");
                if ($(window).width() <= 1024) {
                    var flag = 0;
                    var marginFlag = true;
                    $('.notification').each(function(index,value){
                        if(flag == 1){
                            $(this).css('top', $(this).position().top - notification.outerHeight());
                            if(marginFlag==true){
                                $(this).css('margin-top', 0);
                                marginFlag=false;
                            }
                        }
                        if(notification[0] == value){
                            flag =1 ;
                        }
                    });
                    var headerTop = $('.slf-header-wrapper .slf-mobile-header-wrapper').position().top;
                    var notificationHeight = $(this).closest(".site-level-notification").outerHeight();
                    $('.root > .aem-Grid > *:not(:first-child)').css("top", headerTop-notificationHeight);
                    $('.slf-header-wrapper .slf-mobile-header-wrapper').css('top', headerTop-notificationHeight);
                }
                var siteNotification = $(this).closest(".site-level-notification");
                var siteNotificationDiv = $(siteNotification).find(".cmp-container");
                var siteNotificationId = siteNotificationDiv.attr('id');
                createCookie("pageNotification-"+siteNotificationId,"true",1,false);
                $(siteNotification).css('display', 'none');
                $(siteNotification).removeClass('notification');
            }); 
            //End of Copied close-div Click Handler Fn
        });
    });
} else {
    console.log('Targeted Context Hub Eventing Failed');
}
//End of Context Hub Event Listening