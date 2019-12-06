



// $(document).ready(function() {
//     $('#locate-advisors-btn').click(function() {
//         // var form = $('#locate-advisors-form').parsley({});
//         // form.validate();
//         // $('#locate-advisors-form').submit();

//     })

// });

console.log('component loaded');

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
console.log('image loaded');
console.log('container loaded');

console.log('breadcrumb loaded');
