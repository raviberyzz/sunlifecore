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
        dataParsleyPatternMessage: 'data-parsley-pattern-message',
        id: 'id',
        true: 'true',
        alert: 'alert'
      },
      TEMPLATE:{
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
      const errorsWrapperHtml = CONSTANT.TEMPLATE.errorMsg;
      const errorTemplateHtml = CONSTANT.TEMPLATE.span;
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
     * Handler to add input error styles to text field, options and dropdowns.
     * @function formFieldSuccess
     * @memberof sunCore.comp.formContainer
     * @private
     */
    function formFieldError() {
        let $formValidate = $(this.$element[0].closest(CONSTANT.SELECTOR.formValidate));
        let $input = $formValidate.find(CONSTANT.SELECTOR.formField);
        $input.addClass(CONSTANT.CLASS.slInputError);
        this.$element.each(function(){
          $(this).closest(CONSTANT.SELECTOR.formValidate).addClass(CONSTANT.CLASS.slInputError);
        })
        let $errorTextId = $formValidate.find(CONSTANT.SELECTOR.errorField)[0].getAttribute(CONSTANT.ATTR.id);
        $input[0].setAttribute(CONSTANT.ATTR.ariaDescribedby, $errorTextId);
        $input[0].setAttribute(CONSTANT.ATTR.ariaInvalid, CONSTANT.ATTR.true);
        if(this.$element[0]?.type === "text" && this.$element[0]?.value !== ""){
          const patternError = $(this.$element[0]).attr(CONSTANT.SELECTOR.dataParsleyPatternMessage);
          $formValidate.find(CONSTANT.SELECTOR.parsleyCustomErrorMessage).html(patternError);      
        } 
    }

    /**
     * Handler to remove input error styles to text field, options and dropdowns on form field success.
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
     * Hander to add error styles to form fields on form error event.
     * @function formError
     * @memberof sunCore.comp.formContainer
     * @private
     */
    function formError(){
      window.Parsley.on(util.customEvents.PARSLEY_FORM_ERROR, function() {
        let $firstErrorText = $(this.$element[0]).find(CONSTANT.SELECTOR.parsleyCustomErrorMessage).first()[0];
        $firstErrorText.setAttribute(CONSTANT.ATTR.role, CONSTANT.ATTR.alert);
        $($firstErrorText.closest(CONSTANT.SELECTOR.slDropdown)).find(CONSTANT.SELECTOR.comboInput).focus();
      });
    }

    /**
     * Handler to bind event specific for formContainer
     * @function bindEvent
     * @memberof sunCore.comp.formContainer
     * @private
     */
    function bindEvent() {
      window.Parsley.on(util.customEvents.PARSLEY_FIELD_ERROR, formFieldError)
      .on(util.customEvents.PARSLEY_FIELD_SUCCESS, formFieldSuccess);
      window.Parsley.on(util.customEvents.PARSLEY_FORM_VALIDATE, formError);
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
})(sunCore);
