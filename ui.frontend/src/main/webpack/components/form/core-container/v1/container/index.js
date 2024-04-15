/**
   * Handle Parsley custom error element container for dropdowns.
*/
 
(function (core) {
  "use strict";
 
  /**
   * Form Container component
   * @namespace formContainer
   * @memberof sunCore.comp
   */
    core.comp.formContainer = (function ($, util) {
    const CONSTANT = {
      SELECTOR: {
        form: 'form',
        fieldError: 'field:error',
        fieldSuccess: 'field:error',
        formError: 'form:error',
        formValidate: '.formValidate',
        parsleyCustomErrorMessage: '.parsley-custom-error-message',
        formField: '.form-field',
        errorField: '.sl-helper-text.error-text.filled',
        errorText: '.error-text',
        slDropdown: '.sl-dropdown',
        comboInput: '.combo-input'
      },
      CLASS: {
        slInputError: 'sl-input-error'
      },
      ATTR: {
        ariaDescribedby: 'aria-describedby',
        ariaInvalid: 'aria-invalid',
        role: 'role',
        dataParsleyPatternMessage: 'data-parsley-pattern-message'
      },
      ELEMENT:{
        errorMsg: '<div id="error-helper-text" class="sl-helper-text error-text combo-msg"><span class="fak fa-exclamation-triangle sl-icon_size_sm sl-icon_color_error sl-icon_non-interactive"></span></div>',
        span: '<span></span>'
      }
    };
    /**
     * Method to defined form config
     * @function formConfig
     * @memberof sunCore.comp.formContainer
     * @private
     */
    function formConfig() {
      const errorsWrapperHtml = CONSTANT.ELEMENT.errorMsg;
      const errorTemplateHtml = CONSTANT.ELEMENT.span;
      const parsleyConfig = {
        errorsContainer: function (elem) {
          return elem.$element.next(CONSTANT.SELECTOR.errorText);
        }, errorsWrapper: errorsWrapperHtml,
        errorTemplate: errorTemplateHtml
      };
      if ($(CONSTANT.SELECTOR.form).length > 0) {
        $(CONSTANT.SELECTOR.form).parsley(parsleyConfig);
      }
    }
    /**
     * Handler to add input error styles to text, options and dropdowns.
     * @function formFieldSuccess
     * @memberof sunCore.comp.formContainer
     * @private
    */
    function formFieldError() {
      let $input = $(this.$element[0].closest(CONSTANT.SELECTOR.formValidate)).find(CONSTANT.SELECTOR.formField);
      $input.addClass(CONSTANT.CLASS.slInputError);
      this.$element.each(function(){
        $(this).closest(CONSTANT.SELECTOR.formValidate).addClass(CONSTANT.CLASS.slInputError);
      })
      let $errorTextId = $(this.$element[0].closest(CONSTANT.SELECTOR.formValidate)).find(CONSTANT.SELECTOR.errorField)[0].getAttribute("id");
      $input[0].setAttribute(CONSTANT.ATTR.ariaDescribedby, $errorTextId);
      $input[0].setAttribute(CONSTANT.ATTR.ariaInvalid, "true");
      if(this.$element[0]?.type === "text" && this.$element[0]?.value !== ""){
        const patternError = $(this.$element[0]).attr(CONSTANT.ATTR.dataParsleyPatternMessage);
        $(this.$element[0].closest(CONSTANT.SELECTOR.formValidate)).find(CONSTANT.SELECTOR.parsleyCustomErrorMessage).html(patternError);      
      }    
    }
    /**
     * Handler to input success styles to text, options and dropdowns.
     * @function formFieldSuccess
     * @memberof sunCore.comp.formContainer
     * @private
    */
    function formFieldSuccess() {
      this.$element.each(function(){
        $(this).closest(CONSTANT.SELECTOR.formValidate).removeClass(CONSTANT.CLASS.slInputError);
      })
    }    
    /**
     * Handler to Focus on the first dropdown with an error after form submission.
     * @function formValidationError
     * @memberof sunCore.comp.formContainer
     * @private
    */    
    function formValidationError() {
      let $firstErrorText = $(this.$element[0]).find(CONSTANT.SELECTOR.parsleyCustomErrorMessage).first()[0];
      $firstErrorText.setAttribute(CONSTANT.ATTR.role, "alert");
      $($firstErrorText.closest(CONSTANT.SELECTOR.slDropdown)).find(CONSTANT.SELECTOR.comboInput).focus();
    }
    /**
     * Handler to bind event specific for formContainer
     * @function bindEvent
     * @memberof sunCore.comp.formContainer
     * @private
     */
    function bindEvent() {
      window.Parsley.on(CONSTANT.SELECTOR.fieldError,formFieldError);
      window.Parsley.on(CONSTANT.SELECTOR.fieldSuccess,formFieldSuccess);
      window.Parsley.on(CONSTANT.SELECTOR.formError,formValidationError);
    }
        /**
    * Method used to initilize the module
    * @function init
    * @memberof sunCore.comp.formContainer
    * @public
    */
    function init() {
      formConfig();
      bindEvent();
    }        
    return {
        init: init,
    };
})(core.$, core.util);
/**
 * Initialise formContainer module if given selector is in DOM
 */
core.util.initialise(core.comp, "formContainer", ".formValidate");
})(window, window.sunCore);
