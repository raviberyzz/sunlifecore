/**
* Form Dropdown Component specific JS
*/

(function () {

  /**
  * Bind event on module.
  */
  function bindEvent() {
    // Bind mousedown event on dropdown.
    $('form .sl-dropdown').on('mousedown keyup', '.combo-input', dropdownComboHandler);
    $('form .sl-dropdown').on('mousedown keyup', '.combo-option', dropDownOptionHandler);
    $('form .sl-dropdown').on('blur', '.combo-input', dropDownOnBlur);
  }

  /**
  * Blur event on dropdown.
  */
  function dropDownOnBlur(e) {
    e.preventDefault();
    let currentComboInput = e.currentTarget;
    $(currentComboInput).closest('.combo').removeClass("open");
    console.log('dropDownOnBlur');
  }

  /**
  * Handles dropdown combo clicks.
  * @param {Event} e - The event object.
  */
  function dropdownComboHandler(e) {
    console.log('dropdownComboHandler');
    //console.log(e);
    //console.log(e.type);

    if (e.keyCode == '40') {
      //arrow down
      e.preventDefault();
      let currentComboInput = e.currentTarget;

      $(currentComboInput).closest('.combo').addClass("open");
      currentComboInput.setAttribute("aria-expanded", "true");
      raiseLabel(currentComboInput);
      let currentOptionSelected = $(currentComboInput).next().find(".option-current")
      //console.log(currentOptionSelected);
      //console.log(currentOptionSelected.next());

      if (currentOptionSelected.length && currentOptionSelected.next()) {
        //console.log('next');
        $(currentOptionSelected).toggleClass("option-current");
        $(currentOptionSelected).next().toggleClass("option-current");
      } else {
        //console.log('First');
        $(currentComboInput).next().children(":first").toggleClass("option-current");
      }

    } else if (e.type == 'mousedown') {
      e.preventDefault();
      let currentComboInput = e.currentTarget;
      $(currentComboInput).closest('.combo').toggleClass("open");
      currentComboInput.setAttribute("aria-expanded", "true");
      raiseLabel(currentComboInput);
    }
  }

  /**
  * Handles dropdown option clicks.
  * @param {Event} e - The event object.
  */
  function dropDownOptionHandler(e) {
    console.log('dropDownOptionHandler');
    //console.log(e);
    //console.log(e.type)

    e.preventDefault();
    let currentElement = e.currentTarget;
    let currentDropdownElement = $(currentElement);
    let linkText = $(currentElement).text();
    //console.log('linkText: ' + linkText);

    appendSelectedText(currentDropdownElement, linkText);
    selectOption(currentDropdownElement);
    raiseLabel(currentDropdownElement.parent().parent().find('.combo-input'));
    $(currentDropdownElement).closest('.combo').toggleClass("open");
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
  * Adds 'raised active' classes to the dropdown input label.
  * @param {HTMLElement} dropDown - The dropdown element.
  */
  function raiseLabel(dropDown) {
    console.log('raiseLabel');
    if ($('.combo').find('.combo-input-selected')[0].innerText != "") {
      if (!(document.getElementById('default-selected-label').matches(".raised.active"))) {
        //console.log('raised');
        $(dropDown).find('label').addClass('raised active');
        $(dropDown).find('.combo-input-selected').removeClass("d-none");
      }
    }
  }

  /**
  * Appends text to the dropdown input selected element.
  * @param {HTMLElement} dropDown - The dropdown element.
  * @param {string} text - The text to append.
  */
  function appendSelectedText(dropDown, text) {
    $(dropDown[0]).closest('.combo').find('div.combo-input-selected').text(text)
  }

  /**
  * Selects an option within the dropdown menu.
  * @param {HTMLElement} optionElem - The option element.
  */
  function selectOption(optionElem) {
    $(optionElem).closest('.combo-menu').find('.option-selected').removeClass('option-selected');
    $(optionElem).addClass('option-selected');
  }

  /**
  * Initialize the module.
  */
  function init() {
    bindEvent();
  }

  init();

})()