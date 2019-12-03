


// $(document).ready(function() {
//     $('#locate-advisors-btn').click(function() {
//         // var form = $('#locate-advisors-form').parsley({});
//         // form.validate();
//         // $('#locate-advisors-form').submit();

//     })

// });


console.log('component loaded');
$(document).ready(function () {
    $("a.customer-sign-sm").click(function() {
        updateSignInForm('form_signon_mobile');     
      });  
    $('#signin-widget-modal').on('shown.bs.modal', function() {
          updateSignInForm('form_signon');        
    });
});     
console.log('separator loaded');
console.log('component loaded');
console.log('image loaded');
console.log('footer-copyright loaded');

console.log('container loaded');


console.log('breadcrumb loaded');