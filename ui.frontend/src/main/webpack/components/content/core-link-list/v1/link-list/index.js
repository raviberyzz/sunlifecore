
/**
* Link List Component specific JS 
*/

(function () {

  /**
  * Bind click event on dropdown.
  */
  $('.sl-dropdown').on('click', '.dropdown-option', linkListInteractionHandler);

  /**
  * Checks if the media width is above 905 pixels.
  * @returns {boolean} - True if media width is above 905 pixels, otherwise false.
  */
  function isMediaAboveSM() {
    return window.matchMedia("(min-width: 905px)").matches ? true : false;
  }

  /**
  * Handles dropdown interactions.
  * @param {Event} e - The event object.
  */
  function linkListInteractionHandler(e) {
    if (isMediaAboveSM()) {
      let currentElement = e.currentTarget;
      selectOption(currentElement);
      return
    } else {
      e.preventDefault();
      dropDownOptionHandler(e)
    }
  }

  /**
  * Handles dropdown option clicks.
  * @param {Event} e - The event object.
  */
  function dropDownOptionHandler(e) {
    let currentElement = e.currentTarget;
    let currentDropdown = $(currentElement).closest('.dropdown');
    let linkText = getInnerText(currentElement, '.dropdown-menu-link');
    raiseLabel(currentDropdown);
    appendSelectedText(currentDropdown, linkText);
    selectOption(currentElement);
    updateSelectBtnLinkURL(currentElement);
  }

  /**
  * Updates the select button's link URL.
  * @param {HTMLElement} elem - The HTML element.
  */
  function updateSelectBtnLinkURL(elem) {
    let selectedLinkUrl = '#',
      target = '_self',
      $currentDropdownBtn = $(elem).closest('.sl-dropdown').find('.sl-dropdown-btn');
    if ($(elem).length && $(elem).find('.dropdown-menu-link').length) {
      let $clickedLink = $(elem).find('.dropdown-menu-link');
      selectedLinkUrl = $clickedLink.attr('href');
      target = $clickedLink.attr('target') ? $clickedLink.attr('target') : '_self';
    }
    $currentDropdownBtn.attr('href', selectedLinkUrl);
    $currentDropdownBtn.attr('target', target);
  }

  /**
  * Retrieves the inner text of an element based on a selector.
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
  * @param {HTMLElement} dropDown - The dropdown element.
  */
  function raiseLabel(dropDown) {
    dropDown.find('.dropdown-input-label').addClass('raised');
  }

  /**
  * Appends text to the dropdown input selected element.
  * @param {HTMLElement} dropDown - The dropdown element.
  * @param {string} text - The text to append.
  */
  function appendSelectedText(dropDown, text) {
    dropDown.find('.dropdown-input-selected').text(text);
  }

  /**
  * Selects an option within the dropdown menu.
  * @param {HTMLElement} optionElem - The option element.
  */
  function selectOption(optionElem) {
    $(optionElem).closest('.dropdown-menu').find('.option-selected').removeClass('option-selected');
    $(optionElem).addClass('option-selected');
  }

})()
