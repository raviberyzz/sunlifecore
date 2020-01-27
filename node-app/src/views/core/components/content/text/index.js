$(document).ready(function () {
   $va = "<div " + "class= " +'"fa fa-info-circle"' + "> </div>";
    $($va).insertBefore(".tool-tip-box");
   
    $('.tool-tip-box').css('display','none');
    $('.fa-info-circle').css('position','initial');
    $('.fa-info-circle').hover(function(){
        $('.fa-info-circle').css('cursor','pointer');
        $('.fa-info-circle').css('position','absolute');
        $('.tool-tip-box').css('display','block');
    },function(){
        $('.fa-info-circle').css('position','initial');
        $('.tool-tip-box').css('display','none');
    });
});

    

    