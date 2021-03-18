
$(document).ready(function () {
   if(typeof ContextHub == "undefined"){
      bindNavigationEvent();
   }
   else{
      checkHeader();
   }
   function checkHeader(){
      if($(".us-sunlife-home-page").length==0){
         if($(".desktop-mega-menu").length==0){
            setTimeout(checkHeader, 500);
         }   
         else{
            bindNavigationEvent();
         }
      }
   }
   function bindNavigationEvent(){
      $(".desktop-primary-navigation .nav-item.navigation").hover(function () {
         $(this).addClass('open');
      }, function () {
         $(".desktop-primary-navigation .nav-item.navigation").removeClass("open");
      }
      );
      $(".desktop-primary-navigation .nav-item .menu-content").hover(function () {
         $(this).siblings().addClass('box-class');
      }, function () {
         $(this).siblings().removeClass('box-class');
      }
      );
   
      $(".desktop-primary-navigation-yellow .nav-item.navigation").hover(function () {
         $(this).addClass('open');
      }, function () {
         $(".desktop-primary-navigation-yellow .nav-item.navigation").removeClass("open");
      }
      );
      $(".desktop-primary-navigation-yellow .nav-item .menu-content").hover(function () {
         $(this).siblings().addClass('box-class-yellow');
      }, function () {
         $(this).siblings().removeClass('box-class-yellow');
      }
      );
      $('.desktop-primary-navigation a[data-toggle=dropdown]').click(function(){
         location.href = this.href;
     })
   }
   
});