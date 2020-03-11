$(document).ready(function () {
    /* Carousel analytics starts here */
    if(".carousel-wrapper"){
        $(".cmp-carousel__item").each(function(){
            var bannerPosition=$(this).index()+1;
            var bannerTitleText=$(this).find(".right-item.text-section").text();
            utag.link({ 
                ev_type: "ad", 
                ev_action: "onpage_impr", 
                ev_title:	bannerTitleText, 
                ev_data_one: "banner position="+bannerPosition
                });           
        });
        $(".cmp-carousel__item").click(function(){
			var bannerPosition=$(this).index()+1;
            var bannerTitleText=$(this).find(".right-item.text-section").text();
            utag.link({ 
            ev_type: "ad", 
            ev_action: "clk", 
            ev_title: bannerTitleText,
            ev_data_one: "banner position="+bannerPosition
            });
        })
    }
    /* Carousel analytics ends here */
});