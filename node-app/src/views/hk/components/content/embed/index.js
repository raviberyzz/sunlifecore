$(document).ready(function () {
    if($(".embed")){
        if($(".embed").parent().find('.text .cmp-text p')){
			var videoHeading=$(".embed").parent().find('.text .cmp-text p')[0];
            $(videoHeading).addClass('left-float');
        }
    }
});