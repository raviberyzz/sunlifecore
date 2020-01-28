$(document).ready(function(){
    popUpWidth();   
    function popUpWidth(){
        var popWidth=$(window).width();
        $(".popup-modal-wrapper").width(popWidth);
      };
      $(window).resize(function() {
            popUpWidth();
      });
  // $('.popup-modal-wrapper').each(function(){
  //   var $modal = $(this);
  //   var id = $(this).attr('id');
  //   $('a[href="#'+id+'"]').click(function(){
  //     $modal.show();
  //   });
  // });
  // $('.primary-blue-button').click(function(){
  //   //$('#modal').addClass('in');
  //   $('#modal').css({'display':'block'});
  //   $('body').addClass('modal-open');
  // });
});