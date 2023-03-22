$(document).ready(function () {

    var pathName = window.location.pathname;

    if($('.related-articles .article-content a').length > 3){
    $('.related-articles .article-content a').last().addClass("article-disabled");
    }
    $('.related-articles .article-content a').each(function () {

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
           $('.related-articles .article-content a').last().removeClass("article-disabled");
           $(this).closest(".col-sm-4").addClass("article-disabled");
        }


    });
});