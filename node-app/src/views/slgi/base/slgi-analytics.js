$(document).ready(function () {
    if ($('.full-header').parents('.recommended-products-article').length > 0 && $('#main-content').length < 1) {
        if ($('#left-navigation').parents('.col-md-3').next().hasClass('left-nav-with-content-section')) {
            $('#left-navigation').parents('.col-md-3').next().attr('id', 'main-content');
            $('#left-navigation').parents('.col-md-3').next().attr('role', 'main');
        }
        else if ($('#left-navigation-case-2').prev().hasClass('left-nav-with-content-section')) {
            $('#left-navigation-case-2').prev().attr('id', 'main-content');
            $('#left-navigation-case-2').prev().attr('role', 'main');
        }
        else if ($('#left-navigation').parents('.col-sm-4').next().hasClass('col-sm-8')) {
            $('#left-navigation').parents('.col-sm-4').next().attr('id', 'main-content');
            $('#left-navigation').parents('.col-sm-4').next().attr('role', 'main');
        }
        else if ($('.full-header').parents('.recommended-products-article').next().hasClass('breadcrumb')) {
            $('.full-header').parents('.recommended-products-article').next().next().attr('id', 'main-content');
            $('.full-header').parents('.recommended-products-article').next().next().attr('role', 'main');
        } else {
            $('.full-header').parents('.recommended-products-article').next().attr('id', 'main-content');
            $('.full-header').parents('.recommended-products-article').next().attr('role', 'main');
        }
        if ($('.link-list').hasClass('editorial-nav-desktop-wrapper')) {
            $('.link-list.editorial-nav-desktop-wrapper').attr('aria-label', 'Filter');
            $('.link-list.editorial-nav-desktop-wrapper').attr('role', 'navigation');
        }
    }
});