 /**
 * index.js
 * LeftNavigation related functionality.
 */
 (function (core) {
	"use strict";

	/**
	 * leftnavigation component
	 * @namespace leftnavigation
	 * @memberof sunCore.comp
	 */
	core.comp.leftnavigation = (function ($, util) {
		const CONSTANT = {
			SELECTOR: {
				leftNavDropdowns: "nav.sl-left-nav .nav-dropdown.nav-link",
				leftNavMainList: "sl-left-nav-main-list",
				leftNavCmpNav: ".cmp-navigation__item--active"
			},
			CLASS: {
				subMenu: "sub-menu",
				collapse: "collapse",
				nav: "nav",
				ms1: "ms-1",
				show: "show",
				slLeftNav: "sl-left-nav",
				navBarNav: "navbar-nav",
                leftNavDropdown: "leftnavdropdown"
			},
			ATTR: {
				href: "href",
				ariaControls: "aria-controls",
				id: "id"
			}
		};

		let $leftNavDropdowns, $leftNavMainList;

		/**
		 * Handler to create and link dropdowns for Left Navigation Levels
		 * @function createLeftNavDropdowns
		 * @memberof sunCore.comp.leftnavigation
		 * @private
		 */
        function createLeftNavDropdowns() {
            $leftNavDropdowns.forEach(function (dropdown, i) {
                //Add controls and classes for Collapse Dropdown
                dropdown.setAttribute(CONSTANT.ATTR.ariaControls, `${CONSTANT.CLASS.leftNavDropdown}${i}`);
                dropdown.setAttribute(CONSTANT.ATTR.href, `#${CONSTANT.CLASS.leftNavDropdown}${i}`);
                handle2ndLevelNav(dropdown, i);
            });
        }

        /**
		 * Handler to add attributes for 2nd Level Navigation Dropdown
		 * @function cacheSelectors
		 * @memberof sunCore.comp.leftnavigation
		 * @param {dropdown} element - dropdown list dom element
         * @param {i} num -index of nav dropdown loop
		 */
		function handle2ndLevelNav(dropdown, i) {
            const level2Nav = dropdown.nextElementSibling;
            level2Nav.setAttribute(CONSTANT.ATTR.id, `${CONSTANT.CLASS.leftNavDropdown}${i}`);
            level2Nav.classList.add(CONSTANT.CLASS.subMenu, CONSTANT.CLASS.collapse, CONSTANT.CLASS.nav, CONSTANT.CLASS.collapse, CONSTANT.CLASS.nav, CONSTANT.CLASS.ms1);
            level2Nav.classList.remove(CONSTANT.CLASS.slLeftNav, CONSTANT.CLASS.navBarNav);

            if($leftNavMainList.childElementCount == 1 && i ==0){
               dropdown.ariaExpanded = "true";
               dropdown.remove();
               level2Nav.classList.add(CONSTANT.CLASS.show);
           }
            //Add class for active dropdown
            const activeLevel2Nav = level2Nav.querySelector(CONSTANT.SELECTOR.leftNavCmpNav);
            if(activeLevel2Nav){
                dropdown.ariaExpanded = "true";
                level2Nav.classList.add(CONSTANT.CLASS.show);
            }
        }

		/**
		 * Handler to cache dom selector on module load
		 * @function cacheSelectors
		 * @memberof sunCore.comp.leftnavigation
		 * @private
		 */
		function cacheSelectors() {
			$leftNavDropdowns = document.querySelectorAll(CONSTANT.SELECTOR.leftNavDropdowns);
			$leftNavMainList =  document.getElementById(CONSTANT.SELECTOR.leftNavMainList);
		}

		/**
		 * Handler called at leftnavigation initialsation
		 * @function cacheSelectors
		 * @memberof sunCore.comp.leftnavigation
		 * @private
		 */
		function init() {
			cacheSelectors();
			createLeftNavDropdowns();
		}

		return {
			init: init,
		};
	})(core.$, core.util);

	/**
	 * Initialise left-nav module if given selector is in DOM
	 */
	core.util.initialise(core.comp, "leftnavigation", "nav.sl-left-nav");
})(sunCore);
