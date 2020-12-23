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
    /*Modal link starts here */
    $("#form_signon .moreon a").click(function(){
        let linkName=$(this).text();
        utag.link({ 
            ev_type: "authenticate", 
            ev_action: "clk", 
            ev_title: "sign in", 
            ev_data_one: linkName
        });        
    });
    /*Modal link here */
    /* Sign in modal analytics ends here */
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
/* contact-us form analytics starts here */
// tab click starts here 
    $(".cmp-tabs__tablist .cmp-tabs__tab").click(function(){
        let tabName=$(this).text();
        if(tabName.trim().toLowerCase().match('khách hàng')){
            utag.view({ 
                ev_type: "other", 
                ev_action: "onpage_impr", 
                ev_title: "contact-form-client", 
                ev_data_one: "role=client"
            });               
        }else if(tabName.trim().toLowerCase().match('tư vấn tài chính')){
            utag.view({ 
                ev_type: "other", 
                ev_action: "onpage_impr", 
                ev_title: "contact-form-client", 
                ev_data_one: "role=advisor"
            });            
        }else if(tabName.trim().toLowerCase().match('khách hàng cá nhân')){
            utag.view({ 
                ev_type: "lead_form", 
                ev_action: "clk", 
                ev_title: "corp-client-lead-gen-form", 
                ev_data_one: "ind client tab"
            });            
        }else if(tabName.trim().toLowerCase().match('khách hàng doanh nghiệp')){
            utag.view({ 
                ev_type: "lead_form", 
                ev_action: "clk", 
                ev_title: "corp-client-lead-gen-form", 
                ev_data_one: "corp client tab"
            });              
        }
    });
    //form submit starts here
    /* khach hang form */
    $('form#contactus-modal-form #submitContact').click(function(){
        setTimeout(function(){
        let subVal=$("#contactus-modal-form select[name='slf-contact-subject'] option:selected").text();
        if($("#contactus-modal-form .parsley-errors-list.filled").length>0){
            let contactError='';
            let totalError=$("form#contactus-modal-form .parsley-errors-list.filled").length;
            if(totalError>0){
                $("form#contactus-modal-form .parsley-errors-list.filled").each(function(index,item){
                    contactError+=':'+$(this).find('li').text();
                    if(index==totalError-1){
                        console.log(contactError);
                        utag.link({ 
                            ev_type: "other", 
                            ev_action: "clk", 
                            ev_title: "contact-form-client", 
                            ev_data_one: "err"+contactError,
                            ev_data_two: "subject="+subVal
                        });                             
                    }
                });
            }
        }else{
            utag.link({ 
                ev_type: "other", 
                ev_action: "clk", 
                ev_title: "contact-form-client", 
                ev_data_one: "successful submission",
                ev_data_two: "subject="+subVal
            });            
        }
    },500);
    });
    //tu van form
    $('form#advisor-modal-form #advisor-modal-submit-btn1').click(function(){
        setTimeout(function(){
        let subVal=$("#advisor-modal-form select[name='contactus-advisor-enquiry-subject'] option:selected").text();
        if($("#advisor-modal-form .parsley-errors-list.filled").length>0){
            let contactError='';
            let totalError=$("form#advisor-modal-form .parsley-errors-list.filled").length;
            if(totalError>0){
                $("form#advisor-modal-form .parsley-errors-list.filled").each(function(index,item){
                    contactError+=':'+$(this).find('li').text();
                    if(index==totalError-1){
                        console.log(contactError);
                        utag.link({ 
                            ev_type: "other", 
                            ev_action: "clk", 
                            ev_title: "contact-form-client", 
                            ev_data_one: "err"+contactError,
                            ev_data_two: "subject="+subVal
                        });                                                         
                    }
                });
            }
        }else{
            utag.link({ 
                ev_type: "other", 
                ev_action: "clk", 
                ev_title: "contact-form-client", 
                ev_data_one: "successful submission",
                ev_data_two: "subject="+subVal
            });                            
        }
    },500);
    });
