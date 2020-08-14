
$(document).ready(function () {
    /* baseline video analytics starts here */
    if($('.video_container').length>0){
        let videoScript = document.createElement('script');
        videoScript.type="text/javascript";
		videoScript.setAttribute('src', '/content/dam/sunlife/legacy/assets/slfglobal/globalweb/responsive/scripts/vidyard_event_listener.js');
        $('head')[0].appendChild(videoScript);
    }
    /* baseline video analytics ends here */
    /* baseline error 404 page starts here */
    if(utag_data.page_canonical_url.indexOf('/error/404')!=-1){
        var error_script = document.createElement('script');
        error_script.type = 'text/javascript';
        error_script.text = 'utag_data["page_canonical_url"] ="'+window.location.hostname+window.location.pathname+'"; \n \
                        utag_data["page_canonical_url_default"] ="'+window.location.hostname+window.location.pathname+'";';
        let syncTag=$('head script[src^="//tags.tiqcdn.com/utag/sunlife/"][src$="utag.sync.js"]');
        //document.head.appendChild(error_script);
        if(syncTag.length>0){
            syncTag.before(error_script);
        }
    }
    /* baseline error 404 page ends here */
    /* product and services pages analytics starts here */
        let pageName= utag_data.page_breadcrumb.split("/");
        let productTitle = pageName[pageName.length - 1].toLowerCase();
        // .com home page explore product and service section drodwon go button starts here 
        if(productTitle=='english' || productTitle=='french' || productTitle=='home'){
            $("#select-location-cta-form .button button").click(function(){
                let country=$(this).parent().siblings('.experiencefragment').find('select option:selected').text();
                utag.link({
                    "asset_type" : "Dropdown",
                    "asset_title" : "Triage  - clients & prospects - products & services",
                    "event_type" : "Click",
                    "event_title" : "Country selected - "+country,
                    "page_section" : "Learn about our products & services "
                });
            });
        }
        // .com home page explore product and service section drodwon go button ends here
        // product and services home page explore product and service section
        if(productTitle=='products and services'){
            $('.cmp-linkfarm-table ul li a').click(function(e){
                let linkText=$(this).text();
                let parentCountry=$(this).parent().parents('li').children('a').text();
                utag.link({
                     "asset_type" : "Text Link",
                     "asset_title" : "Triage - clients & prospects -products & services",
                     "event_type" : "Click",
                     "event_title" : parentCountry+" - "+linkText,
                     "page_section" : "Explore products & services"
                });
            });
        }
        // when go button of client sign in is pressed
        if(productTitle=='products and services'){
            $('.form-yellow-wrapper form .button button').click(function(e){
                let country=$(this).parent().siblings('.experiencefragment').find('select option:selected').text();
                utag.link({
                    "asset_type" : "Dropdown",
                    "asset_title" : "Triage  - clients & prospects - products & services",
                    "event_type" : "Click",
                    "event_title" : "Country selected - "+country,
                    "page_section" : "Learn about our products & services "
                });
            });
        }
        // product and services other pages explore product and service section
        pageName.forEach((element,index) => {
            if(element.match('products and services') && productTitle!='products and services'){
                $('.cmp-linkfarm-table ul li a').click(function(e){
                    let linkText=$(this).text();
                    let parentCountry=$(this).parent().parents('li').children('a').text();
                    utag.link({
                        "asset_type" : "Text Link",
                        "asset_title" : "Triage - clients & prospects -products & services - "+productTitle,
                        "event_type" : "Click",
                        "event_title" :  parentCountry+" - "+linkText,
                        "page_section" : "Explore products & services"
                    });
                });
            }
        });

    /* product and services pages analytics ends here */
    /* contact us page analytics starts here */    
        if(productTitle=='contact us'){
            // client sign in dropdown go button
            $('.form-yellow-wrapper form .button button').click(function(e){
                let country=$(this).parent().siblings('.experiencefragment').find('select option:selected').text();
                utag.link({
                    "asset_type" : "Dropdown",
                    "asset_title" : "Triage  - clients & prospects - sign in",
                    "event_type" : "Click",
                    "event_title" : "Country selected - "+country,
                    "page_section" : "sign in module"
                });
            });
            // shareholder and investor tab link/email click
            $(".cmp-tabs__tabpanel a").click(function(){
                let linkTitle=$(this).text();
                let tabName=$(".cmp-tabs__tablist .cmp-tabs__tab.cmp-tabs__tab--active").text();
                if(tabName.toLowerCase().match('shareholders and investors')){
                    utag.link({
                        "asset_type" : "Text Link",
                        "asset_title" : "Triage  - investors - contact us",
                        "event_type" : "Click",
                        "event_title" : "NA - "+linkTitle,
                        "page_section" : "tab: "+tabName
                    });
                }
            });
            // for media tab link/email click
            $(".cmp-tabs .cmp-tabs__tabpanel a").click(function(){
                let linkTitle=$(this).text();
                let tabName=$(".cmp-tabs__tablist .cmp-tabs__tab.cmp-tabs__tab--active").text();
                let country=$(this).parent().parent().find('h2').text();
                if(country==null || country == ''|| country==String.fromCharCode(160)){ 
                    country='Canada';
                }
                if(tabName.toLowerCase().match('for media')){
                    utag.link({
                        "asset_type" : "Text Link",
                        "asset_title" : "Triage  - media - contact us",
                        "event_type" : "Click",
                        "event_title" : country+" - "+linkTitle,
                        "page_section" : "tab: "+tabName
                    });
                }
            });
            // for corporate head office and for clients tab link/email click
            $(".cmp-tabs .cmp-tabs__tabpanel a").click(function(){
                let linkTitle=$(this).text();
                let tabName=$(".cmp-tabs__tablist .cmp-tabs__tab.cmp-tabs__tab--active").text();
                let country=$(this).parent().parent().find('h6').text();
                if(country==null || country == ''|| country==String.fromCharCode(160)){ 
                    country='NA';
                }
                if(tabName.toLowerCase().match('for clients') || tabName.toLowerCase().match('corporate head office')){
                    if(tabName.toLowerCase().match('corporate head office')){
                        country='NA';
                    }
                    utag.link({
                        "asset_type" : "Text link",
                        "asset_title" : "Triage  - clients & prospects - contact us",
                        "event_type" : "Click",
                        "event_title" : country+" - "+linkTitle,
                        "page_section" : "Tab:  "+tabName+" "
                    });
                }
            });
        }
    /* contact us page analytics analytics ends here */
    /* shareholder Contacts page link analytics starts here */
    if(productTitle=='shareholder contacts'){
        $('body a').click(function(e){
            let link=$(this).text();
            let country=$(this).parents('.collapse').parent().find('.accordion-heading .accordion-icon strong').text();
            utag.link({
                "asset_type" : "Text Link",
                "asset_title" : "Triage  - investors - shareholder contacts",
                "event_type" : "Click",
                "event_title" : country+" - "+link,
                "page_section" : "Page body"
            });
        });
    }
    /* shareholder Contacts page link analytics ends here */
    /* Careers page analytics starts here */
    if(productTitle=='careers'){
        //current opportunities dropdown go button click
        $('.container-component form .button button').click(function(e){
            let country=$(this).parent().siblings('.experiencefragment').find('select option:selected').text();
            utag.link({
                "asset_type" : "Dropdown",
                "asset_title" : "Triage  - job seekers - careers",
                "event_type" : "Click",
                "event_title" : "Country selected - "+country,
                "page_section" : "current opportunities module"
            });
        });
        //explore section opportunities link click
        $('.cmp-linkfarm-table ul li a').click(function(e){
            let linkText=$(this).text();
            let parentCountry=$(this).parent().parents('li').children('a').text();
            utag.link({
                "asset_type" : "Text Link",
                "asset_title" : "Triage  - job seekers - careers",
                "event_type" : "Click",
                "event_title" : parentCountry+" - "+linkText,
                "page_section" : "Explore career opportunities"
            });
        });
    }
    /* Careers page analytics ends here */
    /* Why Join us page analytics starts here */
    // Explore Career oppurtunities section link click
    if(productTitle=='why join us'){
        $('.cmp-linkfarm-table ul li a').click(function(e){
            let linkText=$(this).text();
            let parentCountry=$(this).parent().parents('li').children('a').text();
            utag.link({
                "asset_type" : "Text Link",
                "asset_title" : "Triage  - job seekers - why join Sun Life",
                "event_type" : "Click",
                "event_title" : parentCountry+" - "+linkText,
                "page_section" : "Explore career opportunities"
            });
        });
    }
    /* Why Join us page analytics ends here */
    /* Donations and Partnerships page analytics starts here */
    // Explore section link clicked
        if(productTitle=='donations and partnerships'){
            $('.cmp-linkfarm-table ul li a').click(function(e){
                let linkText=$(this).text();
                let parentCountry=$(this).parent().parents('li').children('a').text();
                utag.link({
                    "asset_type" : "Text Link",
                    "asset_title" : "Triage  - donations - d&S",
                    "event_type" : "Click",
                    "event_title" : parentCountry+" - "+linkText,
                    "page_section" : "Explore donations and sponsorships"
                });
            });
        }
    /* Donations and Partnerships page analytics ends here */
    /* Countries/Regions page analytics starts here */
    if(productTitle=='regions' || productTitle=='countries'){
    // clicking on tooltip
        $('#map-point-container .map-point a span').click(function(){
            let country=$(this).parent().siblings('.map-point-content').find('h5').text();
            utag.link({
                "asset_type" : "Image Link",
                "asset_title" : "Global Map",
                "event_type" : "Click",
                "event_title" : country,
                "page_section" : "Map"
            });
        });
        // link click in the overlay of tooltip
        $('#map-point-container .map-point .map-point-content p a').click(function(){
            let linkText=$(this).text();
            let country=$(this).parent().siblings('h5').text();
            utag.link({
                "asset_type" : "Text Link",
                "asset_title" : "Triage  - Country - Countries",
                "event_type" : "Click",
                "event_title" : country+" - "+linkText,
                "page_section" : "Map"
            });
        });
        // link below the map section click
        $(".country-sect .country-item .country-content li a").click(function(){
            let linkText=$(this).text();
            let country=$(this).parent().parents('.country-item').find('span.country-title').text();
            utag.link({
                "asset_type" : "Text Link",
                "asset_title" : "Triage  - Country - Countries",
                "event_type" : "Click",
                "event_title" : country+" - "+linkText,
                "page_section" : "Below Map"
            });
        });
    }
    /* Countries/Regions page analytics ends here */
    /* inside language bar link analytics starts here */
    $("#sun-language .region-language-menu ul li a").click(function(){
        if (!$(this).hasClass("accordion-heading")) {
            let country=$(this).parent().parent().siblings('.accordion-heading').text().trim();
            let linkName=$(this).text();
            utag.link({
                "asset_type" : "Language Module",
                "asset_title" : "Triage - Language Panel",
                "event_type" : "Click",
                "event_title" : country+" - "+linkName,
                "page_section" : "Language bar"
            });
        }
    });
    /* inside language bar link analytics ends here */
    /* Newsroom page analytics starts here */
    $('#right-railId .html-component .explore-module a').click(function(){
        let linkName=$(this).text();
        let country=$(this).parent().parent().parents('ul.explore-item').find('.content-label').text();
        utag.link({
            "asset_type" : "Text Link",
            "asset_title" : "Triage  - media - newsroom",
            "event_type" : "Click",
            "event_title" : country+" - "+linkName,
            "page_section" : "right rail"
        });
    });
    /* Newsroom page analytics ends here */
    /* Home page modal analytics starts here */
    // onpage loading impreesion
        function comModal(){
            if($('#myModal').hasClass('in')){
                utag.link({
                    "asset_type" : "Modal",
                    "asset_title" : "Modal Impression",
                    "event_type" : "On Page Impression",
                    "event_title" : "Modal Impression",
                    "page_section" : "Modal"
                });
            }
        }
        setTimeout(comModal,500);
    // stay button is pressed
    $('#myModal .modal-body #stayoncom').click(function(){
        utag.link({
            "asset_type" : "Button",
            "asset_title" : "Triage - clients & prospects - modal",
            "event_type" : "Click",
            "event_title" : "Stay on Sunlife.com",
            "page_section" : "Modal"
        });
    });
    // modal "x" button is pressed
    $('#myModal .modal-header button.close').click(function(){
        utag.link({
            "asset_type" : "Button",
            "asset_title" : "Triage - clients & prospects - modal",
            "event_type" : "Click",
            "event_title" : "Close modal",
            "page_section" : "Modal"
        });
    });
    // go modal button or enter key is pressed
    $('#myModal .modal-body #regionSubmit').click(function(){
        let countryName=$('#myModal #select-location-popup option:selected').text().trim();
        utag.link({
            "asset_type" : "Dropdown",
            "asset_title" : "Triage - clients & prospects - modal",
            "event_type" : "Click",
            "event_title" : "Country selected - "+countryName,
            "page_section" : "Modal"
        });
    });
    /* Home page modal analytics ends here */
});