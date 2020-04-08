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
        if($('.full-header').parents('.experiencefragment').next().hasClass('breadcrumb')) {
            $('.full-header').parents('.experiencefragment').next().next().attr('id','main-content');
        } else {
            $('.full-header').parents('.experiencefragment').next().attr('id','main-content');
        }
    }
});