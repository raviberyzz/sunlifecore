 /**
 * index.js
 * footer related functionality.
 */
 (function (core) {
	"use strict";

	/**
	 * footer component
	 * @namespace footer
	 * @memberof sunCore.comp
	 */
	core.comp.footer = (function ($, util) {
		const CONSTANT = {
			SELECTOR: {
				footerMenuRow: ".sl-footer .footer-menus .footer-menu",
				footerMenuHeader: ".sl-footer .footer-menus .footer-menu-header",
                footerMenuList: ".sl-footer .footer-menus ul.footer-menu-list",
				footerMenuHeaderBtnClass: "footer-menu-header-button",
                footerMenuHeaderClass: "footer-menu-header",
                footerMenuDropdownClass: "footer-menus-dropdown"
			},
		};

		let $footerMenuRow, 
            $footerMenuHeader, 
            $footerMenuList, 
            $footerMenuHeaderIsDropdown = false,
            listeners = [];

		/**
		 * Handler to render Footer Based on Screensize
		 * @function renderFooterAccordion
		 * @memberof sunCore.comp.footer
		 * @private
		 */
        function renderFooterAccordion() {
            $footerMenuHeader = document.querySelectorAll(CONSTANT.SELECTOR.footerMenuHeader);
            $footerMenuHeaderIsDropdown = $footerMenuHeader[0].classList.contains(CONSTANT.SELECTOR.footerMenuHeaderBtnClass) ? true : false;
            let isDesktop = util.matchmedia.L.matches || util.matchmedia.XL.matches;

            if ( isDesktop && $footerMenuHeaderIsDropdown) {
                renderDesktopFooter();
            } else if ( !isDesktop && !$footerMenuHeaderIsDropdown ) {
                renderMobileFooter();
            }
       }

        /**
		 * Handler to render footer in Desktop
		 * @function renderDesktopFooter
		 * @memberof sunCore.comp.footer
		 * @private
		 */
		function renderDesktopFooter() {
            for (const menuRow of $footerMenuRow) {
                menuRow.classList.remove(CONSTANT.SELECTOR.footerMenuDropdownClass, "dropdown");
                menuRow.classList.add("col");
            }
            for (const menuHeader of $footerMenuHeader) {
                let desktopFooterMenuHeader = document.createElement('div');
                desktopFooterMenuHeader.classList.add(CONSTANT.SELECTOR.footerMenuHeaderClass);
                desktopFooterMenuHeader.innerHTML = menuHeader.innerHTML;
                menuHeader.insertAdjacentElement("beforebegin", desktopFooterMenuHeader);
                menuHeader.remove();
            }
            for (const menuList of $footerMenuList) {
                menuList.classList.remove("show", "dropdown-menu");
            }
		}

        /**
		 * Handler to render footer in Mobile
		 * @function renderMobileFooter
		 * @memberof sunCore.comp.footer
		 * @private
		 */
		function renderMobileFooter() {
            for (const menuRow of $footerMenuRow) {
                menuRow.classList.remove("col");
                menuRow.classList.add(CONSTANT.SELECTOR.footerMenuDropdownClass, "dropdown");
            }
            for (const menuHeader of $footerMenuHeader) {
                let mobileFooterMenuHeader = document.createElement('button');
                mobileFooterMenuHeader.classList.add(CONSTANT.SELECTOR.footerMenuHeaderClass, CONSTANT.SELECTOR.footerMenuHeaderBtnClass);
                mobileFooterMenuHeader.setAttribute("aria-expanded", "false");
                mobileFooterMenuHeader.setAttribute("data-bs-toggle", "dropdown");
                mobileFooterMenuHeader.innerHTML = menuHeader.innerHTML;
                menuHeader.insertAdjacentElement("beforebegin", mobileFooterMenuHeader);
                menuHeader.remove();
            }
            
            for (const menuList of $footerMenuList) {
                menuList.classList.remove("show");
                menuList.classList.add("dropdown-menu");
            }
		}

        /**
         * Handler to bind event specific for footer
         * @function bindEvent
         * @memberof sunCore.comp.footer
         * @private
         */
		function bindEvent() {
			listeners.push(
				$.subscribe(util.customEvents.RESIZED, renderFooterAccordion)
			);
		}

		 /**
		 * Handler to cache dom selector on module load
		 * @function cacheSelectors
		 * @memberof sunCore.comp.footer
		 * @private
		 */
		function cacheSelectors() {
            $footerMenuRow = document.querySelectorAll(CONSTANT.SELECTOR.footerMenuRow);
            $footerMenuList = document.querySelectorAll(CONSTANT.SELECTOR.footerMenuList);
            $footerMenuHeader = document.querySelectorAll(CONSTANT.SELECTOR.footerMenuHeader);
		}

		/**
		 * Handler called at footer initialsation
		 * @function cacheSelectors
		 * @memberof sunCore.comp.footer
		 * @private
		 */
		function init() {
			cacheSelectors();
            bindEvent();
			renderFooterAccordion();
		}

		return {
			init: init,
		};
	})(core.$, core.util);

	/**
	 * Initialise left-nav module if given selector is in DOM
	 */
	core.util.initialise(core.comp, "footer", '.sl-footer .footer-menus .footer-menu-header');
})(sunCore);

