$(document).ready(function(){
    $('.cmp-navigation__item--level-1 .cmp-navigation__group').css('display','none');
    $('.cmp-navigation__item--level-1').has('ul').children('a').css({'border':'none','font-weight' : 400});
    $('.cmp-navigation__item--level-1').children('ul').children('li').not('.cmp-navigation__item--active').children('a').css({'border':'none','font-weight' : 400});
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
        else if($(this).attr('aria-expanded')=='false'){
            $(this).attr('aria-expanded',true);
        }
    });
    $('.cmp-navigation__item--level-1 .cmp-navigation__item-link').keyup(function(e){
        if (e.which == 13 ) {
            e.preventDefault();
        $(this).siblings('.cmp-navigation__group').toggle('collapse');
        $(this).parent().siblings().children('.cmp-navigation__group').css('display','none');
        $(this).parent().siblings().children('.cmp-navigation__group').siblings('a').attr('aria-expanded',false);        
        if($(this).attr('aria-expanded')=='true'){
            $(this).attr('aria-expanded',false);
        }
        else if($(this).attr('aria-expanded')=='false'){
            $(this).attr('aria-expanded',true);
        }
        }
    });
});