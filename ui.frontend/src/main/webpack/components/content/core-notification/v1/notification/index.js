/**
* Site Notification Component specific JS 
*/
(function () {

  /**
  * Bind event on module
  */
  function bindEvent(){
      const buttons = [].slice.call(document.querySelectorAll('.notification .sl-notification'));
      buttons.forEach(button => {
        button.addEventListener('close.bs.alert', e => siteNotificationCloseHandler(e))
      })
  }

  /**
   * Handles site notification dropdown close event to move keyboard focus to next tabbable element.
   * @param {Event} e - The event object.
   */
  function siteNotificationCloseHandler(e) {
    let selectableElements = [].slice.call(document.querySelectorAll('select, input, textarea, button, a'));
    let nextFocusableElementIndex = 0;
    let skipMultiLineButtonIndex = $(e.target).closest('.sl-notification').find('.multiline-action-button').length ? '2' : '1';
    
    selectableElements.find((value, index) => {
        if(value.getAttribute("data-bs-dismiss") === 'alert' && value.classList.contains("btn-close")){
          nextFocusableElementIndex = index;
          return index;
        }
    });

    let nextElementIndex = parseInt(nextFocusableElementIndex) + parseInt(skipMultiLineButtonIndex);
    selectableElements[nextElementIndex].focus();
  }

   /**
    * Check if Notification Exists
   */
   function isModuleExist() {
    if($('.notification .sl-notification').length > 0) {
        return true;
    }
    return false;
  }

  /**
  * Initialize the module.
  */
  function init() {
      if(isModuleExist()) {
          bindEvent();
      }
  }

  init();
   

})()