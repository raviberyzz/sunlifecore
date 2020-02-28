$(document).ready(function(){
    // $( ".highlight-text" ).one( "mousemove mousehover keydown scroll", function( event ) {
    //     alert( "The " + event.type + " event happened!" );
    //     a();
    //   });
    function highlighted(){ 
        $(".highlight-text").each(function(i, el) {
          var el = $(el);
          if (el.visible(true)) {
            el.addClass("active-text"); 
          } 
        });  
    }
    $(window).scroll(function(event) {
        highlighted();     
      });
      setTimeout(highlighted,800);     
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