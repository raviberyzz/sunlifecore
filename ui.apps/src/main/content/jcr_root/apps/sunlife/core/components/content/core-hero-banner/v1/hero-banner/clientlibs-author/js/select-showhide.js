/**
 * Extension to the standard dropdown/select component. 
 * selection made in the dropdown/select.
 *
 * How to use:
 *
 * - add the class cq-dialog-select-showhide to the dropdown/select element
 * - add the data attribute cq-dialog-select-showhide-target to the dropdown/select element, value should be the
 *   selector, usually a specific class name, to find all possible target elements that can be shown/hidden.
 * - add the target class to each target container that can be shown/hidden
 * - add the class hide to each target container to make them initially hidden
 *
 */
(function(document, $) {
    'use strict';
  
    // when dialog gets injected
    $(document).on('foundation-contentloaded', function(e) {
        // if there is already an inital value make sure the according target element becomes visible
        showHide($('.cq-dialog-select-showhide', e.target));
    });
  
    $(document).on('selected', '.cq-dialog-select-showhide', function() {
        showHide($(this));
    });
  
    $(document).on('change', '.cq-dialog-select-showhide', function() {
        showHide($(this));
    });
  
    function showHide(el) {
        el.each(function(i, element) {
            /* get the selector to find the target elements. its stored as data-.. attribute */
            var target = $(element).data('cqDialogSelectShowhideTarget');
            if ($(element).length) {
                // get the selected value
                var value = $(element)[0].value;
  
                // make sure all unselected target elements are hidden.
                $(target)
                    .not('.hide')
                    .addClass('hide');
  
                /* show the target element that contains the selected value as data-showhidetargetvalue attribute */
                if (value) $(target + '.' + value).removeClass('hide');
            } else if ($(element).is('input:checkbox')) {
                // toggle the target element that contains the selected value as data-showhidetargetvalue attribute
                if ($(element).is(':checked')) {
                    $(target).removeClass('hide');
                } else {
                    $(target).addClass('hide');
                }
            }
        });
    }
  })(document, Granite.$);