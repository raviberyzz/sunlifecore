$(document).ready(function(){
    $('.tabs-wrapper .cmp-tabs__tab--active').attr('aria-selected','true');
    var li_arr=$('.cmp-tabs__tablist').children();
    $('.cmp-tabs__tab').click(function(){
      set_active($(this));
    });
    $('.tab-accordian-heading').click(function(){
        $(this).siblings().toggle();
        $(this).parent().siblings().children('.tab-accordian-heading').siblings().css('display','none');
        $(this).parent().siblings().children('.tab-accordian-heading').attr('aria-expanded', false);
        if ($(this).attr('aria-expanded') == 'true') {
			  $(this).attr('aria-expanded', false);
		}
		else if ($(this).attr('aria-expanded') == 'false') {
			$(this).attr('aria-expanded', true);
		}
    });


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
});