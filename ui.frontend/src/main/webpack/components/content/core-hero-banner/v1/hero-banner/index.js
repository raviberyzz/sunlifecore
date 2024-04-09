/**
 * hero-banner/index.js
 * Hero Banner Component specific JS Module .
 */
(function (core) {
	"use strict";

	/**
	 * Hero Banner component
	 * @namespace heroBanner
	 * @memberof sunCore.comp
	 */
	core.comp.heroBanner = (function ($, util) {
		let listeners = [];

		/**
		 * Handler to update the scrollbar width in custom property.
		 * @function setScrollbarWidth
		 * @memberof sunCore.comp.heroBanner
		 * @private
		 */
		function setScrollbarWidth() {
			const scrollbarWidth =
				window.innerWidth - document.body.clientWidth;
			document.documentElement.style.setProperty(
				"--scrollbarWidth",
				`${scrollbarWidth}px`
			);
		}

		/**
		 * Handler to bind event specific for hero-banner
		 * @function bindEvent
		 * @memberof sunCore.comp.heroBanner
		 * @private
		 */
		function bindEvent() {
			// bind resize event to update scrollbar custom property
			listeners.push(
				$.subscribe(util.customEvents.RESIZED, setScrollbarWidth)
			);
		}

		/**
		 * Handler to be called for heroBanner initialsation
		 * @function init
		 * @memberof sunCore.comp.heroBanner
		 * @private
		 */
		function init() {
			//set scrollbar width in custom property
			setScrollbarWidth();
			bindEvent();
		}

		return {
			init: init,
		};
	})(core.$, core.util);

	/**
	 * Initialise hero-banner module if given selector is in DOM
	 */
	core.util.initialise(core.comp, "heroBanner");
})(sunCore);
