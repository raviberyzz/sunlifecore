$(document).ready(function () {
    $('#search-btn').click(function () {
        if (($(this).attr('aria-expanded') == undefined) || ($(this).attr('aria-expanded') == "false")) {
            utag.link({ "asset_type": "Module", "asset_title": "Search", "event_type": "On Page Impression", "event_title": "Search Module Expansion", "page_section": "Search Bar" });
            //console.log("search exapansion tracked");
        } 
        else {
            //console.log("search expansion is not tracked");
        }
    });
});
