(function($) {
    "use strict";

    var _ = window._,
        Class = window.Class,
        CUI = window.CUI,
        ARIA_LABEL_FIELD = "aria-label",
        DATA_TITLE_FIELD = "data-title",
        DATA_TARGET_FIELD = "data-bs-target",
        DATA_TOGGLE_FIELD = "data-bs-toggle",
        DATA_DEEPLINK_FIELD = "data-deeplink",
        DATA_CLASS_FIELD = "data-class",
        DATA_CLASS_ICN_FIELD = "data-class-icon",
        RTE_LINK_DIALOG = "rtelinkdialog";
    if (CUI.rte.ui.cui.CuiDialogHelper.eaemExtended) {
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
            var dataDeepLinkField = this.getFieldByType(DATA_DEEPLINK_FIELD);
            var dataClassField = this.getFieldByType(DATA_CLASS_FIELD);
            var dataClassIcnField = this.getFieldByType(DATA_CLASS_ICN_FIELD);

            var ariaLabelVal = ariaLabelField.val();
            var dataTitleVal = dataTitleField.val();
            var dataTargetVal = dataTargetField.val();
            var dataToggleVal = dataToggleField.val();
            var dataDeepLinkVal = dataDeepLinkField.val();
            var dataClassVal = dataClassField[0].selectedItem ? (dataClassField[0].selectedItem.value ? dataClassField[0].selectedItem.value : 'sl-link') : 'sl-link';
            var dataClassIcnVal = dataClassIcnField[0].selectedItem ? (dataClassIcnField[0].selectedItem.value ? dataClassIcnField[0].selectedItem.value : '') : '';

            this.objToEdit.attributes["aria-label"] = ariaLabelVal;
            this.objToEdit.attributes["data-title"] = dataTitleVal;
            this.objToEdit.attributes["data-bs-target"] = dataTargetVal;
            this.objToEdit.attributes["data-bs-toggle"] = dataToggleVal;
            this.objToEdit.attributes["data-deeplink"] = dataDeepLinkVal;
            this.objToEdit.attributes["data-class"] = dataClassVal;
            this.objToEdit.attributes["data-class-icon"] = dataClassIcnVal;
        },

        updateRTELinkValues: function(element, value) {
            //Populate Link Size and Link Icon RTE Fields if available
            if (element.items) {
                element.items.getAll().forEach(function(item, idx) {
                    if (value) {
                        if (item.value === value) {
                            item.selected = true;
                        }
                    } else {
                        item.selected = false;
                    }
                });
            }
        },

        dlgFromModel: function() {
            this.superClass.dlgFromModel.call(this);

            var ariaValue = this.objToEdit.attributes['aria-label'];
            var dataValue = this.objToEdit.attributes['data-title'];
            var dataTargetValue = this.objToEdit.attributes['data-bs-target'];
            var dataToggleValue = this.objToEdit.attributes['data-bs-toggle'];
            var dataDeepLinkValue = this.objToEdit.attributes['data-deeplink'];
            var classValue = this.objToEdit.attributes['data-class'];
            var classIcnValue = this.objToEdit.attributes['data-class-icon'];

            var ariaSelect = this.$rteDialog.find("[data-type='aria-label']")[0];
            var dataSelect = this.$rteDialog.find("[data-type='data-title']")[0];
            var dataTargetSelect = this.$rteDialog.find("[data-type='data-bs-target']")[0];
            var dataToggleSelect = this.$rteDialog.find("[data-type='data-bs-toggle']")[0];
            var dataDeepLinkSelect = this.$rteDialog.find("[data-type='data-deeplink']")[0];
            var classSelect = this.$rteDialog.find("[data-type='data-class']")[0];
            var classIcnSelect = this.$rteDialog.find("[data-type='data-class-icon']")[0];

            setTimeout(() => {
                this.updateRTELinkValues(classSelect, classValue);
                this.updateRTELinkValues(classIcnSelect, classIcnValue);
            }, 500);

            ariaSelect.value = ariaValue ? ariaValue : '';
            dataSelect.value = dataValue ? dataValue : '';
            dataTargetSelect.value = dataTargetValue ? dataTargetValue : '';
            dataToggleSelect.value = dataToggleValue ? dataToggleValue : '';
            dataDeepLinkSelect.value = dataDeepLinkValue ? dataDeepLinkValue : '';
        
            // Ensure the "Select the link type" option is selected by default if no value is set
            if (!classIcnValue) {
                $(classIcnSelect).find('coral-select-item[value=""]').prop('selected', true);
            } else {
                this.updateRTELinkValues(classIcnSelect, classIcnValue);
            }
        }
    });

    CUI.rte.ui.cui.CuiDialogHelper = new Class({
        extend: CUI.rte.ui.cui.CuiDialogHelper,

        toString: "EAEMCuiDialogHelper",

        instantiateDialog: function(dialogConfig) {
            var type = dialogConfig.type;

            if (type !== RTE_LINK_DIALOG) {
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

    function getDataHtml() {
        var html = `
            <div class='rte-dialog-columnContainer'>
                <div class='rte-dialog-column'>
                    <coral-select name="classtype" data-type='data-class' placeholder="Choose Link Size">
                        <coral-select-item value="sl-link sl-link-xs"> 
                            XS
                        </coral-select-item>
                        <coral-select-item value="sl-link sl-link-sm">
                            Small
                        </coral-select-item>
                        <coral-select-item value="sl-link sl-link-md">
                            Medium
                        </coral-select-item>
                    </coral-select>
                </div>
            </div>
            <div class='rte-dialog-columnContainer'>
                <div class='rte-dialog-column'>
                    <coral-select name="classtypeicon" data-type='data-class-icon' placeholder="Choose Link Type">
                        <coral-select-item value="">
                            Select Link Type
                        </coral-select-item>
                        <coral-select-item value="sl-link-internal">
                            Internal Link
                        </coral-select-item>
                        <coral-select-item value="sl-link-external">
                            External Link 
                        </coral-select-item>
                        <coral-select-item value="sl-link-pdf">
                            PDF Link
                        </coral-select-item>
                    </coral-select>
                </div>
            </div>
            <div class='rte-dialog-columnContainer'>
            <div class='rte-dialog-column'>
                <label> 
                    <input is='coral-textfield' class='coral3-Textfield' data-type='aria-label' placeholder='aria label' aria-invalid='false' value=''>
                </label></div></div>
            <div class='rte-dialog-columnContainer'>
                <div class='rte-dialog-column'>
                    <label> 
                        <input is='coral-textfield' class='coral3-Textfield' data-type='data-title' placeholder='data title' data-invalid='false' value=''>
                    </label> </div></div>
            <div class='rte-dialog-columnContainer'>
                <div class='rte-dialog-column'>
                    <label> 
                        <input is='coral-textfield' class='coral3-Textfield' data-type='data-bs-target' placeholder='data target (eg - #ID)' data-bs-target-invalid='false' value=''>
                    </label> </div></div>
            <div class='rte-dialog-columnContainer'>
                <div class='rte-dialog-column'>
                    <label> 
                        <input is='coral-textfield' class='coral3-Textfield' data-type='data-bs-toggle' placeholder='data toggle (eg - modal)' data-bs-toggle-invalid='false' value=''>
                    </label></div></div>
            <div class='rte-dialog-columnContainer'>
                <div class='rte-dialog-column'>
                    <label> 
                        <input is='coral-textfield' class='coral3-Textfield' data-type='data-deeplink' placeholder='deep link name' deeplink-invalid='false' value=''>
                    </label> </div></div> 
            `;

        return html;
    }

    CUI.rte.ui.cui.CuiDialogHelper.eaemExtended = true;
})(jQuery);