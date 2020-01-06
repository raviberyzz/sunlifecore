$(document).ready(function () {

// search bar analytics starts here
// Desktop search analytics starts here
    $('#search-btn').click(function () {
        if (($(this).attr('aria-expanded') == undefined) || ($(this).attr('aria-expanded') == "false")) {
            utag.link({ "asset_type": "Module", "asset_title": "Search", "event_type": "On Page Impression", "event_title": "Search Module Expansion", "page_section": "Search Bar" });
            //console.log("search exapansion tracked");
        } 
        else {
            //console.log("search expansion is not tracked");
        }
    });
    // Desktop search analytics ends her
    // Mobile search analytics starts here
    $('.search-icon-mobile').click(function () {
        utag.link({"asset_type"	: "Module","asset_title"	: "Search","event_type"	: "On Page Impression","event_title"	: "Search Module Expansion","page_section" : "Search Bar"});
    });
    //Mobile search analytics starts here
// search bar analytics ends here

// Region and language menu analytics starts here
    $('#language-btn').click(function(){
        if($(this).attr('aria-expanded') == "false"){
        utag.link({"asset_type"	: "Module","asset_title"	: "Language Panel","event_type"	: "On Page Impression","event_title"	: "Language Panel Expansion","page_section" : "Language Bar" });
        //   console.log("language panel expansion event tracked sucessfully");

    }
    else {
        //    console.log("language panel expansion event is not tracked");
        }
    });
// Region and language menu analytics ends here

});