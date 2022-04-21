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
	//Specific for News List Component Tab on Enter Key
  $('.news-list .tabs-wrapper.news ol li').keyup(function (event) {
	if (event.keyCode == 13) {
		window.location.href = $(this).children("a").attr("href");
	}
  });
});