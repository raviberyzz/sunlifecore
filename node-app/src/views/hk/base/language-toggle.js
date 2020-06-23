$(document).ready(function () {
    //Code for Language toggle starts //
    var langIndex = 0;
	var langIndexMobile = 0;
    var linkRow = [];
    var linkCanRef = null;
    var pageErrorType = "";
    var pageLanguage = utag_data.page_language;
    if (typeof pageType != 'undefined') {
        pageErrorType = pageType;
    }
    if(pageLanguage != "zh-hans"){
        $.each($('link'), function (index, value) {
            if (value.rel == "alternate") {
                linkRow.push(value.href);
            } else if (value.rel == "canonical") {
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