$(document).ready(function () {
    related();
    $(window).resize(function () {
		related();
    });
    function related(){
        let present = $(".recommended-products-article .related-articles");
        //console.log(present.length);
        if(present.length){
            var pageWidth=$(window).width();
            if(pageWidth<768){
                $(".recommended-products-article .aem-Grid").children(".text").last().css('text-align','center');
            }
            else{
                $(".recommended-products-article .aem-Grid").children(".text").last().css('text-align','left');
            }
        }
    }
});