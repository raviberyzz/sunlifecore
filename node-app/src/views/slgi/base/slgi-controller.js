"use strict";

var SLGIController = {
    //Default/ Constant
    version: "1.0",
    Author: "Sun Life Financial, Canada",
    Project: "SLGI",
    Date: "October 2019",

    //initisation
    init: function () {
        var context = this;

        //All global variables goes here
        context.config = {};

        //call all the DOM invoking functions here
        context.onDOMready();
        context.eventHandlers();
    },

    //When DOM element is ready
    onDOMready: function () { },

    //List of Event/Action handlers
    eventHandlers: function () {
        $(document).on("submit", "#form_signon", function (e) {
            e.preventDefault();
            var $form = $(this).parsley();

            //validate current form
            $form.validate();
            //if form is valid. Perform the check and submit
            if ($form.isValid()) {
                var idField, id, i, IsSaveId = false, idLen, formControl = $(this)[0];

                idField = formControl.USER;
                id = idField.value;
                //id=$('#accessIDModal').val();
                idLen = id.length;

                for (i = 0; i < idLen; i++) {
                    if (id.charAt(i) != '*') {
                        IsSaveId = false;
                        if (id.charAt(i) == '&') {
                            id = id.replace('&', ':');
                        } else if (id.charAt(i) == '!') {
                            id = id.replace('!', ';');
                        }
                    } else if (id.charAt(i) == '*') {
                        if (i == 0) IsSaveId = true;
                        id = id.replace('*', '!');
                    }
                }
                if (IsSaveId && (formControl.name == "form_signon")) {
                    document.form_signon.LOGONUSINGSAVEID.value = "TRUE";
                }
                idField.value = id;
                //$('#accessIDModal').val(id);
                formControl.submit();
            }
        });
    }
};

$(function () {
    SLGIController.init();
});