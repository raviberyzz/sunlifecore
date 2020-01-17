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

/* Full Header accessibility starts here */
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
        }
    });
    $('.desktop-primary-navigation .navbar-new').children('li:first-child').children().keydown(function(e){
        if (e.which == 9 ) {
            if(e.shiftKey) {
                $(".srch-btn").focus();
                e.preventDefault();
            }
        }
    });

/* Full Header accessibility ends here */
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