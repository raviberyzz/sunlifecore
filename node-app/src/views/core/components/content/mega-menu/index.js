$(document).ready(function () {

    var pathName= window.location.pathname ;
console.log('pathname is' + pathName);


$('ul.main-nav').find('li.nav-item:not(".hidden-lg") > a').each(function(){

 var strLink =  $(this).attr('href');
 var split = strLink.indexOf('.html')-1;
 console.log(strLink);
 strLink = strLink.substr(1,(strLink.indexOf('.html')-1));
                          console.log(strLink);
 var strLink1 = strLink.lastIndexOf('/');
 console.log(strLink1);
 strLink = strLink.substr(strLink1,split);
 console.log(strLink);

 strLink = pathName.indexOf(strLink);
 console.log('strLink is' + strLink);

 if(strLink > -1){

     $(this).addClass("nav-active");

 }

})
});
