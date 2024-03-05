$(document).ready(function () {

    /**
     * Set up throttler.
     * @function
     * @param {function} fn - The function to throttle.
     * @param {number} delay - The function will run once per given amount of milliseconds.
     */
    const throttle = (fn, delay) => {
        let time = Date.now();
        return () => {
            if ((time + delay - Date.now()) <= 0) {
                fn();
                time = Date.now();
            }
        }
    }

    /**
     * Trigger the modal to display. Display the modal only once per browser session, managed by reading a cookie.
     * @function
     */
    function triggerModal() {
        var modalId = modalTriggerOnScroll.getAttribute('id');
        if ($(window).scrollTop() + $(window).height() >= $(document).height() / 2) {
            if (getCookie(modalId) == "") {
                $("#" + modalId).modal("show");
                if (navigator.userAgent.indexOf("MSIE") > 0) {
                    createCookie(modalId, 'displayed', 1, false);
                } else {
                    createCookie(modalId, 'displayed', -1, true);
                }
            } else {
                window.removeEventListener('scroll', throttle(triggerModal, 300));
            }
        }
    }
    
    var modalTriggerOnScroll = document.querySelectorAll('[data-triggerOnScroll]')[0];
    if (modalTriggerOnScroll != undefined) {
        window.addEventListener('scroll', throttle(triggerModal, 300));
    }
});