/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2015 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */
;(function ($, ns, channel, window) {
    "use strict";

    /**
     * Represents the PASTE action (inserts the editable(s) from the {@link Granite.author.clipboard} to the selected place) that could be performed on the current {@link Granite.author.Editable}
     *
     * @memberOf Granite.author.edit.ToolbarActions
     * @type Granite.author.ui.ToolbarAction
     * @alias PASTE
     */
    ns.edit.ToolbarActions.PASTE = new ns.ui.ToolbarAction({
        name: "PASTE",
        icon: "paste",
        text: Granite.I18n.get("Paste"),
        shortcut: "ctrl+v",
        execute: function (editableBefore) {
            var editables = ns.clipboard.getEditables();
            var pasteOperation = ns.clipboard.shouldCut() ? ns.editableHelper.doMove : ns.editableHelper.doCopy;
            var historyConfig = {};
            var historyEnabled = ns.history.Manager.isEnabled();

            if (historyEnabled) {
                historyConfig.step = ns.history.util.Utils.beginStep();
            }

            ns.editableHelper.doBulkOperation(pasteOperation, [ns.persistence.PARAGRAPH_ORDER.before, editableBefore, historyConfig], editables).done(function() {
                ns.history.util.Utils.finalizeStep(historyConfig.step);
            });

            ns.selection.deselectAll();
            ns.editableHelper.cleanUp();
        },
        condition: function (editableBefore) {
            var isInsertAllowedForAll = ns.clipboard.getEditables().every(function (editableToInsert) {
                var component = ns.components.find({ resourceType: editableToInsert.type })[0];

                if (component) {
                    var componentPath = component.getPath();
                    var componentGroup = "group:" + component.getGroup();

                    return ns.edit.EditableActions.INSERT.condition(editableBefore, componentPath, componentGroup);
                } else {
                    return ns.edit.EditableActions.INSERT.condition(editableBefore);
                }

            });

            //var isEditableInFocus = $(document.activeElement).data('type') === 'Editable';
			var isEditableInFocus = true;
            return !ns.clipboard.isEmpty() && isInsertAllowedForAll && isEditableInFocus;
        },
        isNonMulti: true
    });

}(jQuery, Granite.author, jQuery(document), this));

