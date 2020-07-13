$(document).ready(function () {
    /* Carousel analytics starts here */
    //for home page only
    if($('title').text()=='Home'|| $('meta[name="template"]').attr('content')=='id-sunlife-home-page' ){
        //banner load
        function bannerLoadHK() {
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

/* Sign in modal analytics starts here */
//Tagging for Upon clicking the Sign In button
$("#SignIn,#signinbutton").unbind("click");
$("#SignIn,#signinbutton").click(function(){
    utag.link({
        ev_type: "authenticate",
        ev_action: "clk",
        ev_title: "sign in",
        ev_data_one: "existing client",
    });
});
$("#signIn").click(function() {
    var productDropDownVal = $('#id_sign_in').children('option:selected').text();
    utag.link({
        ev_type: "authenticate",
        ev_action: "clk",
        ev_title: "sign in",
        ev_data_one: productDropDownVal,
    });
});    
/* Sign in modal analytics end here */
/* get a quote analytics start here */
$("#get-a-quote-btn").click(function() {
    var productDropDownVal = $('#select-product').children('optgroup').children('option:selected').text();
    utag.link({
        ev_type: "other",
        ev_action: "clk",
        ev_title: "get a quote",
        ev_data_one: productDropDownVal
    });
});
/* get a quote analytics end here */
/* contact us analytics starts here */

    $(".contact-us .cmp-form-button").click(function(){
            setTimeout(
                function() {
                        if ($(".parsley-errors-list").hasClass("filled")) {
                            // Submit clicked tracked with error
                            if (typeof utag !== 'undefined') {
                                var errorMsgContactUs= $('.parsley-custom-error-message').text();
                                utag.link({ 
                                    ev_type: "other", 
                                    ev_action: "clk", 
                                    ev_title: "contact-us-form", 
                                    ev_data_one: "err:" + errorMsgContactUs
                                    })                     
                            }
                        }
                        else{
                             // Submit clicked tracked with no error
                            if (typeof utag !== 'undefined') {
                                utag.link({ 
                                    ev_type: "other", 
                                    ev_action: "clk", 
                                    ev_title: "contact-us-form", 
                                    ev_data_one: "successful submission"
                                    })        
                           }
                        }
                },
                1000);
        });
if(($(".titlebar .cmp-title__text").text()=='Contact us') || ($(".titlebar .cmp-title__text").text().toLowerCase()=='contact us')){
    $(".icon-parent .fa-facebook-square").click(function(){
        utag.link({ 
            ev_type: "other", 
            ev_action: "clk", 
            ev_title: "contact-us-form", 
            ev_data_one: "facebook share"
        });       
    });
    $(".icon-parent .fa-linkedin-square").click(function(){
        utag.link({ 
            ev_type: "other", 
            ev_action: "clk", 
            ev_title: "contact-us-form", 
            ev_data_one: "linkedin share"
        });             
    });
    $(".icon-parent .fa-twitter-square").click(function(){
        utag.link({ 
            ev_type: "ohter", 
            ev_action: "clk", 
            ev_title: "contact-us-form", 
            ev_data_one: "twitter share"
        });                     
    });
}
/* contact us analytics ends here *
/* Talk to an advisor form analytics starts here */
    $(".leadgen .cmp-form-button").click(function(){
            setTimeout(
                function() {
                        if ($(".parsley-errors-list").hasClass("filled")) {
                            // Submit clicked tracked with error
                            if (typeof utag !== 'undefined') {
                                var errorMsgContactUs= $('.parsley-custom-error-message').text();
                                utag.link({ 
                                    ev_type: "lead_form", 
                                    ev_action: "submit",                                     
                                    ev_title: "talk-to-an-advisor-lead-gen-form", 
                                    ev_data_one: "err:" + errorMsgContactUs
                                    })                     
                            }
                        }
                        else{
                             // Submit clicked tracked with no error
                            if (typeof utag !== 'undefined') {
                                utag.link({ 
                                    ev_type: "lead_form", 
                                    ev_action: "submit", 
                                    ev_title: "talk-to-an-advisor-lead-gen-form", 
                                    ev_data_one: "successful submission"
                                    })
                           }
                        }
                },
                1000);
        });

/* Talk to an advisor form analytics ends here */
/* desktop language and region bar cross button stopping analytics from core starts here */
    $(".desktop-region-language-menu-wrapper .sunLanguageCrossBtn").click(function(event){
        event.stopImmediatePropagation();
        $("#language-btn").attr('aria-expanded', 'false');
        $('#language-btn').removeClass('lang-true');
        $('.desktop-region-bar').removeClass('in');
    });
/* desktop language and region bar cross button stopping analytics from core ends here */
/* desktop search bar cross button stopping analytics from core starts here */
    $(".desktop-search-bar .close-div .fa-remove").click(function(event){
        event.preventDefault();
        event.stopImmediatePropagation();
        $("#sun-search").removeClass("in");
        $("#search-btn").attr('aria-expanded', 'false');
    });
/* desktop search bar cross button stopping analytics from core ends here */
/* Tabs Analytics starts here */
    $(".tabs-wrapper .cmp-tabs__tab").click(function(){
        let tab_group_name=$(".titlebar .cmp-title__text").text().toUpperCase();
        let tab_name=$(this).text().trim();
        utag.link({ 
            ev_type: "other", 
            ev_action: "clk", 
            ev_title: tab_group_name,
            ev_data_one: tab_name
        });
    });
/* tabs analytics ends here */
/* Education Budget Calculator starts here */
var selCountry,annualTution,annualExpence;
/*step 1*/
$(".step1_1 .grid_item").click(function(){
    selCountry=$(this).find('.name').text();
    utag.link({ 
        ev_type: "calc", 
        ev_action: "clk", 
        ev_title: "education budget calculator", 
        ev_data_one: "step 1:first interaction", 
        ev_data_two: "country="+selCountry
    });
});
/* step 2*/
$(".step1_2 button").find('span').parent().click(function(){
    annualTution=$(this).parent().parent().children('.needFeeWrapper').children('.needFee')[0];
    annualTution=$(annualTution).find('span').text();
    annualExpence=$(this).parent().parent().children('.needFeeWrapper').children('.needFee')[1];
    annualExpence=$(annualExpence).find('span').text();
    utag.link({ 
        ev_type: "calc", 
        ev_action: "clk", 
        ev_title: "education budget calculator", 
        ev_data_one: "step 2", 
        ev_data_two: "annual tuition fee="+annualTution+" :annual living expense="+annualExpence
    });
});
/* step 3*/
$(".step1_3 .buttonWrapper button span").parent().click(function(){
    var childAge=$(this).parent().parent().parent().find('.childAgeInput .inner .age').text();
    var eduSaving=$(this).parent().parent().parent().find('.savedAmountInput .ecsavingwrapper #ecsaving').val();
    var annualReturn=$(this).parent().parent().parent().find('.savedAmountInput .ecratewrapper #ecrate').val();
    utag.link({ 
        ev_type: "calc", 
        ev_action: "submit", 
        ev_title: "education budget calculator", 
        ev_data_one: "step 3:last interaction", 
        ev_data_two: "country="+selCountry+" :annual tuition fee= hkd "+annualTution+" :annual living expense= hkd "+annualExpence
        +" :child age="+childAge+" :education savings= hkd "+eduSaving+" :expected annual return="+annualReturn
    });
});
/* reset */
$("#eccalculator button.reset").click(function(){
    utag.link({ 
    ev_type: "calc", 
    ev_action: "clk", 
    ev_title: "education budget calculator", 
    ev_data_one: "reset"
    });
});
/* share */
$(".ecc_footer button.share").click(function(){
	utag.link({ 
        ev_type: "calc", 
        ev_action: "clk", 
        ev_title: "education budget calculator", 
        ev_data_one: "share the result"
    });
});
/* social media share */
if(($(".titlebar .cmp-title__text").text()=='Education budget calculator') || ($(".titlebar .cmp-title__text").text().toLowerCase()=='education budget calculator')){
    $(".icon-parent .fa-facebook-square").click(function(){
        utag.link({ 
            ev_type: "calc", 
            ev_action: "clk", 
            ev_title: "education budget calculator", 
            ev_data_one: "facebook share"
        });       
    });
    $(".icon-parent .fa-linkedin-square").click(function(){
        utag.link({ 
            ev_type: "calc", 
            ev_action: "clk", 
            ev_title: "education budget calculator", 
            ev_data_one: "linkedin share"
        });             
    });
    $(".icon-parent .fa-twitter-square").click(function(){
        utag.link({ 
            ev_type: "calc", 
            ev_action: "clk", 
            ev_title: "education budget calculator", 
            ev_data_one: "twitter share"
        });                     
    });
}
/* Education Budget Calculator ends here */
/* Investment Risk Assesment starts here */
if(($(".titlebar .cmp-title__text").text()=='Investment Risk Assessment') || ($(".titlebar .cmp-title__text").text().toLowerCase()=='investment risk assessment')){
   //continue button in modal
    $("#disclaimer-popup .slf-blue-button.btn-close").click(function(){
        utag.link({ 
            ev_type: "calc", 
            ev_action: "clk", 
            ev_title: "investment risk assessment", 
            ev_data_one: "disclaimer"
        });         
    });
    let ans1,ans2,ans3,ans4,ans5,ans6,ans7;
    /* input radio button value starts here */
    $(".js-inputs-section .inputs-animate").find('.js-inputs-question .form-group-radio li label').click(function(){
        if($(this).parent().children('input').attr('name')=='yearsTill65'){
            let year=$(this).text();
            ans1=year;
            utag.link({ 
                ev_type: "calc", 
                ev_action: "clk", 
                ev_title: "investment risk assessment",  
                ev_data_one: "step 1:first interaction", 
                ev_data_two: "years before turning 65="+year
            });
        }else if($(this).parent().children('input').attr('name')=='percentageSavings'){
            let mpfPercentage=$(this).text();
            ans2=mpfPercentage;
            utag.link({ 
                ev_type: "calc", 
                ev_action: "clk", 
                ev_title: "investment risk assessment", 
                ev_data_one: "step 2", 
                ev_data_two: "mpf investment percentage="+mpfPercentage
                });
        }else if($(this).parent().children('input').attr('name')=='investmentKnowledge'){
            let investKnowledge=$(this).text();
            ans3=investKnowledge;
            utag.link({ 
                ev_type: "calc", 
                ev_action: "clk", 
                ev_title: "investment risk assessment", 
                ev_data_one: "step 3",
                ev_data_two: "investment knowledge="+investKnowledge
            });               
        }else if($(this).parent().children('input').attr('name')=='otherSavings'){
            let otherSaving=$(this).text();
            ans4=otherSaving;
            utag.link({ 
                ev_type: "calc", 
                ev_action: "clk", 
                ev_title: "investment risk assessment", 
                ev_data_one: "step 4",
                ev_data_two: "other investment="+otherSaving
            });                              
        }else if($(this).parent().children('input').attr('name')=='expectedInvestmentReturn'){
            let expectedReturn=$(this).text();
            ans5=expectedReturn;
            utag.link({ 
                ev_type: "calc", 
                ev_action: "clk", 
                ev_title: "investment risk assessment", 
                ev_data_one: "step 5",
                ev_data_two: "annual return expectation="+expectedReturn
            });                                              
        }else if($(this).parent().children('input').attr('name')=='declineComfortablility'){
            let decline=$(this).text();
            ans6=decline;
            utag.link({ 
                ev_type: "calc", 
                ev_action: "clk", 
                ev_title: "investment risk assessment", 
                ev_data_one: "step 6",  
                ev_data_two: "annual capital decline expectation="+decline
            });                                                             
        }else if($(this).parent().children('input').attr('name')=='riskWillingness'){
            let riskWill=$(this).text();
            ans7=riskWill;
            utag.link({ 
                ev_type: "calc", 
                ev_action: "clk", 
                ev_title: "investment risk assessment", 
                ev_data_one: "step 7",  
                ev_data_two: "risk appetite="+riskWill
            });                                                                            
        }else{

        }
    });
    /* see my result click */
    $("#tool_main_1_4 .cta-button.js-btn-next").click(function(){
        if(ans1 && ans2&& ans3 && ans4 && ans5 && ans6 && ans7){
            utag.link({ 
                ev_type: "calc", 
                ev_action: "submit", 
                ev_title: "investment risk assessment", 
                ev_data_one: "step 8:last interaction",  
                ev_data_two: ans1+":"+ans2+":"+ans3+":"+ans4+":"+ans5+":"+ans6+":"+ans7
            });
            function valuation(){
                let outcome=$('.banner-text-heading #tolerance-level').text();
                utag.view({ 
                    ev_type: "calc", 
                    ev_action: "onpage_impr", 
                    ev_title: "investment risk assessment", 
                    ev_data_one: "result="+outcome, 
                    ev_data_two: ans1+":"+ans2+":"+ans3+":"+ans4+":"+ans5+":"+ans6+":"+ans7
                    });
            }
            setTimeout(valuation,500);
        }            
    });
    /* start over click */
    $("#results-buttons .js-btn-start-over").click(function(){
        utag.link({ 
            ev_type: "calc", 
            ev_action: "clk", 
            ev_title: "investment risk assessment", 
            ev_data_one: "start over"
        });           
    });
    $("#results-buttons .save").click(function(){
        utag.link({ 
            ev_type: "calc", 
            ev_action: "clk", 
            ev_title: "investment risk assessment", 
            ev_data_one: "print"
        });            
    });
    /* cta link click */
    $("#tool_cta .display-table span .cta-link").click(function(){
        if($(this).find('.nowrap').text().toLowerCase().trim()=='now'){
            utag.link({ 
                ev_type: "calc", 
                ev_action: "clk", 
                ev_title: "investment risk assessment", 
                ev_data_one: "retirement savings"
            });
        }else if($(this).find('.nowrap').text().toLowerCase().trim()=='products'){
            utag.link({ 
                ev_type: "calc", 
                ev_action: "clk", 
                ev_title: "investment risk assessment", 
                ev_data_one: "our pension products"
            });
        }else{
            utag.link({ 
                ev_type: "calc", 
                ev_action: "clk", 
                ev_title: "investment risk assessment", 
                ev_data_one: "mpf account consolidation"
            });
        }
    });
    /* social media starts here */
    $(".icon-parent .fa-facebook-square").click(function(){
        utag.link({ 
            ev_type: "calc", 
            ev_action: "clk", 
            ev_title: "investment risk assessment", 
            ev_data_one: "facebook share"
        });       
    });
    $(".icon-parent .fa-linkedin-square").click(function(){
        utag.link({ 
            ev_type: "calc", 
            ev_action: "clk", 
            ev_title: "investment risk assessment", 
            ev_data_one: "linkedin share"
        });             
    });
    $(".icon-parent .fa-twitter-square").click(function(){
        utag.link({ 
            ev_type: "calc", 
            ev_action: "clk", 
            ev_title: "investment risk assessment", 
            ev_data_one: "twitter share"
        });                     
    });
}
/* Investment Risk Assesment ends here */
/* Health Calculator starts here */
    /*start estimate */
    $("#startBtn.mcice__button.mcice__button-start").click(function(){
        utag.link({ 
            ev_type: "calc", 
            ev_action: "clk", 
            ev_title: "health calculator", 
            ev_data_one: "step 1:first interaction", 
            ev_data_two: "start estimate"
        });              
    });
    /* disclaimer */
    $(".mcice__section mcice__section-disclaimer .mcice__button mcice__button-toggle mcice__button-expand").click(function(){
        utag.link({ 
            ev_type: "calc", 
            ev_action: "clk", 
            ev_title: "health calculator", 
            ev_data_one: "disclaimer"
        });
    });
     /* next question of age */
    $(".mcice__section-question #nextAgeBtn").click(function(){
        let inputAge=$(".mcice__section-question #nextAgeBtn").parent().find(".mcice__question__circle #ageId").val();
        utag.link({ 
            ev_type: "calc", 
            ev_action: "clk", 
            ev_title: "health calculator", 
            ev_data_one: "step 1:first interaction", 
            ev_data_two: "age="+inputAge
        });           
    });
    /* next question of gender */
    let gender,smoker;
    $(".mcice__section-question .mcice__field-gender .mcice__field__radio label").click(function(){
        gender=$(this).text();  
    });
    $(".mcice__section-question #nextGenderBtn").click(function(){
        utag.link({ 
            ev_type: "calc", 
            ev_action: "clk", 
            ev_title: "health calculator", 
            ev_data_one: "step 2", 
            ev_data_two: "gender="+gender
        });
    });
    /* next question of smoker */
    $(".mcice__section-question .mcice__field-smoker .mcice__field__radio label").click(function(){
        smoker=$(this).text();              
    });
    /* for next page coverage loading starts here */
    function coverage(){
        utag.view({ 
            ev_type: "calc", 
            ev_action: "page_imp", 
            ev_title: "health calculator", 
            ev_data_one: "result", 
            ev_data_two: "age="+age+" :gender="+gender+" :smoker="+smoker
        });            
    }
    /* for next page coverage loading ends here */
    $(".mcice__section-question #coveregeNext").click(function(){ 
        setTimeout(coverage,500);      
        utag.link({ 
            ev_type: "calc", 
            ev_action: "submit", 
            ev_title: "health calculator", 
            ev_data_one: "step 3:last interaction", 
            ev_data_two: "smoker="+smoker
        });
    }); 
    /* reset click */     
    $("#resetBtn.mcice__button.mcice__button-reset").click(function(){
        utag.link({ 
            ev_type: "calc", 
            ev_action: "clk", 
            ev_title: "health calculator", 
            ev_data_one: "reset"
        });            
    });
    /*medical insurance click */
    $("#medicalIns.mcice__pill__button img:nth-child(2)").click(function(){
        utag.link({ 
            ev_type: "calc", 
            ev_action: "clk", 
            ev_title: "health calculator", 
            ev_data_one: "medical insurance"
        });            
    });
    /* request an advisor click */
    $("#requestAdwisor.mcice__cta-link").click(function(){
        utag.link({ 
            ev_type: "calc", 
            ev_action: "clk", 
            ev_title: "health calculator", 
            ev_data_one: "find an advisor", 
            ev_data_two: "age="+age+" :gender="+gender+":smoker="+smoker
        });            
    });
    /* social media sharing */
    if($(".titlebar .cmp-title__text").text().toLowerCase().match('health calculator')){
        $(".icon-parent .fa-facebook-square").click(function(){
            utag.link({ 
                ev_type: "calc", 
                ev_action: "clk", 
                ev_title: "health calculator", 
                ev_data_one: "facebook share"
            });       
        });
        $(".icon-parent .fa-linkedin-square").click(function(){
            utag.link({ 
                ev_type: "calc", 
                ev_action: "clk", 
                ev_title: "health calculator", 
                ev_data_one: "linkedin share"
            });             
        });
        $(".icon-parent .fa-twitter-square").click(function(){
            utag.link({ 
                ev_type: "calc", 
                ev_action: "clk", 
                ev_title: "health calculator", 
                ev_data_one: "twitter share"
            });                     
        });
    }


/* Health Calculator ends here */
/* talk to advisor form starts here */
    // talk to advisor click
    let talk;
    $(".cmp-tabs__tab").click(function(){
        talk='true';
        if($(this).text().toLowerCase().match('talk to an advisor')){
            utag.view({ 
                ev_type: "lead_form", 
                ev_action: "onpage_impr", 
                ev_title: "lead-gen-form", 
                ev_data_one: "form selected"
            });
        }        
    });
    // yes or no radio button
    $(".form-container-component .cmp-form-options__field.cmp-form-options__field--radio").click(function(){
        if(talk=='true'){
            let valOption=$(this).parent().find('span').text();
            utag.link({ 
                ev_type: "lead_form", 
                ev_action: "clk", 
                ev_title: "lead-gen-form", 
                ev_data_one: "existing client="+valOption
            });
        }                
    });
    // advisor form submission
    $(".cmp-form-button[value='submit']").click(function(){
        if(talk=='true'){
            utag.link({ 
                ev_type: "lead_form", 
                ev_action: "submit", 
                ev_title: "lead-gen-form", 
                ev_data_one: "successful submission"
            });
            talk='';
        }                    
    });
/* talk to advisor form ends here */
/* Product cards starts here */
    $(".product-cards .thumbnail").click(function(){
        let productTitle=$(this).find('.product-name').text();
        utag.link({ 
            ev_type: "other", 
            ev_action: "clk", 
            ev_title: "product-array-lvl3-"+productTitle
        });            
    });
/* Products cards ends here */
/* Mobile App Banner starts here */
//on-loading of mobile app banner
if(($(".titlebar .cmp-title__text").text()=='My Sun Life Indonesia app') || ($(".titlebar .cmp-title__text").text().toLowerCase()=='my sun life indonesia app')){
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
/* mpf Fund Proccess starts here */
    // show funds button click
    $("#show-fund-btn").click(function(){
        let mpfScheme=$("#scheme-list-dropdown option:selected").text().toLowerCase();
        utag.link({ 
            ev_type: "other", 
            ev_action: "clk", 
            ev_title: "fund prices and performance", 
            ev_data_one: "scheme selected="+mpfScheme+" :item=show funds"
        });           
    });
    // fund price tab clicks
    $(".cmp-tabs__tablist .cmp-tabs__tab").click(function(){
        let fundTitle=$(".titlebar .cmp-title__text").text().toLowerCase();
        let fundTab=$(this).text().toLowerCase();
        if(fundTitle.indexOf('mpf fund prices') != -1){ 
            utag.link({
                ev_type: "other", 
                ev_action: "clk", 
                ev_title: "fund prices and performance", 
                ev_data_one: "tab selected="+fundTab
            });
        }                       
    });
    /* mpf Fund Proccess ends here */
    /* Bright Solution analytics starts here */
    // Global variable
    var advsleadClk = false;
    //get product name from current page.
    function getProductName() {
        var productName = "";
        var breadcrumbPathArr = utag_data.page_breadcrumb.split("/");
        productName = breadcrumbPathArr[breadcrumbPathArr.length - 1].trim().replace(/ /g, "_");
        return productName;
    }
    //tagging for bright curator submit
    $("#bc_submit a").click(function() {
        var firstDrop = $('#bc_q1_1_ans_select_1').children('option:selected').val();
        var secondDrop = $('#bc_q2_1_ans_select_1').children('option:selected').val();
        if (secondDrop == "") {
            secondDrop = $('#bc_q2_1_ans_select_2').children('option:selected').val();
        }
        //Tagging for submit click when Employee selected
        var homePage = getProductName();
        if (homePage == "home" || homePage == "bright_solutions") {
            if (firstDrop == "Get protected") {
                if (typeof utag !== 'undefined') {
                    utag.link({
                        ev_type: "calc", 
                        ev_action: "submit", 
                        ev_title: "bright curator", 
                        ev_data_one: "step 3:last interaction", 
                        ev_data_two: "i would like to=" +firstDrop+ ":my purpose="+ secondDrop

                    });
                }
            } 
            else if (firstDrop == "Plan my future") {
                //Tagging for submit click when myself or family selected
                if (secondDrop != "") {
                    if (typeof utag !== 'undefined') {
                        utag.link({
                            ev_type: "calc",
                            ev_action: "submit",
                            ev_title: "bright curator",
                            ev_data_one: "step 3:last interaction",
                            ev_data_two: "coverage=myself or family:product interest=" + secondDrop + ""
                        });
                    }
                }
            } 

            advsleadClk = true;
            localStorage.setItem("someVarKey", advsleadClk);
            localStorage.setItem("brightValue1", firstDrop);
            localStorage.setItem("brightValue2", secondDrop);
        }

    });
    var AdvisorFag = localStorage.getItem("someVarKey");
    var firstDroopp = localStorage.getItem("brightValue1");
    var secondDroopp = localStorage.getItem("brightValue2");
    //Tagging for Find And Advisor
    $(".right-navigation-wrapper a").click(function() {
        var clickText = $(this).children('span').text();
        if(clickText == "Talk to our Advisor" || (clickText.toLowerCase()=='talk to our advisor')){
            //Clicking submit button and Find And Advisor 
            var homePage = getProductName();
            if (homePage == "home" || homePage == "bright_solutions") {
                if (AdvisorFag == "true") {
                    //Tagging for submit click when Employee selected
                    //For id
                    if (firstDroopp == "Get protected") {
                        if (typeof utag !== 'undefined') {
                            utag.link({ 
                                ev_type: "calc", 
                                ev_action: "submit", 
                                ev_title: "bright curator", 
                                ev_data_one: "find an advisor", 
                                ev_data_two: "i would like to= " +firstDroopp +" :my purpose= " + secondDroopp
                            })   
                        }
                    } 
                    else if (firstDroopp == "Plan my future") {
                        //Tagging for submit click when myself or family selected
                        if (secondDroopp != "") {
                            if (typeof utag !== 'undefined') {
                                utag.link({
                                    ev_type: "calc", 
                                    ev_action: "submit", 
                                    ev_title: "bright curator", 
                                    ev_data_one: "find an advisor", 
                                    ev_data_two: "i would like to= " +firstDroopp +" :my purpose= " + secondDroopp
                                });
                            }
                        }
                    } 
                    localStorage.setItem("brightPage", true);
                } // advsleadClk == false End
            }
        }
    });
    //facebook share
    $(".icon-parent .fa-facebook-square").click(function(){
        var homePage = getProductName();
        if (homePage == "home" || homePage == "bright_solutions") {
            utag.link({ 
                ev_type: "calc",
                ev_action: "clk",
                ev_title: "bright curator",
                ev_data_one: "facebook share"
            });     
        }  
    });
    //twitter share
    $(".icon-parent .fa-twitter-square").click(function(){
        var homePage = getProductName();
        if (homePage == "home" || homePage == "bright_solutions") {
            utag.link({ 
                ev_type: "calc",
                ev_action: "clk",
                ev_title: "bright curator",
                ev_data_one: "twitter share"
            });     
        }  
    });
    //linkedin share
    $(".icon-parent .fa-linkedin-square").click(function(){
        var homePage = getProductName();
        if (homePage == "home" || homePage == "bright_solutions") {
            utag.link({ 
                ev_type: "calc",
                ev_action: "clk",
                ev_title: "bright curator",
                ev_data_one: "linkedin share"
            });     
        }  
    });
    /* Bright Solution analytics ends here */
    /* lead gen form starts here */
    $("#advisor-modal-submit-btnContact").click(function() {
        let brightPage=localStorage.getItem("brightPage");
        let brightValue=localStorage.getItem('brightValue1');
        let brightSecondValue=localStorage.getItem('brightValue2');
        function localClean(){
            localStorage.removeItem('brightPage');
            localStorage.removeItem('brightValue1');
            localStorage.removeItem('brightValue2');
        }
        if (brightPage) {
            /* reditrecting from bright Solution */
            // Submit clicked tracked with error
            if ($(".parsley-errors-list").hasClass("filled")) {
                utag.link({ 
                    ev_type: "lead_form", 
                    ev_action: "submit", 
                    ev_title: "talk-to-an-advisor-lead-gen-form", 
                    ev_data_one: "error"
                });                    
                // parsley-errors-list finished 
            } else if(brightValue.toLowerCase()=='employee') {
                /* first value is employee */
                utag.link({ 
                    ev_type: "lead_form", 
                    ev_action: "submit", 
                    ev_title: "talk-to-an-advisor-lead-gen-form", 
                    ev_data_one:  "successful submission:tool referrer=bright solutions", 
                    ev_data_two: "coverage=employee"
                });
                localClean();                
            }
            else{
                /* first value is family */
                utag.link({ 
                    ev_type: "lead_form", 
                    ev_action: "submit", 
                    ev_title: "talk-to-an-advisor-lead-gen-form", 
                    ev_data_one:  "successful submission:tool referrer=bright solutions", 
                    ev_data_two: "coverage=myself or family:product interest="+brightSecondValue.toLowerCase()
                }); 
                localClean();               
            }
            // normal lead-gen-form submit button click
        } else {
            if ($(".parsley-errors-list").hasClass("filled")) {
                // Submit clicked tracked with error
                utag.link({
                    ev_type: "lead_form",
                    ev_action: "submit",
                    ev_title: "talk-to-an-advisor-lead-gen-form",
                    ev_data_one: "error"
                });
            } else {
                // Submit clicked tracked with no error
                utag.link({ 
                    ev_type: "lead_form", 
                    ev_action: "submit", 
                    ev_title: "talk-to-an-advisor-lead-gen-form", 
                    ev_data_one: "successful submission"
                });
                localClean();                    
            }
        }
    });
    /* lead gen form ends here */

});
