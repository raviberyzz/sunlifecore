/**
 * linkList.js
 * Link-list related functionality.
 */
(function (core) {
	"use strict";

	/**
	 * Link-List component
	 * @namespace linkList
	 * @memberof sunCore.comp
	 */
	core.comp.linkList = (function ($, util) {
		const CONSTANT = {
			SELECTOR: {
				slLinkList: ".sl-link-list",
				slDropdown: ".sl-dropdown",
				dropdown: ".dropdown",
				dropdownOption: ".dropdown-option",
				dropdownMenu: ".dropdown-menu",
				optionSelected: ".option-selected",
				dropdownInputSelected: ".dropdown-input-selected",
				dropdownInputLabel:".dropdown-input-label",
				dropdownMenuLink: ".dropdown-menu-link",
				slDropdownBtn: ".sl-dropdown-btn",
				slLinkedListDropdownMenu: ".sl-link-list .dropdown-menu li"
			},
			CLASS: {
				optionSelected :"option-selected",
				raised: "raised"
			},
			ATTR: {
				href: "href",
				target : "target"
			},
			PATHNAME: window.location.pathname
		};

		let $slDropdown;
		let $linkedListItems;

		

		/**
		 * Handles dropdown interactions.
		 * @function linkListInteractionHandler
		 * @memberof sunCore.comp.linkList
		 * @private
		 * @param {Event} e - The event object.
		 */
		function linkListInteractionHandler(e) {
			if (util.matchmedia.MD.matches) {
				let currentElement = e.currentTarget;
				selectOption(currentElement);
				return;
			} else {
				e.preventDefault();
				dropDownOptionHandler(e);
			}
		}

		/**
		 * Handles dropdown option clicks.
		 * @function dropDownOptionHandler
		 * @memberof sunCore.comp.linkList
		 * @private
		 * @param {Event} e - The event object.
		 */
		function dropDownOptionHandler(e) {
			let currentElement = e.currentTarget;
			let currentDropdown = $(currentElement).closest(CONSTANT.SELECTOR.dropdown);
			let linkText = getInnerText(currentElement, CONSTANT.SELECTOR.dropdownMenuLink);
			raiseLabel(currentDropdown);
			appendSelectedText(currentDropdown, linkText);
			selectOption(currentElement);
			updateSelectBtnLinkURL(currentElement);
		}

		/**
		 * Updates the select button's link URL.
		 * @function updateSelectBtnLinkURL
		 * @memberof sunCore.comp.linkList
		 * @private
		 * @param {HTMLElement} elem - The HTML element.
		 */
		function updateSelectBtnLinkURL(elem) {
			let selectedLinkUrl = "#",
				target = "_self",
				$currentDropdownBtn = $(elem)
					.closest(CONSTANT.SELECTOR.slDropdown)
					.find(CONSTANT.SELECTOR.slDropdownBtn);
			if ($(elem).length && $(elem).find(CONSTANT.SELECTOR.dropdownMenuLink).length) {
				let $clickedLink = $(elem).find(CONSTANT.SELECTOR.dropdownMenuLink);
				selectedLinkUrl = $clickedLink.attr(CONSTANT.ATTR.href);
				target = $clickedLink.attr(CONSTANT.ATTR.target)
					? $clickedLink.attr(CONSTANT.ATTR.target)
					: "_self";
			}
			$currentDropdownBtn.attr(CONSTANT.ATTR.href, selectedLinkUrl);
			$currentDropdownBtn.attr(CONSTANT.ATTR.target, target);
		}

		/**
		 * Retrieves the inner text of an element based on a selector.
		 * @function getInnerText
		 * @memberof sunCore.comp.linkList
		 * @private
		 * @param {HTMLElement} elem - The HTML element.
		 * @param {string} selector - The CSS selector.
		 * @returns {string | undefined} - The inner text of the element, or undefined if not found.
		 */
		function getInnerText(elem, selector) {
			if ($(elem).length && $(elem).find(selector).length) {
				return $(elem).find(selector)[0].innerText;
			}
		}

		/**
		 * Adds 'raised' class to the dropdown input label.
		 * @function raiseLabel
		 * @memberof sunCore.comp.linkList
		 * @private
		 * @param {HTMLElement} $dropDownElm - The dropdown element.
		 */
		function raiseLabel($dropDownElm) {
			$dropDownElm.find(CONSTANT.SELECTOR.dropdownInputLabel).addClass(CONSTANT.CLASS.raised);
		}

		/**
		 * Appends text to the dropdown input selected element.
		 * @function appendSelectedText
		 * @memberof sunCore.comp.linkList
		 * @private
		 * @param {HTMLElement} dropDown - The dropdown element.
		 * @param {string} text - The text to append.
		 */
		function appendSelectedText(dropDown, text) {
			dropDown.find(CONSTANT.SELECTOR.dropdownInputSelected).text(text);
		}

		/**
		 * Selects an option within the dropdown menu.
		 * @function selectOption
		 * @memberof sunCore.comp.linkList
		 * @private
		 * @param {HTMLElement} optionElem - The option element.
		 */
		function selectOption(optionElem) {
			$(optionElem)
				.closest(CONSTANT.SELECTOR.dropdownMenu)
				.find(CONSTANT.SELECTOR.optionSelected)
				.removeClass(CONSTANT.CLASS.optionSelected);
			$(optionElem).addClass(CONSTANT.CLASS.optionSelected);
		}

		/**
		 * Handler to bind event specific for linkList
		 * @function bindEvent
		 * @memberof sunCore.comp.linkList
		 * @private
		 */
		function bindEvent() {
			$slDropdown.on(
				util.customEvents.INTERACTION,
				CONSTANT.SELECTOR.dropdownOption,
				linkListInteractionHandler
			);
		}

		/**
		 * Handles the navigation's active state by adding css class to the corresponding navigation item based on the current URL path.
		 * @function activeSelector
		 * @memberof sunCore.comp.linkList
		 * @private
		 */
		function activeSelector() {
			const pathName = CONSTANT.PATHNAME;
			let matchedPathName = pathName;

			//Check for ending pagination in URL (ex. /2/), remove pagination segment and rejoin
			if (pathName.match(/\/(\d+)\/$/)) {
				const splitPathname = pathName.split("/");
				matchedPathName = splitPathname.slice(0, splitPathname.length - 2).join("/").concat("/");
			}

			$(CONSTANT.SELECTOR.slLinkedListDropdownMenu).each(function(){
				const linkHref =  $(this).find('a').attr(CONSTANT.ATTR.href);
				(matchedPathName === linkHref) 
				? $(this).addClass(CONSTANT.CLASS.optionSelected) 
				: $(this).removeClass(CONSTANT.CLASS.optionSelected);
			});
	    }

		/**
		 * Handler to cache dom selector on module load
		 * @function cacheSelectors
		 * @memberof sunCore.comp.linkList
		 * @private
		 */
		function cacheSelectors() {
			$slDropdown = $(CONSTANT.SELECTOR.slDropdown);
			$linkedListItems = $(CONSTANT.SELECTOR.dropdownMenu);
		}

		/**
		 * Handler called at linkList initialsation
		 * @function cacheSelectors
		 * @memberof sunCore.comp.linkList
		 * @private
		 */
		function init() {
			cacheSelectors();
			bindEvent();
			activeSelector();
		}


		return {
			init: init,
		};
	})(core.$, core.util);

	/**
	 * Initialise linkList module if given selector is in DOM
	 */
	core.util.initialise(core.comp, "linkList", ".sl-link-list");
})(sunCore);
