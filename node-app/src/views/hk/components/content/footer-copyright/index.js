$(document).ready(function () {
    var currentDate = new Date(); 
    $.each($('.footer-copyright-wrapper .slf-copyright p'), function(index, value) {
		var textarr = value.innerText.split(' ');
	    for(var i=0; i< textarr.length; i++) {
        	if(textarr[i].length == 4 && textarr[i].match(/\d+/)) {
				textarr[i] = currentDate.getFullYear();
            }
         }
         value.innerText = textarr.join(' ');
    });
});