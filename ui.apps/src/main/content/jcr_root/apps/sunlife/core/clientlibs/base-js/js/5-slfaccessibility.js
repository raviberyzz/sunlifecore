$(document).ready(function () {
  
var ENTER = 13;
var TAB = 9;
var DOWN = 40;
var RIGHT = 39;
var LEFT = 37;
var UP = 38;
var ESC = 27;
// Adds aria-labels to mega menu by tagging it with the text in the anchor tags 
function addMegaMenuAriaLabels () {
  $(".desktop-mega-menu .dropdown-menu .mega-menu-wrapper-desk a:not(.icon-style)").each(function(){
    $(this).attr("aria-label", $(this).text());
  });
}
addMegaMenuAriaLabels();
  function set_active(tab)
  {
    var tab_number=$(tab).index();
    var tab_child=tab_number+1;
    $(tab).addClass('cmp-tabs__tab--active');
	  $(tab).attr('aria-selected','true');
    $(tab).siblings().attr('aria-selected','false');
    $(tab).siblings().removeClass('cmp-tabs__tab--active');
    // $('.cmp-tabs .cmp-tabs__tabpanel:nth-of-type('+tab_child+')').siblings('.cmp-tabs__tabpanel').removeClass('cmp-tabs__tabpanel--active');
    // $('.cmp-tabs .cmp-tabs__tabpanel:nth-of-type('+tab_child+')').addClass('cmp-tabs__tabpanel--active');
    $(tab.parent().parent().children('.cmp-tabs__tabpanel:nth-of-type('+tab_child+')')).siblings('.cmp-tabs__tabpanel').removeClass('cmp-tabs__tabpanel--active');
    $(tab.parent().parent().children('.cmp-tabs__tabpanel:nth-of-type('+tab_child+')')).addClass('cmp-tabs__tabpanel--active');
    $(tab).siblings().attr('tabindex','-1');
    $(tab).attr('tabindex','0');
  }
  /* Tabs Accessibility Starts Here*/
  $('.tabs-wrapper ol li').keyup(function (event) {

    if (event.keyCode == 39) {
      var temp_tab = $(this);
      var nextTab;
     
      if (temp_tab.is('li:last-child')) {
        nextTab = temp_tab.parent().children().first();
       
       
      } else {
        nextTab = $(this).next();
        
      }
      nextTab.focus();
      set_active(nextTab);
      }
      if (event.keyCode == 37)
      {
        var temp_tab = $(this);
        var prevTab;
       
        if (temp_tab.is('li:first-child')) {
          prevTab = temp_tab.parent().children().last();     
         
        } else {
          prevTab = $(this).prev();
        }
        prevTab.focus();
        set_active(prevTab);
      }
});
/* Tabs Accessibility Ends Here*/
  if(typeof ContextHub == "undefined"){
    bindAccessibilityEvent();
  }
  else{
    setTimeout(bindAccessibilityEvent, 3000);
  }
  function bindAccessibilityEvent(){
  // /* Full Header accessibility starts here */
      $('.search-icon-container').keyup(function (event) {

          if (event.keyCode == 13) {
              if ($('#sun-search').hasClass('in')) {
                  $('#sun-search').removeClass('in');
                  $("#search-btn").attr('aria-expanded', 'false');
              }
              else {
                  $('#sun-search').css("height","128px");
                  $('#sun-search').addClass('in');
                  $("#search-btn").attr('aria-expanded', 'true');
                  $("#language-btn").attr('aria-expanded', 'false');
                  $("#sun-language").removeClass('in');
                  $("#q-top").focus();
              }
          }
      });

      $('#language-btn-container').keydown(function (event) {
          if (event.keyCode == 13) {
              if ($('#sun-language').hasClass('in')) {
                  $('#sun-language').removeClass('in');
                  $("#language-btn").attr('aria-expanded', 'false');
              }
              else {
                  $('#sun-language').addClass('in');
                  $("#language-btn").attr('aria-expanded', 'true');
                  $("#search-btn").attr('aria-expanded', 'false');
                  $("#sun-search").removeClass('in');
                  $(".sunLanguageCrossBtn").focus();
              }
          }
      });
      $("#search-btn").keydown(function(e){
        if($(".desktop-primary-navigation").length!=0){
          if (e.which == 9 ) {
              e.preventDefault();
              $('.desktop-primary-navigation .navbar-new').children('li:first-child').children().focus();
              if(e.shiftKey){
                $("#language-btn").focus();
                e.preventDefault();
                $(".desktop-primary-navigation li").removeClass("open");
              }
          }
        }
      });
      $(".sunLanguageCrossBtn").keydown(function(e){
        if (e.which == 13 ) {
            e.preventDefault();
            $("#sun-language").removeClass('in');
              $('#language-btn').removeClass('lang-true');
              $('#language-btn').focus();
        }
    });
      $("#sun-search .close-div .fa-remove.collapse-x").keydown(function(e){
        if (e.which == 13 ) {
              $('#search-btn').focus();
        }
    });
      $("#sun-search .primary-blue-button-form .cmp-form-button").keydown(function(e){
        if (e.which == 9 ) {
          if(!$(this).parents().hasClass("adv-search-bar-wrapper")){
            e.preventDefault();
            $('#sun-search .close-div a').focus();
          }
        }
    });
      $('.desktop-primary-navigation .navbar-new').children('li:first-child').keydown(function(e){
          if (e.which == 9 ) {
              if(e.shiftKey) {
                  $(".srch-btn").focus();
                  e.preventDefault();
                  $(".desktop-primary-navigation li").removeClass("open");
                  $(".desktop-primary-navigation li a").removeClass("box-class");
              }
          }
      });


      $('.signIn-button').children('a').on("focus", function(){
        $('.navigation').removeClass("open");
        $('.navigation').children('a').removeClass("box-class");
        $('.navigation').removeClass("open");
      });

      $('.desktop-primary-navigation .navbar-nav li a').on('keydown', function (e) {
        if ($('.desktop-primary-navigation .navbar-nav').hasClass('focus-exp')) {
          if (e.keyCode == TAB) {
            $(this).parent().removeClass("open");
            $(this).parent().next().focus();
          }
          if (e.keyCode == ESC) {
            e.preventDefault();
            e.stopPropagation();
            $(this).parent().removeClass("open");
            $(this).parent().focus();
          }
        }
      });

      $('.desktop-primary-navigation .mega-menu-wrapper-desk').find('a').on('keydown', function (e) {
        if (e.keyCode == ESC) {
          // console.log("escape");
          e.preventDefault();
          e.stopPropagation();
          $(this).closest('.navigation').removeClass("open");
        }
      });
      $('.desktop-primary-navigation .cmp-dynamic-megamenu-grey .text a').on('keydown', function (e) {
        if (e.keyCode == DOWN) {
          // console.log("down3");
          e.preventDefault();
          e.stopPropagation();
          $(this).parents('.text').next('.text').find('a').focus();
        }
        if (e.keyCode == UP) {
            // console.log("up3");
            e.preventDefault();
            e.stopPropagation();
            var firstLink = $(this).closest('.col-sm-3').find('a').first().get(0);
            if($(this).get(0) == firstLink){
              if($(this).closest('.col-sm-3').prev('.col-sm-3').find('a').last().parent().parent().hasClass('dropdown-menu')){
                $(this).closest('.col-sm-3').prev('.col-sm-3').find('a').last().parent().parent().siblings('a').focus();
              }
              else{
                $(this).closest('.col-sm-3').prev('.col-sm-3').find('a').last().focus();
              }
            }
            else{
              $(this).parents('.text').prev('.text').find('a').focus();
            }
        }
      });
      $('.desktop-primary-navigation .navbar-new .dropdown-menu .mega-menu2-list li a').on('keydown', function (e) {
        if (e.keyCode == DOWN) {
          // console.log("down");
          e.preventDefault();
          e.stopPropagation();
          if($(this).parent().is(':last-child')){
              // console.log("shift");
              $(this).closest('.col-sm-3').next('.col-sm-3').find('a').first().focus();
          }
          else{
              // console.log($(this).parent().next());
            $(this).parent().next('li').children('a').focus();
          }
        }
        if (e.keyCode == UP) {
          // console.log("up");
          e.preventDefault();
          e.stopPropagation();
          $(this).parent().prev('li').children('a').focus();
        }
        if (e.keyCode == RIGHT) {
          // console.log("right");
          e.preventDefault();
          e.stopPropagation();
          if($(this).parent('li').hasClass('dropdown-submenu')){
            var subMenu= $(this).closest('.dropdown-submenu');
            $(this).parent().hover();
            $(this).closest('.dropdown-submenu').addClass('open');
            setHeight(subMenu);
            $(this).siblings('ul').children('li:first-child').children('a').focus();
            $(this).siblings('ul').children('li:last-child').children('a').on('keydown', function (e) {
                if (e.keyCode == DOWN) {
                  // console.log("down2");
                  e.preventDefault();
                  e.stopPropagation();
                  $(this).closest('.dropdown-submenu').removeClass('open');
                  $(this).closest('.cmp-dynamic-megamenu-grey').css('height','auto');
                  $(this).parent().parent().siblings('a').focus();
                }
            })
          }
        }
      });

      // open the full header menu on focus for screen readers. 
      $('.navigation').children('a').on("focus", function(){
        $('.navigation').removeClass("open");
        $('.navigation').children('a').removeClass("box-class");
        $('.navigation').removeClass("open");
        $(this).parent().addClass("open");
        $(this).addClass('box-class');
      });
  // /* Full Header accessibility ends here */
  }

/* Footer accessibility starts here */

// $('.links .accordion-heading').keyup(function (event) {
//         if (event.keyCode == 13) {
// 			if($(this).attr('aria-expanded')=='false'){
// 			$(this).attr('aria-expanded','true');
// 			$(this).siblings().css('display','block');
// 			}
// 			else{
// 				$(this).attr('aria-expanded','false');
// 				$(this).siblings().css('display','none');
// 		}
// 	  }
// 	});
/* Footer accessibility ends here */

/* Accordion accessibility starts here */
  $('.cmp-accordion__button,.cmp-accordion__panel').mouseup(function(e) {
    $(this).addClass('clicking');
  });

  $('.cmp-accordion__button,.cmp-accordion__panel').keyup(function(e) {
    if (e.keyCode === TAB) {
      $(this).removeClass('clicking');
      $(this).focus();
    }
  });
/* Accordion accessibility ends here */
});
/* function to dynamically set height of submenu starts here*/
function setHeight(a) 
{
  menuHeight= a.parent().parent().parent().parent().parent().parent().height();
  var submenuHeight=a.children('.dropdown-menu').height();
  if ( submenuHeight > menuHeight){
    a.parent().parent().parent().parent().height(submenuHeight+9);
  }
  else{
      a.children('.dropdown-menu').height(menuHeight-10);
  }
}
/* function to dynamically set height of submenu ends here*/