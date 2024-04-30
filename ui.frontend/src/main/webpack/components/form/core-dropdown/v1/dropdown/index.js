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

    let $mouseDownKeyDownEvents = util.customEvents.MOUSE_DOWN + " " + util.customEvents.KEYDOWN;

    /**
    * Bind events on module, for keyboard accessibility. 
    * @function
    * @memberof sunCore.comp.formDropdown
    * @return void
    */
    function bindEvent() {
      let $dropdown = $(CONSTANT.SELECTOR.slDropdown);
      $dropdown.on($mouseDownKeyDownEvents, CONSTANT.SELECTOR.comboInput, dropdownComboHandler);
      $dropdown.on($mouseDownKeyDownEvents, CONSTANT.SELECTOR.comboOption, dropDownOptionHandler);
      $dropdown.on($mouseDownKeyDownEvents, CONSTANT.SELECTOR.comboMenu, dropDownMenuHandler);
      $dropdown.on(util.customEvents.BLUR, CONSTANT.SELECTOR.comboInput, dropDownOnBlur);
    }

    /**
    * Set the html attribute of an element.
    * @function
    * @param {HTMLElement} element - The dropdown element.
    * @param {String} attribute - The html attribute name.
    * @param {String} value - The attribute value.
    * @return void
    */
    function updateElementAttribute(element, attribute, value) {
      $(element).attr(attribute, value);
    }

    /**
     * @function
     * @param {HTMLElement} $combo - The dropdown element.
     * @param {*} currentComboInput - The current input the event was fired on
     * @return void
     */
    function handleDropdownVisibility($combo, currentComboInput) {
      $($combo).toggleClass(CONSTANT.CLASS.open);
      if ($($combo).hasClass(CONSTANT.CLASS.open)) {
        toggleChevron(currentComboInput, "up");
      } else {
        $($combo).find("label").removeClass(CONSTANT.CLASS.active);
        toggleChevron(currentComboInput, "down");
      }
      updateElementAttribute(currentComboInput, "aria-expanded", $($combo).hasClass(CONSTANT.CLASS.open));
    }

    /**
    * Toggle the dropdown chevron direction and raise or lower the label.
    * @function
    * @param {HTMLElement} comboInput - The dropdown element.
    * @param {String} direction - The direction where the chevron is to be pointing.
    * @return void
    */
    function toggleChevron(comboInput, direction) {
      switchChevron(comboInput, direction);
      if (direction == "up") {
        raiseLabel(comboInput);
      } else if (direction == "down") {
        lowerLabel(comboInput);
      }
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
      let currentElement = e.currentTarget;
      let $combo = $(currentElement).closest(CONSTANT.SELECTOR.combo);
      let comboInput = $combo.find(".combo-input");
      $combo.removeClass(CONSTANT.CLASS.open);
      toggleChevron(comboInput, "down");
      updateElementAttribute(comboInput, "aria-expanded", "false");
      $combo.find("label").removeClass(CONSTANT.CLASS.active);
    }

    /**
    * Handle the down or up keypress on a dropdown option.
    * @function
    * @param {HTMLElement} combo - The combobox on which the key was pressed.
    * @param {HTMLElement} currentOptionSelected - The current selected combo option.
    * @param {Integer} subsequentOption - The subsequent dropdown option to navigate.
    * @return void
    */
    function handleUpDownKeyPress($combo, currentOptionSelected, subsequentDropdownOption) {
      let currentComboInput = $combo.find(CONSTANT.SELECTOR.comboInput);

      if ($($combo).hasClass(CONSTANT.CLASS.open)) { // not first down press
        if (currentOptionSelected.length == 0) { // first dropdown option focuses on the first option
          $(currentComboInput).next().children(":first").toggleClass(CONSTANT.CLASS.optionCurrent);
          let $selectedOption = $(currentComboInput).next().find(CONSTANT.SELECTOR.optionCurrent)[0];
          $selectedOption.scrollIntoView({ block: "nearest" }); 
          let selectedOptionID = $selectedOption.getAttribute("id");
          updateElementAttribute(currentComboInput, "aria-activedescendant", selectedOptionID);
        } else if (subsequentDropdownOption.length) { // not last option
          $(currentOptionSelected).toggleClass(CONSTANT.CLASS.optionCurrent);
          subsequentDropdownOption.toggleClass(CONSTANT.CLASS.optionCurrent);
          subsequentDropdownOption[0].scrollIntoView({ block: "nearest" });       
          let selectedOptionID = subsequentDropdownOption[0].getAttribute("id");
          updateElementAttribute(currentComboInput, "aria-activedescendant", selectedOptionID);
        }
      } else { // first down press keeps focus on the dropdown
        $($combo).addClass(CONSTANT.CLASS.open);
        toggleChevron(currentComboInput, "up");
        updateElementAttribute(currentComboInput, "aria-expanded", "true");
      }
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
      if (e.keyCode != 9) {
        e.preventDefault();
      }      

      let currentComboInput = e.currentTarget;
      let $combo = $(currentComboInput).closest(CONSTANT.SELECTOR.combo);
      let $currentOptionSelected = $(currentComboInput).next().find(CONSTANT.SELECTOR.optionCurrent);

      if(e.keyCode == util.constants.KeyCode.ESC && $($combo).hasClass(CONSTANT.CLASS.open)){
        handleDropdownVisibility($combo, currentComboInput);
      }

      if (e.keyCode == util.constants.KeyCode.DOWN) {
        handleUpDownKeyPress($combo, $currentOptionSelected, $currentOptionSelected.next());
      } else if (e.keyCode == util.constants.KeyCode.UP) {
        handleUpDownKeyPress($combo, $currentOptionSelected, $currentOptionSelected.prev());
      } else if ((e.keyCode == util.constants.KeyCode.ENTER_RETURN || e.keyCode == util.constants.KeyCode.SPACE) && $($combo).hasClass(CONSTANT.CLASS.open)) {
        let $currOpt = $(currentComboInput).next().find(CONSTANT.SELECTOR.optionCurrent);
        $currOpt.mousedown();
      } else if (e.type == util.customEvents.MOUSE_DOWN || e.keyCode == util.constants.KeyCode.ENTER_RETURN || e.keyCode == util.constants.KeyCode.SPACE) {
        handleDropdownVisibility($combo, currentComboInput);
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
      updateElementAttribute($comboInput, "aria-expanded", "false");
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
    * @param {HTMLElement} comboInput - The dropdown element.
    * @return void
    */
    function raiseLabel(comboInput) {
      let $combo = $(comboInput).closest(CONSTANT.SELECTOR.combo);
      if ($combo.find(CONSTANT.SELECTOR.comboInputSelected)[0].innerText != "") {
        if (!($combo.find("label")[0].matches(CONSTANT.SELECTOR.raised))) {
          $(comboInput).find("label").addClass(CONSTANT.CLASS.raised);
          $(comboInput).find(CONSTANT.SELECTOR.comboInputSelected).removeClass(CONSTANT.CLASS.displayNone);
        }
      }
      if ($combo.hasClass(CONSTANT.CLASS.open)) {
        $(comboInput).find("label").addClass(CONSTANT.CLASS.active);
      } else {
        $(comboInput).find("label").removeClass(CONSTANT.CLASS.active);
        $combo.find(CONSTANT.SELECTOR.comboInput)[0].removeAttribute("aria-activedescendant");
      }
    }

    /**
    * Lowers the dropdown input label. Hides the select text.
    * @function
    * @memberof sunCore.comp.formDropdown
    * @param {HTMLElement} comboInput - The dropdown element.
    * @return void
    */
    function lowerLabel(comboInput) {
      let $optionSelected = $(comboInput).next().find(CONSTANT.SELECTOR.optionSelected).length;
      if (!$optionSelected) {
        $(comboInput).find(CONSTANT.SELECTOR.comboInputSelected).addClass(CONSTANT.CLASS.displayNone);
        $(comboInput).find("label").removeClass(CONSTANT.CLASS.raised + " " + CONSTANT.CLASS.active);
      }
      $(comboInput).next().find(CONSTANT.SELECTOR.optionCurrent).removeClass(CONSTANT.CLASS.optionCurrent);
      $(comboInput)[0].removeAttribute("aria-activedescendant");
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
        updateElementAttribute($comboMenu.find(CONSTANT.SELECTOR.optionSelected)[0], "aria-selected", "false");

        $comboMenu.find(CONSTANT.SELECTOR.optionSelected).removeClass(CONSTANT.CLASS.optionSelected);
        const $select = document.querySelector($selectId);
        $select.value = "defaultNoneSelected";
      }
      $(optionElem).addClass(CONSTANT.CLASS.optionSelected);
      updateElementAttribute($comboMenu.find(CONSTANT.SELECTOR.optionSelected)[0], "aria-selected", "true");
      const $select = document.querySelector($selectId);
      $select.value = $(optionElem)[0].getAttribute("value");
      handleCustomActionGeneration($select);

      let $comboInput = $($(optionElem).closest(CONSTANT.SELECTOR.slDropdown)).find(CONSTANT.SELECTOR.comboInput);
      $comboInput.removeClass(CONSTANT.CLASS.inputError);
      updateElementAttribute($comboInput[0], "aria-describedby", "");
      updateElementAttribute($comboInput[0], "aria-invalid", "false");

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
      const dropdowns = $(CONSTANT.SELECTOR.comboMenu);
      dropdowns.each(function (index, dropdown) {
        let selectedOption = $(dropdown).find(".combo-option[aria-selected]")[0];
        if (selectedOption != null) {
          let $linkText = $(selectedOption).text();
          appendSelectedText($(selectedOption), $linkText);
          selectOption($(selectedOption));
          raiseLabel($(selectedOption).parent().parent().find(CONSTANT.SELECTOR.comboInput));
        }
      });
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
      $(dropDown).find("#chevron-" + directionOpposite[direction]).removeClass(CONSTANT.CLASS.displayNone).addClass(CONSTANT.CLASS.displayNone);
      $(dropDown).find("#chevron-" + direction).removeClass(CONSTANT.CLASS.displayNone);
    }

    /**
    * Initialize the module.
    * @function
    * @memberof sunCore.comp.formDropdown
    * @return void
    * @private
    */
    function init() {
      bindEvent();
      selectDefaultOption();
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