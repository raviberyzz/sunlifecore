/**
* Header Component specific JS 
*/

(function () {
       
    /* Retrieves the element based on a classname/id */
    const utilityLists = document.getElementsByClassName("sl-utility-bar")[0];
    const offcanvasEl = document.getElementById('sl-header-offcanvas')

    /* Handles the desktop and mobile view */
    function offCanvas() {

        if (window.innerWidth <= 1239) {
            utilityLists?.classList.remove("sl-utility-bar");
            utilityLists?.classList.add("sl-utility-bar-offcanvas");
            var bodyNode = document.getElementById('offcanvas-body');
            bodyNode.append(utilityLists);
        }

        else {
            utilityLists?.classList.remove("sl-utility-bar-offcanvas");
            utilityLists?.classList.add("sl-utility-bar");
            var navNode = document.getElementById('nav-header');
            navNode.insertAdjacentElement("beforebegin", utilityLists);
            /* Handles hamburger menu open on desktop view */
            if ( offcanvasEl.classList.contains("show") && !offcanvasEl.classList.contains("hiding") ) {
                const offCanvas = new bootstrap.Offcanvas(offcanvasEl);
                offCanvas.hide();
                offcanvasEl.classList.remove('show');
                var test = document.getElementsByClassName("offcanvas-backdrop")[0];
                test.remove();
                callMenuClose();
              }
        }
    }

    /* Handles hamburger menu open click */
    function callMenuOpen() {
        var headerNode = document.getElementById('nav-header');
        headerNode.insertAdjacentElement("afterend", offcanvasEl);
    }
    /* Handles hamburger menu close click */
    function callMenuClose() {
        var slnavNode = document.getElementById('sl-nav');
        slnavNode.append(offcanvasEl);
    }

    /* Adds the 'main-content' ID to the main content Layout Container */
    function setMainContentLandmark() {
        if ($('.header').length > 0 && $('#main-content').length < 1) {
            var layoutContainer = $('.header').next();    
            if (layoutContainer.hasClass('breadcrumb')) {
                layoutContainer.next().attr('id', 'main-content');
                layoutContainer.next().attr('role', 'main');
            } else {
                layoutContainer.attr('id', 'main-content');
                layoutContainer.attr('role', 'main');
            }
        }
    }

    document.addEventListener("DOMContentLoaded", function() {
        offCanvas();
        setMainContentLandmark();
    });
    window.addEventListener("resize", offCanvas);

    $("#menuOpen").click(callMenuOpen);
    $("#menuClose").click(callMenuClose);
})()