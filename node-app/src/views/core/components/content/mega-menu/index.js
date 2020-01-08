$(document).ready(function () {
var pathName= window.location.pathname ;
$('ul.main-nav').find('li.nav-item:not(".hidden-lg") > a').each(function(){
 var strLink =  $(this).attr('href');
 var split = strLink.indexOf('.html')-1; 
 strLink = strLink.substr(1,(strLink.indexOf('.html')-1));
 var strLink1 = strLink.lastIndexOf('/');
 strLink = strLink.substr(strLink1,split);
 strLink = pathName.indexOf(strLink);
 if(strLink > -1){
     $(this).addClass("nav-active");
 }

})
});