
$(document).ready(function () {
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
});