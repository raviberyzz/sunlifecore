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
				leftNavMainList: "sl-left-nav-main-list"
			},
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
                dropdown.setAttribute("aria-controls", `leftnavdropdown${i}`);
                dropdown.setAttribute("href", `#leftnavdropdown${i}`);
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
            level2Nav.setAttribute("id", `leftnavdropdown${i}`);
            level2Nav.classList.add("sub-menu", "collapse", "nav",  "ms-1");
            level2Nav.classList.remove("sl-left-nav", "navbar-nav");

            if($leftNavMainList.childElementCount == 1 && i ==0){
                dropdown.ariaExpanded = "true";
                dropdown.remove();
                level2Nav.classList.add("show");
            }
            //Add class for active dropdown
            const activeLevel2Nav = level2Nav.querySelector(".cmp-navigation__item--active")
            if(activeLevel2Nav){
                dropdown.ariaExpanded = "true";
                level2Nav.classList.add("show");
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
