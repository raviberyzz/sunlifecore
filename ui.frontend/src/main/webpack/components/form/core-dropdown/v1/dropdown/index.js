/**
* Form Dropdown Component specific JS
*/

(function () {

  /**
  * Bind events on module, for keyboard accessibility. 
  * @function
  * @return void
  */
  function bindEvent() {
    let $dropdown = $('form .sl-dropdown');
    $dropdown.on('mousedown keyup', '.combo-input', dropdownComboHandler);
    $dropdown.on('mousedown keyup', '.combo-option', dropDownOptionHandler);
    $dropdown.on('mousedown keyup', '.combo-menu', dropDownMenuHandler);
    $dropdown.on('blur', '.combo-input', dropDownOnBlur);
  }

  /**
  * Blur event on dropdown. Close the dropdown when user clicks Tab key or clicks out.
  * @function
  * @param {Event} e - The event object.
  * @return void
  */
  function dropDownOnBlur(e) {
    e.preventDefault();
    let currentComboInput = e.currentTarget; // .combo-input
    $combo = $(currentComboInput).closest('.combo');
    $combo.removeClass("open");
    switchChevron($combo, "down")
    lowerLabel(currentComboInput);
    currentComboInput.setAttribute("aria-expanded", "false");
    $combo.find('label').removeClass("active");
  }

  /**
  * Handles dropdown combo clicks. Ensures keyboard accessibility for down, up, Enter, Space keys and mousedown event.
  * @function
  * @param {Event} e - The event object.
  * @return void
  */
  function dropdownComboHandler(e) {
    $(this).focus();
    e.preventDefault();

    let currentComboInput = e.currentTarget;
    let $combo = $(currentComboInput).closest('.combo');
    let currentOptionSelected = $(currentComboInput).next().find(".option-current");
    let comboInput = $combo.find(".combo-input")[0];

    if (e.keyCode == '40') { // down arrow
      if ($($combo).hasClass("open")) { // not first down press
        if (currentOptionSelected.length == 0) { // first dropdown option focuses on the first option
          $(currentComboInput).next().children(":first").toggleClass("option-current");
          let selectedOptionID = $(currentComboInput).next().find(".option-current")[0].getAttribute("id");
          comboInput.setAttribute("aria-activedescendant", selectedOptionID);
        } else if (currentOptionSelected.next().length) { // not last option
          $(currentOptionSelected).toggleClass("option-current");
          $(currentOptionSelected).next().toggleClass("option-current");
          let selectedOptionID = $(currentOptionSelected).next()[0].getAttribute("id");
          comboInput.setAttribute("aria-activedescendant", selectedOptionID);
        }
      } else { // first down press keeps focus on the dropdown
        $($combo).addClass("open");
        switchChevron($combo, "up");
        currentComboInput.setAttribute("aria-expanded", "true");
        raiseLabel(currentComboInput);
      }
    } else if (e.keyCode == '38') { // up arrow
      if ($($combo).hasClass("open")) { // not first down press
        if (currentOptionSelected.length == 0) { // first dropdown option
          $(currentComboInput).next().children(":first").toggleClass("option-current");
          let selectedOptionID = $(currentComboInput).next().find(".option-current")[0].getAttribute("id");
          comboInput.setAttribute("aria-activedescendant", selectedOptionID);
        } else if (currentOptionSelected.prev().length) { // not last option
          $(currentOptionSelected).toggleClass("option-current");
          $(currentOptionSelected).prev().toggleClass("option-current");
          let selectedOptionID = $(currentOptionSelected).prev()[0].getAttribute("id");
          comboInput.setAttribute("aria-activedescendant", selectedOptionID);
        }
      } else { // first down press
        $($combo).addClass("open");
        switchChevron($combo, "up");
        currentComboInput.setAttribute("aria-expanded", "true");
        raiseLabel(currentComboInput);
      }
    } else if (e.keyCode == '13' || e.keyCode == '32') { // enter or space key selects an option
      let currOpt = $(currentComboInput).next().find(".option-current");
      currOpt.mousedown();
    } else if (e.type == 'mousedown') {
      $($combo).toggleClass("open");
      let ariaExpanded = "";
      if ($($combo).hasClass("open")) {
        ariaExpanded = "true";
        raiseLabel(currentComboInput);
        switchChevron($combo, "up");
      } else {
        ariaExpanded = "false";
        $($combo).find('label').removeClass("active");
        lowerLabel(currentComboInput);
        switchChevron($combo, "down");
      }
      currentComboInput.setAttribute("aria-expanded", ariaExpanded);
    }
  }

  /**
  * Handles dropdown option click when an option is selected.
  * @function
  * @param {Event} e - The event object.
  * @return void
  */
  function dropDownOptionHandler(e) {
    e.preventDefault();
    let currentElement = e.currentTarget;
    let $currentDropdownElement = $(currentElement);
    let $linkText = $(currentElement).text();
    let $dropdownCombo = $($currentDropdownElement).closest('.combo');
    let $comboInput = $($dropdownCombo).find('.combo-input')[0];

    appendSelectedText($currentDropdownElement, $linkText);
    selectOption($currentDropdownElement);
    $comboInput.setAttribute("aria-expanded", "false");
    $comboInput.removeAttribute("aria-activedescendant");
    raiseLabel($currentDropdownElement.parent().parent().find('.combo-input'));
    dropDownOnBlur(e);
  }

  /**
  * Handles dropdown scrollbar mousedown event so that the dropdown menu does not close.
  * @function
  * @param {Event} e - The event object.
  * @return void
  */
  function dropDownMenuHandler(e) {
    e.preventDefault();
  }

  /**
  * Raises the dropdown input label.
  * @function
  * @param {HTMLElement} dropDown - The dropdown element.
  * @return void
  */
  function raiseLabel(dropDown) {
    let $combo = $(dropDown).closest('.combo');
    if ($combo.find('.combo-input-selected')[0].innerText != "") {
      if (!($combo.find('label')[0].matches(".raised"))) {
        $(dropDown).find('label').addClass('raised');
        $(dropDown).find('.combo-input-selected').removeClass("d-none");
      }
    }
    if ($combo.hasClass("open")) {
      $(dropDown).find('label').addClass("active");
    } else {
      $(dropDown).find('label').removeClass("active");
      $combo.find('.combo-input')[0].removeAttribute("aria-activedescendant");
    }
  }

  /**
  * Lowers the dropdown input label. Hides the select text.
  * @function
  * @param {HTMLElement} dropDown - The dropdown element.
  * @return void
  */
  function lowerLabel(dropDown) {
    let $optionSelected = $(dropDown).next().find(".option-selected").length;
    if (!$optionSelected) {
      $(dropDown).find('.combo-input-selected').addClass("d-none");
      $(dropDown).find('label').removeClass("raised active");
    }
    $(dropDown).next().find(".option-current").removeClass("option-current");
    $(dropDown)[0].removeAttribute("aria-activedescendant");
  }

  /**
  * Appends text to the dropdown input selected element.
  * @function
  * @param {HTMLElement} dropDown - The dropdown element.
  * @param {String} text - The text to append.
  * @return void
  */
  function appendSelectedText(dropDown, text) {
    $(dropDown[0]).closest('.combo').find('div.combo-input-selected').text(text);
  }

  /**
  * Selects an option within the dropdown menu, and adds code necessary for accessibility.
  * @function
  * @param {HTMLElement} optionElem - The option element.
  * @return void
  */
  function selectOption(optionElem) {

    let $comboMenu = $(optionElem).closest('.combo-menu');
    let listboxId = $comboMenu[0].getAttribute("id");
    let dropdownId = listboxId.substr(listboxId.indexOf("-") + 1, listboxId.length - 1);
    let $selectId = '#select-' + dropdownId;

    if ($comboMenu.find('.option-selected').length != 0) {
      $comboMenu.find('.option-selected')[0].setAttribute('aria-selected', 'false');
      $comboMenu.find('.option-selected').removeClass('option-selected');
      const $select = document.querySelector($selectId);
      $select.value = "defaultNoneSelected";
    }
    $(optionElem).addClass('option-selected');
    $comboMenu.find('.option-selected')[0].setAttribute('aria-selected', 'true');
    const $select = document.querySelector($selectId);
    $select.value = $(optionElem)[0].getAttribute("value");
    handleCustomActionGeneration($select);

    let $comboInput = $($(optionElem).closest(".sl-dropdown")).find(".combo-input");
    $comboInput.removeClass("sl-input-error");
    $comboInput[0].setAttribute("aria-describedby", "");
    $comboInput[0].setAttribute("aria-invalid", "false");

    let $parsleyError = $($(optionElem).closest(".sl-dropdown")).find(".sl-helper-text.error-text")[0];
    if ($parsleyError != undefined) {
      $($parsleyError).removeClass('filled');
      $($parsleyError)[0].textContent = "";
    }
  }

  /**
  * If the custom form action generation is required, update the form action with the selected  value.
  * @function
  * @param {HTMLElement} select - The select element.
  * @return void
  */
  function handleCustomActionGeneration(select) {
    const isOnChangeRequired = $(select).attr("data-attribute-onchange-required");

    if (null != isOnChangeRequired && '' != isOnChangeRequired && 'yes' == isOnChangeRequired) {
      const action = select.value;
      const formObj = $(select).closest('form');
      $(formObj).attr("action", action);
    }
  }

  /**
  * Select the default selected option on page load.
  * @function
  * @return void
  */
  function selectDefaultOption() {
    const dropdowns = document.getElementsByClassName('combo-menu');
    for (let index = 0; index < dropdowns.length; index++) {
      let options = dropdowns[index].getElementsByClassName("combo-option");
      let currentElement = null;
      let selectedOption = null;
      for (let i = 0; i < options.length; i++) {
        currentElement = options[i];
        if ((currentElement).getAttribute("aria-selected") != null) {
          selectedOption = currentElement;
        }
      }
      if (selectedOption != null) {
        let $linkText = $(selectedOption).text();
        appendSelectedText($(selectedOption), $linkText);
        selectOption($(selectedOption));
        raiseLabel($(selectedOption).parent().parent().find('.combo-input'));
      }
    }
  }

  /**
  * Check if a dropdown component exists.
  * @function
  * @returns {Boolean} `true` if a form dropdown exists.
  */
  function doesDropdownExist() {
    if ($('form .sl-dropdown').length <= 0) {
      return false;
    }
    return true;
  }

  /**
  * Switch the chevron direction in the dropdown.
  * @function
  * @param {HTMLElement} dropDown - The dropdown element.
  * @param {String} direction - The chevron direction up or down.
  * @return void
  */
  function switchChevron(dropDown, direction) {
    let directionOpposite = {"down":"up", "up":"down"};
    dropDown.find('#chevron-'+ directionOpposite[direction]).removeClass("d-none").addClass("d-none");
    dropDown.find('#chevron-'+direction).removeClass("d-none");    
  }

  /**
  * Initialize the module.
  * @function
  * @return void
  */
  function init() {
    if (doesDropdownExist()) {
      bindEvent();
      selectDefaultOption();
    }
  }

  init();

})()