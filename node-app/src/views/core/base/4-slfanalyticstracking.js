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

// Sign In Module (Desktop Sign In button) analytics starts here
$('#signinbutton').click(function(){
    utag.link({"asset_type"	: "Module",
	"asset_title"	: "Sign In - Main",
	"event_type"	: "Click",
	"canonical_url" : "https://www.sunlife.ca/ca?vgnLocale=en_CA",
	"event_title"	: "Sign In",
	"page_section" : "Homepage main signin"
    });
setTimeout(signinmodal,200);
})
// Sign In Module (Desktop Sign In button) analytics ends here

// Sign In Modal (Mobile Sign In button) analytics starts here
$('#SignIn').click(function(){
    utag.link({"asset_type"	: "Module",
	"asset_title"	: "Sign In - Modal",
	"event_type"	: "Click",
	"canonical_url" : "https://www.sunlife.ca/ca?vgnLocale=en_CA",
	"event_title"	: "Sign In",
	"page_section" : "Modal"
    });
    setTimeout(signinmodal,200);
});
// Sign In Modal (Mobile Sign In button) analytics ends here

// Sign In Modal (Sign-in-modal expansion) analytics starts here
function signinmodal() {
    if ($('#mySignInModal').hasClass('in')){
        utag.link({
            "asset_type"	: "Module",
            "asset_title"	: "Sign In - Modal",
            "event_type"	: "On Page Impression",
            "event_title"	: "Expansion",
            "page_section" : "Modal"
        });
        //console.log("mobile sign in module expanding is being tracked successfully");        
    }
    else{
        // if modal not found then throwing error
        utag.link({
            "asset_type"	: "Module",
            "asset_title"	: "Sign In - Modal",
            "event_type"	: "On Page Impression",
            "canonical_url" : "https://www.sunlife.ca/ca?vgnLocale=en_CA",
            "event_title"	: "Error-" + "Expanding not tracked",
            "page_section" : "Modal"});
            //console.log("mobile sign in module expanding is not being tracked");
    }
}
// Sign In Modal (Sign-in-modal expansion) analytics ends here

// Moblie language and region bar analytics starts here
$('.navigation-menu.language-region').click(function(){
	//console.log("Inside languagepanelmobile.");
	if($('.navigation-menu.language-region .second-level-navigation').hasClass('active')){
		utag.link({"asset_type"	: "Module","asset_title"	: "Language Panel","event_type"	: "On Page Impression","event_title"	: "Language Panel Expansion","page_section" : "Language Bar" });
        //console.log("Event fired for mobile lang pannel expansion");
    }
});
// Mobile language and region bar analytics ends here

// Right Navigation analytics starts here
$('.button-class').click(function(){
    var btnTxt1=$(this).parent().text();
    var btnTxt=$.trim(btnTxt1);
    utag.link({
        "asset_type"	: "Module",
        "asset_title"	: "CTA Module",
        "event_type"	: "Click",
        "event_title"	: btnTxt,
        "page_section" : "body-right-rail"
    });
    var adv='advisor';
    if ((btnTxt == 'search') || (btnTxt == 'Search') || (btnTxt.indexOf(adv) != -1)){
        var WT={ac:''};
        WT.ac=["en-ca","Web:SLF_evergreen","slfca-hp","slfca",", pcbutton"];
        utag.link({
        "utm_source":"slfca-hp", //[INSERT LOCATION OF WIDGET, slfca-hp for homepage]
        "utm_medium":"pcwidget", //[INSERT TYPE OF LINK pcwidget for widget]
        "utm_content":"en-ca", //[INSERT CORRECT LANGUAGE en-ca or fr-ca]
        "utm_campaign":"slfca"
        });
    }     
});
/* For dropdown */
$('.cmp-form-options--drop-down').siblings().children('.button-class').click(function(){
    var dropdown=$('.cmp-form-options__field.cmp-form-options__field--drop-down').val();
    utag.link({
        "asset_type"	: "Module",
        "asset_title"	: "Find a Financial Center",
        "event_type"	: "Click",
        "event_title"	: "Find - " + dropdown,
        "page_section" : "body-right-rail"
    });    
});
// Right Navigation analytics ends here

// Footer Analytics starts here
if ($(window).width() > 1024) {
    $('footer a').click(function(){
        utag.link({
            ev_type: "other",
            ev_action: "clk",
            ev_title: "Footer: Desktop Version"
            });        
    })
}
else{
    $('footer a').click(function(){
        utag.link({
            ev_type: "other",
            ev_action: "clk",
            ev_title: "Footer: Mobile Version"
            });
               
    })
}
// Footer analytics ends here

});