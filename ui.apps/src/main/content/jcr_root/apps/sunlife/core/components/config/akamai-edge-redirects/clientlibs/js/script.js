(function ($, $document) {
    "use strict"
    var contentPath = window.location.pathname.replace(/\.html.*/gi, '') + '/jcr:content';
    $(document).ready(function () {
        $('#addRule').click(function () {
            if ($.trim($('input[name="source"]').val()) == "" || $('input[name="source"]').val().indexOf('http') > -1) {
                $('input[name="source"]').val('');
                return;
            }
            if ($.trim($('input[name="dest').val()) == "") {
                $('input[name="dest').val('');
                return;
            }
            var nm = new Date().getTime();
            var nodeName = "./" + nm + "/";
            var obj = {};
            var destVal = $.trim($('input[name="dest"]').val());
            if (destVal.indexOf('http') < 0) {
                destVal = $('#domain').val().concat(destVal);
            }
            obj[nodeName.concat('status')] = 'Not Published';
            obj[nodeName.concat('state')] = 'New';
            obj[nodeName.concat('source')] = $('#domain').val().concat($('input[name="source"]').val());
            obj[nodeName.concat('destination')] = destVal;
            obj[nodeName.concat('date')] = nm;
            var trData = { name: nm, source: $('#domain').val().concat($('input[name="source"]').val()), destination: destVal };
            $.post(contentPath, obj, function (data) {
                $('input[name="source"]').val('');
                $('input[name="dest"]').val('');
                $('#createRule').trigger('click');
                var tr = '<tr is="coral-table-row" data-name="' + trData.name + '"><td is="coral-table-cell" data-name="tr-source">' + trData.source + '</td><td is="coral-table-cell" data-name="tr-destination">' + trData.destination + '</td><td is="coral-table-cell">'
                    + '<coral-icon class="coral-Form-fieldinfo" icon="edit" size="S" data-name="' + trData.name + '" name="editRule" style="cursor: pointer" title="Edit Rule"></coral-icon>'
                    + '<coral-icon class="coral-Form-fieldinfo" icon="exclude" size="S" data-name="' + trData.name + '" style="cursor: pointer" name="disableRule" title="Deactivate Rule"></coral-icon></td></tr>';
                $('#rules').append(tr);
                bindRulesTableEvents();
            });

        });
        bindRulesTableEvents();
        $('#non-published-rules').click(function(){
            $.getJSON(contentPath.concat('.1.json'),{},function(data) {
                var content = '<button is="coral-button" variant="primary" icon="play" iconsize="M" size="L" id="publishRules">Publish Rules</button>';
                content+='<table is="coral-table" selectable multiple><colgroup><col is="coral-table-column" fixedwidth>'+
                '<col is="coral-table-column"><col is="coral-table-column"></colgroup><thead is="coral-table-head"><tr is="coral-table-row">'+
                '<th is="coral-table-headercell"><coral-checkbox coral-table-select></coral-checkbox></th><th is="coral-table-headercell">Source</th>'+
                '<th is="coral-table-headercell">Target</th></tr></thead><tbody is="coral-table-body">';
                $.each(data,function(key, val) {
                    if(val instanceof Object && val.status && val.status === 'Not Published') {
                        content+='<tr is="coral-table-row"><td is="coral-table-cell"><coral-checkbox coral-table-rowselect></coral-checkbox></td>'+
                        '<td is="coral-table-cell">'+val.source+'</td><td is="coral-table-cell">'+val.destination+'</td></tr>';
                    }
                });
                content+='</tbody></table>';
                $('#non-published-rules-content').html(content);
            });
        });
    });
    var bindRulesTableEvents = function () {
        $('[name="editRule"]').off('click').on('click', function () {
            var nName = $(this).data('name');
            var domain = $('#domain').val();
            var source = $(this).parents('tr').find('[data-name="tr-source"]').text().replace(domain, '');
            var dest = $(this).parents('tr').find('[data-name="tr-destination"]').text().replace(domain, '');
            $('#editRuleDialog').remove();
            var dialog = new Coral.Dialog().set({
                id: "editRuleDialog",
                header: {
                    innerHTML: "Edit Rule"
                },
                content: {
                    innerHTML: '<form class="coral-Form coral-Form--vertical" onsubmit="return false;">' +
                        '<section class="coral-Form-fieldset"><div class="coral-Form-fieldwrapper"><label class="coral-Form-fieldlabel" id="edit-source-label">' + domain + '</label>' +
                        '<input is="coral-textfield" class="coral-Form-field" placeholder="Source" name="edit-source" labelledby="edit-source-label" required value=' + source + ' />' +
                        '<coral-icon class="coral-Form-fieldinfo" icon="infoCircle" size="S" id="edit-source-fieldinfo"></coral-icon>' +
                        '<coral-tooltip variant="info" placement="right" target="#edit-source-fieldinfo" style="width:150px">Enter the source path for e.g., en/link1</coral-tooltip></div>' +
                        '<div class="coral-Form-fieldwrapper"><label class="coral-Form-fieldlabel" id="edit-dest-label">Target</label>' +
                        '<input is="coral-textfield" class="coral-Form-field" placeholder="Target Path" name="edit-dest" labelledby="edit-dest-label" required value=' + dest + ' />' +
                        '<coral-icon class="coral-Form-fieldinfo" icon="infoCircle" size="S" id="edit-dest-fieldinfo"></coral-icon>' +
                        '<coral-tooltip variant="info" placement="right" target="#edit-dest-fieldinfo" style="width:150px">Enter the relative or absolute target path</coral-tooltip></div>' +
                        '</section></form>'
                },
                footer: {
                    innerHTML: "<button is=\"coral-button\" variant=\"primary\" id='edit-save-changes'>Save Changes</button><button is=\"coral-button\" coral-close=\"\">Cancel Changes</button>"
                }
            });
            document.body.appendChild(dialog);
            $('#editRuleDialog')[0].show();
            $('#edit-save-changes').click(function () {
                if ($.trim($('input[name="edit-source"]').val()) == "" || $('input[name="edit-source"]').val().indexOf('http') > -1) {
                    $('input[name="edit-source"]').val('');
                    return;
                }
                if ($.trim($('input[name="edit-dest').val()) == "") {
                    $('input[name="edit-dest').val('');
                    return;
                }
                var obj = {};
                var nodeName = "./" + nName + "/";
                var destVal = $.trim($('input[name="edit-dest"]').val());
                if (destVal.indexOf('http') < 0) {
                    destVal = $('#domain').val().concat(destVal);
                }
                obj[nodeName.concat('status')] = 'Not Published';
                obj[nodeName.concat('state')] = 'Edit';
                obj[nodeName.concat('source')] = $('#domain').val().concat($('input[name="edit-source"]').val());
                obj[nodeName.concat('destination')] = destVal;
                obj[nodeName.concat('date')] = new Date().getTime();
                var trData = { name: nName, source: $('#domain').val().concat($('input[name="edit-source"]').val()), destination: destVal };
                $.post(contentPath, obj, function (data) {
                    $('tr[data-name="'+trData.name+'"]').find('[data-name="tr-source"]').text(trData.source);
                    $('tr[data-name="'+trData.name+'"]').find('[data-name="tr-destination"]').text(trData.destination);
                    $('#editRuleDialog').remove();                    
                });
            });
        });
        $('[name="disableRule"]').off('click').on('click', function () {
            var nName = $(this).data('name');
            $('#disableRuleDialog').remove();
            var dialog = new Coral.Dialog().set({
                id: "disableRuleDialog",
                header: {
                    innerHTML: "Disable Rule Confirmation"
                },
                content: {
                    innerHTML: '<h2 class="coral-Heading coral-Heading--2">Are you sure you want to disable the rule?</h2>'
                },
                footer: {
                    innerHTML: "<button is=\"coral-button\" variant=\"primary\" id='disable-yes'>Yes</button><button is=\"coral-button\" coral-close=\"\">No</button>"
                }
            });
            document.body.appendChild(dialog);
            $('#disableRuleDialog')[0].show();
            $('#disable-yes').click(function(){
                var obj = {};
                var nodeName = "./" + nName + "/";
                obj[nodeName.concat('status')] = 'Not Published';
                obj[nodeName.concat('state')] = 'Delete';
                obj[nodeName.concat('date')] = new Date().getTime();
                $.post(contentPath, obj, function (data) {
                    $('tr[data-name="'+nName+'"]').find('[icon="exclude"]').remove();
                    $('tr[data-name="'+nName+'"]').find('[data-name="tr-actions"]').append('<coral-icon class="coral-Form-fieldinfo" icon="play" size="S" data-name="'+nName+'" style="cursor: pointer" name="enableRule" title="Enable Rule"></coral-icon>');
                    $('#disableRuleDialog').remove();
                    bindRulesTableEvents();
                });
            });
        });
        $('[name="enableRule"]').off('click').on('click', function () {
            var nName = $(this).data('name');
            $('#enableRuleDialog').remove();
            var dialog = new Coral.Dialog().set({
                id: "enableRuleDialog",
                header: {
                    innerHTML: "Enable Rule Confirmation"
                },
                content: {
                    innerHTML: '<h2 class="coral-Heading coral-Heading--2">Are you sure you want to enable the rule?</h2>'
                },
                footer: {
                    innerHTML: "<button is=\"coral-button\" variant=\"primary\" id='enable-yes'>Yes</button><button is=\"coral-button\" coral-close=\"\">No</button>"
                }
            });
            document.body.appendChild(dialog);
            $('#enableRuleDialog')[0].show();
            $('#enable-yes').click(function(){
                var obj = {};
                var nodeName = "./" + nName + "/";
                obj[nodeName.concat('status')] = 'Not Published';
                obj[nodeName.concat('state')] = 'Edit';
                obj[nodeName.concat('date')] = new Date().getTime();
                $.post(contentPath, obj, function (data) {
                    $('tr[data-name="'+nName+'"]').find('[icon="play"]').remove();
                    $('tr[data-name="'+nName+'"]').find('[data-name="tr-actions"]').append('<coral-icon class="coral-Form-fieldinfo" icon="exclude" size="S" data-name="'+nName+'" style="cursor: pointer" name="disableRule" title="Deactivate Rule"></coral-icon>');
                    $('#enableRuleDialog').remove();
                    bindRulesTableEvents();
                });
            });
        });
    }
})($, $(document));