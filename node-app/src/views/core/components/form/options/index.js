$(document).ready(function () {

    $('.cmp-form-options select').each(function(){

		var selectObj = $(this); //Get select dropdown
		var isOnChangeRequired = selectObj.attr("data-attribute-onchange-required"); //on change required

        if( null != isOnChangeRequired && '' != isOnChangeRequired && 'yes' == isOnChangeRequired ) {
			//Unbind all change events
            $(selectObj).unbind("change");
    
            //Bind submit event to form
            $(selectObj).bind("change", function(e) {
                e.preventDefault();

                var action = $(selectObj[0]).val();
                var formObj = $(selectObj[0]).closest('form');
    
                $(formObj).attr("action", action);

            });
        }
		
		var dataCollectionAttr = selectObj.attr("data-collection");
        if( null != dataCollectionAttr && '' != dataCollectionAttr && 'true' == dataCollectionAttr ) {
			//Un-bind change event if isOnChangeRequired is not enabled
            if( !(null != isOnChangeRequired && '' != isOnChangeRequired && 'yes' == isOnChangeRequired) ) {
				$(selectObj).unbind("change");
            }

            //Bind on change event to dropdown
            $(selectObj).bind("change", function(e) {
                e.preventDefault();

                var dataValue = $(selectObj[0]).val();
                $(selectObj).attr("data-value", dataValue);

            });
        }
    });
});