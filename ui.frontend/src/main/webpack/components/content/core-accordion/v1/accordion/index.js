/**
 * accordion.js
 * accordion related functionality.
 * This module used to handle the accordion click and key event.
 * Handler to reset accordion for single selection.
 */
(function (core) {
	"use strict";

	/**
    * Accordion component
    * @namespace accordion
    * @memberof sunCore.comp
	 */
  core.comp.accordion = (function ($, util) {
  const CONSTANT = {
    SELECTOR: {
      accordionContainer: '.sl-accordion',
      accordionHeaderElem: '.sl-accordion .accordion-header',
      upArrow: '.fa-chevron-up',
      downArrow: '.fa-chevron-down',
      accordionCollapse: '.accordion-collapse',
      accordion: '.accordion',
      accordionBody: '.accordion-body',
      accordionItem: '.accordion-item',
      accordionButton: '.accordion-button',
      slIcon: '.sl-icon'
    },
    CLASS: {
      show: 'show',
      hide: 'hide',
      expanded: 'expanded',
      collapsed: 'collapsed',
      showExpanded: 'show expanded'
    },
    ATTR: {
      ariaexpanded: 'aria-expanded',
      dataSingleExpansion: 'data-single-expansion',
      height: 'height'
    }
  };
  /**
   * Method to handle the chevron icon toggle functionality
   * @function chevronHandler
   * @memberof sunCore.comp.accordion
   * @private
   * @param {object} $elem - scope of selected element
   * @param {boolean} status - boolean status value to check if up and down is true or false
  */
  function chevronHandler($elem, status) {
    let $chevronUP = $elem.find(CONSTANT.SELECTOR.upArrow),
      $chevronDown = $elem.find(CONSTANT.SELECTOR.downArrow);
    if (status) {
      $chevronUP.removeClass(CONSTANT.CLASS.show).addClass(CONSTANT.CLASS.hide);
      $chevronDown.removeClass(CONSTANT.CLASS.hide).addClass(CONSTANT.CLASS.show);
    } else {
      $chevronUP.removeClass(CONSTANT.CLASS.hide).addClass(CONSTANT.CLASS.show);
      $chevronDown.removeClass(CONSTANT.CLASS.show).addClass(CONSTANT.CLASS.hide);
    }
  }
  /**
   * Method to close accordion item on ESC Key
   * @function accordionHeaderKeyEventHandler
   * @memberof sunCore.comp.accordion
   * @private
   * @param {object} e - event object
  */
  function accordionHeaderKeyEventHandler(e) {
    const $scope = $(this);
    const $accordionCollapse = $scope.siblings(CONSTANT.SELECTOR.accordionCollapse);
    if (e.keyCode === util.constants.KeyCode.ESC && $accordionCollapse.hasClass(CONSTANT.CLASS.show)) {
      const accordionBootstrapCollapse = new bootstrap.Collapse($accordionCollapse);
      accordionBootstrapCollapse.toggle();
      chevronHandler($scope, true);
    }    
  }
  /**
   * Function used to reset the accordion if the single Selection is true in authoring
   * @function resetAccordionForSingleSelection
   * @memberof sunCore.comp.accordion
   * @private
   * @param {object} $accordionItemHeader - scope of accordion header element
   */
  function resetAccordionForSingleSelection($accordionItemHeader) {
    const $singleExpansion = $accordionItemHeader.attr(CONSTANT.ATTR.dataSingleExpansion);
    if ($singleExpansion == "true") {
      const $accordionItem = $accordionItemHeader.closest(CONSTANT.SELECTOR.accordion);
      const $accordionItemCollapse = $accordionItem.find(CONSTANT.SELECTOR.accordionCollapse);
      const $accordionItemButton = $accordionItem.find(CONSTANT.SELECTOR.accordionButton);
      const $accordionItemSlIcon = $accordionItem.find(CONSTANT.SELECTOR.slIcon);
      $accordionItemCollapse.removeClass(CONSTANT.CLASS.showExpanded).css(CONSTANT.ATTR.height, "");
      $accordionItemButton.addClass(CONSTANT.CLASS.collapsed).attr(CONSTANT.ATTR.ariaexpanded, "false");
      $accordionItemSlIcon.removeClass(CONSTANT.CLASS.show).removeClass(CONSTANT.CLASS.hide);
      $accordionItemHeader.find(CONSTANT.SELECTOR.accordionButton).attr(CONSTANT.ATTR.ariaexpanded, "true");
      chevronHandler($accordionItem, true);
    }
  }
  /**
   * Function used to handle the click event of accordion.
   * @function accordionHeaderClickEventHandler
   * @memberof sunCore.comp.accordion
   * @private
   */
  function accordionHeaderClickEventHandler() {
    const $accordionItemHeader = $(this);
    const accordionAriaExpanded = $accordionItemHeader.find(CONSTANT.SELECTOR.accordionButton).attr(CONSTANT.ATTR.ariaexpanded);
    if ( accordionAriaExpanded == "true") {
      resetAccordionForSingleSelection($accordionItemHeader);
      chevronHandler($accordionItemHeader, false);
    } else {
      chevronHandler($accordionItemHeader, true);
    }
  }
  /**
     * Handler to bind event specific for accordion
     * @function bindEvent
     * @memberof sunCore.comp.accordion
     * @private
  */
  function bindEvent() {
    $(document).on(
      util.customEvents.KEYDOWN,
      CONSTANT.SELECTOR.accordionHeaderElem,
      accordionHeaderKeyEventHandler
    );
    $(document).on(
      util.customEvents.INTERACTION,
      CONSTANT.SELECTOR.accordionHeaderElem,
      accordionHeaderClickEventHandler
    );
  }
  /**
    * Method used to initilize the module
    * @function init
    * @memberof sunCore.comp.accordion
    * @public
  */
  function init() {
    bindEvent();
  }  
  return {
    init: init,
};
})(core.$, core.util);

/**
* Initialise accordion module if given selector is in DOM
*/
core.util.initialise(core.comp, "accordion", ".sl-accordion .accordion-header");
})(sunCore);
