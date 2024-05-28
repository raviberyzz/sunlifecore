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
        const HEADERSELECTOR = {};

        const CONSTANT = {
            SELECTOR: {
                header: ".header",
                offCanvasEl: ".header #sl-header-offcanvas",
                slNavNode: ".header #sl-nav",
                bodyNode: ".header #offcanvas-body",
                navNode: ".header #nav-header",
                additionalLinks: ".header .menu-container",
                additionalLinksParent: ".header .content-container",
                menuOpen: ".menuOpen",
                menuClose: ".menuClose",
                slUtilityBar: ".sl-utility-bar",
                slUtilityBarOffCanvas: ".sl-utility-bar-offcanvas",
                navHeader: "#nav-header",
                navBar: ".navbar",
                mainContent: "#main-content",
                experiencefragment : '.experiencefragment ',
                slider: '.QSISlider'
            },
            CLASS: {
                slUtilityBar: "sl-utility-bar",
                slUtilityBarOffCanvas: "sl-utility-bar-offcanvas",
                show: "show",
                hiding: "hiding",
                offCanvasBackdrop: "offcanvas-backdrop",
                fixedTop: "fixed-top",
                breadcrumb: "breadcrumb"
            },
            ID: {
                mainContent: "main-content"
            },
            ROLE: {
                main: "main"
            }
        };

        let $comp,
            $offCanvasEl,
            $slNavNode,
            $bodyNode,
            $navNode,
            $additionalLinks,
            $additionalLinksParent,
            $menuOpen,
            $menuClose,
            $navHeader,
            $navBar,
            $mainContent,
            listeners = [];

        /**
        * Method to handle the desktop and mobile view
        * @function offCanvas
        * @memberof sunCore.comp.header
        * @private
        * @return void
        */
        function offCanvas() {
            if (window.innerWidth <= 1239) {
                HEADERSELECTOR.$utilityLists.removeClass(CONSTANT.CLASS.slUtilityBar);
                HEADERSELECTOR.$utilityLists.addClass(CONSTANT.CLASS.slUtilityBarOffCanvas);
                $bodyNode.append(HEADERSELECTOR.$utilityLists);
                /* Handles utility additional links view in mobile */
                $additionalLinks.remove();
                $additionalLinksParent.append($additionalLinks);
            }
            else {
                HEADERSELECTOR.$utilityListsOffCanvas.removeClass(CONSTANT.CLASS.slUtilityBarOffCanvas);
                HEADERSELECTOR.$utilityListsOffCanvas.addClass(CONSTANT.CLASS.slUtilityBar);
                HEADERSELECTOR.$utilityListsOffCanvas.insertBefore($navNode);
                /* Handles utility additional links view in desktop */
                $additionalLinks.remove();
                $additionalLinksParent.prepend($additionalLinks);
                /* Handles hamburger menu open on desktop view */
                if ($offCanvasEl.hasClass(CONSTANT.CLASS.show) && !$offCanvasEl.hasClass(CONSTANT.CLASS.hiding)) {
                    let offCanvas = new bootstrap.Offcanvas($offCanvasEl);
                    offCanvas.hide();
                    $offCanvasEl.removeClass(CONSTANT.CLASS.show);
                    let offcanvasBackdrop = document.getElementsByClassName(CONSTANT.CLASS.offCanvasBackdrop)[0];
                    offcanvasBackdrop.remove();
                    callMenuClose();
                }
            }
        }

        /**
        * Method to handle the hamburger menu open click
        * @function callMenuOpen
        * @memberof sunCore.comp.header
        * @private
        * @return void
        */
        function callMenuOpen() {
            if($(CONSTANT.SELECTOR.slider).length) {
                $(CONSTANT.SELECTOR.slider).hide();
            }
            $comp.append($offCanvasEl)
        }

        /**
        * Method to handle the hamburger menu close click
        * @function callMenuClose
        * @memberof sunCore.comp.header
        * @private
        * @return void
        */
        function callMenuClose() {
            if($(CONSTANT.SELECTOR.slider).length) {
                $(CONSTANT.SELECTOR.slider).show();
            }
            $slNavNode.append($offCanvasEl);
        }

        /**
        * Method to add the 'main-content' ID to the main content Layout Container
        * Also add main landmark on the page
        * @function setMainContentLandmark
        * @memberof sunCore.comp.header
        * @private
        * @return void
        */
        function setMainContentLandmark() {
            if ($comp.length > 0 && $mainContent.length < 1) {
                let layoutContainer = $comp.closest(CONSTANT.SELECTOR.experiencefragment).next();
                if(layoutContainer.hasClass(CONSTANT.CLASS.breadcrumb)) {
                    layoutContainer = layoutContainer.next();
                }
                layoutContainer.attr("id", CONSTANT.ID.mainContent);
                layoutContainer.attr("role", CONSTANT.ROLE.main);
            }
        }

        /**
        * Method to initialize the header selectors. They change depending on the desktop/mobile breakpoints
        * @function initializeSelector
        * @memberof sunCore.comp.header
        * @private
        * @return void
        */
        function initializeSelector() {
            HEADERSELECTOR.$utilityLists = $comp.find(CONSTANT.SELECTOR.slUtilityBar);
            HEADERSELECTOR.$utilityListsOffCanvas = $comp.find(CONSTANT.SELECTOR.slUtilityBarOffCanvas);
        }

        /**
         * Handle the sticky header style on scroll event.
         * @function handleScrollStyles
         * @memberof sunCore.comp.header
         * @private
         * @return void
         */
        function handleScrollStyles() {
            if (window.scrollY > 70) {
                $navHeader.addClass(CONSTANT.CLASS.fixedTop);
                let navbar_height = $navBar[0].offsetHeight;
                document.body.style.paddingTop = navbar_height + 'px';
            } else {
                $navHeader.removeClass(CONSTANT.CLASS.fixedTop);
                document.body.style.paddingTop = '0';
            }
        }

        /**
        * Method to bind events for module
        * @function bindEvent
        * @memberof sunCore.comp.header
        * @private
        * @return void
        */
        function bindEvent() {

            listeners.push(
                $.subscribe(util.customEvents.RESIZED, function () {
                    initializeSelector();
                    offCanvas();
                })
            );

            $comp.on(util.customEvents.INTERACTION, CONSTANT.SELECTOR.menuOpen, callMenuOpen);
            $comp.on(util.customEvents.INTERACTION, CONSTANT.SELECTOR.menuClose, callMenuClose);

            listeners.push(
                $.subscribe(util.customEvents.INSTANTSCROLLED, handleScrollStyles)
            );
        }

        /**
         * Handler to cache dom selector on module load
         * @function cacheSelectors
         * @memberof sunCore.comp.header
         * @private
         * @return void
         */
        function cacheSelectors() {

            $comp = $(CONSTANT.SELECTOR.header);
            $offCanvasEl = $(CONSTANT.SELECTOR.offCanvasEl);
            $slNavNode = $(CONSTANT.SELECTOR.slNavNode);
            $bodyNode = $(CONSTANT.SELECTOR.bodyNode);
            $navNode = $(CONSTANT.SELECTOR.navNode);
            $additionalLinks = $(CONSTANT.SELECTOR.additionalLinks);
            $additionalLinksParent = $(CONSTANT.SELECTOR.additionalLinksParent);
            $menuOpen = $(CONSTANT.SELECTOR.menuOpen);
            $menuClose = $(CONSTANT.SELECTOR.menuClose);
            $navHeader = $(CONSTANT.SELECTOR.navHeader);
            $navBar = $(CONSTANT.SELECTOR.navBar);
            $mainContent = $(CONSTANT.SELECTOR.mainContent);
        }

        /**
        * Initialize the module.
        * @function init
        * @memberof sunCore.comp.header
        * @private
        * @return void
        */
        function init() {
            cacheSelectors();
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
