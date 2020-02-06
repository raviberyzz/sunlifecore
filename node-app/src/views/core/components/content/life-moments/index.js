$(document).ready(function () {
    var pageWidth=$(window).width();
    if(pageWidth>=768){
        $('.blue-background-wrapper').find('.list-unstyled').children('li').children('a').each(function(){
            var text=$(this).text();
            var lastWord=text.split(" ").pop();
            var index=text.indexOf(lastWord);
            text=text.substr(0,index);
            $(this).text("");
            lastWord=lastWord.toUpperCase();
            var html="<span>"+text+"</span>"+"<br><strong>"+lastWord+"</strong>";
            $(this).append(html);
        });
        $('.blue-background-wrapper p:last').css('margin-bottom','16px');
        $('.yellow-background-wrapper').find('.list-unstyled').children('li').children('a').each(function(){
            var text=$(this).text();
            var lastWord=text.split(" ").pop();
            var index=text.indexOf(lastWord);
            text=text.substr(0,index);
            $(this).text("");
            lastWord=lastWord.toUpperCase();
            var html="<span>"+text+"</span>"+"<br><strong>"+lastWord+"</strong>";
            $(this).append(html);
        });
        $('.yellow-background-wrapper').siblings('.layout-container').css('position','absolute');
        $('.yellow-background-wrapper').siblings('.layout-container').css('width','94%');
        $('.yellow-background-wrapper').siblings('.layout-container').addClass('horizontal-middle-align');
        $('.yellow-background-wrapper').siblings('.layout-container').css('margin-top','-28px');
        $('.yellow-background-wrapper').css('z-index','-1');
        var layoutHeight=$('.yellow-background-wrapper').siblings('.layout-container').height();
        $('.yellow-background-wrapper').css('padding-top',layoutHeight);
        $('.yellow-background-wrapper').css('padding-bottom',"27px");
        $('.yellow-background-wrapper p:last').css('margin-bottom','16px');
    }
    else{
        $('.blue-background-wrapper p:last').css('margin-bottom','32px');
        $('.yellow-background-wrapper p:last').css('margin-bottom','32px');
    }
})