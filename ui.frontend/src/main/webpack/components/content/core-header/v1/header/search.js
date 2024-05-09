/**
 * search.js
 * Header search-box and search related functionality.
 */
(function (core) {
	"use strict";

	/**
	 * search component
	 * @namespace search
	 * @memberof sunCore.comp
	 */
	core.comp.search = (function ($, util) {
		const CONSTANT = {
			SELECTOR: {
				slHeader: ".sl-header",
				searchBar: ".search-bar",
				searchBtn: ".sl-search-btn",
				searchInputBox: "#search-box-desktop input[type=text]",
				searchBarSearchBtn: ".search-bar .CoveoSearchButton",
				searchCloseBtn: "#search-close-btn"
			},
			ATTR: {
				ariaExpanded: "aria-expanded"
			},
			CLASS: {
				show: "show"
			}
		};

		let $searchCloseBtn, $searchBar, $searchBtn, searchBarShowing = false, searchBarCollapse;

		/**
		 * Event handler for search-bar showing and hiding on top
		 * @function searchBarHandler
		 * @memberof sunCore.comp.search
		 * @private
		 * @param {object} event - event object
		 */
		function searchBarHandler(event) {
			if ($searchBar.hasClass(CONSTANT.CLASS.show)) {
				if (event.which === 1) {
					if (
						!$searchBar.is(event.target) &&
						$searchBar.has(event.target).length === 0 &&
						$(event.target).closest(CONSTANT.SELECTOR.searchBtn)
							.length < 1
					) {
						toggleSearchBar(true);
						event.stopImmediatePropagation();
					}
				}
			}
		}

		/**
		 * Toggle the search-bar depending upon hide param
		 * @function toggleSearchBar
		 * @memberof sunCore.comp.search
		 * @private
		 * @param {boolean} hide - boolean status to toggle search-bar
		 */
		function toggleSearchBar(hide) {
			$searchBtn.attr(CONSTANT.ATTR.ariaExpanded, !hide);
			if (hide) {
				$searchBar.removeClass(CONSTANT.CLASS.show);
				$searchBar.attr(CONSTANT.ATTR.ariaExpanded, 'false');
			} else {
				$searchBar.addClass(CONSTANT.CLASS.show);
				$searchBar.attr(CONSTANT.ATTR.ariaExpanded, 'true');
			}
		}

		/**
		 * Handle tabbing inside search bar ensuring focus stays within controls when open
		 * @function searchTabHandler
		 * @memberof sunCore.comp.search
		 * @param {object} event - event object
		 * @private
		 */
		function searchTabHandler (event) {
			let $searchBarSearchBtn = document.querySelector(CONSTANT.SELECTOR.searchBarSearchBtn);
			let $searchBarCloseBtn = document.querySelector(CONSTANT.SELECTOR.searchCloseBtn);
			searchBarShowing = $searchBar.hasClass(CONSTANT.CLASS.show);

			if (
				event.keyCode === util.constants.KeyCode.TAB && 
				event.shiftKey && 
				searchBarShowing
			) {
				event.preventDefault()
				if ( $searchBarSearchBtn == event.target) {
					//Shift + Tab on SearchBtn Move to SearchInput
					$(CONSTANT.SELECTOR.searchInputBox).focus();
				} else if ($searchBarCloseBtn == event.target) {
					//Shift + Tab on CloseBtn Move to SearchBtn
					$searchBarSearchBtn.focus({ focusVisible: true });
				}

			}
			else if (
				event.keyCode === util.constants.KeyCode.TAB &&
				searchBarShowing
			) {
				if ( $searchBarSearchBtn == event.target) {
					//Tab on SearchBtn Move to CloseBtn
					$searchCloseBtn.focus();
				}
			}
		}

		/**
		 * Method to handle the escape key event to close the desktop search bar on escape
		 * @function searchBarEscHandler
		 * @memberof sunCore.comp.search
		 * @private
		 * @param {object} event - event object
		 */
		function searchBarEscHandler (event) {
			if (event.keyCode === util.constants.KeyCode.ESC && 
				$searchBar.hasClass(CONSTANT.CLASS.show)
			) {
				searchBarCollapse.hide();
			}
		}

		/**
		 * Handler to bind event specific for search
		 * @function bindEvent
		 * @memberof sunCore.comp.search
		 * @private
		 */
		function bindEvent() {
			$(document).on(util.customEvents.MOUSE_UP, searchBarHandler);
			/* focus handling when search-bar got hide */
			$searchBar.on("hidden.bs.collapse", function () {
				$searchBar.attr(CONSTANT.ATTR.ariaExpanded, 'false');
				$searchBtn.focus();
			});
			/* focus handling when search-bar get visible */
			$searchBar.on("shown.bs.collapse", function () {
				$searchBar.attr(CONSTANT.ATTR.ariaExpanded, 'true');
				$(CONSTANT.SELECTOR.searchInputBox).focus();
			});

			$(document).on(util.customEvents.KEYDOWN, CONSTANT.SELECTOR.searchBarSearchBtn, searchTabHandler);
			$(document).on(util.customEvents.KEYDOWN, CONSTANT.SELECTOR.searchCloseBtn, searchTabHandler);
			$(document).on(util.customEvents.KEYDOWN, searchBarEscHandler);
		}

		/**
		 * Handler to cache dom selector on module load
		 * @function cacheSelectors
		 * @memberof sunCore.comp.search
		 * @private
		 */
		function cacheSelectors() {
			$searchBar = $(CONSTANT.SELECTOR.searchBar);
			$searchBtn = $(CONSTANT.SELECTOR.searchBtn);
			$searchCloseBtn = $(CONSTANT.SELECTOR.searchCloseBtn);
			searchBarCollapse = new bootstrap.Collapse($searchBar, {
				toggle: false
			  });
			
		}

		/**
		 * Handler called at search initialsation
		 * @function cacheSelectors
		 * @memberof sunCore.comp.search
		 * @private
		 */
		function init() {
			cacheSelectors();
			bindEvent();
		}

		return {
			init: init,
		};
	})(core.$, core.util);

	/**
	 * Initialise search module if given selector is in DOM
	 */
	core.util.initialise(core.comp, "search", '[data-comp="search"]');
})(sunCore);
