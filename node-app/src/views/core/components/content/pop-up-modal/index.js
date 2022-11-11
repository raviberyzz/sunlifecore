$(document).ready(function(){
  
      $('.popup-modal-wrapper').on('show.bs.modal', function () {

     		var inputs = $('.popup-modal-wrapper').find('select, input:not(:hidden), textarea, button, a');

    
    		 var firstInput = inputs.first();
    		 var lastInput = inputs.last();
 

    		 /*set focus on first input*/
    		 firstInput.focus();

    		 /*redirect last tab to first input*/
    		 lastInput.on('keydown', function (e) {
        
        		 if ((e.which === 9 && !e.shiftKey)) {
           		  e.preventDefault();
            		 firstInput.focus();
        		 }
     		});

    		 /*redirect first shift+tab to last input*/
   		  firstInput.on('keydown', function (e) {
       
         if ((e.which === 9 && e.shiftKey)) {
             e.preventDefault();
             lastInput.focus();
         }
     });

 }); 
    popUpWidth();
    popUpHeight(); 
    function popUpWidth(){
        var popWidth=$(window).width();
        $(".popup-modal-wrapper").width(popWidth);
      };
    function popUpHeight(){
      var popHeight=$(document).height();
      $(".popup-modal-wrapper").height(popHeight);
    }
    $(window).resize(function() {
          popUpWidth();
          popUpHeight();
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
