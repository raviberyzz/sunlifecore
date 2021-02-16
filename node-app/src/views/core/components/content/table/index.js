function stickyHeader() {
  // sticky header works if table components exists
  if ($('.table-responsive').length) {
    /* sticky header functionality is added by including the table-stickyheader class */
    if ($('.table-stickyheader').length) {
      //pop-up modal logic
      $(document).on('show.bs.modal', function () {
        let tableHeader = $(".modal-body .table-stickyheader table:eq(0) tbody tr:first-child th");
        tableHeader.css("transform", "translateY(" + 0 + "px)");
        let modalTable = $('.modal-body .table.table-stickyheader');
        modalTable.on("scroll", function () {
          let offset = this.scrollTop;
          tableHeader.css("transform", "translateY(" + offset + "px)");
        });
      });

      let tableHeader = $(".table-stickyheader table:eq(0) tbody tr:first-child th");
      let theaderPosition = tableHeader.offset().top;
      let tableBottom = $('.table-stickyheader table:eq(0) tbody tr:last-child');
      let tbottomPosition = tableBottom.offset().top;

      let numberOfTables = $(".table-stickyheader table").length;
      let currTable = 0;
      let position = 0;
      //sticky header function on scroll 
      $(window).on("scroll", function () {
        if (window.pageYOffset > theaderPosition) {
          position = window.pageYOffset - theaderPosition;
          // in case of mobile header the sticky header should be after the mobile header 
          if (window.innerWidth < 1025 && $('.mobile-header-navbar').length) {
            //aligning table sticky header after the mobile header in mobile devices and tablets
            // 50 px is the height of the mobile header. 
            position += 50;
            tableHeader.css("transform", "translateY(" + position + "px)");
          } else {
            tableHeader.css("transform", "translateY(" + position + "px)");
          }
          //removing the transform property once the page scrolls past the table
          if (window.pageYOffset > tbottomPosition + tableHeader.height()) {
            tableHeader.css("transform", "translateY(" + 0 + "px)");
            //If more than one table set new parameters
            if (numberOfTables > currTable + 1) {
              currTable++;
              tableHeader = $(".table-stickyheader table:eq(" + currTable + ") tbody tr:first-child th");
              tableBottom = $('.table-stickyheader table:eq(' + currTable + ') tbody tr:last-child');
              theaderPosition = tableHeader.offset().top;  //New table header position
              tbottomPosition = tableBottom.offset().top;  //New table bottom position
            }
          }
        } else if (window.pageYOffset < theaderPosition && currTable > 0) {
          currTable--;
          tableHeader = $(".table-stickyheader table:eq(" + currTable + ") tbody tr:first-child th");
          tableBottom = $('.table-stickyheader table:eq(' + currTable + ') tbody tr:last-child');
          theaderPosition = tableHeader.offset().top;  //New table header position
          tbottomPosition = tableBottom.offset().top;  //New table bottom position
        } else if (position !== 0) {
          position = 0;
          tableHeader.css("transform", "translateY(" + 0 + "px)");
        }
      });
    }
    // adding logic to dynamically inject sr-only class span tags into icon for screen readers.
    let crossIcon = document.getElementsByClassName('fa-times');
    // getting the icon tags
    let crossLength = crossIcon.length;
    let checkIcon = document.getElementsByClassName('fa-check');
    let checkLength = checkIcon.length;
    for (let i = 0; i < crossLength || i < checkLength; i++) {
      //looping through the icon class
      if (i < crossLength) {
        let val = crossIcon[i].innerText;
        let spanElem = document.createElement("span");
        //creating span elements and changing the inner value of icon tags
        crossIcon[i].innerText = "";
        spanElem.setAttribute("class", "sr-only");
        spanElem.innerText = val;
        // appending span tag into icon span tag for screen reader. 
        crossIcon[i].appendChild(spanElem);
      }
      if (i < checkLength) {
        let check = checkIcon[i].innerText;
        let spanElement = document.createElement("span");
        checkIcon[i].innerText = "";
        spanElement.setAttribute("class", "sr-only");
        spanElement.innerText = check;
        checkIcon[i].appendChild(spanElement);
      }
    }
    // logic for mobile view to show two columns and third column cut off
    function mobileColumns(){
      if ($(window).width() < 768) {
        var $wid = $(window).width();
        var minWidth = $wid * (40 / 100);
        $('.cmp-table-data-content tbody tr th:first-child').css('min-width',minWidth);
        $('.cmp-table-data-content tbody tr th:nth-of-type(2)').css('min-width',minWidth);
      }
    } 
    mobileColumns();
    $(window).resize(mobileColumns);
  }
}

function mobileDisplay() {
  if (window.innerWidth <= 767 && $('.mobile-header-navbar').length) {
    //If left column is not already dropped (Prevents duplicate trigger on orientation change from landscape to portrait or re-opening the modal)
    if ($(".cmp-table-comparision table tbody tr *:first-child").css("display") != "none") {
      //Row titles are repeated across the rows to accommodate for small screen sizes.
      $(".cmp-table-comparision table tbody tr + tr").each(function (index) {
        $('<div class="mobileTableTitles">' + $(this).find("th,td").html() + '</div><br>').prependTo($(this).children().not(":first-child"));
      });

      // left column is dropped
      $(".cmp-table-comparision table tbody tr th:first-child").css("display", "none");
    }
  }
}

/*Adds alternating row shade colour to comparison table table headers: header columns may span multiple rows thus javascript solution is implemented*/
function colorComparisonTable() {
  $(".cmp-table-comparision table").each(function (index) {
    $(this).children("tbody tr:not(:first-child) th").each(function (index) {
      if (index % 2 == 0) {
        $(this).css("background-color", "#fff");
      } else {
        $(this).css("background-color", "#feedd2");
      }
    });
  })
}

$(colorComparisonTable);

$(stickyHeader);
$(window).resize(stickyHeader);

$(mobileDisplay);
$(window).resize(mobileDisplay);

// Close button for table modal
$(function () {
  $(".modal-body .table + .button .button-class").on('click', function () {
    $(".modal.popup-modal-wrapper").modal('hide');
  });
});
