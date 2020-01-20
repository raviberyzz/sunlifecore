$(document).ready(function () {
    $(".desktop-header-wrapper #sun-search").removeClass('in');
    $(".signIn-button").attr('maxlength', '30');
    $('#language-btn-container').click(function () {
        if ($('#sun-search').hasClass('in')) {
            $("#search-btn").attr('aria-expanded', 'false');
            $('#sun-search').removeClass('in');
        }
    });
    $('#search-btn').click(function () {
        if ($('#sun-language').hasClass('in')) {
            $("#language-btn").attr('aria-expanded', 'false');
            $("#sun-language").removeClass('in');
        }
    });
    $('#language-btn-container').click(function () {
        if ($('#language-btn').attr('aria-expanded') == 'true') {
            $("#language-btn").attr('aria-expanded', 'false');
        }
        else {
            $("#language-btn").attr('aria-expanded', 'true');
        }
    });
    $('.sunLanguageCrossBtn').click(function () {
        $("#language-btn").attr('aria-expanded', 'false');
    });
    
    $(document).mouseup(function(e){
    var searchBar = $("#sun-search");
    if (e.which === 1) {
        if (!searchBar.is(e.target) && searchBar.has(e.target).length === 0){
            $("#search-btn").attr('aria-expanded', 'false');
            $('#sun-search').removeClass('in');
        }
    }
    });
     
});