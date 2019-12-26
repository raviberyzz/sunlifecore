$(document).ready(function () {
    function rightNav(){

        
        if (( $(window).width() <1025 &&  $(window).width() >767 )) {
          
            if (children==2){
                $('.right-navigation-wrapper').children().css('width','50%');
               }
               if(children==3)
               {
                $('.right-navigation-wrapper').children().css('width','33.33%');
               }
        if(children==4)
            {
                $('.right-navigation-wrapper').children().css('width','50%');
            }
            if (children==5)
            {
               

                $('.right-navigation-wrapper').children('div:nth-child(1)').css('width','33.33%');
                $('.right-navigation-wrapper').children('div:nth-child(3)').css('width','33.33%');
                $('.right-navigation-wrapper').children('div:nth-child(5)').css('width','33.33%');
                $('.right-navigation-wrapper').children('div:nth-child(7)').css('width','50%');
                $('.right-navigation-wrapper').children('div:nth-child(9)').css('width','50%');
              
            }
            if (children==6)
            {
                $('.right-navigation-wrapper').children().css('width','33.33%');
            }
       }
      
       else
       {
        $('.right-navigation-wrapper').children().css('width','100%');
       }
    }
    rightNav();
    var children1=$('.right-navigation-wrapper').children().length;
    var children2=$('.right-navigation-wrapper').children(".yellow-horizontal-separator").length;
    var children=children1-children2;
       $( window ).resize(function() {
          rightNav();
      
      
       });
 
 });

