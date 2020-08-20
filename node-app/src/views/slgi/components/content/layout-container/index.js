function formatFooterMiddleSection() {
  let sections = $('.layout-container .row[data-section="footer-middle-layer"] > div'); /* Get all div's in footer-middle-section */
  let numOfSection = sections.length; /* number of sections in footer-middle-layer: 4 in Public, 3 in Secure Advisor Site */

  for (let i = 0; i < numOfSection; i++) {
    if(numOfSection == 3){
      var className = "col-sm-" + (numofSection+i);
      $(sections[i]).removeClass().addClass(className);   //Divide: col-sm-3 col-sm-4 col-sm-5
    }else{
      if(i == 0){
        $(sections[i]).removeClass().addClass('col-sm-4 col-lg-2');
      } else if (i < 3) {
        $(sections[i]).removeClass().addClass('col-sm-4 col-lg-3');
      } else {
        $(sections[i]).removeClass().addClass('col-sm-12 col-lg-4');
      }
    }
  }
}

$(formatFooterMiddleSection);


/* Fix social icons positioning*/
$(document).ready(function () {
  //If not mobile
	if ($(window).width() > 767) {
    $('#mainfooter .social-link-icon-wrapper').css({ "padding-right": "0" });
	}
	$(window).resize(function () {
		if ($(window).width() > 767){
      $('#mainfooter .social-link-icon-wrapper').css({ "padding-right": "0" });
    }
  });
});
