$(document).ready(function () {
    function resetRating(){
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
    setTimeout(resetRating,500);
    //hover function
    function hov(){
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
    }
    setTimeout(hov,800);
    /* delete and edit popup starts here */
    function optionClick(){
        $('.three-dots').each(function(index,item){
            $(item).click(function(){
                $('.comment-option').removeClass('show');
                $(item).children('.comment-option').toggleClass('show');
            });
        });
        $('body').click(function(event){
            let target = $(event.target);
            if(target.closest('.three-dots').length==0){
                $('.comment-option').removeClass('show');
            }
        });
    }
    setInterval(optionClick,1000);
    /* delete and edit popup ends here */
});