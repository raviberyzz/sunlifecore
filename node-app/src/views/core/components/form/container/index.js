$(document).ready(function () {
	$('.editorial-nav-mobile-wrapper .cmp-form-button').addClass('fa fa-chevron-right');
    var pathName= window.location.pathname ;
	$('.editorial-nav-mobile-wrapper .cmp-form-options .cmp-form-options__field').find('option').each(function(){
	var strLink =  $(this).attr('value');
	var strLength = strLink.length;
	var split = strLink.indexOf('.ca')+3; 
	strLink = strLink.substr(split,(strLength-1));
	strLink1 = pathName.indexOf(strLink);
	if(strLink1 > -1){
		$(this).attr("selected","selected");
	}
	})
	$('.editorial-nav-mobile-wrapper .cmp-form-button').click(function(){
		var link_selected=$('.editorial-nav-mobile-wrapper .cmp-form-options .cmp-form-options__field--drop-down').val();
		window.location.href=link_selected;
		return false;
	});
});