$(document).ready(function () {
  var windowsize = $( window ).width();
  //faCircle();
$(".cmp-text,th,td").each(function(){
    var tool=$(this).find(".tool-tip-box:first");
var $va = "<a href='javascript:void(0)' title='' " + "class= " +'"fa fa-info-circle"' + "> </a>";
  $($va).insertBefore(tool);
    var tool_content= "";
    if($(this).attr('class')==='cmp-text'){
     $(this).children().children(".tool-tip-box").each(function(){
  tool_content = tool_content +"<p>"+ $(this).html()+"</p>";
     });
    }
    else{
    $(this).children(".tool-tip-box").each(function(){
  tool_content = tool_content +"<p>"+ $(this).html()+"</p>";
    });
    }
     $('.fa-info-circle').attr('data-toggle','tooltip');
    if(windowsize>767){
            $('.fa-info-circle').removeAttr('data-placement');
          $('.fa-info-circle').attr('data-placement','right');
        } else {
            $('.fa-info-circle').removeAttr('data-placement');
          $('.fa-info-circle').attr('data-placement','bottom');
        }

     $('.fa-info-circle').attr('data-html','true');
    if($(this).attr('class')==='cmp-text'){
     $(this).find('a').attr('data-original-title',tool_content);
    }
    else{
    $(this).children('a').attr('data-original-title',tool_content);
    }
     $('[data-toggle="tooltip"]').tooltip();
     $('.fa-info-circle').click(function(){
       $('.fa-info-circle').css('text-decoration','none');
     });

});

  function faCircle(){
		$('[data-toggle="tooltip"]').tooltip();
      //$('[data-toggle="tooltip"]').tooltip('update');
        if(windowsize>767){
            //$('.fa-info-circle').removeAttr('data-placement');
          $('.fa-info-circle').attr('data-placement','right');
        } else {
            ///$('.fa-info-circle').removeAttr('data-placement');
          $('.fa-info-circle').attr('data-placement','bottom');
        }
    }
  $( window ).resize( function () {
  $('[data-toggle="tooltip"]').tooltip('hide');
   //$('[data-toggle="tooltip"]').tooltip();
  windowsize = $( window ).width();
  faCircle();
  });
});