$(document).ready(function(){
	$('.breadcrumb .social-link-icon-wrapper .fa-envelope').click(shareURL);
});


function shareURL(){
	var title = document.getElementsByTagName("title")[0].innerHTML;
	var seoDesc = document.querySelector("meta[property='og:description']").getAttribute("content");
	var currentURL = window.location.href ;
	var link = "mailto:"
             + "?subject=" + title
             + "&body=" + seoDesc + "%0D%0A" + "%0D%0A" +escape(currentURL)
    ;

    window.location.href = link;
}
