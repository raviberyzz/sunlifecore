// /* globals jQuery, document, window, __slf_search_config, utag */
$(document).ready(function () {
    (function ($) {
        var apiPrefix = __slf_search_config.api_url;

        var stringsEn = {
            filter_names: {
                "": "All",
                "all": "All",
                "articles": "Articles",
                "products": "Products",
                "tools": "Tools",
                "videos": "Videos",
            }
        }
        var stringsFr = {
            filter_names: {
                "": "Tous",
                "all": "Tous",
                "articles": "Articles",
                "products": "Produits",
                "tools": "Outils",
                "videos": "Vidéos",
            }
        }
        /** added on sept 18  **/

        var stringsZh = {
            filter_names: {
                "": "全部",
                "all": "全部",
                "articles": "文章",
                "products": "產品",
                "tools": "工具",
                "videos": "影片",
            }
        }

        var stringsZhSG = {
            filter_names: {
                "": "全部",
                "all": "全部",
                "articles": "'文章",
                "products": "产品",
                "tools": "工具",
                "videos": "视频",
            }
        }
        var stringsIn = {
            filter_names: {
                "": "Semua",
                "all": "Semua",
                "articles": "Artikel",
                "products": "Produk",
                "tools": "Fitur",
                "videos": "Video",
            }
        }
        var stringsVn = {
            filter_names: {
                "": "Tất cả",
                "all": "Tất cả",
                "articles": "Bài viết",
                "products": "Sản phẩm",
                "tools": "Công cụ",
                "videos": "Video",
            }
        }

        var urlParam = getParams();
        var strings = "";
        var vgnLocaleSearch = $('html')[0].lang;

        if (vgnLocaleSearch.indexOf("fr") > -1) {
            strings = stringsFr;

        } else if (vgnLocaleSearch === "zh-TW") {
            strings = stringsZh;
        } else if (vgnLocaleSearch === "zh-SG") {
            strings = stringsZhSG;
        } else if (vgnLocaleSearch === "id") {
            strings = stringsIn;
        }
        else if (vgnLocaleSearch === "vi_VN" || vgnLocaleSearch === "vi") {
            strings = stringsVn;
        }
        else {
            vgnLocaleSearch = "en_CA";
            strings = stringsEn;
        }

        if(window.location.hostname.indexOf('source') > -1) {
            if (vgnLocaleSearch.indexOf("fr") > -1) {
                strings = {
                    filter_names: {
                        "": "Tous",
                        "all": "Tous",
                        "articles": "Nouvelles",
                        "products": "Principes directeurs et lignes directrices",
                        "tools": "Mon emploi",
                        "videos": "Vidéos"
                    }
                }
            } else {
                strings = {
                    filter_names: {
                        "": "All",
                        "all": "All",
                        "articles": "News",
                        "products": "Policies and guidelines",
                        "tools": "My employment",
                        "videos": "Videos"
                    }
                }
            }
        }


        /** end **/

        //var strings = document.documentElement.lang.indexOf("fr") >= 0 ? stringsFr : stringsEn;

        var resultTemplate = $($("#search-result-item").html()).filter(".search-result-item");
        var filterItemTemplate = $($("#search-result-filter-item").html()).filter(".check-container");
        var paginationFirst = $($("#search-result-pagination-first").html()).filter("li");
        var paginationItem = $($("#search-result-pagination-item").html()).filter("li");

        function apiCall(query) {
            var deferred = jQuery.Deferred();
            $.ajax({
                url: apiPrefix,
                data: query,
                dataType: 'jsonp',
                timeout: 5000,
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    deferred.reject(errorThrown)
                }
            });

            return deferred.promise();
        }

        function getParams() {
            var params = {};
            if (!window.location.search) return params;
            window.location.search.substring(1).split("&").map(function (paramStr) {
                return paramStr.split("=");
            }).forEach(function (paramArr) {
                try {
                    params[decodeURIComponent(paramArr[0])] = decodeURIComponent(paramArr[1].replace(/\+/g, '%20'));
                } catch (e) {
                    // Do not add malformed param to returned object
                }
            });
            return params;
        }

        function resetPage() {
            $("#search-result-items").empty();
            $("#search-result-filter-list").empty();
            $("#search-result-pagination li.pagination-item").remove();
            $("#search-result-none").hide();
            $("#search-result-error").hide();
            $("#search-result-results").hide();
            $("#search-result-banner-top").hide();
        }

        function searchError(err) {
            resetPage();
            console.error("Error populating search!"); // eslint-disable-line
            console.error(err); // eslint-disable-line
            $("#search-result-error").show();
        }

        function getCurrentFilter(filters) {
            var filtered = filters.filter(function (filter) { return filter.selected; })
            if (!filtered.length) return "all";
            return filtered[0].result_type;
        }
        function getCurrentPage(pagination) {
            var filtered = pagination.pages.filter(function (page) { return page.selected === 'true'; })
            if (!filtered.length) return 1;
            return Number(filtered[0].page);
        }

        function buildSearchString(obj) {
            return "?" + Object.keys(obj).map(function (key) {
                if (obj[key] === null || typeof (obj[key]) === 'undefined') return;
                return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]).replace(/%20/g, '+');
            }).filter(function (v) { return !!v; }).join("&");
        }

        function trackingCall(action, filter, totalResults, searchTerm) {
            if (!filter) filter = "all";
            var ev_title;

            if (action === 'input') ev_title = "onsite search_client input";
            else if (action === 'input') ev_title = "onsite search_client input";
            else if (action === 'typeahead') ev_title = "onsite search_typeahead_text";
            else if (action === 'filter') ev_title = "onsite search_filter";
            else return;

            var filterName = stringsEn.filter_names[filter] || stringsEn.filter_names.all;
            var options = {
                ev_type: "other",
                ev_action: "clk",
                ev_title: ev_title,
                ev_data_one: "search_count=" + totalResults + ":search_filter=" + filterName,
                page_search_term: searchTerm
            };
            try {
                utag.link(options);
            } catch (e) {
                console.log("Couldn't perform utag.link() call.") // eslint-disable-line
                console.log(options); // eslint-disable-line
            }
        }

        function populateResults(results, originalSearchTerm, action) {
            resetPage();
            var resultItems = results.resultsets[0].results;
            var searchTerm = results.general.query;
            var totalResults = results.general.total;
            var filters = results.result_types;

            var currentResultType = null;
            var currentPage = getCurrentPage(results.pagination[0]);
            var totalPages = Number(results.general.page_total);

            if (filters) {
                currentResultType = getCurrentFilter(filters);
            }

            function setupPaginationItem(paginationItems, page) {
                var el = (page === 1 ? paginationFirst : paginationItem).clone();
                el.find(".txt").text(page)
                el.toggleClass("active", page === currentPage)
                el.find("a")
                    .attr("href", buildSearchString({
                        q: results.general.query,
                        filter: currentResultType,
                        page: page
                    }));
                return paginationItems.add(el);
            }

            if (originalSearchTerm !== searchTerm) {
                $("#search-result-misspelling").show();
                $("#search-result-misspelling-term").text(searchTerm);
            } else {
                $("#search-result-misspelling").hide();
            }

            if (!resultItems.length) {
                $("#search-result-none").show();
                $("#search-result-none-term").text(searchTerm);
                try {
                    trackingCall(action, currentResultType, totalResults, searchTerm);
                } catch (e) {
                    console.log('tracking call failed - no search results');
                }
            } else {
                trackingCall(action, currentResultType, totalResults, searchTerm);
                $("#search-result-results").show();
                $("#search-result-num-results").text(totalResults);
                $("#search-result-num-plural").toggle(totalResults !== "1");
                $("#search-result-num-single").toggle(totalResults === "1");
                var els = resultItems.map(function (result) {
                    var el = resultTemplate.clone();
                    el.find("a:not(.search-result-display-url)").attr("href", result.url)
                        .find(".txt").text(result.title);
                    if (result['file-type'] !== 'pdf') el.find("a > .fa").remove();
                    else {
                        el.find("a").attr("target", "_blank");
                    }
                    el.find("p").text(result.desc);
                    el.find(".search-result-display-url").text(result['display-url'] || result.url)
                        .attr({
                            title: result.url,
                            href: result.url
                        });
                    return el;
                });

                $("#search-result-items").append(els);

                if (filters) {
                    var filterEls = filters.map(function (filter) {
                        if (!filter || !filter.count) return;

                        var el = filterItemTemplate.clone();
                        el.find(".txt").text(strings.filter_names[filter.result_type || "all"])
                        el.find(".num").text(filter.count)
                        var linkEl = el.find("a").toggleClass('active', filter.selected)
                            .attr('href', buildSearchString({
                                q: results.general.query,
                                filter: filter.result_type,
                                action: 'filter'
                            }))

                        if (filter.selected) {
                            linkEl.click(function (event) {
                                event.preventDefault();
                            })
                        }

                        return el;
                    }).filter(function (v) { return v; });
                    $("#search-result-filter-list").append(filterEls);
                    if (filterEls.length > 1) $("#search-result-filters").show();
                    else $("#search-result-filters").hide();
                } else {
                    $("#search-result-filters").css("display", "none");
                }

                $("#search-results-pagination-previous")
                    .toggleClass("disabled", currentPage < 2)
                    .find("a")
                    .attr("href", buildSearchString({
                        q: results.general.query,
                        filter: currentResultType,
                        page: currentPage - 1
                    }));
                $("#search-results-pagination-next")
                    .toggleClass("disabled", currentPage >= totalPages)
                    .find("a")
                    .attr("href", buildSearchString({
                        q: results.general.query,
                        filter: currentResultType,
                        page: currentPage + 1
                    }));
                var paginationItems = $();


                paginationItems = setupPaginationItem(paginationItems, 1);

                if (currentPage >= 5 && totalPages > 6) paginationItems = paginationItems.add($('<li class="ellipsis"><a><span>&hellip;</span></a></li>'));

                var startPage = Math.max(currentPage - 2, 2);
                var endPage = currentPage + 2;
                if (currentPage < 3) {
                    endPage = Math.min(5, totalPages - 1);
                } else if (totalPages - currentPage < 3) {
                    startPage = Math.max(totalPages - 4, 2)
                    endPage = totalPages - 1;
                }
                for (var p = startPage; p <= endPage; p++) {
                    paginationItems = setupPaginationItem(paginationItems, p);
                }

                if ((totalPages - currentPage) >= 4 && totalPages > 6) paginationItems = paginationItems.add($('<li class="ellipsis"><a><span>&hellip;</span></a></li>'));

                paginationItems = setupPaginationItem(paginationItems, totalPages);

                $(paginationItems).insertBefore($("#search-results-pagination-next"));
                $("#search-result-pagination").toggleClass("first-page", currentPage < 2);
                $("#search-result-pagination").toggleClass("last-page", currentPage >= totalPages);
                $("#search-result-pagination").toggle(totalPages > 1);
                $("#search-result-page-num").text(currentPage);
                $("#search-result-page-total").text(results.general.page_total);
            }

            var topBanners = results.banners.filter(function (banner) { return banner.top; });
            if (topBanners[0] && topBanners[0].top) {
                $("#search-result-banner-top").html(topBanners[0].top).show();
            }

            var rightBanners = results.banners.filter(function (banner) { return banner.right; });
            if (rightBanners[0] && rightBanners[0].right) {
                $("#search-result-banner-right").html(rightBanners[0].right).show();
            }
        }

        function init() {
            if($(".advisorhub-sunlife-content-page").length==0){
                var urlParams = getParams();
                var searchString = (urlParams.q || urlParams.gq || "").trim();
                var filter = urlParams.filter || "all";
                var page = parseInt(urlParams.page);
                var action = urlParams.action;

                if (isNaN(page)) page = 1;

                $("form.slf-search input[name=q]").val(searchString);
                if (!searchString) {
                    resetPage();
                    return;
                }
                apiCall({ q: searchString, pt: filter, page: page }).then(function (results) {
                    try {
                        populateResults(results, searchString, action);

                    } catch (e) {
                        searchError(e);
                    }
                }, function (err) {
                    searchError(err);
                });

                $(".search-filter-btn").click(function () {
                    $("#search-result-filter-toggle").addClass("active");
                    $("#search-result-filter-toggle .btn-close").focus();
                });
                $("#search-result-filter-toggle .btn-close").click(function () {
                    $("#search-result-filter-toggle").removeClass("active");
                    $(".search-filter-btn").focus();
                })

                $("[data-refocus]").focus(function () {
                    var selector = $(this).attr("data-refocus");
                    var el = $(selector);
                    if (el.length > 0) {
                        el.eq(0).focus();
                    }
                })
            }
        }

        init();
    }(jQuery));

    /* global.search.js*/

    /* globals jQuery, setTimeout, clearTimeout, __slf_search_config */
    (function ($) {

        var idCnt = 0;
        var autoCompletePrefix = __slf_search_config.autocomplete_url;
        var saytPrefix = __slf_search_config.sayt_url;
        var autocompleteOptions = {
            max_results: 10,
            beginning: 1
        };

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
            return $.get(autoCompletePrefix, $.extend({ query: query }, autocompleteOptions), null, 'jsonp');
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
                return function (results) {
                    if (!force && inputEl.val() !== q) return;

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
                            .html(suggestion.substring(0, lastVal.length) + "<span class='bold'>" + suggestion.substring(lastVal.length) + "</span>")
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
                    saytCall(v).then(updateSayt(v))
                }
                else updateEmpty();
            }, 200);

            inputEl.on('focus', function (event) {
                var v = inputEl.val();
                var stillInDropdown = $.contains(dropdownEl[0], event.relatedTarget);
                if (v && !stillInDropdown) {
                    lastVal = v;
                    autocompleteCall(v).then(updateSuggestions(v));
                    saytCall(v).then(updateSayt(v))
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
            if($(".advisorhub-sunlife-content-page").length==0 && $(".advisorhub-sunlife-home-page").length==0){
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
                // for left nav underline, in IE - "test-decoration-color" does not work in IE.
                var activeLeftNav = $(".left-nav-menu .active");
                if (null != activeLeftNav) {
                    var activeText = activeLeftNav.text();
                    activeLeftNav.html("<span>" + activeText + "</span>");
                }
            }
        }

        function checkHeader2(){
            if($(".desktop-search-bar").length==0){
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


    //set the height of the description box to be equal across all CTA boxes
    function setEqualHeight() {
        var cta_desc_height = 0;

        $(".div-one:not(.not-aligned)").each(function () {
            $(this).css('height', 'auto'); //allow box to grow to a default height
            if ($(this).height() > cta_desc_height) {
                cta_desc_height = $(this).height();
            }
        });
        $(".div-one:not(.not-aligned)").each(function () {
            $(this).css("height", cta_desc_height);
        });
    }
});

    // /** ADOBE GlobalSEARCH JS ENDS HERE **/