$(document).ready(function () {
    $(".signIn-button").attr('maxlength','30');
    $(".mobile-header .first").click(function(){
        $('.mobile-header .first').addClass('active');
        $('.mobile-header .second').removeClass('active');
        $('.mobile-header #region-tab').css({'display':'block'});
        $('.mobile-header #language-tab').css({'display':'none'});
    });
    $(".mobile-header .second").click(function(){
        $('.mobile-header .first').removeClass('active');
        $('.mobile-header .second').addClass('active');
        $('.mobile-header #region-tab').css({'display':'none'});
        $('.mobile-header #language-tab').css({'display':'block'});
    });
});