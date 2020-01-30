$(document).ready(function(){
    popUpWidth();   
    function popUpWidth(){
        var popWidth=$(window).width();
        $(".popup-modal-wrapper").width(popWidth);
      };
      $(window).resize(function() {
            popUpWidth();
      });
      
  $('a').click(function(){
    var anchorId=$(this).attr('href');
    var anchor=$(this);
    if(anchorId && anchorId.match("^#")){
      $('.popup-modal-wrapper').each(function(index){
        var modalId = $(this).attr('id');
        modalId='#'+modalId;
        if(modalId && anchorId.match(modalId)){
          anchor.attr('data-toggle','modal');
        }
      });
    }
  });
});