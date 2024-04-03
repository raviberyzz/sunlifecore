/**
* Header Component specific JS
*/
(function (core) {
    "use strict";

    /**
     * Header component
     * @namespace header
     * @memberof sunCore.comp
     */
    core.comp.header = (function ($, util) {
        const CONSTANT = {
            SELECTOR: {
                header: ".header"
            },
            CLASS: {
                slUtilityBar: "sl-utility-bar",
                slUtilityBarOffCanvas: "sl-utility-bar-offcanvas",
                show: "show",
                hiding: "hiding",
                fixedTop: "fixed-top"
            },
        };

        let $comp = $(CONSTANT.SELECTOR.header);

        /**
        * Handles the desktop and mobile view.
        * @function
        * @return void
        */
        function offCanvas() {
            if (window.innerWidth <= 1239) {
                CONSTANT.SELECTOR.utilityLists.removeClass(CONSTANT.CLASS.slUtilityBar);
                CONSTANT.SELECTOR.utilityLists.addClass(CONSTANT.CLASS.slUtilityBarOffCanvas);
                CONSTANT.SELECTOR.bodyNode.append(CONSTANT.SELECTOR.utilityLists);
                /* Handles utility additional links view in mobile */
                CONSTANT.SELECTOR.additionalLinks.remove();
                CONSTANT.SELECTOR.additionalLinksParent.append(CONSTANT.SELECTOR.additionalLinks);
            }
            else {
                CONSTANT.SELECTOR.utilityListsOffCanvas.removeClass(CONSTANT.CLASS.slUtilityBarOffCanvas);
                CONSTANT.SELECTOR.utilityListsOffCanvas.addClass(CONSTANT.CLASS.slUtilityBar);
                CONSTANT.SELECTOR.utilityListsOffCanvas.insertBefore(CONSTANT.SELECTOR.navNode);
                /* Handles utility additional links view in desktop */
                CONSTANT.SELECTOR.additionalLinks.remove();
                CONSTANT.SELECTOR.additionalLinksParent.prepend(CONSTANT.SELECTOR.additionalLinks);
                /* Handles hamburger menu open on desktop view */
                if (CONSTANT.SELECTOR.offcanvasEl.hasClass(CONSTANT.CLASS.show) && !CONSTANT.SELECTOR.offcanvasEl.hasClass(CONSTANT.CLASS.hiding)) {
                    let offCanvas = new bootstrap.Offcanvas(CONSTANT.SELECTOR.offcanvasEl);
                    offCanvas.hide();
                    CONSTANT.SELECTOR.offcanvasEl.removeClass(CONSTANT.CLASS.show);
                    let offcanvasBackdrop = document.getElementsByClassName("offcanvas-backdrop")[0];
                    offcanvasBackdrop.remove();
                    callMenuClose();
                }
            }
        }

        /**
        * Handles hamburger menu open click.
        * @function
        * @return void
        */
        function callMenuOpen() {
            $comp.append(CONSTANT.SELECTOR.offcanvasEl)
        }

        /**
        * Handles hamburger menu close click.
        * @function
        * @return void
        */
        function callMenuClose() {
            CONSTANT.SELECTOR.slnavNode.append(CONSTANT.SELECTOR.offcanvasEl);
        }

        /**
        * Adds the 'main-content' ID to the main content Layout Container.
        * @function
        * @return void
        */
        function setMainContentLandmark() {
            if ($(CONSTANT.SELECTOR.header).length > 0 && $('#main-content').length < 1) {
                var layoutContainer = $(CONSTANT.SELECTOR.header).next();
                if (layoutContainer.hasClass('breadcrumb')) {
                    layoutContainer.next().attr('id', 'main-content');
                    layoutContainer.next().attr('role', 'main');
                } else {
                    layoutContainer.attr('id', 'main-content');
                    layoutContainer.attr('role', 'main');
                }
            }
        }

        /**
        * Initialize the header selectors.
        * @function
        * @return void
        */
        function initializeSelector() {
            CONSTANT.SELECTOR.utilityLists = $(".header .sl-utility-bar");
            CONSTANT.SELECTOR.utilityListsOffCanvas = $(".header .sl-utility-bar-offcanvas");
            CONSTANT.SELECTOR.offcanvasEl = $(".header #sl-header-offcanvas");
            CONSTANT.SELECTOR.slnavNode = $(".header #sl-nav");
            CONSTANT.SELECTOR.bodyNode = $(".header #offcanvas-body");
            CONSTANT.SELECTOR.navNode = $(".header #nav-header");
            CONSTANT.SELECTOR.additionalLinks = $(".header .menu-container");
            CONSTANT.SELECTOR.additionalLinksParent = $(".header .content-container");
            CONSTANT.SELECTOR.menuOpen = $(".header .menuOpen");
            CONSTANT.SELECTOR.menuClose = $(".header .menuClose");
        }

        /**
        * Bind events for module.
        * @function
        * @return void
        */
        function bindEvent() {
            window.addEventListener("resize", function () {
                initializeSelector();
                offCanvas();
            });
            CONSTANT.SELECTOR.menuOpen.click(callMenuOpen);
            CONSTANT.SELECTOR.menuClose.click(callMenuClose);

            window.addEventListener('scroll', function () {
                if (window.scrollY > 70) {
                    document.getElementById('nav-header').classList.add(CONSTANT.CLASS.fixedTop);
                    let navbar_height = document.querySelector('.navbar').offsetHeight;
                    document.body.style.paddingTop = navbar_height + 'px';
                } else {
                    document.getElementById('nav-header').classList.remove(CONSTANT.CLASS.fixedTop);
                    document.body.style.paddingTop = '0';
                }
            });
        }

        /**
        * Initialize the module.
        * @function
        * @memberof sunCore.comp.formDropdown
        * @return void
        */
        function init() {
            initializeSelector();
            bindEvent();
            offCanvas();
            setMainContentLandmark();
        }

        return {
            init: init,
        };
    })(core.$, core.util);

    /**
     * Initialise header module if given selector is in DOM
     */
    core.util.initialise(core.comp, "header", ".header");
})(sunCore);
