$(document).ready(function () {
    /* Carousel analytics starts here */
    if(".carousel-wrapper"){
        $(".cmp-carousel__item").each(function(){
            utag.view({ 
                ev_type: "ad", 
                ev_action: "onpage_impr", 
                ev_title: "*banner title*", 
                ev_data_one: "banner position=*position number of a banner*"
                })
                
        });
    }
    /* Carousel analytics ends here */
});