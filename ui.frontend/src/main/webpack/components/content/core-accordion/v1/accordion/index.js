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
   * Method to handle the escape key event to close the accordion on escape
   * @function accordionHeaderKeyEventHandler
   * @memberof sunCore.comp.accordion
   * @private
   * @param {object} e - event object
  */
  function accordionHeaderKeyEventHandler(e) {
    const $scope = $(this);
    if (e.keyCode === util.constants.KeyCode.ESC && $scope.siblings(CONSTANT.SELECTOR.accordionCollapse).hasClass(CONSTANT.CLASS.show)) {
      const accordionCollapse = new bootstrap.Collapse($scope.siblings(CONSTANT.SELECTOR.accordionCollapse));
      accordionCollapse.toggle();
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
      $accordionItemHeader.find(CONSTANT.SELECTOR.accordionButton).attr(CONSTANT.ATTR.ariaexpanded, "true");
      const $accordionItem = $accordionItemHeader.parents(CONSTANT.SELECTOR.accordionItem).parents(CONSTANT.SELECTOR.accordion);
      $accordionItem.find(CONSTANT.SELECTOR.accordionCollapse).removeClass(CONSTANT.CLASS.showExpanded).css(CONSTANT.ATTR.height, "")
      $accordionItem.find(CONSTANT.SELECTOR.accordionButton).addClass(CONSTANT.CLASS.collapsed);
      $accordionItem.find(CONSTANT.SELECTOR.slIcon).removeClass(CONSTANT.CLASS.show).removeClass(CONSTANT.CLASS.hide);
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
    if ($accordionItemHeader.find(CONSTANT.SELECTOR.accordionButton).attr(CONSTANT.ATTR.ariaexpanded) == "true") {
      resetAccordionForSingleSelection($accordionItemHeader);
      chevronHandler($accordionItemHeader, false);
    } else {
      toggleAccordionCollapse($accordionItemHeader);
      chevronHandler($accordionItemHeader, true);
    }
  }
  /**
   * Function used to handle the collapse accordion functionality
   * @function toggleAccordionCollapse
   * @memberof sunCore.comp.accordion
   * @private
   * @param {object} $accordionHeader - scope of accordion header element
   */
  function toggleAccordionCollapse($accordionHeader) {
    $accordionHeader.find(CONSTANT.SELECTOR.slIcon).removeClass(CONSTANT.CLASS.hide).removeClass(CONSTANT.CLASS.show);
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
