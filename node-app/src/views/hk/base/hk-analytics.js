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

/* Sign in modal analytics starts here */
$("#SignIn,#signinbutton").click(function(){
    utag.link({ 
        ev_type: "authenticate", 
        ev_action: "clk", 
        ev_title: "sign in", 
        ev_data_one: "existing client"
});
    });
    $("#passwordDiv .moreon a").click(function(){
        var signLink=$(this).text();
        alert(signLink);
        utag.link({ 
            ev_type: "authenticate", 
            ev_action: "clk", 
            ev_title: "sign in", 
            ev_data_one: signLink
        });
    });      
/* Sign in modal analytics starts here */
/* contact us analytics starts here */
$(".contact-us").click(function(){
    utag.view({ 
        ev_type: "other", 
        ev_action: "onpage_impr", 
        ev_title: "contact-us-form", 
        ev_data_one: "form selected"
        });        
})
$(".contact-us dropdown").click(function(){
    utag.link({ 
        ev_type: "other", 
        ev_action: "clk", 
        ev_title: "contact-us-form", 
        ev_data_one: "nature of enquiry="+$(this).value()
        });              
});
/* contact us analytics ends here */
});