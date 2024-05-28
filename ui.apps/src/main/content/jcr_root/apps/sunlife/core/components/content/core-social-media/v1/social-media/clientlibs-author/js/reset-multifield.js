(function(document, $) {
    "use strict";
    $(document).on("foundation-contentloaded", function(e) {
        initializeSocialShare(e);
    });

    $(document).on("change", ".cq-dialog-dropdown-showhide", function(e) {
        showHideHandler($(this));
    });

  function showHideHandler(el) {
    	var selectedValue = el.val();
        var targetvalue = (selectedValue == 'sociallinks') ? 'shareoptions' : selectedValue == 'shareoptions' ? 'sociallinks' : '';    
        if(selectedValue) {
        	var targetElement = el.closest('div[class^="coral-Form-fieldwrapper"]').siblings('[data-showhidetargetvalue="'+targetvalue+'"]');
        	var $targetElement = $(targetElement);
        	$targetElement.find(".coral3-Multifield-item").each(function() {
            	$(this).remove();
        	});
    	}
	}

    function initializeSocialShare(e) {
        const currentComponentPath =  Granite.author.DialogFrame.currentDialog.editable.path;
        const parentPath = currentComponentPath.substr(0, currentComponentPath.lastIndexOf("/"));
        const articleType = CQ.shared.HTTP.get(parentPath + '/sling%3AresourceType').responseText;
        const componentType = articleType.substr(articleType.lastIndexOf("/"));
        
        if(componentType == '/article') {
            $('.social-share-dialog').find('coral-tab-label:contains("Spacing")').parent().attr("hidden", true);
            $('coral-select[name="./type"]').find('coral-select-item[value="shareoptions"]').attr("selected", true);
            $('.social-share-dialog').find('label:contains("Select Type")').parent().attr("hidden", true);
        } 
        showHideHandler($('coral-select[name="./type"]'));
        
    }

})(document, Granite.$);