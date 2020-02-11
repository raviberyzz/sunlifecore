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

      // open the full header menu on focus for screen readers. 
      $('.nav-active').on("focus", function(){
        $('.dropdown').removeClass("open");
        $(this).parent().addClass("open");
    })
});