$(document).ready(function(){
    //$('.tabs-wrapper .cmp-tabs__tab--active').attr('aria-selected','true');
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
    if (window.innerWidth < 768) {
      let isSiteLevelNotification =  ($('.site-level-notification').length > 0)?true:false;
      let bufferZone = isSiteLevelNotification?$('.site-level-notification').outerHeight()+50:50;
      $([document.documentElement, document.body]).animate({
        scrollTop: $(this).parent().offset().top - bufferZone },1);
    }
    });

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
    $(tab).attr('tabindex','0');
  }
});