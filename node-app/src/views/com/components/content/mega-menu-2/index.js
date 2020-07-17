$( document ).ready(function() {
  var tiltleValue=$('.breadcrumb').find('li.active').text();	
  if(tiltleValue!='') 
  {
    $('.main-nav').children('li:first-child').find('a').removeClass('nav-active');

  }
  var activeNumber = $('.main-nav .nav-item').children('.nav-active').length;
  // console.log(number);
  if(activeNumber>1){
    $('.main-nav').children('li:first-child').find('a').removeClass('nav-active');
  }
});