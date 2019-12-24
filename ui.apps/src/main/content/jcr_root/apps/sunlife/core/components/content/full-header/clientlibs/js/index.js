$(document).ready(function () {
    $(".signIn-button").attr('maxlength','30');
    $('#language-btn-container').click(function(){
     if ($('#sun-search').hasClass('in')){  
            $("#search-btn").attr('aria-expanded','false');
            $('#sun-search').removeClass('in');
        }
     });
     $('#search-btn').click(function(){
        if ($('#sun-language').hasClass('in')){  
               $("#language-btn").attr('aria-expanded','false');
               $('#sun-language').removeClass('in');
           }
        });
});