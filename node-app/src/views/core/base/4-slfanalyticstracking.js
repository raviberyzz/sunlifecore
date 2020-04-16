$(document).ready(function () {

    /* Global Variable defining starts here*/
    
    var _locationBreadcrumb=utag_data.page_breadcrumb;
    var _pageLanguage=' ';
    if(utag_data.page_language){
        _pageLanguage=utag_data.page_language;
    }
    if(utag_data.page_breadcrumb && (_locationBreadcrumb=="/Home" || _locationBreadcrumb=="/Home/Welcome to Sun Life Financial")){
            var utmSource="slfca-hp";
    }
    else{
        var utmSource="slfca";
    }
    var _pageCannonicalURL=' ';
    if(utag_data.page_canonical_url_default){   
        _pageCannonicalURL=utag_data.page_canonical_url_default;
    }
    var _searchPageInputTerm='';
    var _searchFilterItem='';
    var _searchFilterItemResult='';
    var _windowLoaction=$(location).attr('pathname');
    
    /* Global Variable defining ends here*/
    
    // search bar analytics starts here
    // Desktop search analytics starts here
        $('#search-btn').click(function () {
            if (($(this).attr('aria-expanded') == undefined) || ($(this).attr('aria-expanded') == "false")) {
                utag.link({ "ev_type" : "other","ev_action" : "clk","ev_title" : "search module expansion"});
                //console.log("search exapansion tracked");
            } 
            else {
                //console.log("search expansion is not tracked");
            }
        });
        $('.search-bar-wrapper button').click(function(){
            var desktop_search_input=$('.search-bar-wrapper .global-search .input-wrapper input').val();
            utag.link({ "ev_type" : "other","ev_action" : "clk","ev_title" : "search module-search","ev_data_one" : desktop_search_input});
        });
        // Desktop search analytics ends here
        // Mobile search analytics starts here
        $('.search-icon-mobile').click(function () {
            var mobile_search_input=$('.hamburger-search .input-wrapper input').val();
            utag.link({"ev_type" : "other","ev_action" : "clk","ev_title" : "search module-search","ev_data_one" : mobile_search_input});
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
    
    // For Home Page Only
    function SignInHomeButton(){
        utag.link({
            "asset_type"	: "Module",
            "asset_title"	: "Sign In - Main",
            "event_type"	: "Click",
            "canonical_url" : _pageCannonicalURL,
            "event_title"	: "Sign In",
            "page_section" : "Homepage main signin"
        });
    }
    
    $('#signinbutton').click(function(){
        //alert('Inside signinbutton');    
        utag.link({
            "ev_action": "clk",
              "ev_title": "sign in modal",
              "ev_type": "other"
      });
        if(utag_data.page_breadcrumb && (_locationBreadcrumb=="/Home" || _locationBreadcrumb=="/Home/Welcome to Sun Life Financial")){
            SignInHomeButton();
        } 
        //setTimeout(signinmodal,200);
    })
    
    
    // Sign In Module (Desktop Sign In button) analytics ends here
    
    // Sign In Modal (Mobile Sign In button) analytics starts here
    $('#SignIn').click(function(){
        utag.link({
            "ev_action": "clk",
              "ev_title": "sign in modal",
              "ev_type": "other"
      });	
        if(utag_data.page_breadcrumb && (_locationBreadcrumb=="/Home" || _locationBreadcrumb=="/Home/Welcome to Sun Life Financial")){
            SignInHomeButton();
        }
       // setTimeout(signinmodal,200);
    });
    // Sign In Modal (Mobile Sign In button) analytics ends here
    
    // Sign In Modal (Sign-in-modal expansion) analytics starts here
    function signinmodal() {
        if ($('#signin-widget-modal').hasClass('in')){
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
                "canonical_url" : _pageCannonicalURL,
                "event_title"	: "Error-" + "Expanding not tracked",
                "page_section" : "Modal"});
                //console.log("mobile sign in module expanding is not being tracked")
                if(utag_data.page_breadcrumb && (_locationBreadcrumb=="/Home" || _locationBreadcrumb=="/Home/Welcome to Sun Life Financial")){
                    SignInHomePageError();
                }                  
        }
    }
    // Home page only
    function SignInHomePageError(){
        utag.link({
            "asset_type"	: "Module",
            "asset_title"	: "Sign In - Main",
            "event_type"	: "On Page Impression",
            "canonical_url" : _pageCannonicalURL,
            "event_title"	: "Error-" + "Expanding not tracked",
            "page_section" : "Homepage main signin"
        });
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
    function rightNavAnalytics(btnTxt1){
        var btnTxt=$.trim(btnTxt1);
        utag.link({
            "asset_type"	: "Module",
            "asset_title"	: "CTA Module",
            "event_type"	: "Click",
            "event_title"	: btnTxt,
            "page_section" : "Right Rail"
        });
        var adv='advisor';
        if ((btnTxt == 'search') || (btnTxt == 'Search') || (btnTxt.indexOf(adv) != -1)){
            utag.link({
            "utm_source":utmSource, //[INSERT LOCATION OF WIDGET, slfca-hp for homepage]
            "utm_medium":"pcwidget", //[INSERT TYPE OF LINK pcwidget for widget]
            "utm_content":_pageLanguage, //[INSERT CORRECT LANGUAGE en-ca or fr-ca]
            "utm_campaign":"slfca"
            });
        }
    } 
    $('.right-navigation-wrapper .light-orange .button-class').click(function(){
        var btnTxt1=$(this).parent().text();
        rightNavAnalytics(btnTxt1);
    });
    /* For form-button */
        $('.right-navigation-wrapper .cmp-form-button').click(function(){   
        var btnTxt2=$(this).text();
        rightNavAnalytics(btnTxt2);
        });
    /* For dropdown */
    $('.cmp-form-options--drop-down').siblings().children('.cmp-form-button').click(function(){
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
    
    // CTA Analytics starts here
    
    // CTA Dual starts here
    
    $('.global-module-content-cta-box').find('a').each(function(){
        var linkclicked="";
            $(this).click(function(){
                if($(this).has('img').length>0){
                linkclicked=$(this).find('img').attr('alt');
                }else{
                        linkclicked= $(event.target).text();
                    }
            //console.log('event tracked successfully with name-'+linkclicked);
            utag.link({"asset_type"	: "Module","asset_title"	: "Global Module CTA Box","event_type"	: "Click","event_title"	: linkclicked,"page_section" : "Global Module CTA Box"});
            });
    });
    
    // CTA Dual ends here
    
    // CTA Triple Home Page starts here
    $('#locate-advisors .cmp-form-button').click(function(){
        if ($("#locate-advisors").parsley({}).isValid()) {
            try {
                utag.link({ev_type: "other", ev_action: "clk", ev_title: "homepage - find_an_advisor_module"});
            } catch (e) {
                console.log("the error is "+e);
            }
        }
    });
    
    $('#get-a-quote .cmp-form-button').click(function(){
        if ($("#get-a-quote").parsley({}).isValid()) {
            // get the short name for the selected option
            var shortName =  $('#get-a-quote .cmp-form-button').parent().siblings('.options').find('select :selected').attr('data-shortname');
            try {
                utag.link({ev_type: "other", ev_action: "clk", ev_title: "homepage - get_a_quote_module - " + shortName});
            } catch (e) {
                console.log("the error is "+e);
            }
        }
    
    });
    
    $('#cta-provider-search .cmp-form-button').click(function(){
        if ($("#cta-provider-search").parsley({}).isValid()) {
            var textValue = $('#cta-provider-search .cmp-form-button').parent().siblings('.options').find('select :selected').val();
            var groupLabel = $('#cta-provider-search .cmp-form-button').parent().siblings('.options').find('select :selected').parent('optgroup').attr('label');
            try {
                utag.link({ev_type: "other", ev_action: "clk", ev_title: "provider search - homepage preselect", ev_data_one: groupLabel + "_" + textValue});
            } catch (e) {
                console.log("the error is "+e);
            }
        }
    });
    
    
    
    // CTA Triple Home Page ends here
    
    // CTA Analytics ends here
    
    //Tabs analytics starts here
    $('.tabs-wrapper .phone-numbers').click(function(){
       var phone= $(this).html();
       var tab_name=$('.tabs-wrapper .cmp-tabs__tab--active').html();
       utag.link({
        "asset_type"	: "Text",
        "asset_title"	: phone,
        "event_type"	: "Click",
        "event_title"	: "Dial Number",
        "page_section" : tab_name
    });
    
    });
    
    //Tabs analytics ends here
    
    // Phone No General Analytics starts here //
        $('.phone-numbers').click(function(){
            var phoneNumber=$(this).text();
           /* utag.link({
                "asset_type"	: "Text",
                "asset_title"	: phoneNumber,
                "event_type"	: "Click",
                "event_title"	: "Dial Number",
                "page_section" : "Contact Us Section"
            }); */    
                utag.link({
                    "ev_type"		: "other",
                    "ev_action"		: "clk",
                    "ev_title"		: "Click Phone Number",
                    "ev_data_two"	: phoneNumber
                });
        })
    // Phone No General Analytics ends here //
    
    //Related Articles Analytics starts here//
    $('.editorial-articles-wrapper .right-item a').click(function(){
        value=$(this).text();
    //alert(value);
            utag.link({
                "ev_action"		: "clk",
                "ev_data_one" 	: "related articles",
                "ev_data_two"	: value,
                  "ev_title"		: "related articles",
                  "ev_type"		: "others"
            });
            //console.log("mobile sign in module expanding is being tracked successfully");        
        });	
    //Related Articles Analytics ends here//
    
    // Search Page Analytics starts here //
    if ((_windowLoaction.indexOf("search-result") >= 0) || (_windowLoaction.indexOf("search+result") >=0) || (_windowLoaction.indexOf("search-results") >= 0) || (_windowLoaction.indexOf("search+results") >= 0) || (_windowLoaction.indexOf("html-component") >= 0)){
        if('.search-container'){
            function searchPageVariable(){
                _searchPageInputTerm=$('.search-container .form-group-wrapper input').val();
                //console.log(_searchPageInputTerm);
                _searchFilterItem=$('.search-container .check-container').find('.active').find('.txt').text();
                _searchFilterItemResult=$('.search-container .check-container').find('.active').find('.num').text();
            }
            /* suggestion search_typeahead_text click analytics starts here */
            $('.search-container .search-autocomplete').click(function(){
                localStorage.setItem("searchComplete","true");
            });
            if (localStorage.getItem("searchComplete") === 'true') {
                function searAutoComplete(){
                    searchPageVariable();  
                    //alert(_searchFilterItemResult+"+"+_searchFilterItem+"+"+_searchPageInputTerm);               
                    utag.link({ 
                        ev_type: "other", 
                        ev_action: "clk", 
                        ev_title: "onsite search_typeahead_text", 
                        ev_data_one: "search_count="+_searchFilterItemResult+":search_filter="+_searchFilterItem, 
                        page_search_term: _searchPageInputTerm
                    });
                    localStorage.setItem("searchComplete","false");
                }
                setTimeout(searAutoComplete,1000);    
            }       
            /* suggestion search_typeahead_text click analytics starts here */
            /* Filter search_filter trigger analytics starts here */
            $('#search-result-filters #search-result-filter-list').click(function(){
                localStorage.setItem("searchFilter","true");
            });
            if (localStorage.getItem("searchFilter") === 'true') {
                function searchPageFilter(){
                    searchPageVariable();
                    utag.link({ 
                        ev_type: "other", 
                        ev_action: "clk", 
                        ev_title: "onsite search_filter", 
                        ev_data_one: "search_count="+_searchFilterItemResult+":search_filter="+_searchFilterItem, 
                        page_search_term: _searchPageInputTerm
                    }); 
                    localStorage.setItem("searchFilter","false");
                }
                setTimeout(searchPageFilter,1000);
            }
            /* Filter search_filter trigger analytics ends here */
            /* search_client input Search button trigger analytics starts here */
            $('.search-container .slf-search .button-wrapper button').click(function(){
                localStorage.setItem("searButtonClick","true");      
            });
            if (localStorage.getItem("searButtonClick") === 'true') {
                function abc(){
                    searchPageVariable();
                    //console.log(_searchPageInputTerm);
                    utag.link({ 
                        ev_type: "other", 
                        ev_action: "clk", 
                        ev_title: "onsite search_client input", 
                        ev_data_one: "search_count="+_searchFilterItemResult+":search_filter="+_searchFilterItem, 
                        page_search_term: _searchPageInputTerm
                    });
                    localStorage.setItem("searButtonClick","false");
                }
                setTimeout(abc,800);     
            }    
            /* search_client input Search button trigger analytics starts here */
        }
    }
    // Search Page Analytics ends here //
    
    });