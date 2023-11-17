(function($,$document){
    "use strict"
	var dialogContentSelector = ".cmp-image__editor";
    var $imagetypeContainerGroup;	
	var isAvatar;	
    $(document).on("dialog-loaded", function(e) {
       var $dialog        = e.dialog;
        var $dialogContent = $dialog.find(dialogContentSelector);
        var dialogContent  = $dialogContent.length > 0 ? $dialogContent[0] : undefined;
        if (dialogContent) {
			isAvatar = dialogContent.querySelector('coral-checkbox[name="./isAvatar"]');	
			$imagetypeContainerGroup = $dialogContent.find(".cmp-image__editor-image-type-container");
			toggleImagetypeContainerGroup(isAvatar);
		}
    });
	
	$(document).on("change", dialogContentSelector + ' coral-checkbox[name="./isAvatar"]', function(e) {
        toggleImagetypeContainerGroup(e.target);
    });
	
	function toggleImagetypeContainerGroup(checkbox) {
        if (checkbox) {
            if (checkbox.checked) {                
                $imagetypeContainerGroup.show();
            } else {
                $imagetypeContainerGroup.hide();                
            }           
        }
    }
	
})($,$(document));