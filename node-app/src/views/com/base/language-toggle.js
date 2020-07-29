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

    if (pageCategory == "newsroom" && pageSubcategory == "news releases") {
        linkRow[0] = "/en/newsroom/news-releases/";
        linkRow[1] = "/fr/newsroom/news-releases/";

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