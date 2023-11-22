(function($, $document){
    "use strict"
	var dialogContentSelector = ".cmp-image__editor";
	var isAvatar;

    $document.on("dialog-loaded", dialogOnloadHandler);
    $document.on("change", dialogContentSelector + ' coral-checkbox[name="./isAvatar"]', avatarCheckHandler);

    function dialogOnloadHandler(e) {
        var $dialog        = e.dialog;
        var $dialogContent = $dialog.find(dialogContentSelector);
        var dialogContent  = $dialogContent.length > 0 ? $dialogContent[0] : undefined;
        
        if (dialogContent) {
			isAvatar = dialogContent.querySelector('coral-checkbox[name="./isAvatar"]');
            toggleAvatarOptions(isAvatar.checked);
		}
    }

    function toggleAvatarOptions(isChecked) {
        console.log('isChecked', isChecked)
        var $imagetypeContainerGroup = $('.cmp-image__editor').find(".cmp-image__editor-image-type-container");
        var $mobileImage = $('.cmp-image__editor').find('[name="./fileMobile"]').parent();
        var $desktopImage = $('.cmp-image__editor').find('[name="./file"]');
        var $desktopImgLabel = $desktopImage.parent().find(".coral-Form-fieldlabel");
        $imagetypeContainerGroup.toggle(isChecked);
        $mobileImage.toggle(!isChecked);
        if(isChecked) {
            $desktopImage.removeAttr("data-cq-fileupload-required");
            $desktopImgLabel.text('Avatar Image');
        } else {
            $desktopImage.attr("data-cq-fileupload-required");
            $desktopImgLabel.text('Desktop Image*');
        }
    }
	
	function avatarCheckHandler(e) {
        var checkbox = e.target;
        toggleAvatarOptions(checkbox.checked);
    }
	
})($, $(document));