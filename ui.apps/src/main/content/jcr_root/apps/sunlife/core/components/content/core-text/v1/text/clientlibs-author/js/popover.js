(function ($) {
    //"use strict";

   var GROUP = "info",
        FEATURE = "popover",
        TCP_DIALOG = "infoPopoverDialog";

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

    CUI.rte.templates['dlg-' + TCP_DIALOG] = CUI.rte.Templates['dlg-' + TCP_DIALOG] = function(data) {
        return '<div class=" rte-dialog-columnContainer">'
                +'<div class=" rte-dialog-columnContainer">'   
            	+'<div class=" rte-dialog-column">'
                +'<label class="coral-Form-fieldlabel" id="label-aligned-textfield-0">Header Text : </label>'
                +'<input class="coral-Form-field" is="coral-textfield" placeholder="Enter heading text" name="infoHead" value="" labelledby="label-aligned-textfield-0" aria-labelledby="label-aligned-textfield-0">'
           		+'</div>'
                +'<div class=" rte-dialog-column">'
                +'<label class="coral-Form-fieldlabel" id="label-aligned-textfield-0">Popover Content : </label>'
                +'<input class="coral-Form-field" is="coral-textfield" placeholder="Enter popover content text" name="infoDetail" value="" labelledby="label-aligned-textfield-0" aria-labelledby="label-aligned-textfield-0">'
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
            this.config = config;
            this.context = this.editorKernel.getEditContext();
   
            this.exec = config.execute;
            this.$saveBtn = this.$dialog.find('[data-type="execSaveInfo"]');
            this.$closeBtn = this.$dialog.find('[data-type="execCloseInfo"]');
            var dialog = this.$dialog;

            this.$saveBtn.on('click',function(e){
                var infoHead = dialog.find('[name="infoHead"]').val();
                var infoDetail = dialog.find('[name="infoDetail"]').val(); 
                config.parameters.saveData(infoHead, infoDetail);
                dialog.hide();
                e.preventDefault();
            });

            this.$closeBtn.on('click',function() {
                dialog.find('[name="infoHead"]').val('');
                dialog.find('[name="infoDetail"]').val(''); 
                dialog.hide();
                e.preventDefault();
            });
            
        },

        initializeEdit: function (editorKernel, objToEdit, applyFn) {
            console.log('InfoPopoverBaseDialog initializeEdit is called');
            this.objToEdit = objToEdit;
            this.applyFn = applyFn;
            this.fromModel();
        },

        _executeOnItems: function(fn) {
            var items = this.config.dialogItems;
            if (items && items.length) {
              for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.item.id) {
                  var $field = $('#' + item.item.id);
                  fn(item, $field.get(0));
                }
              }
            }
          },
      
          dlgFromModel: function() {
            var self = this;
            this._executeOnItems(function(item, field) {
              if (item.fromModel) {
                item.fromModel(self.objToEdit, field);
              }
            });
          },
      
          validate: function() {
            var isValid = true;
            this._executeOnItems(function(item, field) {
              if (item.validate) {
                if (!item.validate(field)) {
                  isValid = false;
                }
              }
            });
            return isValid;
          },
      
          dlgToModel: function() {
            var self = this;
            this._executeOnItems(function(item, field) {
              if (item.toModel) {
                item.toModel(self.objToEdit, field);
              }
            });
          },

          onShow: function() {
            console.log('InfoPopoverBaseDialog onShow is called');
          },

         onHide: function() {
            console.log('InfoPopoverBaseDialog onHide is called');
         },

        getDataType: function () {
            return TCP_DIALOG;
        }
    });
    
    var TouchUIPopoverPlugin = new Class({
        toString: "TouchUIPopoverPlugin",
        extend: CUI.rte.plugins.Plugin,
        pickerUI: null,
        isSelection: false,
        isEdit: false,
        getFeatures: function () {
            return [FEATURE];
        },
        initializeUI: function (tbGenerator, options) {
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
            this.editorKernel.relayCmd(id);
           
            var context = envOptions.editContext,
                selection = CUI.rte.Selection.createProcessingSelection(context),
                ek = this.editorKernel,
                startNode = selection.startNode;

            var selectedDom = CUI.rte.Selection.getSelectedDom(context, selection);


            var bookmark = CUI.rte.Selection.createSelectionBookmark(context);
            
            var saveData = function(title,content) {
                let poHeading = title || '', poContent = content || '';
                CUI.rte.Selection.selectBookmark(context, bookmark);
                CUI.rte.Selection.restoreNativeSelection(context, this.savedRange);

                var htmlToInsert = `&nbsp;<button type="button" class="coral3-Icon coral3-Icon--sizeS coral3-Icon--info popover-button" data-bs-toggle="popover" data-bs-title="${poHeading}" data-bs-content="${poContent}" data-bs-placement="auto" data-bs-custom-class="sl-popover"><i class="fal fa-info-circle"></i></button>&nbsp;`;

				        let range = CUI.rte.Selection.getLeadRange(context);
                let tempDiv = context.doc.createElement("div");
                tempDiv.innerHTML = htmlToInsert;
                let textFrag = context.doc.createDocumentFragment();
                let firstNode, lastNode;
    
                while ((firstNode = tempDiv.firstChild)) {
                    lastNode = textFrag.appendChild(firstNode);
                }

                range.deleteContents();
                range.insertNode(textFrag);
                range.setStartAfter(lastNode);

                this.savedRange = CUI.rte.Selection.saveNativeSelection(context);
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

            let heading = '',
                content = '';

            if(this.isSelection && (selection.startNode && selection.startNode.nextElementSibling && selection.startNode.nextElementSibling.classList.contains("popover-button"))) {
				        heading = selection.startNode.nextElementSibling.getAttribute('data-bs-title');
                content = selection.startNode.nextElementSibling.getAttribute('data-bs-content');
                this.isEdit = true;
            }

            dialog.$dialog.find('[name="infoHead"]').val(heading);
            dialog.$dialog.find('[name="infoDetail"]').val(content);

            dm.show(dialog);
        },
        //to mark the icon selected/deselected
        updateState: function (selDef) {
			      this.isSelection = selDef.isSelection;
            let selectedDom  =selDef.nodeList.commonAncestor;
        }
    });

    CUI.rte.plugins.PluginRegistry.register(GROUP, TouchUIPopoverPlugin);

}(jQuery, window.CUI, jQuery(document)));
