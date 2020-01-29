$(document).ready(function () {
   var $va = "<a href='javascript:void(0)' title='' " + "class= " +'"fa fa-info-circle"' + "> </a>";
    $($va).insertBefore(".tool-tip-box");
    var tool_content=$('.tool-tip-box').html();
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

    

    