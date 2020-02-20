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
        // setTimeout(twoDigit,1000);
        // function twoDigit(){
        //     var paginationItem=$('#search-result-pagination').children().filter(function(){return $(this).hasClass('pagination-item')});
        //     paginationItem.each(function(){
        //         var digit=$(this).children("a").find('.txt').text();
        //         var digitCheck =digit/10;
        //         var intDigitCheck=parseInt(digitCheck);
        //         if(intDigitCheck % 1 == 0){
        //             $(this).children("a").css({'padding':'5px 6.4px'});
        //         }
        //     });
        // }
    }
    
});