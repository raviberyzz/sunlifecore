
console.log('component loaded');
console.log('separator loaded');
console.log('separator loaded');
$(document).ready(function () {
    $("#hamburgerMenu").click(function () { 
        $('.hamburger-menu-wrapper').addClass('active').removeClass('inactive');             
        $('.offcanvas-overlay').addClass('active');
        $('.container').css({'margin-left':'270px'});
        $('body').addClass('overflow-hidden');
    });
    $("#close-hamburger").click(function () {
        $('.hamburger-menu-wrapper').removeClass('active').addClass('inactive');      
        $('.offcanvas-overlay').removeClass('active');
        $('.container').css({'margin-left':'0px'});
        $('body').removeClass('overflow-hidden');
    });
    $('.first-level-navigation .navigation-menu').children("a").click(function(){
        if(event.target.parentNode.children[1].className === "third-level-navigation") {
            sessionStorage.scrollPositionSecond = $(this).parent().closest('div').scrollTop();
        } else {
            sessionStorage.scrollPositionFirst = $(this).parent().closest('div').scrollTop();
        }
    });
    $('.second-level-navigation .go-back').click(function(){
        $(this).closest('div').parent().closest('div').scrollTop(sessionStorage.scrollPositionFirst);
    });
    $('.third-level-navigation .go-back').click(function(){
        $(this).closest('div').parent().closest('div').scrollTop(sessionStorage.scrollPositionSecond);
    });
    $('.navigation-menu').children("a").click(function(){
        $(this).parent().closest('div').scrollTop(0);
        $(this).siblings("div").addClass('active');         
        $(this).parent().closest('div').css({'overflow-y':'hidden'});
    });
    $('.go-back').click(function(){ 
        $(this).closest("div").removeClass('active');          
        $(this).closest('div').parent().closest('div').css({'overflow-y':'auto'});
    });
    
});     
console.log('image loaded');
console.log('region-language-menu loaded');

console.log('separator loaded');
$(document).ready(function () {
    $("a.customer-sign-sm").click(function() {
        updateSignInForm('form_signon_mobile');     
      });  
    $('#signin-widget-modal').on('shown.bs.modal', function() {
          updateSignInForm('form_signon');        
    });
});     


console.log('component loaded');
console.log('footer-copyright loaded');
console.log('utility-nav loaded');


console.log('desktop-header loaded');
$(document).ready(function(){
    $("#language-btn-container, #sunLanguageCrossBtn").click(function(){
        $("#sun-search").hide();
        $("#sun-language").toggle();
    });
    $("#search-btn-container").click(function(){
        $("#sun-language").hide();
        $("#sun-search").toggle();
    });
});
// $(document).ready(function() {
//     $('#locate-advisors-btn').click(function() {
//         // var form = $('#locate-advisors-form').parsley({});
//         // form.validate();
//         // $('#locate-advisors-form').submit();

//     })

// });
console.log('container loaded');



console.log('breadcrumb loaded');

console.log('separator loaded');