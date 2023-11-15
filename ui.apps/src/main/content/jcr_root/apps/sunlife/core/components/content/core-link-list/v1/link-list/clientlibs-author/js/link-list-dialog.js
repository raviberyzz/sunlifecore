(function($, $document) {
    "use strict"

 $document.on('dialog-ready', function() {
     /* Calling method to hide/show linkType and linkSize dropdown on dialog load */
		checkEditorialView();
     // Click event for Editorial Checkbox
        $('.cmp-linklist--editor').on('click', '.coral3-Checkbox-input[name="./isEditorial"], button[coral-multifield-add]', checkEditorialView);
    });
 

    function checkEditorialView() {

        if ($('.cmp-linklist--editor input[name="./isEditorial"]').is(':checked')) {
             $('.cmp-linklist--editor input[name="./heading"]').parent().hide();
             $('.cmp-linklist--editor coral-select[name*="./linkSize"]').each(function() {
                $(this).parent().hide();
            });
            $('.cmp-linklist--editor coral-select[name*="./linkType"]').each(function() {
                $(this).parent().hide();
            });
            $('.cmp-linklist--editor input[name="./label"]').parent().show();
            $('.cmp-linklist--editor input[name="./dropdownBtnLabel"]').parent().show();

        } else {
             $('.cmp-linklist--editor input[name="./heading"]').parent().show();
            $('.cmp-linklist--editor coral-select[name*="./linkSize"]').each(function() {
                $(this).parent().show();
            });
            $('.cmp-linklist--editor coral-select[name*="./linkType"]').each(function() {
                $(this).parent().show();
            });
            $('.cmp-linklist--editor input[name="./label"]').parent().hide();
            $('.cmp-linklist--editor input[name="./dropdownBtnLabel"]').parent().hide();
        }
    }

})($, $(document));