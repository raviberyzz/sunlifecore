$(document).ready(function () {
    //Code for Language toggle starts //
    var linkRow = [];
    //var linkAltRef = 0;
    var linkCanRef = null;

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

    if (linkRow.length > 0) {
        if (utag_data.page_language == 'en') {
            $('.utility-nav-wrapper .utility-nav-links li:nth-child(2) a').first().attr('href', linkRow[1]);
            // $('.hamburger-menu-wrapper .first-level-navigation li:last-child a').last().attr('href', linkRow[1]);
        }
        if (utag_data.page_language == 'fr') {
            $('.utility-nav-wrapper .utility-nav-links li:nth-child(2) a').first().attr('href', linkRow[0]);
            // $('.hamburger-menu-wrapper .first-level-navigation li:last-child a').last().attr('href', linkRow[0]);
        }
    }

    //Code for Language toggle ends //  

});