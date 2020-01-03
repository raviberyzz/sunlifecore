$(document).ready(function(){
   var menuHeight= $('.slf-header-mega-menu2').height();
   var submenuHeight=$('.dropdown-submenu .dropdown-menu').height();
    $( ".dropdown-submenu").hover(
        function(){
            $('.slf-header-mega-menu2').height(submenuHeight+5);
    },function(){
      $('.slf-header-mega-menu2').height(menuHeight);
       }
    );
   });

   /*AEM JS*/
   $(document).ready(function(){
    var menuHeight= $('.cmp-dynamic-megamenu').height();
    var submenuHeight=$('.dropdown-submenu .dropdown-menu').height();
     $( ".dropdown-submenu").hover(
         function(){
             $('.cmp-dynamic-megamenu').height(submenuHeight+13);
     },function(){
       $('.cmp-dynamic-megamenu').height(menuHeight);
        }
     );
   });