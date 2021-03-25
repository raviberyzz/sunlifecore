/* Source custom JS starts here */
$(document).ready(function(){
 $('#find-people-button-modal').on('shown.bs.modal', function () {

     var inputs = $('#find-people-button-modal').find('select, input, textarea, button, a').filter(':visible');
     var firstInput = inputs.first();
     var lastInput = inputs.last();

     /*set focus on input box */
     $('#findPeopleInput').focus();

     /*redirect last tab to first input*/
     lastInput.on('keydown', function (e) {
         if ((e.which === 9 && !e.shiftKey)) {
             e.preventDefault();
             firstInput.focus();
         }
     });

     /*redirect first shift+tab to last input*/
     firstInput.on('keydown', function (e) {
         if ((e.which === 9 && e.shiftKey)) {
             e.preventDefault();
             lastInput.focus();
         }
     });

 })
});