/* contact-us form analytics ends here */
/* Product lead gen form starts here */
    $('form#leadgen #submitContactLeadgen').click(function(){
        setTimeout(function(){
            let location=$("#leadgen select[name='location-dropdown'] option:selected").text();
            if($("#leadgen .parsley-errors-list.filled").length>0){
                let contactError='';
                let totalError=$("form#leadgen .parsley-errors-list.filled").length;
                if(totalError>0){
                    $("form#leadgen .parsley-errors-list.filled").each(function(index,item){
                        contactError+=':'+$(this).find('li').text();
                        if(index==totalError-1){
                            console.log(contactError);
                            utag.view({ 
                                ev_type: "lead_form", 
                                ev_action: "submit", 
                                ev_title: "product-lead-gen-form", 
                                ev_data_one: "err"+contactError,
                                ev_data_two: "location="+location
                            });                                                         
                        }
                    });
                }
            }else{
                utag.view({ 
                    ev_type: "lead_form", 
                    ev_action: "submit", 
                    ev_title: "product-lead-gen-form", 
                    ev_data_one: "successful submission",
                    ev_data_two: "location="+location
                })  ;                          
            }
        },500);
    });
/* Product lead gen form ends here */
/* Individual client lead gen form starts here */
// Cá nhân form starts here
    $('form#leadgen-individual-client-form #leadgen-indv-client-submit').click(function(){
        setTimeout(function(){
            let age=$("#leadgen-individual-client-form select[name='leadgen-indv-client-age-group'] option:selected").text();
            let gender=$("#leadgen-individual-client-form").find("input[type=radio]:checked").siblings().text().trim();
            let insurance=$("#leadgen-individual-client-form select[name='leadgen-indv-client-need'] option:selected").text();
            let location=$("#leadgen-individual-client-form select[name='leadgen-indv-client-location'] option:selected").text();
            if($("#leadgen-individual-client-form .parsley-errors-list.filled").length>0){
                let contactError='';
                let totalError=$("form#leadgen-individual-client-form .parsley-errors-list.filled").length;
                if(totalError>0){
                    $("form#leadgen-individual-client-form .parsley-errors-list.filled").each(function(index,item){
                        contactError+=':'+$(this).find('li').text();
                        if(index==totalError-1){
                            console.log(contactError);
                            utag.link({ 
                                ev_type: "lead_form", 
                                ev_action: "submit", 
                                ev_title: "ind-client-lead-gen-form", 
                                ev_data_one: "err"+contactError,
                                ev_data_two: 'age='+age+':gender='+gender+':insurance='+insurance+':location='+location
                            });                                                                                       
                        }
                    });
                }
            }else{
                utag.link({ 
                    ev_type: "lead_form", 
                    ev_action: "submit", 
                    ev_title: "ind-client-lead-gen-form", 
                    ev_data_one: "successful submission",
                    ev_data_two: 'age='+age+':gender='+gender+':insurance='+insurance+':location='+location
                });                                           
            }
        },500);
    });
// Doanh nghiệp form starts here	
    $('form#leadgen-corporate-client-form #leadgen-corp-client-submit').click(function(){
        setTimeout(function(){
            let size=$("#leadgen-corporate-client-form select[name='leadgen-corp-client-size'] option:selected").text();
            let insurance=$("#leadgen-corporate-client-form select[name='leadgen-corp-client-need'] option:selected").text();
            let location=$("#leadgen-corporate-client-form select[name='leadgen-corp-client-location'] option:selected").text();
            if($("#leadgen-corporate-client-form .parsley-errors-list.filled").length>0){
                let contactError='';
                let totalError=$("form#leadgen-corporate-client-form .parsley-errors-list.filled").length;
                if(totalError>0){
                    $("form#leadgen-corporate-client-form .parsley-errors-list.filled").each(function(index,item){
                        contactError+=':'+$(this).find('li').text();
                        if(index==totalError-1){
                            console.log(contactError);
                            utag.link({ 
                                ev_type: "lead_form", 
                                ev_action: "submit", 
                                ev_title: "corp-client-lead-gen-form", 
                                ev_data_one: "err"+contactError,
                                ev_data_two: 'insurance='+insurance+':size='+size+':location='+location
                            });                                                                                                                  
                        }
                    });
                }
            }else{
                utag.link({ 
                    ev_type: "lead_form", 
                    ev_action: "submit", 
                    ev_title: "corp-client-lead-gen-form", 
                    ev_data_one: "successful submission",
                    ev_data_two: 'insurance='+insurance+':size='+size+':location='+location
                });                                                           
            }
        },500);
    });
/* Individual client lead gen form ends here */
});