console.log('region-language-menu loaded');
$(document).ready(function(){
    $('.slf-tab-region .slf-tab').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('.region-present').siblings().css("display", "none");
    $('.language-present').siblings().css("display", "none");
});