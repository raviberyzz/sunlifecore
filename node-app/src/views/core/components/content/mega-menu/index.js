$(document).ready(function () {
    var pathName = window.location.pathname;
    $('ul.main-nav a.dropdown-toggle').each(function () {
        var strLink = $(this).attr('href');
        strLink = strLink.substr(1, (strLink.lastIndexOf('/') - 1));
        if (pathName.indexOf(strLink) > -1) {
            $(this).addClass("nav-active");
        }
    });
});