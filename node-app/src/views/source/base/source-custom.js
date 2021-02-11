/* Source custom JS starts here */
$(document).ready(function(){
	/* auto focus onto the text input field in Find People modal */
    $('#find-people-button-modal').on('shown.bs.modal', function() {
      $('#findPeopleInput').focus();
    })
});
/* Source custom JS ends here */