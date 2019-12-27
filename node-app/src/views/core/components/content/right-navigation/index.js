$(document).ready(function () {
    var children1=$('.right-navigation-wrapper').children().length;
    var children2=$('.right-navigation-wrapper').children(".yellow-horizontal-separator").length;
    var children=children1-children2;
    if (( $(window).width() <1025 &&  $(window).width() >767 )){
        rightNav();
        // var mH=maxHeight();
        // alert(mH);
    }
    
       $( window ).resize(function() {
          rightNav();
          maxHeight();
      
      
       });
       $(window).on('load',function() {
       
        maxHeight();
    
    
     });
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
        $('.right-navigation-wrapper').children().css('height','auto');
       }
    }
    function maxHeight(){
        if (( $(window).width() <1025 &&  $(window).width() >767 )) {
            var maxHeight = -1;

            $('.right-navigation-wrapper').children().each(function() {
              maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
             
            });
            
            //return maxHeight;
            $('.right-navigation-wrapper').children().each(function() {
              $(this).height(maxHeight);
            });
        }
    }
    
    
 
 });
 