(function($,$document){
    "use strict"
    var coralFormField = function(name, value, label, required) {
        return '<div class="coral-Form-fieldwrapper custom-dailog-field">'+
                    '<label class="coral-Form-fieldlabel" id="dailog-textfield-'+name+'">'+label+'</label>'+
                    '<input is="coral-textfield" class="coral-Form-field" name="'+name+'" value="'+value+'" labelledby="dailog-textfield-'+name+'" '+required+'/>'+
                '</div>';
    };
    var componentTypeChange = function() {
        var componentType = $('[name="./componentType"]').val();
        var $formFixedColumn = $('coral-select[name="./componentType"]').parents('.coral-FixedColumn-column');
        var props = [];
        $('[name="./componentName"]').val(componentType);
        $('.custom-dailog-field').remove();
        $(multiPurposeComponentConfig).each(function(i,data){
            if(data.reactComponentName == componentType) {
                props = data.props;
            }
        });
        $(props).each(function(i, data){
            $formFixedColumn.append(coralFormField(data.name, data.value?data.value:'', data.label, data.required?'required':''));
        });
        var componentData = $('[name="./componentData"]').val();
        if(componentData!=undefined && componentData!=''){
           var componentData = JSON.parse($('[name="./componentData"]').val());
            $.each(componentData, function(key,val) {
                $('[name="'+key+'"]').val(val);
            });
        }

        $('.custom-dailog-field > input').keyup(function(){
            var data = {};
            $('.custom-dailog-field > input').each(function(){
                data[$(this).attr('name')] = $(this).val();
            });
            $('[name="./componentData"]').val(JSON.stringify(data));
        });
        $('#componentDisplayName').val($('coral-select[name="./componentType"] coral-selectlist-item:selected').text());
    };
    $document.on('dialog-ready',function(){
        var type = $('coral-select[name="./componentType"]').get(0).items;
        $.each(type.getAll(), function(){$(this).remove()});
        type.add({value: '--select--',content:{textContent: 'Select Component Type'}});
        $(multiPurposeComponentConfig).each(function(i,data){
            type.add({value: data.reactComponentName,content:{textContent: data.componentName}});
        });
        $('[name="./componentType"]').val($('[name="./componentName"]').val()?$('[name="./componentName"]').val():'--select--');
        $('[name="./componentType"]').change(componentTypeChange);
        $('[name="./componentType"]').trigger('change');
    });
})($,$(document));