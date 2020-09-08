function mfaModalTrigger() {
  $("#transmitModal").modal("show");
  if ($("body").hasClass("modal-open")) {
    $($("body").css({'padding-right':'0'}));
  }
}
