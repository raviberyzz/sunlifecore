$(document).ready(function () {
    var copyText=$('.footer-copyright-wrapper .slf-copyright p:first-child').text();
    $('.footer-copyright-wrapper .slf-copyright p:first-child').text('');
    var cIndex=copyText.indexOf("©");
    var i=cIndex+2;
    var oldDate=copyText.substring(i, i+4);
    var  copyText= copyText.replace(oldDate, "");
    var currentDate = new Date(); 
	copyText = [copyText.slice(0, i), currentDate.getFullYear(), copyText.slice(i)].join('');
    $('.footer-copyright-wrapper .slf-copyright p:first-child').text(copyText);

});