$(document).ready(function () {

//Comparison table Analytics starts here//
$('.getting-started-icon-wrapper .icon-texts a').click(function(){
    value=$(this).text().toLowerCase();
	//alert(value);
    if (value == 'compare life insurance products'){
    	utag.link({
            "ev_action"		: "onpage_impr",
  			"ev_title"		: value+ "modal open",
  			"ev_type"		: "other"
        });
    }
    else if(value == 'compare term life insurance products modal open'){
        utag.link({
            "ev_action"		: "onpage_impr",
  			"ev_title"		: value+ "modal open",
  			"ev_type"		: "other"
        });
    }
    else if(value == 'compare permanent life insurance products modal open'){
        utag.link({
            "ev_action"		: "onpage_impr",
  			"ev_title"		: value+ "modal open",
  			"ev_type"		: "other"
        });
    }

    });	
//Comparison table Analytics ends here//    

});
