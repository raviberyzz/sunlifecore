$(document).ready(function () {
    //Code for Language toggle starts
    var langIndex = 0;
    var langIndexMobile = 0;
    var linkRow = [];
    //var linkAltRef = 0;
    var linkCanRef = null;
    var pageSubcategory = utag_data.page_subcategory;
    var pageAdvisoryType = utag_data.page_advisor_type;
    var pageCategory = utag_data.page_category;
    var pageErrorType = "";
    if (typeof pageType != 'undefined') {
        pageErrorType = pageType;
    }
    $.each($('link'), function (index, value) {
        if (value.rel == "alternate") {
            //linkAltRef = linkAltRef + 1;
            if (((window.location.href.indexOf("sunnet.sunlife.com") > -1) && (window.location.href.indexOf("/Slgi-funds") > -1)) || (window.location.href.indexOf("/Slgi-funds") > -1)) {
                var altLang = window.location.href;
                if (pageCategory == "adv") {
                    altLang = altLang.replace("sunlifeglobalinvestments.com", "sunnet.sunlife.com/Slgi");
                }
                if (utag_data.page_language == "en") {
                    if (altLang.indexOf("lang=EN") > -1) {
                        altLang = altLang.replace("lang=EN", "lang=FR");
                    } else if (altLang.indexOf("lang=en") > -1) {
                        altLang = altLang.replace("lang=en", "lang=fr");
                    }
                } else if (utag_data.page_language == "fr") {
                    if (altLang.indexOf("lang=FR") > -1) {
                        altLang = altLang.replace("lang=FR", "lang=EN");
                    } else if (altLang.indexOf("lang=fr") > -1) {
                        altLang = altLang.replace("lang=fr", "lang=en");
                    }
                }
                linkRow.push(altLang);
            } else if (window.location.href.indexOf("sunnet.sunlife.com") > -1) {
                var firstSection = window.location.href;
                firstSection = firstSection.replace("sunlifeglobalinvestments.com", "sunnet.sunlife.com/Slgi");
                if (utag_data.page_language == "en") {
                    if (firstSection.indexOf("/Slgi/adv") > -1) {
                        firstSection = firstSection.replace("/Slgi/adv", "/Slgi/fr/adv");
                    } else if (firstSection.indexOf("/Slgi/en") > -1) {
                        firstSection = firstSection.replace("/Slgi/en", "/Slgi/fr");
                    }
                } else if (utag_data.page_language == "fr") {
                    if (firstSection.indexOf("/Slgi/fr") > -1) {
                        firstSection = firstSection.replace("/Slgi/fr", "/Slgi/en");
                    }
                }
                linkRow.push(firstSection);
            } else {
                linkRow.push(value.href);
            }
        } else if (value.rel == "canonical") {
            linkCanRef = value.href;
        }
    });
    var newsUrl = linkCanRef.split("/");
    var lastPart = newsUrl[newsUrl.length - 2];
    if (pageSubcategory == "in the media" && utag_data.page_category == "about us") {
        if (utag_data.page_language == 'en') {
            $('.desktop-region-language-menu-wrapper .content-language li a').first().attr('href', "/content/sunlife/external/slgi/fr/about-us/in-the-media");
            $('.mobile-header .mobile-region-language-menu-wrapper .language-tab li a').first().attr('href', "/content/sunlife/external/slgi/fr/about-us/in-the-media");
            $('.desktop-region-language-menu-wrapper .content-language li:nth-child(2)').children('a').attr('href', document.referrer);
            $('.mobile-header .mobile-region-language-menu-wrapper .language-tab li:nth-child(2)').children('a').attr('href', document.referrer);
        }
        if (utag_data.page_language == 'fr') {
            $('.desktop-region-language-menu-wrapper .content-language li a').first().attr('href', document.referrer);
            $('.mobile-header .mobile-region-language-menu-wrapper .language-tab li a').first().attr('href', document.referrer);
            $('.desktop-region-language-menu-wrapper .content-language li:nth-child(2)').children('a').attr('href', "/content/sunlife/external/slgi/en/about-us/in-the-media");
            $('.mobile-header .mobile-region-language-menu-wrapper .language-tab li:nth-child(2)').children('a').attr('href', "/content/sunlife/external/slgi/en/about-us/in-the-media");
        }
    }
    if (pageSubcategory == "news" && !isNaN(lastPart) && lastPart.length > 4) {
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
    } else {
        if (pageErrorType === "error-page") {
            if (utag_data.page_language == 'en') {
                $('.desktop-region-language-menu-wrapper .content-language li a').first().attr('href', "/content/sunlife/external/slgi/en/error/language-error");
                $('.mobile-header .mobile-region-language-menu-wrapper .language-tab li a').first().attr('href', "/content/sunlife/external/slgi/en/error/language-error");
                $('.desktop-region-language-menu-wrapper .content-language li:nth-child(2)').children('a').attr('href', document.referrer);
                $('.mobile-header .mobile-region-language-menu-wrapper .language-tab li:nth-child(2)').children('a').attr('href', document.referrer);
            }
            if (utag_data.page_language == 'fr') {
                $('.desktop-region-language-menu-wrapper .content-language li a').first().attr('href', document.referrer);
                $('.mobile-header .mobile-region-language-menu-wrapper .language-tab li a').first().attr('href', document.referrer);
                $('.desktop-region-language-menu-wrapper .content-language li:nth-child(2)').children('a').attr('href', "/content/sunlife/external/slgi/fr/error/language-error");
                $('.mobile-header .mobile-region-language-menu-wrapper .language-tab li:nth-child(2)').children('a').attr('href', "/content/sunlife/external/slgi/fr/error/language-error");
            }
        } else {
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
            if (linkRow.length == 0 && linkCanRef != null) {
                if (utag_data.page_language == 'en') {
                    $('.desktop-region-language-menu-wrapper .content-language li a').first().attr('href', linkCanRef);
                    $('.mobile-header .mobile-region-language-menu-wrapper .language-tab li a').first().attr('href', linkCanRef);
                    $('.desktop-region-language-menu-wrapper .content-language li:nth-child(2)').children('a').attr('href', "/content/sunlife/external/slgi/fr/error/language-error");
                    $('.mobile-header .mobile-region-language-menu-wrapper .language-tab li:nth-child(2)').children('a').attr('href', "/content/sunlife/external/slgi/fr/error/language-error");
                }
                if (utag_data.page_language == 'fr') {
                    $('.desktop-region-language-menu-wrapper .content-language li a').first().attr('href', "/content/sunlife/external/slgi/en/error/language-error");
                    $('.mobile-header .mobile-region-language-menu-wrapper .language-tab li a').first().attr('href', "/content/sunlife/external/slgi/en/error/language-error");
                    $('.desktop-region-language-menu-wrapper .content-language li:nth-child(2)').children('a').attr('href', linkCanRef);
                    $('.mobile-header .mobile-region-language-menu-wrapper .language-tab li:nth-child(2)').children('a').attr('href', linkCanRef);
                }
            }
        }
    }
    //Code for Language toggle ends //  
});