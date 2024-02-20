$(document).ready(function () {
    $('#priButton a').click(function () {
        if ($(this).attr('href').indexOf('#o2o-leadgen') != -1) {
            $('#leadgen-o2o').modal('show');
        }
    })

    function notificationHeight() {
        var notificationHeight = 0;
        var notificationTop = 0;
        $('.notification').each(function (index, value) {
            $(this).css('top', notificationTop);
            notificationTop += $(this).outerHeight();
            notificationHeight += $(this).outerHeight();
        });
        return notificationHeight;
    }

    $('.site-level-notification .close-div').click(function () {
        if ($(window).width() <= 1024) {
            var headerTop = $('.slf-header-wrapper .slf-mobile-header-wrapper').position().top;
            var notificationHeight = $(this).closest(".site-level-notification").outerHeight();
            $('.sticky-bar-wrapper').css('top', headerTop - notificationHeight + $('.slf-mobile-header-wrapper').outerHeight());
        }
    });

    if ($(window).width() <= 1024) {
        var mobileHeaderHeight = notificationHeight() + $('.slf-mobile-header-wrapper').outerHeight();
        $(".sticky-bar-wrapper").css({ 'position': 'fixed', 'top': mobileHeaderHeight })
    }

    $(window).resize(function () {
        if ($(window).width() <= 1024) {
            var mobileHeaderHeight = notificationHeight() + $('.slf-mobile-header-wrapper').outerHeight();
            $(".sticky-bar-wrapper").css({ 'position': 'fixed', 'top': mobileHeaderHeight })
        }
        else {
            $(".sticky-bar-wrapper").css({ 'position': 'sticky', 'top': '0px' })
        }
    });


    $(window).scroll(function (e) {
        var desktopHeaderHeight = notificationHeight() + $('.full-header').outerHeight();
        var $el = $('.sticky-bar-wrapper');
        if ($(window).width() > 1024 && $(".sticky-bar-wrapper").hasClass("hide-bar")) {

            var isPositionFixed = ($el.css('position') == 'sticky');
            if ($(this).scrollTop() > desktopHeaderHeight && !isPositionFixed) {
                $el.css({ 'position': 'sticky', 'top': '0px', 'display': 'flex' });
            }
            if ($(this).scrollTop() < desktopHeaderHeight && isPositionFixed) {
                $el.css({ 'position': 'static', 'top': '0px', 'display': 'none' });
            }
        }
        var scrollPos = $(document).scrollTop();
        $('#stickyBarLinks a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.offset().top - 80 <= scrollPos && refElement.offset().top + refElement.height() > scrollPos) {
                $('#stickyBarLinks a').removeClass("active");
                currLink.addClass("active");
            }
        });
    });
});