$(document).ready(function(){
    $('.cmp-tabs__tab').click(function(){
       var tab_number=$(this).index();
       var tab_child=tab_number+1;
       $(this).addClass('cmp-tabs__tab--active');
       $(this).siblings().removeClass('cmp-tabs__tab--active');
       $('.cmp-tabs .cmp-tabs__tabpanel:nth-of-type('+tab_child+')').siblings('.cmp-tabs__tabpanel').removeClass('cmp-tabs__tabpanel--active');
       $('.cmp-tabs .cmp-tabs__tabpanel:nth-of-type('+tab_child+')').addClass('cmp-tabs__tabpanel--active');
    });
    $('.tab-accordian-heading').click(function(){
        $(this).siblings().toggle();
        if ($(this).attr('aria-expanded') == 'true') {
			$(this).attr('aria-expanded', false);
		}
		else if ($(this).attr('aria-expanded') == 'false') {
			$(this).attr('aria-expanded', true);
		}
    });
});