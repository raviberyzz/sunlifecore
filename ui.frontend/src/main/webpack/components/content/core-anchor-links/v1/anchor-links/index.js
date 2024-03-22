/**
 * anchor-links/index.js
 * Module to handle functionality required for Anchor-link component, which extends AEM core Table * of content component
 */

(function (core) {
	"use strict";

	/**
	 * Anchor-Link component
	 * @namespace anchorLinks
	 * @memberof sunCore.comp
	 */
	core.comp.anchorLinks = (function ($, util) {
		const CONSTANT = {
			SELECTOR: {
				slArticle: ".article-container",
				slAnchorLinkComp: ".sl-anchor-links",
				slAnchorLinkListLink: ".sl-anchor-links li a",
				slHeader: ".sl-header",
				slArticleAnchorLinksInline: ".article-anchor-links-inline",
				slAnchorLinks: ".anchor-links",
			},
			CLASS: {
				dLgNone: "d-lg-none",
			},
		};

		let $slAnchorLinkComp,
			$slArticleAnchorLinksInline,
			$slArticle,
			$slAnchorLinkListLink,
			$slAnchorLinks,
			listeners = [];

		/**
		 * Method to handle user interaction on anchor links
		 * @function handleLinkInteraction
		 * @memberof sunCore.comp.anchorLinks
		 * @private
		 * @param {object} event - event object
		 */
		function handleLinkInteraction(event) {
			event.preventDefault();
			scrollToHeading(event);
		}

		/**
		 * It returns the height of the header on the top
		 * @function getHeaderOffset
		 * @memberof sunCore.comp.anchorLinks
		 * @private
		 * @return {number} height of the sticky header on top
		 */
		function getHeaderOffset() {
			return $(CONSTANT.SELECTOR.slHeader).height();
		}

		/**
		 * It update the height and top values to make anchor link sticky
		 * @function updateAnchorLinkStickyConfigs
		 * @memberof sunCore.comp.anchorLinks
		 * @private
		 */
		function updateAnchorLinkStickyConfigs() {
			const articleHeight = $slArticle[0].clientHeight;
			$slAnchorLinkComp.parent().css("height", articleHeight);
			$slAnchorLinkComp.css("top", getHeaderOffset() + 20);
		}

		/**
		 * Method to handle scroll to context to required heading
		 * @function handleLinkInteraction
		 * @memberof sunCore.comp.anchorLinks
		 * @private
		 * @param {object} event - event object
		 */
		function scrollToHeading(event) {
			const currentLinkHref = event.target.getAttribute("href");
			const $currentHrefElem = $(
				`h2[id="${currentLinkHref.substring(1)}"]`
			);

			// get retuired offset
			let offsetTop = getHeaderOffset() + 20;

			core.util.scrollTo.element(
				$currentHrefElem,
				{ duration: 100 },
				offsetTop
			);
		}

		/**
		 * Method to filter/show only required headings given in container to anchor-link
		 * @function filterRequiredLinksOnly
		 * @memberof sunCore.comp.anchorLinks
		 * @private
		 * @param {object} $container - jquery dom selector for container where all required heading exist
		 */
		function filterRequiredLinksOnly($container) {
			let headingIds = [];
			let $containerHeadings = $container.find("h2");
			$containerHeadings.map((index, value) => headingIds.push(value.id));
			$slAnchorLinkComp.find("a").each(function (index, element) {
				if (
					!headingIds.includes(
						element.getAttribute("href").substring(1)
					)
				) {
					$(element).parent().hide();
				}
			});
		}

		/**
		 * Method to handle responsive rendering of anchor-link in article page
		 * @function renderAnchorLinks
		 * @memberof sunCore.comp.anchorLinks
		 * @private
		 */
		function renderAnchorLinks() {
			if (util.matchmedia.L.matches || util.matchmedia.XL.matches) {
				$slArticleAnchorLinksInline.addClass(CONSTANT.CLASS.dLgNone);
				$slAnchorLinks.show();
				return;
			}
			$slAnchorLinks.hide();
			$slArticleAnchorLinksInline.html("");
			$slArticleAnchorLinksInline
				.html($slAnchorLinks.html())
				.removeClass(CONSTANT.CLASS.dLgNone);
		}

		/**
		 * High order function to handle anchor-link rendering on article page
		 * @function loadAnchorLinks
		 * @memberof sunCore.comp.anchorLinks
		 * @private
		 */
		function loadAnchorLinks() {
			if ($slArticle.length) {
				filterRequiredLinksOnly($slArticle);
				updateAnchorLinkStickyConfigs();
				renderAnchorLinks();
			}
		}

		/**
		 * Method to update the active state of sticky anchor link on scrolling
		 * @function activeLinkStateHandler
		 * @memberof sunCore.comp.anchorLinks
		 * @private
		 */
		function activeLinkStateHandler() {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						const id = entry.target.getAttribute("id");
						const anchorLinkSelector = `.sl-anchor-links li a[href="#${id}"]`;
						if (entry.intersectionRatio > 0) {
							document
								.querySelector(anchorLinkSelector)
								.parentElement.classList.add("active-anchor");
						} else {
							document
								.querySelector(anchorLinkSelector)
								.parentElement.classList.remove(
									"active-anchor"
								);
						}
					});
				},
				{ rootMargin: "0px 0px -30% 0px" }
			);

			// Track all h2 headings inside article-container
			document
				.querySelectorAll(".article-container h2")
				.forEach((heading) => {
					observer.observe(heading);
				});
		}

		/**
		 * Handler to bind event specific for anchor-link
		 * @function bindEvent
		 * @memberof sunCore.comp.anchorLinks
		 * @private
		 */
		function bindEvent() {
			$(document).on(
				util.customEvents.INTERACTION,
				CONSTANT.SELECTOR.slAnchorLinkListLink,
				handleLinkInteraction
			);

			listeners.push(
				$.subscribe(util.customEvents.RESIZED, renderAnchorLinks)
			);
		}

		/**
		 * Handler to cache dom selector on module load
		 * @function cacheSelectors
		 * @memberof sunCore.comp.anchorLinks
		 * @private
		 */
		function cacheSelectors() {
			$slAnchorLinkComp = $(CONSTANT.SELECTOR.slAnchorLinkComp);
			$slArticle = $(CONSTANT.SELECTOR.slArticle);
			$slAnchorLinkListLink = $(CONSTANT.SELECTOR.slAnchorLinkListLink);
			$slArticleAnchorLinksInline = $(
				CONSTANT.SELECTOR.slArticleAnchorLinksInline
			);
			$slAnchorLinks = $(CONSTANT.SELECTOR.slAnchorLinks);
		}

		/**
		 * Method used to initilize the module
		 * @function
		 */
		function init() {
			cacheSelectors();
			bindEvent();
			loadAnchorLinks();
			activeLinkStateHandler();
		}

		return {
			init: init,
		};
	})(core.$, core.util);

	/**
	 * Initialise anchorLinks module if given selector is in DOM
	 */
	core.util.initialise(core.comp, "anchorLinks", ".sl-anchor-links");
})(sunCore);
