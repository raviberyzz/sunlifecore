(function ($) {
    "use strict";
   var GROUP = "sunlife",
        FEATURE = "fontAwesome",
        TCP_DIALOG = "sunlifeFontAwesomeDialog";
    if (_.isUndefined(CUI.rte.Templates)) {
        CUI.rte.Templates = {};
    }
    if (_.isUndefined(CUI.rte.templates)) {
        CUI.rte.templates = {};
    }
    var toolbar = CUI.rte.ui.cui.DEFAULT_UI_SETTINGS.inline.toolbar;
    toolbar.splice(3, 0, GROUP + "#" + FEATURE);
    toolbar = CUI.rte.ui.cui.DEFAULT_UI_SETTINGS.fullscreen.toolbar;
    toolbar.splice(3, 0, GROUP + "#" + FEATURE);
    CUI.rte.templates['dlg-' + TCP_DIALOG] = CUI.rte.Templates['dlg-' + TCP_DIALOG] = function(data){
        var i,fontSizes='';
        for(i=14;i<=36;i=i+2) {
            fontSizes = fontSizes + '<coral-select-item value="icon-size-'+i+'">'+i+'px</coral-select-item>';
        }
        return '<div class=" rte-dialog-columnContainer">'
            +'<div class=" rte-dialog-column">'
                +'<label class="coral-Form-fieldlabel" id="label-aligned-textfield-0">Font Awesome : </label>'
                +'<input class="coral-Form-field" is="coral-textfield" placeholder="Enter font awesome icon" name="awesomeIcon" value="" required labelledby="label-aligned-textfield-0" aria-labelledby="label-aligned-textfield-0">'
            +'</div>'
            +'<div class=" rte-dialog-column">'
                +'<label id="label-vertical-0" class="coral-Form-fieldlabel">Color :</label>'
                +'<coral-select class="coral-Form-field" placeholder="Select Color" name="awesomeIconColor" labelledby="label-vertical-0">'
                    +'<coral-select-item value="icon-dark-white">White</coral-select-item>'
                    +'<coral-select-item value="icon-dark-grey">Dark Grey</coral-select-item>'
                    +'<coral-select-item value="icon-medium-red">Medium Red</coral-select-item>'
                    +'<coral-select-item value="icon-medium-green">Medium Green</coral-select-item>'
                +'</coral-select>'
            +'</div>'
            +'<div class=" rte-dialog-column">'
                +'<label id="label-vertical-1" class="coral-Form-fieldlabel">Size :</label>'
                +'<coral-select class="coral-Form-field" placeholder="Select Size" name="awesomeIconSize" labelledby="label-vertical-1">'
                    +fontSizes
                +'</coral-select>'
            +'</div>'
            +'<div class=" rte-dialog-column">'
                +'<button is="coral-button" style="margin-top:20px;" class="coral3-Button coral3-Button--secondary" size="S" variant="secondary" type="button" icon="close" title="Cancel" aria-label="Cancel" data-type="cancel" tabindex="-1"><coral-icon class="coral3-Icon coral3-Icon--sizeS coral3-Icon--close" icon="close" size="S" role="img" aria-label="close"></coral-icon><coral-button-label></coral-button-label></button>'
            +'</div>'
            +'<div class=" rte-dialog-column">'
                +'<button is="coral-button" style="margin-top:20px;" class="coral3-Button coral3-Button--primary" size="M" variant="primary" type="button" icon="check" iconsize="S" data-type="execSaveIcon" tabindex="-1"><coral-icon class="coral3-Icon coral3-Icon--sizeS coral3-Icon--check" icon="check" size="S" role="img" aria-label="Save"></coral-icon><coral-button-label></coral-button-label></button>'
            +'</div>'
        +'</div>'
    };
    var SunlifeFontAwesomeBaseDialog = new Class({
        extend: CUI.rte.ui.cui.AbstractDialog,
        toString: "SunlifeFontAwesomeBaseDialog",
        initialize: function(config) {
            console.log('config',config);
            this.exec = config.execute;
            this.$saveBtn = this.$dialog.find('[data-type="execSaveIcon"]');
            var dialog = this.$dialog,
            ek=this.editorKernel;
            this.$saveBtn.on('click',function(e){
                var data = {};
                var fClass = dialog.find('[name="awesomeIcon"]').val();
                if($.trim(fClass) == "") {
                    return;
                }
                data.class = 'coral3-Icon coral3-Icon--sizeS coral3-Icon--effects font-awesome-icon ' + fClass + ' ' +
                    dialog.find('[name="awesomeIconColor"]').val() + ' ' +
                    dialog.find('[name="awesomeIconSize"]').val(); 
                ek.relayCmd(FEATURE, data);
                dialog.hide();
            });
        },
        getDataType: function () {
            return TCP_DIALOG;
        }
    });
    var TouchUIFontAwesomePlugin = new Class({
        toString: "TouchUIFontAwesomePlugin",
        extend: CUI.rte.plugins.Plugin,
        pickerUI: null,
        getFeatures: function () {
            return [FEATURE];
        },
        initializeUI: function (tbGenerator) {
            var plg = CUI.rte.plugins;
            if (!this.isFeatureEnabled(FEATURE)) {
                return;
            }
            this.pickerUI = tbGenerator.createElement(FEATURE, this, false, { title: "Font Awesome" });
            tbGenerator.addElement(GROUP, plg.Plugin.SORT_FORMAT, this.pickerUI, 10);
            var groupFeature = GROUP + "#" + FEATURE;
            tbGenerator.registerIcon(groupFeature, "effects");
        },
        execute: function (id, value, envOptions) {
            var context = envOptions.editContext,
                selection = CUI.rte.Selection.createProcessingSelection(context),
                ek = this.editorKernel,
                startNode = selection.startNode;
            if ((selection.startOffset === startNode.length) && (startNode != selection.endNode)) {
                startNode = startNode.nextSibling;
            }
            var dialog, dm = ek.getDialogManager(),
                $container = CUI.rte.UIUtils.getUIContainer($(context.root)),
                propConfig = {
                    'parameters': {
                        'command': this.pluginId + '#' + FEATURE
                    }
                };
            if (this.fontAwesomeDialog) {
                dialog = this.fontAwesomeDialog;
            } else {
                dialog = new SunlifeFontAwesomeBaseDialog();
                dialog.attach(propConfig, $container, this.editorKernel);
                this.fontAwesomeDialog = dialog;
            }
            dialog.$dialog.find('[name="awesomeIcon"]').val('');
            dialog.$dialog.find('[name="awesomeIconColor"]').val('');
            dialog.$dialog.find('[name="awesomeIconSize"]').val('');
            /*dialog.$dialog.find('[name="awesomeIcon"]').val(cs[1]?cs[1]:'');
            dialog.$dialog.find('[name="awesomeIconColor"]').val('');
            dialog.$dialog.find('[name="awesomeIconSize"]').val('');
            if(cs.length > 2) {
                var vl1 = cs[2]?cs[2]:'';
                var vl2 = cs[3]?cs[3]:'';
                dialog.$dialog.find('[name="awesomeIconColor"] > coral-select-item').each(function(){
                    if($(this).attr('value') == vl1 || $(this).attr('value') == vl2) {
                        dialog.$dialog.find('[name="awesomeIconColor"]').val($(this).attr('value'));
                    }
                });
                dialog.$dialog.find('[name="awesomeIconSize"] > coral-select-item').each(function(){
                    if($(this).attr('value') == vl1 || $(this).attr('value') == vl2) {
                        dialog.$dialog.find('[name="awesomeIconSize"]').val($(this).attr('value'));
                    }
                });
            }*/
            dm.show(dialog);
        },
        //to mark the icon selected/deselected
        updateState: function (selDef) {
            var hasUC = this.editorKernel.queryState(FEATURE, selDef);
            if (this.pickerUI != null) {
                this.pickerUI.setSelected(hasUC);
            }
        }
    });
    CUI.rte.plugins.PluginRegistry.register(GROUP, TouchUIFontAwesomePlugin);
    var FontAwesomePickerCmd = new Class({
        toString: "FontAwesomePickerCmd",
        extend: CUI.rte.commands.Command,
        isCommand: function (cmdStr) {
            return (cmdStr.toLowerCase() == FEATURE.toLowerCase());
        },
        getProcessingOptions: function () {
            var cmd = CUI.rte.commands.Command;
            return cmd.PO_SELECTION | cmd.PO_BOOKMARK | cmd.PO_NODELIST;
        },
        execute: function (execDef) {
            var cs = execDef.value ? execDef.value.class : undefined,
                selection = execDef.selection,
                nodeList = execDef.nodeList;
            if (!selection || !nodeList) {
                return;
            }
            var iHtml = '<span class="'+cs+'"></span>';
            execDef.component.execCmd('inserthtml', iHtml);
        }
    });
    CUI.rte.commands.CommandRegistry.register(FEATURE, FontAwesomePickerCmd);
}(jQuery, window.CUI, jQuery(document)));