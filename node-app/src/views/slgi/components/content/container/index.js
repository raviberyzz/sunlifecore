$(document).ready(function () {
    var cta_icon_text = $('.no-padding .orange-icon-white-background').children().find('.icon-text');
    function cta_height() {
        var ctaHeight = 0;
        if ($(window).width() > 767) {
            cta_icon_text.each(function (index) {
                $(this).css('height', 'fit-content');
                ctaHeight = ctaHeight > $(this).outerHeight() ? ctaHeight : $(this).outerHeight();
                //$(this).outerHeight(ctaHeight);
            });
            cta_icon_text.each(function (index) {
                $(this).outerHeight(ctaHeight);
            });
        } else if ($(window).width() < 768) {
            cta_icon_text.each(function (index) {
                $(this).css('height', 'fit-content');
            });
        }
    }
    cta_height();
    $(window).resize(function () {
        cta_height();
    });
})