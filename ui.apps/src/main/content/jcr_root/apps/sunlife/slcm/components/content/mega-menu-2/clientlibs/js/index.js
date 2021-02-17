$(document).ready(function () {
    var pathArray = window.location.pathname.split('/');
    for (i = 0; i < pathArray.length; i++) {
        if ( pathArray[i] === 'asc') {
			var tiltleValue=$('.breadcrumb').find('li.active').text();	
                   if(tiltleValue!='') 
                   {
                     $('.main-nav').children('li:first-child').find('a').removeClass('nav-active');
                
                  }
                  var activeNumber = $('.main-nav .nav-item').children('.nav-active').length;
                 
                  if(activeNumber>1){
                     $('.main-nav').children('li:first-child').find('a').removeClass('nav-active');
                   }
        }
    }
});
