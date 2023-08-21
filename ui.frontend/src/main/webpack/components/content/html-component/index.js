$(document).ready(function () {
    if($('.search-container .search-bottom')){
        $('.search-container .search-bottom .close-div').remove();
    }
    if('.search-bottom .search-bar-wrapper'){
        $('.search-bottom .search-bar-wrapper').attr('id','');
    }
    if($('.search-container')){
        setTimeout(twoDigit,1000);
        function twoDigit(){
            var paginationItem=$('#search-result-pagination').children().filter(function(){return $(this).hasClass('pagination-item')});
            paginationItem.each(function(){
                var digit=$(this).children("a").find('.txt').text();
                var digitCount=0;
                while(digit!=0){
                    digit=parseInt(digit/10);
                    digitCount++;
                }
                if(digitCount>=2){
                    $(this).children("a").css({'padding':'5px 6.4px'});
                }
            });
        }
    }
});