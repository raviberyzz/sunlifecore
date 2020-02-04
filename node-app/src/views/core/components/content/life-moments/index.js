$(document).ready(function () {
    var pageWidth=$(window).width();
    if(pageWidth>=768){
        $('.blue-background-wrapper').find('.list-unstyled').children('li').children('a').each(function(){
            var text=$(this).text();
            var words=text.split(" ");
            var index=text.indexOf(words[2]);
            text=text.substr(0,index);
            $(this).text("");
            words[2]=words[2].toUpperCase();
            var html="<span>"+text+"</span>"+"<br>"+words[2];
            $(this).append(html);
        });
        $('.blue-background-wrapper p:last').css('margin-bottom','16px');
        $('.yellow-background-wrapper').find('.list-unstyled').children('li').children('a').each(function(){
            var text=$(this).text();
            var words=text.split(" ");
            var index=text.indexOf(words[2]);
            text=text.substr(0,index);
            $(this).text("");
            var html="<span>"+text+"</span>"+"<br>"+words[2];
            $(this).append(html);
        });
        $('.yellow-background-wrapper p:last').css('margin-bottom','16px');
    }
    else{
        $('.blue-background-wrapper p:last').css('margin-bottom','32px');
        $('.yellow-background-wrapper p:last').css('margin-bottom','32px');
    }
})