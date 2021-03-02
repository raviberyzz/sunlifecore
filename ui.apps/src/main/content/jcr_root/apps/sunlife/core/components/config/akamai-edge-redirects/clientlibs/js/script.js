(function ($, $document) {
    "use strict"
    var contentPath = window.location.pathname.replace(/\.html.*/gi, '') + '/jcr:content';
    $(document).ready(function () {
        $('#addRule').click(function () {
            var src = $.trim($('input[name="source"]').val());
            var dest = $.trim($('input[name="dest').val());
            var blockedPaths = [];
            if($('#blockedPaths').val()) {
                blockedPaths = $('#blockedPaths').val().split(',');
            }
            var displayAddError = function(msg) {
                $('[target="#createRule"] coral-alert').remove();
                var alert = new Coral.Alert().set({
                    variant: "error",
                    content: {
                      innerHTML: msg
                    }
                });
                $('[target="#createRule"] .coral3-Popover-content form').prepend(alert);
            };
            var blockedPath = false;
            $(blockedPaths).each(function(i,val){
                if(val == src) {
                    blockedPath = true;
                }
            });
            if (src == "" || src.indexOf('http') > -1 || src.indexOf('*') >= 0 || blockedPath) {
                displayAddError('Invalid Source Value');
                return;
            }
            if (dest == "") {
                displayAddError('Invalid Target Value');
                return;
            }
            if(src.indexOf('/') == 0) {
                displayAddError('Source Value should not start with /');
                return;
            }
            if(dest.indexOf('http') < 0 && dest.indexOf('/') != 0) {
                displayAddError('Target value should either starts with http or https or /');
                return;
            }
            src = $('#domain').val().concat(src);
            var unique = true;
            $('[data-name="tr-source"]').each(function(){
                if(src === $.trim($(this).text())) {
                    unique = false;
                }
            });
            if(!unique) {
                displayAddError('Rule already exists for specified source');
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
            obj[nodeName.concat('source')] = src;
            obj[nodeName.concat('destination')] = destVal;
            obj[nodeName.concat('date')] = nm;
            obj[nodeName.concat('modBy')] = $('#userName').val();
            var trData = { name: nm, source: src, destination: destVal };
            $.post(contentPath, obj, function (data) {
                $('input[name="source"]').val('');
                $('input[name="dest"]').val('');
                $('#createRule').trigger('click');
                var tr = '<tr is="coral-table-row" data-name="' + trData.name + '"><td is="coral-table-cell" data-name="tr-source">' + trData.source + '</td><td is="coral-table-cell" data-name="tr-destination">' + trData.destination + '</td><td is="coral-table-cell">'
                    + '<coral-icon class="coral-Form-fieldinfo" icon="edit" size="S" data-name="' + trData.name + '" name="editRule" style="cursor: pointer" title="Edit Rule"></coral-icon>'
                    + '<coral-icon class="coral-Form-fieldinfo" icon="exclude" size="S" data-name="' + trData.name + '" style="cursor: pointer" name="disableRule" title="Deactivate Rule"></coral-icon></td>'
                    +'<td is="coral-table-cell" data-name="tr-modBy">'+$('#userName').val()+'</td><td is="coral-table-cell" data-name="tr-pubBy"></td></tr>';
                $('#rules').append(tr);
                bindRulesTableEvents();
            });

        });
        bindRulesTableEvents();
        $('#non-published-rules').click(function () {
            $.getJSON(contentPath.concat('.1.json'), {}, function (data) {
                var content = '<button is="coral-button" variant="primary" icon="play" iconsize="M" size="L" id="publishRules">Publish Rules</button>';
                content += '<div id="non-published-rules-message"></div>';
                content += '<table is="coral-table" selectable multiple><colgroup><col is="coral-table-column" fixedwidth>' +
                    '<col is="coral-table-column"><col is="coral-table-column"></colgroup><thead is="coral-table-head"><tr is="coral-table-row">' +
                    '<th is="coral-table-headercell"><coral-checkbox coral-table-select></coral-checkbox></th><th is="coral-table-headercell">Source</th>' +
                    '<th is="coral-table-headercell">Target</th></tr></thead><tbody is="coral-table-body" id="non-published-rules-table-body">';
                $.each(data, function (key, val) {
                    if (val instanceof Object && val.status && val.status === 'Not Published') {
                        content += '<tr is="coral-table-row" data-rule="' + encodeURI(JSON.stringify(val)) + '" data-rule-name="' + key + '"><td is="coral-table-cell"><coral-checkbox coral-table-rowselect></coral-checkbox></td>' +
                            '<td is="coral-table-cell">' + val.source + '</td><td is="coral-table-cell">' + val.destination + '</td></tr>';
                    }
                });
                content += '</tbody></table>';
                $('#non-published-rules-content').html(content);
                bindNonPublishedRulesEvents();
            });
        });
    });
    var bindRulesTableEvents = function () {
        $('[name="editRule"]').off('click').on('click', function () {
            var nName = $(this).data('name');
            var domain = $('#domain').val();
            var source = $(this).parents('tr').find('[data-name="tr-source"]').text().replace(domain, '');
            if(domain.indexOf('http') < 0) {
                source = source.replace(/.*:\/\//gi,'');
            }
            var dest = $(this).parents('tr').find('[data-name="tr-destination"]').text();
            $('#editRuleDialog').remove();
            var dialog = new Coral.Dialog().set({
                id: "editRuleDialog",
                header: {
                    innerHTML: "Edit Rule"
                },
                content: {
                    innerHTML: '<form class="coral-Form coral-Form--vertical" onsubmit="return false;" id="edit-rule-dailog">' +
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
                var src = $.trim($('input[name="edit-source"]').val());
                var dest = $.trim($('input[name="edit-dest').val());
                var blockedPaths = [];
                if($('#blockedPaths').val()) {
                    blockedPaths = $('#blockedPaths').val().split(',');
                }
                var displayAddError = function(msg) {
                    $('#edit-rule-dailog coral-alert').remove();
                    var alert = new Coral.Alert().set({
                        variant: "error",
                        content: {
                            innerHTML: msg
                        }
                    });
                    $('#edit-rule-dailog').prepend(alert);
                };
                var blockedPath = false;
                $(blockedPaths).each(function(i,val){
                    if(val == src) {
                        blockedPath = true;
                    }
                });
                if (src == "" || src.indexOf('http') > -1 || src.indexOf('*') >= 0 || blockedPath) {
                    displayAddError('Invalid Source Value');
                    return;
                }
                if (dest == "") {
                    displayAddError('Invalid Target Value');
                    return;
                }
                if(src.indexOf('/') == 0) {
                    displayAddError('Source Value should not start with /');
                    return;
                }
                if(dest.indexOf('http') < 0 && dest.indexOf('/') != 0) {
                    displayAddError('Target value should either starts with http or https or /');
                    return;
                }
                src = $('#domain').val().concat(src);
                var unique = true;
                $('[data-name="tr-source"]').each(function(){
                    if(src === $.trim($(this).text()) && $(this).parents('tr').data('name') != nName) {
                        unique = false;
                    }
                });
                if(!unique) {
                    displayAddError('Rule already exists for specified source');
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
                obj[nodeName.concat('source')] = src;
                obj[nodeName.concat('destination')] = destVal;
                obj[nodeName.concat('date')] = new Date().getTime();
                obj[nodeName.concat('modBy')] = $('#userName').val();
                var trData = { name: nName, source: src, destination: destVal };
                $.post(contentPath, obj, function (data) {
                    $('tr[data-name="' + trData.name + '"]').find('[data-name="tr-source"]').text(trData.source);
                    $('tr[data-name="' + trData.name + '"]').find('[data-name="tr-destination"]').text(trData.destination);
                    $('tr[data-name="' + trData.name + '"]').find('[data-name="tr-modBy"]').text($('#userName').val());
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
            $('#disable-yes').click(function () {
                var obj = {};
                var nodeName = "./" + nName + "/";
                obj[nodeName.concat('status')] = 'Not Published';
                obj[nodeName.concat('state')] = 'Delete';
                obj[nodeName.concat('date')] = new Date().getTime();
                obj[nodeName.concat('modBy')] = $('#userName').val();
                $.post(contentPath, obj, function (data) {
                    $('tr[data-name="' + nName + '"]').find('[icon="exclude"]').remove();
                    $('tr[data-name="' + nName + '"]').find('[data-name="tr-actions"]').append('<coral-icon class="coral-Form-fieldinfo" icon="play" size="S" data-name="' + nName + '" style="cursor: pointer" name="enableRule" title="Enable Rule"></coral-icon>');
                    $('tr[data-name="' + nName + '"]').find('[data-name="tr-modBy"]').text($('#userName').val());
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
            $('#enable-yes').click(function () {
                var obj = {};
                var nodeName = "./" + nName + "/";
                obj[nodeName.concat('status')] = 'Not Published';
                obj[nodeName.concat('state')] = 'Edit';
                obj[nodeName.concat('date')] = new Date().getTime();
                obj[nodeName.concat('modBy')] = $('#userName').val();
                $.post(contentPath, obj, function (data) {
                    $('tr[data-name="' + nName + '"]').find('[icon="play"]').remove();
                    $('tr[data-name="' + nName + '"]').find('[data-name="tr-actions"]').append('<coral-icon class="coral-Form-fieldinfo" icon="exclude" size="S" data-name="' + nName + '" style="cursor: pointer" name="disableRule" title="Deactivate Rule"></coral-icon>');
                    $('tr[data-name="' + nName + '"]').find('[data-name="tr-modBy"]').text($('#userName').val());
                    $('#enableRuleDialog').remove();
                    bindRulesTableEvents();
                });
            });
        });
    };
    var bindNonPublishedRulesEvents = function () {
        $('#publishRules').off('click').on('click', function () {
            var rules = [];
            $('#non-published-rules-table-body > tr:selected').each(function () { 
                var rule = JSON.parse(decodeURI($(this).data('rule'))); 
                rule.name = ""+$(this).data('rule-name');
                rules.push(rule);
            });
            if(rules.length < 1) {
                var alert = new Coral.Alert().set({
                    variant: "error",
                    header: {
                        innerHTML: ""
                    },
                    content: {
                        innerHTML: "No rules selected to publish"
                    }
                });
                $('#non-published-rules-message').html(alert);
            }else {
                $('#non-published-rules-message').html('');
                $('body').append('<div id="overlay"></div>');
                $('#overlay').css({'opacity':'.30','background':'#000', 'top': 0,'left':0, 'width': window.innerWidth, 'height': window.innerHeight, 'position':'fixed'});
                $('body').append(new Coral.Wait().set({
                    size: "L",
                    centered: true
                }));
                $.post(contentPath+".config.service",{policyID: $('#policyID').val(), rules: JSON.stringify(rules)},function(data){
                    var obj = {};
                    var message = '';
                    if(data.publishStatus == "Success") {
                        message += '<coral-alert variant="success"><coral-alert-content><b>Policy activated successfully, following are individual rule status</b></coral-alert-content></coral-alert><br />';
                    } else {
                        message += '<coral-alert variant="error"><coral-alert-content><b>Due to technical reasons policy was not able to activate, please try again after 30 minutes. Following are individual rule status</b></coral-alert-content></coral-alert><br />';
                    }
                    $.each(data, function(key,val) {
                        if(key != "publishStatus" && key != "error") {
                            obj['./'+key+'/status'] = val == "Fail" ? "Not Published" : "Published";
                            obj['./'+key+'/pubBy'] = $('#userName').val();
                            $.each(rules, function(index, content) {
                                if(content.name == key) {
                                    if(val == "Success") {
                                        message += '<coral-alert variant="success"><coral-alert-content>Source : '+content.source+' <br />Destination : '+content.destination+' <br />Rule created or updated successfully</coral-alert-content></coral-alert><br />';
                                    } else {
                                        message += '<coral-alert variant="error"><coral-alert-content>Source : '+content.source+' <br />Destination : '+content.destination+' <br />Rule was not able to create or update</coral-alert-content></coral-alert><br />';
                                    }
                                }
                            });
                        }
                    });
                    $.post(contentPath, obj, function(res){
                        $('#overlay').remove();
                        $('coral-wait').remove();
                        var dialog = new Coral.Dialog().set({
                            id: "publishStatusDailog",
                            header: {
                                innerHTML: "Publish Satus"
                            },
                            content: {
                                innerHTML: message
                            },
                            footer: {
                                innerHTML: "<button is=\"coral-button\" variant=\"primary\" id='publish-status-ok'>Ok</button>"
                            }
                        });
                        document.body.appendChild(dialog);
                        $('#publishStatusDailog')[0].show();
                        $('#publish-status-ok').click(function () {
                            $('#publishStatusDailog').remove();
                            $('#non-published-rules').trigger('click');
                            window.location.reload();
                        });
                    });
                });
            }
        });
    };
})($, $(document));