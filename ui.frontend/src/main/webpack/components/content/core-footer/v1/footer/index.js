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
			renderDesktop = false,
			renderMobile = false,
            listeners = [];

		/**
		 * Handler to check to render Footer Based on Screensize
		 * @function checkToRenderFooter
		 * @memberof sunCore.comp.footer
		 * @private
		 */
        function checkToRenderFooter() {
            $footerMenuHeader = document.querySelectorAll(CONSTANT.SELECTOR.footerMenuHeader);
            $footerMenuHeaderIsDropdown = $footerMenuHeader[0].classList.contains(CONSTANT.SELECTOR.footerMenuHeaderBtnClass) ? true : false;
            let isDesktop = util.matchmedia.L.matches || util.matchmedia.XL.matches;
			renderDesktop = isDesktop && $footerMenuHeaderIsDropdown;
			renderMobile = !isDesktop && !$footerMenuHeaderIsDropdown;

            if ( renderDesktop || renderMobile) {
                renderFooterLayout();
            }
       }

        /**
		 * Handler to render footer in Desktop
		 * @function renderFooterLayout
		 * @memberof sunCore.comp.footer
		 * @private
		 */
		function renderFooterLayout() {

            for (const menuRow of $footerMenuRow) {
				if (renderDesktop) {
					menuRow.classList.remove(CONSTANT.SELECTOR.footerMenuDropdownClass, "dropdown");
					menuRow.classList.add("col");
				} else if (renderMobile) {
					menuRow.classList.remove("col");
					menuRow.classList.add(CONSTANT.SELECTOR.footerMenuDropdownClass, "dropdown");
				}
            }

            for (const menuHeader of $footerMenuHeader) {
				let layoutFooterMenuHeader = document.createElement( renderDesktop ? "div" : "button");
				layoutFooterMenuHeader.classList.add(CONSTANT.SELECTOR.footerMenuHeaderClass);
				
				if (renderMobile) {
					layoutFooterMenuHeader.classList.add(CONSTANT.SELECTOR.footerMenuHeaderBtnClass);
					layoutFooterMenuHeader.setAttribute("aria-expanded", "false");
					layoutFooterMenuHeader.setAttribute("data-bs-toggle", "dropdown");
				}
				
				layoutFooterMenuHeader.innerHTML = menuHeader.innerHTML;
				menuHeader.insertAdjacentElement("beforebegin", layoutFooterMenuHeader);
				menuHeader.remove();
            }

            for (const menuList of $footerMenuList) {
				menuList.classList.remove("show");
				
				if (renderDesktop) {
					menuList.classList.remove("dropdown-menu");
				} else if (renderMobile) {
					menuList.classList.add("dropdown-menu");
				}

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
				$.subscribe(util.customEvents.RESIZED, checkToRenderFooter)
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
			checkToRenderFooter();
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

