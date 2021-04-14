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
        if (pathName.indexOf(strLink) > -1) {
            $(this).addClass("nav-active");
        }
    });
     //  US specific change
    var activeNumber = $('.us-sunlife-content-page .main-nav .nav-item').children('.nav-active').length;
    if(activeNumber>1){
      $('.us-sunlife-content-page .main-nav').children('li:first-child').find('a').removeClass('nav-active');
    }
});