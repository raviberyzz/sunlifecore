$(document).ready(function () {
    var pathName = window.location.pathname;
    $('ul.main-nav > li > a').each(function() {
        var $par = $(this);
        $(this).parent().find('a').each(function() {
            var href = $(this).attr('href');
            if(href && (href.startsWith('http') || href.startsWith('//'))) {
                href = href.substr(href.indexOf('//')+2);
                href = href.substr(href.indexOf('/'));
            }
            if(pathName === href) {
                $par.addClass('nav-active');
            }
        });
    });
});