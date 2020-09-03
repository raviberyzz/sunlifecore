$(document).ready(function () {
    /* code to hide the social share icons on secure pages */
    if ($('.breadcrumb')) {
        var searchUrl = window.location.pathname;
        if (searchUrl.indexOf('/inv/') > -1 || searchUrl.indexOf('/adv/') > -1) {
            $('.breadcrumb .right-area').css('display', 'none');
        }
    }
})