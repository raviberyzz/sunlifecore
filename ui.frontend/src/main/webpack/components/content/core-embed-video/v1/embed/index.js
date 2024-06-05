/**
 * embed.js
 * embed component functionality.
 */
(function (core) {
	"use strict";

	/**
	 * embed component
	 * @namespace embed
	 * @memberof sunCore.comp
	 */
	core.comp.embed = (function ($, util) {
		const CONSTANT = {
			SELECTOR: {
				vidyardHref: "a[href^='#fn_vidyard']"
			},
			ATTR: {
				href: "href",
				target : "target",
				onClick: "onClick",
				src: "src",
			}, 
      		SCRIPT: {
				vidyardV4: "https://play.vidyard.com/embed/v4.js"
			}
		};

		let $vidyardHref;

		/**
		 * Handler to cache dom selector on module load
		 * @function cacheSelectors
		 * @memberof sunCore.comp.embed
		 * @private
		 */
		function cacheSelectors() {
			$vidyardHref = $(CONSTANT.SELECTOR.vidyardHref);
		}

		/**
		 * Legacy Vidyard to Embed Vidyard Script
		 * @function embedVidyardScript
		 * @memberof sunCore.comp.embed
		 * @private
		 */
		function embedVidyardScript() {
			let scriptElem = document.createElement("script");
			scriptElem.setAttribute(CONSTANT.ATTR.src, CONSTANT.SCRIPT.vidyardV4);
			document.getElementsByTagName("head")[0].appendChild(scriptElem);
		}

		/**
		 * Legacy Vidyard to Replace vidyard Links
		 * @function replaceVidyardHref
		 * @memberof sunCore.comp.embed
		 * @private
		 */
		function replaceVidyardHref() {
			$vidyardHref.each(function () {
				let replacementLink =  $(this).attr(CONSTANT.ATTR.href).replace("#", "");
				$(this).attr(CONSTANT.ATTR.onClick, replacementLink);
				$(this).attr(CONSTANT.ATTR.href, "javascript:void(0);");
			});
		}


		/**
		 * Handler called at embed initialsation
		 * @function cacheSelectors
		 * @memberof sunCore.comp.embed
		 * @private
		 */
		function init() {
			cacheSelectors();
			embedVidyardScript();
			replaceVidyardHref();
			util.vidyardRunAnalytics();
		}

		return {
			init: init,
		};
	})(core.$, core.util);

	/**
	 * Initialise embed module if given selector is in DOM
	 */
	core.util.initialise(core.comp, "embed", '.sl-article-video-container, .cmp-text');
})(sunCore);
