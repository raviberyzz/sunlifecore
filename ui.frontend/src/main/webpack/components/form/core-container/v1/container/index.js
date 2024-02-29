  /**
  * Handle Parsley custom error element container for dropdowns.
  */
  $(function () {
    const errorsWrapperHtml = '<div id="error-helper-text" class="sl-helper-text error-text combo-msg"><span class="icon-class far fa-exclamation-triangle sl-icon_size_sm sl-icon_color_error sl-icon_non-interactive"></span></div>';
    const errorTemplateHtml = '<span></span>';
    const parsleyConfig = {
      errorsContainer: function (elem) {
        return elem.$element.next('.error-text');
      }, errorsWrapper: errorsWrapperHtml,
      errorTemplate: errorTemplateHtml
    };
    if ($('form').length > 0) {
      $('form').parsley(parsleyConfig);
    }    
  });

  /**
  * On input error add error styles to dropdown(s).
  */
  window.Parsley.on('field:error', function () {
    let $input = $(this.$element[0].closest(".formValidate")).find(".form-field");
    $input.addClass("sl-input-error");
    this.$element.each(function(){
      $(this).closest(".formValidate").addClass("sl-input-error");
    })
    let $errorTextId = $(this.$element[0].closest(".formValidate")).find(".sl-helper-text.error-text.filled")[0].getAttribute("id");
    $input[0].setAttribute("aria-describedby", $errorTextId);
    $input[0].setAttribute("aria-invalid", "true");
    if(this.$element[0]?.type === "text" && this.$element[0]?.value !== ""){
      const patternError = $(this.$element[0]).attr("data-parsley-pattern-message");
      $(this.$element[0].closest(".formValidate")).find(".parsley-custom-error-message").html(patternError);      
    } 
  }).on('field:success', function () {
    this.$element.each(function(){
      $(this).closest(".formValidate").removeClass("sl-input-error");
    })
  });


  /**
  * Focus on the first dropdown with an error after form submission.
  */
  window.Parsley.on('form:validate', function (formInstance) {
  }).on('form:error', function () {
    let $firstErrorText = $(this.$element[0]).find(".parsley-custom-error-message").first()[0];
    $firstErrorText.setAttribute("role", "alert");
    $($firstErrorText.closest(".sl-dropdown")).find(".combo-input").focus();
  }); 

