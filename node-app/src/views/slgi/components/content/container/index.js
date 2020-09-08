$(document).ready(function () {
    var cta_icon_text = $('.no-padding .orange-icon-white-background').children().find('.icon-text');
    function cta_height() {
        var ctaHeight = 0;
        cta_icon_text.each(function (index) {
            $(this).css('height', 'fit-content');
            ctaHeight = ctaHeight > $(this).outerHeight() ? ctaHeight : $(this).outerHeight();
            //$(this).outerHeight(ctaHeight);
        });
        cta_icon_text.each(function (index) {
            $(this).outerHeight(ctaHeight);
        });
    }
    cta_height();
    $(window).resize(function () {
        cta_height();
    });
})