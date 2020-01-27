$(document).ready(function(){
    popUpWidth();   
    function popUpWidth(){
        var popWidth=$(window).width();
        $(".popup-modal-wrapper").width(popWidth);
      };
      $(window).resize(function() {
            popUpWidth();
      });
      /* For Link listComponent */
      $('.popup-modal-wrapper .accordion-heading').click(function () {
		$(this).siblings('.list-div').toggle('collapse');
		$(this).parent().parent().parent().siblings().children().children().children('.list-div').css('display', 'none');
		$(this).parent().parent().parent().siblings().children().children().children('.list-div').siblings('h3').attr('aria-expanded', false);
		if ($(this).attr('aria-expanded') == 'true') {
			$(this).attr('aria-expanded', false);
		}
		else if ($(this).attr('aria-expanded') == 'false') {
			$(this).attr('aria-expanded', true);
		}
  });
  // $('.popup-modal-wrapper').each(function(){
  //   var $modal = $(this);
  //   var id = $(this).attr('id');
  //   $('a[href="#'+id+'"]').click(function(){
  //     $modal.show();
  //   });
  // });
});