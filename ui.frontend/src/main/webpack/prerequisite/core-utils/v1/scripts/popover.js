/*!
 * Util for popover functionality
 */

(function (core) {
	/**
	 * Popover util module.
	 * @memberof sunCore.util
	 */
	core.util.popover = (function ($, util) {
		const CONSTANTS = {
			SELECTOR: {
				popover: '[data-bs-toggle="popover"]',
				popoverCls: ".popover",
				popoverCloseBtn: ".popover .btn-close-popover",
				tabSelectors: "select, input, textarea, button, a",
				popoverButton: ".popover-button",
			},
			ATTRIBUTE: {
				bsTitle: "bs-title",
				bsContent: "bs-content",
				ariaDescribedby: "aria-describedby",
			},
			TEMPLATE: {
				closeBtn:
					'<span class="popover-close-container"><button type="button" class="btn-close-popover btn-close"><span class="visually-hidden">close</span><i role="presentation" class="fal fa-times"></i></button></span>',
			},
		};

		/**
		 * This method return the required wrapper css class of popover depending upon title
		 * @function getCustomClass
		 * @memberof sunCore.util.popover
		 * @param {Object} popoverTriggerElem - popover element node
		 * @returns {String} - {("sl-popover" | "sl-popover sl-popover-headless")}
		 * @private
		 */
		function getCustomClass(popoverTriggerElem) {
			return getDataAttrContent(
				popoverTriggerElem,
				CONSTANTS.ATTRIBUTE.bsTitle
			)
				? "sl-popover"
				: "sl-popover sl-popover-headless";
		}

		/**
		 * This method return the required popover config object using different attribute values
		 * @function getPopoverConfig
		 * @memberof sunCore.util.popover
		 * @param {Object} popoverTriggerEl - popover element node
		 * @returns {Object} - {({ html: boolean; sanitize: boolean; title: string; content: any; customClass: "sl-popover" | "sl-popover sl-popover-headless"; })}
		 * @private
		 */
		function getPopoverConfig(popoverTriggerEl) {
			return {
				html: true,
				sanitize: false,
				title: generatePopoverHeader(popoverTriggerEl),
				content: getDataAttrContent(
					popoverTriggerEl,
					CONSTANTS.ATTRIBUTE.bsContent
				),
				customClass: getCustomClass(popoverTriggerEl),
			};
		}

		/**
		 * This method returns the header/title template of popover that need to be generated.
		 * @function generatePopoverHeader
		 * @memberof sunCore.util.popover
		 * @param {Object} popoverTriggerElem - popover element node
		 * @returns {string} - template string for popover header
		 * @private
		 */
		function generatePopoverHeader(popoverTriggerElem) {
			let headerText = getDataAttrContent(
				popoverTriggerElem,
				CONSTANTS.ATTRIBUTE.bsTitle
			);
			if (headerText) {
				return `${headerText} ${CONSTANTS.TEMPLATE.closeBtn}`;
			}
			return `${CONSTANTS.TEMPLATE.closeBtn}`;
		}

		/**
		 * This method returns the value of passed data attribute on given DOM element
		 * @function getDataAttrContent
		 * @memberof sunCore.util.popover
		 * @param {Object} element - DOM element
		 * @param {String} dataAttribute - name of the data attribute
		 * @returns {String} - value of the data attribute on given element
		 * @private
		 */
		function getDataAttrContent(element, dataAttribute) {
			return $(element).data(dataAttribute);
		}

		/**
		 * This select all the popover selector and then initialize
		 * the bootstrap popover with selected DOM node configs
		 * @function initializeAllPopover
		 * @memberof sunCore.util.popover
		 * @private
		 */
		function initializeAllPopover() {
			$popoverTriggerList.map(function (popoverTriggerEl) {
				let customConfig = getPopoverConfig(popoverTriggerEl);
				return new bootstrap.Popover(popoverTriggerEl, customConfig);
			});
		}

		/**
		 * Method to return array containing popover element and its id of closest element passed.
		 * @function getPopoverId
		 * @memberof sunCore.util.popover
		 * @param {Object} element - DOM element
		 * @returns {Array} - an array containing popover element and its id
		 * @private
		 */
		function getPopoverId(element) {
			let popoverElem = $(element).closest(CONSTANTS.SELECTOR.popoverCls);
			let id = popoverElem.attr("id");
			return [popoverElem, id];
		}

		/**
		 * Popover close button click handler to hide/close popover
		 * @function closePopoverHandler
		 * @memberof sunCore.util.popover
		 * @private
		 */
		function closePopoverHandler() {
			let [popoverElem, id] = getPopoverId($(this));
			popoverElem.remove();
			$(CONSTANTS.SELECTOR.popover).removeAttr("aria-describedby");
			$("[aria-describedby=" + id + "]")
				.click()
				.focus();
		}

		/**
		 * Popover close button key handler to hide/close popover
		 * @function closePopoverA11yHandler
		 * @memberof sunCore.util.popover
		 * @param {Object} event - keyboard key down event object
		 * @private
		 */
		function closePopoverA11yHandler(event) {
			let [popoverElem, id] = getPopoverId($(this));
			if (event.key === util.constants.key.ESC) {
				event.preventDefault();
				popoverElem.remove();
				$(CONSTANTS.SELECTOR.popover).removeAttr("aria-describedby");
				$("[aria-describedby=" + id + "]")
					.click()
					.focus();
			} else if (event.key === util.constants.key.TAB && event.shiftKey) {
				event.preventDefault();
				$("[aria-describedby=" + id + "]").focus();
				popoverElem.remove();
				$(CONSTANTS.SELECTOR.popover).removeAttr("aria-describedby");
			} else if (event.key === util.constants.key.TAB) {
				let selectableElements = [].slice.call(
					document.querySelectorAll(CONSTANTS.SELECTOR.tabSelectors)
				);
				selectableElements.find((value, index) => {
					if (
						value.getAttribute(
							CONSTANTS.ATTRIBUTE.ariaDescribedby
						) === id
					) {
						event.preventDefault();
						selectableElements[index + 1].focus();
					}
				});
				popoverElem.remove();
				$(CONSTANTS.SELECTOR.popover).removeAttr("aria-describedby");
			}
		}

		/**
		 * Popover info button key handler to show popover
		 * @function infoPopoverA11yHandler
		 * @memberof sunCore.util.popover
		 * @param {Object} event - keyboard key down event object
		 * @private
		 */
		function infoPopoverA11yHandler(event) {
			let popOverId = $(this).attr(CONSTANTS.ATTRIBUTE.ariaDescribedby);
			if (event.key === util.constants.key.ESC) {
				event.preventDefault();
				$(this).click().focus();
			} else if (
				event.key === util.constants.key.TAB &&
				popOverId !== undefined &&
				!event.shiftKey
			) {
				event.preventDefault();
				let popoverCloseButton = `#${popOverId} .btn-close-popover`;
				$(popoverCloseButton).focus();
			}
		}

		/**
		 * Handler to bind event specific for popover
		 * @function bindEvent
		 * @memberof sunCore.util.popover
		 * @private
		 */
		function bindEvent() {
			$(document).on(
				util.customEvents.INTERACTION,
				CONSTANTS.SELECTOR.popoverCloseBtn,
				closePopoverHandler
			);

			//handle keyboard accessibility in the popover close button
			$(document).on(
				util.customEvents.KEYDOWN,
				CONSTANTS.SELECTOR.popoverCloseBtn,
				closePopoverA11yHandler
			);

			//handle keyboard accessibility in the popover info button
			$(document).on(
				util.customEvents.KEYDOWN,
				CONSTANTS.SELECTOR.popoverButton,
				infoPopoverA11yHandler
			);
		}

		/**
		 * Handler to cache dom selector on module load
		 * @function cacheSelectors
		 * @memberof sunCore.util.popover
		 * @private
		 */
		function cacheSelectors() {
			$popoverTriggerList = [].slice.call(
				document.querySelectorAll(CONSTANTS.SELECTOR.popover)
			);
		}

		/**
		 * Method used to initilize the popover module
		 * @function init
		 * @memberof sunCore.util.popover
		 * @public
		 */
		function init() {
			cacheSelectors();
			bindEvent();
			initializeAllPopover();
		}

		init();
	})(core.$, core.util);

	return core.util;
})(sunCore);
