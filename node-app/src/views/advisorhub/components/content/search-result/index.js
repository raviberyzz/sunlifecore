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

    // Retrieve parameters from URL
    var urlParams = getParams();
    var searchText = (urlParams.text || "").trim();
    var filterText = (urlParams.filter || "").trim();

    var filterArray = [
        {
            name_en: "All",
            filter: ""
        },
        {
            name_en: "Your Business",
            filter: "your-business"
        },
        {
            name_en: "Products and Solutions",
            filter: "products-and-solutions"
        },
        {
            name_en: "Client Service",
            filter: "client-service"
        },
        {
            name_en: "News",
            filter: "news"
        }
    ];

    if(searchText!=""){
        $(".adv-search-bar-wrapper input[name=text]").val(searchText);

        // Create URL for ajax call
        var searchUrl = 'http://uat-idol11.ca.sunlife:16000/?action=Query&ResponseFormat=json&totalresults=true&print=all&maxresults=10&start=1';
        searchUrl = searchUrl + "&text=" + searchText;
        searchUrl = searchUrl + "&matchlanguage=" + utag_data.page_language;
        if(filterText!=""){
            searchUrl = searchUrl + "&fieldtext=STRING%7B" + filterText + "%7D%3ASLF_FILTER";
        }    

        // Making the ajax call for getting search results
        $.ajax({
            type: "GET",
            url: searchUrl,
            dataType: "json",
    
            success: function(data){
                var allNumber = data["autnresponse"]["responsedata"]["autn:totalhits"]["$"];
                var listLength = data["autnresponse"]["responsedata"]["autn:numhits"]["$"];

                // Creating filter section
                var filter = "";
                var filterList = "";
                for(var j=0;j<5;j++){
                    filter="";

                    if(j==0){
                        filter = filter + '<div class="check-container" name="' + filterArray[0]["filter"] + '">' +
                        '<a href="?action=filter&text=' + searchText + '">' + 
                        '<span class="txt">' + filterArray[0]["name_" + utag_data.page_language] + '&nbsp;(</span>' + 
                        '<span class="num">' + allNumber + ')</span>' + 
                        '<span class="sr-only">Filter </span><span class="checkmark">&nbsp;</span><span class="sr-only active-text"> (active)</span>' + '</a></div>';
                    }
                    else{
                        filter = filter + '<div class="check-container" name="' + filterArray[j]["filter"] + '">' +
                        '<a href="?action=filter&text=' + searchText + '&filter=' + filterArray[j]["filter"] + '">' + 
                        '<span class="txt">' + filterArray[j]["name_" + utag_data.page_language] + '&nbsp;(</span>' + 
                        '<span class="num">' + allNumber + ')</span>' + 
                        '<span class="sr-only">Filter </span><span class="checkmark">&nbsp;</span><span class="sr-only active-text"> (active)</span>' + '</a></div>';
                    }

                    filterList = filterList + filter;
                }
                
                $("#search-result-filter-list").append(filterList);

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
                var resultNumber = $("#search-result-filter-list .check-container .active").children(".num").text().split(")")[0];
                $("#search-result-num-results").text(resultNumber);
                if(parseInt(resultNumber) == 1){
                    $("#search-result-num-plural").hide();
                    $("#search-result-num-single").show();
                }
                $("#search-result-num-results").parent().parent().show();

                // Creating result list
                try{
                    var resultlist = "";
                    var resultItem = "";
                    for(var i=0; i<listLength; i++){
                        resultItem = "";
                        var resultUrl = data["autnresponse"]["responsedata"]["autn:hit"][i]["autn:reference"]["$"];
                        var resultTitle = data["autnresponse"]["responsedata"]["autn:hit"][i]["autn:title"]["$"];
                        var resultIntro = data["autnresponse"]["responsedata"]["autn:hit"][i]["autn:content"]["DOCUMENT"]["DESCRIPTION"][0]["$"];

                        resultItem = resultItem + '<div class="bottom-buffer search-result-item">' + 
                        '<a href="' + resultUrl + '"><span class="txt">' + resultTitle + '</span></a>' +
                        '<p class="intro">' + resultIntro + '</p>' +
                        '<a class="search-result-display-url" aria-hidden="true" title="' + resultUrl +
                        '" href="' + resultUrl + '">' + resultUrl + '</a></div>';

                        resultlist = resultlist + resultItem;
                    }

                    // Appending list to body
                    $("#search-result-items").append(resultlist);

                    $("#search-result-results").css("display","block");
                }
                catch(err){
                    console.log("Unable to populate Search");
                    $("#search-result-error").css("display","block");
                }
            },
            error: function(){
                console.log("Search Error");
                $("#search-result-error").css("display","block");
            }   
        }); 
    }
});