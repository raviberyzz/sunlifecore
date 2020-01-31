function stickyHeader(){
  // sticky header works if table components exists
  if($('.slf-table').length){
    let tableHeader = $("table tbody tr:first-child");
    let theaderPosition = tableHeader.offset().top;
    let position = 0;
    //sticky header function on scroll 
      $(window).on("scroll", function() {
        if (window.pageYOffset > theaderPosition) {
          position = window.pageYOffset - theaderPosition;
          tableHeader.attr("style", "transform: translateY(" + position + "px)");
        } else if (position !== 0) {
          position = 0;
          tableHeader.attr("style", "transform: translateY(" + 0 + "px)");
        }
      });
      // adding logic to dynamically inject sr-only class span tags into icon for screen readers.

      let crossIcon = document.getElementsByClassName('fa-times');
      // getting the icon tags
      let crossLength= crossIcon.length;
      let checkIcon = document.getElementsByClassName('fa-check');
      let checkLength = checkIcon.length;
       for(i=0;i<crossLength || i<checkLength; i++){
         //looping through the icon class
         if(i<crossLength){
        let val = crossIcon[i].innerText;
        let spanElem = document.createElement("span");
        //creating span elements and changing the inner value of icon tags
        crossIcon[i].innerText = "";
        spanElem.setAttribute("class","sr-only");
        spanElem.innerText=val;
        // appending span tag into icon span tag for screen reader. 
        crossIcon[i].appendChild(spanElem);
      }
      if(i<checkLength){
        let check = checkIcon[i].innerText;
        let spanElement = document.createElement("span");
        checkIcon[i].innerText = "";
        spanElement.setAttribute("class","sr-only");
        spanElement.innerText=check;
        checkIcon[i].appendChild(spanElement);
       }
       } 
 }
}
$(stickyHeader);
$(window).resize(stickyHeader);