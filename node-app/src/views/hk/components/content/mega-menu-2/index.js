$( document ).ready(function() {
  var tiltleValue=$('.breadcrumb').find('li.active').text();	
if(tiltleValue!='') 
{
  $('.main-nav').children('li:first-child').find('a').removeClass('nav-active');
  }
});