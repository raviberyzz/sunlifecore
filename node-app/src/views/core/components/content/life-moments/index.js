$(document).ready(function () {
    $('.blue-background-wrapper').find('.list-unstyled').children('li').children('a').each(function(){
        var text=$(this).text();
        var words=text.split(" ");
        var index=text.indexOf(words[2]);
        text=text.substr(0,index);
        $(this).text("");
        var html="<span>"+text+"</span>"+"<br>"+words[2];
        $(this).append(html);
    })
    $('.yellow-background-wrapper').find('.list-unstyled').children('li').children('a').each(function(){
        var text=$(this).text();
        var words=text.split(" ");
        var index=text.indexOf(words[2]);
        text=text.substr(0,index);
        $(this).text("");
        var html="<span>"+text+"</span>"+"<br>"+words[2];
        $(this).append(html);
    })
})