$(document).ready(function(){
	$('.social-link-icon-wrapper .fa-facebook-square').click(shareFB);
    $('.social-link-icon-wrapper .fa-twitter-square').click(shareTwitter);
    $('.social-link-icon-wrapper .fa-linkedin-square').click(shareLinkedIn);
/* for height fixing of multiple links */
if('.breadcrumb'){
    $('.breadcrumb .social-link-icon-wrapper').addClass('vertical-middle-align');
    $('.breadcrumb .side-text').addClass('vertical-middle-align');
    var liArray=$('.breadcrumb .left-area ol').children('li');
    if(($('.breadcrumb .left-area ol').children('li')) && ($('.breadcrumb .left-area ol').children('li').length>5)){
        var nextPosition=liArray[4];
        $(nextPosition).after("<br>");
    }   
    function leftHeightFun(){
        var leftHeight=$('.breadcrumb .left-area').height();
        $('.breadcrumb .right-area').height(leftHeight);
    }
    setTimeout(leftHeightFun,150);  
}
});