$( document ).ready(function() { 
    var articlePage = $("meta[property='og:type']").attr('content');
    $('.right-navigation-wrapper').find("a[href$='https://advisormatch.sunlife.com.ph']").each(function() {
        if (articlePage != 'Article') {
			changeLink($(this));
        }
    });
    $('a[href*="https://apps.sunlife.com.ph"]').each(function() {
        if (articlePage != 'Article') {
            var url = $(this).attr('href');
            var parentId = $(this).parents('.cmp-container').attr("id");
            if (url.indexOf('sourcePage') == -1 && parentId != 'cdttool') 
            {
                changeLink($(this));

            }
        }
    });
    $("#mainfooter").find("a[href$='https://advisormatch.sunlife.com.ph']").each(function() {
		
		changeLink($(this));

    });
});

function changeLink(thisObj) {

    var breadcrumb=utag_data.page_breadcrumb;
	var category = $(".breadcrumb .left-area").find("li:last span").text();
	var canonical_url= utag_data.page_canonical_url.replace("https://","");

    if(breadcrumb==="/home"){      
			var tempHref=$(thisObj).attr("href");
			//adding addtional parameter
			var extraparam="?"+encodeURIComponent("sourcePage="+canonical_url+"&breadcrumbs="+utag_data.page_breadcrumb);
			tempHref=$(thisObj).attr("href")+extraparam;  
			$(thisObj).attr("href",tempHref);        					                     
		} else { 
			var tempHref=$(thisObj).attr("href");
			var extraparam="?"+encodeURIComponent("sourcePage="+canonical_url+"&breadcrumbs="+utag_data.page_breadcrumb+"&product="+category);
			tempHref=$(thisObj).attr("href")+extraparam;
			$(thisObj).attr("href",tempHref);        					                    
		}

}