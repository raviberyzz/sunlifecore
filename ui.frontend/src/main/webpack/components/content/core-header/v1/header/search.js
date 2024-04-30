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
		};

		let $slHeader, $searchCloseBtn, $searchBar, $searchBtn, searchBtnTabbed = false, searchBarCollapse;

		/**
		 * Event handler for search-bar showing and hiding on top
		 * @function searchBarHandler
		 * @memberof sunCore.comp.search
		 * @private
		 * @param {object} event - event object
		 */
		function searchBarHandler(event) {
			if ($searchBar.hasClass("show")) {
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
			$searchBtn.attr("aria-expanded", !hide);
			if (hide) {
				$searchBar.removeClass("show");
				$searchBar.attr('aria-expanded', 'false');
			} else {
				$searchBar.addClass("show");
				$searchBar.attr('aria-expanded', 'true');
			}
		}

		/**
		 * handle tabbing of search button
		 * @function searchTabHandler
		 * @memberof sunCore.comp.search
		 * @private
		 */
		function searchTabHandler () {
			if(searchBtnTabbed) {
				searchBtnTabbed = false
				$searchCloseBtn.focus();
			}
			searchBtnTabbed = true;
		}

		/**
		 * Method to handle the escape key event to close the desktop search bar on escape
		 * @function searchBarEscHandler
		 * @memberof sunCore.comp.search
		 * @private
		 * @param {object} e - event object
		 */
		function searchBarEscHandler (e) {
			if (e.keyCode === util.constants.KeyCode.ESC) {
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
				$searchBar.attr('aria-expanded', 'false');
				$searchBtn.focus();
			});
			/* focus handling when search-bar get visible */
			$searchBar.on("shown.bs.collapse", function () {
				$searchBar.attr('aria-expanded', 'true');
				$(CONSTANT.SELECTOR.searchInputBox).focus();
			});

			$(document).on(util.customEvents.KEYDOWN, CONSTANT.SELECTOR.searchBarSearchBtn, searchTabHandler);
			$(document).on(util.customEvents.KEYDOWN, CONSTANT.SELECTOR.searchBar, searchBarEscHandler);
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
