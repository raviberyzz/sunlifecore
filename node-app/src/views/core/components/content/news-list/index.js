$(document).ready(function () {
   if($(window).width() < 768){
    $('.news-list .tab-accordian-heading').unbind('click');
	$('.news-list .tab-accordian-heading').click(function(event){
        if ($(this).attr('aria-expanded') == 'true') {
			event.preventDefault();
		}
		else if ($(this).attr('aria-expanded') == 'false') {
			$(this).attr('aria-expanded', true);
		}
    });
   }
	
});