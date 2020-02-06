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
        $('.yellow-background-wrapper p:last').css('margin-bottom','16px');
    }
    else{
        $('.blue-background-wrapper p:last').css('margin-bottom','32px');
        $('.yellow-background-wrapper p:last').css('margin-bottom','32px');
    }
})