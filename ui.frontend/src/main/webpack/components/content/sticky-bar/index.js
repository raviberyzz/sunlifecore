$(document).ready(function () {
    $("#stickyBarLinks li a").click(function () {
        $("#stickyBarLinks li a").removeClass("active");
        $(this).addClass("active");
    });

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
        var headerTop = $('.slf-header-wrapper .slf-mobile-header-wrapper').position().top;
        var notificationHeight = $(this).closest(".site-level-notification").outerHeight();
        $('.sticky-bar').css('top', headerTop - notificationHeight + $('.slf-mobile-header-wrapper').outerHeight());
    });

    if ($(window).width() <= 1024) {
        if ($(".sticky-bar-wrapper").hasClass("hide-bar")) {
            $(".sticky-bar-wrapper").removeClass("hide-bar")
        }
        height = notificationHeight() + $('.slf-mobile-header-wrapper').outerHeight();
        $('.sticky-bar').css('top', height);
    }

    $(window).resize(function () {
        var height = notificationHeight() + $('.slf-mobile-header-wrapper').outerHeight();
        $('.sticky-bar').css('top', height);
    });

    function desktopHeaderHeight() {
        var height = notificationHeight() + $('.full-header').outerHeight();
        return height;
    }



    $(window).scroll(function (e) {
        var $el = $('.sticky-bar-wrapper');
        if ($(window).width() > 1024 && $(".sticky-bar-wrapper").hasClass("hide-bar")) {

            var isPositionFixed = ($el.css('position') == 'sticky');
            if ($(this).scrollTop() > desktopHeaderHeight() && !isPositionFixed) {
                $el.css({ 'position': 'sticky', 'top': '0px', 'display': 'flex' });
                // $('.sticky-bar-wrapper').removeClass('hide-bar')
            }
            if ($(this).scrollTop() < desktopHeaderHeight() && isPositionFixed) {
                $el.css({ 'position': 'static', 'top': '0px', 'display': 'none' });
                // $('.sticky-bar-wrapper').addClass('hide-bar')
            }
        }
        else {
            $el.css({ 'position': 'sticky', 'top': '0px', 'display': 'flex' });
        }
    });
});