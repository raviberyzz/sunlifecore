$(document).ready(function () {
    //Code for Language toggle starts //
    var langIndex = 0;
	var langIndexMobile = 0;
    var linkRow = ["","","/zh-hans/"];
    var linkCanRef = null;
    var pageLanguage = utag_data.page_language;
    var parser = document.createElement('a');
    parser.href = window.location.href;
	var query = parser.search.substring(1);
    // console.log(query);

    if(query != ""){
		query = "?" + query;
    }

    if(pageLanguage != "zh-hans"){
        $.each($('link'), function (index, value) {
            if (value.rel == "alternate") {
                if(value.hreflang == "en-hk"){
                    linkRow[0] = value.href + query;
                }
                else if(value.hreflang.toLowerCase() == "zh-hant-hk"){
                    linkRow[1] = value.href + query;
                }
            } 
            else if (value.rel == "canonical") {
                linkCanRef = value.href;
            }
        });
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
});