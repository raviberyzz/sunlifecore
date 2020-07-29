$(document).ready(function(){
  /* default functionality for visible first time in browser */  
  function highlighted(){ 
        $(".highlight-text").each(function(i, el) {
          var el = $(el);
          if (el.visible(true)) {
            el.addClass("active-text"); 
          } 
        });  
    }
    /*$(window).scroll(function(event) {
        highlighted();     
      });
      setTimeout(highlighted,800);*/ 
      var count = 0;
    $('.highlight-text').each(function( index ) {		
      if ($(this).isInViewport()) {
        $(this).addClass('active-text');
      }
      if(index == 0){
        count = 2;
        $(this).attr("style","transition-delay: "+count+"s;");
      }else{
        count = count + 3;
        $(this).attr("style","transition-delay: "+count+"s;");
      }
    });   
});
  $.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();  
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
  };
  $(window).on('resize scroll', function() {
    $('.highlight-text').each(function() {
      if ($(this).isInViewport()) {
        $(this).addClass('active-text');
      }
    });
  });

  (function($) {  
    $.fn.visible = function(partial) {     
        var $t            = $(this),
            $w            = $(window),
            viewTop       = $w.scrollTop(),
            viewBottom    = viewTop + $w.height(),
            _top          = $t.offset().top,
            _bottom       = _top + $t.height(),
            compareTop    = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;     
      return ((compareBottom <= viewBottom) && (compareTop >= viewTop)); 
    };    
  })(jQuery);