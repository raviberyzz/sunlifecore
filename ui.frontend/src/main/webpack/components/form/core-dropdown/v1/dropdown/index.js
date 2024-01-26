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
    let currentComboInput = e.currentTarget; // .combo-input
    $(currentComboInput).closest('.combo').removeClass("open");
    lowerLabel(currentComboInput);
    currentComboInput.setAttribute("aria-expanded", "false");
    $(currentComboInput).closest('.combo').find('label').removeClass("active");
  }

  /**
  * Handles dropdown combo clicks.
  * @param {Event} e - The event object.
  */
  function dropdownComboHandler(e) {
    $(this).focus();
    e.preventDefault();
    let currentComboInput = e.currentTarget;
    let combo = $(currentComboInput).closest('.combo');
    let currentOptionSelected = $(currentComboInput).next().find(".option-current");

    if (e.keyCode == '40') { // down arrow

      $(combo).addClass("open");
      currentComboInput.setAttribute("aria-expanded", "true");
      raiseLabel(currentComboInput);

      if (currentOptionSelected.length) {

        if (currentOptionSelected.next().length) { // not last option
          $(currentOptionSelected).toggleClass("option-current");
          $(currentOptionSelected).next().toggleClass("option-current");
        }
      } else { // first option

        $(currentComboInput).next().children(":first").toggleClass("option-current");
      }
    } else if (e.keyCode == '38') { // up arrow

      $(combo).addClass("open");
      currentComboInput.setAttribute("aria-expanded", "true");
      raiseLabel(currentComboInput);

      if (currentOptionSelected.length) { // not first option

        if (currentOptionSelected.prev().length) {
          $(currentOptionSelected).toggleClass("option-current");
          $(currentOptionSelected).prev().toggleClass("option-current");
        }
      } else { // first option
        $(currentComboInput).next().children(":first").toggleClass("option-current");
      }
    } else if (e.keyCode == '13' || e.keyCode == '32') { // enter or space key

      let currOpt = $(currentComboInput).next().find(".option-current");
      currOpt.mousedown();
    } else if (e.type == 'mousedown') { // mousedown event
        $(combo).toggleClass("open");
        let ariaExpanded = "";
        if ($(combo).hasClass("open")) {
          ariaExpanded = "true";
          raiseLabel(currentComboInput);
        } else {
          ariaExpanded = "false";
          $(combo).find('label').removeClass("active");
          lowerLabel(currentComboInput);
        }
        currentComboInput.setAttribute("aria-expanded", ariaExpanded);      
    }
  }

  /**
  * Handles dropdown option clicks.
  * @param {Event} e - The event object.
  */
  function dropDownOptionHandler(e) {
    e.preventDefault();
    let currentElement = e.currentTarget;
    let currentDropdownElement = $(currentElement);
    let linkText = $(currentElement).text();
    let dropdownCombo = $(currentDropdownElement).closest('.combo');
    let comboInput =  $(dropdownCombo).find('.combo-input')[0];

    appendSelectedText(currentDropdownElement, linkText);
    selectOption(currentDropdownElement);
    $(dropdownCombo).toggleClass("open");
    comboInput.setAttribute("aria-expanded", "false");
    raiseLabel(currentDropdownElement.parent().parent().find('.combo-input'));    
  }

  /**
  * Retrieves the inner text of an element based on a selector.
  * @param {HTMLElement} elem - The HTML element.
  * @param {string} selector - The CSS selector.
  * @returns {string | undefined} - The inner text of the element, or undefined if not found.
  */
  // function getInnerText(elem, selector) {
  //   if ($(elem).length && $(elem).find(selector).length) {
  //     return $(elem).find(selector)[0].innerText;
  //   }
  // }

  /**
  * Adds 'raised' class to the dropdown input label.
  * @param {HTMLElement} dropDown - The dropdown element.
  */
  function raiseLabel(dropDown) {
    if ($(dropDown).closest('.combo').find('.combo-input-selected')[0].innerText != "") {
      if (!($(dropDown).closest('.combo').find('label')[0].matches(".raised"))) {
        $(dropDown).find('label').addClass('raised');
        $(dropDown).find('.combo-input-selected').removeClass("d-none");
      }
    }
    if ($(dropDown).closest('.combo').hasClass("open")) {
      $(dropDown).find('label').addClass("active");
    } else {
      $(dropDown).find('label').removeClass("active");
    }
  }

  /**
  * Removes 'raised active' classes from the dropdown input label.
  * Hides the select text.
  * @param {HTMLElement} dropDown - The dropdown element.
  */
  function lowerLabel(dropDown) {
    let optionSelected = $(dropDown).next().find(".option-selected").length;
    if (!optionSelected) {
      $(dropDown).find('.combo-input-selected').addClass("d-none");
      $(dropDown).find('label').removeClass("raised active");
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
    
    if ($(optionElem).closest('.combo-menu').find('.option-selected').length != 0) {
      $(optionElem).closest('.combo-menu').find('.option-selected')[0].setAttribute('aria-selected', 'false');
      $(optionElem).closest('.combo-menu').find('.option-selected').removeClass('option-selected');
    }       
    $(optionElem).addClass('option-selected');
    $(optionElem).closest('.combo-menu').find('.option-selected')[0].setAttribute('aria-selected', 'true');  
  }

  /**
  * Initialize the module.
  */
  function init() {
    bindEvent();
    selectDefaultOption();
  }

  /**
  * Select the default selected option on page load.
  */
  function selectDefaultOption() {
    let options = document.getElementsByClassName("combo-option");
    let currentElement = null;
    let selectedOption = null;
    for (var i = 0; i < options.length; i++) {
      currentElement = options[i];
      if ((currentElement).getAttribute("aria-selected") != null) {
        selectedOption = currentElement;
      }
    }
    if (selectedOption != null) {
      let currentDropdownElement = $(currentElement);
      let linkText = $(currentElement).text();
      let dropdownCombo = $(currentDropdownElement).closest('.combo');
      let comboInput =  $(dropdownCombo).find('.combo-input')[0];
  
      appendSelectedText(currentDropdownElement, linkText);
      selectOption(currentDropdownElement);
      raiseLabel(currentDropdownElement.parent().parent().find('.combo-input')); 
    }

  }

  init();


})()