$(document).ready(function () {
  function set_active(tab)
  {
    var tab_number=$(tab).index();
    var tab_child=tab_number+1;
    $(tab).addClass('cmp-tabs__tab--active');
	  $(tab).attr('aria-selected','true');
    $(tab).siblings().attr('aria-selected','false');
    $(tab).siblings().removeClass('cmp-tabs__tab--active');
    $('.cmp-tabs .cmp-tabs__tabpanel:nth-of-type('+tab_child+')').siblings('.cmp-tabs__tabpanel').removeClass('cmp-tabs__tabpanel--active');
    $('.cmp-tabs .cmp-tabs__tabpanel:nth-of-type('+tab_child+')').addClass('cmp-tabs__tabpanel--active');
    $(tab).siblings().attr('tabindex','-1');
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

    $('#language-btn-container').keyup(function (event) {
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
        if (e.which == 9 ) {
            e.preventDefault();
            $('.desktop-primary-navigation .navbar-new').children('li:first-child').children().focus();
            if(e.shiftKey){
              $("#language-btn").focus();
              e.preventDefault();
              $(".desktop-primary-navigation li").removeClass("open");
            }
        }
    });
    $("#sun-search .primary-blue-button-form .cmp-form-button").keydown(function(e){
      if (e.which == 9 ) {
          e.preventDefault();
          $('#sun-search .close-div a').focus();
      }
  });
    $('.desktop-primary-navigation .navbar-new').children('li:first-child').children().keydown(function(e){
        if (e.which == 9 ) {
            if(e.shiftKey) {
                $(".srch-btn").focus();
                e.preventDefault();
                $(".desktop-primary-navigation li").removeClass("open");
                $(".desktop-primary-navigation li a").removeClass("box-class");
            }
        }
    });

    $('.desktop-primary-navigation .navbar-new').children('li:last-child').children().keydown(function(e){
      if (e.which == 9 ) {
          
        // $(".srch-btn").focus();
        //e.preventDefault();
        $(".desktop-primary-navigation li").removeClass("open");
        $(".desktop-primary-navigation li a").removeClass("box-class");
          
      }
  });

// /* Full Header accessibility ends here */

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
$('.cmp-accordion__button,.cmp-accordion__panel').mousedown(function(e) {
  if (e.which === 1) {
      $(this).css({'outline':'none'});
  }
});
/* Accordion accessibility ends here */
});