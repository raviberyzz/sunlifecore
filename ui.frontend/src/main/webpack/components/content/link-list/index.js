$(document).ready(function () {
	$('#mainfooter .accordion-heading').click(function () {
		$(this).siblings('.list-div').toggle('collapse');
		$(this).closest('.container-component').parent().siblings().find('.list-div').css('display', 'none');
        $(this).closest('.container-component').parent().siblings().find('.accordion-heading').attr('aria-expanded', false);
		$(this).closest('.container-component').parent().parent().siblings().find('.list-div').css('display', 'none');
        $(this).closest('.container-component').parent().parent().siblings().find('.accordion-heading').attr('aria-expanded', false);
		if ($(this).attr('aria-expanded') == 'true') {
			$(this).attr('aria-expanded', false);
		}
		else if ($(this).attr('aria-expanded') == 'false') {
			$(this).attr('aria-expanded', true);
		}
	});
	var pathName= window.location.pathname;
	$('.editorial-nav-desktop-wrapper .list-div ul').find('a').each(function(){
		pathName = pathName.replace(/\/\d\//,'/');
		var strLink =  $(this).attr('href');
		if(!strLink.localeCompare(pathName)){
			$(this).parent().addClass("selected");
		}
	});
	$('.left-nav-list-wrapper .list-div ul').find('a').each(function(){
		var strLink =  $(this).attr('href');
		var strLink1 = strLink.localeCompare(pathName);
		if(!strLink1){
			$(this).parent().addClass("selectedlink");
		}
	});
// editorial navigation logic starts here
function mobileEditorial(){
	if($(window).width() < 768){
		 var editorialLinks=[];
		  var linkHrefs = [];
		if($(".editorial-nav-desktop-wrapper").length){
			if( $(".editorial-nav-desktop-wrapper .lists-wrapper .links .list-div form").length){
			$(".editorial-nav-desktop-wrapper .lists-wrapper .links .list-div form").remove();
			}

			var editorialLists=[];
			var mobileNavigation = "<form><div><label class='sr-only'>Select a topic</label><select class='form-control cta-input list-topic-dropdown'></select></div><div><button><span class='fa fa-chevron-right'></span></button></div></form>";
			$(".editorial-nav-desktop-wrapper .lists-wrapper .links .list-div .list-unstyled").after(mobileNavigation);
            $('.Editorial-form-input select').addClass('form-control cta-input list-topic-dropdown');

			$(".editorial-nav-desktop-wrapper .lists-wrapper .links .list-div .list-unstyled li").each(function(index){
			/*editorialLists.push($(this).text()); */
			 var editorialLinks = $(this).children();
			   editorialLists.push(editorialLinks.text());
				  linkHrefs.push(editorialLinks.attr('href'));
		})
			console.log(linkHrefs);
			for (i=0;i<editorialLists.length;i++){
				var option = "<option></option>";
				var options = $(".links .list-div form select").append(option);
				var options = $(".links .list-div form select option");
				options[i].append(editorialLists[i]);
				   options[i].setAttribute('value',linkHrefs[i]);
			}
		} 

		$(".editorial-nav-desktop-wrapper .lists-wrapper .links .list-div .list-unstyled").css("display","none");
		$(".editorial-nav-desktop-wrapper .lists-wrapper .links .list-div form div:first-child").addClass('Editorial-form-input');
		$(".editorial-nav-desktop-wrapper .lists-wrapper .links .list-div form div:nth-child(2)").addClass('primary-blue-button-form Editorial-form-button');
        $('.Editorial-form-button button').attr('id','list-topic-btn');
        //$('.Editorial-form-button button').attr('type','submit');
        $('#list-topic-btn').click(function(){
              console.log('button clicked');
        })

	} else{
		$(".editorial-nav-desktop-wrapper .lists-wrapper .links .list-div .list-unstyled").css("display","inline-flex");
		$(".editorial-nav-desktop-wrapper .lists-wrapper .links .list-div form").css("display", "none");
	}
	$('.Editorial-form-input select').change(function(){
		  console.log($(this).children("option:selected").val());
        selectedVal = $(this).children("option:selected").val()
        var selected = $(this).children("option:selected");

        selected.attr('selected','selected');
        $('.list-div form').attr('action', selectedVal);
   })
		var path =window.location.pathname;
		//console.log(path);
		 var selectOptions = $('.Editorial-form-input select').children();
		selectOptions.each(function(){
			var optionValue = $(this).attr('value')
			if(optionValue == path){
				$(this).attr("selected","selected");
			}
		})
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