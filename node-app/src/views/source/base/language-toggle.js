$(document).ready(function () {
    //Code for Language toggle starts //
    var linkRow = [];
    //var linkAltRef = 0;
    var linkCanRef = null;
    var pageErrorType = "";
    if (typeof pageType != 'undefined') {
        pageErrorType = pageType;
    }


    $.each($('link'), function (index, value) {
        if (value.rel == "alternate") {
            if (value.hreflang == "en-ca") {
                linkRow[0] = value.href;
            }
            else if (value.hreflang == "fr-ca") {
                linkRow[1] = value.href;
            }
        }
        else if (value.rel == "canonical") {
            linkCanRef = value.href;
        }
    });

    if (pageErrorType === "error-page") {
        if (utag_data.page_language == 'en') {
            $('.utility-nav-wrapper .utility-nav-links li:nth-child(2) a').first().attr('href', document.referrer);
            // $('.hamburger-menu-wrapper .first-level-navigation li:last-child a').last().attr('href', document.referrer);
        }
        if (utag_data.page_language == 'fr') {
            $('.utility-nav-wrapper .utility-nav-links li:nth-child(2) a').first().attr('href', document.referrer);
            // $('.hamburger-menu-wrapper .first-level-navigation li:last-child a').last().attr('href', document.referrer);
        }

    } else if (linkRow.length > 0) {
        if (utag_data.page_language == 'en') {
            $('.utility-nav-wrapper .utility-nav-links li:nth-child(2) a').first().attr('href', linkRow[1]);
            // $('.hamburger-menu-wrapper .first-level-navigation li:last-child a').last().attr('href', linkRow[1]);
        }
        if (utag_data.page_language == 'fr') {
            $('.utility-nav-wrapper .utility-nav-links li:nth-child(2) a').first().attr('href', linkRow[0]);
            // $('.hamburger-menu-wrapper .first-level-navigation li:last-child a').last().attr('href', linkRow[0]);
        }
    } else if (linkRow.length == 0 && linkCanRef != null) {
        if (utag_data.page_language == 'en') {
            $('.utility-nav-wrapper .utility-nav-links li:nth-child(2) a').first().attr('href', "/content/sunlife/internal/source/fr/error/language-error");
            // $('.hamburger-menu-wrapper .first-level-navigation li:last-child a').last().attr('href', "/content/sunlife/internal/source/fr/error/language-error");
        }
        if (utag_data.page_language == 'fr') {
            $('.utility-nav-wrapper .utility-nav-links li:nth-child(2) a').first().attr('href', "/content/sunlife/internal/source/en/error/language-error");
            // $('.hamburger-menu-wrapper .first-level-navigation li:last-child a').last().attr('href', "/content/sunlife/internal/source/en/error/language-error");
        }
    }
    //Code for Language toggle ends //  

});