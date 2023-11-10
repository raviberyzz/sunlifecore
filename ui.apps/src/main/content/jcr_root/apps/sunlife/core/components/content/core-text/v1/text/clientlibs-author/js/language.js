(function ($) {
    "use strict";
   var GROUP = "sun",
        FEATURE = "language",
        TCP_DIALOG = "sunLanguageDialog";
    if (_.isUndefined(CUI.rte.Templates)) {
        CUI.rte.Templates = {};
    }
    if (_.isUndefined(CUI.rte.templates)) {
        CUI.rte.templates = {};
    }
    //var toolbar = CUI.rte.ui.cui.DEFAULT_UI_SETTINGS.inline.toolbar;
    //toolbar.splice(3, 0, GROUP + "#" + FEATURE);
    
    var toolbar = CUI.rte.ui.cui.DEFAULT_UI_SETTINGS.fullscreen.toolbar;
    toolbar.splice(3, 0, GROUP + "#" + FEATURE);
    
    CUI.rte.templates['dlg-' + TCP_DIALOG] = CUI.rte.Templates['dlg-' + TCP_DIALOG] = function(data){
       
        return `
         <div class=" rte-dialog-columnContainer">
            <div class=" rte-dialog-column">
				<label class="coral-Form-fieldlabel" id="label-aligned-textfield-0">Language :</label>
				<input class="coral-Form-field coral3-Textfield" is="coral-textfield" placeholder="Enter language code" name="langcode" value="" required="" labelledby="label-aligned-textfield-0" aria-labelledby="label-aligned-textfield-0" aria-invalid="false">
			</div>
            <div class=" rte-dialog-column">
                <button is="coral-button" style="margin-top:20px;" class="coral3-Button coral3-Button--secondary" size="S" variant="secondary" type="button" icon="close" title="Cancel" aria-label="Cancel" data-type="execCloseIcon" tabindex="-1"><coral-icon class="coral3-Icon coral3-Icon--sizeS coral3-Icon--close" icon="close" size="S" role="img" aria-label="close"></coral-icon><coral-button-label></coral-button-label></button>
            </div>
            <div class=" rte-dialog-column">
                <button is="coral-button"  id="langsave" style="margin-top:20px;" class="coral3-Button coral3-Button--primary" size="M" variant="primary" type="button" icon="check" iconsize="S" data-type="execSaveIcon" tabindex="-1"><coral-icon class="coral3-Icon coral3-Icon--sizeS coral3-Icon--check" icon="check" size="S" role="img" aria-label="Save"></coral-icon><coral-button-label></coral-button-label></button>
            </div>
        </div>`;
    };
    var SunLanguageBaseDialog = new Class({
        extend: CUI.rte.ui.cui.AbstractDialog,
        toString: "SunLanguageBaseDialog",
        initialize: function(config) {
            this.exec = config.execute;
            this.$saveBtn = this.$dialog.find('[data-type="execSaveIcon"]');
            this.$closeBtn = this.$dialog.find('[data-type="execCloseIcon"]');
            var dialog = this.$dialog,
            ek=this.editorKernel;
            this.$saveBtn.on('click',function(){
                
                var langCode = dialog.find('[name="langcode"]').val(); 
                
                
                if((($(this).attr("id")=="langsave") && ($.trim(langCode) == ""))) {
                    return;
                }        
               
                config.parameters.saveData(langCode);
                dialog.hide();
            });
            this.$closeBtn.on('click',function() {
                dialog.find('[name="langcode"]').val(' '); 
                dialog.hide();
            });
        },
        getDataType: function () {
            return TCP_DIALOG;
        }
    });
    var TouchUILanguagePlugin = new Class({
        toString: "TouchUILanguagePlugin",
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
            this.pickerUI = tbGenerator.createElement(FEATURE, this, false, { title: "Language" });
            tbGenerator.addElement(GROUP, plg.Plugin.SORT_FORMAT, this.pickerUI, 10);
            var groupFeature = GROUP + "#" + FEATURE;
            tbGenerator.registerIcon(groupFeature, "globeGrid");
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
            var saveData = function(ln) {
                CUI.rte.Selection.selectBookmark(context, bookmark);
                ln = ln != "" ? ` lang="${ln}"` : ln;
                var selectedText = ln != "" ? window.getSelection().toString() : "";
                var iHtml = `<span ${ln}>${selectedText}</span>`;
                ek.execCmd('InsertHTML', iHtml, context);
            };
            var dialog, dm = ek.getDialogManager(),
                $container = CUI.rte.UIUtils.getUIContainer($(context.root)),
                propConfig = {
                    'parameters': {
                        'command': this.pluginId + '#' + FEATURE,
                        'saveData': saveData
                    }
                };
            if (this.languageDialog) {
                dialog = this.languageDialog;
            } else {
                dialog = new SunLanguageBaseDialog();
                dialog.attach(propConfig, $container, this.editorKernel);
                this.languageDialog = dialog;
            }
            
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
    CUI.rte.plugins.PluginRegistry.register(GROUP, TouchUILanguagePlugin);
}(jQuery, window.CUI, jQuery(document)));
