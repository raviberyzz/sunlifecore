/**
 * dynamic-card-container/index.js
 * Module to handle functionality required for Dynamic Card Container component, which is used are parent/container component of card.
 */

(function (core) {
	"use strict";

	/**
	 * Dynamic Card Container component
	 * @namespace dynamicCardContainer
	 * @memberof sunCore.comp
	 */
	core.comp.dynamicCardContainer = (function ($, util) {
		const CONSTANT = {
			SELECTOR: {
				slDynamicCardContainer: ".sl-dynamic-card-container",
				clickableCards: ".card[data-clickable]",
			},
		};

		let $clickableCards, $slDynamicCardContainer;

		/**
		 * Method to handle the click action on clickable cards
		 * @function clickableCardHandler
		 * @memberof sunCore.comp.dynamicCardContainer
		 * @private
		 * @param {object} event - event object
		 */
		function clickableCardHandler(event) {
			const $card = $(event.target).closest(
				CONSTANT.SELECTOR.clickableCards
			);
			const redirectURL = $card.data("href");
			if (redirectURL) {
				window.location.href = redirectURL;
			}
		}

		/**
		 * Handler to bind event specific for dynamic card container
		 * @function bindEvent
		 * @memberof sunCore.comp.dynamicCardContainer
		 * @private
		 */
		function bindEvent() {
			if ($clickableCards.length) {
				$slDynamicCardContainer.on(
					util.customEvents.INTERACTION,
					CONSTANT.SELECTOR.clickableCards,
					clickableCardHandler
				);
			}
		}

		/**
		 * Handler to cache dom selector on module load
		 * @function cacheSelectors
		 * @memberof sunCore.comp.dynamicCardContainer
		 * @private
		 */
		function cacheSelectors() {
			$slDynamicCardContainer = $(
				CONSTANT.SELECTOR.slDynamicCardContainer
			);
			$clickableCards = $(CONSTANT.SELECTOR.clickableCards);
		}

		/**
		 * Method used to initilize the dynamicCardContainer module
		 * @function init
		 * @memberof sunCore.comp.dynamicCardContainer
		 * @public
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
	 * Initialise dynamicCardContainer module if given selector is in DOM
	 */
	core.util.initialise(
		core.comp,
		"dynamicCardContainer",
		".sl-dynamic-card-container"
	);
  
})(sunCore);
