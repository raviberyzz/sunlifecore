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
    let comboInput = combo.find(".combo-input")[0];

    if (e.keyCode == '40') { // down arrow
      if ($(combo).hasClass("open")) { // not first down press
        if (currentOptionSelected.length == 0) { // first dropdown option
          $(currentComboInput).next().children(":first").toggleClass("option-current");
          let selectedOptionID = $(currentComboInput).next().find(".option-current")[0].getAttribute("id");
          comboInput.setAttribute("aria-activedescendant", selectedOptionID);
        } else if (currentOptionSelected.next().length) { // not last option
          $(currentOptionSelected).toggleClass("option-current");
          $(currentOptionSelected).next().toggleClass("option-current");
          let selectedOptionID = $(currentOptionSelected).next()[0].getAttribute("id");
          comboInput.setAttribute("aria-activedescendant", selectedOptionID);
        }
      } else { // first down press
        $(combo).addClass("open");
        currentComboInput.setAttribute("aria-expanded", "true");
        raiseLabel(currentComboInput);
      }
    } else if (e.keyCode == '38') { // up arrow
      if ($(combo).hasClass("open")) { // not first down press
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
        $(combo).addClass("open");
        currentComboInput.setAttribute("aria-expanded", "true");
        raiseLabel(currentComboInput);
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
    let comboInput = $(dropdownCombo).find('.combo-input')[0];

    appendSelectedText(currentDropdownElement, linkText);
    selectOption(currentDropdownElement);
    comboInput.setAttribute("aria-expanded", "false");
    comboInput.removeAttribute("aria-activedescendant");
    raiseLabel(currentDropdownElement.parent().parent().find('.combo-input'));
    dropDownOnBlur(e);
  }

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
      $(dropDown).closest('.combo').find('.combo-input')[0].removeAttribute("aria-activedescendant");
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
    $(dropDown).next().find(".option-current").removeClass("option-current");
    $(dropDown)[0].removeAttribute("aria-activedescendant");
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

      // set select dropdown value to default
      let selectId = '#select-' + $(optionElem).closest(".combo-menu")[0].getAttribute("id").split("-")[1];
      const $select = document.querySelector(selectId);
      $select.value = "defaultNoneSelected";
    }
    $(optionElem).addClass('option-selected');
    $(optionElem).closest('.combo-menu').find('.option-selected')[0].setAttribute('aria-selected', 'true');
    // set select dropdown value to value of the selected option
    let selectId = '#select-' + $(optionElem).closest(".combo-menu")[0].getAttribute("id").split("-")[1];
    const $select = document.querySelector(selectId);
    $select.value = $(optionElem)[0].getAttribute("value");
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
      let comboInput = $(dropdownCombo).find('.combo-input')[0];

      appendSelectedText(currentDropdownElement, linkText);
      selectOption(currentDropdownElement);
      raiseLabel(currentDropdownElement.parent().parent().find('.combo-input'));
    }

  }

  /**
  * Parsley custom error element container.
  */
  $(function () {
    const parsleyConfig = {
      errorsContainer: function (elem) {
        return elem.$element.next('.error-text');
      }, errorsWrapper: '<div id="error-helper-text" class="sl-helper-text error-text combo-msg"><span class="fak fa-exclamation-triangle sl-icon sl-icon_size_sm sl-icon_color_error sl-icon_non-interactive"></span></div>',
      errorTemplate: '<span></span>'
    };
    $('form').parsley(parsleyConfig);
  });


  /**
  * Parsley field error logic.
  */
  window.Parsley.on('field:error', function () {
    var field = this.$element[0].id;
    // This global callback will be called for any field that fails validation.
    let comboInput = $(this.$element[0].closest(".sl-dropdown")).find(".combo-input");
    comboInput.addClass("sl-input-error");
    let errorTextId = $(this.$element[0].closest(".sl-dropdown")).find(".sl-helper-text.error-text.filled")[0].getAttribute("id");
    comboInput[0].setAttribute("aria-describedby", errorTextId);
    comboInput[0].setAttribute("aria-invalid", "true");
  });
  /**
  * Parsley field success logic.
  */
  window.Parsley.on('field:success', function () {
    var field = this.$element[0].id;
    let comboInput = $(this.$element[0].closest(".sl-dropdown")).find(".combo-input");
    comboInput.removeClass("sl-input-error");
    comboInput[0].setAttribute("aria-describedby", "");
    comboInput[0].setAttribute("aria-invalid", "false");
  });
  /**
  * Parsley form validation logic.
  */
  $('form').parsley().on('form:validate', function (formInstance) {
  }).on('form:error', function () {
    let firstErrorText = $(this.$element[0]).find(".parsley-custom-error-message").first()[0];
    firstErrorText.setAttribute("role", "alert");
    $(firstErrorText.closest(".sl-dropdown")).find(".combo-input").focus();
  });


  /**
  * Initialize the module.
  */
  function init() {
    bindEvent();
    selectDefaultOption();
  }


  init();

})()