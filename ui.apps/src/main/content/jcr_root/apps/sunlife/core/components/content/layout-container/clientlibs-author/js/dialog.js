(function($,$document){
    "use strict"

    var options = [
        {'normal':'Container','site-notification':'Site Notification','modal-popup':'Modal Popup','simple-popup':'Simple Popup'},
        {'50:50':'50% : 50%','33:67':'33% : 67%','67:33':'67% : 33%', '20:80':'20% : 80%','80:20':'80% : 20%','75:25N':'Content & Right Navigation','25:75N':'Left Navigation & Content','25M:75N':'Manual Left Navigation & Content'},
        {'25:50:25N':'Left Navigation, Content & Right Navigation','33:33:33':'33% : 33% : 33%','feature-card':'Feature-Toolcard','footer':'Footer'},
        {'25:25:25:25': '25% : 25% : 25% : 25%','feature-card':'Feature-Toolcard'},
        {'20:20:20:20:20' : '20% : 20% : 20% : 20% :20%','feature-card':'Feature-Toolcard','footer':'Footer'}
    ];

    var updateTypes = function() {
		var noc = $('[name="./noc"]').val();
        var type = $('coral-select[name="./type"]').get(0).items;
        $.each(type.getAll(), function(){$(this).remove()});
        $.each(options[noc-1],function(val,key){
            type.add({value: val,content:{textContent: key}});
        });
		var $form = $('[name="./noc"]').parents('form');
        var resourceType = $form.find('[name="./sling:resourceType"]').val().replace('layout-','');
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