$(document).ready(function(){
  //$('.tabs-wrapper .cmp-tabs__tab--active').attr('aria-selected','true');
  var li_arr=$('.cmp-tabs__tablist').children();
  var url = window.location.href;
  if(url.indexOf("#")!=-1){
    var id = url.substring(url.lastIndexOf("#"), url.length);
    if (id != "#") {
      if($(id).length>0 && $(id).parents().hasClass('tabs-wrapper')){
        set_active($(id));
        mobile_accordian_open($(id));
      }
    }
  }
  
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
    var isSiteLevelNotification =  ($('.site-level-notification').length > 0)?true:false;
    var bufferZone = isSiteLevelNotification?$('.site-level-notification').outerHeight()+50:50;
    $([document.documentElement, document.body]).animate({
      scrollTop: $(this).parent().offset().top - bufferZone },1);
  }
  });
  
 var on_load_page_width = $(document).width();
  $(window).resize(function(){
      if (window.innerWidth < 768 && $(window).width() != on_load_page_width) {
        $('.tabs-wrapper .cmp-tabs__tabpanel .tab-accordian-heading').siblings().css('display', 'none');
          $('.tabs-wrapper .cmp-tabs__tabpanel .tab-accordian-heading').attr('aria-expanded', false);
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
  // $('.cmp-tabs .cmp-tabs__tabpanel:nth-of-type('+tab_child+')').siblings('.cmp-tabs__tabpanel').removeClass('cmp-tabs__tabpanel--active');
  // $('.cmp-tabs .cmp-tabs__tabpanel:nth-of-type('+tab_child+')').addClass('cmp-tabs__tabpanel--active');
  $(tab.parent().parent().children('.cmp-tabs__tabpanel:nth-of-type('+tab_child+')')).siblings('.cmp-tabs__tabpanel').removeClass('cmp-tabs__tabpanel--active');
  $(tab.parent().parent().children('.cmp-tabs__tabpanel:nth-of-type('+tab_child+')')).addClass('cmp-tabs__tabpanel--active');
  $(tab).siblings().attr('tabindex','-1');
  $(tab).attr('tabindex','0');
}
  function mobile_accordian_open(tab) {
      var tab_number=$(tab).index();
      var tab_child=tab_number+1;
      $(tab.parent().parent().children('.cmp-tabs__tabpanel:nth-of-type('+tab_child+')')).children('.tab-accordian-heading').siblings().css('display','block');
      $(tab.parent().parent().children('.cmp-tabs__tabpanel:nth-of-type('+tab_child+')')).children('.tab-accordian-heading').attr('aria-expanded', true);
  }

});
