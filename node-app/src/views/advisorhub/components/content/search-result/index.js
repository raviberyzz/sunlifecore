$(document).ready(function(){
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

    function setupPaginationItems(paginationItems, page, total) {
        var urlParams = getParams();
        var searchText = (urlParams.q || "").trim();
        var filterText = (urlParams.filter || "").trim();
        var maxResult = (urlParams.maxresults || "10").trim();
        var paginationFirst = $($("#search-result-pagination-first").html()).filter("li");
        var paginationItem = $($("#search-result-pagination-item").html()).filter("li");

        var currentPage = maxResult/10;
        var pageUrl = "?q=" + searchText;
        if(filterText!=""){
            pageUrl = pageUrl + "&filter=" + filterText;
        }

        var el = (page === 1 ? paginationFirst : paginationItem).clone();
        el.find(".txt").text(page)
        el.toggleClass("active", page === currentPage)
        el.find("a")
            .attr("href", pageUrl + "&start=" + ((page*10) -9) + "&maxresults=" + (page*10));
        return paginationItems.add(el);
    }

    function configurePagination(total){
        var urlParams = getParams();
        var searchText = (urlParams.q || "").trim();
        var filterText = (urlParams.filter || "").trim();
        var maxResult = (urlParams.maxresults || "10").trim();

        var totalPage = Math.ceil(total/10);
        var currentPage = maxResult/10;
        var pageUrl = "?q=" + searchText;
        if(filterText!=""){
            pageUrl = pageUrl + "&filter=" + filterText;
        }

        $("#search-results-pagination-previous")
            .toggleClass("disabled", currentPage < 2)
            .find("a")
            .attr("href", pageUrl + "&start=" + ((currentPage-1)*10 -9) + "&maxresults=" + (currentPage-1)*10);
        $("#search-results-pagination-next")
            .toggleClass("disabled", currentPage >= totalPage)
            .find("a")
            .attr("href", pageUrl + "&start=" + ((currentPage+1)*10 -9) + "&maxresults=" + (currentPage+1)*10);
        
        var paginationItems = $();

        paginationItems = setupPaginationItems(paginationItems, 1, total);

        if (currentPage >= 5 && totalPage > 6) paginationItems = paginationItems.add($('<li class="ellipsis"><a><span>&hellip;</span></a></li>'));

        var startPage = Math.max(currentPage - 2, 2);
        var endPage = currentPage + 2;
        if (currentPage < 3) {
            endPage = Math.min(5, totalPage - 1);
        } else if (totalPage - currentPage < 3) {
            startPage = Math.max(totalPage - 4, 2)
            endPage = totalPage - 1;
        }
        for (var p = startPage; p <= endPage; p++) {
            paginationItems = setupPaginationItems(paginationItems, p, total);
        }

        if ((totalPage - currentPage) >= 4 && totalPage > 6) paginationItems = paginationItems.add($('<li class="ellipsis"><a><span>&hellip;</span></a></li>'));

        paginationItems = setupPaginationItems(paginationItems, totalPage, total);

        $(paginationItems).insertBefore($("#search-results-pagination-next"));
        $("#search-result-pagination").toggleClass("first-page", currentPage < 2);
        $("#search-result-pagination").toggleClass("last-page", currentPage >= totalPage);
        $("#search-result-pagination").toggle(totalPage > 1);
        $("#search-result-page-num").text(currentPage);
        $("#search-result-page-total").text(totalPage);
    }

    function searchAnalytics(action, filter, totalResults, searchTerm){
        if (filter=="") filter = "All";
        var ev_title;

        if (action === 'input') ev_title = "onsite search_client input";
        else if (action === 'filter') ev_title = "onsite search_filter";
        else return;

        var filterName = filter;
        var options = {
            ev_type: "other",
            ev_action: "clk",
            ev_title: ev_title,
            ev_data_one: "search_count=" + totalResults + ":search_filter=" + filterName
        };
        try {
            utag.link(options);
        } catch (e) {
            console.log("Couldn't perform utag.link() call.") // eslint-disable-line
            console.log(options); // eslint-disable-line
        }
    }

    // Retrieve parameters from URL
    var urlParams = getParams();
    var searchText = (urlParams.q || "").trim();
    var filterText = (urlParams.filter || "").trim();
    var start = (urlParams.start || "").trim();
    var maxResult = (urlParams.maxresults || "").trim();
    var searchAction = (urlParams.action || "").trim();
    var searchApi = "/SLFSearchService/SearchHttpServlet?ServiceName=GetSearchResults&MinScore=0";
    var searchError = false; 

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
        searchApi = searchApi + "&DatabaseMatch=AEM-ABC-Managers";
    }
    else{
        searchApi = searchApi + "&DatabaseMatch=AEM-ABC-Advisors";
    }

    var filterArray = [
        {
            name_en: "All",
            name_fr: "Tous",
            filter: "All"
        },
        {
            name_en: "Your Business",
            name_fr: "Vos Affaires",
            filter: "Your-Business"
        },
        {
            name_en: "Products and Solutions",
            name_fr: "Produits et Solutions",
            filter: "Products-and-Solutions"
        },
        {
            name_en: "Client Service",
            name_fr: "Service au Client",
            filter: "Client-Service"
        },
        {
            name_en: "News",
            name_fr: "Nouvelles",
            filter: "News"
        }
    ];

    if($(".adv-search")){
        if(searchText!=""){
            $(".adv-search-bar-wrapper input[name=q]").val(searchText);

            // Adding cross button to input field
            var clearButton = '<span id="searchclear" class="fa fa-times"></span>';
            $(".adv-search-bar-wrapper input[name=q]").after(clearButton);

            $(".adv-search-bar-wrapper input[name=q]").on('input', function() {
                if($(".adv-search-bar-wrapper input[name=q]").val()==""){
                    $('#searchclear').css("display", "none");
                }
                else{
                    $('#searchclear').css("display", "block");
                }
            });

            $('#searchclear').click(function(){
                $(".adv-search-bar-wrapper input[name=q]").val("");
                $('#searchclear').css("display", "none");
                $(".adv-search-bar-wrapper input[name=q]").focus();
            })

            // Create URL for ajax call
            var searchUrl = searchApi + '&Totalresults=true&Print=all';
            searchUrl = searchUrl + "&Text=" + searchText;
            searchUrl = searchUrl + "&MatchLanguage=" + utag_data.page_language;
            if(filterText!=""){
                searchUrl = searchUrl + "&Fieldtext=STRING%7B" + filterText + "%7D%3ASLF_FILTER";
            }    
            if(start==""){
                searchUrl = searchUrl + "&Maxresults=10&Start=1";
            }else{
                searchUrl = searchUrl + "&Maxresults=" + maxResult + "&Start=" + start;
            }

            // Making the ajax call for getting search results
            $.ajax({
                type: "GET",
                url: searchUrl,
                dataType: "jsonp",
                jsonpCallback: "advisorhub",
        
                success: function(data){
                    var allNumber = data["autnresponse"]["responsedata"]["autn:totalhits"];
                    var listLength = data["autnresponse"]["responsedata"]["autn:numhits"];

                    searchAnalytics(searchAction, filterText, allNumber, searchText);

                    if(listLength == 0){
                        $("#search-result-none").css("display", "block");
                    }
                    else{
                        // Creating filter section
                        var filter = "";
                        var filterList = "";
                        for(var j=0;j<5;j++){
                            filter="";

                            if(j==0){
                                filter = filter + '<div class="check-container" name="' + filterArray[0]["filter"] + '">' +
                                '<a href="?action=filter&q=' + searchText + '">' + 
                                '<span class="txt">' + filterArray[0]["name_" + utag_data.page_language] + '&nbsp;(</span>' + 
                                '<span class="num">)</span>' + 
                                '<span class="sr-only">Filter </span><span class="checkmark">&nbsp;</span><span class="sr-only active-text"> (active)</span>' + '</a></div>';
                            }
                            else{
                                filter = filter + '<div class="check-container" name="' + filterArray[j]["filter"] + '">' +
                                '<a href="?action=filter&q=' + searchText + '&filter=' + filterArray[j]["filter"] + '">' + 
                                '<span class="txt">' + filterArray[j]["name_" + utag_data.page_language] + '&nbsp;(</span>' + 
                                '<span class="num">)</span>' + 
                                '<span class="sr-only">Filter </span><span class="checkmark">&nbsp;</span><span class="sr-only active-text"> (active)</span>' + '</a></div>';
                            }

                            filterList = filterList + filter;
                        }
                        
                        $("#search-result-filter-list").append(filterList);

                        // Getting no of result for different filters

                        $.ajax({
                            type: "GET",
                            url: searchApi + '&Totalresults=true&Text=' + searchText + "&MatchLanguage=" + utag_data.page_language,
                            dataType: "jsonp",
                            jsonpCallback: "advisorhub1",
                    
                            success: function(data){
                                var totalNumber = data["autnresponse"]["responsedata"]["autn:totalhits"];
                                $(".check-container[name=All]").children().children(".num").text(totalNumber+")");
                            },
                            error: function(jqXHR, textStatus, errorThrown){
                                console.log("Search Error");
                                console.log(errorThrown);
                            }   
                        });

                        $.ajax({
                            type: "GET",
                            url: searchApi + '&Totalresults=true&Text=' + searchText + '&Fieldtext=STRING%7Byour-business%7D%3ASLF_FILTER' + "&matchlanguage=" + utag_data.page_language,
                            dataType: "jsonp",
                            jsonpCallback: "advisorhub2",
                    
                            success: function(data){
                                var businessNumber = data["autnresponse"]["responsedata"]["autn:totalhits"];
                                if(businessNumber==0){
                                    $(".check-container[name=Your-Business]").css("display","none");
                                }
                                else{
                                    $(".check-container[name=Your-Business]").children().children(".num").text(businessNumber+")");
                                }
                            },
                            error: function(jqXHR, textStatus, errorThrown){
                                console.log("Search Error");
                                console.log(errorThrown);
                            }   
                        }); 

                        $.ajax({
                            type: "GET",
                            url: searchApi + '&Totalresults=true&Text=' + searchText + '&Fieldtext=STRING%7Bproducts-and-solutions%7D%3ASLF_FILTER' + "&MatchLanguage=" + utag_data.page_language,
                            dataType: "jsonp",
                            jsonpCallback: "advisorhub3",
                    
                            success: function(data){
                                var productNumber = data["autnresponse"]["responsedata"]["autn:totalhits"];
                                if(productNumber==0){
                                    $(".check-container[name=Products-and-Solutions]").css("display","none");
                                }
                                else{
                                    $(".check-container[name=Products-and-Solutions]").children().children(".num").text(productNumber+")");
                                }
                            },
                            error: function(jqXHR, textStatus, errorThrown){
                                console.log("Search Error");
                                console.log(errorThrown);
                            }   
                        }); 

                        $.ajax({
                            type: "GET",
                            url: searchApi + '&Totalresults=true&Text=' + searchText + '&Fieldtext=STRING%7Bclient-service%7D%3ASLF_FILTER' + "&MatchLanguage=" + utag_data.page_language,
                            dataType: "jsonp",
                            jsonpCallback: "advisorhub4",
                    
                            success: function(data){
                                var clientNumber = data["autnresponse"]["responsedata"]["autn:totalhits"];
                                if(clientNumber==0){
                                    $(".check-container[name=Client-Service]").css("display","none");
                                }
                                else{
                                    $(".check-container[name=Client-Service]").children().children(".num").text(clientNumber+")");
                                }
                            },
                            error: function(jqXHR, textStatus, errorThrown){
                                console.log("Search Error");
                                console.log(errorThrown);
                            }   
                        });

                        $.ajax({
                            type: "GET",
                            url: searchApi + '&Totalresults=true&Text=' + searchText + '&Fieldtext=STRING%7Bnews%7D%3ASLF_FILTER' + "&MatchLanguage=" + utag_data.page_language,
                            dataType: "jsonp",
                            jsonpCallback: "advisorhub5",
                    
                            success: function(data){
                                var newsNumber = data["autnresponse"]["responsedata"]["autn:totalhits"];
                                if(newsNumber==0){
                                    $(".check-container[name=News]").css("display","none");
                                }
                                else{
                                    $(".check-container[name=News]").children().children(".num").text(newsNumber+")");
                                }
                            },
                            error: function(jqXHR, textStatus, errorThrown){
                                console.log("Search Error");
                                console.log(errorThrown);
                            }   
                        });

                        // Filter mobile view
                        $(".search-filter-btn").click(function () {
                            $("#search-result-filter-toggle").addClass("active");
                            $("#search-result-filter-toggle .btn-close").focus();
                        });
                        $("#search-result-filter-toggle .btn-close").click(function () {
                            $("#search-result-filter-toggle").removeClass("active");
                            $(".search-filter-btn").focus();
                        })

                        // Adding active class to selected filter
                        if(filterText==""){
                            $("#search-result-filter-list").children().first().children("a").addClass("active");
                        }
                        else{
                            $("#search-result-filter-list .check-container").each(function(){
                                if($(this).attr("name") == filterText){
                                    $(this).children("a").addClass("active");
                                }
                            })
                        }

                        // Show no of result for selected filter
                        $("#search-result-num-results").text(allNumber);
                        if(allNumber === 1){
                            $("#search-result-num-plural").hide();
                            $("#search-result-num-single").show();
                        }
                        $("#search-result-num-results").parent().parent().show();

                        // Creating result list
                        try{
                            var resultlist = "";
                            var resultItem = "";
                            if(listLength==1){
                                resultItem = "";
                                var resultUrl = data["autnresponse"]["responsedata"]["autn:hit"]["autn:reference"];
                                try{
                                    var resultTitle = data["autnresponse"]["responsedata"]["autn:hit"]["autn:title"];
                                    if(typeof  resultTitle === "undefined"){
                                        var titleValues = data["autnresponse"]["responsedata"]["autn:hit"]["autn:reference"].split("/");
                                        var resultTitle = titleValues[titleValues.length-1];
                                    }
                                }
                                catch(err){
                                    // console.log(err);
                                    var titleValues = data["autnresponse"]["responsedata"]["autn:hit"]["autn:reference"].split("/");
                                    var resultTitle = titleValues[titleValues.length-1];
                                    // searchError = true;
                                }
                                try{
                                    var resultIntro = data["autnresponse"]["responsedata"]["autn:hit"]["autn:content"]["DOCUMENT"]["DESCRIPTION"][0];
                                }
                                catch(err){
                                    // console.log(err);
                                    resultIntro="";
                                }  

                                // Appending File type to title
                                try{
                                    var resultType = data["autnresponse"]["responsedata"]["autn:hit"]["autn:content"]["DOCUMENT"]["FILEEXTENSION"];

                                    if(resultType==".docx" || resultType==".doc"){
                                        resultTitle = '(MS Word) ' + resultTitle;
                                    }
                                    else if(resultType==".xlsx" || resultType==".xls"){
                                        resultTitle = '(MS Excel) ' + resultTitle;
                                    }
                                    else if(resultType==".pptx"){
                                        resultTitle = '(MS PowerPoint) ' + resultTitle;
                                    }
                                    else if(resultType!=".html"){
                                        resultTitle = '(' + resultType.substr(1).toUpperCase() + ') ' + resultTitle;
                                    }
                                }
                                catch(err){
                                    // console.log(err);
                                }

                                resultItem = resultItem + '<div class="bottom-buffer search-result-item">' + 
                                    '<a href="' + resultUrl + '"><span class="txt">' + resultTitle + '</span></a>' +
                                    '<p class="intro">' + resultIntro + '</p>' +
                                    '<a class="search-result-display-url" aria-hidden="true" title="' + resultUrl +
                                    '" href="' + resultUrl + '">' + resultUrl + '</a></div>';

                                resultlist = resultlist + resultItem;
                            }
                            else{
                                for(var i=0; i<listLength; i++){
                                    resultItem = "";
                                    var resultUrl = data["autnresponse"]["responsedata"]["autn:hit"][i]["autn:reference"];
                                    try{
                                        var resultTitle = data["autnresponse"]["responsedata"]["autn:hit"][i]["autn:title"];
                                        if(typeof resultTitle === "undefined"){
                                            var titleValues = data["autnresponse"]["responsedata"]["autn:hit"][i]["autn:reference"].split("/");
                                            var resultTitle = titleValues[titleValues.length-1];
                                        }
                                    }
                                    catch(err){
                                        // console.log(err);
                                        // continue;
                                        var titleValues = data["autnresponse"]["responsedata"]["autn:hit"][i]["autn:reference"].split("/");
                                        var resultTitle = titleValues[titleValues.length-1];
                                    }
                                    try{
                                        var resultIntro = data["autnresponse"]["responsedata"]["autn:hit"][i]["autn:content"]["DOCUMENT"]["DESCRIPTION"][0];
                                    }
                                    catch(err){
                                        // console.log(err);
                                        resultIntro = "";
                                    }

                                    try{
                                        var resultType = data["autnresponse"]["responsedata"]["autn:hit"][i]["autn:content"]["DOCUMENT"]["FILEEXTENSION"];

                                        if(resultType==".docx" || resultType==".doc"){
                                            resultTitle = '(MS Word) ' + resultTitle;
                                        }
                                        else if(resultType==".xlsx" || resultType==".xls"){
                                            resultTitle = '(MS Excel) ' + resultTitle;
                                        }
                                        else if(resultType==".pptx"){
                                            resultTitle = '(MS PowerPoint) ' + resultTitle;
                                        }
                                        else if(resultType!=".html"){
                                            resultTitle = '(' + resultType.substr(1).toUpperCase() + ') ' + resultTitle;
                                        }
                                    }
                                    catch(err){
                                        // console.log(err);
                                    }

                                    resultItem = resultItem + '<div class="bottom-buffer search-result-item">' + 
                                    '<a href="' + resultUrl + '"><span class="txt">' + resultTitle + '</span></a>' +
                                    '<p class="intro">' + resultIntro + '</p>' +
                                    '<a class="search-result-display-url" aria-hidden="true" title="' + resultUrl +
                                    '" href="' + resultUrl + '">' + resultUrl + '</a></div>';

                                    resultlist = resultlist + resultItem;
                                }
                            }

                            // Appending list to body
                            $("#search-result-items").append(resultlist);

                            // Configure analytics
                            $(".search-result-item a").click(function(){
                                var destTitle = $(this).parent().children("a").first().children("span").text();
                                var destUrl = $(this).attr("href");
                                var options = {
                                    ev_type: "other",
                                    ev_action: "clk",
                                    ev_title: "onsite search_query result item",
                                    page_destination_title: destTitle,
                                    page_destination_url: destUrl
                                };
                                try {
                                    utag.link(options);
                                } catch (e) {
                                    console.log("Couldn't perform utag.link() call.") // eslint-disable-line
                                    console.log(options); // eslint-disable-line
                                }
                            })

                            // Configure pagination
                            if(allNumber <= 10){
                                $(".pagination").css("display", "none");
                                $(".pagination-indicator").css("display", "none");
                            }
                            else{
                                configurePagination(allNumber);
                            }

                            if(searchError==false){
                                $("#search-result-results").css("display","block");
                            }
                            else{
                                console.log("Unable to populate Search");
                                $("#search-result-error").css("display","block");
                            }
                        }
                        catch(err){
                            console.log("Unable to populate Search" + err);
                            $("#search-result-error").css("display","block");
                        }
                    }
                },
                error: function(jqXHR, textStatus, errorThrown){
                    console.log("Search Error");
                    console.log(errorThrown);
                    $("#search-result-error").css("display","block");
                }   
            }); 
        }
    }
});