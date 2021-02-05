(function($,$document){
    "use strict"
    var options = [
        {'normal':'Content'},
        {'25:75N':'Left Navigation & Content', '75:25N':'Content & Right Navigation', '75:25NC':'Content, Content & Right Navigation'},
		{'25:50:25N':'Left Navigation, Content & Right Navigation'}
    ];

    var updateTypes = function() {
		var noc = $('[name="./noc"]').val();
        var type = $('coral-select[name="./type"]').get(0).items;
        $.each(type.getAll(), function(){$(this).remove()});
        $.each(options[noc-1],function(val,key){
            type.add({value: val,content:{textContent: key}});
        });
		var $form = $('[name="./noc"]').parents('form');
        var resourceType = $form.find('[name="./sling:resourceType"]').val().replace('legacy-layout-','');
		$form.find('[name^="./container"]').remove();
        for(var i=1;i<=noc;i++) {
            $form.append('<input name="./container'+i+'/sling:resourceType" value="'+resourceType+'"/>');
        }
    }
    $document.on('dialog-ready',function(){
        var type = $('[name="./typeVal"]').val();
        setTimeout(function(){
			updateTypes();
            if(type) {
				$('[name="./type"]').val(type);

            }
            $('[name="./type"]').trigger('change');
        },200);
        $('[name="./noc"]').change(updateTypes);
        $('[name="./noc"]').change(function(){
            var noc = $('[name="./noc"]').val();
            if(noc== 1){
                $('[name="./flexRequired"]').hide();
            }
            else{
			$('[name="./flexRequired"]').show();
            $('[name="./siteNotificationId"]').parent().hide();
            }
        });
        $(document).ready(function(){
		 var noc = $('[name="./noc"]').val();
            if(noc== 1){
                $('[name="./flexRequired"]').hide();

            }
            else{
			$('[name="./flexRequired"]').show();
            }
        });
        $('[name="./type"]').change(function() {
            var val = $(this).val();
            $('[name="./typeVal"]').val($(this).val());
            if(val === "modal-popup" || val === "site-notification" || val === "simple-popup") {
                $('[name="./closeText"]').parent().show();
            }else {
                $('[name="./closeText"]').parent().hide();
            }
            if(val === "modal-popup") {
				$('coral-select[name="./modelTitleLevel"]').parent().show();
                $('[name="./modalID"]').parent().show();
                $('[name="./modalTitle"]').parent().show();
                $('[name="./siteNotificationId"]').parent().hide();

            }else if(val === "simple-popup") {
                $('[name="./modalID"]').parent().show();
                $('coral-select[name="./modelTitleLevel"]').parent().hide();
                $('[name="./modalTitle"]').parent().hide();
                $('[name="./siteNotificationId"]').parent().hide();

            }else if(val === "site-notification") {
                $('[name="./siteNotificationId"]').parent().show();
                $('coral-select[name="./modelTitleLevel"]').parent().hide();
                $('[name="./modalTitle"]').parent().hide();
                $('[name="./modalID"]').parent().hide();

            }else {
                $('coral-select[name="./modelTitleLevel"]').parent().hide();
                $('[name="./modalID"]').parent().hide();
                $('[name="./modalTitle"]').parent().hide();
                $('[name="./siteNotificationId"]').parent().hide();
            }


        });
    });
})($,$(document));