(function($, $document) {
    "use strict"

 $document.on('dialog-ready', function() {
     /* Calling method to hide/show linkType and linkSize dropdown on dialog load */
		checkEditorialView();
     // Click event for Editorial Checkbox
        $('.cmp-linklist--editor coral-checkbox[name="./isEditorial"]').click(function() {
            checkEditorialView();
        });
    });
 

    function checkEditorialView() {

        if ($('.cmp-linklist--editor input[name="./isEditorial"]').is(':checked')) {
             $('.cmp-linklist--editor input[name="./title"]').val('');
             $('.cmp-linklist--editor input[name="./title"]').parent().hide();
             $('.cmp-linklist--editor coral-select[name*="./linkSize"]').each(function() {
                $(this).val('');
                $(this).parent().hide();
            });
            $('.cmp-linklist--editor coral-select[name*="./linkType"]').each(function() {
                $(this).val('');
                $(this).parent().hide();
            });
            $('.cmp-linklist--editor input[name="./label"]').parent().show();
            $('.cmp-linklist--editor input[name="./dropdownBtnLabel"]').parent().show();

        } else {
             $('.cmp-linklist--editor input[name="./title"]').parent().show();
            $('.cmp-linklist--editor coral-select[name*="./linkSize"]').each(function() {
                $(this).parent().show();
            });
            $('.cmp-linklist--editor coral-select[name*="./linkType"]').each(function() {
                $(this).parent().show();
            });
            $('.cmp-linklist--editor input[name="./label"]').val('');
            $('.cmp-linklist--editor input[name="./dropdownBtnLabel"]').val('');
            $('.cmp-linklist--editor input[name="./label"]').parent().hide();
            $('.cmp-linklist--editor input[name="./dropdownBtnLabel"]').parent().hide();
        }
    }

})($, $(document));