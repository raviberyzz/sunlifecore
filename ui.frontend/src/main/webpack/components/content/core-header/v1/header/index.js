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
            utilityLists.classList.remove("sl-utility-bar");
            utilityLists.classList.add("sl-utility-bar-offcanvas");
            var bodyNode = document.getElementById('offcanvas-body');
            bodyNode.append(utilityLists);
        }

        else {
            utilityLists.classList.remove("sl-utility-bar-offcanvas");
            utilityLists.classList.add("sl-utility-bar");
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
    /* Code may need to be adjusted when left navigation is complete. Left the logic commented out */
    function setMainContentLandmark() {
        if ($('.header').length > 0 && $('#main-content').length < 1) {

            if ($('.header').next().hasClass('breadcrumb')) {
                $('.header').next().next().attr('id', 'main-content');
                $('.header').next().next().attr('role', 'main');
            } else {
                $('.header').next().attr('id', 'main-content');
                $('.header').next().attr('role', 'main');
            }

            // if ($('#left-navigation').closest('.layout-container').prev().hasClass('titlebar') && ($('#left-navigation').closest('.layout-container').parents('.layout-container')).length>0) {
            //     $('#left-navigation').closest('.layout-container').parents('.layout-container').attr('id', 'main-content');
            //     $('#left-navigation').closest('.layout-container').parents('.layout-container').attr('role', 'main');
            // }
            // else if ($('#left-navigation-case-2').closest('.layout-container').prev().hasClass('titlebar') && ($('#left-navigation-case-2').closest('.layout-container').parents('.layout-container')).length>0) {
            //     $('#left-navigation-case-2').closest('.layout-container').parents('.layout-container').attr('id', 'main-content');
            //     $('#left-navigation-case-2').closest('.layout-container').parents('.layout-container').attr('role', 'main');
            // }
            // else if ($('#left-navigation').parents('.col-md-3').next().hasClass('left-nav-with-content-section')) {
            //     $('#left-navigation').parents('.col-md-3').next().attr('id', 'main-content');
            //     $('#left-navigation').parents('.col-md-3').next().attr('role', 'main');
            // }
            // else if ($('#left-navigation-case-2').prev().hasClass('left-nav-with-content-section')) {
            //     $('#left-navigation-case-2').prev().attr('id', 'main-content');
            //     $('#left-navigation-case-2').prev().attr('role', 'main');
            // }
            // else if ($('#left-navigation').parents('.col-sm-4').next().hasClass('col-sm-8')) {
            //     $('#left-navigation').parents('.col-sm-4').next().attr('id', 'main-content');
            //     $('#left-navigation').parents('.col-sm-4').next().attr('role', 'main');
            // }
            // else if ($('.header').next().hasClass('breadcrumb')) {
            //     $('.header').next().next().attr('id', 'main-content');
            //     $('.header').next().next().attr('role', 'main');
            // } else {
            //     $('.header').next().attr('id', 'main-content');
            //     $('.header').next().attr('role', 'main');
            // }
            // if ($('.link-list').hasClass('editorial-nav-desktop-wrapper')) {
            //     $('.link-list.editorial-nav-desktop-wrapper').attr('aria-label', 'Filter');
            //     $('.link-list.editorial-nav-desktop-wrapper').attr('role', 'navigation');
            // }
        }
    }

    document.addEventListener("DOMContentLoaded", function() {
        offCanvas();
        setMainContentLandmark();
    });
    window.addEventListener("resize", offCanvas);

    document.getElementById("menuOpen").onclick = callMenuOpen;
    document.getElementById("menuClose").onclick = callMenuClose;
})()