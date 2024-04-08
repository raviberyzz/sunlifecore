/**
 * accordion.js
 * accordion related functionality.
 * This module used to handle the accordion click and key event.
 * Handle accordion default selection.
 * Handler to reset accordion for single selection.
 */
(function (core) {
	"use strict";

	/**
    * Accordion component
    * @namespace coreAccordion
    * @memberof sunCore.comp
	 */
  core.comp.coreAccordion = (function ($, util) {
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
      slIcon: '.sl-icon',
      accordionCollapseExpanded: '.accordion-collapse.show.expanded'
    },
    CLASS: {
      show: 'show',
      hide: 'hide',
      expanded: 'expanded',
      collapsed: 'collapsed',
      showExpanded: 'show expanded'
    },
    ATTR: {
      dataSingleExpansion: 'data-single-expansion',
      ariaExpanded: 'aria-expanded',
      ariaHidden: 'aria-hidden',
      height: 'height'
    }
  };
  /**
   * Method to handle the chevron icon toggle functionality
   * @function chevronHandler
   * @memberof sunCore.comp.coreAccordion
   * @private
   * @param {object} $elem - event object
   * @param {boolean} status - boolean status value to check if up and down triggered
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
   * @memberof sunCore.comp.coreAccordion
   * @private
   * @param {object} e - event object
  */
  function accordionHeaderKeyEventHandler(e) {
    if (e.keyCode === util.constants.KeyCode.ESC && $(this).siblings(CONSTANT.SELECTOR.accordionCollapse).hasClass(CONSTANT.CLASS.expanded)) {
      toggleAccordionCollapse($(this));
    }
  }
  /**
   * Method to update the height of accordion item to apply smooth csss animation. 
   * @function updateAccordionItemHeight
   * @memberof sunCore.comp.coreAccordion
   * @private
   * @param {object} $accordionContentElement - get accordion content element
  */
  function updateAccordionItemHeight($accordionContentElement){
    setTimeout(function(){
      $accordionContentElement.height(($accordionContentElement.find(CONSTANT.SELECTOR.accordionBody).outerHeight()) + 24 + "px");
    },10)
  }
  /**
   * Function used to reset the accordion if the single Selection is true in authoring
   * @function resetAccordionForSingleSelection
   * @memberof sunCore.comp.coreAccordion
   * @private
   * @param {object} $accordionItemHeader - get accordion header element
   */
  function resetAccordionForSingleSelection($accordionItemHeader) {
    const $singleExpansion = $accordionItemHeader.attr(CONSTANT.ATTR.dataSingleExpansion);
    if ($singleExpansion == "true") {
      const $accordionItem = $accordionItemHeader.parents(CONSTANT.SELECTOR.accordionItem).parents(CONSTANT.SELECTOR.accordion);
      $accordionItem.find(CONSTANT.SELECTOR.accordionCollapse).removeClass(CONSTANT.CLASS.showExpanded).css(CONSTANT.ATTR.height, "").attr("aria-hidden", true);
      $accordionItem.find(CONSTANT.SELECTOR.accordionButton).attr(CONSTANT.ATTR.ariaExpanded, false).addClass(CONSTANT.CLASS.collapsed);
      $accordionItem.find(CONSTANT.SELECTOR.slIcon).removeClass(CONSTANT.CLASS.show).removeClass(CONSTANT.CLASS.hide);
      chevronHandler($accordionItem, true);
    }
  }
  /**
   * Function used to handle the click event of accordion.
   * @function accordionHeaderClickEventHandler
   * @memberof sunCore.comp.coreAccordion
   * @private
   * @param {object} e - Event object
   */
  function accordionHeaderClickEventHandler(e) {
    const $accordionItemHeader = $(this);
    const $accordionContentElement = $accordionItemHeader.siblings(CONSTANT.SELECTOR.accordionCollapse)
    if ($accordionContentElement.hasClass(CONSTANT.CLASS.expanded)) {
      toggleAccordionCollapse($accordionItemHeader);
    } else {
      resetAccordionForSingleSelection($accordionItemHeader);
      $accordionItemHeader.find(CONSTANT.SELECTOR.slIcon).removeClass(CONSTANT.CLASS.hide).removeClass(CONSTANT.SELECTOR.show);
      $accordionContentElement.addClass(CONSTANT.CLASS.showExpanded).attr(CONSTANT.ATTR.ariaExpanded, false);
      $accordionItemHeader.find(CONSTANT.SELECTOR.accordionButton).attr(CONSTANT.ATTR.ariaExpanded, true).removeClass(CONSTANT.CLASS.collapsed);
      chevronHandler($accordionItemHeader, false);
      updateAccordionItemHeight($accordionContentElement);
    }
  }
  /**
   * Function used to handle the collapse accordion functionality
   * @function toggleAccordionCollapse
   * @memberof sunCore.comp.coreAccordion
   * @private
   * @param {object} $accordionHeader - get accordion header element
   */
  function toggleAccordionCollapse($accordionHeader) {
    $accordionHeader.find(CONSTANT.SELECTOR.slIcon).removeClass(CONSTANT.CLASS.hide).removeClass(CONSTANT.CLASS.show);
    $accordionHeader.find(CONSTANT.SELECTOR.accordionButton).attr(CONSTANT.ATTR.ariaExpanded, false).addClass(CONSTANT.CLASS.collapsed);
    $accordionHeader.siblings(CONSTANT.SELECTOR.accordionCollapse).removeClass(CONSTANT.CLASS.expanded).css(CONSTANT.ATTR.height, "").attr(CONSTANT.ATTR.ariaHidden, true);
    chevronHandler($accordionHeader, true);
  }
  /**
   * Functions used to select/toggle the default selected accordion items in authoring.
   * @function accordionDefaultSelection
   * @memberof sunCore.comp.coreAccordion
   * @private
   */
  function accordionDefaultSelection() {    
    let $accordionContainer = $(CONSTANT.SELECTOR.accordionContainer)
    $accordionContainer.each(function() {
      const $accordion = $(this);
      const $accordionExpandedItem = $accordion.find(CONSTANT.SELECTOR.accordionCollapseExpanded);
      $accordionExpandedItem.each((function(index) {
        updateAccordionItemHeight($accordionExpandedItem.eq(index));
      }))      
    })
  }  
  /**
		 * Handler to bind event specific for coreAccordion
		 * @function bindEvent
		 * @memberof sunCore.comp.coreAccordion
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
    * @function
    * @memberof sunCore.comp.coreAccordion
    * @public
  */
  function init() {
    accordionDefaultSelection();
    bindEvent();
  }  
  return {
    init: init,
};
})(core.$, core.util);

/**
* Initialise coreAccordion module if given selector is in DOM
*/
core.util.initialise(core.comp, "coreAccordion", ".sl-accordion .accordion-header");
})(sunCore);
