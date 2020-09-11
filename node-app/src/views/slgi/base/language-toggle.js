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
            // to find either combined sunnet domain and dynamic fund pages or dynamic fund pages
            if (((window.location.href.toLowerCase().indexOf("sunnet.sunlife.com") > -1) && (window.location.href.toLowerCase().indexOf("/slgi-funds") > -1)) ||
                (window.location.href.toLowerCase().indexOf("/slgi-funds") > -1)) {
                var altLang = window.location.href; // set a variable
                // logic to replace (sunlifeglobalinvestments/placementsmondiauxsunlife) with secure sunnet domain for (adv/inv) users
                if (pageCategory.toLowerCase() == "adv" || pageCategory.toLowerCase() == "inv") {
                    if (altLang.indexOf("sunlifeglobalinvestments.com") < -1) {
                        altLang = altLang.replace("placementsmondiauxsunlife.com", "sunnet.sunlife.com/Slgi");
                    } else {
                        altLang = altLang.replace("sunlifeglobalinvestments.com", "sunnet.sunlife.com/Slgi");
                    }
                }
                // check for (English/French) pages and push their respective urls to the array
                if (utag_data.page_language == "en") {
                    linkRow[0] = altLang;
                    if (altLang.indexOf("=EN") > -1) {
                        altLang = altLang.replace("=EN", "=FR");
                    } else if (altLang.indexOf("=en") > -1) {
                        altLang = altLang.replace("=en", "=fr");
                    }
                    // based on SEO tagging rules, en to fr conversion on dynamic fund pages
                    if (altLang.indexOf("/en/slgi-funds") > -1) {
                        altLang = altLang.replace("/en/slgi-funds", "/fr/slgi-funds");
                    }
                    linkRow[1] = altLang;
                } else if (utag_data.page_language == "fr") {
                    linkRow[1] = altLang;
                    if (altLang.indexOf("=FR") > -1) {
                        altLang = altLang.replace("=FR", "=EN");
                    } else if (altLang.indexOf("=fr") > -1) {
                        altLang = altLang.replace("=fr", "=en");
                    }
                    // based on SEO tagging rules, fr to en conversion on dynamic fund pages
                    if (altLang.indexOf("/fr/slgi-funds") > -1) {
                        altLang = altLang.replace("/fr/slgi-funds", "/en/slgi-funds");
                    }
                    linkRow[0] = altLang;
                }
            } else if (window.location.href.toLowerCase().indexOf("sunnet.sunlife.com") > -1) { // check to find the sunnet.sunlife domain
                var firstSection = window.location.href;
                // logic to replace (sunlifeglobalinvestments/placementsmondiauxsunlife) with secure sunnet domain for (adv/inv) users
                if (pageCategory.toLowerCase() == "adv" || pageCategory.toLowerCase() == "inv") {
                    (firstSection.indexOf("sunlifeglobalinvestments.com") < -1) ?
                    (firstSection = firstSection.replace("placementsmondiauxsunlife.com", "sunnet.sunlife.com/Slgi")) :
                    (firstSection = firstSection.replace("sunlifeglobalinvestments.com", "sunnet.sunlife.com/Slgi"));
                }
                // check for (English/French) pages and push their respective urls to the array
                if (utag_data.page_language == "en") {
                    linkRow[0] = firstSection;
                    if (firstSection.indexOf("/Slgi/adv") > -1) {
                        firstSection = firstSection.replace("/Slgi/adv", "/Slgi/fr/adv");
                    } else if ((firstSection.indexOf("/Slgi/en") > -1) && (utag_data.page_subcategory != "insights")) {
                        firstSection = firstSection.replace("/Slgi/en", "/Slgi/fr");
                    } else if (firstSection.indexOf("/Slgi/inv") > -1) {
                        firstSection = firstSection.replace("/Slgi/inv", "/Slgi/fr/inv");
                    }
                    linkRow[1] = firstSection;
                    if (utag_data.page_subcategory == "insights") {
                        linkRow[0] = window.location.href;
                        if (value.hreflang == "fr-ca") {
                            var altValue = value.href;
                            if (altValue.indexOf("sunlifeglobalinvestments.com") < -1) {
                                altValue = altValue.replace("placementsmondiauxsunlife.com", "sunnet.sunlife.com/Slgi");
                            } else {
                                altValue = altValue.replace("sunlifeglobalinvestments.com", "sunnet.sunlife.com/Slgi");
                            }
                            linkRow[1] = altValue;
                        }
                    }
                } else if (utag_data.page_language == "fr") {
                    linkRow[1] = firstSection;
                    var resultFrHome = firstSection.substring(0, (firstSection.indexOf("?") -1));

                    if ((firstSection.indexOf("/Slgi/adv") > -1) && (firstSection.indexOf("vgnLocale=fr_CA") > -1)) {
                         firstSection = resultFrHome;
                        firstSection = firstSection.replace("Slgi/adv", "/Slgi/en/adv/");
                        linkRow[0] = firstSection;
                    } else if ((firstSection.indexOf("/Slgi/inv") > -1) && (firstSection.indexOf("vgnLocale=fr_CA") > -1)) {
                        firstSection = resultFrHome;
                        firstSection = firstSection.replace("/Slgi/inv", "/Slgi/en/inv/");
                        linkRow[0] = firstSection;
                    } else if ((firstSection.indexOf("/Slgi/fr") > -1) && (utag_data.page_subcategory != "insights")) {
                        firstSection = firstSection.replace("/Slgi/fr", "/Slgi/en");
                        linkRow[0] = firstSection;
                    } else if (firstSection.indexOf("/Slgi/inv") > -1) {
                        firstSection = firstSection.replace("/Slgi/inv", "/Slgi/fr/inv");
                        linkRow[0] = firstSection;
                    }
                    
                    if (utag_data.page_subcategory == "insights") {
                        linkRow[1] = window.location.href;
                        if (value.hreflang == "en-ca") {
                            var altValue = value.href;
                            if (altValue.indexOf("sunlifeglobalinvestments.com") < -1) {
                                altValue = altValue.replace("placementsmondiauxsunlife.com", "sunnet.sunlife.com/Slgi");
                            } else {
                                altValue = altValue.replace("sunlifeglobalinvestments.com", "sunnet.sunlife.com/Slgi");
                            }
                            linkRow[0] = altValue;
                        }
                    }
                }
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