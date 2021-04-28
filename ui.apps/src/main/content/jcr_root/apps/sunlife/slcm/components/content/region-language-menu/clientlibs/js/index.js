$(document).ready(function () {
    var pathArray = window.location.pathname.split('/');
    for (i = 0; i < pathArray.length; i++) {
        if ( pathArray[i] === 'asc') {
            var navHeadingPath = $('.desktop-header-wrapper .desktop-region-language-menu-wrapper .content-region .nav-heading');
            if(navHeadingPath.length > 0) {
                for (j = 0; j < navHeadingPath.length; j++) {
                   if(navHeadingPath[j].outerText === 'India') {
                    $('.desktop-header-wrapper .desktop-region-language-menu-wrapper .content-region .nav-heading').next().children().removeClass('nav-select');
                    $('.desktop-header-wrapper .desktop-region-language-menu-wrapper .content-region .nav-heading').next().children('li:last-child').addClass('nav-select');
                   }
                }
            }
            if ($('.mobile-header .mobile-region-language-menu-wrapper .nav-select').parent().parent().siblings('.accordion-heading')[0].innerText === 'India') {
                $('.mobile-header  .mobile-region-language-menu-wrapper .nav-select').parent().children('li:last-child').addClass('nav-select');
                $('.mobile-header  .mobile-region-language-menu-wrapper .nav-select').parent().children('li:first-child').removeClass('nav-select');
            }
        }
    }
});
