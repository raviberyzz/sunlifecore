$(document).ready(function () {

    // applying z-index for over lapping search result 
    // applying z-index for over lapping search result 
    if ($(window).width() > 767 && $(window).width() < 1024) {
        if($('.advisorhub-sunlife-home-page .search').length > 0) {
            if ($('.advisorhub-sunlife-home-page .search').siblings('.layout-container.editorial-articles-wrapper.mb-40').children('.row.flex-height').children('.col-sm-4').children('.container-component').children('.cmp-container').children('.teaser').length > 0) {
                $('.advisorhub-sunlife-home-page .search').siblings('.layout-container.editorial-articles-wrapper.mb-40').children('.row.flex-height').children('.col-sm-4').children('.container-component').children('.cmp-container').children('.teaser').css ('z-index', -1);
            }
        }
            if ($('.advisorhub-sunlife-content-page .search').siblings('.layout-container').children('.row').children('.col-md-9').length > 0) {
        $('.advisorhub-sunlife-content-page .search').siblings('.layout-container').children('.row').children('.col-md-9').css ('position', 'unset');
		$('.advisorhub-sunlife-content-page .search').siblings('.layout-container').children('.row').children('.col-md-9').find('.relative').css ('position', 'unset');
   	 }
    }


    $(window).resize(function () {
        if ($(window).width() > 767 && $(window).width() < 1024) {
            if($('.advisorhub-sunlife-home-page .search').length > 0) {
                if ($('.advisorhub-sunlife-home-page .search').siblings('.layout-container.editorial-articles-wrapper.mb-40').children('.row.flex-height').children('.col-sm-4').children('.container-component').children('.cmp-container').children('.teaser').length > 0) {
                    $('.advisorhub-sunlife-home-page .search').siblings('.layout-container.editorial-articles-wrapper.mb-40').children('.row.flex-height').children('.col-sm-4').children('.container-component').children('.cmp-container').children('.teaser').css ('z-index', -1);
                }
            }
            if ($('.advisorhub-sunlife-content-page .search').siblings('.layout-container').children('.row').children('.col-md-9').length > 0) {
                $('.advisorhub-sunlife-content-page .search').siblings('.layout-container').children('.row').children('.col-md-9').css ('position', 'unset');
                $('.advisorhub-sunlife-content-page .search').siblings('.layout-container').children('.row').children('.col-md-9').find('.relative').css ('position', 'unset');
   	 }
        }

    })
    function userName(){
        if($('.adv-search-bar-wrapper')){
            $('.search-heading .username').text(profileData.givenName);
            $('.search-heading .username').show();
        }
    }

    function checkSearchBar(){
        if($(".target .default.search").length!=0){
            setTimeout(checkSearchBar, 500);
        }   
        else{
            userName();
        }
    }
    
    if(typeof ContextHub != "undefined"){
        checkSearchBar();
    }

    // Type Ahead functionality implementation

    (function ($) {

        var idCnt = 0;
        var autoCompletePrefix = "/SLFSearchService/SearchHttpServlet?ServiceName=GetSearchResults&uiid=aem-abc-ta&MinScore=0";
        var languageNames = new Intl.DisplayNames('en', {type: 'language'});

        // Check if manager
        var manager =false;
        var segment = ContextHub.SegmentEngine.getResolvedSegments();
        for(var i=0;i<segment.length;i++){
            if(segment[i]["title"] == "Manager"){
                manager = true;
                break;
            }
        }
        if(manager == true){
            autoCompletePrefix = autoCompletePrefix + "&DatabaseMatch=AEM-ABC-Managers";
        }
        else{
            autoCompletePrefix = autoCompletePrefix + "&DatabaseMatch=AEM-ABC-Advisors";
        }

        function throttle(cb, delay) {
            var timer = null;
            return function () {
                var args = Array.prototype.slice.call(arguments);
                var thisObj = this;
                if (timer) clearTimeout(timer);
                timer = setTimeout(function () {
                    cb.apply(thisObj, args);
                    timer = null;
                }, delay);
            }
        }

        function autocompleteCall(query) {
            var searchParams = autoCompletePrefix + "&Totalresults=true&Print=all&Text=(\""+query+"*\"):TITLE";
            searchParams += "&MatchLanguage=" + languageNames.of(utag_data.page_language);
            searchParams += "&LanguageType=" + languageNames.of(utag_data.page_language).toLowerCase() + "UTF8";
            searchParams += "&Maxresults=10&Start=1";
            return $.ajax({
                type: "GET",
                rejectUnauthorized: false,
                url: searchParams,
                dataType: "jsonp"
            })
        }
        function saytCall(query) {
            return $.get(saytPrefix, { q: query, type: 'sayt' }, null, 'jsonp');
        }

        function setupAutocomplete(form, mobile) {
            if (mobile) {
                var inputEl = form.find("input[name=q]");
                var actionEl = form.find("input[name=action]");
                var autocompleteListEl = form.find(".search-autocomplete-list-mobile");
                var saytListEl = form.find(".search-sayt-list-mobile");
                var dropdownEl = form.find(".search-autocomplete-mobile");
                var lastVal = "";
                var suggestionIndex = -1;
                var suggestions = [];
                var idNum = idCnt++;
                var listId = "slf-autocomplete-list-mobile-" + idNum;
            }
            else {
                var inputEl = form.find("input[name=q]");
                var actionEl = form.find("input[name=action]");
                var submitBtn = form.find("input[type=submit]");
                var autocompleteListEl = form.find(".search-autocomplete-list");
                var saytListEl = form.find(".search-sayt-list");
                var dropdownEl = form.find(".search-autocomplete");
                var lastVal = "";
                var suggestionIndex = -1;
                var suggestions = [];
                var idNum = idCnt++;
                var listId = "slf-autocomplete-list-" + idNum;
            }
            var submitLock = false;

            inputEl[0].autocomplete = 'off';

            autocompleteListEl.attr("aria-hidden", "true");

            function updateSelection() {
                if (suggestionIndex < 0) {
                    if (inputEl.val() !== lastVal) inputEl.val(lastVal);
                    actionEl.val("input");
                } else {
                    inputEl.val(suggestions[suggestionIndex]);
                    actionEl.val("typeahead");
                }
                autocompleteListEl.children().removeClass("active");
                if (suggestionIndex >= 0) autocompleteListEl.children().eq(suggestionIndex).addClass("active");
            }

            function clickSuggestion(event) {
                event.preventDefault();
                var suggestion = $(this).data("slf-search-value");
                updateEmpty();
                actionEl.val("typeahead");
                inputEl.val(suggestion);
                form.submit();
            }

            function updateSuggestions(q, force) {
                return function (data) {
                    if (!force && inputEl.val() !== q) return;
                    if(!jQuery.isEmptyObject(data)){
                        var autocompleteArray = [];
                        var listLength = data["autnresponse"]["responsedata"]["autn:numhits"];
                        if(listLength==1){
                            var dreTitle = data["autnresponse"]["responsedata"]["autn:hit"]["DRETITLE"];
                            var plainTitle = data["autnresponse"]["responsedata"]["autn:hit"]["TITLE"];
                            var autnTitle = data["autnresponse"]["responsedata"]["autn:hit"]["autn:title"];
                            var title;
                            if (typeof dreTitle !== "undefined") {
                                title = dreTitle;
                            } else if (typeof plainTitle !== "undefined") {
                                title = plainTitle;
                            } else {
                                title = autnTitle;
                            }
                            if(title != undefined){
                                autocompleteArray.push(title);
                            }
                        }
                        else{
                            for(var i=0; i<listLength; i++){
                                var dreTitle = data["autnresponse"]["responsedata"]["autn:hit"][i]["DRETITLE"];
                                var plainTitle = data["autnresponse"]["responsedata"]["autn:hit"][i]["TITLE"];
                                var autnTitle = data["autnresponse"]["responsedata"]["autn:hit"][i]["autn:title"];
                                var title;
                                if (typeof dreTitle !== "undefined") {
                                    title = dreTitle;
                                } else if (typeof plainTitle !== "undefined") {
                                    title = plainTitle;
                                } else {
                                    title = autnTitle;
                                }
                                if(title != undefined){
                                    autocompleteArray.push(title);
                                }
                            }
                        }
                        var results = autocompleteArray;
                    }
                    else{
                        var results = [];
                    }
                    suggestions = results.filter(function (r) {
                        return r !== lastVal;
                    });
                    if (!suggestions.length) {
                        autocompleteListEl.hide();
                    } else {
                        autocompleteListEl.show();
                    }
                    suggestionIndex = -1;
                    autocompleteListEl.empty().append(suggestions.map(function (suggestion, i) {
                        return $("<li role='option'>")
                            .attr("id", listId + "_" + i)
                            // .html(suggestion.substring(0, lastVal.length) + "<span class='bold'>" + suggestion.substring(lastVal.length) + "</span>")
                            .html("<span class='bold'>" + suggestion + "</span>")
                            .data("slf-search-value", suggestion)
                            .click(clickSuggestion).get(0);
                    }));
                    updateSelection();
                }
            }

            function updateSayt(q, force) {
                return function (results) {
                    if (!force && inputEl.val() !== q) return;

                    var arr;
                    try {
                        arr = results.results;
                    } catch (e) {
                        arr = [];
                    }

                    if (!arr.length) saytListEl.hide();
                    else saytListEl.show();
                    saytListEl.empty().append(arr.map(function (resultItem) {
                        return $("<li>").append($("<a class='sayt-link'>").append([
                            $("<span class='title'>").text(resultItem.title)[0],
                            $("<span class='desc'>").text(resultItem.desc)[0]
                        ]).attr("href", resultItem.url));
                    }))
                }
            }

            function updateEmpty() {
                updateSuggestions([], true)([]);
                updateSayt(null, true)();
            }

            var getSuggestions = throttle(function () {
                var v = inputEl.val();
                if (v === lastVal) return;
                lastVal = v;
                if (v) {
                    autocompleteCall(v).then(updateSuggestions(v));
                    // saytCall(v).then(updateSayt(v))
                }
                else updateEmpty();
            }, 200);

            inputEl.on('focus', function (event) {
                var v = inputEl.val();
                var stillInDropdown = $.contains(dropdownEl[0], event.relatedTarget);
                if (v && !stillInDropdown) {
                    lastVal = v;
                    autocompleteCall(v).then(updateSuggestions(v));
                    // saytCall(v).then(updateSayt(v))
                } else if (!stillInDropdown) {
                    lastVal = v;
                }
            })
            form.on('focusout', function (event) {
                var stillInDropdown = $.contains(dropdownEl[0], event.relatedTarget) || event.relatedTarget === inputEl[0];
                if (!submitLock && !stillInDropdown) setTimeout(function () {
                    updateEmpty();
                }, 0);

            });
            inputEl.on('keydown', function (event) {
                if (event.key === "ArrowDown" || event.key === "Down") {
                    event.preventDefault();
                    if (suggestionIndex + 1 === suggestions.length) suggestionIndex = suggestions.length - 1;
                    else suggestionIndex += 1;
                    updateSelection();
                } else if (event.key === "ArrowUp" || event.key === "Up") {
                    event.preventDefault();
                    if (suggestionIndex < 0) suggestionIndex = -1;
                    else suggestionIndex -= 1;
                    updateSelection();
                } else if (event.key === "Escape" || event.key === "Esc") {
                    event.preventDefault();
                    updateEmpty();
                } else if (event.key === 'Enter') {
                    submitLock = true;
                    setTimeout(function () {
                        submitLock = false;
                    }, 0);
                } else if (event.key !== 'Tab') {
                    getSuggestions();
                }
            });

            if (submitBtn) {
                submitBtn.on('mousedown', function () {
                    submitLock = true;
                    setTimeout(function () {
                        submitLock = false;
                    }, 0);
                });
            }

            autocompleteListEl.on('mousedown', function (event) {
                event.preventDefault();
            })
            saytListEl.on('mousedown', function (event) {
                event.preventDefault();
            })

            form.on('submit', function (event) {
                if (!inputEl.val().trim()) {
                    event.preventDefault();
                }
            });
        }

        function init() {
            $("form.slf-search").each(function (i, form) {
                form = $(form);
                if (form.data("slf-search-initialized")) return;
                form.data("slf-search-initialized", true);
                setupAutocomplete(form);
            });
            $("form.slf-search-mobile").each(function (i, form) {
                form = $(form);
                if (form.data("slf-search-initialized")) return;
                form.data("slf-search-initialized", true);
                setupAutocomplete(form, 'mobile');
            });
        }

        function checkHeader2(){
            if($(".target .default.search").length!=0){
                setTimeout(checkHeader2, 500);
            }   
            else{
                init();
            }
        }
        
        if(typeof ContextHub == "undefined"){
            init();
         }
         else{
            checkHeader2();
         }
        
        $(init);
    }(jQuery));
})