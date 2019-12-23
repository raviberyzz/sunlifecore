// $(document).ready(function () {
//     $("#explore1").hover(function () { 
//         $("#explore-menu").addClass('drop-down-class');
//         $("#explore1").addClass("box-class");
//     });
// });
$(document).ready(function(){
 $("#explore1").hover(
     function(){
        $("#explore1").addClass("open");
        
 }, function(){
    $("#explore1").removeClass("open");
    }
 );
    $("#tools1").hover(
        function(){
            $("#tools1").addClass("open");
    }, function(){
       $("#tools1").removeClass("open");
       }
    );
    
});