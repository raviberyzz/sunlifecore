$(document).ready(function () {
    var $va = "<a href='javascript:void(0)' title='' " + "class= " +'"fa fa-info-circle"' + "> </a>";
    $($va).insertBefore(".tool-tip-box:first");
     var tool_content= "";
     $( "span.tool-tip-box" ).each(function() {
      tool_content = tool_content +"<p>"+ $( this ).html()+"</p>";
     });
     $('.fa-info-circle').attr('data-toggle','tooltip');
     $('.fa-info-circle').attr('data-placement','right');
     $('.fa-info-circle').attr('data-html','true');
     $('.fa-info-circle').attr('data-original-title',tool_content);
     $('.tool-tip-box').css('display','none');
     $('[data-toggle="tooltip"]').tooltip();
     $('.fa-info-circle').click(function(){
       $('.fa-info-circle').css('text-decoration','none');
     });
 });
 
     
 
     
 
     
 
     