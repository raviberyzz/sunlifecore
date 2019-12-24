$(document).ready(function(){
    $('.cmp-navigation__item--level-1 .cmp-navigation__group').css('display','none');
    if($('.cmp-navigation__group .cmp-navigation__item--active').hasClass('cmp-navigation__item--level-1')){
        $('.cmp-navigation__group .cmp-navigation__item--active').children('.cmp-navigation__group').css({'display':'block'});
        $('.cmp-navigation__group .cmp-navigation__item--active').children('.cmp-navigation__group').siblings().attr('aria-expanded',true);
    }
    $('.cmp-navigation__item--level-1 .cmp-navigation__item-link').click(function(){
        $(this).siblings('.cmp-navigation__group').toggle('collapse');
        $(this).parent().siblings().children('.cmp-navigation__group').css('display','none');
        $(this).parent().siblings().children('.cmp-navigation__group').siblings('a').attr('aria-expanded',false);        
        if($(this).attr('aria-expanded')=='true'){
            $(this).attr('aria-expanded',false);
        }
        else{
            $(this).attr('aria-expanded',true)
        }
    });
});