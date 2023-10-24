(function ($) {
    "use strict";
   var GROUP = "info",
        FEATURE = "popover",
        TCP_DIALOG = "infoPopoverDialog";

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
        return '<div class=" rte-dialog-columnContainer">'
                +'<div class=" rte-dialog-columnContainer">'   
            	+'<div class=" rte-dialog-column">'
                +'<label class="coral-Form-fieldlabel" id="label-aligned-textfield-0">Heading : </label>'
                +'<input class="coral-Form-field" is="coral-textfield" placeholder="Enter Heading" name="infoHead" value=""  required labelledby="label-aligned-textfield-0" aria-labelledby="label-aligned-textfield-0">'
           		+'</div>'
                +'<div class=" rte-dialog-column">'
                +'<label class="coral-Form-fieldlabel" id="label-aligned-textfield-0">Detail : </label>'
                +'<input class="coral-Form-field" is="coral-textfield" placeholder="Enter Detail" name="infoDetail" value=""  required labelledby="label-aligned-textfield-0" aria-labelledby="label-aligned-textfield-0">'
                +'</div>'
                +'<div class=" rte-dialog-column">'
                +'<button is="coral-button"style="margin-top:20px;" class="coral3-Button coral3-Button--secondary" size="S" variant="secondary" type="button" icon="close" title="Cancel" aria-label="Cancel" data-type="execCloseInfo" tabindex="-1"><coral-icon class="coral3-Icon coral3-Icon--sizeS coral3-Icon--close" icon="close" size="S" role="img" aria-label="close"></coral-icon><coral-button-label></coral-button-label></button>'
                +'</div>'
                +'<div class=" rte-dialog-column">'
                +'<button is="coral-button"  id="fwbtnsave"  style="margin-top:20px;" class="coral3-Button coral3-Button--primary" size="M" variant="primary" type="button" icon="check" iconsize="S" data-type="execSaveInfo" tabindex="-1"><coral-icon class="coral3-Icon coral3-Icon--sizeS coral3-Icon--check" icon="check" size="S" role="img" aria-label="Save"></coral-icon><coral-button-label></coral-button-label></button>'
                +'</div>'
                +'</div>'
                +'</div>'
    };

    var InfoPopoverBaseDialog = new Class({
        extend: CUI.rte.ui.cui.AbstractDialog,
        toString: "InfoPopoverBaseDialog",
        initialize: function(config) {
            this.exec = config.execute;
            this.$saveBtn = this.$dialog.find('[data-type="execSaveInfo"]');
            this.$closeBtn = this.$dialog.find('[data-type="execCloseInfo"]');
            var dialog = this.$dialog,
            ek=this.editorKernel;
            this.$saveBtn.on('click',function(){
                var infoHead = dialog.find('[name="infoHead"]').val();
                
                var infoDetail = dialog.find('[name="infoDetail"]').val(); 
                
                // if($(this).attr("id")=="langsave"){
                //     dialog.find('[name="infoHead"]').removeAttr("required");
                // }else{
                //      dialog.find('[name="langcode"]').removeAttr("required");
                // }
                // if((($(this).attr("id")=="langsave") && ($.trim(langCode) == "")) || (($(this).attr("id")=="fwbtnsave") && ($.trim(infoHead) == ""))) {
                //     return;
                // }        
                // var iconSize = dialog.find('[name="awesomeIconSize"] > coral-select-item:selected').length > 0?dialog.find('[name="awesomeIconSize"] > coral-select-item:selected').val():'';
                // var iconClass = dialog.find('[name="awesomeIconColor"] > coral-select-item:selected').length > 0?dialog.find('[name="awesomeIconColor"] > coral-select-item:selected').val():'';
                // infoHead = infoHead != "" ? ('coral3-Icon coral3-Icon--sizeS coral3-Icon--effects font-awesome-icon ' + infoHead + ' ' + iconSize + ' ' + iconClass ) : infoHead;
                //ek.relayCmd(FEATURE, data, ek.getEditContext());
                config.parameters.saveData(infoHead,infoDetail);
                dialog.hide();
            });
            this.$closeBtn.on('click',function() {
                dialog.find('[name="infoHead"]').val(' ');
                dialog.find('[name="infoDetail"]').val(' '); 
                dialog.hide();
            });
        },
        getDataType: function () {
            return TCP_DIALOG;
        }
    });
    
    var TouchUIPopoverPlugin = new Class({
        toString: "TouchUIPopoverPlugin",
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
            this.pickerUI = tbGenerator.createElement(FEATURE, this, false, { title: "Popover" });
            tbGenerator.addElement(GROUP, plg.Plugin.SORT_FORMAT, this.pickerUI, 10);
            var groupFeature = GROUP + "#" + FEATURE;
            tbGenerator.registerIcon(groupFeature, "noteAdd");
        },
        execute: function (id, value, envOptions) {
            var context = envOptions.editContext,
                selection = CUI.rte.Selection.createProcessingSelection(context),
                ek = this.editorKernel,
                startNode = selection.startNode;
            var bookmark = CUI.rte.Selection.createSelectionBookmark(context);
            if ((selection.startOffset === startNode.length) && (startNode != selection.endNode)) {
                startNode = startNode.nextSibling;
            }
            var saveData = function(cs,ln) {
                CUI.rte.Selection.selectBookmark(context, bookmark);
               // var iHtml = '<span class="'+cs+'"></span>';

            //    cs = cs != "" ? ' class="'+cs+'"' : cs;
            //    ln = ln != "" ? ' lang="'+ln+'"' : ln;
            //   var selectedText = ln != "" ? window.getSelection().toString() : "";
            //    var iHtml = '<span '+cs + ln +'>'+selectedText+'</span>';
                
               var element = `<button type="button" class="btn btn-lg btn-danger" data-bs-toggle="popover" data-bs-title="Popover title" data-bs-content="And here's some amazing content. It's very engaging. Right?">Click to toggle popover</button>` 

               ek.execCmd('InsertHTML', element, context);
            };
            var dialog, dm = ek.getDialogManager(),
                $container = CUI.rte.UIUtils.getUIContainer($(context.root)),
                propConfig = {
                    'parameters': {
                        'command': this.pluginId + '#' + FEATURE,
                        'saveData': saveData
                    }
                };
            if (this.popoverDialog) {
                dialog = this.popoverDialog;
            } else {
                dialog = new InfoPopoverBaseDialog();
                dialog.attach(propConfig, $container, this.editorKernel);
                this.popoverDialog = dialog;
            }
            dialog.$dialog.find('[name="infoHead"]').val('');
            dialog.$dialog.find('[name="infoDetail"]').val('');
            // dialog.$dialog.find('[name="awesomeIconColor"] > coral-select-item:selected').removeAttr('selected');
            // dialog.$dialog.find('[name="awesomeIconSize"] > coral-select-item:selected').removeAttr('selected');
            /*dialog.$dialog.find('[name="infoHead"]').val(cs[1]?cs[1]:'');
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

    CUI.rte.plugins.PluginRegistry.register(GROUP, TouchUIPopoverPlugin);

}(jQuery, window.CUI, jQuery(document)));
