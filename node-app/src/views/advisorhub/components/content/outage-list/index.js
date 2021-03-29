$(document).ready(function(){
    function setKnownPaginationItems(paginationItems, page, total, currentPage){
        var paginationFirst = $($("#known-outage .outage-pagination-first").html()).filter("li");
        var paginationItem = $($("#known-outage .outage-pagination-item").html()).filter("li");

        var el = (page === 1 ? paginationFirst : paginationItem).clone();
        el.find(".txt").text(page)
        el.toggleClass("active", page === currentPage)
        el.find("a")
            .attr("href", "#technology-whiteboard")
            .attr("page", page);
        return paginationItems.add(el);
    }
    function setPlannedPaginationItems(paginationItems, page, total, currentPage){
        var paginationFirst = $($("#planned-outage .outage-pagination-first").html()).filter("li");
        var paginationItem = $($("#planned-outage .outage-pagination-item").html()).filter("li");

        var el = (page === 1 ? paginationFirst : paginationItem).clone();
        el.find(".txt").text(page)
        el.toggleClass("active", page === currentPage)
        el.find("a")
            .attr("href", "#technology-whiteboard")
            .attr("page", page);
        return paginationItems.add(el);
    }
    function setKnownPagination(total, currentPage){
        var totalPage = Math.ceil(total/10);
        $("#known-outage .outage-pagination-previous")
            .toggleClass("disabled", currentPage < 2)
            .find("a")
            .attr("href", "#technology-whiteboard")
            .attr("page", currentPage-1);
        $("#known-outage .outage-pagination-next")
            .toggleClass("disabled", currentPage >= totalPage)
            .find("a")
            .attr("href", "#technology-whiteboard")
            .attr("page", currentPage+1);

        var paginationItems = $();

        paginationItems = setKnownPaginationItems(paginationItems, 1, total, currentPage);

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
            paginationItems = setKnownPaginationItems(paginationItems, p, total, currentPage);
        }

        if ((totalPage - currentPage) >= 4 && totalPage > 6) paginationItems = paginationItems.add($('<li class="ellipsis"><a><span>&hellip;</span></a></li>'));

        paginationItems = setKnownPaginationItems(paginationItems, totalPage, total, currentPage);

        $(paginationItems).insertBefore($("#known-outage .outage-pagination-next"));
        $("#known-outage .outage-pagination-list").toggleClass("first-page", currentPage < 2);
        $("#known-outage .outage-pagination-list").toggleClass("last-page", currentPage >= totalPage);
        $("#known-outage .outage-pagination-list").toggle(totalPage > 1);
        $("#known-outage .outage-page-num").text(currentPage);
        $("#known-outage .outage-page-total").text(totalPage);
    }
    function setPlannedPagination(total, currentPage){
        var totalPage = Math.ceil(total/10);
        $("#planned-outage .outage-pagination-previous")
            .toggleClass("disabled", currentPage < 2)
            .find("a")
            .attr("href", "#technology-whiteboard")
            .attr("page", currentPage-1);
        $("#planned-outage .outage-pagination-next")
            .toggleClass("disabled", currentPage >= totalPage)
            .find("a")
            .attr("href", "#technology-whiteboard")
            .attr("page", currentPage+1);
        
        var paginationItems = $();

        paginationItems = setPlannedPaginationItems(paginationItems, 1, total, currentPage);

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
            paginationItems = setPlannedPaginationItems(paginationItems, p, total, currentPage);
        }

        if ((totalPage - currentPage) >= 4 && totalPage > 6) paginationItems = paginationItems.add($('<li class="ellipsis"><a><span>&hellip;</span></a></li>'));

        paginationItems = setPlannedPaginationItems(paginationItems, totalPage, total, currentPage);

        $(paginationItems).insertBefore($("#planned-outage .outage-pagination-next"));
        $("#planned-outage .outage-pagination-list").toggleClass("first-page", currentPage < 2);
        $("#planned-outage .outage-pagination-list").toggleClass("last-page", currentPage >= totalPage);
        $("#planned-outage .outage-pagination-list").toggle(totalPage > 1);
        $("#planned-outage .outage-page-num").text(currentPage);
        $("#planned-outage .outage-page-total").text(totalPage);
    }
    function changeKnownPagination(page){
        $("#known-outage .outage-pagination-list li").each(function(){
            if(!($(this).hasClass("previous") || $(this).hasClass("next"))){
                $(this).remove();
            }
        })
        setKnownPagination(knownNumber, parseInt(page));
        $("#known-outage .outage-pagination-list li a").click(function(){
            if(!$(this).parent("li").hasClass("active")){
                if(!($(this).parent("li").hasClass("previous") || $(this).parent("li").hasClass("next"))){
                    setKnownContent(knownNumber, parseInt($(this).attr("page")));
                    changeKnownPagination($(this).attr("page"));
                }
            }
        })
    }
    function changePlannedPagination(page){
        $("#planned-outage .outage-pagination-list li").each(function(){
            if(!($(this).hasClass("previous") || $(this).hasClass("next"))){
                $(this).remove();
            }
        })
        setPlannedPagination(plannedNumber, parseInt(page));
        $("#planned-outage .outage-pagination-list li a").click(function(){
            if(!$(this).parent("li").hasClass("active")){
                if(!($(this).parent("li").hasClass("previous") || $(this).parent("li").hasClass("next"))){
                    setPlannedContent(plannedNumber, parseInt($(this).attr("page")));
                    changePlannedPagination($(this).attr("page"));
                }
            }
        })
    }
    function setKnownContent(total, currentPage){
        $("#known-outage .outage-item-list .outage-item").each(function(index){
            if((index+1 >= (currentPage*10)-9) && (index+1 <= (currentPage*10))){
                $(this).css("display","block");
            }
            else{
                $(this).css("display","none");
            }
        })
    }
    function setPlannedContent(total, currentPage){
        $("#planned-outage .outage-item-list .outage-item").each(function(index){
            if((index+1 >= (currentPage*10)-9) && (index+1 <= (currentPage*10))){
                $(this).css("display","block");
            }
            else{
                $(this).css("display","none");
            }
        })
    }

    var knownNumber = $("#known-outage .outage-item-list").children().length;
    var plannedNumber = $("#planned-outage .outage-item-list").children().length;
    if($("#known-outage").length || $("#planned-outage").length){
        $("#known-outage").parents(".tabs-wrapper").attr("id","technology-whiteboard");
    }
    if(knownNumber>10){
        setKnownContent(knownNumber,1)
        setKnownPagination(knownNumber,1);
        $("#known-outage .outage-pagination").css("display", "block");
    }
    if(plannedNumber>10){
        setPlannedContent(plannedNumber,1);
        setPlannedPagination(plannedNumber,1);
        $("#planned-outage .outage-pagination").css("display", "block");
    }
    $("#known-outage .outage-pagination-list li a").click(function(){
        if(!$(this).parent("li").hasClass("active")){
            setKnownContent(knownNumber, parseInt($(this).attr("page")));
            changeKnownPagination($(this).attr("page"));
        }
    })
    $("#planned-outage .outage-pagination-list li a").click(function(){
        if(!$(this).parent("li").hasClass("active")){
            setPlannedContent(plannedNumber, parseInt($(this).attr("page")));
            changePlannedPagination($(this).attr("page"));
        }
    })
});