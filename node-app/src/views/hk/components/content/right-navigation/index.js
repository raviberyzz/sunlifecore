// for no title in right nav with icon text
$(document).ready(function () {
    if($(".right-navigation-wrapper .icon-text").length>0){
        var a=$('.right-navigation-wrapper .icon-text').children('ul:first-child').
        not('.heading-1:first-child,.heading-2:first-child,.heading-3:first-child,.heading-4:first-child,.heading-5:first-child,.heading-6:first-child,h1:first-child,h2:first-child,h3:first-child,h4:first-child,h5:first-child,h6:first-child');
        if(a){
            $(a).each(function(index){
                if($(a[index]).children('li').length==1){
                    $(a[index]).find('li .icon-parent .icon-style.fa').css({'margin-top':'0'});
                }
            });
        }
    }
});