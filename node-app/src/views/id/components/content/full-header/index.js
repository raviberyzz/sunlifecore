$(document).ready(function () {
    /* Full header ID required accessibility starts here */
    $('#language-btn-container').keydown(function (event) {
        if (event.keyCode == 13) {
            if ($('#language-btn').hasClass('lang-true')) {
                $('#sun-language').removeClass('in');
                $("#language-btn").attr('aria-expanded', 'false');
				$('#language-btn').removeClass('lang-true');
            }
            else {
            //alert(1);
                $('#sun-language').addClass('in');
                $("#language-btn").attr('aria-expanded', 'true');
                $("#search-btn").attr('aria-expanded', 'false');
                $('#language-btn').addClass('lang-true');
                $("#sun-search").removeClass('in');
                $(".sunLanguageCrossBtn").focus();
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        }
    });
    /* Full header ID required accessibility ends here */
});