/**
* Header Component specific JS
*/
 
(function () {
       
    let $comp = null;
    const HEADERSELECTOR = {};
   
    /* Handles the desktop and mobile view */
    function offCanvas() { 
        if (window.innerWidth <= 1239) {
            HEADERSELECTOR.$utilityLists.removeClass("sl-utility-bar");
            HEADERSELECTOR.$utilityLists.addClass("sl-utility-bar-offcanvas");
            HEADERSELECTOR.$bodyNode.append(HEADERSELECTOR.$utilityLists);
            /* Handles utility additional links view in mobile */
            HEADERSELECTOR.$additionalLinks.remove();
            HEADERSELECTOR.$additionalLinksParent.append(HEADERSELECTOR.$additionalLinks);
        }
        else {
            HEADERSELECTOR.$utilityListsOffCanvas.removeClass("sl-utility-bar-offcanvas");
            HEADERSELECTOR.$utilityListsOffCanvas.addClass("sl-utility-bar");
            HEADERSELECTOR.$utilityListsOffCanvas.insertBefore(HEADERSELECTOR.$navNode);
            /* Handles utility additional links view in desktop */
            HEADERSELECTOR.$additionalLinks.remove();
            HEADERSELECTOR.$additionalLinksParent.prepend(HEADERSELECTOR.$additionalLinks);
            /* Handles hamburger menu open on desktop view */
            if ( HEADERSELECTOR.$offcanvasEl.hasClass("show") && !HEADERSELECTOR.$offcanvasEl.hasClass("hiding") ) {
                let offCanvas = new bootstrap.Offcanvas(HEADERSELECTOR.$offcanvasEl);
                offCanvas.hide();
                HEADERSELECTOR.$offcanvasEl.removeClass('show');
                let offcanvasBackdrop = document.getElementsByClassName("offcanvas-backdrop")[0];
                offcanvasBackdrop.remove();
                callMenuClose();
              }
        }
    }
 
    /* Handles hamburger menu open click */
    function callMenuOpen() {
        $comp.append(HEADERSELECTOR.$offcanvasEl)
    }

    /* Handles hamburger menu close click */
    function callMenuClose() {
        HEADERSELECTOR.$slnavNode.append(HEADERSELECTOR.$offcanvasEl);
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
 
    function initliazeSelector() {
        HEADERSELECTOR.$utilityLists = $comp.find(".sl-utility-bar");
        HEADERSELECTOR.$utilityListsOffCanvas = $comp.find(".sl-utility-bar-offcanvas");
        HEADERSELECTOR.$offcanvasEl = $comp.find('#sl-header-offcanvas');
        HEADERSELECTOR.$slnavNode = $comp.find('#sl-nav');
        HEADERSELECTOR.$bodyNode = $comp.find('#offcanvas-body');
        HEADERSELECTOR.$navNode = $comp.find('#nav-header');
        HEADERSELECTOR.$additionalLinks = $comp.find(".menu-container");
        HEADERSELECTOR.$additionalLinksParent = $comp.find(".content-container");
        HEADERSELECTOR.$menuOpen = $comp.find(".menuOpen");
        HEADERSELECTOR.$menuClose = $comp.find(".menuClose");
    }
 
    function bindEvent() {
        window.addEventListener("resize", function(){
            initliazeSelector();
            offCanvas(); 
        });
        HEADERSELECTOR.$menuOpen.click(callMenuOpen);
        HEADERSELECTOR.$menuClose.click(callMenuClose);

        window.addEventListener('scroll', function() {
            if (window.scrollY > 70) {
                document.getElementById('nav-header').classList.add('fixed-top');
                navbar_height = document.querySelector('.navbar').offsetHeight;
                document.body.style.paddingTop = navbar_height + 'px';
            } else {
                document.getElementById('nav-header').classList.remove('fixed-top');
                document.body.style.paddingTop = '0';
            }
        });
    }

   
 
    function isModuleExist() {
        if($('.header').length <= 0) {
            return false;
        }
        $comp = $('.header');
        return true;
    }
 
    function init() {
        if(isModuleExist()) {
            initliazeSelector();
            bindEvent();
            offCanvas();
            setMainContentLandmark();      
        }
    }
 
    document.addEventListener("DOMContentLoaded", init);
 
})()