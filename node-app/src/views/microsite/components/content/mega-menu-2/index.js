$(document).ready(function () {
    var pathName = window.location.pathname;
    $('ul.main-nav a.dropdown-toggle').removeClass('nav-active');
    $('ul.main-nav a.dropdown-toggle').each(function () {
        var strLink = $(this).attr('href');
        if(strLink.indexOf('http') > -1) {
            strLink = strLink.substr(strLink.indexOf('/',8));
        }
        if(pathName.indexOf('.html') > -1) {
            strLink = strLink.substr(1, (strLink.lastIndexOf('.html') - 1));
        } else {
            strLink = strLink.substr(1, (strLink.lastIndexOf('/') - 1));
        }
        if (strLink!="" && pathName.indexOf(strLink) > -1) {
            $(this).addClass("nav-active");
        }
    });     
});