$(document).ready(function () {
    //Code for Language toggle starts //
    var langIndex = 0;
	var langIndexMobile = 0;
    var linkRow = [];
    var linkCanRef = null;
    var parser = document.createElement('a');
    parser.href = window.location.href;
    var query = parser.search.substring(1);
    if(query != ""){
		query = "?" + query;
    }
    var pageCategory = utag_data.page_category;
    var pageSubcategory = utag_data.page_subcategory;
    $.each($('link'), function (index, value) {
        if (value.rel == "alternate") {
            linkRow.push(value.href + query);
        } else if (value.rel == "canonical") {
            linkCanRef = value.href;
        }
    });

    if(utag_data.page_language == "en"){
        var newsUrl = linkCanRef.split("/");
    } else if(utag_data.page_language == "fr"){
        var newsUrl = window.location.href.split("/");
    }

	var lastPart = newsUrl[newsUrl.length - 2];

	if (pageSubcategory == "newsroom" && !isNaN(lastPart) && lastPart.length > 4) {

        $('.desktop-region-language-menu-wrapper .content-language li a').each(function () {
            if (langIndex < linkRow.length) {
                var url = linkRow[langIndex].split('/');
                $(this).attr('href', linkRow[langIndex].substr(0, linkRow[langIndex].lastIndexOf('/', linkRow[langIndex].lastIndexOf('/') - 1) + 1));
                langIndex = langIndex + 1;
            }
        });
        $('.mobile-header .mobile-region-language-menu-wrapper .language-tab li a').each(function () {
            if (langIndexMobile < linkRow.length) {
                var url = linkRow[langIndexMobile].split('/');
                $(this).attr('href', linkRow[langIndexMobile].substr(0, linkRow[langIndexMobile].lastIndexOf('/', linkRow[langIndexMobile].lastIndexOf('/') - 1) + 1));
                langIndexMobile = langIndexMobile + 1;
            }
        });
    } else if (pageCategory == "investors" && pageSubcategory == "financial news") {
        linkRow[0] = "/en/investors/financial-news/";
        linkRow[1] = "/fr/investors/financial-news/";
        $('.desktop-region-language-menu-wrapper .content-language li a').each(function () {
            if (langIndex < linkRow.length) {
                $(this).attr('href', linkRow[langIndex]);
                langIndex = langIndex + 1;
            }
        });
        $('.mobile-header .mobile-region-language-menu-wrapper .language-tab li a').each(function () {
            if (langIndexMobile < linkRow.length) {
                $(this).attr('href', linkRow[langIndexMobile]);
                langIndexMobile = langIndexMobile + 1;
            }
        });
    }
    else {
        if (linkRow.length > 0) {
            $('.desktop-region-language-menu-wrapper .content-language li a').each(function () {
                if (langIndex < linkRow.length) {
                    $(this).attr('href', linkRow[langIndex]);
                    langIndex = langIndex + 1;
                }
            });
            $('.mobile-header .mobile-region-language-menu-wrapper .language-tab li a').each(function () {
                if (langIndexMobile < linkRow.length) {
                    $(this).attr('href', linkRow[langIndexMobile]);
                    langIndexMobile = langIndexMobile + 1;
                }
            });
        }
    }
    //Code for Language toggle ends //  
});