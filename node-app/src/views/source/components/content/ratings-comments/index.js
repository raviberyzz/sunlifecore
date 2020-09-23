$(document).ready(function () {
    function resetRating(){;
        var ratingLevel=Math.round($('.star-rating .rating-value').val());
        $('.star-rating .fa-star').removeClass('yellow');
        $('.star-rating .fa-star').removeClass('grey');
        $('.star-rating .fa-star').each(function(index,value){
        if(ratingLevel>0){
            $(value).addClass('active');
        }
        ratingLevel--;
        });
    }
    resetRating();
    //hover function
    $('.star-rating .fa-star').hover(function(){
        $('.star-rating .fa-star').removeClass('yellow');
        $('.star-rating .fa-star').removeClass('grey');
        $(this).addClass('yellow');
        $(this).prevAll().addClass('yellow');
        $(this).nextAll().addClass('grey');
    });
    $('.star-rating').mouseleave(function(){
        resetRating();
    });
});