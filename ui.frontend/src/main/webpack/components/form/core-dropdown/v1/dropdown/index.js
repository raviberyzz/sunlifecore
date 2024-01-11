/**
* Form Dropdown Component specific JS
*/
 
(function () {
 
    /**
    * Bind event on module.
    */
   function bindEvent(){
      // Bind click event on dropdown.
      $('form .sl-dropdown').on('click keyup', '.combo-input', dropdownComboHandler);
      $('form .sl-dropdown').on('click keyup', '.combo-option', dropDownOptionHandler);
   }
   
    /**
    * Handles dropdown combo clicks.
    * @param {Event} e - The event object.
    */
    function dropdownComboHandler(e) {
        console.log(e);
        console.log(e.type);
   
        if (e.keyCode == '40') {
            //arrow down
            e.preventDefault();
            let currentComboInput = e.currentTarget;
   
            $(currentComboInput).closest('.combo').addClass("open");
            currentComboInput.setAttribute("aria-expanded", "true");
            raiseLabel(currentComboInput);
            let currentOptionSelected = $(currentComboInput).next().find(".option-current")
            console.log(currentOptionSelected);
            console.log(currentOptionSelected.next());
   
            if ( currentOptionSelected.length && currentOptionSelected.next() ) {
              console.log('next');
              $(currentOptionSelected).toggleClass("option-current");
              $(currentOptionSelected).next().toggleClass("option-current");
            } else {
                console.log('First');
               $(currentComboInput).next().children(":first").toggleClass("option-current");
            }
   
        } else if (e.type == 'click') {
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
      console.log(e);
      console.log(e.type)
   
      e.preventDefault();
      let currentElement = e.currentTarget;
      let currentDropdown = $(currentElement);
      let linkText = $(currentElement).text();
      raiseLabel(currentDropdown);
      appendSelectedText(currentDropdown, linkText);
      selectOption(currentDropdown);
      $(currentDropdown).closest('.combo').toggleClass("open");
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
        $(dropDown).find('label').addClass('raised active');
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

  /**
* Form Dropdown Component specific JS
*/
 
(function () {
 
  /**
  * Bind event on module.
  */
 function bindEvent(){
    // Bind click event on dropdown.
    $('form .sl-dropdown').on('click keyup', '.combo-input', dropdownComboHandler);
    $('form .sl-dropdown').on('click keyup', '.combo-option', dropDownOptionHandler);
 }
 
  /**
  * Handles dropdown combo clicks.
  * @param {Event} e - The event object.
  */
  function dropdownComboHandler(e) {
      console.log(e);
      console.log(e.type);
 
      if (e.keyCode == '40') {
          //arrow down
          e.preventDefault();
          let currentComboInput = e.currentTarget;
 
          $(currentComboInput).closest('.combo').addClass("open");
          currentComboInput.setAttribute("aria-expanded", "true");
          raiseLabel(currentComboInput);
          let currentOptionSelected = $(currentComboInput).next().find(".option-current");
          console.log(currentOptionSelected);
          console.log(currentOptionSelected.next());
 
          if ( currentOptionSelected.length && currentOptionSelected.next() ) {
            console.log('next');
            $(currentOptionSelected).toggleClass("option-current");
            $(currentOptionSelected).next().toggleClass("option-current");
          } else {
              console.log('First');
             $(currentComboInput).next().children(":first").toggleClass("option-current");
          }
 
      } else if (e.type == 'click') {
          
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
    console.log(e);
    console.log(e.type)
 
    e.preventDefault();
    let currentElement = e.currentTarget;
    let currentDropdown = $(currentElement);
    let linkText = $(currentElement).text();
    raiseLabel(currentDropdown);
    appendSelectedText(currentDropdown, linkText);
    selectOption(currentDropdown);
    $(currentDropdown).closest('.combo').toggleClass("open");
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
      $(dropDown).find('label').addClass('raised active');
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