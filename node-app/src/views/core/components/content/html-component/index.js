$(document).ready(function () {
    if($('.search-container .search-bottom')){
        $('.search-container .search-bottom .close-div').remove();
    }
    if('.search-bottom .search-bar-wrapper'){
        $('.search-bottom .search-bar-wrapper').attr('id','');
    }
    if($('.search-container')){
        setTimeout(emClassAdd,300);
        function emClassAdd(){
            $("#search-result-filter-toggle").find("button").find("em").attr("class","fa fa-times");
        }
    }
});