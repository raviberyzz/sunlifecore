/**
* Display a 'triggerOnScroll' modal when scrolling halfway down the page.
* Display the modal only once per browser session, managed by reading a cookie.
*/
$(document).ready(function () {
    $(window).scroll(function () {
        let modalTriggerOnScroll = document.querySelectorAll('[data-triggerOnScroll]')[0];
        if (modalTriggerOnScroll != undefined)
        var modalId = modalTriggerOnScroll.getAttribute('id');
        if ($(window).scrollTop() + $(window).height() >= $(document).height() / 2) {
            if (getCookie(modalId) == "") {
                $("#" + modalId).modal("show");
                if (navigator.userAgent.indexOf("MSIE") > 0) {
                    createCookie(modalId, 'displayed', 1, false);
                } else {
                    createCookie(modalId, 'displayed', -1, true);
                }
            }
        }
    });
});
