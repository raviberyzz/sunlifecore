$(document).ready(function () {
    $("#explore1").hover(function () { 
        $("#explore-menu").addClass('drop-down-class');
        $("#explore1").addClass("box-class");
    });
});
$(document).ready(function(){
 $("#explore-menu").hover(
     function(){
 $("#explore1").addClass("box-class");
 }, function(){
    $("#explore1").removeClass("box-class");
    }
 );
    $("#tools-menu").hover(
        function(){
    $("#tools1").addClass("box-class");
    }, function(){
       $("#tools1").removeClass("box-class");
       }
    );
    
});