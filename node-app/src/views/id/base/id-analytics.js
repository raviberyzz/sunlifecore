$(document).ready(function () {
    /* Carousel analytics starts here */
    if(".carousel-wrapper"){
        $(".cmp-carousel__item").each(function(){
            var bannerPosition=$(this).index()+1;
            var bannerTitleText=$(this).find(".right-item.text-section").text();
            utag.link({ 
                ev_type: "ad", 
                ev_action: "onpage_impr", 
                ev_title:	bannerTitleText, 
                ev_data_one: "banner position="+bannerPosition
                });           
        });
        $(".cmp-carousel__item").click(function(){
			var bannerPosition=$(this).index()+1;
            var bannerTitleText=$(this).find(".right-item.text-section").text();
            utag.link({ 
            ev_type: "ad", 
            ev_action: "clk", 
            ev_title: bannerTitleText,
            ev_data_one: "banner position="+bannerPosition
            });
        })
    }
    /* Carousel analytics ends here */

/* Sign in modal analytics starts here */
$("#SignIn,#signinbutton").click(function(){
    utag.link({ 
        ev_type: "authenticate", 
        ev_action: "clk", 
        ev_title: "sign in", 
        ev_data_one: "existing client"
});
    });
    $('#id_sign_in').on('change', function() {
        var dropdown=$('#id_sign_in').text();
        utag.link({ 
            ev_type: "authenticate", 
            ev_action: "clk", 
            ev_title: "sign in", 
            ev_data_one: "Selected dropdown= " +dropdown
            });              
    });      
/* Sign in modal analytics starts here */
/* contact us analytics starts here */
if(($(".titlebar .cmp-title__text").text()=='Contact us') || ($(".titlebar .cmp-title__text").text().toLowerCase()=='contact us')){
    $(".cmp-form-button").click(function(){
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
/* contact us analytics ends here */
/* Talk to an advisor form analytics starts here */
if(($(".titlebar .cmp-title__text").text()=='Your nearest Sun Life') || ($(".titlebar .cmp-title__text").text().toLowerCase()=='your nearest sun life')){
    $(".form-container-component .cmp-form-button").click(function(){
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
}
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
                ev_data_one: " ", 
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
        let num=$("#mcice .mcice__section-question .mcice__steps .mcice__indicator-active").text().trim();
        if(num==1){
            let inputAge=$(".mcice__section-question #nextAgeBtn").parent().find(".mcice__question__circle #ageId").val();
            utag.link({ 
                ev_type: "calc", 
                ev_action: "clk", 
                ev_title: "health calculator", 
                ev_data_one: "step 1:first interaction", 
                ev_data_two: "age="+inputAge
            });
        }            
    });
    /* next question of gender */

/* Health Calculator ends here */

    /* Product card starts here */
    $(".product-cards").click(function(){
        utag.link({ 
        ev_type: "other", 
        ev_action: "clk", 
        ev_title: "product-array-lvl3- clicked ="+$(this).text()
        });
    });
/*  Product card ends here */
});