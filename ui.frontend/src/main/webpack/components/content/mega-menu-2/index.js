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
   var menuHeight=0;
 $( ".cmp-dynamic-megamenu .dropdown-submenu ").hover(
     function(){
        menuHeight= $(this).parent().parent().parent().parent().parent().parent().height();
          var submenuHeight=$(this).children('.dropdown-menu').height();
         if ( submenuHeight > menuHeight)
         {
             $('.cmp-dynamic-megamenu').height(submenuHeight+13);
         }
         else
         {
             $(this).children('.dropdown-menu').height(menuHeight);
         }

 },function(){
   $('.cmp-dynamic-megamenu').height(menuHeight);
    }
 );
});


$(document).ready(function(){
   var menuHeight=0;
 $( ".cmp-dynamic-megamenu-grey .dropdown-submenu ").hover(
     function(){
         menuHeight= $(this).parent().parent().parent().parent().parent().parent().height();
          var submenuHeight=$(this).children('.dropdown-menu').height();
         if ( submenuHeight > menuHeight)
         {
            $(this).parent().parent().parent().parent().height(submenuHeight+9);
         }
          else
         {
             $(this).children('.dropdown-menu').height(menuHeight-10);
         }

 },function() {
  $(this).parent().parent().parent().parent().height(menuHeight);
  }
 );
});