/**
* Form Dropdown Component specific JS
*/
(function (core) {
  "use strict";

  /**
   * Form dropdown component
   * @namespace formDropdown
   * @memberof sunCore.comp
   */
  core.comp.formDropdown = (function ($, util) {
    const CONSTANT = {
      SELECTOR: {
        slDropdown: "form .sl-dropdown",
        combo: ".combo",
        comboInput: ".combo-input",
        comboInputSelected: ".combo-input-selected",
        comboMenu: ".combo-menu",
        comboOption: ".combo-option",
        optionCurrent: ".option-current",
        optionSelected: ".option-selected",
        raisedLabel: ".raised",
        errorText: ".sl-helper-text.error-text"
      },
      CLASS: {
        active: "active",
        displayNone: "d-none",
        comboMenu: "combo-menu",
        comboOption: "combo-option",
        optionCurrent: "option-current",
        optionSelected: "option-selected",
        raised: "raised",
        open: "open",
        filled: "filled",        
        inputError: "sl-input-error"
      },
    };

    let $mouseDownKeyUpEvents = util.customEvents.MOUSE_DOWN + " " + util.customEvents.KEYUP;

    /**
    * Bind events on module, for keyboard accessibility. 
    * @function
    * @memberof sunCore.comp.formDropdown
    * @return void
    */
    function bindEvent() {
      let $dropdown = $(CONSTANT.SELECTOR.slDropdown);
      $dropdown.on($mouseDownKeyUpEvents, CONSTANT.SELECTOR.comboInput, dropdownComboHandler);
      $dropdown.on($mouseDownKeyUpEvents, CONSTANT.SELECTOR.comboOption, dropDownOptionHandler);
      $dropdown.on($mouseDownKeyUpEvents, CONSTANT.SELECTOR.comboMenu, dropDownMenuHandler);
      $dropdown.on(util.customEvents.BLUR, CONSTANT.SELECTOR.comboInput, dropDownOnBlur);
    }

    /**
    * Blur event on dropdown. Close the dropdown when user clicks Tab key or clicks out.
    * @function
    * @memberof sunCore.comp.formDropdown
    * @param {Event} e - The event object.
    * @return void
    */
    function dropDownOnBlur(e) {
      e.preventDefault();
      let currentComboInput = e.currentTarget;
      let $combo = $(currentComboInput).closest(CONSTANT.SELECTOR.combo);
      $combo.removeClass(CONSTANT.CLASS.open);
      switchChevron($combo, "down");
      lowerLabel(currentComboInput);
      currentComboInput.setAttribute("aria-expanded", "false");
      $combo.find("label").removeClass(CONSTANT.CLASS.active);
    }

    /**
    * Handles dropdown combo clicks. Ensures keyboard accessibility for down, up, Enter, Space keys and mousedown event.
    * @function
    * @memberof sunCore.comp.formDropdown
    * @param {Event} e - The event object.
    * @return void
    */
    function dropdownComboHandler(e) {
      $(this).focus();
      e.preventDefault();

      let currentComboInput = e.currentTarget;
      let $combo = $(currentComboInput).closest(CONSTANT.SELECTOR.combo);
      let currentOptionSelected = $(currentComboInput).next().find(CONSTANT.SELECTOR.optionCurrent);
      let comboInput = $combo.find(CONSTANT.SELECTOR.comboInput)[0];

      if (e.keyCode == "40") { // down arrow
        if ($($combo).hasClass(CONSTANT.CLASS.open)) { // not first down press
          if (currentOptionSelected.length == 0) { // first dropdown option focuses on the first option
            $(currentComboInput).next().children(":first").toggleClass(CONSTANT.CLASS.optionCurrent);
            let selectedOptionID = $(currentComboInput).next().find(CONSTANT.SELECTOR.optionCurrent)[0].getAttribute("id");
            comboInput.setAttribute("aria-activedescendant", selectedOptionID);
          } else if (currentOptionSelected.next().length) { // not last option
            $(currentOptionSelected).toggleClass(CONSTANT.CLASS.optionCurrent);
            $(currentOptionSelected).next().toggleClass(CONSTANT.CLASS.optionCurrent);
            let selectedOptionID = $(currentOptionSelected).next()[0].getAttribute("id");
            comboInput.setAttribute("aria-activedescendant", selectedOptionID);
          }
        } else { // first down press keeps focus on the dropdown
          $($combo).addClass(CONSTANT.CLASS.open);
          switchChevron($combo, "up");
          currentComboInput.setAttribute("aria-expanded", "true");
          raiseLabel(currentComboInput);
        }
      } else if (e.keyCode == "38") { // up arrow
        if ($($combo).hasClass(CONSTANT.CLASS.open)) { // not first down press
          if (currentOptionSelected.length == 0) { // first dropdown option
            $(currentComboInput).next().children(":first").toggleClass(CONSTANT.CLASS.optionCurrent);
            let selectedOptionID = $(currentComboInput).next().find(CONSTANT.SELECTOR.optionCurrent)[0].getAttribute("id");
            comboInput.setAttribute("aria-activedescendant", selectedOptionID);
          } else if (currentOptionSelected.prev().length) { // not last option
            $(currentOptionSelected).toggleClass(CONSTANT.CLASS.optionCurrent);
            $(currentOptionSelected).prev().toggleClass(CONSTANT.CLASS.optionCurrent);
            let selectedOptionID = $(currentOptionSelected).prev()[0].getAttribute("id");
            comboInput.setAttribute("aria-activedescendant", selectedOptionID);
          }
        } else { // first down press
          $($combo).addClass(CONSTANT.CLASS.open);
          switchChevron($combo, "up");
          currentComboInput.setAttribute("aria-expanded", "true");
          raiseLabel(currentComboInput);
        }
      } else if (e.keyCode == "13" || e.keyCode == "32") { // enter or space key selects an option
        let currOpt = $(currentComboInput).next().find(CONSTANT.SELECTOR.optionCurrent);
        currOpt.mousedown();
      } else if (e.type == util.customEvents.MOUSE_DOWN) {
        $($combo).toggleClass(CONSTANT.CLASS.open);
        let ariaExpanded = "";
        if ($($combo).hasClass(CONSTANT.CLASS.open)) {
          ariaExpanded = "true";
          raiseLabel(currentComboInput);
          switchChevron($combo, "up");
        } else {
          ariaExpanded = "false";
          $($combo).find("label").removeClass(CONSTANT.CLASS.active);
          lowerLabel(currentComboInput);
          switchChevron($combo, "down");
        }
        currentComboInput.setAttribute("aria-expanded", ariaExpanded);
      }
    }

    /**
    * Handles dropdown option click when an option is selected.
    * @function
    * @memberof sunCore.comp.formDropdown
    * @param {Event} e - The event object.
    * @return void
    */
    function dropDownOptionHandler(e) {
      e.preventDefault();
      let currentElement = e.currentTarget;
      let $currentDropdownElement = $(currentElement);
      let $linkText = $(currentElement).text();
      let $dropdownCombo = $($currentDropdownElement).closest(CONSTANT.SELECTOR.combo);
      let $comboInput = $($dropdownCombo).find(CONSTANT.SELECTOR.comboInput)[0];

      appendSelectedText($currentDropdownElement, $linkText);
      selectOption($currentDropdownElement);
      $comboInput.setAttribute("aria-expanded", "false");
      $comboInput.removeAttribute("aria-activedescendant");
      raiseLabel($currentDropdownElement.parent().parent().find(CONSTANT.SELECTOR.comboInput));
      dropDownOnBlur(e);
    }

    /**
    * Handles dropdown scrollbar mousedown event so that the dropdown menu does not close.
    * @function
    * @memberof sunCore.comp.formDropdown
    * @param {Event} e - The event object.
    * @return void
    */
    function dropDownMenuHandler(e) {
      e.preventDefault();
    }

    /**
    * Raises the dropdown input label.
    * @function
    * @memberof sunCore.comp.formDropdown
    * @param {HTMLElement} dropDown - The dropdown element.
    * @return void
    */
    function raiseLabel(dropDown) {
      let $combo = $(dropDown).closest(CONSTANT.SELECTOR.combo);
      if ($combo.find(CONSTANT.SELECTOR.comboInputSelected)[0].innerText != "") {
        if (!($combo.find("label")[0].matches(CONSTANT.SELECTOR.raised))) {
          $(dropDown).find("label").addClass(CONSTANT.CLASS.raised);
          $(dropDown).find(CONSTANT.SELECTOR.comboInputSelected).removeClass(CONSTANT.CLASS.displayNone);
        }
      }
      if ($combo.hasClass(CONSTANT.CLASS.open)) {
        $(dropDown).find("label").addClass(CONSTANT.CLASS.active);
      } else {
        $(dropDown).find("label").removeClass(CONSTANT.CLASS.active);
        $combo.find(CONSTANT.SELECTOR.comboInput)[0].removeAttribute("aria-activedescendant");
      }
    }

    /**
    * Lowers the dropdown input label. Hides the select text.
    * @function
    * @memberof sunCore.comp.formDropdown
    * @param {HTMLElement} dropDown - The dropdown element.
    * @return void
    */
    function lowerLabel(dropDown) {
      let $optionSelected = $(dropDown).next().find(CONSTANT.SELECTOR.optionSelected).length;
      if (!$optionSelected) {
        $(dropDown).find(CONSTANT.SELECTOR.comboInputSelected).addClass(CONSTANT.CLASS.displayNone);
        $(dropDown).find("label").removeClass(CONSTANT.CLASS.raised + " " + CONSTANT.CLASS.active);
      }
      $(dropDown).next().find(CONSTANT.SELECTOR.optionCurrent).removeClass(CONSTANT.CLASS.optionCurrent);
      $(dropDown)[0].removeAttribute("aria-activedescendant");
    }

    /**
    * Appends text to the dropdown input selected element.
    * @function
    * @memberof sunCore.comp.formDropdown
    * @param {HTMLElement} dropDown - The dropdown element.
    * @param {String} text - The text to append.
    * @return void
    */
    function appendSelectedText(dropDown, text) {
      $(dropDown[0]).closest(CONSTANT.SELECTOR.combo).find(CONSTANT.SELECTOR.comboInputSelected).text(text);
    }

    /**
    * Selects an option within the dropdown menu, and adds code necessary for accessibility.
    * @function
    * @memberof sunCore.comp.formDropdown
    * @param {HTMLElement} optionElem - The option element.
    * @return void
    */
    function selectOption(optionElem) {

      let $comboMenu = $(optionElem).closest(CONSTANT.SELECTOR.comboMenu);
      let listboxId = $comboMenu[0].getAttribute("id");
      let dropdownId = listboxId.substr(listboxId.indexOf("-") + 1, listboxId.length - 1);
      let $selectId = "#select-" + dropdownId;

      if ($comboMenu.find(CONSTANT.SELECTOR.optionSelected).length != 0) {
        $comboMenu.find(CONSTANT.SELECTOR.optionSelected)[0].setAttribute("aria-selected", "false");
        $comboMenu.find(CONSTANT.SELECTOR.optionSelected).removeClass(CONSTANT.CLASS.optionSelected);
        const $select = document.querySelector($selectId);
        $select.value = "defaultNoneSelected";
      }
      $(optionElem).addClass(CONSTANT.CLASS.optionSelected);
      $comboMenu.find(CONSTANT.SELECTOR.optionSelected)[0].setAttribute("aria-selected", "true");
      const $select = document.querySelector($selectId);
      $select.value = $(optionElem)[0].getAttribute("value");
      handleCustomActionGeneration($select);

      let $comboInput = $($(optionElem).closest(CONSTANT.SELECTOR.slDropdown)).find(CONSTANT.SELECTOR.comboInput);
      $comboInput.removeClass(CONSTANT.CLASS.inputError);
      $comboInput[0].setAttribute("aria-describedby", "");
      $comboInput[0].setAttribute("aria-invalid", "false");

      let $parsleyError = $($(optionElem).closest(CONSTANT.SELECTOR.slDropdown)).find(CONSTANT.SELECTOR.errorText)[0];
      if ($parsleyError != undefined) {
        $($parsleyError).removeClass(CONSTANT.CLASS.filled);
        $($parsleyError)[0].textContent = "";
      }
    }

    /**
    * If the custom form action generation is required, update the form action with the selected  value.
    * @function
    * @memberof sunCore.comp.formDropdown
    * @param {HTMLElement} select - The select element.
    * @return void
    */
    function handleCustomActionGeneration(select) {
      const isOnChangeRequired = $(select).attr("data-attribute-onchange-required");

      if (null != isOnChangeRequired && "" != isOnChangeRequired && "yes" == isOnChangeRequired) {
        const action = select.value;
        const formObj = $(select).closest("form");
        $(formObj).attr("action", action);
      }
    }

    /**
    * Select the default selected option on page load.
    * @function
    * @memberof sunCore.comp.formDropdown
    * @return void
    */
    function selectDefaultOption() {
      const dropdowns = document.getElementsByClassName(CONSTANT.CLASS.comboMenu);
      for (let index = 0; index < dropdowns.length; index++) {
        let options = dropdowns[index].getElementsByClassName(CONSTANT.CLASS.comboOption);
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
          raiseLabel($(selectedOption).parent().parent().find(CONSTANT.SELECTOR.comboInput));
        }
      }
    }

    /**
    * Check if a dropdown component exists.
    * @function
    * @memberof sunCore.comp.formDropdown
    * @returns {Boolean} `true` if a form dropdown exists.
    */
    function doesDropdownExist() {
      if ($(CONSTANT.SELECTOR.slDropdown).length <= 0) {
        return false;
      }
      return true;
    }

    /**
    * Switch the chevron direction in the dropdown.
    * @function
    * @memberof sunCore.comp.formDropdown
    * @param {HTMLElement} dropDown - The dropdown element.
    * @param {String} direction - The chevron direction up or down.
    * @return void
    */
    function switchChevron(dropDown, direction) {
      let directionOpposite = { "down": "up", "up": "down" };
      dropDown.find("#chevron-" + directionOpposite[direction]).removeClass(CONSTANT.CLASS.displayNone).addClass(CONSTANT.CLASS.displayNone);
      dropDown.find("#chevron-" + direction).removeClass(CONSTANT.CLASS.displayNone);
    }

    /**
    * Initialize the module.
    * @function
    * @memberof sunCore.comp.formDropdown
    * @return void
    * @private
    */
    function init() {
      if (doesDropdownExist()) {
        bindEvent();
        selectDefaultOption();
      }
    }

    return {
      init: init,
    };
  })(core.$, core.util);

  /**
   * Initialise form dropdown module if given selector is in DOM
   */
  core.util.initialise(core.comp, "formDropdown", "form .sl-dropdown");
})(sunCore);