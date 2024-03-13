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
			},
		};

		let $slHeader, $searchBar, $searchBtn;

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
			} else {
				$searchBar.addClass("show");
			}
		}

		/**
		 * Handler to bind event specific for search
		 * @function bindEvent
		 * @memberof sunCore.comp.search
		 * @private
		 */
		function bindEvent() {
			$(document).on("mouseup", searchBarHandler);
			/* focus handling when search-bar got hide */
			$searchBar.on("hidden.bs.collapse", function () {
				$searchBtn.focus();
			});
			/* focus handling when search-bar get visible */
			$searchBar.on("shown.bs.collapse", function () {
				$(CONSTANT.SELECTOR.searchInputBox).focus();
			});
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
