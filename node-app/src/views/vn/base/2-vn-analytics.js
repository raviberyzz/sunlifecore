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
    /* Sign in modal analytics starts here */
        $("#SignIn,#signinbutton").unbind("click");
        $("#SignIn,#signinbutton").click(function(){
            utag.link({ 
                ev_type: "authenticate", 
                ev_action: "clk", 
                ev_title: "sign in", 
                ev_data_one: "existing client"
            });                
        });
    /* Sign in modal analytics ends here */
    /* Modal forgot password starts here */
    $('#userIdForgot').click(function(){        
        utag.link({ 
            ev_type: "authenticate", 
            ev_action: "clk", 
            ev_title: "sign in", 
            ev_data_one: "forgot password"
        });            
    });
    /* Modal forgot password ends here */
    /* Modal register now analytics starts here */
    $('#userIdRegiste').click(function(){
        utag.link({ 
            ev_type: "authenticate", 
            ev_action: "clk", 
            ev_title: "sign in", 
            ev_data_one: "register now"
        });        
    });
    /* Modal register now analytics ends here */
    let pageName= utag_data.page_breadcrumb.split("/");
    let productTitle = pageName[pageName.length - 1].toLowerCase();
    /* Home Page Get a Quote starts here */
    if(productTitle=='english' || productTitle=='home'){
        $("#get-a-quote-btn").click(function(event){
            var productDropDownVal = $('#select-product').children('optgroup').children('option:selected').text();
            utag.link({ 
                ev_type: "other", 
                ev_action: "clk", 
                ev_title: "get a quote", 
                ev_data_one: productDropDownVal
            });
        });        
    }
    /* Home Page Get a Quote ends here */
        /* Carousel analytics starts here */
    //for home page only
    if(productTitle=='vn' || productTitle=='home'){
        //banner load
        function bannerLoadVN() {
            var bannerTitle = $(".cmp-carousel__item.cmp-carousel__item--active").find(".right-item.text-section h2").text();
            if (typeof utag !== 'undefined') {
                utag.link({
                    ev_type: "ad",
                    ev_action: "onpage_impr",
                    ev_title: bannerTitle,
                    ev_data_one: "banner position=1"
                });
            }
        }
        //banner click
        $(".cmp-carousel__item").click(function(){
            var bannerPosition=$(this).index()+1;
            var bannerTitleText=$(this).find(".right-item.text-section").text().split("\n");
            bannerTitleText=bannerTitleText[1].trim();
            utag.link({ 
            ev_type: "ad", 
            ev_action: "clk", 
            ev_title: bannerTitleText,
            ev_data_one: "banner position= "+bannerPosition
            });
        });
        //banner rotating
        var maxCarouselCount=0,bannerCount=2;
        if ($(".cmp-carousel__item").length > 0) {
            maxCarouselCount = $(".cmp-carousel__content").find(".cmp-carousel__item").length * 2 //for 2 cycles only
        }
        var time=$(".carousel-wrapper .cmp-carousel").attr('data-cmp-delay');
        function carouselCycle(){
            if(bannerCount<=maxCarouselCount){
            var position=$(".cmp-carousel__item.cmp-carousel__item--active").index()+1;
            var bannerTitle=$(".cmp-carousel__item.cmp-carousel__item--active").find(".right-item.text-section").text().split("\n");
            bannerTitle=bannerTitle[1].trim();
                if (typeof utag !== 'undefined') {
                    utag.link({
                        ev_type: "ad",
                        ev_action: "onpage_impr",
                        ev_title: bannerTitle,
                        ev_data_one: "banner position=" + position + ""
                    });
                }
                bannerCount++;
            }
        }
        bannerLoadVN();
        setInterval(carouselCycle,time);        
    }
    /* Carousel analytics ends here */
    /* Mobile App Banner starts here */
    //on-loading of mobile app banner
    if($("#mobile-app-banner").length){
        function mobileBannerUtag(){
            utag.view({ 
                ev_type: "ad", 
                ev_action: "onpage_impr", 
                ev_title: "app_download_mobile_banner", 
                ev_data_one: "show"
            });
        }
        setTimeout(mobileBannerUtag,500);        
    }
if($("#mobile-app-banner").length){
    function mobileApp(){
        //on clicking download button
        $("#mobile-app-banner.smartbanner .java-button").click(function(){
            utag.link({ 
                ev_type: "ad", 
                ev_action: "onpage_impr", 
                ev_title: "app_download_mobile_banner", 
                ev_data_one: "open"
            });            
        });
        //on clicking close button 
        $("#mobile-app-banner.smartbanner .app-wrapper .smartbanner__exit.js_smartbanner__exit").click(function(){
            utag.link({ 
                ev_type: "ad", 
                ev_action: "onpage_impr", 
                ev_title: "app_download_mobile_banner", 
                ev_data_one: "close"
            });                        
        });
    }
    setTimeout(mobileApp,1000);
}
/* Mobile App Banner ends here */
/* Get a quote social media share starts here */
if($(".html-component #qc_container").length>0){
    let pgName = "";
    let breadcrumbPath = $("meta[property='og:title']").attr('content');
    pgName = breadcrumbPath.trim().replace(/ /g, "_");
    // facebook media share
    $('.icon-parent .fa.fa-facebook-square').click(function(){
        utag.link({ 
            ev_type: "calc", 
            ev_action: "clk", 
            ev_title: "quick quote", 
            ev_data_one: "facebook share", 
            ev_data_two: pgName
        });         
    });
    //twitter media share
    $('.icon-parent .fa.fa-twitter-square').click(function(){
        utag.link({ 
            ev_type: "calc", 
            ev_action: "clk", 
            ev_title: "quick quote", 
            ev_data_one: "twitter share", 
            ev_data_two: pgName
        });                
    });
    //linkedin share
    $('.icon-parent .fa.fa-linkedin-square').click(function(){
        utag.link({ 
            ev_type: "calc", 
            ev_action: "clk", 
            ev_title: "quick quote", 
            ev_data_one: "linkedin share", 
            ev_data_two: pgName
        });                          
    });
}
/* Get a quote social media share ends here */
});