
function stickyHeader(){
  // sticky header works if table components exists
  if($('.table-responsive').length){
    /* sticky header is implemented for data table only and user can choose to implement sticky header or not by adding
     the class table-stickyheader, sticky header cannot be implemented on comparision table as comparision table opens up
      in pop up modal. */
    if($('.table-stickyheader').length){
      let tableHeader = $(".cmp-table-data-content table tbody tr:first-child");
      let theaderPosition = tableHeader.offset().top;
      let tableBottom = $('.cmp-table-data-content table tbody tr:last-child').offset().top; 
      let tableHeight = theaderPosition + tableBottom -64;
      let position = 0;
      //sticky header function on scroll 
        $(window).on("scroll", function() {
          if (window.pageYOffset > theaderPosition) {
            position = window.pageYOffset - theaderPosition;
            tableHeader.attr("style", "transform: translateY(" + position + "px)");
            //removing the transform property once the page scrolls past the table
            if(window.pageYOffset > tableHeight){
              tableHeader.attr("style", "transform: translateY(" + 0 + "px)");
            }
          } else if (position !== 0) {
            position = 0;
            tableHeader.attr("style", "transform: translateY(" + 0 + "px)");
          }
        });
    }
      // adding logic to dynamically inject sr-only class span tags into icon for screen readers.
      let crossIcon = document.getElementsByClassName('fa-times');
      // getting the icon tags
      let crossLength= crossIcon.length;
      let checkIcon = document.getElementsByClassName('fa-check');
      let checkLength = checkIcon.length;
       for(let i=0;i<crossLength || i<checkLength; i++){
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




