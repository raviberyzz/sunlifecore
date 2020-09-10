(function ($, $document) {
    "use strict"
    var contentPath = window.location.pathname.replace(/\.html.*/gi, '') + '/jcr:content.config.service';
    $(document).ready(function () {
        var displayMessage = function(msg) {
            $('#form coral-alert').remove();
            var alert = new Coral.Alert().set({
                variant: "success",
                content: {
                    innerHTML: msg
                }
            });
            $('#form > section').prepend(alert);
        };
        $('#clear-cache').click(function(){
            $.post(contentPath, {paths: $('#paths').val(), domain: $('#domain').val()}, function(data){
				displayMessage('Cache cleared');
            });
        });
    });
})($, $(document));