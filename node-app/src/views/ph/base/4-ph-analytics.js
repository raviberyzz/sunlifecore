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
    if(productTitle=='english' || productTitle=='home'){
        //banner load
        function bannerLoadPH() {
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
        setInterval(carouselCycle,time);
        bannerLoadHK();
    }
    /* Carousel analytics ends here */
    /* contact form starts here */
    // window.Parsley.on('field:error', function() {
    //     // This global callback will be called for any field that fails validation.
    //     console.log('Validation failed for: ', this.$element[0]);
    //   });
    /* contact form ends here */
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
//on clicking download button
$("#mobile-app-banner.smartbanner .java-button .smartbanner__button__label").click(function(){
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
/* Mobile App Banner ends here */
});
/* Successful modal login starts here */
function successLoginAnalytics(){
    utag.link({ 
        ev_type: "authenticate", 
        ev_action: "clk", 
        ev_title: "sign in", 
        ev_data_one: "login successful"
    }); 
}
/* Successful modal login ends here */