$( document ).ready(function() {
    var activeNumber = $('.main-nav .nav-item').children('.nav-active').length;
    // console.log(number);
    if(activeNumber>1){
      $('.main-nav').children('li:first-child').find('a').removeClass('nav-active');
    }
  
  });