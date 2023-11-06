(function($, $document) {
    "use strict"

 $document.on('dialog-ready', function() {

       checkEditorialView();

        $('.cmp-linklist--editor coral-checkbox[name="./isEditorial"]').click(function() {
            checkEditorialView();
        });

        $('.cmp-linklist--editor button[coral-multifield-add]').click(function() {
            setTimeout(function() {
				checkEditorialView();
            }, 500);
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
        } else {
             $('.cmp-linklist--editor input[name="./title"]').parent().show();
            $('.cmp-linklist--editor coral-select[name*="./linkSize"]').each(function() {
                $(this).parent().show();
            });
            $('.cmp-linklist--editor coral-select[name*="./linkType"]').each(function() {
                $(this).parent().show();
            });
        }
    }

})($, $(document));