(function ($) {
    "use strict";
    
    var _ = window._,
        Class = window.Class,
        CUI = window.CUI,
        ARIA_LABEL_FIELD = "aria-label",
		DATA_TITLE_FIELD = "data-title",
		DATA_TARGET_FIELD = "data-target",
		DATA_TOGGLE_FIELD = "data-toggle",
        RTE_LINK_DIALOG = "rtelinkdialog";
    if(CUI.rte.ui.cui.CuiDialogHelper.eaemExtended){
        return;
    }

    var EAEMLinkBaseDialog = new Class({
        extend: CUI.rte.ui.cui.CQLinkBaseDialog,

        toString: "EAEMLinkBaseDialog",

        initialize: function(config) {
            this.superClass.initialize.call(this, config);

            this.$rteDialog = this.$container.find("[data-rte-dialog=link]");

            this.$rteDialog.find(".rte-dialog-columnContainer:last").before(getDataHtml());
        },

        dlgToModel: function() {
            this.superClass.dlgToModel.call(this);

            var ariaLabelField = this.getFieldByType(ARIA_LABEL_FIELD);
			var dataTitleField = this.getFieldByType(DATA_TITLE_FIELD);
			var dataTargetField = this.getFieldByType(DATA_TARGET_FIELD);
			var dataToggleField = this.getFieldByType(DATA_TOGGLE_FIELD);

            var ariaLabelVal = ariaLabelField.val();
			var dataTitleVal = dataTitleField.val();
			var dataTargetVal = dataTargetField.val();
			var dataToggleVal = dataToggleField.val();

            this.objToEdit.attributes["aria-label"] = ariaLabelVal;
			this.objToEdit.attributes["data-title"] = dataTitleVal;
			this.objToEdit.attributes["data-target"] = dataTargetVal;
			this.objToEdit.attributes["data-toggle"] = dataToggleVal;
			
        },
        
        dlgFromModel: function() {
            this.superClass.dlgFromModel.call(this);

            var ariaValue = this.objToEdit.attributes['aria-label'];
			var dataValue = this.objToEdit.attributes['data-title'];
			var dataTargetValue = this.objToEdit.attributes['data-target'];
			var dataToggleValue = this.objToEdit.attributes['data-toggle'];
			

            var ariaSelect = this.$rteDialog.find("[data-type='aria-label']")[0];
			var dataSelect = this.$rteDialog.find("[data-type='data-title']")[0];
			var dataTargetSelect = this.$rteDialog.find("[data-type='data-target']")[0];
			var dataToggleSelect = this.$rteDialog.find("[data-type='data-toggle']")[0];
			
			ariaSelect.value=ariaValue?ariaValue:'';
			dataSelect.value=dataValue?dataValue:'';
			dataTargetSelect.value=dataTargetValue?dataTargetValue:'';
			dataToggleSelect.value=dataToggleValue?dataToggleValue:'';
			
			
        }
    });

    CUI.rte.ui.cui.CuiDialogHelper = new Class({
        extend: CUI.rte.ui.cui.CuiDialogHelper,

        toString: "EAEMCuiDialogHelper",

        instantiateDialog: function(dialogConfig) {
            var type = dialogConfig.type;

            if(type !== RTE_LINK_DIALOG){
                this.superClass.instantiateDialog.call(this, dialogConfig);
                return;
            }

            var $editable = $(this.editorKernel.getEditContext().root),
                $container = CUI.rte.UIUtils.getUIContainer($editable),
                dialog = new EAEMLinkBaseDialog();

            dialog.attach(dialogConfig, $container, this.editorKernel);

            return dialog;
        }
    });

    function getDataHtml(){
        var html =  "<div class='rte-dialog-columnContainer'>"+
            		"<div class='rte-dialog-column'>"+
                    "<label>"+ 
            		"<input is='coral-textfield' class='coral3-Textfield' data-type='aria-label' placeholder='aria label' aria-invalid='false' value=''></label> </div></div>"+
					"<div class='rte-dialog-columnContainer'>"+
            		"<div class='rte-dialog-column'>"+
                    "<label>"+ 
            		"<input is='coral-textfield' class='coral3-Textfield' data-type='data-title' placeholder='data title' data-invalid='false' value=''></label> </div></div>"+
					"<div class='rte-dialog-columnContainer'>"+
            		"<div class='rte-dialog-column'>"+
                    "<label>"+ 
            		"<input is='coral-textfield' class='coral3-Textfield' data-type='data-target' placeholder='data target' data-target-invalid='false' value=''></label> </div></div>"+
					"<div class='rte-dialog-columnContainer'>"+
            		"<div class='rte-dialog-column'>"+
                    "<label>"+ 
            		"<input is='coral-textfield' class='coral3-Textfield' data-type='data-toggle' placeholder='data toggle' data-toggle-invalid='false' value=''></label> </div></div>";



                     return html;

    }

    CUI.rte.ui.cui.CuiDialogHelper.eaemExtended = true;
})(jQuery);