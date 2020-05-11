$(document).ready(function () {
    $(".desktop-header-wrapper #sun-search").removeClass('in');
    $(".signIn-button").attr('maxlength', '30');
    function langTrue(){
        $('#language-btn').addClass('lang-true');
    }
    $('#language-btn-container').click(function () {
        if ($('#sun-search').hasClass('in')) {
           searchClose();
        }
    });
    $('#search-btn').click(function () {
        if ($('#sun-language').hasClass('in')) {
            $("#language-btn").attr('aria-expanded', 'false');
            $("#sun-language").removeClass('in');
            setTimeout(langOff,150);
        }
    });
    function langOff(){
        $('#language-btn').removeClass('lang-true');
    }
    $('#language-btn-container').click(function () {
        if ($('#language-btn').attr('aria-expanded') == 'true') {
            $("#language-btn").attr('aria-expanded', 'false');
            setTimeout(langOff,150);
        }
        else {
            $("#language-btn").attr('aria-expanded', 'true');
            setTimeout(langTrue,230);
        }
    });
    $('.sunLanguageCrossBtn').click(function () {
        $("#language-btn").attr('aria-expanded', 'false');
    });
      
    $(document).mouseup(function(e){
    var searchBar = $("#sun-search");
    if($('#sun-search').hasClass('in')){
        if (e.which === 1) {
            if (!searchBar.is(e.target) && searchBar.has(e.target).length === 0){
                searchClose();
                setTimeout(searchClose,500);
                event.stopImmediatePropagation();
            }
        }
    }
    });
    function searchClose(){
        $("#search-btn").attr('aria-expanded', 'false');
        $('#sun-search').removeClass('in');
    }
    $('.desktop-region-language-menu-wrapper .sunLanguageCrossBtn').click(function(){
        $('#language-btn').removeClass('lang-true');
    });

    //function to keep sticky header at the top of the page when scrolling and site level notif is present
    function mobileHeader() {
        var $win = $(window);
        //when page is reloaded in the middle
        if ($win.scrollTop() != 0){
           $('.slf-header-wrapper .slf-mobile-header-wrapper').css({ 'top': '0' });
        }
        //on scroll
        $win.scroll(function () {
            if ($win.scrollTop() == 0)
               $('.slf-header-wrapper .slf-mobile-header-wrapper').css({ 'top': 'auto' });
            else {
               $('.slf-header-wrapper .slf-mobile-header-wrapper').css({ 'top': '0' });
            }
        });
    };
    if ($(window).width() < 1024) {
        $(mobileHeader);
    }
    $(window).resize(function () {
        if ($(window).width() < 1024) {
            $(mobileHeader);
        }
    });
    if($('.full-header').parents('.experiencefragment').length > 0 && $('#main-content').length < 1) {
        if($('#left-navigation').parents('.col-md-3').next().hasClass('left-nav-with-content-section')) {
            console.log("in");
            $('#left-navigation').parents('.col-md-3').next().attr('id','main-content');
            $('#left-navigation').parents('.col-md-3').next().attr('role','main');
        }
        else if($('.full-header').parents('.experiencefragment').next().hasClass('breadcrumb')) {
            $('.full-header').parents('.experiencefragment').next().next().attr('id','main-content');
            $('.full-header').parents('.experiencefragment').next().next().attr('role','main');
        } else {
            $('.full-header').parents('.experiencefragment').next().attr('id','main-content');
            $('.full-header').parents('.experiencefragment').next().attr('role','main');
        }
    }
    
    //474 FIX - RELATED TO ACCESSIBILITY

    //jaws fix (such that search is entered and properly exited)
    $('#sun-search').on('shown.bs.collapse', function (e) {
		$(this).find("#q-top").focus();
	});
    $('#sun-search').on('hidden.bs.collapse', function () {
		document.getElementById("search-btn").focus()
	});

    //Jaws fix (such that region language menu is entered)
    $('#sun-language').on('shown.bs.collapse', function (e) {
		$(this).find(".fa-remove").focus();
	});
    var liEle = $("#sun-language .content-language li").last()[0];
    var finalAnchorEle = $(liEle).find('a:first');
    $(finalAnchorEle).on('focusout', function (e) {
		// Close this sub menu
        $("#language-btn").trigger("click");
		$("#language-btn").focus();
		return false;
    });
    
});