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
			CLASS: {
				button: "button",
				dropdown: "dropdown",
				dropdownMenu: "dropdown-menu",
				col: "col",
				h2: "h2",
				show: "show"
			},
			ATTR: {
				beforeBegin: "beforebegin",
				ariaExpanded: "aria-expanded",
				dataBsToggle: "data-bs-toggle",
                dataHeading: "data-heading"
			}
		};

		let $footerMenuRow, 
            $footerMenuHeader, 
            $footerMenuList,
			$footerMenuHeadingElement, 
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
					menuRow.classList.remove(CONSTANT.SELECTOR.footerMenuDropdownClass, CONSTANT.CLASS.dropdown);
					menuRow.classList.add(CONSTANT.CLASS.col);
				} else if (renderMobile) {
					menuRow.classList.remove(CONSTANT.CLASS.col);
					menuRow.classList.add(CONSTANT.SELECTOR.footerMenuDropdownClass, CONSTANT.CLASS.dropdown);
				}
            }

            for (const menuHeader of $footerMenuHeader) {
				let layoutFooterMenuHeader = document.createElement( renderDesktop ? $footerMenuHeadingElement : CONSTANT.CLASS.button);
				layoutFooterMenuHeader.classList.add(CONSTANT.SELECTOR.footerMenuHeaderClass);
				
				if (renderMobile) {
					layoutFooterMenuHeader.classList.add(CONSTANT.SELECTOR.footerMenuHeaderBtnClass);
					layoutFooterMenuHeader.setAttribute(CONSTANT.ATTR.ariaExpanded, "false");
					layoutFooterMenuHeader.setAttribute(CONSTANT.ATTR.dataBsToggle, CONSTANT.CLASS.dropdown);
				}
				
				layoutFooterMenuHeader.innerHTML = menuHeader.innerHTML;
				menuHeader.insertAdjacentElement(CONSTANT.ATTR.beforeBegin, layoutFooterMenuHeader);
				menuHeader.remove();
            }

            for (const menuList of $footerMenuList) {
				menuList.classList.remove(CONSTANT.CLASS.show);
				
				if (renderDesktop) {
					menuList.classList.remove(CONSTANT.CLASS.dropdownMenu);
				} else if (renderMobile) {
					menuList.classList.add(CONSTANT.CLASS.dropdownMenu);
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
			window.addEventListener("resize", checkToRenderFooter);
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
            $footerMenuHeadingElement = $(CONSTANT.SELECTOR.footerMenuRow).attr(CONSTANT.ATTR.dataHeading) ? $(CONSTANT.SELECTOR.footerMenuRow).attr(CONSTANT.ATTR.dataHeading) : CONSTANT.CLASS.h2;
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

