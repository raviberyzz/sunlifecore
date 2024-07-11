$(document).ready(function () {

    $("#stickyBarLinks li a").click(function (e) {
        if (!$(".sticky-bar-wrapper").hasClass("hide-bar")) {
            e.preventDefault();
            var target = $(this).attr('href');
            var $target = $(target)
            $('html, body').animate({
                scrollTop: $target.offset().top - $('.sticky-bar-wrapper').outerHeight()
            }, 0);
        }
    });

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
            $('.sticky-bar-wrapper').css('top', $('.slf-mobile-header-wrapper').outerHeight());
            setTimeout(function () {
                $('.root > .aem-Grid > .layout-container').css({ "position": "relative", "top": $('.sticky-bar-wrapper').outerHeight() });
                $(".root > .aem-Grid > .experiencefragment").last().css({ "position": "relative", "top": $('.sticky-bar-wrapper').outerHeight() });
            }, 200);
        }
    });

    if ($(window).width() <= 1024) {
        var mobileHeaderHeight = notificationHeight() + $('.slf-mobile-header-wrapper').outerHeight();
        var stickybarHeight = $('.sticky-bar-wrapper').outerHeight();
        $(".sticky-bar-wrapper").css({ 'position': 'fixed', 'top': mobileHeaderHeight })
        setTimeout(function () {
            $('.root > .aem-Grid > .layout-container').css({ "position": "relative", "top": notificationHeight() + stickybarHeight })
            $(".root > .aem-Grid > .experiencefragment").last().css({ "position": "relative", "top": notificationHeight() + stickybarHeight });
        }, 200);
    }

    $(window).resize(function () {
        if ($(window).width() <= 1024) {
            var mobileHeaderHeight = notificationHeight() + $('.slf-mobile-header-wrapper').outerHeight();
            var stickybarHeight = $('.sticky-bar-wrapper').outerHeight();
            $(".sticky-bar-wrapper").css({ 'position': 'fixed', 'top': mobileHeaderHeight, 'display': 'flex' })
            $('.root > .aem-Grid > .layout-container').css({ "position": "relative", "top": notificationHeight() + stickybarHeight });
            $(".root > .aem-Grid > .experiencefragment").last().css({ "position": "relative", "top": notificationHeight() + stickybarHeight });
        }
        else {
            $(".sticky-bar-wrapper").css({ 'position': 'relative', 'top': '0px', 'display': 'none' });
            $('.root > .aem-Grid > .layout-container').css({ "position": "relative", "top": '0px' });
            $(".root > .aem-Grid > .experiencefragment").last().css({ "position": "relative", "top": '0px' });
        }
    });


    $(window).scroll(function (e) {
        var desktopHeaderHeight = notificationHeight() + $('.full-header').outerHeight();
        var $el = $('.sticky-bar-wrapper');
        if ($(window).width() > 1024 && $(".sticky-bar-wrapper").hasClass("hide-bar")) {

            var isPositionFixed = ($el.css('position') == 'fixed');
            if ($(this).scrollTop() > desktopHeaderHeight && !isPositionFixed) {
                $el.css({ 'position': 'fixed', 'top': '0px', 'display': 'flex' });
            }
            if ($(this).scrollTop() < desktopHeaderHeight && isPositionFixed) {
                $el.css({ 'position': 'relative', 'top': '0px', 'display': 'none' });
            }
        }
        else if ($(window).width() > 1024 && !$(".sticky-bar-wrapper").hasClass('hide-bar')) {
            var scrollPos = $(document).scrollTop();
            $('#stickyBarLinks a').each(function () {
                var currLink = $(this);
                var refElement = $(currLink.attr("href"));
                if (refElement.offset().top - $('.sticky-bar-wrapper').outerHeight() - 5 <= scrollPos && refElement.offset().top + refElement.height() > scrollPos) {
                    $('#stickyBarLinks a').removeClass("active");
                    currLink.addClass("active");
                }
            });
        }
        if ($(window).width() <= 1024 && $('.sticky-bar-wrapper').find('.nav-links-dropdown').length != 0) {
            if (this.oldScroll > this.scrollY)
                $('.nav-links-dropdown .cmp-form-options.cmp-form-options--drop-down').css({ 'display': 'inline-table' })
            else
                $('.nav-links-dropdown .cmp-form-options.cmp-form-options--drop-down').css({ 'display': 'none' })
            this.oldScroll = this.scrollY;
        }
    });

    $(".sticky-bar #navlinks-dropdown").change(function (e) {
        e.preventDefault();
        var target = $(this).val();
        var $target = $(target)
        $('html, body').animate({
            'scrollTop': $target.offset().top - (notificationHeight() + $('.slf-mobile-header-wrapper').outerHeight() + $('.sticky-bar-wrapper').outerHeight())
        }, 0)
        $('.sticky-bar #navlinks-dropdown').val('');
    });
});