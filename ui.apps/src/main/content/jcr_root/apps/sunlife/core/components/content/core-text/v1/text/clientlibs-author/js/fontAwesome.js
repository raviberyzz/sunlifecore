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
   // var toolbar = CUI.rte.ui.cui.DEFAULT_UI_SETTINGS.inline.toolbar;
  //  toolbar.splice(3, 0, GROUP + "#" + FEATURE);

    var toolbar = CUI.rte.ui.cui.DEFAULT_UI_SETTINGS.fullscreen.toolbar;
    toolbar.splice(3, 0, GROUP + "#" + FEATURE);
    
    CUI.rte.templates['dlg-' + TCP_DIALOG] = CUI.rte.Templates['dlg-' + TCP_DIALOG] = function(data){
        // var i,fontSizes='';
        // for(i=14;i<=36;i=i+2) {
        //     if(i!=22 && i!=26 && i!=30 && i!=34) {
        //         fontSizes = fontSizes + '<coral-select-item value="icon-size-'+i+'">'+i+'px</coral-select-item>';
        //     }
        // }
        return `<div class="rte-dialog-columnContainer">   
            	    <div class="rte-dialog-column">
                        <label class="coral-Form-fieldlabel" id="label-aligned-textfield-0">
                        Font Awesome : </label>
                        <input class="coral-Form-field" is="coral-textfield" placeholder="Enter font awesome icon" name="awesomeIcon" value=""  required labelledby="label-aligned-textfield-0" aria-labelledby="label-aligned-textfield-0">
           		    </div>
           	        <div class=" rte-dialog-column">
                        <label id="label-vertical-0" class="coral-Form-fieldlabel">
                            Type :</label>
                        <coral-select class="coral-Form-field" placeholder="Select Type" name="awesomeIconType" labelledby="label-vertical-0">
                            <coral-select-item value="fas">
                                Solid</coral-select-item>
                            <coral-select-item value="far">
                                Regular</coral-select-item>
                            <coral-select-item value="fal">
                                Light</coral-select-item>
                            <coral-select-item value="fad">
                                Duotone</coral-select-item>                 
                            <coral-select-item value="fak">
                                Brand/Custom</coral-select-item>
                        </coral-select>
                    </div>
                    <div class=" rte-dialog-column">
                        <button is="coral-button"style="margin-top:20px;" class="coral3-Button coral3-Button--secondary" size="S" variant="secondary" type="button" icon="close" title="Cancel" aria-label="Cancel" data-type="execCloseIcon" tabindex="-1">
                            <coral-icon class="coral3-Icon coral3-Icon--sizeS coral3-Icon--close" icon="close" size="S" role="img" aria-label="close">
                            </coral-icon>
                            <coral-button-label></coral-button-label>
                        </button>
                    </div>
                    <div class=" rte-dialog-column">
                        <button is="coral-button"  id="fwbtnsave"  style="margin-top:20px;" class="coral3-Button coral3-Button--primary" size="M" variant="primary" type="button" icon="check" iconsize="S" data-type="execSaveIcon" tabindex="-1">
                            <coral-icon class="coral3-Icon coral3-Icon--sizeS coral3-Icon--check" icon="check" size="S" role="img" aria-label="Save">
                            </coral-icon>
                            <coral-button-label></coral-button-label>
                        </button>
                    </div>
                </div>`;
    };
    
    var SunlifeFontAwesomeBaseDialog = new Class({
        extend: CUI.rte.ui.cui.AbstractDialog,
        toString: "SunlifeFontAwesomeBaseDialog",
        initialize: function(config) {
            this.exec = config.execute;
            this.$saveBtn = this.$dialog.find('[data-type="execSaveIcon"]');
            this.$closeBtn = this.$dialog.find('[data-type="execCloseIcon"]');
            
            var dialog = this.$dialog,
            ek = this.editorKernel;
            
            this.$saveBtn.on('click',function() {
                var fClass = dialog.find('[name="awesomeIcon"]').val();

                // var iconSize = dialog.find('[name="awesomeIconSize"] > coral-select-item:selected').length > 0 ? dialog.find('[name="awesomeIconSize"] > coral-select-item:selected').val():'';

                var iconClass = dialog.find('[name="awesomeIconType"] > coral-select-item:selected').length > 0 ? dialog.find('[name="awesomeIconType"] > coral-select-item:selected').val():'';

                fClass = fClass != "" ? `coral3-Icon coral3-Icon--sizeS coral3-Icon--effects font-awesome-icon ${iconClass} fa-${fClass}` : fClass;

                config.parameters.saveData($.trim(fClass));
                dialog.hide();
            });
            this.$closeBtn.on('click',function() {
                dialog.find('[name="awesomeIcon"]').val(' ');
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
            var bookmark = CUI.rte.Selection.createSelectionBookmark(context);
            
            if ((selection.startOffset === startNode.length) && (startNode != selection.endNode)) {
                startNode = startNode.nextSibling;
            }
            
            var saveData = function(fa) {
                CUI.rte.Selection.selectBookmark(context, bookmark);
                var iHtml = `<span class="${fa}"></span> `;
               
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
            if (this.fontAwesomeDialog) {
                dialog = this.fontAwesomeDialog;
            } else {
                dialog = new SunlifeFontAwesomeBaseDialog();
                dialog.attach(propConfig, $container, this.editorKernel);
                this.fontAwesomeDialog = dialog;
            }

            let fontAwesomeClassIcon = '';
            let fontAwesomeClassPrefix = '';
            const fontAwesomeClassPrefixes = ['fas', 'far', 'fal', 'fad', 'fak'];

            if(selection.startNode && selection.startNode.classList !== undefined ) {
                if (selection.startNode.classList.contains('font-awesome-icon')) {
                    selection.startNode.classList.forEach( className => {
                   if(fontAwesomeClassPrefixes.includes(className)) {
                        fontAwesomeClassPrefix = className;
                    } 
                    if (className.startsWith('fa-')) {
                        fontAwesomeClassIcon = className.replace('fa-', '');
                    }
                   });
                }
            }
            if ( fontAwesomeClassIcon && fontAwesomeClassPrefix) {
                startNode.outerHTML = ''; //Remove old icon
              }

            dialog.$dialog.find('[name="awesomeIcon"]').val(fontAwesomeClassIcon);
            dialog.$dialog.find('[name="awesomeIconType"] > coral-select-item:selected').removeAttr('selected');
            dialog.$dialog.find('[name="awesomeIconType"]').val(fontAwesomeClassPrefix).change();
            
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
}(jQuery, window.CUI, jQuery(document)));