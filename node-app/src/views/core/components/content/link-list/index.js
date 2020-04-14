$(document).ready(function () {
	$('footer .accordion-heading').click(function () {
		$(this).siblings('.list-div').toggle('collapse');
		$(this).closest('.col-xs-12').siblings().find('.list-div').css('display', 'none');
        $(this).closest('.col-xs-12').siblings().find('.accordion-heading').attr('aria-expanded', false);
		$(this).closest('.col-xs-12').parent().siblings().find('.list-div').css('display', 'none');
        $(this).closest('.col-xs-12').parent().siblings().find('.accordion-heading').attr('aria-expanded', false);
		if ($(this).attr('aria-expanded') == 'true') {
			$(this).attr('aria-expanded', false);
		}
		else if ($(this).attr('aria-expanded') == 'false') {
			$(this).attr('aria-expanded', true);
		}
	});
	var pathName= window.location.pathname;
	$('.editorial-nav-desktop-wrapper .list-div ul').find('a').each(function(){
		var strLink =  $(this).attr('href');
		var strLink1 = strLink.localeCompare(pathName);
		if(!strLink1){
			$(this).parent().addClass("selected");
		}
	})

	$('.left-nav-list-wrapper .list-div ul').find('a').each(function(){
		var strLink =  $(this).attr('href');
		var strLink1 = strLink.localeCompare(pathName);
		if(!strLink1){
			$(this).parent().addClass("selectedlink");
		}
	})
   // editorial navigation logic starts here
   function mobileEditorial(){
		if($(window).width() < 768){
			if($(".editorial-nav-desktop-wrapper").length){
				if( $(".editorial-nav-desktop-wrapper .lists-wrapper .links .list-div form").length){
				$(".editorial-nav-desktop-wrapper .lists-wrapper .links .list-div form").remove();
				}
			console.log("working2");
				var items=[];
				var mobileNavigation = "<form><div><label class='sr-only'>Select a topic</label><select></select></div><div><button><span class='fa fa-chevron-right'></span></button></div></form>";
				$(".editorial-nav-desktop-wrapper .lists-wrapper .links .list-div .list-unstyled").after(mobileNavigation);
				$(".editorial-nav-desktop-wrapper .lists-wrapper .links .list-div .list-unstyled li").each(function(index){
				items.push($(this).text());

			})
				for (i=0;i<items.length;i++){

					var option = "<option></option>";
					var options = $(".links .list-div form select").append(option);
					var options = $(".links .list-div form select option");
					options[i].append(items[i]);
				}
		    } 

			$(".editorial-nav-desktop-wrapper .lists-wrapper .links .list-div .list-unstyled").css("display","none");
			$(".editorial-nav-desktop-wrapper .lists-wrapper .links .list-div form div:first-child").addClass('Editorial-form-input');
			$(".editorial-nav-desktop-wrapper .lists-wrapper .links .list-div form div:nth-child(2)").addClass('primary-blue-button-form Editorial-form-button');

		} else{
		  $(".editorial-nav-desktop-wrapper .lists-wrapper .links .list-div .list-unstyled").css("display","inline-flex");
			$(".editorial-nav-desktop-wrapper .lists-wrapper .links .list-div form").css("display", "none");
		}
    }
    mobileEditorial();
    $(window).resize(mobileEditorial);

});

/* Node app js*/
// $(document).ready(function () {
	// $('.accordion-heading').click(function () {
	// 	$(this).siblings('.list-div').toggle('collapse');
	// 	$(this).parent().parent().siblings().children().children('.list-div').css('display', 'none');
	// 	$(this).parent().parent().siblings().children().children('.list-div').siblings('h3').attr('aria-expanded', false);
	// 	if ($(this).attr('aria-expanded') == 'true') {
	// 		$(this).attr('aria-expanded', false);
	// 	}
	// 	else if ($(this).attr('aria-expanded') == 'false') {
	// 		$(this).attr('aria-expanded', true);
	// 	}
	// });
// });